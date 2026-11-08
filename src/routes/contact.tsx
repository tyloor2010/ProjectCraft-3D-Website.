import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Shell } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Hamoula Freight" },
      { name: "description", content: "Get a quote or talk to our logistics team." },
      { property: "og:title", content: "Contact — Hamoula Freight" },
      { property: "og:description", content: "Get a quote or talk to our logistics team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const f = "w-full rounded-lg border border-input bg-background px-4 py-3";
  return (
    <Shell>
      <PageHero title="Talk with us" sub="Tell us what you're moving and we'll get back within one business day." />
      <section className="mx-auto max-w-2xl px-6 py-20">
        {sent ? (
          <p className="text-2xl font-bold">Thanks — we'll be in touch soon.</p>
        ) : (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input required placeholder="Name" className={f} />
            <input required type="email" placeholder="Email" className={f} />
            <textarea required rows={5} placeholder="What are you shipping?" className={f} />
            <button className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground">Send</button>
          </form>
        )}
      </section>
    </Shell>
  );
}
