import { Link } from "@tanstack/react-router";
import { EXCLUSIVE_URL, PLATFORM, games } from "@/data/games";
import { ExclusiveBadge } from "@/components/site/ExclusiveBadge";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-ink">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 aura opacity-70" />
      <div className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="min-w-0">
            <div className="display text-5xl leading-none text-foreground sm:text-6xl">
              Tinex<span className="text-gradient">.</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              An independent slot studio building on {PLATFORM}. Every title is playable only on
              Stake.
            </p>
            <div className="mt-6">
              <ExclusiveBadge />
            </div>
          </div>

          <FooterCol
            title="Studio"
            items={[
              { label: "About", to: "/about" },
              { label: "Games", to: "/games" },
              { label: "Contact", to: "/contact" },
            ]}
          />

          <div>
            <h3 className="eyebrow">Games</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {games.map((g) => (
                <li key={g.slug}>
                  <Link
                    to="/games/$slug"
                    params={{ slug: g.slug }}
                    className="underline-sweep text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Licence and certification claims removed — nothing goes here until
              we have the real registration details to put in. */}
          <div>
            <h3 className="eyebrow">Play</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>18+ only. Play responsibly.</li>
              <li>
                <a
                  href={EXCLUSIVE_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline-sweep text-accent"
                >
                  Tinex Games on Stake
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-[0.66rem] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Tinex Games</span>
          <span>Game studio — no play offered on this site</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: string }[];
}) {
  return (
    <div>
      <h3 className="eyebrow">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((i) => (
          <li key={i.to}>
            <Link
              to={i.to}
              className="underline-sweep text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
