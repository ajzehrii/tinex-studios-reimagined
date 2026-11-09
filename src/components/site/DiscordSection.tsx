import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { DiscordIcon } from "@/components/site/DiscordIcon";
import { CLIPPING_HREF, DISCORD_SERVER, DISCORD_URL } from "@/data/community";

export function DiscordSection() {
  return (
    <section
      id="discord"
      // Discord's blurple, so the band reads as Discord at a glance.
      style={{ "--game-accent": "oklch(0.6 0.2 277)" } as React.CSSProperties}
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-ink"
    >
      <DiscordIcon className="pointer-events-none absolute -right-16 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 text-[var(--game-accent)] opacity-[0.07] sm:h-[36rem] sm:w-[36rem]" />
      <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="eyebrow">Community</p>
          <h2 className="display mt-4 max-w-4xl text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.88] text-foreground">
            Join the <span className="text-[var(--game-accent)]">Tinex Discord</span>
          </h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
            The studio's own server. Submit clips for the{" "}
            <a href={CLIPPING_HREF} className="underline-sweep text-foreground">
              clipping programme
            </a>
            , ask about a game, or talk to the people making them.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-3 bg-[var(--game-accent)] px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-85"
            >
              <DiscordIcon className="h-5 w-5" /> Join {DISCORD_SERVER} on Discord
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <span className="font-mono text-xs text-muted-foreground">
              {DISCORD_URL.replace("https://", "")}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
