import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";
import { formatReleaseDate, gameSpecs, type Game } from "@/data/games";
import { ExclusiveBadge } from "@/components/site/ExclusiveBadge";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: Game["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.2em] backdrop-blur-md",
        status === "Released"
          ? "border-accent/50 bg-background/70 text-accent"
          : status === "Coming Soon"
            ? "border-primary/60 bg-background/70 text-foreground"
            : "border-border bg-background/70 text-muted-foreground",
      )}
    >
      {status}
    </span>
  );
}

export function GameCard({ game, priority = false }: { game: Game; priority?: boolean }) {
  const specs = gameSpecs(game).slice(0, 2);
  const meta = [game.type, game.releaseDate && formatReleaseDate(game.releaseDate)]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-2 hover:border-accent/50 hover:shadow-[var(--shadow-glow)]">
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
            className="h-full w-full object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-110"
          />
          {/* The key art already carries its own title lock-up, so this fades
              into the card body instead of overprinting the artwork. */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-surface to-transparent" />
          <div className="absolute inset-x-4 top-4 flex flex-wrap items-start justify-between gap-2">
            <StatusBadge status={game.status} />
            <ExclusiveBadge />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link to="/games/$slug" params={{ slug: game.slug }}>
          <h3 className="display text-2xl text-foreground transition-colors group-hover:text-accent sm:text-3xl">
            {game.title}
          </h3>
        </Link>
        <p className="mt-2 text-[0.66rem] uppercase tracking-[0.2em] text-muted-foreground">
          {meta}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{game.tagline}</p>

        {specs.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
            {specs.map((s) => (
              <Spec key={s.label} label={s.label} value={s.value} />
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-5">
          <Link
            to="/games/$slug"
            params={{ slug: game.slug }}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Details <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          {game.playUrl && (
            <a
              href={game.playUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-brand px-4 py-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
            >
              <Play className="h-3.5 w-3.5" /> Play
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-2 px-4 py-3">
      <div className="text-[0.56rem] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}
