export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      aria-label="OtexAds"
      className={`inline-grid place-items-center rounded-lg bg-foreground text-background font-black tracking-tight ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <span className="text-[0.7em] leading-none">Ox</span>
    </span>
  );
}

export function LogoFull({ className = "h-10" }: { className?: string }) {
  return (
    <span
      aria-label="OtexAds"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <span
        className="inline-grid place-items-center h-[1.6em] w-[1.6em] rounded-lg bg-foreground text-background font-black"
        aria-hidden
      >
        <span className="text-[0.75em] leading-none tracking-tight">Ox</span>
      </span>
      <span className="text-[1.15em] font-black tracking-[-0.04em] leading-none text-foreground">
        Otex<span className="font-serif-italic font-normal">Ads</span>
      </span>
    </span>
  );
}
