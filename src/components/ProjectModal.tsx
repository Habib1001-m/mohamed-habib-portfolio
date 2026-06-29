import React, { useEffect, useRef } from "react";
import { Project } from "../types/portfolio";
import { PORTFOLIO_DATA } from "../data/portfolioContent";
import { trackEvent } from "../lib/analytics";
import ProjectCaseStudyPanel from "./ProjectCaseStudyPanel";

interface ProjectModalProps {
  lang: "en" | "ar";
  selectedProject: Project | null;
  setSelectedProject: (p: Project | null) => void;
}

export default function ProjectModal({ lang, selectedProject, setSelectedProject }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerButtonIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (selectedProject) {
      triggerButtonIdRef.current = `details-btn-${selectedProject.id}`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (triggerButtonIdRef.current) {
        const btn = document.getElementById(triggerButtonIdRef.current);
        if (btn) btn.focus();
        triggerButtonIdRef.current = null;
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    const timer = setTimeout(() => {
      const closeBtn = document.getElementById("close-specs-modal");
      if (closeBtn) closeBtn.focus();
    }, 50);

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [selectedProject, setSelectedProject]);

  if (!selectedProject) return null;

  const proj = PORTFOLIO_DATA.projects;
  const isRtl = lang === "ar";
  const sectionTitleClass = `ds-label border-b border-white/5 pb-2 ${isRtl ? "font-arabic" : ""}`;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedProject(null);
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        id="specs-modal-body"
        className="w-full max-w-4xl ds-panel overflow-hidden relative max-h-[92vh] flex flex-col"
      >
        <div className="relative h-56 sm:h-72 w-full bg-black">
          <img
            src={selectedProject.image}
            alt={selectedProject.title[lang]}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--habib-bg)] via-[#050505]/15 to-transparent" />

          <button
            id="close-specs-modal"
            type="button"
            onClick={() => setSelectedProject(null)}
            className={`absolute top-4 ${isRtl ? "left-4" : "right-4"} w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white hover:text-orange-400 flex items-center justify-center transition-colors border border-white/10 cursor-pointer`}
            aria-label={lang === "ar" ? "إغلاق" : "Close modal"}
          >
            ✕
          </button>
        </div>

        <div className={`p-6 sm:p-8 overflow-y-auto space-y-7 flex-1 ${isRtl ? "text-right font-arabic" : "text-left"}`}>
          <div>
            <span className={`px-2.5 py-1 rounded-[var(--habib-radius-sm)] text-xs text-orange-300 bg-orange-500/10 border border-orange-500/20 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-widest"}`}>
              {selectedProject.category[lang]}
            </span>
            <h3 id="modal-title" className={`text-2xl sm:text-3xl font-black text-white mt-3.5 tracking-tight ${isRtl ? "font-arabic" : ""}`}>
              {selectedProject.title[lang]}
            </h3>
            <p className={`text-xs sm:text-sm ds-muted-copy mt-2 ${isRtl ? "font-arabic" : "font-mono"}`}>
              {selectedProject.tagline[lang]}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className={sectionTitleClass}>
              {lang === "ar" ? "ما الذي يثبته هذا المشروع؟" : "What this project proves"}
            </h4>
            <p className="text-sm ds-muted-copy text-slate-300">
              {selectedProject.longDescription[lang]}
            </p>
          </div>

          <ProjectCaseStudyPanel projectId={selectedProject.id} lang={lang} />

          {selectedProject.verificationNote && (
            <div className="ds-card p-4 space-y-2 border-cyan-500/15 bg-cyan-500/[0.035]">
              <h4 className={`text-xs text-cyan-300 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-widest"}`}>
                {lang === "ar" ? "مسار التحقق" : "Verification path"}
              </h4>
              <p className="text-sm text-cyan-100/75 leading-relaxed">
                {selectedProject.verificationNote[lang]}
              </p>
            </div>
          )}

          {selectedProject.gallery && selectedProject.gallery.length > 0 && (
            <div className="space-y-4">
              <h4 className={sectionTitleClass}>
                {lang === "ar" ? "لقطات من المنتج" : "Product screenshots"}
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedProject.gallery.map((shot) => (
                  <figure key={shot.src} className="ds-card overflow-hidden">
                    <img
                      src={shot.src}
                      alt={shot.label[lang]}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-52 object-cover bg-black"
                    />
                    <figcaption className="p-4 space-y-1.5">
                      <div className={`text-xs text-orange-300 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-wider"}`}>
                        {shot.label[lang]}
                      </div>
                      {shot.caption && (
                        <p className="text-xs ds-muted-copy">
                          {shot.caption[lang]}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}

          {selectedProject.stats && selectedProject.stats.length > 0 && (
            <div className="space-y-3">
              <h4 className={sectionTitleClass}>
                {proj.specsHeader[lang]}
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {selectedProject.stats.map((st) => (
                  <div key={`${st.label.en}-${st.value}`} className="ds-metric text-center font-mono">
                    <div className="text-sm font-bold text-orange-300">{st.value}</div>
                    <div className={`text-[9px] text-slate-500 uppercase tracking-wider mt-1 ${isRtl ? "font-arabic tracking-normal" : ""}`}>{st.label[lang]}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className={sectionTitleClass}>
              {lang === "ar" ? "التقنيات المستخدمة" : "Technology stack"}
            </h4>
            <div className={`flex flex-wrap gap-2 ${isRtl ? "justify-end" : "justify-start"}`}>
              {selectedProject.tech.map((techName) => (
                <span
                  key={techName}
                  className="px-2.5 py-1 rounded-[var(--habib-radius-sm)] text-xs font-mono bg-white/[0.03] border border-white/5 text-slate-300"
                >
                  {techName}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-white/10 bg-black/40 flex items-center justify-end gap-3.5">
          <button
            id="close-specs-modal-bottom"
            type="button"
            onClick={() => setSelectedProject(null)}
            className={`ds-action cursor-pointer ${isRtl ? "font-arabic" : "font-mono"}`}
          >
            {proj.closeDetails[lang]}
          </button>

          {selectedProject.links?.github && (
            <a
              href={selectedProject.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("project_github_clicked", { project_id: selectedProject.id, project_title: selectedProject.title.en, source: "modal", lang })}
              className={`ds-action ${isRtl ? "font-arabic" : "font-mono"}`}
            >
              {proj.viewSource[lang]}
            </a>
          )}
          {selectedProject.links?.demo && (
            <a
              href={selectedProject.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("project_demo_clicked", { project_id: selectedProject.id, project_title: selectedProject.title.en, source: "modal", lang })}
              className={`ds-action ds-action-primary ${isRtl ? "font-arabic" : "font-mono uppercase tracking-wider"}`}
            >
              {proj.visitDemo[lang]}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
