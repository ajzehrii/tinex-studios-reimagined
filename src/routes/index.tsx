import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GameCard } from "@/components/site/GameCard";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/Reveal";
import { ExclusiveBadge } from "@/components/site/ExclusiveBadge";
import { JsonLd } from "@/components/site/JsonLd";
import { PlayLinks } from "@/components/site/PlayLinks";
import { seo } from "@/data/site";
import { faqSchema, faqs } from "@/data/schema";
import {
  EXCLUSIVE_URL,
  EXCLUSIVE_URL_COM,
  PLATFORM,
  cadence,
  describe,
  formatReleaseDate,
  gameSpecs,
  games,
  latestTitleList,
  news,
  rtpRange,
  stats,
} from "@/data/games";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      path: "/",
      title: "Stake Slots by Tinex Games | Stake Engine Slot Studio",
      description: `Tinex Games builds Stake slots on Stake Engine — ${games.length} Stake exclusives and counting, including ${latestTitleList(3)}. RTP up to ${rtpRange.max}%.`,
    }),
  component: Home,
});

const pillars = [
  {
    n: "01",
    title: "Cascading grids",
    body: "Winning symbols clear out and everything above drops into the gap. Larp City and Floor Is Lava both run on it — one spin that keeps resolving.",
  },
  {
    n: "02",
    title: "Feature spins",
    body: "Rounds that hand control back to the player at the moment it counts. Sugar Wheel is built entirely around the pause before the wheel stops.",
  },
  {
    n: "03",
    title: PLATFORM,
    body: "Every title is built and certified on Stake's own game platform, which is what puts them in the lobby as Stake exclusives.",
  },
  {
    n: "04",
    title: "One HTML5 build",
    body: "The same build runs on desktop and mobile — no separate client, no second version of the maths to keep in sync.",
  },
];

const principles = [
  [
    "Art that reads",
    "Key art has to work as a thumbnail in a crowded lobby. If it doesn't say what the game is at that size, it goes back.",
  ],
  [
    "Easy to pick up",
    "A player should understand the round within a spin or two. Depth is welcome; a tutorial is not.",
  ],
  [
    "One build, every device",
    "A single HTML5 build for phone and desktop, so what we test is exactly what ships.",
  ],
];

function Home() {
  const featured = games[0]!;
  const featuredSpecs = gameSpecs(featured).slice(0, 4);

  return (
    <>
      {/* BAND 1 — HERO */}
      <section className="relative flex min-h-svh items-center overflow-hidden bg-ink">
        <img
          src={featured.art}
          alt=""
          aria-hidden="true"
          className="hero-pan absolute inset-0 h-full w-full object-cover opacity-20 blur-2xl"
        />
        <div className="absolute inset-0 veil" />

        <div className="relative mx-auto grid w-full max-w-[1600px] items-end gap-14 px-5 pb-16 pt-36 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Reveal>
              <ExclusiveBadge size="lg" />
            </Reveal>
            <Reveal delay={90}>
              <h1 className="display mt-7 max-w-[13ch] text-[clamp(2.9rem,8.5vw,8rem)] leading-[0.86] text-foreground">
                Loud slots. <span className="text-mark">Only on Stake.</span>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Tinex Games is an independent slot studio building on {PLATFORM}.{" "}
                {games.length} Stake slots so far — bright, fast, and every one a Stake exclusive.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/games"
                  className="inline-flex items-center justify-center gap-3 bg-foreground px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink transition-opacity hover:opacity-85"
                >
                  See the games <ArrowRight className="h-4 w-4" />
                </Link>
                <PlayLinks
                  us={EXCLUSIVE_URL}
                  com={EXCLUSIVE_URL_COM}
                  variant="outline"
                  prefix={false}
                />
              </div>
            </Reveal>
          </div>

          {/* Staggered rather than a tidy 2x2 — a symmetrical grid of posters
              is the stock hero for this kind of site. Newest four; the full
              set is one band down. */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {games.slice(0, 4).map((g, i) => (
              <Reveal
                key={g.slug}
                delay={220 + i * 90}
                className={cn(i % 2 === 1 && "translate-y-6 sm:translate-y-10")}
              >
                <Link
                  to="/games/$slug"
                  params={{ slug: g.slug }}
                  style={{ "--game-accent": `oklch(${g.accent})` } as React.CSSProperties}
                  className="group block border border-border transition-[transform,box-shadow] duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[var(--shadow-hard)]"
                >
                  <img
                    src={g.art}
                    alt={`${g.title} — ${g.type.toLowerCase()} by Tinex Games, only on Stake`}
                    width={1024}
                    height={1280}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="aspect-4/5 w-full object-cover"
                  />
                  <span className="flex items-center justify-between border-t border-border bg-surface px-3 py-2">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-foreground">
                      {g.title}
                    </span>
                    <span aria-hidden="true" className="h-2 w-2 bg-[var(--game-accent)]" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BAND 2 — STATS. A plain data strip: label first, figure second, no
          oversized gradient numerals. */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="bg-surface px-6 py-10 sm:px-10 sm:py-12">
              <div className="eyebrow">{s.label}</div>
              <div className="numeral mt-3 text-4xl text-foreground sm:text-5xl">{s.value}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BAND 3 — THE CATALOGUE. The scrolling marquee that used to sit here
          was pure filler and read as template furniture. */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <p className="eyebrow">Latest releases / {games.length} titles in total</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,7vw,6rem)] leading-[0.9] text-foreground">
              Fresh off the line
            </h2>
          </div>
          <Link
            to="/games"
            className="underline-sweep inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-foreground"
          >
            All {games.length} games <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {/* Newest six; the full catalogue lives on /games. */}
          {games.slice(0, 6).map((g, i) => (
            <Reveal key={g.slug} delay={i * 90}>
              <GameCard game={g} priority={i < 2} numbered />
            </Reveal>
          ))}
        </div>
      </section>

      {/* BAND 4 — FEATURED GAME, tinted by its own art colour. */}
      <section
        style={{ "--game-accent": `oklch(${featured.accent})` } as React.CSSProperties}
        className="relative overflow-hidden border-y border-border bg-ink"
      >
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[var(--game-accent)]" />
        <div className="relative mx-auto grid max-w-[1600px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">
              Newest release
              {featured.releaseDate && ` / ${formatReleaseDate(featured.releaseDate)}`}
            </p>
            <h2 className="display mt-4 text-[clamp(2.8rem,9vw,8rem)] leading-[0.86] text-foreground">
              {featured.title}
            </h2>
            {featured.tagline && (
              <p className="mt-4 text-lg text-[var(--game-accent)]">{featured.tagline}</p>
            )}
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {describe(featured)}
            </p>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-y border-border py-5">
              {featuredSpecs.map((s) => (
                <div key={s.label}>
                  <dt className="eyebrow">{s.label}</dt>
                  <dd className="numeral mt-1 text-xl text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/games/$slug"
                params={{ slug: featured.slug }}
                className="inline-flex items-center justify-center gap-3 bg-[var(--game-accent)] px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink transition-opacity hover:opacity-85"
              >
                Game details <ArrowRight className="h-4 w-4" />
              </Link>
              <PlayLinks
                us={featured.playUrl}
                com={featured.stakeComUrl}
                variant="outline"
                prefix={false}
              />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <img
              src={featured.art}
              alt={`${featured.title} — ${featured.type.toLowerCase()} by Tinex Games, only on Stake`}
              width={1024}
              height={1280}
              className="w-full border border-border"
            />
          </Reveal>
        </div>
      </section>

      {/* BAND 6 — WHAT WE BUILD */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="eyebrow">What we build</p>
          <h2 className="display mt-4 max-w-4xl text-[clamp(2.4rem,7vw,6rem)] text-foreground">
            How the games are made
          </h2>
        </Reveal>
        {/* A numbered rule-separated list rather than four icon-chip cards —
            the icon-in-a-rounded-square grid is the most templated block on
            the modern web. */}
        <ul className="mt-12 border-t border-border">
          {pillars.map((p, i) => (
            <Reveal
              as="li"
              key={p.n}
              delay={i * 70}
              className="group grid gap-3 border-b border-border py-8 md:grid-cols-[5rem_16rem_1fr] md:items-baseline md:gap-8"
            >
              <span className="numeral text-sm text-muted-foreground">{p.n}</span>
              <h3 className="display text-2xl text-foreground transition-colors group-hover:text-[var(--game-accent)]">
                {p.title}
              </h3>
              <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* BAND 6 — PHILOSOPHY */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1600px] px-5 py-28 sm:px-8 sm:py-40">
          <Reveal>
            <p className="eyebrow">How we work</p>
            <p className="display mt-8 max-w-6xl text-[clamp(1.8rem,5vw,4.4rem)] leading-[0.95] text-foreground">
              {games.length} games in {cadence.weeks} weeks.{" "}
              <span className="text-mark">
                A new one roughly every {cadence.daysPerRelease} days
              </span>
              , and every one of them only on Stake.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {principles.map(([t, b], i) => (
              <Reveal key={t} delay={i * 100}>
                <h3 className="display text-2xl text-foreground">{t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BAND 8 — NEWS (renders only when there is real news to show) */}
      {news.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="eyebrow">Latest releases &amp; news</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,7vw,6rem)] text-foreground">
              From the studio
            </h2>
          </Reveal>
          <ul className="mt-14 divide-y divide-border border-y border-border">
            {news.map((n, i) => (
              <Reveal
                as="li"
                key={n.title}
                delay={i * 70}
                className="group grid gap-4 py-8 transition-colors hover:bg-surface/60 md:grid-cols-[180px_180px_1fr] md:items-baseline md:gap-8 md:px-4"
              >
                <span className="text-[0.66rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {formatReleaseDate(n.date)}
                </span>
                <span className="w-fit rounded-full border border-accent/40 px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-accent">
                  {n.tag}
                </span>
                <div>
                  <h3 className="display text-2xl text-foreground transition-colors group-hover:text-accent sm:text-3xl">
                    {n.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    {n.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {/* BAND 9 — FAQ. Copy here is mirrored verbatim into FAQPage schema in
          data/schema.ts; change one and change the other. */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
        <JsonLd data={faqSchema} />
        <Reveal>
          <p className="eyebrow">Common questions</p>
          <h2 className="display mt-4 max-w-4xl text-[clamp(2.4rem,7vw,6rem)] text-foreground">
            Stake slots, explained
          </h2>
        </Reveal>
        <dl className="mt-12 border-t border-border">
          {faqs.map((f, i) => (
            <Reveal
              key={f.q}
              delay={i * 60}
              className="grid gap-2 border-b border-border py-7 md:grid-cols-[1fr_1.4fr] md:gap-10"
            >
              <dt className="display text-xl text-foreground sm:text-2xl">{f.q}</dt>
              <dd className="text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* BAND 8 — CTA. Left-aligned; the centred full-bleed closer with a
          radial glow behind it is the stock ending for this kind of page. */}
      <section className="border-t border-border bg-ink">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <ExclusiveBadge size="lg" />
            <h2 className="display mt-7 max-w-4xl text-[clamp(2.6rem,8vw,7rem)] leading-[0.86] text-foreground">
              Go and <span className="text-mark">play them</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              All {games.length} titles are live on Stake.us and Stake.com right now. Operators and
              press — get in touch about what we're building next.
            </p>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <PlayLinks us={EXCLUSIVE_URL} com={EXCLUSIVE_URL_COM} className="flex-col sm:flex-row" />
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 border border-foreground/30 px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-foreground transition-colors hover:border-[var(--game-accent)] hover:text-[var(--game-accent)]"
            >
              Contact the studio
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
