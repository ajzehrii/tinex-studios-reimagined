import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play } from "lucide-react";
import { GameCard, StatusBadge } from "@/components/site/GameCard";
import { Reveal } from "@/components/site/Reveal";
import { formatReleaseDate, games, getGame } from "@/data/games";

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
    const description = `${game.title} by Tinex Games — ${game.volatility} volatility, ${game.maxWin} max win, ${game.rtp} RTP. ${game.tagline}`;
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
        className="mt-10 inline-flex bg-gradient-indigo px-8 py-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary-foreground"
      >
        Back to games
      </Link>
    </div>
  );
}

function GameDetail() {
  const { game } = Route.useLoaderData();
  const related = games.filter((g) => g.slug !== game.slug).slice(0, 3);

  return (
    <article>
      <section className="relative min-h-[85svh] overflow-hidden">
        <img
          src={game.art}
          alt={`${game.title} key artwork`}
          width={1024}
          height={1280}
          className="absolute inset-0 h-full w-full scale-105 object-cover"
        />
        <div className="absolute inset-0 veil" />
        <div className="absolute inset-0 bg-background/35" />
        <div className="relative mx-auto flex min-h-[85svh] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-40 sm:px-8">
          <Reveal>
            <Link
              to="/games"
              className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Catalogue
            </Link>
            <div className="mt-6 flex items-center gap-4">
              <StatusBadge status={game.status} />
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {formatReleaseDate(game.releaseDate)}
              </span>
            </div>
            <h1 className="display mt-5 text-[clamp(3.4rem,14vw,14rem)] text-foreground">
              {game.title}
            </h1>
            <p className="mt-3 text-lg text-primary sm:text-2xl">{game.tagline}</p>
            {game.playUrl && (
              <a
                href={game.playUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-10 inline-flex items-center gap-3 bg-gradient-indigo px-9 py-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
              >
                <Play className="h-4 w-4" /> Play demo
              </a>
            )}
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border">
        <dl className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px bg-border lg:grid-cols-5">
          {[
            ["Game type", game.type],
            ["Layout", game.layout],
            ["Volatility", game.volatility],
            ["Max win", game.maxWin],
            ["RTP", game.rtp],
          ].map(([k, v]) => (
            <div key={k} className="bg-background p-7">
              <dt className="text-[0.58rem] uppercase tracking-[0.24em] text-muted-foreground">
                {k}
              </dt>
              <dd className="display mt-3 text-3xl text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <p className="eyebrow">About the game</p>
          <p className="mt-6 text-xl leading-relaxed text-foreground sm:text-2xl">
            {game.description}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <p className="eyebrow">Features</p>
          <ul className="mt-6">
            {game.features.map((f: string) => (
              <li
                key={f}
                className="group flex items-center justify-between border-b border-border py-5 transition-colors hover:text-primary"
              >
                <span className="text-lg font-semibold">{f}</span>
                <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  ✦
                </span>
              </li>
            ))}
          </ul>
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
