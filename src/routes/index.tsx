import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Loader } from "@/components/Loader";
import { TypewriterText } from "@/components/TypewriterText";
import cloudHero from "@/assets/cloud-hero.jpg";
import posterRunLife from "@/assets/poster-run-your-life.jpg";
import posterChaosStability from "@/assets/poster-chaos-stability.png";
import baobabIcon from "@/assets/icons/baobab.png.asset.json";
import mtoIcon from "@/assets/icons/mto.png.asset.json";
import simbaIcon from "@/assets/icons/simba.png.asset.json";
import tamtamIcon from "@/assets/icons/tamtam.png.asset.json";
import safariIcon from "@/assets/icons/safari.png.asset.json";
import twigaIcon from "@/assets/icons/twiga.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Savannah Cloud — Everything your stack needs, in one place" },
      { name: "description", content: "Pipelines, deployments, domains, email. One cloud platform built for developers. Ship faster. Pay less. Own more." },
      { name: "theme-color", content: "#F4F1EA" },
      { property: "og:title", content: "Savannah Cloud" },
      { property: "og:description", content: "Everything your stack needs, in one place." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://savannahcloud.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "canonical", href: "https://savannahcloud.com/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Savannah Cloud",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
          description: "All-in-one African cloud platform: compute, storage, databases, email, SMS, WhatsApp, and maps under one roof, billed in local currency.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free tier available" },
          publisher: { "@type": "Organization", name: "Savannah Cloud" },
          featureList: [
            "S3-compatible object storage (Baobab)",
            "Serverless SQL database with branching (Mto)",
            "Edge compute functions (Simba)",
            "SMS and WhatsApp messaging API (Tamtam)",
            "Maps, geocoding, directions (Safari)",
            "Transactional and marketing email (Twiga)",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is Savannah Cloud?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Savannah Cloud is an African-built cloud platform that bundles compute, storage, databases, email, SMS, WhatsApp, and maps into a single account, billed in local African currencies. It is a single-vendor alternative to stitching together AWS, SendGrid, Twilio, and Mapbox.",
              },
            },
            {
              "@type": "Question",
              name: "What services does Savannah Cloud offer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Six core services: Baobab (S3-compatible object storage), Mto (serverless SQL with branching), Simba (edge compute), Tamtam (SMS and WhatsApp API), Safari (maps and geocoding), and Twiga (transactional email).",
              },
            },
            {
              "@type": "Question",
              name: "How is Savannah Cloud different from AWS or Vercel?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Savannah Cloud is built in Africa for African latency and pricing. You get one invoice in local currency, support for Paystack and M-Pesa, and every primitive (compute, data, messaging, maps) in one console instead of seven separate vendors.",
              },
            },
            {
              "@type": "Question",
              name: "How much does Savannah Cloud cost?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Plans start at KES 3,000/month for Starter and KES 9,000/month for Pro, with custom Scale pricing for larger teams. Billing is in Kenyan shillings via M-Pesa, card, or Paystack inside console.savannahcloud.com.",
              },
            },
            {
              "@type": "Question",
              name: "Where do I sign up and manage billing?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Signup, projects, billing and payment methods all live at console.savannahcloud.com. The savannahcloud.com site is for product information and pricing.",
              },
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <SiteLayout>
      <Loader />
      <Hero />
      <Glance />
      <Posters />
      <FAQ />
      <ClosingCTA />
    </SiteLayout>
  );
}

function Posters() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center mb-12">
        <div className="text-[11px] uppercase tracking-[0.28em] text-foreground/45 mb-4">Built for Africa</div>
        <h2 className="text-balance text-[clamp(1.75rem,4vw,2.75rem)] font-black tracking-[-0.035em]">
          Infrastructure that <span className="font-serif-italic font-normal">moves with you.</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <figure className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/70 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
          <img
            src={posterRunLife}
            alt="Run your life. We handle the rest. — Savannah Cloud poster of a couple running past an acacia tree at sunset"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </figure>
        <figure className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/70 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
          <img
            src={posterChaosStability}
            alt="Chaos above. Stability below. — Savannah Cloud poster of palm trees bending in a desert windstorm"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}

function FAQ() {
  const qa = [
    {
      q: "What is Savannah Cloud?",
      a: "Savannah Cloud is an African-built cloud platform that bundles compute, storage, databases, email, SMS, WhatsApp and maps into a single account — billed in local currency. It replaces stitching together AWS, SendGrid, Twilio and Mapbox with one console and one invoice.",
    },
    {
      q: "What services does Savannah Cloud offer?",
      a: "Six core primitives: Baobab (S3-compatible object storage), Mto (serverless SQL with branching), Simba (edge compute), Tamtam (SMS and WhatsApp API), Safari (maps and geocoding) and Twiga (transactional email).",
    },
    {
      q: "How is Savannah Cloud different from AWS, Vercel or Supabase?",
      a: "We are built in Africa, for African latency and pricing. You pay in shillings — not dollars — get support for Paystack and M-Pesa, and every primitive lives in one console instead of being split across five vendors.",
    },
    {
      q: "How much does Savannah Cloud cost?",
      a: "Starter is KES 3,000/month and Pro is KES 9,000/month. Scale pricing is custom for larger teams. Pay by M-Pesa, card or Paystack — all in shillings, no FX surprises.",
    },
    {
      q: "Where do I sign up and manage billing?",
      a: "All signup, project management, billing and payment methods live at console.savannahcloud.com. This site is for product information and pricing.",
    },
    {
      q: "Who is behind Savannah Cloud?",
      a: "Savannah Cloud is a Siohioma Group company, built and operated from Africa and shipped to the world.",
    },
  ];
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24" itemScope itemType="https://schema.org/FAQPage">
      <div className="text-center mb-12">
        <div className="text-[11px] uppercase tracking-[0.28em] text-foreground/45 mb-4">FAQ</div>
        <h2 className="text-balance text-[clamp(1.75rem,4vw,2.75rem)] font-black tracking-[-0.035em]">
          The <span className="font-serif-italic font-normal">honest</span> answers.
        </h2>
      </div>
      <dl className="divide-y divide-border/60 border-y border-border/60">
        {qa.map((item) => (
          <div
            key={item.q}
            className="py-6"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <dt
              className="text-lg font-semibold tracking-tight text-foreground"
              itemProp="name"
            >
              {item.q}
            </dt>
            <dd
              className="mt-3 text-foreground/70 leading-relaxed"
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <span itemProp="text">{item.a}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}


function Hero() {
  const router = useRouter();
  const segments = useMemo(
    () => [
      { text: "Everything your stack needs," },
      { text: " in one place.", className: "font-serif-italic font-normal text-foreground/90" },
    ],
    []
  );

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-10 md:pt-14">
        <h2 className="text-center md:text-left text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-[-0.055em] leading-[0.9]">
          Savannah Cloud
        </h2>
      </div>
      <div className="mx-auto max-w-7xl px-6 pt-10 md:pt-14 pb-20 md:pb-28">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="fade-up">
            <h1 className="text-balance text-[clamp(2.75rem,6vw,5rem)] font-black tracking-[-0.045em] leading-[0.98]">
              <TypewriterText
                trigger={router.state.location.href}
                segments={segments}
                speed={40}
              />
            </h1>
            <p className="mt-7 text-lg md:text-xl text-foreground/65 max-w-lg leading-relaxed">
              Compute, storage, databases, email, SMS, WhatsApp, maps. Under one roof, billed in shillings. Stop juggling seven dashboards and seven invoices.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="https://console.savannahcloud.com"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-bold hover:opacity-90 transition"
              >
                Open the console
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
              </a>
              <Link
                to="/platform"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border bg-background/60 font-semibold hover:bg-background transition"
              >
                See the platform
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] md:aspect-[4/5] rounded-3xl overflow-hidden border border-border/70 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
            <img
              src={cloudHero}
              alt="Sunrise over a savannah sky"
              className="absolute inset-0 w-full h-full object-cover drift-slow"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ink)]/20 via-transparent to-[var(--sun)]/10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Glance() {
  const items = [
    { label: "Baobab", tag: "Storage", desc: "S3-compatible object storage. Buckets, signed URLs, fair egress.", icon: baobabIcon.url },
    { label: "Mto", tag: "Database", desc: "Serverless SQL at the edge. Branching and point-in-time restore.", icon: mtoIcon.url },
    { label: "Simba", tag: "Compute", desc: "Edge functions that run in milliseconds, close to your users.", icon: simbaIcon.url },
    { label: "Tamtam", tag: "Messaging", desc: "SMS and WhatsApp through one API. Templates and delivery receipts.", icon: tamtamIcon.url },
    { label: "Safari", tag: "Maps & Geo", desc: "Maps, geocoding, directions, places. One key, global coverage.", icon: safariIcon.url },
    { label: "Twiga", tag: "Email", desc: "Transactional and marketing email that lands in the inbox.", icon: twigaIcon.url },
  ] as const;
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center mb-12">
        <div className="text-[11px] uppercase tracking-[0.28em] text-foreground/45 mb-4">The Stack</div>
        <h2 className="text-balance text-[clamp(1.75rem,4vw,2.75rem)] font-black tracking-[-0.035em]">
          One platform. <span className="font-serif-italic font-normal">Every primitive.</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
        {items.map((i) => (
          <Link
            key={i.label}
            to="/platform"
            className="bg-background p-8 hover:bg-card transition group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-foreground/[0.04] border border-border/60 grid place-items-center shrink-0">
                  <img src={i.icon} alt="" className="h-7 w-7 object-contain" loading="lazy" />
                </div>
                <div>
                  <div className="text-xl font-black tracking-tight">{i.label}</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/45 mt-1">{i.tag}</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-foreground/40 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-foreground/70">{i.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h2 className="text-balance text-[clamp(2rem,5vw,3.5rem)] font-medium tracking-[-0.03em] leading-[1.05]">
        Ship faster. <span className="font-serif-italic">Pay less.</span> Own more.
      </h2>
      <p className="mt-5 text-lg text-foreground/60">
        Open the console and ship your first pipeline in minutes.
      </p>
      <a
        href="https://console.savannahcloud.com"
        className="mt-9 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition"
      >
        Open Console <ArrowUpRight className="h-4 w-4" />
      </a>
    </section>
  );
}
