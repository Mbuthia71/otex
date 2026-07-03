/**
 * /console-preview
 * ─────────────────────────────────────────────────────────────────────────────
 *  A SINGLE-FILE, HEAVILY ANNOTATED MOCK OF THE SAVANNAH CLOUD OPERATOR CONSOLE.
 *
 *  Why this file exists
 *  --------------------
 *  This route is the source of truth Claude (or any coding agent) should read
 *  before touching the real console repo. Every visual decision is captured
 *  here as JSX + Tailwind so the agent can copy/paste components and tokens
 *  without guessing. Nothing on this page hits the backend — all data is
 *  inline so the file is portable.
 *
 *  Structure of the page (top → bottom)
 *  ------------------------------------
 *    1. <HeroBanner/>          → marketing-style intro card (image-2 vibe)
 *    2. <ConsoleShell/>        → real app frame: sidebar + topbar + content
 *         ├─ Route: /dashboard       (the "big" one — image-4 inspired)
 *         ├─ Route: /deployments     (table of recent deploys)
 *         ├─ Route: /pipelines       (CI status grid)
 *         ├─ Route: /domains         (DNS zones + SSL state)
 *         ├─ Route: /email           (3-pane inbox, dappr-inspired)
 *         └─ Route: /billing         (plan + usage + invoices)
 *    3. <FooterSplash/>        → poetic sign-off using a single hero image
 *    4. <SourceReference/>     → copy-pasteable design rules for Claude
 *
 *  Design language (locked)
 *  ------------------------
 *    bg      → var(--cream)  warm off-white
 *    ink     → foreground    near-black
 *    accent  → var(--sun)    soft amber, used SPARINGLY (1 thing per screen)
 *    good    → var(--herb)   muted sage, used for "live / ok" indicators
 *    type    → Inter Tight (sans, 700–900 for display)
 *              Instrument Serif italic for names and accents only
 *    radius  → cards rounded-2xl, controls rounded-md
 *    shadow  → flat by default; one soft drop-shadow on hero card only
 *
 *  Rule of thumb: monochrome everywhere, then ONE warm splash of colour per
 *  surface. That restraint is what makes this feel like Cloudflare — big but
 *  calm — instead of a vibecoded rainbow.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  // shell
  LayoutGrid, Rocket, Workflow, Network, Mail, Receipt, Settings, LifeBuoy,
  Users, KeyRound, Terminal, Activity, LogOut, Bell, Search, Plus, ArrowUpRight,
  RefreshCw, ChevronDown, Github,
  // dashboard
  TrendingUp, ShoppingBag, Wallet, Package,
  // deployments / pipelines / domains
  GitBranch, CheckCircle2, Clock, AlertTriangle, Globe, Shield,
  // email
  Inbox, Star, Send, FileText, Trash2, Folder, Reply, Forward, Paperclip,
  // source ref
  Copy, Check,
} from "lucide-react";
import { LogoMark } from "@/components/Logo";
import heroTextureImg from "@/assets/console/hero-texture.jpg";
import footerSplashImg from "@/assets/console/footer-splash.jpg";

export const Route = createFileRoute("/console-preview")({
  head: () => ({
    meta: [
      { title: "Console preview — Savannah Cloud" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ConsolePreview,
});

/* ═══════════════════════════════════════════════════════════════════════════
 * PAGE
 * ═══════════════════════════════════════════════════════════════════════════ */

function ConsolePreview() {
  // The sidebar drives which "fake route" we render in the main pane.
  // Each option below corresponds to a real route we want to ship in the
  // production console. Anchored to React state so the page is one URL but
  // behaves like a working router for demo purposes.
  const [route, setRoute] = useState<RouteKey>("dashboard");

  return (
    <div className="min-h-screen bg-[var(--cream)] text-foreground antialiased">
      <HeroBanner />

      <ConsoleShell route={route} onRouteChange={setRoute} />

      <FooterSplash />

      <div className="max-w-[1400px] mx-auto px-8 pb-16">
        <SourceReference />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 1 · HERO BANNER
 *
 * Direct lift of the user's image-2 reference:
 *   - full-bleed cream/orange paint texture
 *   - large frosted card (logo, headline, supporting copy, feature pills)
 *   - row of three stat tiles floated to the right
 *   - hairline divider + copyright line beneath
 * ═══════════════════════════════════════════════════════════════════════════ */

function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden"
      // The texture is the *whole* background of the hero. We darken the very
      // edges with a soft radial overlay so the card always has enough contrast,
      // no matter how the image crops at different viewport widths.
      style={{
        backgroundImage: `url(${heroTextureImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* very subtle vignette — keeps the card readable */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.2_0.02_60/0.18)_100%)]"
      />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] items-stretch gap-6">
          {/* ── Frosted intro card (left) ─────────────────────────────── */}
          <article
            className="relative rounded-3xl p-8 sm:p-10 border border-white/40 backdrop-blur-2xl
                       bg-[oklch(0.98_0.012_85/0.55)]
                       shadow-[0_30px_80px_-40px_oklch(0.3_0.06_40/0.45)]"
          >
            {/* logo lockup */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-11 w-11 rounded-xl bg-white grid place-items-center border border-border/60 shadow-sm">
                <LogoMark className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[18px] font-black tracking-tight leading-tight">Savannah Cloud</div>
                <div className="text-[12px] text-foreground/55 leading-tight">Operator console · preview</div>
              </div>
            </div>

            {/* heavy display headline */}
            <h1 className="font-black tracking-[-0.045em] leading-[0.92] text-[clamp(40px,5.6vw,72px)] max-w-[14ch]">
              Run your stack with{" "}
              <span className="italic font-serif-italic font-normal">precision.</span>
            </h1>

            <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-foreground/65">
              Deploy from Git, point a domain, send a million emails, watch the
              graphs — all on infrastructure built in Nairobi for the rest of us.
            </p>

            {/* feature pills */}
            <div className="mt-7 flex flex-wrap gap-2">
              {[
                { dot: "var(--herb)",  label: "Real-time deploys" },
                { dot: "var(--sun)",   label: "Edge email" },
                { dot: "oklch(0.35 0.05 160)", label: "Smart analytics" },
              ].map((p) => (
                <span
                  key={p.label}
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-white/80 border border-border/60 text-[13px] font-semibold"
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: p.dot }} />
                  {p.label}
                </span>
              ))}
            </div>
          </article>

          {/* ── Stat tiles (right) ────────────────────────────────────── */}
          {/* Each tile is a tall, slim "receipt" — big number, label, sparkline */}
          <aside className="grid grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3 lg:w-[360px] xl:w-[480px]">
            <HeroStat value="179"   label="Completed" trend="up"   />
            <HeroStat value="0"     label="Pending"   trend="flat" />
            <HeroStat value="KES…"  label="Revenue"   trend="up"   />
          </aside>
        </div>

        {/* hairline + copyright */}
        <div className="mt-10 pt-5 border-t border-foreground/15 text-[12px] text-foreground/55">
          © 2026 Savannah Cloud. All rights reserved.
        </div>
      </div>
    </section>
  );
}

/** Single stat tile shown in the hero — white card, huge number, tiny sparkline */
function HeroStat({ value, label, trend }: { value: string; label: string; trend: "up" | "flat" }) {
  const stroke = trend === "up" ? "var(--herb)" : "var(--sun)";
  return (
    <div className="rounded-2xl bg-white/90 border border-border/50 backdrop-blur-xl px-5 py-6 flex flex-col items-center text-center">
      <div className="text-[34px] font-black tracking-[-0.03em] leading-none">{value}</div>
      <div className="mt-2 text-[12px] text-foreground/55 font-medium">{label}</div>
      {/* tiny inline sparkline — SVG keeps it crisp at any zoom */}
      <svg viewBox="0 0 80 14" className="mt-4 h-3.5 w-20" aria-hidden>
        <path
          d={trend === "up" ? "M2 11 L20 8 L40 9 L60 4 L78 6" : "M2 7 L78 7"}
          fill="none"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="78" cy={trend === "up" ? "6" : "7"} r="1.6" fill={stroke} />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 2 · CONSOLE SHELL (sidebar + topbar + routed content)
 *
 * The shell mimics the real app chrome so each "route preview" below feels
 * like a screenshot of the live product, not a marketing page.
 * ═══════════════════════════════════════════════════════════════════════════ */

type RouteKey =
  | "dashboard" | "deployments" | "pipelines"
  | "domains"   | "email"       | "billing";

const NAV_GROUPS: { label: string; items: { key: RouteKey; label: string; icon: typeof Rocket }[] }[] = [
  { label: "Build", items: [
    { key: "dashboard",   label: "Dashboard",   icon: LayoutGrid },
    { key: "deployments", label: "Deployments", icon: Rocket },
    { key: "pipelines",   label: "Pipelines",   icon: Workflow },
  ]},
  { label: "Run", items: [
    { key: "domains", label: "Domains", icon: Network },
    { key: "email",   label: "Email",   icon: Mail },
  ]},
  { label: "Account", items: [
    { key: "billing", label: "Billing", icon: Receipt },
  ]},
];

function ConsoleShell({ route, onRouteChange }:
  { route: RouteKey; onRouteChange: (r: RouteKey) => void }) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 sm:px-8 mt-12">
      <div className="rounded-3xl border border-border/60 bg-card overflow-hidden shadow-[0_30px_80px_-50px_oklch(0.3_0.05_60/0.35)]">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-[820px]">
          <Sidebar route={route} onRouteChange={onRouteChange} />
          <main className="min-w-0 flex flex-col">
            <TopBar route={route} />
            <div className="flex-1 p-6 sm:p-8 bg-[var(--cream)]">
              {/* Route switch — each preview component fully owns its layout */}
              {route === "dashboard"   && <DashboardRoute />}
              {route === "deployments" && <DeploymentsRoute />}
              {route === "pipelines"   && <PipelinesRoute />}
              {route === "domains"     && <DomainsRoute />}
              {route === "email"       && <EmailRoute />}
              {route === "billing"     && <BillingRoute />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Sidebar ─────────────────────────
 * - 220px fixed, cream surface to match the page
 * - active item gets a 2px accent rail in --sun and bolded text
 * - groups are separated by a labelled section header (Build/Run/Account)
 */
function Sidebar({ route, onRouteChange }:
  { route: RouteKey; onRouteChange: (r: RouteKey) => void }) {
  return (
    <aside className="border-r border-border/60 bg-[var(--cream)] flex flex-col">
      {/* brand */}
      <div className="px-5 pt-5 pb-6 flex items-center gap-2.5">
        <LogoMark className="h-7 w-7" />
        <div className="min-w-0">
          <div className="text-[13px] font-black tracking-tight leading-tight">Savannah Cloud</div>
          <div className="text-[11px] text-foreground/45 leading-tight">savannah-cloud</div>
        </div>
      </div>

      {/* nav */}
      <nav className="flex-1 px-2.5 space-y-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <div className="px-2.5 mb-1.5 text-[10px] uppercase tracking-[0.22em] text-foreground/40 font-bold">
              {group.label}
            </div>
            <ul className="space-y-0.5">
              {group.items.map((it) => {
                const active = it.key === route;
                return (
                  <li key={it.key}>
                    <button
                      type="button"
                      onClick={() => onRouteChange(it.key)}
                      className={`group relative w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] transition text-left ${
                        active
                          ? "bg-foreground/[0.05] text-foreground font-semibold"
                          : "text-foreground/65 hover:text-foreground hover:bg-foreground/[0.025]"
                      }`}
                    >
                      {active && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-[var(--sun)]" />
                      )}
                      <it.icon className="h-[15px] w-[15px]" strokeWidth={1.6} />
                      <span>{it.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* secondary links — don't change route, just demonstrate they exist */}
        <div>
          <div className="px-2.5 mb-1.5 text-[10px] uppercase tracking-[0.22em] text-foreground/40 font-bold">
            More
          </div>
          <ul className="space-y-0.5 text-foreground/55">
            {[
              { icon: Terminal,  label: "Console" },
              { icon: Activity,  label: "Monitoring" },
              { icon: Users,     label: "Team" },
              { icon: KeyRound,  label: "API keys" },
              { icon: LifeBuoy,  label: "Support" },
              { icon: Settings,  label: "Settings" },
            ].map((it) => (
              <li key={it.label}>
                <a href="#" className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] hover:text-foreground hover:bg-foreground/[0.025] transition">
                  <it.icon className="h-[14px] w-[14px]" strokeWidth={1.6} />
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* user footer */}
      <div className="px-3 pb-4 pt-3 border-t border-border/60 mt-3">
        <div className="flex items-center gap-2.5 px-1.5 py-1.5">
          <div className="h-7 w-7 rounded-full bg-foreground text-background grid place-items-center text-[11px] font-black">A</div>
          <div className="min-w-0 flex-1">
            <div className="text-[12px] font-semibold truncate">allan.mbuthia</div>
            <div className="text-[10px] text-foreground/45 uppercase tracking-[0.15em]">Owner</div>
          </div>
          <button className="text-foreground/50 hover:text-foreground" aria-label="Sign out">
            <LogOut className="h-[14px] w-[14px]" strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </aside>
  );
}

/* ───────────────────────── Topbar ───────────────────────── */
function TopBar({ route }: { route: RouteKey }) {
  const labelMap: Record<RouteKey, string> = {
    dashboard: "Dashboard", deployments: "Deployments", pipelines: "Pipelines",
    domains: "Domains", email: "Email", billing: "Billing",
  };
  return (
    <div className="h-14 border-b border-border/60 flex items-center justify-between px-6 bg-card">
      <div className="flex items-center gap-2 text-[12px] text-foreground/55 min-w-0">
        <span className="truncate">savannah-cloud</span>
        <span className="text-foreground/30">/</span>
        <span className="text-foreground font-semibold truncate">{labelMap[route]}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/40" />
          <input
            placeholder="Search projects, deploys, domains…"
            className="h-8 w-72 rounded-md bg-foreground/[0.04] pl-8 pr-3 text-[12px] outline-none placeholder:text-foreground/40 focus:bg-foreground/[0.06] transition"
          />
        </div>
        <a href="#" className="text-[12px] text-foreground/55 hover:text-foreground inline-flex items-center gap-1.5 px-2 py-1 rounded transition">
          <Github className="h-3.5 w-3.5" /> Docs
        </a>
        <button className="relative h-8 w-8 grid place-items-center rounded-full hover:bg-foreground/[0.04] transition" aria-label="Notifications">
          <Bell className="h-4 w-4 text-foreground/70" strokeWidth={1.7} />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[var(--sun)]" />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * ROUTE: /dashboard
 *
 * Inspired by the user's image-4 (Promotion Analysis). The brief:
 *   - Big editorial title + subtitle on the left
 *   - Three KPI "receipts" on the right (Profit / Customers / Orders)
 *   - Wide statistics card with a yellow bar chart + tooltip
 *   - Top categories card with a half-donut + legend
 *   - Filterable transactions table beneath
 * Everything stays monochrome with --sun (amber) as the single accent.
 * ═══════════════════════════════════════════════════════════════════════════ */

function DashboardRoute() {
  return (
    <div className="space-y-6">
      {/* ── Title row + KPIs ─────────────────────────────────────────── */}
      <header className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.28em] text-foreground/45 font-bold mb-3">
            01 — Overview
          </div>
          <h2 className="font-black tracking-[-0.045em] leading-[0.92] text-[clamp(36px,4.5vw,56px)]">
            Promotion Analysis.
          </h2>
          <p className="mt-2 text-[14px] text-foreground/55">
            Automatic private-sector investing —{" "}
            <span className="font-serif-italic text-foreground text-[17px]">last 30 days</span>.
          </p>
        </div>

        {/* KPI receipts — flat, monochrome, single accent badge for +delta */}
        <div className="grid grid-cols-3 gap-2.5 lg:min-w-[520px]">
          <KpiTile icon={Wallet}      label="Total Profit"    value="2,931,232" delta="+1.03" />
          <KpiTile icon={Users}       label="Total Customers" value="8,381,13"  delta="+1.03" />
          <KpiTile icon={ShoppingBag} label="Total Orders"    value="7,951,533" delta="+1.03" />
        </div>
      </header>

      {/* ── Statistics + Top categories ──────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5">
        <StatisticsCard />
        <TopCategoriesCard />
      </div>

      {/* ── Transactions table ──────────────────────────────────────── */}
      <TransactionsCard />
    </div>
  );
}

/** KPI tile — used in DashboardRoute's hero row */
function KpiTile({ icon: Icon, label, value, delta }:
  { icon: typeof Wallet; label: string; value: string; delta: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card px-4 py-3.5">
      <div className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.18em] text-foreground/55 font-bold">
        <Icon className="h-3 w-3" strokeWidth={1.8} />
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-[22px] font-black tabular-nums tracking-[-0.02em] leading-none">{value}</span>
        <span className="text-[10px] font-bold tabular-nums bg-[var(--sun)]/35 text-foreground rounded px-1.5 py-0.5">
          {delta}
        </span>
      </div>
    </div>
  );
}

/** Statistics — bar chart with one tall amber bar callout (mirrors image-4) */
function StatisticsCard() {
  // Hardcoded sample data; replace with your analytics aggregate.
  const months = [
    { m: "Jan", v: 18 }, { m: "Feb", v: 30 }, { m: "Mar", v: 22 },
    { m: "Apr", v: 42 }, { m: "May", v: 78, callout: true },
    { m: "Jun", v: 35 }, { m: "Jul", v: 56 }, { m: "Aug", v: 28 },
    { m: "Sep", v: 47 },
  ];
  const max = 80;

  return (
    <section className="rounded-2xl border border-border/60 bg-card p-5">
      {/* sub-header */}
      <header className="flex items-start justify-between mb-5">
        <div className="grid grid-cols-[auto_1fr] items-start gap-5">
          {/* Store order analysis side-cards (image-4 micro-detail) */}
          <div className="hidden md:flex flex-col gap-2.5 pr-5 border-r border-border/60">
            <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/55 font-bold">
              Store Order Analysis
            </div>
            <div className="text-[11px] text-foreground/45 max-w-[150px]">
              Your income & expense, last 30 days.
            </div>
            <MiniStoreTile label="Online store"  value="$24,199" delta="+1.03" />
            <MiniStoreTile label="Offline store" value="$24,199" delta="+3.13" />
          </div>

          <div className="min-w-0">
            <h3 className="font-black tracking-[-0.03em] text-[24px] leading-none">Statistics</h3>
            <div className="mt-2 flex items-center gap-3 text-[11.5px] text-foreground/55">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--sun)]" /> Sales</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-foreground/20" /> Insight</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <ChipSelect label="This year" />
          <ChipSelect label="Summary" />
        </div>
      </header>

      {/* chart */}
      <div className="relative h-[260px]">
        {/* y-axis labels */}
        <div className="absolute inset-y-0 left-0 w-10 flex flex-col justify-between text-[10px] text-foreground/40 tabular-nums">
          <span>$20K</span><span>$10K</span><span>$0</span><span>$10K</span><span>$20K</span>
        </div>
        {/* bars */}
        <div className="absolute inset-y-0 left-10 right-0 flex items-end gap-3">
          {months.map((mo) => (
            <div key={mo.m} className="relative flex-1 flex flex-col items-center justify-end h-full">
              {mo.callout && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded-md bg-foreground text-background px-2 py-1 text-[10px] font-bold leading-tight text-center">
                  73,901<span className="block text-[8.5px] font-medium text-background/70">Sales</span>
                </div>
              )}
              <div
                className={`w-full rounded-t-md ${mo.callout ? "bg-[var(--sun)]" : "bg-[var(--sun)]/60"}`}
                style={{ height: `${(mo.v / max) * 100}%` }}
              />
              <div className="mt-1.5 text-[10px] text-foreground/50">{mo.m}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniStoreTile({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-lg bg-[var(--sun)]/15 border border-[var(--sun)]/30 px-3 py-2 w-[150px]">
      <div className="text-[10px] text-foreground/55 font-semibold">{label}</div>
      <div className="text-[15px] font-black tabular-nums tracking-tight mt-0.5">{value}</div>
      <div className="text-[9.5px] text-foreground/55 mt-0.5">
        <span className="font-bold text-foreground">{delta}</span> · higher than last month
      </div>
    </div>
  );
}

function ChipSelect({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-1 h-7 px-3 rounded-full border border-border/60 bg-card text-[11.5px] font-semibold text-foreground/70 hover:text-foreground transition">
      {label} <ChevronDown className="h-3 w-3" />
    </button>
  );
}

/** Top sale category — half donut + segmented legend (image-4 right card) */
function TopCategoriesCard() {
  // Each segment is rendered as a stroke-dasharray slice of a single SVG path.
  // Total circumference for r=64 is ~402; we use 50%/segment shares of half (~201).
  const segments = [
    { label: "Roofing",  pct: 80, color: "var(--sun)" },
    { label: "Flooring", pct: 57, color: "oklch(0.65 0.12 145)" }, // sage
    { label: "Windows",  pct: 16, color: "oklch(0.70 0.16 25)"  }, // terracotta
    { label: "Doors",    pct: 46, color: "oklch(0.65 0.15 280)" }, // muted lilac
  ];

  return (
    <section className="rounded-2xl border border-border/60 bg-card p-5 flex flex-col">
      <header className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-black tracking-[-0.03em] text-[18px] leading-none">Top Sale Category</h3>
          <div className="text-[11px] text-foreground/45 mt-1">Last 30 days</div>
        </div>
        <div className="text-right">
          <div className="text-[20px] font-black tabular-nums tracking-tight">$31,119</div>
          <div className="text-[10px] text-foreground/45">From $32,499</div>
        </div>
      </header>

      {/* simple stacked half-donut */}
      <div className="relative h-[150px] my-2">
        <svg viewBox="0 0 200 110" className="w-full h-full">
          {/* track */}
          <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="oklch(0.92 0.01 80)" strokeWidth="22" strokeLinecap="round" />
          {/* segments — fake the percentages with offset+length over the half-arc */}
          {(() => {
            const total = segments.reduce((s, x) => s + x.pct, 0);
            const arcLen = 251; // approx length of half circle r=80
            let acc = 0;
            return segments.map((s) => {
              const len = (s.pct / total) * arcLen;
              const dash = `${len} ${arcLen}`;
              const offset = -acc;
              acc += len;
              return (
                <path
                  key={s.label}
                  d="M20 100 A80 80 0 0 1 180 100"
                  fill="none"
                  stroke={s.color}
                  strokeWidth="22"
                  strokeLinecap="butt"
                  strokeDasharray={dash}
                  strokeDashoffset={offset}
                />
              );
            });
          })()}
          {/* big label */}
          <text x="100" y="78" textAnchor="middle" className="font-black" fontSize="24" fill="currentColor">80%</text>
          <text x="100" y="98" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.5">Roofing leads</text>
        </svg>
      </div>

      <ul className="grid grid-cols-2 gap-2 mt-auto">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center justify-between text-[12px] rounded-md bg-foreground/[0.025] px-2.5 py-2">
            <span className="inline-flex items-center gap-2 font-semibold">
              <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
              {s.label}
            </span>
            <span className="tabular-nums font-bold">{s.pct}%</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Transactions table — clean rows, status pills, filter chips above */
function TransactionsCard() {
  const rows = [
    { product: "Roofing",  txn: "TXN12345", cust: "CUST001", name: "John Doe",     price: 25000, date: "2024-09-01", ok: true  },
    { product: "Flooring", txn: "TXN12346", cust: "CUST002", name: "Jone Smith",   price: 15000, date: "2024-09-03", ok: false },
    { product: "Windows",  txn: "TXN12347", cust: "CUST003", name: "Bob Johnson",  price: 23000, date: "2024-09-06", ok: true  },
    { product: "Doors",    txn: "TXN12348", cust: "CUST004", name: "Micael Lee",   price: 17000, date: "2024-09-09", ok: false },
    { product: "Plumbing", txn: "TXN12349", cust: "CUST005", name: "Sarah Davis",  price: 12000, date: "2024-09-12", ok: true  },
  ];

  return (
    <section className="rounded-2xl border border-border/60 bg-card">
      {/* filter row */}
      <div className="p-4 border-b border-border/60 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/40" />
          <input
            placeholder="Search everything…"
            className="w-full h-9 rounded-full bg-foreground/[0.04] pl-9 pr-3 text-[12.5px] outline-none placeholder:text-foreground/45"
          />
        </div>
        <ChipSelect label="Category" />
        <ChipSelect label="Supplier" />
        <ChipSelect label="Storage" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[12.5px]">
          <thead className="bg-foreground/[0.02] text-foreground/55 text-[10.5px] uppercase tracking-[0.16em] font-bold">
            <tr>
              {["#", "Product", "ID Transaction", "Cust. ID", "Cust. Name", "Price", "Order Date", "Status"].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-bold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {rows.map((r, i) => (
              <tr key={r.txn} className="hover:bg-foreground/[0.015] transition">
                <td className="px-4 py-3 text-foreground/45 tabular-nums">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold">{r.product}</div>
                  <div className="text-[10.5px] text-foreground/45">Pro-Grade Collection</div>
                </td>
                <td className="px-4 py-3 font-mono text-foreground/65">{r.txn}</td>
                <td className="px-4 py-3 font-mono text-foreground/65">{r.cust}</td>
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3 tabular-nums font-semibold">{r.price.toLocaleString()}</td>
                <td className="px-4 py-3 text-foreground/55 tabular-nums">{r.date}</td>
                <td className="px-4 py-3">
                  {r.ok ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--herb)]/20 text-[oklch(0.45_0.08_145)] px-2.5 py-0.5 text-[10.5px] font-bold">
                      <CheckCircle2 className="h-3 w-3" /> Success
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[oklch(0.85_0.08_25/0.5)] text-[oklch(0.4_0.13_25)] px-2.5 py-0.5 text-[10.5px] font-bold">
                      <Clock className="h-3 w-3" /> Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * ROUTE: /deployments — list of recent deploys with branch + SHA + age
 * ═══════════════════════════════════════════════════════════════════════════ */

function DeploymentsRoute() {
  const deploys = [
    { name: "esatuk",           sha: "16fa59e", branch: "main", time: "2h ago",  status: "live" as const },
    { name: "ndutasbirthday",   sha: "f1630d7", branch: "main", time: "6h ago",  status: "live" as const },
    { name: "ndutasbirthday",   sha: "4e8c290", branch: "main", time: "7h ago",  status: "live" as const },
    { name: "neon-racer-90",    sha: "e94ce2d", branch: "main", time: "20d ago", status: "live" as const },
    { name: "chic-luxe-bloom",  sha: "0f7b394", branch: "main", time: "24d ago", status: "live" as const },
    { name: "res",              sha: "f645739", branch: "feat/payments", time: "1d ago", status: "failed" as const },
  ];
  return (
    <div className="space-y-6">
      <RouteHeader eyebrow="02 — Build" title="Deployments." sub="Eight live · zero deploying · one failed in last 24h" />
      <section className="rounded-2xl border border-border/60 bg-card">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/60">
          <h3 className="text-[14px] font-black tracking-tight">Recent</h3>
          <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-foreground text-background text-[12px] font-semibold">
            <Plus className="h-3.5 w-3.5" strokeWidth={2.4} /> New deployment
          </button>
        </div>
        <ul className="divide-y divide-border/50">
          {deploys.map((d, i) => (
            <li key={i} className="group flex items-center justify-between px-5 py-3.5 hover:bg-foreground/[0.015] transition">
              <div className="flex items-center gap-3 min-w-0">
                <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${d.status === "live" ? "bg-[var(--herb)]" : "bg-[oklch(0.6_0.15_25)]"}`} />
                <span className="text-[13.5px] font-semibold truncate">{d.name}</span>
                <span className="text-[11px] font-mono text-foreground/45">{d.sha}</span>
                {d.status === "failed" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[oklch(0.88_0.08_25/0.6)] text-[oklch(0.4_0.13_25)] px-2 py-0.5 text-[10px] font-bold">
                    <AlertTriangle className="h-2.5 w-2.5" /> Build failed
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-[11.5px] text-foreground/55 shrink-0">
                <span className="inline-flex items-center gap-1"><GitBranch className="h-3 w-3" strokeWidth={1.8} /> {d.branch}</span>
                <span className="tabular-nums">{d.time}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-foreground/30 group-hover:text-foreground/70 transition" />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * ROUTE: /pipelines — CI workflow grid (status tiles)
 * ═══════════════════════════════════════════════════════════════════════════ */

function PipelinesRoute() {
  const pipes = [
    { name: "build & test",       run: "#412", duration: "1m 12s", status: "passed" as const },
    { name: "type-check",         run: "#411", duration: "32s",    status: "passed" as const },
    { name: "lighthouse",         run: "#410", duration: "2m 04s", status: "passed" as const },
    { name: "e2e smoke",          run: "#409", duration: "4m 51s", status: "running" as const },
    { name: "preview deploy",     run: "#408", duration: "—",      status: "queued" as const },
    { name: "production deploy",  run: "#407", duration: "—",      status: "queued" as const },
  ];
  const dot: Record<typeof pipes[0]["status"], string> = {
    passed: "var(--herb)", running: "var(--sun)", queued: "oklch(0.7 0.01 80)",
  };
  return (
    <div className="space-y-6">
      <RouteHeader eyebrow="02 — Build" title="Pipelines." sub="Latest workflow runs across savannah-cloud" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {pipes.map((p) => (
          <div key={p.run} className="rounded-2xl border border-border/60 bg-card p-5 hover:border-foreground/20 transition">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/45 font-bold">{p.run}</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot[p.status] }} /> {p.status}
              </span>
            </div>
            <div className="text-[18px] font-black tracking-tight">{p.name}</div>
            <div className="mt-1 text-[11.5px] text-foreground/55">duration · <span className="tabular-nums">{p.duration}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * ROUTE: /domains — DNS zones + SSL state
 * ═══════════════════════════════════════════════════════════════════════════ */

function DomainsRoute() {
  const zones = [
    { domain: "savannah.cloud",        records: 12, ssl: "active",  proxied: true  },
    { domain: "esatuk.co.ke",          records: 6,  ssl: "active",  proxied: true  },
    { domain: "ndutasbirthday.com",    records: 4,  ssl: "active",  proxied: false },
    { domain: "neon-racer-90.dev",     records: 3,  ssl: "pending", proxied: false },
  ];
  return (
    <div className="space-y-6">
      <RouteHeader eyebrow="03 — Run" title="Domains." sub="Bring your own — point an A record, we'll do the rest" />
      <section className="rounded-2xl border border-border/60 bg-card">
        <ul className="divide-y divide-border/50">
          {zones.map((z) => (
            <li key={z.domain} className="flex items-center justify-between px-5 py-4 hover:bg-foreground/[0.015] transition">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-lg bg-foreground/[0.04] grid place-items-center">
                  <Globe className="h-4 w-4 text-foreground/70" strokeWidth={1.7} />
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-black tracking-tight">{z.domain}</div>
                  <div className="text-[11px] text-foreground/55 mt-0.5">{z.records} DNS records · {z.proxied ? "proxied" : "DNS-only"}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-bold ${z.ssl === "active" ? "bg-[var(--herb)]/20 text-[oklch(0.45_0.08_145)]" : "bg-[var(--sun)]/25 text-foreground"}`}>
                  <Shield className="h-3 w-3" /> SSL {z.ssl}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-foreground/30" />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * ROUTE: /email — 3-pane inbox (rail + folders + list + reader)
 * Dappr-inspired, all monochrome with a single sun-coloured selection state.
 * ═══════════════════════════════════════════════════════════════════════════ */

const EMAIL_FOLDERS = [
  { icon: Inbox,    label: "Inbox",     count: 4, active: true },
  { icon: Star,     label: "Important" },
  { icon: Send,     label: "Sent" },
  { icon: FileText, label: "Drafts" },
  { icon: Trash2,   label: "Deleted" },
] as const;

const EMAIL_LIST = [
  { name: "Hannah Morgan",     time: "1:24 PM",  subject: "Meeting scheduled",          preview: "Hi James, I just scheduled a meeting with the team to go over the design…", unread: true },
  { name: "Megan Clark",       time: "12:32 PM", subject: "Update on marketing campaign", preview: "Hey Richard, here's an update on the marketing campaign my team is…",  unread: true },
  { name: "Brandon Williams",  time: "Yesterday", subject: "Designly 2.0 is about to launch", preview: "James! I'd like to invite you to the launch of Designly…", selected: true },
  { name: "Reid Smith",        time: "Yesterday", subject: "My friend Julie loves Savannah!", preview: "Good morning guys, my friend Julie recently started her business…" },
  { name: "Russ Miller",       time: "2 / 5 / 25", subject: "We need some more sweeeeeg", preview: "Hey James, we're running out of company swag…" },
];

function EmailRoute() {
  return (
    <div className="space-y-6">
      <RouteHeader eyebrow="03 — Run" title="Email." sub="Transactional, marketing, and replies — one inbox" />
      <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
        <div className="grid grid-cols-[64px_220px_280px_1fr] min-h-[520px]">
          {/* Icon rail */}
          <div className="bg-foreground text-background flex flex-col items-center py-4 gap-3">
            <div className="h-8 w-8 rounded-full bg-background/10 grid place-items-center text-background font-black text-[12px]">sc</div>
            <div className="h-px w-6 bg-background/15 my-2" />
            {[Inbox, Mail, Folder, Send, FileText, Users, Settings].map((Ic, i) => (
              <button key={i} className={`h-9 w-9 grid place-items-center rounded-lg transition ${i === 0 ? "bg-background/15" : "text-background/55 hover:text-background hover:bg-background/10"}`}>
                <Ic className="h-4 w-4" strokeWidth={1.7} />
              </button>
            ))}
          </div>

          {/* Folders */}
          <div className="border-r border-border/60 p-5">
            <h3 className="font-black tracking-[-0.03em] text-[22px] mb-4">Email</h3>
            <ul className="space-y-0.5">
              {EMAIL_FOLDERS.map((f) => (
                <li key={f.label}>
                  <a href="#" className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] transition ${"active" in f && f.active ? "bg-foreground/[0.05] text-foreground font-semibold" : "text-foreground/65 hover:bg-foreground/[0.03] hover:text-foreground"}`}>
                    <f.icon className="h-[15px] w-[15px]" strokeWidth={1.7} />
                    <span className="flex-1">{f.label}</span>
                    {"count" in f && f.count ? (
                      <span className="text-[10px] tabular-nums bg-foreground text-background rounded px-1.5 py-0.5 font-bold">{f.count}</span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Inbox list */}
          <div className="border-r border-border/60 flex flex-col">
            <div className="p-4 border-b border-border/60">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-[16px] tracking-tight">Inbox</h3>
                <button className="h-7 w-7 grid place-items-center rounded-full bg-foreground text-background"><Plus className="h-3.5 w-3.5" strokeWidth={2.4} /></button>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/40" />
                <input placeholder="Search" className="w-full h-8 rounded-md bg-foreground/[0.04] pl-8 pr-2 text-[12px] outline-none placeholder:text-foreground/40" />
              </div>
            </div>
            <ul className="flex-1 overflow-auto divide-y divide-border/50">
              {EMAIL_LIST.map((e, i) => (
                <li key={i} className={`px-4 py-3 cursor-pointer transition ${e.selected ? "bg-[var(--sun)]/15 border-l-2 border-l-[var(--sun)]" : "hover:bg-foreground/[0.02]"}`}>
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="inline-flex items-center gap-1.5 min-w-0">
                      {e.unread && <span className="h-1.5 w-1.5 rounded-full bg-[var(--herb)] shrink-0" />}
                      <span className="text-[12.5px] font-bold truncate">{e.name}</span>
                    </span>
                    <span className="text-[10.5px] text-foreground/45 shrink-0 tabular-nums">{e.time}</span>
                  </div>
                  <div className="text-[12px] text-foreground/75 font-semibold truncate">{e.subject}</div>
                  <div className="text-[11.5px] text-foreground/45 truncate mt-0.5">{e.preview}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Reader */}
          <div className="p-6 flex flex-col">
            <div className="flex items-center justify-end gap-1 mb-4 text-foreground/55">
              {[Reply, Forward, Star, Trash2].map((Ic, i) => (
                <button key={i} className="h-8 w-8 grid place-items-center rounded-md hover:bg-foreground/[0.04] hover:text-foreground transition">
                  <Ic className="h-3.5 w-3.5" strokeWidth={1.7} />
                </button>
              ))}
            </div>
            <header className="flex items-start gap-3 pb-4 border-b border-border/60">
              <div className="h-10 w-10 rounded-full bg-[var(--sun)] grid place-items-center font-black text-[14px] text-foreground shrink-0">BW</div>
              <div className="min-w-0 flex-1">
                <h4 className="font-black tracking-[-0.02em] text-[17px] truncate">Designly 2.0 is about to launch</h4>
                <div className="text-[11.5px] text-foreground/50 mt-0.5">
                  <span className="font-semibold text-foreground/70">Brandon Williams</span> to{" "}
                  <span className="text-foreground/70">james@savannah.cloud</span>, <span className="text-foreground/70">+3</span>
                </div>
              </div>
              <span className="text-[11px] text-foreground/45 shrink-0">Yesterday · 4:18 PM</span>
            </header>
            <div className="pt-5 text-[13.5px] leading-[1.65] text-foreground/80 space-y-3 max-w-prose">
              <p>Hey James,</p>
              <p>I'd like to invite you to the launch of <span className="font-bold text-foreground">Designly 2.0</span> next Thursday at our Nairobi studio. Drinks, a short demo, and a first look at the new flows we've been building on Savannah.</p>
              <p>We've been quietly migrating off three different platforms onto your stack for six weeks and the team can't shut up about how fast deploys feel.</p>
              <p className="text-foreground/60">— Brandon</p>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 text-[11.5px] text-foreground/55">
              <Paperclip className="h-3.5 w-3.5" /> 2 attachments · invite.pdf, venue.jpg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * ROUTE: /billing — plan, usage bars, invoice list
 * ═══════════════════════════════════════════════════════════════════════════ */

function BillingRoute() {
  const usage = [
    { label: "Emails",      value: 0,  max: 1000, suffix: "0 / 1,000" },
    { label: "Deployments", value: 10, max: 20,   suffix: "10 / 20" },
    { label: "DNS zones",   value: 1,  max: 3,    suffix: "1 / 3" },
    { label: "Bandwidth",   value: 41, max: 100,  suffix: "41 / 100 GB" },
  ];
  const invoices = [
    { id: "INV-0042", date: "Sep 01, 2026", amount: "KES 0",    status: "Free" },
    { id: "INV-0041", date: "Aug 01, 2026", amount: "KES 0",    status: "Free" },
    { id: "INV-0040", date: "Jul 01, 2026", amount: "KES 0",    status: "Free" },
  ];
  return (
    <div className="space-y-6">
      <RouteHeader eyebrow="04 — Account" title="Billing." sub="On the Free plan — upgrade when you need more rope" />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5">
        <section className="rounded-2xl border border-border/60 bg-card">
          <div className="px-5 py-3.5 border-b border-border/60 flex items-center justify-between">
            <h3 className="text-[14px] font-black tracking-tight">Invoices</h3>
            <a href="#" className="text-[12px] font-semibold text-foreground/65 hover:text-foreground inline-flex items-center gap-1">Download all <ArrowUpRight className="h-3 w-3" /></a>
          </div>
          <ul className="divide-y divide-border/50">
            {invoices.map((inv) => (
              <li key={inv.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <Package className="h-4 w-4 text-foreground/55" />
                  <div>
                    <div className="text-[13px] font-semibold">{inv.id}</div>
                    <div className="text-[11px] text-foreground/50">{inv.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-bold tabular-nums">{inv.amount}</span>
                  <span className="rounded-full bg-[var(--herb)]/20 text-[oklch(0.45_0.08_145)] px-2.5 py-0.5 text-[10.5px] font-bold">{inv.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-black tracking-tight">Plan & usage</h3>
            <a href="#" className="text-[12px] font-bold inline-flex items-center gap-0.5">Upgrade <ArrowUpRight className="h-3 w-3" /></a>
          </div>
          <div className="space-y-3.5">
            {usage.map((u) => (
              <div key={u.label}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-[12px] text-foreground/65 font-semibold">{u.label}</span>
                  <span className="text-[11px] text-foreground/50 tabular-nums">{u.suffix}</span>
                </div>
                <div className="h-1 rounded-full bg-foreground/[0.08] overflow-hidden">
                  <div className="h-full bg-foreground rounded-full" style={{ width: `${Math.max(2, (u.value / u.max) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--sun)]" />
              <span className="text-[12.5px] font-bold">Free plan</span>
            </div>
            <span className="text-[11px] text-foreground/45 uppercase tracking-[0.15em]">Active</span>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ───────────────────────── Shared route header ───────────────────────── */
function RouteHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <header className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-[0.28em] text-foreground/45 font-bold mb-3">{eyebrow}</div>
        <h2 className="font-black tracking-[-0.045em] leading-[0.92] text-[clamp(36px,4.5vw,56px)]">{title}</h2>
        <p className="mt-2 text-[14px] text-foreground/55">{sub}</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button className="h-8 w-8 grid place-items-center rounded-md border border-border/60 text-foreground/60 hover:text-foreground" aria-label="Refresh">
          <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.8} />
        </button>
        <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-foreground text-background text-[12.5px] font-semibold hover:opacity-90">
          <Plus className="h-3.5 w-3.5" strokeWidth={2.4} /> New
        </button>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 3 · FOOTER SPLASH
 *
 * One big poetic image, white serif italic over it, and a route map below so
 * Claude can see at a glance every route this console ships.
 * ═══════════════════════════════════════════════════════════════════════════ */

function FooterSplash() {
  return (
    <section className="relative mt-20 overflow-hidden">
      <div
        className="relative h-[460px] bg-cover bg-center"
        style={{ backgroundImage: `url(${footerSplashImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[oklch(0.2_0.02_60/0.45)]" />
        <div className="relative max-w-[1400px] mx-auto px-8 h-full flex flex-col justify-end pb-14">
          <div className="text-[10px] uppercase tracking-[0.32em] text-white/70 font-bold mb-4">
            Built in Nairobi · for the rest of us
          </div>
          <h2 className="font-black tracking-[-0.05em] leading-[0.88] text-white text-[clamp(56px,9vw,140px)] max-w-[14ch]">
            The first{" "}
            <span className="italic font-serif-italic font-normal">Cloudflare</span>
            <br /> of Kenya.
          </h2>
        </div>
      </div>

      {/* route map */}
      <div className="bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-[12.5px]">
          {[
            { h: "Build",   items: ["Dashboard", "Deployments", "Pipelines", "Console"] },
            { h: "Run",     items: ["Domains", "Email", "Monitoring", "Workflows"] },
            { h: "Account", items: ["Team", "Billing", "API Keys", "Settings"] },
            { h: "More",    items: ["Docs", "Status", "Changelog", "Support"] },
          ].map((col) => (
            <div key={col.h}>
              <div className="text-[10px] uppercase tracking-[0.22em] text-background/45 font-bold mb-3">{col.h}</div>
              <ul className="space-y-1.5">
                {col.items.map((i) => (
                  <li key={i}><a href="#" className="text-background/75 hover:text-background transition">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 4 · SOURCE REFERENCE (paste-into-Claude)
 *
 * A black card containing every design rule + a route inventory. Copyable.
 * Keep this short enough to fit in a single Claude context window.
 * ═══════════════════════════════════════════════════════════════════════════ */

const SOURCE_NOTE = `# Savannah Cloud console — design contract (paste into Claude)

## Tokens
bg            var(--cream)   oklch(0.975 0.012 85)
ink           foreground     oklch(0.20 0.012 80)
accent        var(--sun)     oklch(0.82 0.15 75)
positive      var(--herb)    oklch(0.55 0.08 145)
border        oklch(0.89 0.008 80)
font sans     "Inter Tight"          (700–900 for display)
font italic   "Instrument Serif"     (names + accents only)

## Rules
- Monochrome surfaces. ONE accent (--sun) and ONE positive (--herb) per screen.
- Cards: rounded-2xl, border border-border/60, flat (no shadow except hero).
- Headings: font-black, tracking-[-0.045em], leading-[0.92].
- Numbers: tabular-nums always.
- Labels: 10–11px UPPERCASE, tracking-[0.22em], font-bold, foreground/45.
- Active nav: bg-foreground/[0.05] + 2px left rail in --sun + font-semibold.
- Never use raw orange/green/red/blue/purple outside the token system.

## Routes (each must ship as its own page)
/dashboard     → KPI receipts, bar chart "Statistics", half-donut "Top Categories", transactions table
/deployments   → list of recent deploys (name, sha, branch, age, status pill)
/pipelines     → grid of CI workflow runs (status, duration, run number)
/domains       → list of DNS zones (records, SSL state, proxied flag)
/email         → 3-pane inbox (rail · folders · list · reader), dappr-style
/billing       → invoices list + plan/usage card with bars

## Components in this file (copy/paste, only deps are lucide-react + tailwind)
HeroBanner · HeroStat · ConsoleShell · Sidebar · TopBar ·
DashboardRoute · KpiTile · StatisticsCard · MiniStoreTile ·
ChipSelect · TopCategoriesCard · TransactionsCard ·
DeploymentsRoute · PipelinesRoute · DomainsRoute · EmailRoute · BillingRoute ·
RouteHeader · FooterSplash

## How to port
1. Copy the tokens block above into your global stylesheet.
2. Lift each Route* component into its own /routes/<name>.tsx file.
3. Swap the inline data arrays for your real data hooks. Don't restyle.
`;

function SourceReference() {
  const [copied, setCopied] = useState(false);
  const [open, setOpen]     = useState(true);
  const copy = async () => {
    await navigator.clipboard.writeText(SOURCE_NOTE);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <section className="mt-12 rounded-2xl border border-border/60 bg-foreground text-background overflow-hidden">
      <header className="flex items-center justify-between px-5 py-3.5 border-b border-background/10">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[10px] uppercase tracking-[0.22em] text-background/50 font-bold">paste-into-claude.md</span>
          <span className="text-[11px] text-background/40 hidden sm:inline">design contract + route inventory</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={copy} className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[11px] font-bold text-background/80 hover:bg-background/10 transition">
            {copied ? <Check className="h-3.5 w-3.5 text-[var(--sun)]" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button onClick={() => setOpen((o) => !o)} className="h-7 w-7 grid place-items-center rounded-md text-background/60 hover:bg-background/10 transition" aria-label="Toggle">
            <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "" : "-rotate-90"}`} />
          </button>
        </div>
      </header>
      {open && (
        <pre className="px-5 py-5 text-[12px] leading-[1.7] font-mono text-background/85 overflow-auto whitespace-pre">
{SOURCE_NOTE}
        </pre>
      )}
      <footer className="border-t border-background/10 px-5 py-3 text-[11px] text-background/45 inline-flex items-center gap-1.5">
        <TrendingUp className="h-3 w-3" /> Full source: <span className="font-mono text-background/70">src/routes/console-preview.tsx</span>
      </footer>
    </section>
  );
}
