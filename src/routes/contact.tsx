import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT_EMAIL, EXCLUSIVE_URL } from "@/data/games";
import { seo } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      path: "/contact",
      title: "Contact Tinex Games — Stake Engine Slot Studio",
      description:
        "Talk to Tinex Games about Stake slot distribution, exclusive titles, press or careers. An independent studio building on Stake Engine.",
    }),
  component: Contact,
});

const topics = ["Distribution", "Exclusive content", "Press", "Careers"];

function Contact() {
  const [topic, setTopic] = useState(topics[0]!);

  /*
   * There is no backend behind this site, so the form composes a message and
   * hands it to the visitor's mail client rather than reporting a success it
   * cannot deliver. Swap this for a real POST once an endpoint exists.
   */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      get("company") && `Company: ${get("company")}`,
      "",
      get("message"),
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `${topic} enquiry — ${get("name")}`,
    )}&body=${encodeURIComponent(body)}`;

    toast("Opening your email app", {
      description: `If nothing happens, write to ${CONTACT_EMAIL} directly.`,
    });
  };

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-36 sm:px-8 sm:pt-48">
      <Reveal>
        <p className="eyebrow">Partnerships</p>
        <h1 className="display mt-5 text-[clamp(3.2rem,12vw,12rem)] text-foreground">
          Let's <span className="text-mark">talk</span>
        </h1>
      </Reveal>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal delay={80}>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  className={
                    "border px-5 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] transition-colors " +
                    (topic === t
                      ? "border-foreground bg-foreground text-ink"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground")
                  }
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Work email" name="email" type="email" required />
            </div>
            <Field label="Company" name="company" />
            <div>
              <label
                htmlFor="message"
                className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder={`Tell us about your ${topic.toLowerCase()} enquiry…`}
                className="mt-3 w-full border border-border bg-surface px-5 py-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-foreground px-8 py-4 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-ink transition-opacity hover:opacity-85 sm:w-auto"
            >
              Compose message
            </button>
            <p className="text-xs text-muted-foreground">
              This opens your own email app with the message ready to send.
            </p>
          </form>
        </Reveal>

        <Reveal delay={160} className="space-y-10">
          <Block title="Email" lines={[CONTACT_EMAIL, "Partnerships, press and everything else."]} />
          <Block
            title="Play the games"
            lines={["All four titles are live on Stake."]}
            href={EXCLUSIVE_URL}
            hrefLabel="Tinex Games on Stake"
          />
          <div className="border border-border bg-surface p-7">
            <h3 className="font-mono text-sm uppercase tracking-[0.08em] text-foreground">18+ only</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Tinex Games is a game studio. We do not operate gaming or accept players directly —
              our titles are played on Stake. Play responsibly.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Block({
  title,
  lines,
  href,
  hrefLabel,
}: {
  title: string;
  lines: string[];
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="border-t border-border pt-6">
      <h3 className="eyebrow">{title}</h3>
      <ul className="mt-4 space-y-2 text-lg text-foreground">
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="underline-sweep mt-4 inline-flex font-mono text-[0.66rem] uppercase tracking-[0.08em] text-foreground"
        >
          {hrefLabel}
        </a>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full border border-border bg-surface px-5 py-4 text-foreground outline-none transition-colors focus:border-foreground"
      />
    </div>
  );
}
