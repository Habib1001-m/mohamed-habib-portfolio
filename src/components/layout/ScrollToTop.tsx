"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";

export function ScrollToTop({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      setVisible(scrolled > 600);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (scrolled / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const circumference = 2 * Math.PI * 18;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t({ en: "Scroll to top", ar: "إلى الأعلى" }, locale)}
      className="fixed bottom-6 right-6 z-30 grid h-12 w-12 place-items-center rounded-full border border-hairline glass text-ink-muted transition-all duration-300 hover:border-hairline-accent hover:text-accent animate-fade-in md:bottom-20 md:right-6"
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="var(--hairline)"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress / 100)}
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>
      <ArrowUp className="relative h-4 w-4" />
    </button>
  );
}
