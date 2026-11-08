import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Upload, Loader2, Sparkles } from "lucide-react";
import { Shell } from "@/components/site";
import { compareDesign } from "@/lib/compare.functions";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Design compare — spot differences with AI" },
      { name: "description", content: "Upload a page screenshot and a reference frame to get AI-identified visual differences and fixes." },
      { property: "og:title", content: "Design compare — spot differences with AI" },
      { property: "og:description", content: "Upload a page screenshot and a reference frame to get AI-identified visual differences and fixes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Compare,
});

const toDataUrl = (f: File) => new Promise<string>((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result as string); r.onerror = rej; r.readAsDataURL(f); });

function Drop({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex aspect-video cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-border bg-muted/40 text-muted-foreground hover:border-primary">
      {value ? <img src={value} alt={label} className="h-full w-full object-contain" /> : (<><Upload className="h-6 w-6" /><span className="mt-2 text-sm font-semibold">{label}</span></>)}
      <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) onChange(await toDataUrl(f)); }} />
    </label>
  );
}

function Compare() {
  const run = useServerFn(compareDesign);
  const [page, setPage] = useState(""); const [ref, setRef] = useState(""); const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false); const [out, setOut] = useState(""); const [err, setErr] = useState("");
  const go = async () => {
    setBusy(true); setErr(""); setOut("");
    try { const r = await run({ data: { page, reference: ref, notes } }); r.ok ? setOut(r.text) : setErr(r.error); }
    catch (e) { setErr(e instanceof Error ? e.message : "Something went wrong."); }
    finally { setBusy(false); }
  };
  return (
    <Shell>
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-32">
        <h1 className="text-3xl font-extrabold uppercase md:text-5xl">Design compare</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Upload a screenshot of your page and a frame from the reference video. The AI lists the differences and how to fix them.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div><p className="mb-2 text-xs font-bold uppercase tracking-wider">1. Your page</p><Drop label="Upload page screenshot" value={page} onChange={setPage} /></div>
          <div><p className="mb-2 text-xs font-bold uppercase tracking-wider">2. Reference frame</p><Drop label="Upload video frame" value={ref} onChange={setRef} /></div>
        </div>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional: what should the AI focus on?" className="mt-6 w-full rounded-lg border border-border bg-background p-3 text-sm" rows={2} />
        <button disabled={!page || !ref || busy} onClick={go} className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-40">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} {busy ? "Analysing…" : "Find differences"}
        </button>
        {err && <p className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{err}</p>}
        {out && <article className="mt-8 whitespace-pre-wrap rounded-lg border border-border bg-card p-6 text-sm leading-relaxed text-card-foreground">{out}</article>}
      </section>
    </Shell>
  );
}
