import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Layers, Play, Smartphone, Sparkles } from "lucide-react";
import { GameCard } from "@/components/site/GameCard";
import { Reveal } from "@/components/site/Reveal";
import { ExclusiveBadge } from "@/components/site/ExclusiveBadge";
import {
  EXCLUSIVE_URL,
  PLATFORM,
  formatReleaseDate,
  gameSpecs,
  games,
  news,
  stats,
} from "@/data/games";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tinex Games — Slot Studio, Only on Stake" },
      {
        name: "description",
        content:
          "Tinex Games is an independent slot studio. Larp City, Bubble Rise, Sugar Wheel and Floor Is Lava — built on Stake Engine and playable only on Stake.",
      },
      { property: "og:title", content: "Tinex Games — Slot Studio, Only on Stake" },
      {
        property: "og:description",
        content: "Bright, fast slots built on Stake Engine. Play them on Stake.",
      },
    ],
  }),
  component: Home,
});

const pillars = [
  {
    n: "01",
    icon: Layers,
    title: "Cascading grids",
    body: "Winning symbols clear out and everything above drops into the gap. Larp City and Floor Is Lava both run on it — one spin that keeps resolving.",
  },
  {
    n: "02",
    icon: Sparkles,
    title: "Feature spins",
    body: "Rounds that hand control back to the player at the moment it counts. Sugar Wheel is built entirely around the pause before the wheel stops.",
  },
  {
    n: "03",
    icon: Play,
    title: PLATFORM,
    body: "Every title is built and certified on Stake's own game platform, which is what puts them in the lobby as Stake exclusives.",
  },
  {
    n: "04",
    icon: Smartphone,
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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] aura" />

        <div className="relative mx-auto grid w-full max-w-[1600px] items-center gap-16 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Reveal>
              <ExclusiveBadge size="lg" />
            </Reveal>
            <Reveal delay={90}>
              <h1 className="display mt-7 max-w-[14ch] text-[clamp(2.9rem,8.5vw,8rem)] text-foreground">
                Small studio. <span className="text-gradient">Loud games.</span>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Tinex Games builds bright, fast slots on {PLATFORM} — {games.length} of them so far,
                and every one is playable only on Stake.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/games"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-brand px-9 py-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
                >
                  See the games <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={EXCLUSIVE_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-border bg-background/40 px-9 py-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-foreground backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
                >
                  <Play className="h-4 w-4" /> Play on Stake
                </a>
              </div>
            </Reveal>
          </div>

          {/* The catalogue is small enough to show all of it up front. */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {games.map((g, i) => (
              <Reveal key={g.slug} delay={220 + i * 90}>
                <Link
                  to="/games/$slug"
                  params={{ slug: g.slug }}
                  className="group block overflow-hidden rounded-2xl border border-border transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-2 hover:border-accent/60 hover:shadow-[var(--shadow-glow)]"
                >
                  <img
                    src={g.art}
                    alt={`${g.title} key artwork`}
                    width={1024}
                    height={1280}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="aspect-4/5 w-full object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-105"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BAND 2 — STATS */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px bg-border sm:px-0 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="bg-surface px-6 py-12 sm:px-10 sm:py-16">
              <div className="display text-gradient text-5xl sm:text-6xl">{s.value}</div>
              <div className="mt-3 text-[0.64rem] uppercase tracking-[0.24em] text-muted-foreground">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BAND 3 — MARQUEE */}
      <section className="overflow-hidden border-b border-border bg-ink py-6">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex gap-10">
              {games.concat(games).map((g, i) => (
                <span
                  key={`${dup}-${g.slug}-${i}`}
                  className="display text-2xl uppercase tracking-tight text-muted-foreground/50"
                >
                  {g.title} <span className="text-accent">·</span> Only on Stake{" "}
                  <span className="text-accent">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* BAND 4 — THE CATALOGUE */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The catalogue</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,7vw,6rem)] text-foreground">
              Every game we've shipped
            </h2>
          </div>
          <Link
            to="/games"
            className="underline-sweep inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent"
          >
            All games <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {games.map((g, i) => (
            <Reveal key={g.slug} delay={i * 90}>
              <GameCard game={g} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* BAND 5 — FEATURED GAME */}
      <section className="relative overflow-hidden border-y border-border bg-ink">
        <img
          src={featured.art}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20 blur-2xl"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="relative mx-auto grid max-w-[1600px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Featured game</p>
            <h2 className="display mt-4 text-[clamp(2.8rem,9vw,8rem)] text-foreground">
              {featured.title}
            </h2>
            <p className="mt-4 text-lg text-accent">{featured.tagline}</p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {featured.description}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/games/$slug"
                params={{ slug: featured.slug }}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-brand px-9 py-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
              >
                Game details <ArrowRight className="h-4 w-4" />
              </Link>
              {featured.playUrl && (
                <a
                  href={featured.playUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-border bg-background/40 px-9 py-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-foreground backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
                >
                  <Play className="h-4 w-4" /> Play on Stake
                </a>
              )}
            </div>
          </Reveal>

          <Reveal
            delay={140}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border"
          >
            {featuredSpecs.map((s) => (
              <div key={s.label} className="bg-surface/90 px-6 py-8 backdrop-blur-md">
                <div className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {s.label}
                </div>
                <div className="display mt-3 text-2xl text-foreground sm:text-3xl">{s.value}</div>
              </div>
            ))}
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
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 90}
              className="group rounded-2xl border border-border bg-surface p-8 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-2 hover:border-accent/50 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="display text-3xl text-muted-foreground/40">{p.n}</span>
              </div>
              <h3 className="display mt-8 text-2xl text-foreground">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BAND 7 — PHILOSOPHY */}
      <section className="relative overflow-hidden border-y border-border bg-surface">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 aura" />
        <div className="relative mx-auto max-w-[1600px] px-5 py-28 sm:px-8 sm:py-40">
          <Reveal>
            <p className="eyebrow">How we work</p>
            <p className="display mt-8 max-w-6xl text-[clamp(1.8rem,5vw,4.4rem)] text-foreground">
              A short catalogue is a choice. We would rather ship four games people finish{" "}
              <span className="text-gradient">than forty they scroll past</span>.
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

      {/* BAND 9 — CTA */}
      <section className="relative overflow-hidden border-t border-border bg-ink">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full aura rotate-180" />
        <div className="relative mx-auto max-w-[1600px] px-5 py-28 text-center sm:px-8 sm:py-40">
          <Reveal>
            <ExclusiveBadge size="lg" />
            <h2 className="display mx-auto mt-8 max-w-5xl text-[clamp(2.6rem,8vw,7rem)] text-foreground">
              Go and <span className="text-gradient">play them</span>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              All {games.length} titles are live on Stake right now. Operators and press — get in
              touch about what we're building next.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={EXCLUSIVE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-brand px-10 py-5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
              >
                <Play className="h-4 w-4" /> Play on Stake
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-border px-10 py-5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Contact the studio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
