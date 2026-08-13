import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EXCLUSIVE_URL } from "@/data/games";
import logoMark from "@/assets/logo-mark.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/games", label: "Games" },
  { to: "/about", label: "Studio" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)]",
        scrolled
          ? "border-b border-border bg-ink/80 py-3 backdrop-blur-xl"
          : "border-b border-transparent py-6",
      )}
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 md:grid-cols-[1fr_auto_1fr]">
        <Link
          to="/"
          aria-label="Tinex Games — home"
          className="group flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          {/* Decorative: the wordmark beside it already names the studio. */}
          <img src={logoMark} alt="" aria-hidden="true" className="h-7 w-auto shrink-0 sm:h-8" />
          <span className="display truncate text-xl tracking-tight text-foreground sm:text-2xl">
            Tinex Games
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="underline-sweep font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <a
            href={EXCLUSIVE_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden bg-foreground px-5 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-ink transition-opacity hover:opacity-85 md:inline-flex"
          >
            Play on Stake
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 shrink-0 place-items-center border border-border bg-surface text-foreground transition-colors hover:border-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 flex flex-col justify-center gap-2 bg-ink px-6 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {links.map((l, i) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: `${open ? 80 + i * 60 : 0}ms` }}
            className={cn(
              "display py-3 text-5xl text-foreground transition-all duration-500 [transition-timing-function:var(--ease-out-expo)]",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            {l.label}
          </Link>
        ))}
        <a
          href={EXCLUSIVE_URL}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => setOpen(false)}
          className="mt-8 bg-foreground px-8 py-4 text-center font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink"
        >
          Play on Stake
        </a>
      </div>
    </header>
  );
}
