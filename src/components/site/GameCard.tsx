import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";
import { formatReleaseDate, type Game } from "@/data/games";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: Game["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em]",
        status === "Released"
          ? "border-primary/50 text-primary"
          : status === "Coming Soon"
            ? "border-accent/60 text-accent"
            : "border-border text-muted-foreground",
      )}
    >
      {status}
    </span>
  );
}

export function GameCard({ game, priority = false }: { game: Game; priority?: boolean }) {
  return (
    <article className="group relative overflow-hidden border border-border bg-surface transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-2 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]">
      <Link
        to="/games/$slug"
        params={{ slug: game.slug }}
        className="block"
        aria-label={`${game.title} details`}
      >
        <div className="relative aspect-4/5 overflow-hidden">
          <img
            src={game.art}
            alt={`${game.title} key artwork`}
            width={1024}
            height={1280}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-110"
          />
          <div className="absolute inset-0 veil" />
          <div className="absolute left-4 top-4">
            <StatusBadge status={game.status} />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="display text-3xl text-foreground sm:text-4xl">{game.title}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {game.type} · {formatReleaseDate(game.releaseDate)}
            </p>
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-px bg-border">
        <Spec label="Volatility" value={game.volatility} />
        <Spec label="Max win" value={game.maxWin} />
      </div>

      <div className="flex gap-2 p-4">
        <Link
          to="/games/$slug"
          params={{ slug: game.slug }}
          className="flex flex-1 items-center justify-center gap-2 border border-border px-4 py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Details <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
        {game.playUrl && (
          <a
            href={game.playUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="flex flex-1 items-center justify-center gap-2 bg-molten px-4 py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
          >
            <Play className="h-3.5 w-3.5" /> Play
          </a>
        )}
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-2 px-4 py-3">
      <div className="text-[0.58rem] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}
