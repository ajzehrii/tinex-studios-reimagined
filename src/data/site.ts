import { games, getGame } from "@/data/games";

/**
 * The site-wide share card (home, catalogue, about, contact). Chosen
 * deliberately rather than tracking the newest release — a muted key art
 * shipping next would silently weaken every share link on the site.
 * Game pages override this with their own card.
 */
const defaultOg = (getGame("rift-rush") ?? games[0]!).ogImage;

/**
 * Production origin. Canonical tags, og:image, JSON-LD @id values and the
 * sitemap all resolve against this — if the site moves, change it here and
 * regenerate the sitemap (`node scripts/generate-sitemap.mjs`).
 */
export const SITE_URL = "https://tinexgames.com";
export const SITE_NAME = "Tinex Games";
export const SITE_LOCALE = "en_US";

/** Vite gives asset imports a root-relative path; crawlers need absolute. */
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;

export interface SeoInput {
  title: string;
  description: string;
  /** Route path, e.g. "/games/rift-rush". Used for canonical and og:url. */
  path: string;
  /** Imported image asset. Falls back to the site-wide card. */
  image?: string;
  /** "website" for pages, "article" for a game. */
  type?: "website" | "article";
}

/**
 * Single source of the per-page tag set. Every route head goes through this so
 * canonical, og: and twitter: can't drift apart or go missing on a new page.
 */
export function seo({ title, description, path, image, type = "website" }: SeoInput) {
  const url = absoluteUrl(path);
  const img = absoluteUrl(image ?? defaultOg);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: img },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: title },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: SITE_LOCALE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
