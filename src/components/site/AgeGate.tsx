import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ExclusiveBadge } from "@/components/site/ExclusiveBadge";

const KEY = "tinex-age-verified";

export function AgeGate() {
  const [state, setState] = useState<"pending" | "open" | "denied" | "closed">("pending");

  useEffect(() => {
    try {
      setState(localStorage.getItem(KEY) === "true" ? "closed" : "open");
    } catch {
      setState("open");
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(KEY, "true");
    } catch {
      /* ignore */
    }
    setState("closed");
  };

  useEffect(() => {
    if (state === "open" || state === "denied") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [state]);

  if (state === "pending" || state === "closed") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Age verification"
      className={cn(
        "fixed inset-0 z-[100] grid place-items-center bg-ink/95 px-5 backdrop-blur-2xl",
        "animate-in fade-in duration-500",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] aura" />
      <div className="relative w-full max-w-lg rounded-3xl border border-border bg-surface/90 p-8 shadow-[var(--shadow-lift)] sm:p-12">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow">Tinex Games</p>
          <ExclusiveBadge />
        </div>
        {state === "open" ? (
          <>
            <h1 className="display mt-6 text-5xl text-foreground sm:text-6xl">
              Are you <span className="text-gradient">18+</span>?
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              This site presents gambling content produced exclusively for Stake. You must be of
              legal age in your jurisdiction to continue.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={accept}
                className="flex-1 rounded-full bg-gradient-indigo px-8 py-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary-foreground transition-transform duration-300 hover:scale-[1.02]"
              >
                Yes, I am 18 or over
              </button>
              <button
                onClick={() => setState("denied")}
                className="flex-1 rounded-full border border-border px-8 py-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                No
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="display mt-6 text-4xl text-foreground sm:text-5xl">Access denied</h1>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              You must be 18 or over to view this website. Please close this tab. If you need
              support with gambling, contact a responsible gaming service in your country.
            </p>
            <button
              onClick={() => setState("open")}
              className="underline-sweep mt-9 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent"
            >
              Go back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
