import { useEffect, useState } from "react";
import { FEATURES } from "../config/features";
import { MOTION_CONFIG } from "../config/motion";
import { trackEvent } from "../lib/analytics";

interface ScrollProgressIndicatorProps {
  lang: "en" | "ar";
}

function getScrollProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (scrollableHeight <= 0) return 0;

  return Math.min(Math.max(scrollTop / scrollableHeight, 0), 1);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ScrollProgressIndicator({ lang }: ScrollProgressIndicatorProps) {
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);
  const isRtl = lang === "ar";

  useEffect(() => {
    if (!FEATURES.scrollProgress || !MOTION_CONFIG.enabled) return;
    if (MOTION_CONFIG.respectReducedMotion && prefersReducedMotion()) return;

    let animationFrame = 0;

    const updateProgress = () => {
      animationFrame = 0;
      setProgress(getScrollProgress());
    };

    const requestUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateProgress);
    };

    setShouldRender(true);
    updateProgress();
    trackEvent("motion_layer_loaded", { target: "scroll_progress", lang });

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [lang]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[3px] bg-black/20"
      aria-hidden="true"
    >
      <div
        className="h-full w-full origin-left transform-gpu bg-gradient-to-r from-orange-600 via-amber-400 to-orange-300 shadow-[0_0_16px_rgba(249,115,22,0.32)]"
        style={{
          transform: `scaleX(${progress})`,
          transformOrigin: isRtl ? "right center" : "left center",
        }}
      />
    </div>
  );
}
