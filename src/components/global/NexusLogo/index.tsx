import Image from "next/image";
import { cn } from "@/lib/utils";

interface NexusLogoProps {
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/** Full logo: "N" symbol, orbit ring, NEXUS Labs wordmark and tagline (transparent, 900×900). */
export function NexusLogo({ className, priority = false, sizes = "(max-width: 768px) 80vw, 40vw" }: NexusLogoProps) {
  return (
    <Image
      src="/images/nexus-logo.webp"
      alt="Nexus Labs · Más allá de las ideas"
      width={900}
      height={900}
      priority={priority}
      sizes={sizes}
      className={cn("h-auto w-full select-none", className)}
      draggable={false}
    />
  );
}

/** The "N" symbol with its small orbit (transparent, 492×258). */
export function NexusMark({ className, priority = false }: Omit<NexusLogoProps, "sizes">) {
  return (
    <Image
      src="/images/nexus-mark.png"
      alt=""
      aria-hidden="true"
      width={492}
      height={258}
      priority={priority}
      sizes="120px"
      className={cn("h-auto select-none", className)}
      draggable={false}
    />
  );
}

/** Horizontal lockup for headers: mark + NEXUS LABS wordmark set in the display face. */
export function NexusLockup({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("flex items-center gap-2 md:gap-3", className)}>
      <NexusMark priority className={cn("w-10 md:w-12 drop-shadow-[0_0_12px_rgba(110,57,253,0.45)]", markClassName)} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-sm md:text-lg font-bold tracking-[0.08em] text-white">
          NE<span className="brand-gradient-text">X</span>US
        </span>
        <span className="mt-0.5 md:mt-1 text-[0.55rem] md:text-[0.62rem] font-light uppercase tracking-[0.55em] text-muted-foreground">
          Labs
        </span>
      </span>
    </span>
  );
}

export default NexusLogo;
