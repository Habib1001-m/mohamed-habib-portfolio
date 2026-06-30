"use client";

import { useEffect, useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import { PORTFOLIO_DATA } from "@/data/portfolioContent";

const SECTIONS = [
  { id: "hero", label: { en: "Home", ar: "الرئيسية" } },
  { id: "about", label: { en: "About", ar: "من أنا" } },
  { id: "projects", label: { en: "Work", ar: "الأعمال" } },
  { id: "proof", label: { en: "Proof", ar: "الإثبات" } },
  { id: "systems", label: { en: "Systems", ar: "الأنظمة" } },
  { id: "experience", label: { en: "Experience", ar: "الخبرة" } },
  { id: "stack", label: { en: "Stack", ar: "التقنيات" } },
  { id: "contact", label: { en: "Contact", ar: "تواصل" } },
] as const;

/**
 * Right-side scroll-spy dot navigator. Shows a vertical list of dots
 * representing sections; the active section's dot is highlighted.
 * Click a dot to smooth-scroll to that section.
 * Hidden on mobile (<= 1024px) to avoid clutter.
 * Reduced-motion: smooth-scroll is already gated globally via CSS.
 */
export function ScrollSpyDots({ locale }: { locale: Locale }) {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show after scrolling past hero.
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.5, 1] },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  void PORTFOLIO_DATA;
  void t;

  return (
    <nav
      aria-label={t({ en: "Section navigation", ar: "تنقل الأقسام" }, locale)}
      className={`fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 transition-opacity duration-300 lg:flex ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={t(s.label, locale)}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-2.5 bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]"
                  : "h-1.5 w-1.5 bg-ink-faint/60 group-hover:bg-ink-muted"
              }`}
            />
            <span className="pointer-events-none absolute right-5 whitespace-nowrap rounded-md border border-hairline glass px-2 py-1 font-mono text-[0.65rem] text-ink-soft opacity-0 transition-opacity group-hover:opacity-100">
              {t(s.label, locale)}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
