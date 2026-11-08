import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type RefObject } from "react";
import {
  Plane, Ship, Truck, FileCheck, ArrowUpRight, Warehouse, Container, Route as RouteIcon,
  Users, Radar, ShieldCheck, BadgeDollarSign, ChevronsRight,
} from "lucide-react";
import stacker from "@/assets/stacker-only.png";
import boxWhite from "@/assets/container-white.png";
import stackRow from "@/assets/stack-row.png";
import chassis from "@/assets/truck-chassis.png";
import truckBox from "@/assets/truck-container.png";
import truckTop from "@/assets/truck-top.png";
import ship from "@/assets/ship-aerial.jpg";
import plane from "@/assets/plane.png";
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
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        setP(Math.min(1, Math.max(0, -r.top / (total || 1))));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [ref]);
  return p;
}

/** map p from [a,b] to [0,1], clamped */
const seg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
const ease = (t: number) => t * t * (3 - 2 * t);

const svc = [
  { icon: Plane, t: "Air Freight", d: "Express and consolidated air cargo through major global hubs." },
  { icon: Ship, t: "Ocean Freight", d: "FCL and LCL with reliable schedules and full visibility." },
  { icon: FileCheck, t: "Customs Brokerage", d: "Licensed brokers handling clearance, duties and compliance." },
  { icon: Warehouse, t: "Warehousing and 3PL", d: "Storage, pick-and-pack and inventory close to market." },
  { icon: Container, t: "Project Cargo", d: "Heavy-lift and out-of-gauge moves planned end to end." },
  { icon: RouteIcon, t: "Domestic & Interstate Transport", d: "Our own fleet moving cargo from port to door." },
  { icon: Truck, t: "Linehaul", d: "Scheduled long-distance runs between major cities." },
];

const highlights = [
  { icon: Users, t: "One point of contact", d: "No more chasing multiple vendors. One team manages your entire shipment from origin to destination." },
  { icon: Radar, t: "Full supply chain visibility", d: "Track your freight in real time and get proactive updates before issues become delays." },
  { icon: ShieldCheck, t: "Compliance you can trust", d: "Our licensed customs brokers keep your shipments moving within every regulatory requirement across APAC." },
  { icon: BadgeDollarSign, t: "Competitive, transparent pricing", d: "No hidden fees. Clear, comprehensive pricing backed by responsive billing support throughout the shipment." },
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
      className="fixed right-5 top-1/2 z-50 grid h-10 w-10 -translate-y-1/2 place-items-center text-background mix-blend-difference">
      <svg viewBox="0 0 50 50" className="absolute inset-0 -rotate-90">
        <circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" />
        <circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray={c} strokeDashoffset={c * (1 - p)} />
      </svg>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
    </button>
  );
}

function Index() {
  const storyRef = useRef<HTMLElement>(null);
  const roadRef = useRef<HTMLElement>(null);
  const shipRef = useRef<HTMLElement>(null);
  const planeRef = useRef<HTMLElement>(null);
  const p = useProgress(storyRef);
  const q = useProgress(roadRef);
  const s = useProgress(shipRef);
  const pl = useProgress(planeRef);

  // --- story timeline ---
  const intro = 1 - seg(p, 0, 0.04);
  const lift = ease(seg(p, 0.02, 0.14));
  const zoom = ease(seg(p, 0.14, 0.32));
  const swap = seg(p, 0.31, 0.33);
  const drive = ease(seg(p, 0.3, 0.4));
  const drop = ease(seg(p, 0.38, 0.46));
  const settle = ease(seg(p, 0.44, 0.54));
  const dark = ease(seg(p, 0.5, 0.58));
  const rail = ease(seg(p, 0.6, 0.95));
  const exit = ease(seg(p, 0.94, 1));

  // --- road timeline ---
  const turn = ease(seg(q, 0, 0.25));
  const roadW = 100 - turn * 84; // vw
  const down = ease(seg(q, 0.25, 1));

  return (
    <Shell>
      <ScrollRing />

      {/* 1. STORY: crane → truck → services */}
      <section ref={storyRef} className="relative h-[900vh] bg-background">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* intro copy */}
          <div className="absolute inset-x-6 top-24 z-10 flex flex-col justify-between gap-6 md:inset-x-12 md:flex-row" style={{ opacity: intro, transform: `translateY(${(1 - intro) * -40}px)` }}>
            <h1 className="text-3xl font-extrabold uppercase leading-[0.9] text-foreground md:text-7xl">We move freight.<br />We own<br />the outcome.</h1>
            <div className="hidden gap-8 md:flex md:gap-12">
              {[["2,500+", "Shipments per month"], ["98.2%", "On-time delivery"], ["8+", "Years in operation"]].map(([n, l]) => (
                <div key={l}><p className="text-2xl font-extrabold md:text-4xl">{n}</p><p className="text-[10px] uppercase tracking-wider text-muted-foreground md:text-xs">{l}</p></div>
              ))}
            </div>
          </div>

          {/* crane scene */}
          <div className="absolute bottom-[6%] left-1/2 aspect-[1536/1024] w-[min(1000px,92vw,110vh)]"
            style={{ opacity: 1 - swap, transform: `translateX(-50%) scale(${1 + zoom * 2.2})`, transformOrigin: "78% 40%" }}>
            <img src={stacker} alt="Reach stacker" className="absolute inset-0 h-full w-full" style={{ opacity: 1 - seg(zoom, 0, 0.4) }} />
            <img src={stackRow} alt="" className="absolute" style={{ left: "62.5%", top: "67%", width: "34.8%", opacity: 1 - seg(zoom, 0, 0.3) }} />
            <img src={boxWhite} alt="White shipping container" className="absolute" style={{ left: "62.6%", width: "30.1%", top: `${51.4 - lift * 19.2}%` }} />
          </div>

          {/* truck scene */}
          <div className="absolute left-1/2 aspect-[1920/640] w-[min(720px,90vw)]"
            style={{
              opacity: swap,
              bottom: `${55 * dark + 10 * (1 - dark)}%`,
              transform: `translateX(${-50 + (1 - drive) * 120 + exit * 160}%) scale(${1.8 - settle * 0.8})`,
              transformOrigin: "35% 60%",
            }}>
            <img src={chassis} alt="Semi-truck" className="absolute inset-0 h-full w-full" />
            <img src={truckBox} alt="" className="absolute" style={{ left: "2.3%", width: "65.9%", top: `${19.5 - (1 - drop) * 60}%`, opacity: drop > 0 ? 1 : 0 }} />
          </div>

          {/* dark lower half + services */}
          <div className="absolute inset-x-0 bottom-0 bg-ink text-ink-foreground" style={{ height: `${dark * 55 + exit * 45}%` }}>
            <p className="absolute left-6 top-8 text-2xl font-extrabold uppercase leading-[0.95] text-primary md:left-12 md:top-12 md:text-5xl"
              style={{ opacity: seg(p, 0.56, 0.62) * (1 - exit) }}>Everything freight,<br />under one roof</p>
            <div className="absolute bottom-10 left-0 flex gap-10 pl-[100vw] md:gap-20" style={{ transform: `translateX(${-rail * 100}%)`, opacity: 1 - exit }}>
              {svc.map(({ icon: I, t, d }) => (
                <div key={t} className="group w-52 shrink-0 cursor-default md:w-60">
                  <I className="h-6 w-6 text-ink-foreground/70 transition group-hover:text-primary" />
                  <h3 className="mt-4 text-sm font-extrabold uppercase leading-tight">{t}</h3>
                  <p className="mt-2 text-xs opacity-50 transition group-hover:opacity-90">{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ghost SERVICES word */}
          <h2 aria-hidden className="pointer-events-none absolute top-[18%] whitespace-nowrap text-[24vw] font-extrabold uppercase leading-none text-foreground/[0.07] blur-[2px]"
            style={{ transform: `translateX(${60 - rail * 120}vw)`, opacity: dark * (1 - exit) }}>Our Services</h2>
        </div>
      </section>

      {/* 2. ROAD: top-down truck */}
      <section ref={roadRef} className="relative h-[300vh] bg-background">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 bg-ink" style={{ width: `${roadW}vw` }}>
            <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-ink-foreground/25" style={{ opacity: turn }} />
          </div>
          <img src={truckTop} alt="Truck seen from above" className="absolute left-1/2 h-[46vh] w-auto"
            style={{ top: `${27 + down * 80}%`, transform: `translateX(-50%) rotate(${90 - turn * 90}deg) scale(${1.3 - turn * 0.6})` }} />
          <div className="absolute left-6 top-1/3 max-w-[35vw] md:left-12" style={{ opacity: seg(q, 0.2, 0.35), transform: `translateX(${(1 - seg(q, 0.2, 0.35)) * -40}px)` }}>
            <h2 className="text-2xl font-extrabold uppercase leading-[0.9] text-primary md:text-6xl">Reliability<br />at every<br />milestone</h2>
            <p className="mt-4 hidden max-w-xs text-sm text-muted-foreground md:block">From first pickup to final delivery, one accountable team keeps every kilometre on schedule.</p>
          </div>
          <div className="absolute right-6 top-1/3 hidden max-w-[30vw] space-y-8 md:block text-right md:right-16">
            {["Real-time freight tracking", "Dedicated account managers", "Proactive delay alerts"].map((t, i) => (
              <p key={t} className="text-xs font-bold uppercase tracking-wider text-foreground md:text-sm" style={{ opacity: seg(q, 0.35 + i * 0.12, 0.45 + i * 0.12) }}>{t}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SHIP */}
      <section ref={shipRef} className="relative h-[400vh] bg-ocean text-ink-foreground">
        <div className="sticky top-0 h-screen overflow-hidden">
          <img src={ship} alt="Aerial view of a container ship at sea" width={1920} height={1088}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ transform: `scale(${1 + (1 - ease(seg(s, 0, 0.5))) * 6})`, transformOrigin: "50% 40%" }} />
          <div className="absolute inset-0 bg-ocean/20" />
          <h2 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-4xl font-extrabold uppercase leading-[0.95] md:text-7xl"
            style={{ opacity: seg(s, 0.15, 0.25) * (1 - seg(s, 0.45, 0.52)) }}>Logistics that works<br />as hard as you do.</h2>
          <div className="absolute inset-0 mx-auto grid max-w-5xl grid-cols-2 content-center gap-x-[18vw] gap-y-[14vh] px-6">
            {highlights.map(({ icon: I, t, d }, i) => {
              const v = seg(s, 0.52 + i * 0.05, 0.6 + i * 0.05) * (1 - seg(s, 0.85, 0.9));
              return (
                <div key={t} className={`max-w-[15rem] ${i % 2 ? "justify-self-start text-left" : "justify-self-end text-right"}`}
                  style={{ opacity: v, transform: `translateY(${(1 - v) * 30}px)` }}>
                  <I className={`mb-3 h-5 w-5 ${i % 2 ? "" : "ml-auto"}`} />
                  <h3 className="text-xs font-extrabold uppercase md:text-base">{t}</h3>
                  <p className="mt-2 hidden text-xs opacity-75 md:block">{d}</p>
                </div>
              );
            })}
          </div>
          <div className="absolute left-1/2 top-[22%] w-64 -translate-x-1/2 text-center" style={{ opacity: seg(s, 0.9, 0.96) }}>
            <ChevronsRight className="mx-auto h-6 w-6" />
            <h3 className="mt-2 text-lg font-extrabold uppercase">Fast issue resolution</h3>
            <p className="mt-2 text-xs opacity-75">When something unexpected happens, we don't point fingers — we act fast and keep you informed.</p>
          </div>
        </div>
      </section>

      {/* 4. PLANE + TESTIMONIALS */}
      <section ref={planeRef} className="relative h-[200vh] bg-background">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <h2 className="absolute left-6 top-24 text-4xl font-extrabold uppercase leading-[0.9] text-primary md:left-12 md:text-7xl" style={{ opacity: seg(pl, 0.1, 0.3) }}>Trusted by<br />businesses<br />across APAC</h2>
          <img src={plane} alt="Cargo airplane" className="absolute w-[min(1000px,90vw)]"
            style={{ left: `${-80 + seg(pl, 0, 0.55) * 200}%`, top: `${40 - pl * 20}%`, transform: "rotate(-6deg)" }} />
          <figure className="absolute bottom-16 left-6 right-16 max-w-md md:left-auto md:right-16" style={{ opacity: seg(pl, 0.55, 0.7) }}>
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-muted font-bold">TM</div>
            <blockquote className="text-base leading-relaxed text-foreground md:text-lg">“My business wouldn't function without the team. Extremely talented, with immense expertise in each consignment, and dedicated account managers that know us.”</blockquote>
            <figcaption className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Client name · Company</figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-background px-6 py-32 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl text-4xl font-extrabold uppercase leading-none md:text-7xl">Every leg of the journey.</h2>
        <Link to="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground hover:opacity-90">Talk with us <ArrowUpRight className="h-4 w-4" /></Link>
      </section>
    </Shell>
  );
}
