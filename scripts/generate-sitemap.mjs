/**
 * Writes public/sitemap.xml from the route data.
 *
 * Runs automatically before `npm run build`, and after `npm run sync-games`.
 * Game pages come from src/data/stake-games.json, each using its Stake release
 * date as lastmod.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(resolve(root, p), "utf8");

const siteUrl = read("src/data/site.ts").match(/SITE_URL\s*=\s*"([^"]+)"/)?.[1];
if (!siteUrl) throw new Error("Could not read SITE_URL from src/data/site.ts");

const synced = JSON.parse(read("src/data/stake-games.json")).games;
if (!synced.length) throw new Error("No games in src/data/stake-games.json - run npm run sync-games");

const pages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/games", priority: "0.9", changefreq: "weekly" },
  ...synced.map((g) => ({
    path: `/games/${g.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: g.releasedAt.slice(0, 10),
  })),
  { path: "/about", priority: "0.5", changefreq: "yearly" },
  { path: "/contact", priority: "0.5", changefreq: "yearly" },
];

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${new URL(p.path, siteUrl).href}</loc>
    <lastmod>${p.lastmod ?? today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(root, "public/sitemap.xml"), xml, "utf8");
console.log(`sitemap.xml: ${pages.length} urls at ${siteUrl}`);
