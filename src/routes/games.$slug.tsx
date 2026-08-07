import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play } from "lucide-react";
import { GameCard, StatusBadge } from "@/components/site/GameCard";
import { Reveal } from "@/components/site/Reveal";
import { ExclusiveBadge } from "@/components/site/ExclusiveBadge";
import { PLATFORM, formatReleaseDate, gameSpecs, games, getGame } from "@/data/games";

export const Route = createFileRoute("/games/$slug")({
  loader: ({ params }) => {
    const game = getGame(params.slug);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Game not found — Tinex Games" }, { name: "robots", content: "noindex" }],
      };
    }
    const { game } = loaderData;
    // Only mention specs we actually publish, so the description never reads
    // "undefined volatility" for a title we have no figure for.
    const facts = gameSpecs(game)
      .map((s) => `${s.label} ${s.value}`)
      .join(", ");
    const description = `${game.title} by Tinex Games — ${game.tagline} ${facts}. Play it on Stake.`;
    return {
      meta: [
        { title: `${game.title} — Tinex Games` },
        { name: "description", content: description },
        { property: "og:title", content: `${game.title} — Tinex Games` },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: GameNotFound,
  component: GameDetail,
});

function GameNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-32 pt-48 text-center">
      <h1 className="display text-6xl text-foreground">Game not found</h1>
      <p className="mt-5 text-muted-foreground">
        That title isn't in the Tinex catalogue — it may have been renamed.
      </p>
      <Link
        to="/games"
        className="mt-10 inline-flex rounded-full bg-gradient-brand px-8 py-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary-foreground"
      >
        Back to games
      </Link>
    </div>
  );
}

function GameDetail() {
  const { game } = Route.useLoaderData();
  const related = games.filter((g) => g.slug !== game.slug).slice(0, 3);
  const specs = gameSpecs(game);

  return (
    <article>
      <section className="relative overflow-hidden border-b border-border">
        {/* Blurred fill behind the poster so the 4:5 key art can sit uncropped. */}
        <img
          src={game.art}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-25 blur-3xl"
        />
        <div className="absolute inset-0 bg-ink/70" />

        <div className="relative mx-auto grid max-w-[1600px] items-center gap-12 px-5 pb-20 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <Link
              to="/games"
              className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Catalogue
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <StatusBadge status={game.status} />
              <ExclusiveBadge />
              {game.releaseDate && (
                <span className="text-[0.66rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {formatReleaseDate(game.releaseDate)}
                </span>
              )}
            </div>
            <h1 className="display mt-6 text-[clamp(2.8rem,10vw,9rem)] text-foreground">
              {game.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-accent sm:text-2xl">{game.tagline}</p>

            {game.themes.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-2">
                {game.themes.map((t: string) => (
                  <li
                    key={t}
                    className="rounded-full border border-border bg-surface px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}

            {game.playUrl && (
              <a
                href={game.playUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-brand px-9 py-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
              >
                <Play className="h-4 w-4" /> Play on Stake
              </a>
            )}
          </Reveal>

          <Reveal delay={140} className="order-first lg:order-none">
            <img
              src={game.art}
              alt={`${game.title} key artwork`}
              width={1024}
              height={1280}
              className="mx-auto w-full max-w-md rounded-3xl border border-border shadow-[var(--shadow-lift)]"
            />
          </Reveal>
        </div>
      </section>

      {specs.length > 0 && (
        <section className="border-b border-border">
          <dl className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px bg-border lg:grid-cols-4">
            {specs.map((s) => (
              <div key={s.label} className="bg-background p-7">
                <dt className="text-[0.58rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="display mt-3 text-3xl text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="mx-auto grid max-w-[1600px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <p className="eyebrow">About the game</p>
          <p className="mt-6 text-xl leading-relaxed text-foreground sm:text-2xl">
            {game.description}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <p className="eyebrow">{game.features?.length ? "Features" : "Built on"}</p>
          {game.features?.length ? (
            <ul className="mt-6">
              {game.features.map((f: string) => (
                <li
                  key={f}
                  className="group flex items-center justify-between border-b border-border py-5 transition-colors hover:text-accent"
                >
                  <span className="text-lg font-semibold">{f}</span>
                  <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 rounded-2xl border border-border bg-surface p-8">
              <p className="display text-3xl text-foreground">{PLATFORM}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {game.title} is built and certified on {PLATFORM} and runs as a single HTML5 build —
                the same game on desktop and mobile, launched straight from the Stake lobby.
              </p>
              {game.playUrl && (
                <a
                  href={game.playUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline-sweep mt-6 inline-flex text-[0.66rem] font-bold uppercase tracking-[0.2em] text-accent"
                >
                  View on Stake
                </a>
              )}
            </div>
          )}
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pb-28 sm:px-8">
        <Reveal>
          <h2 className="display text-[clamp(2.2rem,6vw,4.5rem)] text-foreground">More from Tinex</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {related.map((g, i) => (
            <Reveal key={g.slug} delay={i * 80}>
              <GameCard game={g} />
            </Reveal>
          ))}
        </div>
      </section>
    </article>
  );
}
