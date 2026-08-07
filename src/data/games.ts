import voltageTiger from "@/assets/game-voltage-tiger.jpg";
import abyssCrown from "@/assets/game-abyss-crown.jpg";
import emberForge from "@/assets/game-ember-forge.jpg";
import frostHowl from "@/assets/game-frost-howl.jpg";
import vaultRaiders from "@/assets/game-vault-raiders.jpg";
import scarabNights from "@/assets/game-scarab-nights.jpg";

export type Volatility = "Low" | "Medium" | "High" | "Extreme";
export type GameStatus = "Released" | "Coming Soon" | "In Certification";

export interface Game {
  slug: string;
  title: string;
  tagline: string;
  status: GameStatus;
  releaseDate: string; // ISO
  volatility: Volatility;
  maxWin: string;
  rtp: string;
  type: string;
  layout: string;
  features: string[];
  description: string;
  art: string;
  playUrl?: string;
}

export const games: Game[] = [
  {
    slug: "voltage-tiger",
    title: "Voltage Tiger",
    tagline: "Neon streets. Predator multipliers.",
    status: "Released",
    releaseDate: "2026-06-18",
    volatility: "Extreme",
    maxWin: "25,000x",
    rtp: "96.42%",
    type: "Video Slot",
    layout: "5x4 · 1,024 ways",
    features: ["Surge Wilds", "Prowl Respins", "Multiplier Chase", "Bonus Buy"],
    description:
      "A rain-soaked megacity where every strike of lightning charges the reels. Voltage Tiger stacks surge wilds into a single escalating multiplier that never resets during the Prowl feature — our most aggressive math model to date.",
    art: voltageTiger,
    playUrl: "https://stake.com/casino/games/tinex-voltage-tiger",
  },
  {
    slug: "abyss-crown",
    title: "Abyss Crown",
    tagline: "The deep keeps what it takes.",
    status: "Released",
    releaseDate: "2026-04-02",
    volatility: "High",
    maxWin: "12,500x",
    rtp: "96.10%",
    type: "Video Slot",
    layout: "6x5 · Cluster Pays",
    features: ["Tentacle Collect", "Drowned Free Spins", "Crown Jackpots"],
    description:
      "A sunken temple engine built on cascading clusters. Collect symbols feed the Crown meter, and every tier unlocked permanently upgrades the free spin round for the rest of the session.",
    art: abyssCrown,
    playUrl: "https://stake.com/casino/games/tinex-abyss-crown",
  },
  {
    slug: "ember-forge",
    title: "Ember Forge",
    tagline: "Hammer the reels until they glow.",
    status: "Released",
    releaseDate: "2026-01-22",
    volatility: "High",
    maxWin: "18,000x",
    rtp: "96.28%",
    type: "Video Slot",
    layout: "5x5 · Ways",
    features: ["Forge Upgrade", "Phoenix Rebirth", "Molten Wilds"],
    description:
      "Every losing spin heats the forge. When the bar breaks, low symbols are melted out of the game entirely for the remainder of the feature — a shrinking reel set that makes the phoenix inevitable.",
    art: emberForge,
    playUrl: "https://stake.com/casino/games/tinex-ember-forge",
  },
  {
    slug: "frost-howl",
    title: "Frost Howl",
    tagline: "Silence, then the pack.",
    status: "In Certification",
    releaseDate: "2026-09-10",
    volatility: "Medium",
    maxWin: "9,000x",
    rtp: "96.05%",
    type: "Video Slot",
    layout: "5x3 · 243 ways",
    features: ["Frozen Respins", "Pack Wilds", "Shatter Bonus"],
    description:
      "A slower, colder build. Frozen respins lock winning symbols in ice while the pack circles, converting the grid one column at a time into a single roaring payline.",
    art: frostHowl,
  },
  {
    slug: "vault-raiders",
    title: "Vault Raiders",
    tagline: "Crack it before the lasers reset.",
    status: "Coming Soon",
    releaseDate: "2026-11-05",
    volatility: "Extreme",
    maxWin: "30,000x",
    rtp: "96.35%",
    type: "Hold & Win",
    layout: "6x4 · Hold & Win",
    features: ["Laser Grid Hold", "Vault Levels", "Instant Prizes"],
    description:
      "Our first Hold & Win engine. Bars land, lock and drag neighbouring cells into the grid; clear a full row of the laser grid to blow the vault open and jump an entire prize tier.",
    art: vaultRaiders,
  },
  {
    slug: "scarab-nights",
    title: "Scarab Nights",
    tagline: "Gold moves after dark.",
    status: "Released",
    releaseDate: "2025-10-14",
    volatility: "Medium",
    maxWin: "7,500x",
    rtp: "96.18%",
    type: "Video Slot",
    layout: "5x3 · 20 lines",
    features: ["Expanding Scarab", "Night Market Picks", "Double Bonus"],
    description:
      "A desert bazaar classic reworked with a modern pick round. The expanding scarab covers a full reel and holds through every retrigger of the Night Market feature.",
    art: scarabNights,
    playUrl: "https://stake.com/casino/games/tinex-scarab-nights",
  },
];

export const EXCLUSIVE_PARTNER = "Stake";
export const EXCLUSIVE_LABEL = "Currently Stake Exclusive";
export const EXCLUSIVE_URL = "https://stake.com";

export const getGame = (slug: string) => games.find((g) => g.slug === slug);

export const formatReleaseDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export interface NewsItem {
  date: string;
  tag: string;
  title: string;
  body: string;
}

export const news: NewsItem[] = [
  {
    date: "2026-07-28",
    tag: "Release",
    title: "Voltage Tiger launches exclusively on Stake",
    body: "Our most volatile title yet went live as a Stake exclusive with a synchronised tournament week and a record first-day spin count.",
  },
  {
    date: "2026-07-04",
    tag: "Studio",
    title: "Tinex opens a second production floor",
    body: "Twenty-two new seats dedicated to maths, art and certification — capacity for a two-week cadence and for the additional operators joining our roadmap.",
  },
  {
    date: "2026-06-11",
    tag: "Partnership",
    title: "Stake exclusivity window set to run through 2027",
    body: "Every current Tinex title launches on Stake first. From 2028 the catalogue opens to additional operators as each window expires.",
  },
  {
    date: "2026-05-19",
    tag: "Tech",
    title: "Tinex Core 3 halves load times on mobile",
    body: "A rewritten asset pipeline streams reel art progressively, cutting time-to-first-spin to under 1.4 seconds on 4G.",
  },
];

export const stats = [
  { value: "100%", label: "Live on Stake today" },
  { value: "48", label: "Games shipped" },
  { value: "1.2B", label: "Spins per month" },
  { value: "31", label: "Regulated markets" },
];

