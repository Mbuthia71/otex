import logoAsset from "@/assets/otexads-logo.png.asset.json";

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="OtexAds"
      className={`object-contain ${className}`}
      loading="eager"
      decoding="async"
    />
  );
}

export function LogoFull({ className = "h-8" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="OtexAds — Self-serve ad network"
      className={`object-contain ${className}`}
      loading="eager"
      decoding="async"
    />
  );
}
