"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { EXPERIENCE_LIST } from "@/data/experience";
import { PORTFOLIO_DATA } from "@/data/portfolioContent";
import { t, isRtl, type Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/layout/SectionHeading";

export function ExperienceSection({ locale }: { locale: Locale }) {
  const e = PORTFOLIO_DATA.experience;
  const rtl = isRtl(locale);
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="ds-section">
      <div className="ds-shell">
        <SectionHeading
          num={e.sectionNum}
          title={t(e.title, locale)}
          subtitle={t(e.subtitle, locale)}
        />

        <div className="mt-12 max-w-4xl">
          <div className="relative">
            {/* Continuous timeline line — solid, elegant */}
            <span
              className={`absolute top-2 bottom-2 w-px bg-[var(--hairline)] ${rtl ? "right-0" : "left-0"}`}
            />

            <div className="space-y-6">
              {EXPERIENCE_LIST.map((exp, i) => {
                const isOpen = expanded === i;
                return (
                  <article
                    key={i}
                    className={`group relative ${rtl ? "pr-8 sm:pr-10" : "pl-8 sm:pl-10"}`}
                    data-reveal
                    data-reveal-group="experience-cards"
                  >
                    {/* Timeline node — larger, elegant dot with ring */}
                    <span
                      className={`absolute top-5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-hairline bg-[var(--bg)] transition-colors duration-300 group-hover:border-[var(--accent)] ${rtl ? "right-[-7px]" : "left-[-7px]"}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-ink-faint transition-colors duration-300 group-hover:bg-[var(--accent)] animate-pulse-soft" />
                    </span>

                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="ds-card ds-card-hover group w-full p-5 text-start"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-[var(--accent-soft)]">
                          {t(exp.role, locale)}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="ds-chip">{t(exp.period, locale)}</span>
                          <ChevronDown
                            className={`h-4 w-4 text-ink-faint transition-transform duration-300 ${isOpen ? "rotate-180" : ""} ${rtl ? "scale-x-[-1]" : ""}`}
                          />
                        </div>
                      </div>
                      <p className="mt-1.5 flex flex-wrap items-center gap-2 text-sm">
                        <span className="font-bold text-[var(--accent-soft)]">
                          {t(exp.company, locale)}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-ink-faint" />
                        <span className="text-ink-muted">{t(exp.location, locale)}</span>
                      </p>

                      <div
                        className="grid transition-all duration-300"
                        style={{
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                          opacity: isOpen ? 1 : 0,
                        }}
                      >
                        <ul className="mt-4 space-y-3 overflow-hidden border-t border-hairline pt-4">
                          {exp.points.map((point, j) => (
                            <li
                              key={j}
                              className={`flex gap-2.5 text-sm leading-relaxed text-ink-muted ${rtl ? "flex-row-reverse text-right" : ""}`}
                            >
                              <span className="mt-1 text-xs font-bold text-[var(--accent)] select-none">
                                {rtl ? "◂" : "▹"}
                              </span>
                              <span>{t(point, locale)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {!isOpen && (
                        <p className="mt-2 text-xs text-ink-faint">
                          {t(
                            { en: "Click to expand details", ar: "اضغط لعرض التفاصيل" },
                            locale,
                          )}
                        </p>
                      )}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
