import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
          ? "border-b border-border bg-background/85 backdrop-blur-xl py-3"
          : "border-b border-transparent py-6",
      )}
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 md:grid-cols-[1fr_auto_1fr]">
        <Link to="/" className="group flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
          <span className="display text-2xl tracking-[0.06em] text-foreground transition-colors group-hover:text-primary sm:text-3xl">
            Tinex
          </span>
          <span className="display mt-1 text-[0.6rem] tracking-[0.42em] text-primary">Games</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="underline-sweep text-[0.72rem] font-medium uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <Link
            to="/contact"
            className="hidden rounded-full bg-molten px-6 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-transform duration-300 hover:scale-[1.04] md:inline-flex"
          >
            Partner with us
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-primary hover:text-primary md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 flex flex-col justify-center gap-2 bg-background px-6 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] md:hidden",
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
              "display text-5xl text-foreground transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] data-[status=active]:text-molten",
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
