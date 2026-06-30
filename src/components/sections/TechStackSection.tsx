"use client";

import { useState } from "react";
import { Code, Server, Globe, Cpu, Layers, Settings } from "lucide-react";
import { TECH_STACK } from "@/data/techStack";
import { PORTFOLIO_DATA } from "@/data/portfolioContent";
import { t, type Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Marquee } from "@/components/motion/Marquee";

const CATEGORY_ICON: Record<string, React.ElementType> = {
  frontend: Code,
  "backend-data": Server,
  "automation-ai": Cpu,
  infrastructure: Globe,
  "systems-practices": Layers,
  "product-ops": Settings,
};

export function TechStackSection({ locale }: { locale: Locale }) {
  const s = PORTFOLIO_DATA.skills;
  const [active, setActive] = useState(TECH_STACK[0].id);

  const activeCategory = TECH_STACK.find((c) => c.id === active) ?? TECH_STACK[0];

  return (
    <section id="stack" className="ds-section">
      <div className="ds-shell">
        <SectionHeading
          num={s.sectionNum}
          title={t(s.title, locale)}
          subtitle={t(s.subtitle, locale)}
        />

        {/* Currently exploring banner */}
        <div className="mt-10 flex flex-wrap items-center gap-3 rounded-[var(--r-lg)] border border-hairline-accent bg-[rgba(255,138,31,0.04)] p-4" data-reveal>
          <span className="inline-flex items-center gap-2 font-mono text-xs text-[var(--accent-soft)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-[var(--accent)]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            {t({ en: "Currently exploring", ar: "أستكشف حاليًا" }, locale)}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {["MCP Protocol", "Ollama", "AI Workflows", "Next.js 16"].map((tech) => (
              <span key={tech} className="ds-chip !border-hairline-accent !text-[var(--accent-soft)]">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <div
            role="tablist"
            aria-label={t({ en: "Technology categories", ar: "تصنيفات التقنيات" }, locale)}
            className="flex flex-row flex-wrap gap-2 lg:flex-col"
          >
            {TECH_STACK.map((cat) => {
              const Icon = CATEGORY_ICON[cat.id] ?? Code;
              const isActive = active === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${cat.id}`}
                  onClick={() => setActive(cat.id)}
                  className={`flex items-center gap-2.5 rounded-[var(--r-md)] border px-4 py-3 text-sm transition-all ${
                    isActive
                      ? "border-hairline-accent bg-[rgba(255,138,31,0.05)] text-ink"
                      : "border-hairline text-ink-muted hover:text-ink hover:border-hairline"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-accent" : ""}`} />
                  <span className="font-medium">{t(cat.title, locale)}</span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`tabpanel-${activeCategory.id}`}
            aria-labelledby={activeCategory.id}
            className="ds-card p-6"
          >
            <div className="flex items-center gap-3">
              {(() => {
                const Icon = CATEGORY_ICON[activeCategory.id] ?? Code;
                return <Icon className="h-5 w-5 text-accent" />;
              })()}
              <h3 className="text-[length:var(--fs-h3)] font-semibold text-ink">
                {t(activeCategory.title, locale)}
              </h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {activeCategory.items.map((item) => (
                <span key={item} className="ds-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee ticker of all technologies */}
        <div className="mt-8" data-reveal>
          <div className="ds-label mb-3">
            {t({ en: "Full stack at a glance", ar: "كل التقنيات بنظرة" }, locale)}
          </div>
          <Marquee
            items={TECH_STACK.flatMap((c) => c.items)}
            speed={32}
            className="rounded-[var(--r-lg)] border border-hairline bg-white/[0.015] py-4"
          />
        </div>
      </div>
    </section>
  );
}
