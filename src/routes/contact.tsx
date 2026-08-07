import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Partnerships — Tinex Games" },
      {
        name: "description",
        content:
          "Talk to Tinex Games about catalogue distribution, exclusive titles, press or careers. We reply within two working days.",
      },
      { property: "og:title", content: "Contact & Partnerships — Tinex Games" },
      {
        property: "og:description",
        content: "Distribution, exclusives, press and careers — reach the Tinex studio directly.",
      },
    ],
  }),
  component: Contact,
});

const topics = ["Distribution", "Exclusive content", "Press", "Careers"];

function Contact() {
  const [topic, setTopic] = useState(topics[0]!);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent", {
      description: "The Tinex partnerships team will reply within two working days.",
    });
    e.currentTarget.reset();
  };

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-36 sm:px-8 sm:pt-48">
      <Reveal>
        <p className="eyebrow">Partnerships</p>
        <h1 className="display mt-5 text-[clamp(3.2rem,12vw,12rem)] text-foreground">
          Let's <span className="text-molten">talk</span>
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
                    "border px-5 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] transition-all duration-300 " +
                    (topic === t
                      ? "border-primary bg-molten text-primary-foreground"
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
                className="mt-3 w-full border border-border bg-surface px-5 py-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-molten px-10 py-5 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-primary-foreground transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
            >
              Send message
            </button>
          </form>
        </Reveal>

        <Reveal delay={160} className="space-y-10">
          <Block
            title="Distribution"
            lines={["partners@tinexgames.com", "One integration, full catalogue, 31 markets."]}
          />
          <Block title="Press" lines={["press@tinexgames.com", "Assets and release notes on request."]} />
          <Block
            title="Studio"
            lines={["Level 6, Quay House", "Valletta VLT 1234, Malta", "+356 2100 0000"]}
          />
          <div className="border border-border bg-surface p-7">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">18+ only</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Tinex Games is a B2B supplier. We do not operate real-money gaming or accept players
              directly. Play responsibly.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Block({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="border-t border-border pt-6">
      <h3 className="eyebrow">{title}</h3>
      <ul className="mt-4 space-y-2 text-lg text-foreground">
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
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
        className="mt-3 w-full border border-border bg-surface px-5 py-4 text-foreground outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}
