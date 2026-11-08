import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Plane, Ship, Truck, FileCheck, ArrowUpRight, Warehouse, Container } from "lucide-react";
import stacker from "@/assets/reach-stacker.png";
import truck from "@/assets/truck.png";
import ship from "@/assets/ship-aerial.jpg";
import { Shell } from "@/components/site";

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

/** 0→1 progress of a tall section scrolling past its sticky viewport. */
function useProgress(ref: RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setP(Math.min(1, Math.max(0, -r.top / (total || 1))));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [ref]);
  return p;
}

const svc = [
  { icon: Plane, t: "Air Freight", d: "Express and consolidated air cargo through major global hubs." },
  { icon: Ship, t: "Ocean Freight", d: "FCL and LCL with reliable schedules and full visibility." },
  { icon: Truck, t: "Road Transport", d: "Our own fleet moving cargo from port to door." },
  { icon: FileCheck, t: "Customs", d: "Licensed brokers handling clearance, duties and compliance." },
  { icon: Warehouse, t: "Warehousing & 3PL", d: "Storage, pick-and-pack and inventory close to market." },
  { icon: Container, t: "Project Cargo", d: "Heavy-lift and out-of-gauge moves planned end to end." },
];

const highlights = [
  ["One point of contact", "No more chasing multiple vendors. One team manages your entire shipment from origin to destination."],
  ["Full supply chain visibility", "Track your freight in real time and get proactive updates before issues become delays."],
  ["Compliance you can trust", "Our licensed customs brokers keep your shipments moving within every regulatory requirement across APAC."],
  ["Competitive, transparent pricing", "No hidden fees. Clear, comprehensive pricing backed by responsive billing support throughout the shipment."],
];

function ScrollRing() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => setP(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const c = 2 * Math.PI * 22;
  return (
    <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center text-background mix-blend-difference">
      <svg viewBox="0 0 50 50" className="absolute inset-0 -rotate-90">
        <circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" />
        <circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray={c} strokeDashoffset={c * (1 - p)} />
      </svg>
      <span className="text-[10px] font-bold">{Math.round(p * 100)}</span>
    </button>
  );
}

function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const svcRef = useRef<HTMLElement>(null);
  const shipRef = useRef<HTMLElement>(null);
  const hp = useProgress(heroRef);
  const sp = useProgress(svcRef);
  const shp = useProgress(shipRef);
  const relRef = useRef<HTMLElement>(null);
  const rp = useProgress(relRef);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <Shell>
      <ScrollRing />

      {/* HERO */}
      <section ref={heroRef} className="relative h-[200vh] bg-background">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-end overflow-hidden"
          onMouseMove={(e) => setTilt({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 })}>
          <div className="pointer-events-none absolute top-28 left-6 md:left-12" style={{ opacity: 1 - hp * 2 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">One operator</p>
            <h1 className="mt-3 max-w-3xl text-5xl font-extrabold uppercase leading-[0.9] text-foreground md:text-8xl">Every leg of the journey</h1>
          </div>
          <div className="absolute right-6 top-32 max-w-xs text-right md:right-12" style={{ opacity: 1 - hp * 2 }}>
            <p className="text-muted-foreground">Freight forwarding, land transport and customs brokerage — unified under one accountable team.</p>
            <Link to="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-primary">Talk with us <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <img src={stacker} alt="Reach stacker lifting a white container onto blue and red containers" width={1536} height={1024}
            className="relative w-[min(720px,80vw)] self-end md:mr-12 transition-transform duration-300 ease-out"
            style={{ transform: `translate(${tilt.x * -12}px, ${hp * -120 + tilt.y * -6}px) scale(${1 + hp * 0.25})` }} />
          <div className="h-3 w-full bg-foreground/10" />
        </div>
      </section>

      {/* SERVICES */}
      <section ref={svcRef} className="relative h-[300vh] bg-ink text-ink-foreground">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <div className="relative flex h-[45%] items-end overflow-hidden bg-background">
            <h2 className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[18vw] font-extrabold uppercase leading-none text-foreground/10 blur-[3px]"
              style={{ transform: `translate(${-sp * 20}vw, -50%)` }}>Our Services</h2>
            <img src={truck} alt="Semi-truck carrying a container" width={1920} height={640}
              className="relative -mb-[1.5%] w-[min(560px,60vw)]" style={{ transform: `translateX(${-60 + sp * 170}vw)` }} />
          </div>
          <div className="relative grid flex-1 content-center gap-4 px-6 md:grid-cols-3 md:px-12">
            {svc.map(({ icon: I, t, d }, i) => {
              const show = sp > 0.1 + i * 0.08;
              return (
                <div key={t} className="group rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-5 backdrop-blur transition-all duration-700 hover:-translate-y-2 hover:border-primary hover:bg-primary"
                  style={{ opacity: show ? 1 : 0, transform: show ? undefined : "translateY(40px)" }}>
                  <I className="h-7 w-7" />
                  <h3 className="mt-4 text-lg font-bold uppercase">{t}</h3>
                  <p className="mt-2 text-sm opacity-60 group-hover:opacity-90">{d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RELIABILITY — top-down road */}
      <section ref={relRef} className="relative h-[220vh] bg-background">
        <div className="sticky top-0 grid h-screen grid-cols-[1fr_auto_1fr] overflow-hidden">
          <div className="flex flex-col justify-center px-6 md:px-12" style={{ opacity: Math.min(1, rp * 3), transform: `translateX(${(1 - Math.min(1, rp * 3)) * -60}px)` }}>
            <h2 className="text-4xl font-extrabold uppercase leading-[0.9] text-primary md:text-7xl">Reliability<br />at every<br />mile</h2>
            <p className="mt-6 max-w-sm text-muted-foreground">From first pickup to final delivery, one accountable team keeps every kilometre on schedule.</p>
          </div>
          <div className="relative w-[18vw] max-w-[180px] bg-ink">
            <div className="absolute inset-y-0 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-ink-foreground/30" />
            <div className="absolute left-1/2 w-[34%] -translate-x-1/2" style={{ top: `${-20 + rp * 120}%` }}>
              <div className="h-5 rounded-t-md bg-muted-foreground" />
              <div className="mt-0.5 h-40 rounded-sm border border-border bg-card" />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-10 px-6 md:px-12">
            {[["2,500+", "Shipments per month"], ["98.2%", "On-time delivery rate"], ["8+", "Years in operation"]].map(([n, l], i) => (
              <div key={l} className="transition-all duration-700" style={{ opacity: rp > 0.2 + i * 0.15 ? 1 : 0, transform: rp > 0.2 + i * 0.15 ? "none" : "translateY(30px)" }}>
                <p className="text-5xl font-extrabold text-foreground">{n}</p>
                <p className="text-sm uppercase tracking-wider text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHIP */}
      <section ref={shipRef} className="relative h-[300vh] bg-ocean text-ink-foreground">
        <div className="sticky top-0 h-screen overflow-hidden">
          <img src={ship} alt="Aerial view of a container ship at sea" width={1920} height={1088} loading="lazy"
            className="absolute inset-0 h-full w-full object-cover" style={{ transform: `scale(${Math.max(1, 5 - shp * 8)})`, transformOrigin: "50% 42%" }} />
          <div className="absolute inset-0 bg-ocean/30" />
          <div className="absolute left-1/2 top-[72%] w-64 -translate-x-1/2 text-center" style={{ opacity: shp > 0.8 ? 1 : 0, transition: "opacity .7s" }}>
            <p className="text-2xl font-bold">»</p>
            <h3 className="text-lg font-extrabold uppercase">Fast issue resolution</h3>
            <p className="mt-2 text-sm opacity-75">When something doesn't go to plan, we act fast and keep you informed every step.</p>
          </div>
          <h2 className="absolute left-1/2 top-24 -translate-x-1/2 text-center text-3xl font-extrabold uppercase md:text-5xl" style={{ opacity: Math.min(1, shp * 4) }}>Reliability at every mile</h2>
          <div className="absolute inset-0 mx-auto grid max-w-6xl grid-cols-1 content-center gap-x-[24vw] gap-y-16 px-6 pt-24 md:grid-cols-2">
            {highlights.map(([t, d], i) => {
              const show = shp > 0.15 + i * 0.15;
              return (
                <div key={t} className={`max-w-xs transition-all duration-700 ${i % 2 ? "md:justify-self-end md:text-right" : ""}`}
                  style={{ opacity: show ? 1 : 0, transform: show ? "none" : `translateX(${i % 2 ? 40 : -40}px)` }}>
                  <p className="text-xs text-primary-foreground/60">0{i + 1}</p>
                  <h3 className="mt-2 text-lg font-extrabold uppercase">{t}</h3>
                  <p className="mt-2 text-sm opacity-75">{d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="grid gap-12 bg-background px-6 py-32 md:grid-cols-2 md:px-12">
        <h2 className="text-5xl font-extrabold uppercase leading-[0.9] text-primary md:text-7xl">Trusted by businesses across APAC</h2>
        <figure className="self-end">
          <blockquote className="text-xl leading-relaxed text-foreground">“My business wouldn't function without the team. Extremely talented, with immense expertise in each consignment — dedicated account managers who know us and respond fast.”</blockquote>
          <figcaption className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Client name · Company</figcaption>
        </figure>
      </section>

      {/* CTA */}
      <section className="bg-background px-6 py-32 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl text-5xl font-extrabold uppercase leading-none md:text-7xl">We move freight. We own the outcome.</h2>
        <Link to="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground hover:opacity-90">Get a quote <ArrowUpRight className="h-4 w-4" /></Link>
      </section>
    </Shell>
  );
}
