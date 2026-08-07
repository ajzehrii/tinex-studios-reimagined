import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PLATFORM, games, stats } from "@/data/games";
import { ExclusiveBadge } from "@/components/site/ExclusiveBadge";
import heroArt from "@/assets/hero-larp-city.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Studio — Tinex Games" },
      {
        name: "description",
        content:
          "Tinex Games is an independent slot studio building on Stake Engine. Four titles, one HTML5 build each, all playable only on Stake.",
      },
      { property: "og:title", content: "The Studio — About Tinex Games" },
      {
        property: "og:description",
        content: "An independent slot studio building on Stake Engine.",
      },
    ],
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
              {games.length} games. <span className="text-gradient">One lobby.</span>
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
              <div className="display text-5xl text-gradient sm:text-6xl">{s.value}</div>
              <div className="mt-3 text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
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
            <p className="display text-[clamp(1.6rem,3.5vw,2.8rem)] text-foreground">
              A small catalogue you can actually get through.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Most studios measure themselves in titles shipped. We'd rather each game be worth
              opening twice. That means the maths, the art and the feel of a round all get argued
              over before anything is called finished — and it's why there are {games.length} games
              on this site rather than forty.
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
              We would rather ship one game people argue about than{" "}
              <span className="text-gradient">five nobody mentions</span>.
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
            className="mt-10 inline-flex rounded-full bg-gradient-brand px-10 py-5 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
          >
            Get in touch
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
