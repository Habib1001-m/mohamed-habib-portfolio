"use client";

import { useEffect, useRef, useState } from "react";

interface MarqueeProps {
  items: string[];
  /** Speed in pixels per second (default 28). */
  speed?: number;
  className?: string;
}

/**
 * Infinite horizontal marquee. Reduced-motion-safe: paused (static layout)
 * for prefers-reduced-motion. Duplicates items for seamless loop.
 * Pauses on hover for readability.
 */
export function Marquee({ items, speed = 28, className = "" }: MarqueeProps) {
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => setReduced(mq.matches);
    window.requestAnimationFrame(syncReducedMotion);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Duplicate items so the loop is seamless.
  const doubled = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Technology ticker"
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg)] to-transparent" />

      <div
        ref={trackRef}
        className="flex w-max gap-3"
        style={{
          animation: reduced
            ? "none"
            : `marquee-scroll ${(items.length * 120) / speed}s linear infinite`,
          animationPlayState: paused && !reduced ? "paused" : "running",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="ds-chip shrink-0 !text-sm !py-1.5 !px-4"
          >
            {item}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(0); }
          }
        }
      `}</style>
    </div>
  );
}
