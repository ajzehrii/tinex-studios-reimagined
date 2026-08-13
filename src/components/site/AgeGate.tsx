import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ExclusiveBadge } from "@/components/site/ExclusiveBadge";
import logoMark from "@/assets/logo-mark.png";

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
      
      <div className="relative w-full max-w-lg border border-border bg-surface p-8 shadow-[var(--shadow-lift)] sm:p-12">
        <div className="flex items-center justify-between gap-3">
          <img src={logoMark} alt="Tinex Games" className="h-7 w-auto" />
          <ExclusiveBadge />
        </div>
        {state === "open" ? (
          <>
            {/* Deliberately not a heading: this dialog renders above every
                page, so an <h1> here would make "Are you 18+?" the first
                heading crawlers see site-wide. The dialog is named via
                aria-label instead, so screen readers still announce it. */}
            <p className="display mt-6 text-5xl text-foreground sm:text-6xl">
              Are you <span className="text-mark">18+</span>?
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              This site presents gambling content currently distributed through Stake. You must be of
              legal age in your jurisdiction to continue.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={accept}
                className="flex-1 bg-foreground px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink transition-opacity hover:opacity-85"
              >
                Yes, I am 18 or over
              </button>
              <button
                onClick={() => setState("denied")}
                className="flex-1 border border-border px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                No
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="display mt-6 text-4xl text-foreground sm:text-5xl">Access denied</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              You must be 18 or over to view this website. Please close this tab. If you need
              support with gambling, contact a responsible gaming service in your country.
            </p>
            <button
              onClick={() => setState("open")}
              className="underline-sweep mt-9 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-foreground"
            >
              Go back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
