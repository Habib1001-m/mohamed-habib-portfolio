import React, { useEffect, useRef } from "react";
import { Project } from "../types/portfolio";
import { PORTFOLIO_DATA } from "../data/portfolioContent";

interface ProjectModalProps {
  lang: "en" | "ar";
  selectedProject: Project | null;
  setSelectedProject: (p: Project | null) => void;
}

export default function ProjectModal({ lang, selectedProject, setSelectedProject }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerButtonIdRef = useRef<string | null>(null);

  // Store the active element before the modal opens so we can restore focus
  useEffect(() => {
    if (selectedProject) {
      triggerButtonIdRef.current = `details-btn-${selectedProject.id}`;
      // Prevent body scroll
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

  // Focus trap, Escape key
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
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    // Initially focus on close button for immediate accessibility
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
        className="w-full max-w-2xl bg-[#050505] border border-white/15 rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col glass"
      >
        {/* Header image in modal */}
        <div className="relative h-48 sm:h-56 w-full bg-black">
          <img
            src={selectedProject.image}
            alt={selectedProject.title[lang]}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
          
          <button
            id="close-specs-modal"
            type="button"
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white hover:text-orange-400 flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div>
            <span className="text-xs font-mono text-orange-400 uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-md">
              {selectedProject.category[lang]}
            </span>
            <h3 id="modal-title" className={`text-2xl font-black text-white mt-3.5 tracking-tight ${isRtl ? "font-arabic" : ""}`}>
              {selectedProject.title[lang]}
            </h3>
            <p className={`text-xs sm:text-sm font-mono text-slate-400 mt-1 leading-relaxed ${isRtl ? "font-arabic" : ""}`}>
              {selectedProject.tagline[lang]}
            </p>
          </div>

          {/* Detailed Long Description */}
          <div className="space-y-3">
            <h4 className={`text-xs font-mono text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2 ${isRtl ? "font-arabic" : ""}`}>
              {lang === "ar" ? "تفاصيل الهندسة والعمل المنجز" : "Engineering Analysis & Execution"}
            </h4>
            <p className={`text-sm text-slate-300 leading-relaxed font-sans ${isRtl ? "font-arabic" : ""}`}>
              {selectedProject.longDescription[lang]}
            </p>
          </div>

          {/* System Specs (Metadata Stats table) */}
          {selectedProject.stats && selectedProject.stats.length > 0 && (
            <div className="space-y-3">
              <h4 className={`text-xs font-mono text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2 ${isRtl ? "font-arabic" : ""}`}>
                {proj.specsHeader[lang]}
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {selectedProject.stats.map((st, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/10 glass text-center font-mono">
                    <div className="text-sm font-bold text-orange-400">{st.value}</div>
                    <div className={`text-[9px] text-slate-500 uppercase tracking-wider mt-1 ${isRtl ? "font-arabic" : ""}`}>{st.label[lang]}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Spec pills list */}
          <div className="space-y-3">
            <h4 className={`text-xs font-mono text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2 ${isRtl ? "font-arabic" : ""}`}>
              {lang === "ar" ? "قائمة التقنيات والعتاد المدمج" : "Technology Stack Implemented"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tech.map((techName) => (
                <span
                  key={techName}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.03] border border-white/5 text-slate-300"
                >
                  {techName}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom link actions */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-black/40 flex items-center justify-end gap-3.5">
          <button
            id="close-specs-modal-bottom"
            type="button"
            onClick={() => setSelectedProject(null)}
            className={`px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer ${isRtl ? "font-arabic" : ""}`}
          >
            {proj.closeDetails[lang]}
          </button>

          {selectedProject.links?.github && (
            <a
              href={selectedProject.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg transition-all ${isRtl ? "font-arabic" : ""}`}
            >
              {proj.viewSource[lang]}
            </a>
          )}
          {selectedProject.links?.demo && (
            <a
              href={selectedProject.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2.5 text-xs font-mono text-black font-black uppercase tracking-wider accent-gradient rounded-lg hover:opacity-90 transition-all shadow-lg shadow-orange-500/10 ${isRtl ? "font-arabic" : ""}`}
            >
              {proj.visitDemo[lang]}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
