import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import heroArt from "@/assets/hero.jpg";
import { GameCard, StatusBadge } from "@/components/site/GameCard";
import { Reveal } from "@/components/site/Reveal";
import { formatReleaseDate, games, news, stats } from "@/data/games";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tinex Games — Original Slot Studio for Regulated Markets" },
      {
        name: "description",
        content:
          "Tinex Games builds high-volatility slots and original mechanics for licensed operators in 31 regulated markets. Explore the catalogue.",
      },
      { property: "og:title", content: "Tinex Games — Original Slot Studio" },
      {
        property: "og:description",
        content:
          "High-volatility slots and original mechanics, built in-house for licensed operators worldwide.",
      },
    ],
  }),
  component: Home,
});

const pillars = [
  {
    n: "01",
    title: "Video Slots",
    body: "Ways, cluster and lines engines with hand-tuned volatility curves and bonus rounds that escalate rather than repeat.",
  },
  {
    n: "02",
    title: "Hold & Win",
    body: "Grid-locking mechanics with prize tiers, level jumps and instant symbols designed for long, readable sessions.",
  },
  {
    n: "03",
    title: "Feature Engines",
    body: "Reusable, certifiable feature frameworks — collect meters, upgrade paths, persistent state — shared across the catalogue.",
  },
  {
    n: "04",
    title: "Tinex Core",
    body: "Our own runtime: sub-1.4s time-to-first-spin on 4G, one build for every device, one integration for every operator.",
  },
];

function Home() {
  const featured = games[0];
  const latest = games.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-svh items-end overflow-hidden">
        <img
          src={heroArt}
          alt="Tinex Games cinematic vault key artwork"
          width={1920}
          height={1088}
          className="hero-pan absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 veil" />
        <div className="absolute inset-0 bg-background/40" />

        <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-16 pt-36 sm:px-8 sm:pb-24">
          <Reveal>
            <p className="eyebrow">Independent game studio · Est. 2019</p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="display mt-6 text-[clamp(3.6rem,15vw,15rem)] text-foreground">
              Tinex
              <br />
              <span className="text-molten">Games</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,34rem)_auto] md:items-end md:justify-between">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                We build loud, high-volatility slots with original mechanics — from first sketch to
                certified release — for licensed operators across 31 regulated markets.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/games"
                  className="group inline-flex items-center gap-3 bg-molten px-8 py-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
                >
                  View all games
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 border border-border px-8 py-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Become a partner
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-border bg-surface py-4">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex gap-10">
              {games.concat(games).map((g, i) => (
                <span
                  key={`${dup}-${g.slug}-${i}`}
                  className="display text-xl text-muted-foreground"
                >
                  {g.title} <span className="text-primary">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8">
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="bg-background p-8">
              <div className="display text-6xl text-molten sm:text-7xl">{s.value}</div>
              <div className="mt-3 text-[0.68rem] uppercase tracking-[0.26em] text-muted-foreground">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LATEST GAMES */}
      <section className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8">
        <Reveal className="mb-12 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
          <div className="min-w-0">
            <p className="eyebrow">Catalogue</p>
            <h2 className="display mt-4 text-[clamp(2.6rem,7vw,6rem)] text-foreground">
              Latest games
            </h2>
          </div>
          <Link
            to="/games"
            className="underline-sweep hidden shrink-0 items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary sm:inline-flex"
          >
            All titles <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {latest.map((g, i) => (
            <Reveal key={g.slug} delay={i * 90}>
              <GameCard game={g} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED GAME */}
      <section className="relative overflow-hidden border-y border-border">
        <img
          src={featured.art}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-[2px]"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative mx-auto grid max-w-[1600px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="overflow-hidden border border-border">
              <img
                src={featured.art}
                alt={`${featured.title} key artwork`}
                width={1024}
                height={1280}
                loading="lazy"
                className="aspect-4/5 w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Featured release</p>
            <h2 className="display mt-4 text-[clamp(3rem,9vw,8rem)] text-foreground">
              {featured.title}
            </h2>
            <p className="mt-3 text-lg text-primary">{featured.tagline}</p>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              {featured.description}
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
              {[
                ["Volatility", featured.volatility],
                ["Max win", featured.maxWin],
                ["RTP", featured.rtp],
                ["Layout", featured.layout],
              ].map(([k, v]) => (
                <div key={k} className="bg-background p-5">
                  <dt className="text-[0.58rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-2 font-semibold text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/games/$slug"
                params={{ slug: featured.slug }}
                className="inline-flex items-center gap-2 border border-border px-8 py-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Game details <ArrowUpRight className="h-4 w-4" />
              </Link>
              {featured.playUrl && (
                <a
                  href={featured.playUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 bg-molten px-8 py-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
                >
                  <Play className="h-4 w-4" /> Play demo
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8">
        <Reveal>
          <p className="eyebrow">What we build</p>
          <h2 className="display mt-4 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] text-foreground">
            Four things, <span className="text-molten">done properly</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px bg-border md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 80}
              className="group bg-background p-8 transition-colors duration-500 hover:bg-surface sm:p-12"
            >
              <span className="display text-sm tracking-[0.3em] text-primary">{p.n}</span>
              <h3 className="display mt-6 text-4xl text-foreground transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-2 sm:text-5xl">
                {p.title}
              </h3>
              <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8">
          <Reveal>
            <p className="eyebrow">Studio philosophy</p>
          </Reveal>
          <Reveal delay={80}>
            <p className="display mt-8 max-w-6xl text-[clamp(2rem,5.4vw,4.6rem)] leading-[0.95] text-foreground">
              A slot should feel like something is{" "}
              <span className="text-molten">about to happen</span> — even on a dead spin.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-14 grid max-w-5xl gap-10 md:grid-cols-3">
              {[
                [
                  "Tension over noise",
                  "We design the moment before the win. Sound, motion and pacing serve anticipation, never decoration.",
                ],
                [
                  "One idea per game",
                  "Every title ships with a single mechanic strong enough to name it. If it needs three, it isn't ready.",
                ],
                [
                  "Certified from day one",
                  "Compliance sits in the maths room, not at the end of the pipeline. Nothing gets built we can't license.",
                ],
              ].map(([t, b]) => (
                <div key={t}>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{t}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* NEWS */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8">
        <Reveal>
          <p className="eyebrow">Newsroom</p>
          <h2 className="display mt-4 text-[clamp(2.6rem,7vw,6rem)] text-foreground">
            Latest releases
          </h2>
        </Reveal>
        <ul className="mt-12">
          {news.map((n, i) => (
            <Reveal
              as="li"
              key={n.title}
              delay={i * 70}
              className="group grid gap-4 border-t border-border py-8 transition-colors duration-500 hover:bg-surface md:grid-cols-[9rem_7rem_1fr] md:items-baseline md:gap-8 md:px-4"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {formatReleaseDate(n.date)}
              </span>
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-primary">
                {n.tag}
              </span>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold text-foreground transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-2 sm:text-2xl">
                  {n.title}
                </h3>
                <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{n.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="pointer-events-none absolute inset-0 bg-molten opacity-[0.12]" />
        <div className="relative mx-auto max-w-[1600px] px-5 py-28 text-center sm:px-8">
          <Reveal>
            <p className="eyebrow">Distribution</p>
            <h2 className="display mx-auto mt-6 max-w-5xl text-[clamp(2.8rem,9vw,8rem)] text-foreground">
              Put Tinex on your <span className="text-molten">lobby</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground">
              One integration, the full catalogue, certified for your markets. Tell us where you
              operate and we'll come back within two working days.
            </p>
            <Link
              to="/contact"
              className="group mt-10 inline-flex items-center gap-3 bg-molten px-10 py-5 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="sr-only">
        <StatusBadge status="Released" />
      </div>
    </>
  );
}
