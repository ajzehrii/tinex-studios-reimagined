import { EXCLUSIVE_LABEL } from "@/data/games";
import { cn } from "@/lib/utils";

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
        "inline-flex items-center gap-2 rounded-full border border-accent/40 bg-background/70 font-bold uppercase tracking-[0.22em] text-accent backdrop-blur-md",
        size === "lg" ? "px-5 py-2 text-[0.7rem]" : "px-3 py-1.5 text-[0.58rem]",
        className,
      )}
    >
      <span className="pulse-glow h-1.5 w-1.5 rounded-full bg-accent" />
      {EXCLUSIVE_LABEL}
    </span>
  );
}
