import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-[50%] bg-molten opacity-[0.09] blur-3xl" />
      <div className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="min-w-0">
            <div className="display text-5xl leading-none text-foreground sm:text-6xl">Tinex</div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              An independent game studio building high-volatility slots and original mechanics for
              regulated markets worldwide.
            </p>
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
            <h3 className="eyebrow">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>partners@tinexgames.com</li>
              <li>press@tinexgames.com</li>
              <li>Level 6, Quay House, Valletta, Malta</li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow">Compliance</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>MGA B2B licensed</li>
              <li>GLI &amp; BMM certified</li>
              <li>18+ only. Play responsibly.</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Tinex Games Ltd.</span>
          <span>B2B supplier — no real-money play offered on this site</span>
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
