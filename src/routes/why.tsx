import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/why")({
  component: WhyPage,
  head: () => ({
    meta: [
      { title: "Why Savannah Cloud" },
      { name: "description", content: "Stop paying five vendors for one product. One platform replaces Vercel, Resend, Cloudflare, GitHub Actions, and your domain registrar." },
      { property: "og:title", content: "Why Savannah Cloud" },
      { property: "og:description", content: "One platform. Five vendors gone." },
    ],
    links: [{ rel: "canonical", href: "https://savannahcloud.com/why/" }],
  }),
});

const rows = [
  ["Deployments", "Vercel"],
  ["Transactional email", "Resend / Postmark"],
  ["DNS & CDN", "Cloudflare"],
  ["Domain registrar", "Namecheap / GoDaddy"],
  ["Background jobs", "Render / Inngest"],
  ["CI / Pipelines", "GitHub Actions"],
  ["One bill, one team, one API", "—"],
];

function WhyPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Why us"
        title={<>Stop paying <span className="font-serif-italic">five vendors</span> for one product.</>}
        lede="Every capability below ships in Savannah Cloud out of the box. One console. One invoice. One support channel."
      />
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="rounded-2xl border border-border overflow-hidden bg-background">
          <div className="grid grid-cols-12 px-8 py-4 text-[10px] uppercase tracking-[0.22em] text-foreground/45 border-b border-border">
            <div className="col-span-6">Capability</div>
            <div className="col-span-4">Usually you'd buy</div>
            <div className="col-span-2 text-right">Savannah</div>
          </div>
          {rows.map(([cap, alt]) => (
            <div
              key={cap}
              className="grid grid-cols-12 px-8 py-5 border-b border-border/70 last:border-0 items-center"
            >
              <div className="col-span-6 font-medium">{cap}</div>
              <div className="col-span-4 text-sm text-foreground/55">{alt}</div>
              <div className="col-span-2 text-right text-[var(--herb)] font-medium">Included</div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition"
          >
            See pricing <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
