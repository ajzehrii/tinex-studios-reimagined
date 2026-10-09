import stakeData from "./stake-games.json";

export type Volatility = "Low" | "Medium" | "High" | "Extreme";
export type GameStatus = "Released" | "Coming Soon" | "In Certification";

/**
 * Game data comes from two places:
 *   - stake-games.json — titles, edge/RTP, release times, Stake theme tags and
 *     accents. Generated; refresh with `npm run sync-games`, never edit by hand.
 *   - `copy` below — hand-written taglines and descriptions, plus any accent
 *     we've chosen by eye. Keyed by slug; titles without an entry still show,
 *     using factual copy built from their data.
 *
 * Optional fields are ones we don't have a verified value for. The UI omits
 * anything undefined rather than showing a placeholder.
 */
export interface Game {
  slug: string;
  /**
   * Catalogue number in release order — the first game is 1. Stable: unlike a
   * list position, it doesn't shift every time a new title ships.
   */
  no: number;
  title: string;
  /** Stake's own category: "Slot", or e.g. "Burst game". */
  type: string;
  status: GameStatus;
  /** Live game page on Stake.us. */
  playUrl: string;
  /**
   * Same title on Stake.com. Built from the Stake.us slug: Stake Engine games
   * publish to both under one slug, but Stake.com geo-blocks the network this
   * was built on, so these links have not been checked directly.
   */
  stakeComUrl: string;
  houseEdge?: string;
  rtp?: string;
  themes: string[];
  /** ISO timestamp the title went live on Stake. */
  releaseDate?: string;
  tagline?: string;
  description?: string;
  volatility?: Volatility;
  maxWin?: string;
  layout?: string;
  features?: string[];
  art: string;
  /** 1200x630 Open Graph card for this title. */
  ogImage: string;
  /** Bare oklch triple ("L C H"), dropped into --game-accent. */
  accent: string;
}

type Copy = Partial<Pick<Game, "tagline" | "description" | "accent" | "features">>;

const copy: Record<string, Copy> = {
  "crystal-crush": {
    tagline: "Swing first, ask what it was worth later.",
    description:
      "A crystal pick, a cavern full of things worth breaking, and no particular reason to stop.",
    accent: "0.74 0.15 246",
  },
  "sugar-spirits": {
    tagline: "Something sweet died here and it got over it.",
    description:
      "A candy skull with peppermint eyes and cotton-candy hair, floating around a confectionery works that nobody has run in a while. The sugar world from Sugar Wheel, several shades stranger.",
    accent: "0.71 0.25 344",
  },
  "doodle-days": {
    tagline: "Biro on lined paper, and a serious attitude problem.",
    description:
      "A stick figure with a grudge, drawn in the margins of somebody's notebook. Doodle Days drops the studio's usual saturation for ink on lined paper.",
    accent: "0.82 0.11 82",
  },
  "rift-rush": {
    tagline: "Something came through, and it's pleased with itself.",
    description: "A tear in the world and one very cheerful thing standing in front of it.",
    accent: "0.70 0.23 338",
  },
  "larp-city": {
    tagline: "Rooftop season, and the drinks are on the house.",
    description:
      "A skyline party that never quite ends. Larp City runs on a cascading grid — every winning cluster clears out and drops a fresh set of symbols into the gap, so a single spin can keep paying long after you expect it to stop.",
    accent: "0.81 0.15 88",
  },
  "bubble-rise": {
    tagline: "Light, bright, and always climbing.",
    description:
      "Our cleanest, most readable build. Bubble Rise strips the grid back to open sky and lets the symbols do the work — an easy title to pick up for a few spins and hard to put down once the round gets going.",
    accent: "0.76 0.14 232",
  },
  "sugar-wheel": {
    tagline: "Give it a spin. See where the sugar lands.",
    description:
      "A confectionery world built around one big, satisfying wheel. Feature spins hand control back to the player at the moment it matters most — the wheel comes up, and the round turns on where it stops.",
    accent: "0.73 0.20 356",
  },
  "floor-is-lava": {
    tagline: "Don't touch the ground.",
    description:
      "The childhood game, turned into a cascading engine. Winning symbols burn away and everything above collapses into the space they leave — the grid rearranging itself under you while the lava keeps rising.",
    accent: "0.71 0.19 42",
  },
};

// Artwork is discovered by slug, so a synced game needs no import here.
const artFiles = import.meta.glob<string>("../assets/games/*.jpg", {
  eager: true,
  import: "default",
});
const ogFiles = import.meta.glob<string>("../assets/og/*.jpg", { eager: true, import: "default" });

const FALLBACK_ACCENT = "0.805 0.142 196";

export const games: Game[] = stakeData.games
  .flatMap((s): Game[] => {
    const art = artFiles[`../assets/games/${s.slug}.jpg`];
    const ogImage = ogFiles[`../assets/og/${s.slug}.jpg`];
    if (!art || !ogImage) {
      // Skip rather than ship a broken card; the sync script downloads both.
      console.warn(`[games] no artwork for "${s.slug}" — run npm run sync-games`);
      return [];
    }
    const c = copy[s.slug] ?? {};
    return [
      {
        slug: s.slug,
        no: 0, // assigned below, once the list is in release order
        title: s.title,
        type: s.type,
        status: "Released",
        playUrl: `https://stake.us/casino/games/${s.stakeSlug}`,
        stakeComUrl: `https://stake.com/casino/games/${s.stakeSlug}`,
        houseEdge: s.houseEdge,
        rtp: s.rtp,
        themes: s.themes,
        releaseDate: s.releasedAt,
        art,
        ogImage,
        ...c,
        accent: c.accent ?? s.accent ?? FALLBACK_ACCENT,
      },
    ];
  })
  .sort((a, b) => (b.releaseDate ?? "").localeCompare(a.releaseDate ?? ""));

games.forEach((g, i) => (g.no = games.length - i));

/** "No. 07" */
export const catalogueNo = (game: Game) => `No. ${String(game.no).padStart(2, "0")}`;

export const EXCLUSIVE_PARTNER = "Stake";
export const EXCLUSIVE_LABEL = "Only on Stake";
export const EXCLUSIVE_URL = "https://stake.us/casino/group/tinex-games";
/** Publisher page on Stake.com — same caveat as Game.stakeComUrl. */
export const EXCLUSIVE_URL_COM = "https://stake.com/casino/group/tinex-games";
/** Every title is built and published on Stake's own game platform. */
export const PLATFORM = "Stake Engine";

/**
 * TODO: replace with the studio's real inbox. The contact form composes a
 * mailto: to this address — a wrong value here means enquiries go nowhere.
 */
export const CONTACT_EMAIL = "hello@tinexgames.com";

export const getGame = (slug: string) => games.find((g) => g.slug === slug);

export const formatReleaseDate = (iso: string) =>
  new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const joinTitles = (titles: string[]) =>
  titles.length < 2
    ? (titles[0] ?? "")
    : `${titles.slice(0, -1).join(", ")} and ${titles[titles.length - 1]}`;

/**
 * "A, B and C" for the newest `n` titles. Meta descriptions use this rather
 * than every title, which stopped fitting once the catalogue passed a handful.
 */
export const latestTitleList = (n: number) => joinTitles(games.slice(0, n).map((g) => g.title));

/**
 * Copy for a game page, card or schema. Titles without hand-written copy get
 * a plain factual line from their data instead of invented marketing.
 */
export const describe = (game: Game) => {
  if (game.description) return game.description;
  const when = game.releaseDate ? `, released ${formatReleaseDate(game.releaseDate)}` : "";
  const tags = game.themes.length ? ` Stake tags it ${joinTitles(game.themes)}.` : "";
  return `${game.title} is a Stake exclusive ${game.type.toLowerCase()} from Tinex Games${when}, built on ${PLATFORM}.${tags}`;
};

/**
 * Specs rendered on cards and the detail page. Anything without a value is
 * dropped, so a game with no published max win simply shows fewer cells.
 */
export const gameSpecs = (game: Game): { label: string; value: string }[] => {
  const entries: [string, string | undefined][] = [
    ["Game type", game.type],
    ["RTP", game.rtp],
    ["House edge", game.houseEdge],
    ["Volatility", game.volatility],
    ["Max win", game.maxWin],
    ["Layout", game.layout],
  ];
  return entries.flatMap(([label, value]) => (value ? [{ label, value }] : []));
};

export interface NewsItem {
  date: string;
  tag: string;
  title: string;
  body: string;
}

/** Studio news. The homepage section only renders when this has entries. */
export const news: NewsItem[] = [];

// Everything below is derived, so none of it drifts as titles are added.
const rtps = games.map((g) => Number.parseFloat(g.rtp ?? "")).filter(Number.isFinite);
export const rtpRange = { min: Math.min(...rtps), max: Math.max(...rtps) };

const dated = games.filter((g) => g.releaseDate);
const firstRelease = dated[dated.length - 1]?.releaseDate ?? "";
const latestRelease = dated[0]?.releaseDate ?? "";
const spanDays = (Date.parse(latestRelease) - Date.parse(firstRelease)) / 86_400_000;

export const cadence = {
  firstRelease,
  latestRelease,
  weeks: Math.max(1, Math.round(spanDays / 7)),
  /** Average gap between consecutive releases, to one decimal place. */
  daysPerRelease: dated.length > 1 ? Math.round((spanDays / (dated.length - 1)) * 10) / 10 : 0,
};

export const stats = [
  { value: String(games.length), label: "Titles live on Stake" },
  { value: `${rtpRange.max}%`, label: "Highest RTP in the catalogue" },
  { value: String(cadence.daysPerRelease), label: "Days between releases, on average" },
  { value: "100%", label: "Stake exclusive" },
];
