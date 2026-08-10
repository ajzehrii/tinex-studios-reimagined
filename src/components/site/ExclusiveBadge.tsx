import { EXCLUSIVE_LABEL } from "@/data/games";
import { cn } from "@/lib/utils";

/**
 * Flat, square, monospaced — the old pill-with-a-pulsing-dot treatment is
 * stock-UI shorthand and it appeared on every card and page header.
 */
export function ExclusiveBadge({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-foreground/25 font-mono uppercase tracking-[0.08em] text-foreground",
        size === "lg" ? "px-3 py-1.5 text-[0.7rem]" : "px-2 py-1 text-[0.6rem]",
        className,
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 bg-[var(--game-accent)]" />
      {EXCLUSIVE_LABEL}
    </span>
  );
}
