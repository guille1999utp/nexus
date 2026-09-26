import { cn } from "@/lib/utils";

interface GalaxyBackgroundProps {
  /** Positioning overrides. Defaults to filling the nearest positioned ancestor. */
  className?: string;
  /** The galactic plane sweeping across the frame. */
  band?: boolean;
  /** Streaks that cross the frame every few seconds. */
  shootingStars?: boolean;
}

/**
 * Layered deep-space backdrop: nebula gas, a galactic band, and three star
 * fields at different depths.
 *
 * The depth comes from the three fields drifting at different speeds — near
 * stars travel 430px per cycle, distant ones 820px over far longer, so they
 * separate the way real parallax does. Each field drifts exactly one tile, so
 * the loop is seamless, and the tiles share no common factor, so the combined
 * pattern never visibly repeats.
 *
 * Drift and twinkle live on separate elements because a Tailwind `animate-*`
 * class sets the whole `animation` property; two on one element would clash.
 *
 * Pure CSS on purpose: this sits behind the LCP element, so it must not pull in
 * a canvas or block paint. Every animation is transform/opacity only, and all of
 * them opt out under `prefers-reduced-motion`.
 */
export default function GalaxyBackground({
  className,
  band = true,
  shootingStars = true,
}: GalaxyBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 select-none overflow-hidden",
        className
      )}
    >
      {/* Coloured gas, furthest back. */}
      <div className="nebula-clouds absolute inset-[-15%] animate-nebula-shift" />

      {/* The galactic plane, tilted across the frame. */}
      {band && (
        <div className="absolute left-[62%] top-[68%] h-[52vmax] w-[190vmax] -translate-x-1/2 -translate-y-1/2 -rotate-[22deg]">
          <div className="galaxy-band size-full opacity-70" />
        </div>
      )}

      {/* Star fields. Outer element drifts, inner twinkles. The -50% inset makes
          each layer twice the viewport, so drifting never exposes an edge. */}
      <div className="absolute inset-[-50%] opacity-85 animate-drift-far">
        <div className="starfield-far size-full animate-twinkle-soft" />
      </div>
      <div className="absolute inset-[-50%] animate-drift-mid">
        <div className="starfield-mid size-full animate-twinkle-soft [animation-delay:-3.5s]" />
      </div>
      <div className="absolute inset-[-50%] animate-drift-near">
        <div className="starfield-near size-full animate-twinkle-bright [animation-delay:-1.5s]" />
      </div>

      {/* Grain, so the gradients never read as flat bands on wide screens. */}
      <div className="space-dust absolute inset-0 opacity-50" />

      {shootingStars && (
        <>
          <div className="shooting-star absolute left-[6%] top-[14%] animate-shooting-star" />
          <div className="shooting-star absolute left-[44%] top-[6%] animate-shooting-star [animation-delay:-7s] [animation-duration:17s]" />
        </>
      )}
    </div>
  );
}
