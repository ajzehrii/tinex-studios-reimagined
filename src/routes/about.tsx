import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PLATFORM, cadence, formatReleaseDate, games, stats } from "@/data/games";
import { ExclusiveBadge } from "@/components/site/ExclusiveBadge";
import { seo } from "@/data/site";
import heroArt from "@/assets/hero-larp-city.jpg";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      path: "/about",
      title: "Stake Engine Slot Studio — About Tinex Games",
      description: `Tinex Games is an independent slot studio building on Stake Engine — ${games.length} Stake exclusives since ${formatReleaseDate(cadence.firstRelease)}, a new one roughly every ${cadence.daysPerRelease} days.`,
    }),
  component: About,
});

/*
 * NOTE: this page deliberately contains no headcount, founding date, office
 * location or licence claims — we don't have verified copy for any of that yet.
 * Add it here once it's confirmed rather than filling the gap with placeholders.
 */

function About() {
  return (
    <div>
      <section className="relative overflow-hidden pb-20 pt-40 sm:pt-52">
        <img
          src={heroArt}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-15 blur-xl"
        />
        <div className="absolute inset-0 veil" />
        <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
          <Reveal>
            <ExclusiveBadge size="lg" />
            <h1 className="display mt-6 max-w-5xl text-[clamp(2.8rem,10vw,10rem)] text-foreground">
              {games.length} Stake slots. <span className="text-mark">One engine.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Tinex Games is an independent slot studio. We build on {PLATFORM}, which means every
              title ships straight into the Stake lobby as an exclusive — one HTML5 build, the same
              game on a phone or a desktop, no separate client to maintain.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-8">
              <div className="numeral text-4xl text-foreground sm:text-5xl">{s.value}</div>
              <div className="eyebrow mt-3">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8">
        <Reveal>
          <p className="eyebrow">What we're for</p>
        </Reveal>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <Reveal>
            {/* This column used to argue for a small catalogue. That stopped being
                true; it's written from the release data now. */}
            <p className="display text-[clamp(1.6rem,3.5vw,2.8rem)] text-foreground">
              Fast, on purpose.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              The first Tinex game went live on {formatReleaseDate(cadence.firstRelease)}. There are{" "}
              {games.length} now — a new release roughly every {cadence.daysPerRelease} days. Small,
              sharp games, shipped often, and the next one is never far behind.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="display text-[clamp(1.6rem,3.5vw,2.8rem)] text-foreground">
              Built where they're played.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Building on {PLATFORM} puts us inside the platform our players already use, rather than
              integrating into it from the outside. Certification, delivery and the lobby itself are
              part of the same pipeline — so a finished build is a live game.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8">
          <Reveal>
            <p className="display max-w-6xl text-[clamp(1.9rem,5vw,4.4rem)] leading-[0.98] text-foreground">
              Ship often. <span className="text-mark">Make every one worth a second spin.</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 text-center sm:px-8">
        <Reveal>
          <h2 className="display text-[clamp(2.4rem,7vw,6rem)] text-foreground">
            Work with the studio
          </h2>
          <Link
            to="/contact"
            className="mt-10 inline-flex bg-foreground px-8 py-4 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-ink transition-opacity hover:opacity-85"
          >
            Get in touch
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
