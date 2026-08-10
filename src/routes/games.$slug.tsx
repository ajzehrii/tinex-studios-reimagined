import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play } from "lucide-react";
import { GameCard, StatusBadge } from "@/components/site/GameCard";
import { Reveal } from "@/components/site/Reveal";
import { ExclusiveBadge } from "@/components/site/ExclusiveBadge";
import { JsonLd } from "@/components/site/JsonLd";
import { PLATFORM, formatReleaseDate, gameSpecs, games, getGame } from "@/data/games";
import { seo } from "@/data/site";
import { breadcrumbSchema, gameSchema } from "@/data/schema";

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
      .filter((s) => s.label !== "Game type")
      .map((s) => `${s.label} ${s.value}`)
      .join(", ");
    return seo({
      path: `/games/${game.slug}`,
      type: "article",
      image: game.ogImage,
      title: `${game.title} Slot — Play on Stake | Tinex Games`,
      description: `${game.title} is a Stake exclusive slot by Tinex Games, built on Stake Engine. ${facts}. ${game.tagline}`,
    });
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
        className="mt-10 inline-flex bg-foreground px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink"
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
    // The whole page inherits this title's art colour.
    <article style={{ "--game-accent": `oklch(${game.accent})` } as React.CSSProperties}>
      <JsonLd data={gameSchema(game)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Stake slots", path: "/games" },
          { name: game.title, path: `/games/${game.slug}` },
        ])}
      />
      <section className="relative overflow-hidden border-b border-border bg-ink">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[var(--game-accent)]" />

        <div className="relative mx-auto grid max-w-[1600px] items-center gap-12 px-5 pb-20 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <Link
              to="/games"
              className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-[var(--game-accent)]"
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
            <p className="mt-5 max-w-xl text-lg text-[var(--game-accent)] sm:text-2xl">{game.tagline}</p>

            {game.themes.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-2">
                {game.themes.map((t: string) => (
                  <li
                    key={t}
                    className="border border-border bg-surface px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted-foreground"
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
                className="mt-10 inline-flex items-center gap-3 bg-[var(--game-accent)] px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink transition-opacity hover:opacity-85"
              >
                <Play className="h-4 w-4" /> Play on Stake
              </a>
            )}
          </Reveal>

          <Reveal delay={140} className="order-first lg:order-none">
            <img
              src={game.art}
              alt={`${game.title} — ${game.type.toLowerCase()} by Tinex Games, only on Stake`}
              width={1024}
              height={1280}
              className="mx-auto w-full max-w-md border border-border shadow-[var(--shadow-hard)]"
            />
          </Reveal>
        </div>
      </section>

      {specs.length > 0 && (
        <section className="border-b border-border">
          <dl className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px bg-border lg:grid-cols-4">
            {specs.map((s) => (
              <div key={s.label} className="bg-background p-7">
                <dt className="eyebrow">
                  {s.label}
                </dt>
                <dd className="numeral mt-3 text-3xl text-foreground">{s.value}</dd>
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
            <div className="mt-6 border border-border bg-surface p-8">
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
                  className="underline-sweep mt-6 inline-flex font-mono text-[0.66rem] uppercase tracking-[0.08em] text-[var(--game-accent)]"
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
