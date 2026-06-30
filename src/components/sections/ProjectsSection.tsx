"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { PROJECTS_LIST } from "@/data/projects";
import { PORTFOLIO_DATA } from "@/data/portfolioContent";
import { t, isRtl, type Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { track } from "@/lib/analytics";

export function ProjectsSection({ locale }: { locale: Locale }) {
  const p = PORTFOLIO_DATA.projects;
  const rtl = isRtl(locale);
  const [active, setActive] = useState(0);
  const activeProject = PROJECTS_LIST[active];
  const listRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation within the project list
  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActive((a) => (a + 1) % PROJECTS_LIST.length);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((a) => (a - 1 + PROJECTS_LIST.length) % PROJECTS_LIST.length);
    }
  };

  useEffect(() => {
    listRefs.current[active]?.focus({ preventScroll: true });
  }, [active]);

  return (
    <section id="projects" className="ds-section">
      <div className="ds-shell">
        <SectionHeading
          num={p.sectionNum}
          title={t(p.title, locale)}
          subtitle={t(p.subtitle, locale)}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          {/* Left: sticky title list (the index) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              role="listbox"
              aria-label={t({ en: "Projects", ar: "المشاريع" }, locale)}
              tabIndex={0}
              onKeyDown={onListKeyDown}
              className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]"
            >
              {PROJECTS_LIST.map((project, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={project.id}
                    ref={(el) => { listRefs.current[i] = el; }}
                    role="option"
                    aria-selected={isActive}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() =>
                      track({
                        eventName: "project_preview_hovered",
                        category: "lead",
                        props: { project_id: project.id, source: "index" },
                      })
                    }
                    className={`group relative flex w-full items-center gap-4 py-5 text-start transition-colors ${
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink-soft"
                    }`}
                  >
                    {/* Active accent indicator bar */}
                    <span
                      className={`absolute transition-all duration-300 ${
                        rtl ? "right-0" : "left-0"
                      } top-1/2 h-8 -translate-y-1/2 rounded-full bg-[var(--accent)] ${
                        isActive ? "w-[3px] opacity-100" : "w-0 opacity-0"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`font-mono text-xs transition-colors ${
                        isActive ? "text-accent" : "text-ink-faint"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="block text-lg font-semibold tracking-tight">
                        {t(project.title, locale)}
                      </span>
                      <span className="mt-0.5 block text-sm text-ink-faint">
                        {t(project.category, locale)}
                      </span>
                    </span>
                    <ArrowUpRight
                      className={`h-4 w-4 shrink-0 transition-all ${
                        isActive
                          ? "text-accent opacity-100"
                          : "text-ink-faint opacity-0 group-hover:opacity-60"
                      } ${rtl ? "scale-x-[-1]" : ""}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: live preview panel (swaps on hover/focus) */}
          <div data-reveal>
            <div className="ds-card ds-card-hover group overflow-hidden">
              <Link
                href={`/${locale}/work/${activeProject.id}`}
                onClick={() =>
                  track({
                    eventName: "project_opened",
                    category: "project",
                    props: { project_id: activeProject.id, source: "preview" },
                  })
                }
                className="block"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline">
                  { }
                  <img
                    key={activeProject.id}
                    src={activeProject.image}
                    alt={t(activeProject.title, locale)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.03] animate-fade-in"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute top-3 flex gap-2">
                    <span className="ds-chip !bg-black/50 backdrop-blur">
                      {t(activeProject.category, locale)}
                    </span>
                    {activeProject.status && (
                      <span className="ds-chip !bg-black/50 backdrop-blur !text-[var(--accent-soft)]">
                        {t(activeProject.status, locale)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              <div className="p-6">
                <h3 className="text-[length:var(--fs-h3)] font-semibold text-ink">
                  {t(activeProject.title, locale)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {t(activeProject.tagline, locale)}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {activeProject.tech.slice(0, 4).map((tech) => (
                    <span key={tech} className="ds-chip">{tech}</span>
                  ))}
                  {activeProject.tech.length > 4 && (
                    <span className="ds-chip">+{activeProject.tech.length - 4}</span>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href={`/${locale}/work/${activeProject.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-soft transition-colors"
                  >
                    {t({ en: "View case study", ar: "دراسة المشروع" }, locale)}
                    <span className={rtl ? "rotate-180" : ""}>→</span>
                  </Link>
                  <div className="flex items-center gap-3">
                    {activeProject.links?.github && (
                      <a
                        href={activeProject.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t(p.viewSource, locale)}
                        className="text-ink-faint hover:text-ink transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {activeProject.links?.demo && (
                      <a
                        href={activeProject.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t(p.visitDemo, locale)}
                        className="text-ink-faint hover:text-ink transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
