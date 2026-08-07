import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GameCard } from "@/components/site/GameCard";
import { Reveal } from "@/components/site/Reveal";
import { games } from "@/data/games";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/games/")({
  head: () => ({
    meta: [
      { title: "Games — Tinex Games Slot Catalogue" },
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
        <p className="eyebrow">{games.length} titles</p>
        <h1 className="display mt-5 text-[clamp(3.4rem,13vw,13rem)] text-foreground">
          The <span className="text-gradient">catalogue</span>
        </h1>
      </Reveal>

      <Reveal delay={100} className="mt-12 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "border px-6 py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-all duration-300",
              filter === f
                ? "border-primary bg-gradient-indigo text-primary-foreground"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
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
