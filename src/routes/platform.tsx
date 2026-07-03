import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Workflow, Rocket, Globe, Wind } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import baobabIcon from "@/assets/icons/baobab.png.asset.json";
import mtoIcon from "@/assets/icons/mto.png.asset.json";
import simbaIcon from "@/assets/icons/simba.png.asset.json";
import tamtamIcon from "@/assets/icons/tamtam.png.asset.json";
import safariIcon from "@/assets/icons/safari.png.asset.json";
import twigaIcon from "@/assets/icons/twiga.png.asset.json";

export const Route = createFileRoute("/platform")({
  component: PlatformPage,
  head: () => ({
    meta: [
      { title: "Platform — Savannah Cloud" },
      { name: "description", content: "Compute, storage, databases, messaging, maps, email — every primitive your stack needs, under one console." },
      { property: "og:title", content: "Platform — Savannah Cloud" },
      { property: "og:description", content: "Every primitive your stack needs, in one console." },
    ],
    links: [{ rel: "canonical", href: "https://savannahcloud.com/platform/" }],
  }),
});

const primitives = [
  { img: baobabIcon.url, name: "Baobab", tag: "Object Storage", desc: "S3-compatible blob storage. Buckets, signed URLs, lifecycle rules. Egress that doesn't punish you." },
  { img: mtoIcon.url, name: "Mto", tag: "SQL Database", desc: "Serverless SQL at the edge. Branching, point-in-time restore, zero cold starts." },
  { img: simbaIcon.url, name: "Simba", tag: "Edge Compute", desc: "Run functions in milliseconds, close to your users. Auto-scaled, pay per request." },
  { icon: Workflow, name: "Pipelines", tag: "Jobs & Queues", desc: "Background jobs, scheduled cron, distributed workloads. Retries and observability built in." },
  { icon: Rocket, name: "Launch", tag: "App Deployments", desc: "Push to GitHub, ship to the edge. Preview URLs per branch, instant rollbacks." },
  { icon: Globe, name: "Domains", tag: "Registry & DNS", desc: "Register, manage, and route domains. Every account gets a free *.savannahcloud.com subdomain." },
  { img: twigaIcon.url, name: "Twiga", tag: "Email", desc: "Transactional + marketing email with deliverability that actually lands in the inbox." },
  { img: tamtamIcon.url, name: "Tamtam", tag: "Messaging API", desc: "SMS and WhatsApp through a single API. Templates, two-way inbox, delivery receipts." },
  { img: safariIcon.url, name: "Safari", tag: "Maps & Geo", desc: "Maps, geocoding, directions and places. One key, one bill, global coverage." },
  { icon: Wind, name: "Pepo", tag: "CDN & Cache", desc: "Edge cache and asset delivery. Purge in milliseconds, cache rules you can actually read." },
] as const;

function PlatformPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The Platform"
        title={<>One console. <span className="font-serif-italic">Every primitive.</span></>}
        lede="Compute, storage, databases, messaging, maps, email. Pre-wired, billed together, owned by you."
      />
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {primitives.map((p) => (
            <div key={p.name} className="bg-background p-8 md:p-10">
              <div className="h-12 w-12 rounded-xl bg-[var(--sun)]/25 grid place-items-center mb-6">
                {"img" in p ? (
                  <img src={p.img} alt="" className="h-7 w-7 object-contain" loading="lazy" />
                ) : (
                  <p.icon className="h-5 w-5" />
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-xl font-black tracking-tight">{p.name}</h3>
                <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/50">{p.tag}</span>
              </div>
              <p className="mt-3 text-[15px] text-foreground/60 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/pipelines" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-bold hover:opacity-90 transition">
            Explore Pipelines <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/pricing" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border font-semibold hover:bg-card transition">
            See pricing
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
