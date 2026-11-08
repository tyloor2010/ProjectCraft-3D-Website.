import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Shell, services } from "@/components/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Hamoula Freight" },
      { name: "description", content: "Air, ocean, customs, warehousing, project cargo and road transport." },
      { property: "og:title", content: "Services — Hamoula Freight" },
      { property: "og:description", content: "Air, ocean, customs, warehousing, project cargo and road transport." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <Shell>
      <PageHero title="Our services" sub="Everything your cargo needs, handled by one team." />
      <section className="divide-y divide-border px-6 md:px-12">
        {services.map((s, i) => (
          <div key={s.t} className="grid gap-4 py-12 md:grid-cols-[100px_1fr_1fr]">
            <span className="text-primary font-bold">0{i + 1}</span>
            <h2 className="text-3xl font-extrabold uppercase">{s.t}</h2>
            <p className="text-lg text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </section>
    </Shell>
  ),
});
