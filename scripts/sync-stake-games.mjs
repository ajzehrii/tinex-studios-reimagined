/**
 * Pulls every Tinex Games title from Stake's public API and updates the site's
 * game data and artwork. Run it whenever a new game ships:
 *
 *   npm run sync-games
 *
 * What it does:
 *   - writes src/data/stake-games.json (title, slug, edge/RTP, release time,
 *     Stake theme tags, art hash, accent colour)
 *   - downloads key art to src/assets/games/<slug>.jpg and a 1200x630 social
 *     card to src/assets/og/<slug>.jpg, re-fetching only when Stake's artwork
 *     changes
 *   - derives an accent colour for new titles from the artwork's own palette
 *
 * Uses plain HTTP only. Do NOT replace this with a browser: loading stake.us in
 * the Claude desktop app's browser pane has repeatedly crashed the app's GPU
 * process.
 *
 * Hand-written copy (taglines, descriptions) and accent overrides live in
 * src/data/games.ts and are never touched by this script.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const API = "https://stake.us/_api/graphql";
const GROUP = "tinex-games";
// Most Stake slugs are "tinexgames-<name>", but not all (Shady Spells is
// "tinex-games-shady-spells"), so strip either form and never filter on it —
// everything in the publisher group is ours.
const SLUG_PREFIX = /^tinex-?games-/;
const OUT = resolve(root, "src/data/stake-games.json");
const ART_DIR = resolve(root, "src/assets/games");
const OG_DIR = resolve(root, "src/assets/og");
// Cloudflare rejects requests that don't look like a browser.
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

// Stake groups that describe the platform rather than the game itself.
const PLATFORM_GROUPS = new Set([
  "Only on Stake",
  "Slot Games",
  "Stake Engine",
  "Tinex Games",
  "New Releases",
  "Recommended Slots",
  // Recorded as the game type instead (see typeOf).
  "Burst Games",
]);

/** Stake's own category, so a burst game is never labelled a slot. */
const typeOf = (groups) =>
  groups.includes("Slot Games") ? "Slot" : groups.includes("Burst Games") ? "Burst game" : "Game";

/**
 * Stake's API sits behind Cloudflare, which rejects Node's built-in fetch on
 * its TLS fingerprint regardless of headers — curl gets through. The image CDN
 * has no such check, so downloads below use fetch.
 */
function gql(query, variables) {
  let out;
  try {
    out = execFileSync(
      "curl",
      ["-s", "--fail-with-body", "--max-time", "60", "-A", UA,
       "-H", "content-type: application/json", "-H", "x-language: en",
       "--data-binary", "@-", API],
      { input: JSON.stringify({ query, variables }), encoding: "utf8", maxBuffer: 32 * 1024 * 1024 },
    );
  } catch (e) {
    throw new Error(`Stake API request failed (is curl installed?): ${e.stderr || e.message}`);
  }
  const body = JSON.parse(out);
  if (body.errors?.length) throw new Error(`Stake API error: ${body.errors[0].message}`);
  return body.data;
}

async function fetchAllGames() {
  const query = `query($slug: String!, $limit: Int!, $offset: Int!) {
    slugKuratorGroup(slug: $slug) {
      gameCount
      groupGamesList(limit: $limit, offset: $offset) {
        game { name slug edge thumbnailUrl createdAt groupGames { group { name } } }
      }
    }
  }`;
  const limit = 50;
  const games = [];
  let total = Infinity;
  for (let offset = 0; offset < total; offset += limit) {
    const { slugKuratorGroup: g } = gql(query, { slug: GROUP, limit, offset });
    total = g.gameCount;
    games.push(...g.groupGamesList.map((x) => x.game));
    if (g.groupGamesList.length < limit) break;
  }
  return games;
}

/** sRGB (0..1) -> OKLCH, via OKLab (Ottosson). */
function toOklch(r, g, b) {
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  [r, g, b] = [lin(r), lin(g), lin(b)];
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { L, C: Math.hypot(A, B), H: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 };
}

/**
 * The artwork's most vibrant colour, pushed into the lightness/chroma band the
 * design needs: it is used both as text on the dark shell and as a button fill
 * behind dark text, so it can be neither too dark nor washed out.
 */
async function accentFor(thumbnailUrl) {
  const res = await fetch(`${thumbnailUrl}?palette=json&colors=6`);
  if (!res.ok) return null;
  const { dominant_colors: d = {} } = await res.json();
  const pick = d.vibrant ?? d.vibrant_light ?? d.muted;
  if (!pick) return null;
  const { L, C, H } = toOklch(pick.red, pick.green, pick.blue);
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  return `${clamp(L, 0.7, 0.84).toFixed(2)} ${clamp(C, 0.06, 0.22).toFixed(2)} ${Math.round(H)}`;
}

async function download(url, file) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}

async function main() {
  const previous = existsSync(OUT)
    ? Object.fromEntries(JSON.parse(readFileSync(OUT, "utf8")).games.map((g) => [g.slug, g]))
    : {};

  mkdirSync(ART_DIR, { recursive: true });
  mkdirSync(OG_DIR, { recursive: true });

  const raw = await fetchAllGames();
  const games = [];
  let fetched = 0;

  for (const g of raw) {
    const slug = g.slug.replace(SLUG_PREFIX, "");
    const artHash = g.thumbnailUrl.split("/").pop();
    const prev = previous[slug];
    const artFile = resolve(ART_DIR, `${slug}.jpg`);
    const ogFile = resolve(OG_DIR, `${slug}.jpg`);
    const artChanged = !prev || prev.artHash !== artHash;

    if (artChanged || !existsSync(artFile)) {
      await download(`${g.thumbnailUrl}?w=1024&h=1280&fit=crop&fm=jpg&q=78`, artFile);
      fetched++;
    }
    if (artChanged || !existsSync(ogFile)) {
      await download(
        `${g.thumbnailUrl}?w=1200&h=630&fit=fill&fill=solid&fill-color=0D1017&fm=jpg&q=82`,
        ogFile,
      );
    }

    const edge = g.edge * 100;
    const groups = g.groupGames.map((x) => x.group.name);
    games.push({
      slug,
      stakeSlug: g.slug,
      title: g.name,
      type: typeOf(groups),
      houseEdge: `${edge.toFixed(2)}%`,
      rtp: `${(100 - edge).toFixed(2)}%`,
      releasedAt: new Date(g.createdAt).toISOString(),
      themes: groups.filter((n) => !PLATFORM_GROUPS.has(n) && !n.startsWith("game_kurator_group.")),
      artHash,
      // Keep an existing accent so colours stay stable between syncs.
      accent: (!artChanged && prev?.accent) || (await accentFor(g.thumbnailUrl)),
    });
  }

  games.sort((a, b) => b.releasedAt.localeCompare(a.releasedAt));
  writeFileSync(OUT, JSON.stringify({ syncedAt: new Date().toISOString(), games }, null, 2) + "\n");

  const added = games.filter((g) => !previous[g.slug]).map((g) => g.title);
  console.log(`stake-games.json: ${games.length} games (${fetched} artwork downloads)`);
  if (Object.keys(previous).length && added.length) console.log(`new: ${added.join(", ")}`);
}

main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
