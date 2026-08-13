import crystalCrush from "@/assets/game-crystal-crush.jpg";
import sugarSpirits from "@/assets/game-sugar-spirits.jpg";
import doodleDays from "@/assets/game-doodle-days.jpg";
import riftRush from "@/assets/game-rift-rush.jpg";
import larpCity from "@/assets/game-larp-city.jpg";
import bubbleRise from "@/assets/game-bubble-rise.jpg";
import sugarWheel from "@/assets/game-sugar-wheel.jpg";
import floorIsLava from "@/assets/game-floor-is-lava.jpg";
// 1200x630 social cards — the 4:5 key art crops badly in link previews.
import ogCrystalCrush from "@/assets/og-crystal-crush.jpg";
import ogSugarSpirits from "@/assets/og-sugar-spirits.jpg";
import ogDoodleDays from "@/assets/og-doodle-days.jpg";
import ogRiftRush from "@/assets/og-rift-rush.jpg";
import ogLarpCity from "@/assets/og-larp-city.jpg";
import ogBubbleRise from "@/assets/og-bubble-rise.jpg";
import ogSugarWheel from "@/assets/og-sugar-wheel.jpg";
import ogFloorIsLava from "@/assets/og-floor-is-lava.jpg";

export type Volatility = "Low" | "Medium" | "High" | "Extreme";
export type GameStatus = "Released" | "Coming Soon" | "In Certification";

/**
 * Fields marked optional are ones we do not publish a verified figure for yet.
 * The UI omits any spec that is undefined rather than showing a placeholder —
 * so leave a field out instead of guessing at it.
 */
export interface Game {
  slug: string;
  title: string;
  tagline: string;
  status: GameStatus;
  /** Live game page on Stake.us. */
  playUrl?: string;
  /** House edge as published by Stake, e.g. "3.50%". */
  houseEdge?: string;
  /** Derived from houseEdge (100 - edge). */
  rtp?: string;
  type: string;
  /** Stake category tags for this title. */
  themes: string[];
  /** ISO date. Omitted until we have a confirmed release date. */
  releaseDate?: string;
  volatility?: Volatility;
  maxWin?: string;
  layout?: string;
  features?: string[];
  description: string;
  art: string;
  /** 1200x630 Open Graph card for this title. */
  ogImage: string;
  /**
   * Accent pulled from this title's key art, as a bare oklch triple so it can
   * be dropped into a CSS custom property. The site takes its colour from the
   * games rather than one house gradient — each card and game page is tinted
   * by its own artwork.
   */
  accent: string;
}

// Newest release first — the homepage features games[0].
export const games: Game[] = [
  {
    slug: "crystal-crush",
    title: "Crystal Crush",
    tagline: "Swing first, ask what it was worth later.",
    status: "Released",
    playUrl: "https://stake.us/casino/games/tinexgames-crystal-crush",
    houseEdge: "4.60%",
    rtp: "95.40%",
    type: "Slot",
    themes: ["New Releases"],
    description:
      "A crystal pick, a cavern full of things worth breaking, and no particular reason to stop. Crystal Crush is the busiest game we've launched — it went out and stayed near the top of the lobby.",
    art: crystalCrush,
    ogImage: ogCrystalCrush,
    accent: "0.74 0.15 246",
  },
  {
    slug: "sugar-spirits",
    title: "Sugar Spirits",
    tagline: "Something sweet died here and it got over it.",
    status: "Released",
    playUrl: "https://stake.us/casino/games/tinexgames-sugar-spirits",
    houseEdge: "5.00%",
    rtp: "95.00%",
    type: "Slot",
    themes: ["New Releases"],
    description:
      "A candy skull with peppermint eyes and cotton-candy hair, floating around a confectionery works that nobody has run in a while. The sugar world from Sugar Wheel, several shades stranger.",
    art: sugarSpirits,
    ogImage: ogSugarSpirits,
    accent: "0.71 0.25 344",
  },
  {
    slug: "doodle-days",
    title: "Doodle Days",
    tagline: "Biro on lined paper, and a serious attitude problem.",
    status: "Released",
    playUrl: "https://stake.us/casino/games/tinexgames-doodle-days",
    houseEdge: "4.70%",
    rtp: "95.30%",
    type: "Slot",
    themes: ["New Releases"],
    description:
      "A stick figure with a grudge, drawn in the margins of somebody's notebook. Doodle Days drops the studio's usual saturation for ink on lined paper — it is the newest thing we've shipped and the one that looks least like anything else in the lobby.",
    art: doodleDays,
    ogImage: ogDoodleDays,
    accent: "0.82 0.11 82",
  },
  {
    slug: "rift-rush",
    title: "Rift Rush",
    tagline: "Something came through, and it's pleased with itself.",
    status: "Released",
    playUrl: "https://stake.us/casino/games/tinexgames-rift-rush",
    houseEdge: "5.00%",
    rtp: "95.00%",
    type: "Slot",
    themes: ["New Releases"],
    description:
      "A tear in the world and one very cheerful thing standing in front of it. Rift Rush is our newest release — the one to start with if you want to see what the studio is doing right now.",
    art: riftRush,
    ogImage: ogRiftRush,
    accent: "0.70 0.23 338",
  },
  {
    slug: "larp-city",
    title: "Larp City",
    tagline: "Rooftop season, and the drinks are on the house.",
    status: "Released",
    playUrl: "https://stake.us/casino/games/tinexgames-larp-city",
    houseEdge: "3.50%",
    rtp: "96.50%",
    type: "Slot",
    themes: ["Animals", "Cascading", "New Releases"],
    description:
      "A skyline party that never quite ends. Larp City runs on a cascading grid — every winning cluster clears out and drops a fresh set of symbols into the gap, so a single spin can keep paying long after you expect it to stop.",
    art: larpCity,
    ogImage: ogLarpCity,
    accent: "0.81 0.15 88",
  },
  {
    slug: "bubble-rise",
    title: "Bubble Rise",
    tagline: "Light, bright, and always climbing.",
    status: "Released",
    playUrl: "https://stake.us/casino/games/tinexgames-bubble-rise",
    houseEdge: "3.50%",
    rtp: "96.50%",
    type: "Slot",
    themes: ["New Releases"],
    description:
      "Our cleanest, most readable build. Bubble Rise strips the grid back to open sky and lets the symbols do the work — an easy title to pick up for a few spins and hard to put down once the round gets going.",
    art: bubbleRise,
    ogImage: ogBubbleRise,
    accent: "0.76 0.14 232",
  },
  {
    slug: "sugar-wheel",
    title: "Sugar Wheel",
    tagline: "Give it a spin. See where the sugar lands.",
    status: "Released",
    playUrl: "https://stake.us/casino/games/tinexgames-sugar-wheel",
    houseEdge: "5.00%",
    rtp: "95.00%",
    type: "Slot",
    themes: ["Candy", "Feature Spins"],
    description:
      "A confectionery world built around one big, satisfying wheel. Feature spins hand control back to the player at the moment it matters most — the wheel comes up, and the round turns on where it stops.",
    art: sugarWheel,
    ogImage: ogSugarWheel,
    accent: "0.73 0.20 356",
  },
  {
    slug: "floor-is-lava",
    title: "Floor Is Lava",
    tagline: "Don't touch the ground.",
    status: "Released",
    playUrl: "https://stake.us/casino/games/tinexgames-floor-is-lava",
    houseEdge: "3.50%",
    rtp: "96.50%",
    type: "Slot",
    themes: ["Cascading", "New Releases"],
    description:
      "The childhood game, turned into a cascading engine. Winning symbols burn away and everything above collapses into the space they leave — the grid rearranging itself under you while the lava keeps rising.",
    art: floorIsLava,
    ogImage: ogFloorIsLava,
    accent: "0.71 0.19 42",
  },
];

export const EXCLUSIVE_PARTNER = "Stake";
export const EXCLUSIVE_LABEL = "Only on Stake";
export const EXCLUSIVE_URL = "https://stake.us/casino/group/tinex-games";
/** Every title is built and published on Stake's own game platform. */
export const PLATFORM = "Stake Engine";

/**
 * TODO: replace with the studio's real inbox. The contact form composes a
 * mailto: to this address — a wrong value here means enquiries go nowhere.
 */
export const CONTACT_EMAIL = "hello@tinexgames.com";

export const getGame = (slug: string) => games.find((g) => g.slug === slug);

/** "A, B, C and D" — keeps meta descriptions current as titles are added. */
export const gameTitleList = games
  .map((g) => g.title)
  .reduce((acc, t, i, arr) => (i === 0 ? t : i === arr.length - 1 ? `${acc} and ${t}` : `${acc}, ${t}`), "");

export const formatReleaseDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

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

/** Derived so it can't drift out of date as titles are added. */
const highestRtp = games
  .map((g) => Number.parseFloat(g.rtp ?? ""))
  .filter((n) => !Number.isNaN(n))
  .reduce((a, b) => Math.max(a, b), 0);

export const stats = [
  { value: String(games.length), label: "Titles live on Stake" },
  { value: `${highestRtp}%`, label: "Highest RTP in the catalogue" },
  { value: "100%", label: "Stake exclusive" },
  { value: "HTML5", label: "One build, every device" },
];
