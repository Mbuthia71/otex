import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Share2, MessageCircle, ThumbsUp, Camera } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import authorPortrait from "@/assets/author-portrait.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Savannah Cloud Announces MCP Integration and Sovereign Savannah CLI v1.0.0" },
      {
        name: "description",
        content:
          "Savannah Cloud ships native Model Context Protocol (MCP) support and the first stable release of the Sovereign Savannah CLI — built for African developers shipping to the world.",
      },
      { property: "og:title", content: "Savannah Cloud Announces MCP Integration and Sovereign Savannah CLI v1.0.0" },
      { property: "og:description", content: "Native MCP. A sovereign CLI. Shipped from Nairobi." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Savannah Cloud Announces MCP (Model Context Protocol) Integration and Sovereign Savannah CLI v1.0.0",
          datePublished: "2026-06-01",
          author: { "@type": "Person", name: "Sean Otieno" },
          publisher: { "@type": "Organization", name: "Savannah Cloud" },
        }),
      },
    ],
  }),
  component: BlogPost,
});

function BlogPost() {
  return (
    <SiteLayout>
      <article className="bg-white text-[#0a0a0a]">
        {/* Hero image — deep, cinematic */}
        <div className="w-full bg-black">
          <div className="mx-auto max-w-5xl">
            <div className="relative w-full aspect-[3/4] md:aspect-[16/10] overflow-hidden md:rounded-b-2xl bg-neutral-950">
              <img
                src={authorPortrait}
                alt="Senior Software Architect at Savannah Cloud"
                className="w-full h-full object-cover object-[center_15%] md:object-[center_25%]"
              />
              {/* Top vignette so the back button reads */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent" />
              {/* Bottom gradient for the cunning caption */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent" />

              <Link
                to="/"
                aria-label="Back"
                className="absolute top-4 left-4 md:top-6 md:left-6 inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 transition ring-1 ring-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>

              {/* Image metadata — cunning byline */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-white">
                <div className="flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-white/60">
                  <Camera className="h-3 w-3" />
                  <span>Portrait · Nairobi, 2026</span>
                </div>
                <div className="mt-3 font-serif-italic text-[22px] md:text-[34px] leading-[1.1] tracking-[-0.01em] text-white">
                  Sean Otieno
                </div>
                <div className="mt-1 text-[12.5px] md:text-[14px] text-white/75 tracking-tight">
                  Senior Software Architect · Savannah Cloud
                </div>
                <div className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/55">
                  <span className="h-px w-6 bg-white/40" />
                  <span>The architect's note</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article column */}
        <div className="mx-auto max-w-2xl px-6 pt-12 md:pt-20 pb-24">
          <div className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">
            01 Jun 2026 · 6 min read
          </div>

          <h1 className="mt-5 font-serif-italic not-italic text-[clamp(2.1rem,5.2vw,3.6rem)] leading-[1.04] tracking-[-0.02em] font-medium text-balance text-black">
            Savannah Cloud Announces MCP (Model Context Protocol) Integration and Sovereign Savannah CLI v1.0.0
          </h1>

          <div className="mt-6 pb-8 border-b border-neutral-200 text-[13.5px] text-neutral-500">
            Filed from Nairobi · Engineering announcement
          </div>



          {/* Body */}
          <div className="prose-content mt-8 space-y-6 text-[17px] leading-[1.75] text-neutral-800">
            <p>
              Today we're shipping two things we've been quietly building for the better part of a year: native{" "}
              <strong>Model Context Protocol (MCP)</strong> support across every Savannah Cloud product, and the first
              stable release of the <strong>Sovereign Savannah CLI — v1.0.0</strong>. Together they make Savannah Cloud
              the first African-built platform where you can wire an AI agent directly into your databases, pipelines,
              storage, and messaging surfaces without leaving the shell.
            </p>

            <p>
              We built this for the developer in Nairobi shipping to Lagos, the team in Kigali billing in shillings, and
              the founder in Cape Town who's tired of paying FX tax to deploy a side project. Sovereignty isn't a
              feature. It's the whole point.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-2 text-black">
              Why MCP, and why now
            </h2>
            <p>
              MCP is the closest thing the industry has to a real standard for letting AI agents talk to your tools. By
              implementing it natively — not as a wrapper, not as a plugin — Claude, Cursor, and any MCP-compatible
              client can read and write against your Savannah Cloud resources with the same permissions you'd grant a
              human teammate.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-2 text-black">
              The Sovereign Savannah CLI
            </h2>
            <p>
              v1.0.0 is the first release we're calling stable. One binary. Zero Node. Signed releases for macOS, Linux,
              and Windows. Install it the way you'd expect:
            </p>

            <pre className="bg-neutral-950 text-neutral-100 rounded-xl p-5 text-[13.5px] leading-relaxed overflow-x-auto font-mono">
{`# macOS / Linux
curl -fsSL https://get.savannahcloud.com | sh

# Then
savannah login
savannah projects create my-app
savannah mcp serve`}
            </pre>

            <p>
              <code className="bg-neutral-100 text-neutral-900 px-1.5 py-0.5 rounded text-[15px] font-mono">
                savannah mcp serve
              </code>{" "}
              spins up a local MCP server bridging your authenticated session to every product on the platform —
              Baobab (Postgres), Mto (object storage), Simba (queues), Pipelines, Twiga (email), Tamtam (SMS/WhatsApp),
              and Safari (maps).
            </p>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-2 text-black">What you can do today</h2>
            <p>
              Point Claude or Cursor at your project and ask it to run a migration, draft a transactional email, replay
              a failed pipeline, or generate a signed URL for a private bucket. The agent uses your scoped credentials.
              Nothing leaves your tenancy.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-2 text-black">Pricing, unchanged</h2>
            <p>
              MCP and the CLI are included on both <strong>Starter (KES 3,000/mo)</strong> and{" "}
              <strong>Pro (KES 9,000/mo)</strong>. No per-seat tax. No metered AI surcharge. The same shilling-priced
              bill you already get.
            </p>

            <p className="text-neutral-600 italic">
              Built in Africa. Shipped to the world. — The Savannah Cloud team
            </p>
          </div>

          {/* Action bar */}
          <div className="mt-12 pt-5 border-t border-neutral-200 flex items-center justify-between text-neutral-600">
            <button className="flex flex-col items-center gap-1 text-xs hover:text-black transition">
              <ThumbsUp className="h-4 w-4" />
              <span>508 Liked</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-xs hover:text-black transition">
              <MessageCircle className="h-4 w-4" />
              <span>35 comments</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-xs hover:text-black transition">
              <Bookmark className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-xs hover:text-black transition">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
