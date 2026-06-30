"use client";

import { useEffect, useRef } from "react";

/**
 * Reading progress bar for case-study routes — fixed top, accent gradient,
 * tracks scroll within the article body. Reduced-motion-safe (static bar,
 * rAF-throttled, no animation on the bar itself beyond transform).
 */
export function CaseStudyProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.getElementById("case-study-body");
      if (!el || !ref.current) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      ref.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
