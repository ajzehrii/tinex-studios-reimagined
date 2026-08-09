import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GameCard } from "@/components/site/GameCard";
import { Reveal } from "@/components/site/Reveal";
import { ExclusiveBadge } from "@/components/site/ExclusiveBadge";
import { JsonLd } from "@/components/site/JsonLd";
import { type GameStatus, gameTitleList, games } from "@/data/games";
import { seo } from "@/data/site";
import { breadcrumbSchema, catalogueSchema } from "@/data/schema";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/games/")({
  head: () =>
    seo({
      path: "/games",
      title: "Stake Slots — Every Tinex Game on Stake | Stake Engine",
      description: `All ${games.length} Tinex Stake slots with RTP and house edge: ${gameTitleList}. Built on Stake Engine, playable only on Stake.`,
    }),
  component: GamesIndex,
});

type Filter = "All" | GameStatus;

function GamesIndex() {
  const [filter, setFilter] = useState<Filter>("All");

  // Only offer filters that actually match something — with a catalogue this
  // small, a tab that leads to an empty grid is just a dead end.
  const filters = useMemo<Filter[]>(() => {
    const present = (["Released", "Coming Soon", "In Certification"] as const).filter((s) =>
      games.some((g) => g.status === s),
    );
    return present.length > 1 ? ["All", ...present] : [];
  }, []);

  const visible = useMemo(
    () =>
      [...games]
        .sort((a, b) => (b.releaseDate ?? "").localeCompare(a.releaseDate ?? ""))
        .filter((g) => filter === "All" || g.status === filter),
    [filter],
  );

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-36 sm:px-8 sm:pt-44">
      <JsonLd data={catalogueSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Stake slots", path: "/games" },
        ])}
      />
      <Reveal>
        <ExclusiveBadge size="lg" />
        <h1 className="display mt-6 text-[clamp(3rem,11vw,11rem)] text-foreground">
          Our <span className="text-gradient">Stake slots</span>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {games.length} titles, every one built on Stake Engine and playable only on Stake.
        </p>
      </Reveal>

      {filters.length > 0 && (
        <Reveal delay={100} className="mt-12 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-6 py-3 text-[0.64rem] font-bold uppercase tracking-[0.2em] transition-all duration-300",
                filter === f
                  ? "border-transparent bg-gradient-brand text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-accent hover:text-accent",
              )}
            >
              {f}
            </button>
          ))}
        </Reveal>
      )}

      <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {visible.map((g, i) => (
          <Reveal key={g.slug} delay={(i % 4) * 80}>
            <GameCard game={g} priority={i < 4} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-16 text-muted-foreground">No titles in this status right now.</p>
      )}
    </div>
  );
}
