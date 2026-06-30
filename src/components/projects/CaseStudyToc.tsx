"use client";

import { useEffect, useState } from "react";
import { t, type Locale } from "@/lib/i18n";

interface TocItem {
  id: string;
  label: { en: string; ar: string };
}

const TOC_ITEMS: TocItem[] = [
  { id: "cs-gallery", label: { en: "Gallery", ar: "المعرض" } },
  { id: "cs-outcome", label: { en: "Outcome", ar: "النتيجة" } },
  { id: "cs-stack", label: { en: "Stack", ar: "التقنيات" } },
];

export function CaseStudyToc({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<string>("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.5, 1] },
    );
    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("case-study-body");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      setProgress(total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const existingItems = TOC_ITEMS.filter((item) => {
    if (typeof document === "undefined") return true;
    return document.getElementById(item.id);
  });
  if (existingItems.length === 0) return null;

  return (
    <nav
      aria-label={t({ en: "Case study sections", ar: "أقسام دراسة الحالة" }, locale)}
      className="sticky top-24 hidden xl:block"
    >
      {/* Reading progress ring */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative h-9 w-9 shrink-0">
          <svg className="h-9 w-9 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="var(--hairline)" strokeWidth="2.5" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 15}`}
              strokeDashoffset={`${2 * Math.PI * 15 * (1 - progress / 100)}`}
              className="transition-[stroke-dashoffset] duration-150 ease-out"
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-mono text-[0.6rem] text-ink-muted">
            {Math.round(progress)}
          </span>
        </div>
        <span className="ds-label">
          {t({ en: "Reading", ar: "قراءة" }, locale)}
        </span>
      </div>

      <ul className="space-y-1 border-s border-hairline">
        {existingItems.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`relative -ms-px block border-s-2 py-1.5 ps-3 text-sm transition-colors ${
                  isActive
                    ? "border-[var(--accent)] text-ink"
                    : "border-transparent text-ink-faint hover:text-ink-soft"
                }`}
              >
                {t(item.label, locale)}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
