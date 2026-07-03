import logoMark from "@/assets/logo-mark.png";
import logoFull from "@/assets/logo-full.png";

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return <img src={logoMark} alt="Savannah Cloud" className={className} loading="eager" decoding="async" />;
}

export function LogoFull({ className = "h-10" }: { className?: string }) {
  return <img src={logoFull} alt="Savannah Cloud — A Siohioma Group Company" className={className} loading="eager" decoding="async" />;
}
