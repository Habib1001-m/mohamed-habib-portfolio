"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  /** Target value to count up to. */
  value: number;
  /** Duration in ms (default 1400). */
  duration?: number;
  /** Prefix string (e.g. "4+"). */
  prefix?: string;
  /** Suffix string (e.g. "+"). */
  suffix?: string;
  className?: string;
}

/**
 * Counts up to `value` when scrolled into view. Reduced-motion-safe:
 * prefers-reduced-motion users see the final value immediately.
 * Non-numeric values (e.g. "AR/EN", "Resend") should NOT use this —
 * pass them as plain text. Only use for pure numeric metrics.
 */
export function AnimatedCounter({
  value,
  duration = 1400,
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      const frame = requestAnimationFrame(() => {
        setDisplay(value);
        setStarted(true);
      });
      return () => cancelAnimationFrame(frame);
    }

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              // easeOutCubic for a premium feel
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(Math.round(eased * value));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, started]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
