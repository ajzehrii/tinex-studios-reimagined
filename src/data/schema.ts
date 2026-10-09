import { SITE_NAME, SITE_URL, absoluteUrl } from "@/data/site";
import {
  EXCLUSIVE_URL,
  EXCLUSIVE_URL_COM,
  PLATFORM,
  type Game,
  cadence,
  describe,
  formatReleaseDate,
  games,
  latestTitleList,
  rtpRange,
} from "@/data/games";

const ORG_ID = `${SITE_URL}/#organization`;

/**
 * Structured data. Everything here must match what's visible on the page —
 * Google treats schema that isn't reflected in the rendered content as spam,
 * so no ratings, prices or awards unless the page actually shows them.
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  alternateName: "Tinex",
  url: SITE_URL,
  description: `${SITE_NAME} is an independent slot studio building on ${PLATFORM}. Its slots are playable only on Stake.`,
  // The Stake publisher pages are the studio's other public presence.
  sameAs: [EXCLUSIVE_URL, EXCLUSIVE_URL_COM],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "en",
  publisher: { "@id": ORG_ID },
};

export const gameSchema = (game: Game) => ({
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "@id": `${SITE_URL}/games/${game.slug}#game`,
  name: game.title,
  alternateName: `${game.title} ${game.type.toLowerCase()}`,
  url: absoluteUrl(`/games/${game.slug}`),
  image: absoluteUrl(game.art),
  description: describe(game),
  genre: [game.type, ...game.themes],
  ...(game.releaseDate ? { datePublished: game.releaseDate } : {}),
  gamePlatform: "HTML5 Web",
  playMode: "SinglePlayer",
  applicationCategory: "GameApplication",
  operatingSystem: "Web browser",
  inLanguage: "en",
  publisher: { "@id": ORG_ID },
  author: { "@id": ORG_ID },
  sameAs: [game.playUrl, game.stakeComUrl],
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: absoluteUrl(t.path),
  })),
});

export const catalogueSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/games#catalogue`,
  name: `Stake slots by ${SITE_NAME}`,
  url: absoluteUrl("/games"),
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: games.length,
    itemListElement: games.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/games/${g.slug}`),
      name: g.title,
    })),
  },
};

/**
 * Answers shown verbatim in the FAQ band on the homepage. Keep the two in
 * sync — schema that doesn't match visible copy is a manual-action risk.
 */
export const faqs = [
  {
    q: "What is Stake Engine?",
    a: `${PLATFORM} is Stake's own game development platform. Studios build, certify and publish slots on it directly, which is how a finished Tinex build reaches the Stake lobby without a separate integration.`,
  },
  {
    q: `Are ${SITE_NAME} slots only on Stake?`,
    a: `Yes. All ${games.length} Tinex titles are Stake exclusives — Stake tags every one of them "Only on Stake". You can play them on Stake.us and Stake.com, and at no other casino.`,
  },
  {
    q: `What Stake slots does ${SITE_NAME} make?`,
    // Lists the newest few rather than every title, which outgrew a sentence.
    a: `${games.length} so far, starting with ${games[games.length - 1]?.title} on ${formatReleaseDate(cadence.firstRelease)} — a new release roughly every ${cadence.daysPerRelease} days since. The newest are ${latestTitleList(3)}. Every title is a single HTML5 build that runs the same on desktop and mobile, and the full list is on the games page.`,
  },
  {
    q: "What is the RTP of Tinex slots?",
    a: `Between ${rtpRange.min.toFixed(2)}% and ${rtpRange.max.toFixed(2)}% depending on the title, as published by Stake. Every game page on this site lists that title's own RTP and house edge.`,
  },
  {
    q: "How do I play Tinex slots on Stake?",
    a: "Open any game page on this site and choose Stake.us or Stake.com — each link goes straight to that title in the Stake lobby. Tinex is the studio that makes the games; play happens on Stake, not here.",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
