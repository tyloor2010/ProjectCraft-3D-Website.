import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/port-hero.jpg";
import { Shell, services } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian Freight — Every leg of the journey" },
      { name: "description", content: "Freight forwarding, land transport and customs brokerage under one accountable team." },
      { property: "og:title", content: "Meridian Freight — Every leg of the journey" },
      { property: "og:description", content: "Freight forwarding, land transport and customs brokerage under one accountable team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stats = [["2,500+", "Shipments per month"], ["98.2%", "On-time delivery"], ["8+", "Years in operation"]];
const countries = ["Egypt", "Saudi Arabia", "UAE", "Qatar", "Turkey", "Germany", "UK", "USA", "China", "Singapore", "Australia", "Kenya"];

function Index() {
  return (
    <Shell>
      <section className="relative flex min-h-screen items-end overflow-hidden bg-ink text-ink-foreground">
        <img src={hero} alt="Container port at dusk with cranes and trucks" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="relative px-6 pb-20 md:px-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">One operator</p>
          <h1 className="max-w-5xl text-6xl font-extrabold uppercase leading-[0.9] md:text-8xl">Every leg of the journey</h1>
          <p className="mt-6 max-w-lg text-lg opacity-80">Freight forwarding, land transport and customs brokerage, unified under one accountable team.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/contact" className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground hover:opacity-90">Talk with us</Link>
            <Link to="/services" className="rounded-full border border-ink-foreground/40 px-7 py-3 font-semibold hover:bg-ink-foreground/10">Our services</Link>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground">
        <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-10 text-2xl font-extrabold uppercase">
          {[...services, ...services].map((s, i) => <span key={i}>{s.t} ✦</span>)}
        </div>
      </div>

      <section className="grid gap-12 px-6 py-24 md:grid-cols-2 md:px-12">
        <h2 className="text-4xl font-extrabold uppercase leading-tight md:text-6xl">We move freight. We own the outcome.</h2>
        <div className="space-y-4 text-lg text-muted-foreground">
          <p>With every service under one roof, your supply chain moves the way your business demands: predictably, transparently, and without excuses.</p>
          <p>No finger-pointing between vendors. No delays lost in handoffs. Just one team, accountable from origin to destination.</p>
        </div>
      </section>

      <section className="grid gap-px bg-border md:grid-cols-3">
        {stats.map(([n, l]) => (
          <div key={l} className="bg-background px-6 py-16 md:px-12">
            <p className="text-6xl font-extrabold text-primary">{n}</p>
            <p className="mt-2 uppercase tracking-wider text-muted-foreground">{l}</p>
          </div>
        ))}
      </section>

      <section className="bg-ink px-6 py-24 text-ink-foreground md:px-12">
        <h2 className="mb-12 text-4xl font-extrabold uppercase md:text-5xl">Services</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <div key={s.t} className="rounded-2xl border border-ink-foreground/15 p-8 transition hover:border-primary">
              <p className="text-sm text-primary">0{i + 1}</p>
              <h3 className="mt-6 text-2xl font-bold">{s.t}</h3>
              <p className="mt-3 opacity-70">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24 md:px-12">
        <h2 className="mb-8 text-4xl font-extrabold uppercase">Our network</h2>
        <div className="flex flex-wrap gap-3">
          {countries.map((c) => <span key={c} className="rounded-full border border-border px-5 py-2 font-semibold">{c}</span>)}
        </div>
      </section>
    </Shell>
  );
}
