import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";
import { formatReleaseDate, gameSpecs, type Game } from "@/data/games";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: Game["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] backdrop-blur-sm",
        status === "Released"
          ? "border-foreground/30 bg-ink/80 text-foreground"
          : "border-border bg-ink/80 text-muted-foreground",
      )}
    >
      {status}
    </span>
  );
}

/**
 * Cards are tinted by the title's own art colour and lift onto a flat offset
 * shadow rather than a coloured blur. `index` prints the catalogue number,
 * which is the main structural device on the games pages.
 */
export function GameCard({
  game,
  priority = false,
  index,
}: {
  game: Game;
  priority?: boolean;
  index?: number;
}) {
  const specs = gameSpecs(game).slice(0, 2);
  const meta = [game.type, game.releaseDate && formatReleaseDate(game.releaseDate)]
    .filter(Boolean)
    .join(" / ");

  return (
    <article
      style={{ "--game-accent": `oklch(${game.accent})` } as React.CSSProperties}
      className="group relative flex h-full flex-col border border-border bg-surface transition-[transform,box-shadow] duration-300 hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[var(--shadow-hard)]"
    >
      {/* Art colour as a hard rule along the top edge. */}
      <span aria-hidden="true" className="h-1 w-full bg-[var(--game-accent)]" />

      <Link
        to="/games/$slug"
        params={{ slug: game.slug }}
        className="block"
        aria-label={`${game.title} details`}
      >
        <div className="relative aspect-4/5 overflow-hidden">
          <img
            src={game.art}
            alt={`${game.title} — ${game.type.toLowerCase()} by Tinex Games, only on Stake`}
            width={1024}
            height={1280}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
            <StatusBadge status={game.status} />
            {index !== undefined && (
              <span className="numeral bg-ink/80 px-2 py-1 text-[0.65rem] text-foreground backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col border-t border-border p-5">
        <Link to="/games/$slug" params={{ slug: game.slug }}>
          <h3 className="display text-2xl leading-none text-foreground transition-colors group-hover:text-[var(--game-accent)] sm:text-3xl">
            {game.title}
          </h3>
        </Link>
        <p className="eyebrow mt-2">{meta}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{game.tagline}</p>

        {specs.length > 0 && (
          <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4">
            {specs.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <dt className="eyebrow">{s.label}</dt>
                <dd className="numeral text-sm text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-auto flex gap-2 pt-5">
          <Link
            to="/games/$slug"
            params={{ slug: game.slug }}
            className="flex flex-1 items-center justify-center gap-2 border border-border px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-foreground transition-colors hover:border-[var(--game-accent)] hover:text-[var(--game-accent)]"
          >
            Details <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          {game.playUrl && (
            <a
              href={game.playUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex flex-1 items-center justify-center gap-2 bg-[var(--game-accent)] px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink transition-opacity hover:opacity-85"
            >
              <Play className="h-3.5 w-3.5" /> Play
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
