import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Plane, Ship, Truck, FileCheck, ArrowUpRight } from "lucide-react";
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
            className="relative w-[min(900px,92vw)] transition-transform duration-300 ease-out"
            style={{ transform: `translate(${tilt.x * -12}px, ${hp * -120 + tilt.y * -6}px) scale(${1 + hp * 0.25})` }} />
          <div className="h-3 w-full bg-foreground/10" />
        </div>
      </section>

      {/* SERVICES */}
      <section ref={svcRef} className="relative h-[260vh] bg-ink text-ink-foreground">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <h2 className="pointer-events-none absolute top-16 whitespace-nowrap text-[22vw] font-extrabold uppercase leading-none text-transparent"
            style={{ WebkitTextStroke: "1px var(--ink-foreground)", opacity: 0.25, transform: `translateX(${-sp * 30}vw)` }}>Services</h2>
          <img src={truck} alt="Semi-truck carrying a container" width={1920} height={640} loading="lazy"
            className="relative mt-16 w-[min(760px,80vw)]" style={{ transform: `translateX(${-90 + sp * 200}vw)` }} />
          <div className="relative mt-10 grid gap-4 px-6 md:grid-cols-4 md:px-12">
            {svc.map(({ icon: I, t, d }, i) => {
              const show = sp > 0.1 + i * 0.1;
              return (
                <div key={t} className="group rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-6 backdrop-blur transition-all duration-700 hover:-translate-y-2 hover:border-primary hover:bg-primary"
                  style={{ opacity: show ? 1 : 0, transform: show ? undefined : "translateY(40px)" }}>
                  <I className="h-7 w-7" />
                  <h3 className="mt-8 text-xl font-bold uppercase">{t}</h3>
                  <p className="mt-2 text-sm opacity-60 group-hover:opacity-90">{d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SHIP */}
      <section ref={shipRef} className="relative h-[300vh] bg-ocean text-ink-foreground">
        <div className="sticky top-0 h-screen overflow-hidden">
          <img src={ship} alt="Aerial view of a container ship at sea" width={1920} height={1088} loading="lazy"
            className="absolute inset-0 h-full w-full object-cover" style={{ transform: `scale(${1.4 - shp * 0.4}) translateY(${(0.5 - shp) * 10}%)` }} />
          <div className="absolute inset-0 bg-ocean/30" />
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

      {/* CTA */}
      <section className="bg-background px-6 py-32 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl text-5xl font-extrabold uppercase leading-none md:text-7xl">We move freight. We own the outcome.</h2>
        <Link to="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground hover:opacity-90">Get a quote <ArrowUpRight className="h-4 w-4" /></Link>
      </section>
    </Shell>
  );
}
