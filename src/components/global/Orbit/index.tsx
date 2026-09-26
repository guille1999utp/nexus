import { useId } from "react";
import { cn } from "@/lib/utils";

interface OrbitProps {
  /** Positioning and size, e.g. "absolute -right-40 top-10 size-[640px]". */
  className?: string;
  /** Seconds per full revolution. */
  duration?: number;
  reverse?: boolean;
  /** Show the violet (top-left) and gold (bottom-right) orbs from the logo. */
  orbs?: boolean;
  /** rotateX in degrees: flattens the ring into an ellipse like the orbit around the "N". */
  tilt?: number;
  /** rotateZ in degrees applied to the (tilted) ring. */
  angle?: number;
  strokeWidth?: number;
  /** Overall ring opacity (0-1). */
  opacity?: number;
}

/**
 * Decorative orbit ring taken from the Nexus logo: a thin violet → gold circle
 * with two glowing orbs that slowly revolve.
 */
export default function Orbit({
  className,
  duration = 60,
  reverse = false,
  orbs = true,
  tilt = 0,
  angle = 0,
  strokeWidth = 1,
  opacity = 1,
}: OrbitProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ring = `orbit-ring-${uid}`;
  const violet = `orbit-violet-${uid}`;
  const gold = `orbit-gold-${uid}`;
  const hasPlaneTransform = tilt !== 0 || angle !== 0;

  // Orb positions on the ring (r = 98 around 100,100)
  const vx = 100 + 98 * Math.cos((-135 * Math.PI) / 180);
  const vy = 100 + 98 * Math.sin((-135 * Math.PI) / 180);
  const gx = 100 + 98 * Math.cos((45 * Math.PI) / 180);
  const gy = 100 + 98 * Math.sin((45 * Math.PI) / 180);

  return (
    <div aria-hidden="true" className={cn("pointer-events-none select-none", className)}>
      <div
        className="size-full"
        style={
          hasPlaneTransform
            ? { transform: `rotate(${angle}deg) rotateX(${tilt}deg)` }
            : undefined
        }
      >
        <svg
          viewBox="0 0 200 200"
          className="size-full overflow-visible animate-orbit-spin"
          style={{
            animationDuration: `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
            opacity,
          }}
        >
          <defs>
            <linearGradient id={ring} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7b5cff" />
              <stop offset="35%" stopColor="#2e6cff" stopOpacity="0.85" />
              <stop offset="62%" stopColor="#1a2873" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#e7b377" />
            </linearGradient>
            <radialGradient id={violet} cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#c9bcff" />
              <stop offset="55%" stopColor="#6e39fd" />
              <stop offset="100%" stopColor="#3b1fd0" />
            </radialGradient>
            <radialGradient id={gold} cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fff1d6" />
              <stop offset="55%" stopColor="#e7b377" />
              <stop offset="100%" stopColor="#b9814a" />
            </radialGradient>
          </defs>

          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke={`url(#${ring})`}
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
            style={{ filter: "drop-shadow(0 0 3px rgba(110,57,253,0.55))" }}
          />

          {orbs && (
            <>
              <circle
                cx={vx}
                cy={vy}
                r="4.2"
                fill={`url(#${violet})`}
                style={{ filter: "drop-shadow(0 0 5px rgba(110,57,253,0.9))" }}
              />
              <circle
                cx={gx}
                cy={gy}
                r="3"
                fill={`url(#${gold})`}
                style={{ filter: "drop-shadow(0 0 5px rgba(231,179,119,0.9))" }}
              />
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
