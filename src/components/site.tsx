import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const services = [
  { t: "Air Freight", d: "Express and consolidated air cargo through major hubs worldwide." },
  { t: "Ocean Freight", d: "FCL and LCL shipping with reliable schedules and full visibility." },
  { t: "Customs Brokerage", d: "Licensed brokers handling clearance, duties and compliance." },
  { t: "Warehousing & 3PL", d: "Storage, pick-and-pack and inventory management close to market." },
  { t: "Project Cargo", d: "Heavy-lift and out-of-gauge moves planned end to end." },
  { t: "Domestic & Linehaul", d: "Road transport with our own fleet, from port to door." },
];

export function Shell({ children }: { children: ReactNode }) {
  const nav = "text-sm font-semibold uppercase tracking-wider hover:text-primary";
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 text-ink-foreground md:px-12">
        <Link to="/" className="text-xl font-extrabold tracking-tight">MERIDIAN<span className="text-primary">.</span></Link>
        <nav className="flex gap-6">
          <Link to="/services" className={nav}>Services</Link>
          <Link to="/contact" className={nav}>Contact</Link>
        </nav>
      </header>
      {children}
      <footer className="bg-ink px-6 py-12 text-ink-foreground md:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <p className="text-3xl font-extrabold">MERIDIAN<span className="text-primary">.</span></p>
          <p className="opacity-60">© 2026 Meridian Freight. One operator, every leg of the journey.</p>
        </div>
      </footer>
    </div>
  );
}

export function PageHero({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="bg-ink px-6 pb-20 pt-40 text-ink-foreground md:px-12">
      <h1 className="text-5xl font-extrabold uppercase md:text-7xl">{title}</h1>
      <p className="mt-4 max-w-xl text-lg opacity-70">{sub}</p>
    </section>
  );
}
