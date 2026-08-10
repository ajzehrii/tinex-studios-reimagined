import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { ExclusiveBadge } from "@/components/site/ExclusiveBadge";
import { JsonLd } from "@/components/site/JsonLd";
import { type GameStatus, gameSpecs, gameTitleList, games } from "@/data/games";
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
        <h1 className="display mt-6 text-[clamp(3rem,11vw,11rem)] leading-[0.85] text-foreground">
          Our <span className="text-mark">Stake slots</span>
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
                "border px-5 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] transition-colors",
                filter === f
                  ? "border-foreground bg-foreground text-ink"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </Reveal>
      )}

      {/* An index, not a card wall: number, title, specs and art on one row,
          alternating side. Reads like a studio's catalogue rather than a
          storefront grid. */}
      <ol className="mt-16 border-t border-border">
        {visible.map((g, i) => (
          <Reveal
            as="li"
            key={g.slug}
            delay={(i % 3) * 70}
            style={{ "--game-accent": `oklch(${g.accent})` } as React.CSSProperties}
            className="group border-b border-border"
          >
            <Link
              to="/games/$slug"
              params={{ slug: g.slug }}
              className={cn(
                "grid items-center gap-6 py-8 md:grid-cols-[4rem_1fr_14rem] md:gap-10",
                i % 2 === 1 && "md:[direction:rtl] md:[&>*]:[direction:ltr]",
              )}
            >
              <span className="numeral text-sm text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h2 className="display text-[clamp(2rem,5vw,3.6rem)] leading-none text-foreground transition-colors group-hover:text-[var(--game-accent)]">
                  {g.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">{g.tagline}</p>
                <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
                  {gameSpecs(g)
                    .slice(0, 3)
                    .map((s) => (
                      <div key={s.label} className="flex items-baseline gap-2">
                        <dt className="eyebrow">{s.label}</dt>
                        <dd className="numeral text-sm text-foreground">{s.value}</dd>
                      </div>
                    ))}
                </dl>
              </div>

              <img
                src={g.art}
                alt={`${g.title} — ${g.type.toLowerCase()} by Tinex Games, only on Stake`}
                width={1024}
                height={1280}
                loading={i < 3 ? "eager" : "lazy"}
                className="w-full max-w-[14rem] border border-border transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-hard)]"
              />
            </Link>
          </Reveal>
        ))}
      </ol>

      {visible.length === 0 && (
        <p className="mt-16 text-muted-foreground">No titles in this status right now.</p>
      )}
    </div>
  );
}
