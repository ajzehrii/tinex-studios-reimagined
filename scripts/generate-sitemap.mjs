/**
 * Writes public/sitemap.xml from the route data.
 *
 * Runs automatically before `npm run build`. Run it by hand after adding a
 * game if you want the committed sitemap to match straight away:
 *   node scripts/generate-sitemap.mjs
 *
 * games.ts is read as text rather than imported because it pulls in image
 * assets that only Vite can resolve.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(resolve(root, p), "utf8");

const siteUrl = read("src/data/site.ts").match(/SITE_URL\s*=\s*"([^"]+)"/)?.[1];
if (!siteUrl) throw new Error("Could not read SITE_URL from src/data/site.ts");

const slugs = [...read("src/data/games.ts").matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
if (slugs.length === 0) throw new Error("Found no game slugs in src/data/games.ts");

const pages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/games", priority: "0.9", changefreq: "weekly" },
  ...slugs.map((s) => ({ path: `/games/${s}`, priority: "0.8", changefreq: "monthly" })),
  { path: "/about", priority: "0.5", changefreq: "yearly" },
  { path: "/contact", priority: "0.5", changefreq: "yearly" },
];

const lastmod = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${new URL(p.path, siteUrl).href}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(root, "public/sitemap.xml"), xml, "utf8");
console.log(`sitemap.xml: ${pages.length} urls at ${siteUrl}`);
