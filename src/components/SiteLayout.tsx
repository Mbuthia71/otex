import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, Star } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { LogoFull, LogoMark } from "./Logo";

const nav = [
  { to: "/platform", label: "Platform" },
  { to: "/pipelines", label: "Pipelines" },
  { to: "/pricing", label: "Pricing" },
  { to: "/why", label: "Why us" },
] as const;

// Slowly-growing repo count: starts at 300 on 2026-06-08, adds 7–10 per day (deterministic).
function useRepoCount() {
  const [count, setCount] = useState(300);
  useEffect(() => {
    const base = Date.UTC(2026, 5, 8); // Jun 8 2026
    const compute = () => {
      const days = Math.max(0, Math.floor((Date.now() - base) / 86400000));
      let total = 300;
      for (let i = 0; i < days; i++) {
        // Deterministic per-day pseudo-random in [7,10]
        const s = Math.sin(i * 9301 + 49297) * 233280;
        total += 7 + Math.floor((s - Math.floor(s)) * 4);
      }
      setCount(total);
    };
    compute();
    const id = setInterval(compute, 60 * 60 * 1000); // refresh hourly
    return () => clearInterval(id);
  }, []);
  return count;
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const repoCount = useRepoCount();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 bg-[var(--cream)] ${
        scrolled ? "backdrop-blur-xl bg-[var(--cream)]/90 border-b border-border/60" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-20 md:h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" aria-label="Savannah Cloud — Home">
          <LogoFull className="h-14 md:h-16 w-auto -my-2" />
        </Link>
        <nav className="hidden md:flex items-center gap-9 text-[13px] text-foreground/65">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <a
            href="https://github.com/savannahcloud"
            target="_blank"
            rel="noreferrer"
            title={`We have ${repoCount}+ repos on GitHub`}
            aria-label={`Savannah Cloud on GitHub — ${repoCount}+ public repositories`}
            className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1.5 rounded-full border border-border/70 text-foreground/75 hover:text-foreground hover:border-foreground/30 transition"
          >
            <Github className="h-3.5 w-3.5" />
            <span className="tabular-nums">{repoCount.toLocaleString()}</span>
            <Star className="h-3 w-3 fill-current opacity-70" />
          </a>
          <a
            href="https://console.savannahcloud.com"
            className="hidden sm:inline-flex text-[13px] px-3 py-1.5 text-foreground/70 hover:text-foreground transition"
          >
            Sign in
          </a>
          <a
            href="https://console.savannahcloud.com"
            className="inline-flex items-center gap-1 text-[13px] font-medium px-3.5 py-1.5 rounded-full bg-foreground text-background hover:opacity-90 transition"
          >
            Console <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-32">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 text-sm">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <LogoMark className="h-6 w-6" />
              <span className="font-medium tracking-tight">Savannah Cloud</span>
            </Link>
            <p className="mt-4 text-foreground/55 max-w-xs leading-relaxed">
              Everything your stack needs, in one place. A Siohioma Group company.
            </p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 mb-4">Product</div>
            <ul className="space-y-2.5">
              <li><Link to="/platform" className="text-foreground/70 hover:text-foreground transition">Platform</Link></li>
              <li><Link to="/pipelines" className="text-foreground/70 hover:text-foreground transition">Pipelines</Link></li>
              <li><Link to="/pricing" className="text-foreground/70 hover:text-foreground transition">Pricing</Link></li>
              <li><Link to="/why" className="text-foreground/70 hover:text-foreground transition">Why us</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 mb-4">Company</div>
            <ul className="space-y-2.5">
              <li><a href="https://console.savannahcloud.com" className="text-foreground/70 hover:text-foreground transition">Console</a></li>
              <li><a href="https://console.savannahcloud.com/support" className="text-foreground/70 hover:text-foreground transition">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-foreground/45">
          <span>© {new Date().getFullYear()} Savannah Cloud. All rights reserved.</span>
          <span>Built in Africa. Shipped to the world.</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 pt-20 md:pt-24">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-28 pb-16 text-center">
      {eyebrow && (
        <div className="text-[11px] uppercase tracking-[0.28em] text-foreground/45 mb-6">{eyebrow}</div>
      )}
      <h1 className="text-balance text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium tracking-[-0.03em] leading-[1.05]">
        {title}
      </h1>
      {lede && (
        <p className="mt-6 text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">{lede}</p>
      )}
    </section>
  );
}
