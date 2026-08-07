import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { stats } from "@/data/games";
import { ExclusiveBadge } from "@/components/site/ExclusiveBadge";
import heroArt from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Studio — Tinex Games, Slot Maker Launching on Stake" },
      {
        name: "description",
        content:
          "Tinex Games is an independent slot studio in Valletta. Every title launches on Stake first, with more operators to follow — maths, art, engineering and certification under one roof.",
      },
      { property: "og:title", content: "The Studio — About Tinex Games" },
      {
        property: "og:description",
        content: "Maths, art, engineering and certification under one roof in Valletta, Malta.",
      },
    ],
  }),
  component: About,
});

const timeline = [
  ["2019", "Four people, one office above a bakery in Valletta, and a single ways engine."],
  ["2021", "First MGA B2B licence granted. Ember Forge becomes our first breakout hit."],
  ["2023", "Tinex Core rewritten from scratch. Release cadence drops from six weeks to two."],
  ["2026", "48 titles live, a Stake launch-exclusivity deal, and 62 people."],
  ["2028", "First exclusivity windows expire — the catalogue begins rolling out to more operators."],
];

function About() {
  return (
    <div>
      <section className="relative overflow-hidden pb-20 pt-40 sm:pt-52">
        <img
          src={heroArt}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 veil" />
        <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
          <Reveal>
            <ExclusiveBadge size="lg" />
            <h1 className="display mt-6 max-w-6xl text-[clamp(3rem,11vw,12rem)] text-foreground">
              62 people. <span className="text-gradient">One room.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Tinex Games is an independent studio in Valletta. Maths, art, engineering, audio and
              certification sit on the same floor. Right now everything we make launches in one place — the
              Stake lobby — and that focus is why we can hold a two-week cadence. It is a phase, not
              a limit: more operators join as our windows expire.
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
          <p className="eyebrow">How we got here</p>
        </Reveal>
        <ul className="mt-10">
          {timeline.map(([year, body], i) => (
            <Reveal
              as="li"
              key={year}
              delay={i * 80}
              className="group grid gap-3 border-t border-border py-10 transition-colors duration-500 hover:bg-surface md:grid-cols-[12rem_1fr] md:gap-10 md:px-4"
            >
              <span className="display text-4xl text-gradient sm:text-5xl">{year}</span>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-2">
                {body}
              </p>
            </Reveal>
          ))}
        </ul>
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
            className="mt-10 inline-flex rounded-full bg-gradient-indigo px-10 py-5 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
          >
            Get in touch
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
