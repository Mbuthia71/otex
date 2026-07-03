import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing — Savannah Cloud" },
      { name: "description", content: "Starter at KES 3,000/mo. Pro at KES 9,000/mo. Scale for teams. Priced in shillings — no FX tax." },
      { property: "og:title", content: "Pricing — Savannah Cloud" },
      { property: "og:description", content: "Simple. Honest. Priced in KES." },
    ],
    links: [{ rel: "canonical", href: "https://savannahcloud.com/pricing/" }],
  }),
});

const tiers = [
  {
    name: "Starter",
    price: "KES 3,000",
    suffix: "/ month",
    desc: "For solo builders shipping real things.",
    features: [
      "1 project · custom domain (bring your own)",
      "50 GB Baobab storage",
      "2 Mto databases (5 GB each)",
      "1M Simba requests / mo",
      "100k Pipelines runs / mo",
      "10k Twiga emails / mo",
      "1k Tamtam messages / mo",
      "Safari maps: 25k loads / mo",
    ],
    cta: "Start with Starter",
    highlight: false,
  },
  {
    name: "Pro",
    price: "KES 9,000",
    suffix: "/ month",
    desc: "For teams shipping at scale.",
    features: [
      "Unlimited projects + custom domains",
      "Free .africa or .co.ke domain for the first year",
      "500 GB Baobab storage",
      "20 Mto databases (20 GB each)",
      "10M Simba requests / mo",
      "2M Pipelines runs / mo",
      "100k Twiga emails · 10k Tamtam messages",
      "Safari maps: 250k loads / mo",
      "Team of 10",
    ],
    cta: "Go Pro",
    highlight: true,
  },
  {
    name: "Scale",
    price: "Custom",
    desc: "For teams with weight to throw.",
    features: [
      "Volume pricing across every primitive",
      "Dedicated infra + 99.99% SLA",
      "SSO, audit logs, RBAC",
      "Priority support · named engineer",
    ],
    cta: "Talk to us",
    highlight: false,
  },
];

function PricingPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Pricing"
        title={<>Simple. <span className="font-serif-italic">Honest.</span> In shillings.</>}
        lede="No per-seat traps. No FX surprises. One bill, in KES, for every primitive on the platform."
      />
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl border p-8 ${
                t.highlight ? "border-foreground bg-card shadow-sm" : "border-border bg-background"
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-2.5 left-8 text-[10px] tracking-[0.25em] uppercase bg-foreground text-background px-2.5 py-1 rounded-full">
                  Recommended
                </div>
              )}
              <div className="text-sm text-foreground/55">{t.name}</div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-4xl font-black tracking-tight">{t.price}</span>
                {t.suffix && <span className="text-sm text-foreground/55">{t.suffix}</span>}
              </div>
              <p className="mt-2 text-sm text-foreground/60">{t.desc}</p>
              <ul className="mt-8 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 mt-0.5 text-[var(--herb)] shrink-0" />
                    <span className="text-foreground/75">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://console.savannahcloud.com"
                className={`mt-8 inline-flex w-full items-center justify-center px-4 py-2.5 rounded-full font-bold text-sm transition ${
                  t.highlight
                    ? "bg-foreground text-background hover:opacity-90"
                    : "border border-border hover:bg-card"
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-foreground/45">
          Prices in Kenyan Shillings. Pay by M-Pesa, card, or bank transfer. VAT included where applicable.
        </p>
      </section>
    </SiteLayout>
  );
}
