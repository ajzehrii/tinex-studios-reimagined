import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { DiscordIcon } from "@/components/site/DiscordIcon";
import { CLIP_CHANNEL, DISCORD_URL } from "@/data/community";
import { games } from "@/data/games";

/*
 * Rates and payout rules deliberately aren't on the page: they live pinned in
 * the Discord channel, where they can change without a site deploy. If fixed
 * terms are ever published, add them to `steps` rather than inventing a figure.
 */
const steps = [
  ["Join the Discord", `The invite drops you straight into ${CLIP_CHANNEL}.`],
  [
    "Clip a Tinex game",
    `Big wins, bonus rounds, whatever's worth watching — ${games.length} titles to pick from.`,
  ],
  ["Post it and submit", `Put it up on your channels, then drop the link in ${CLIP_CHANNEL}.`],
  ["Get paid", "Current rates and payout rules are pinned in the channel."],
] as const;

export function ClippingSection() {
  return (
    <section
      id="clipping"
      // A cash-green accent, separate from any game's own colour.
      style={{ "--game-accent": "oklch(0.84 0.19 148)" } as React.CSSProperties}
      className="relative scroll-mt-24 border-y border-border bg-surface"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[var(--game-accent)]" />
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Clipping programme</p>
          <h2 className="display mt-4 text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.88] text-foreground">
            Clip our games. <span className="text-mark">Get paid for it.</span>
          </h2>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
            Tinex pays creators to clip its games. Record the best moments, post them, and submit
            them through the Discord.
          </p>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-10 inline-flex items-center gap-3 bg-[var(--game-accent)] px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink transition-opacity hover:opacity-85"
          >
            <DiscordIcon className="h-4 w-4" /> Start clipping <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        <div>
          <ol className="border-t border-border">
            {steps.map(([title, body], i) => (
              <Reveal
                as="li"
                key={title}
                delay={i * 70}
                className="grid gap-2 border-b border-border py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6"
              >
                <span className="numeral text-sm text-[var(--game-accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-2xl text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            18+ only. Paid clips are advertising: disclose them (for example with #ad) wherever the
            platform or local law requires it, and follow each platform's rules on gambling
            content.
          </p>
        </div>
      </div>
    </section>
  );
}
