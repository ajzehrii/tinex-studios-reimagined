import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Paired Stake.us / Stake.com links. Every title is on both, so every place
 * the site offers "play" offers the pair rather than picking one.
 *
 *   accent — Stake.us filled with the current --game-accent (game contexts)
 *   light  — Stake.us filled with the foreground colour (site-level CTAs)
 *   outline — both outlined, for sitting beside another primary button
 */
export function PlayLinks({
  us,
  com,
  variant = "light",
  size = "md",
  prefix = true,
  className,
  onClick,
}: {
  us: string;
  com: string;
  variant?: "accent" | "light" | "outline";
  size?: "sm" | "md";
  /** Show "Play on" before the domain. Off where space is tight. */
  prefix?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const base = cn(
    "inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.08em] transition-[opacity,color,border-color]",
    size === "sm" ? "px-3 py-3 text-[0.62rem]" : "px-7 py-4 text-[0.7rem]",
  );
  const label = (domain: string) => (prefix ? `Play on ${domain}` : domain);

  return (
    <div className={cn("flex gap-2", className)}>
      <a
        href={us}
        target="_blank"
        rel="noreferrer noopener"
        onClick={onClick}
        className={cn(
          base,
          "flex-1",
          variant === "outline"
            ? "border border-foreground/30 text-foreground hover:border-[var(--game-accent)] hover:text-[var(--game-accent)]"
            : cn(
                "text-ink hover:opacity-85",
                variant === "accent" ? "bg-[var(--game-accent)]" : "bg-foreground",
              ),
        )}
      >
        <Play className="h-3.5 w-3.5 shrink-0" />
        {label("Stake.us")}
      </a>
      <a
        href={com}
        target="_blank"
        rel="noreferrer noopener"
        onClick={onClick}
        className={cn(
          base,
          "flex-1 border border-foreground/30 text-foreground hover:border-[var(--game-accent)] hover:text-[var(--game-accent)]",
        )}
      >
        {label("Stake.com")}
      </a>
    </div>
  );
}
