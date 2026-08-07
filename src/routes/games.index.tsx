import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GameCard } from "@/components/site/GameCard";
import { Reveal } from "@/components/site/Reveal";
import { ExclusiveBadge } from "@/components/site/ExclusiveBadge";
import { games } from "@/data/games";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/games/")({
  head: () => ({
    meta: [
      { title: "Games — Slot Catalogue Live on Stake | Tinex" },
      {
        name: "description",
        content:
          "Browse every Tinex Games title: volatility, max win, RTP and release status for each slot and Hold & Win engine.",
      },
      { property: "og:title", content: "Games — Tinex Games Catalogue" },
      {
        property: "og:description",
        content: "Every Tinex slot with volatility, max win, RTP and release status.",
      },
    ],
  }),
  component: GamesIndex,
});

const filters = ["All", "Released", "Coming Soon", "In Certification"] as const;

function GamesIndex() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(
    () =>
      [...games]
        .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
        .filter((g) => filter === "All" || g.status === filter),
    [filter],
  );

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-36 sm:px-8 sm:pt-44">
      <Reveal>
        <ExclusiveBadge size="lg" />
        <h1 className="display mt-6 text-[clamp(3.2rem,12vw,12rem)] text-foreground">
          The <span className="text-gradient">catalogue</span>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {games.length} titles. Every one launches on Stake first — more operators to follow as
          exclusivity windows expire.
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-12 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-6 py-3 text-[0.64rem] font-bold uppercase tracking-[0.2em] transition-all duration-300",
              filter === f
                ? "border-transparent bg-gradient-indigo text-primary-foreground"
                : "border-border text-muted-foreground hover:border-accent hover:text-accent",
            )}
          >
            {f}
          </button>
        ))}
      </Reveal>


      <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((g, i) => (
          <Reveal key={g.slug} delay={(i % 3) * 80}>
            <GameCard game={g} priority={i < 3} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-16 text-muted-foreground">No titles in this status right now.</p>
      )}
    </div>
  );
}
