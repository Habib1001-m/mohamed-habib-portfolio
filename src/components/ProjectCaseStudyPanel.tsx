import { useEffect } from "react";
import { FEATURES } from "../config/features";
import { getCaseStudyByProjectId } from "../data/caseStudies";
import { trackEvent } from "../lib/analytics";

interface ProjectCaseStudyPanelProps {
  projectId: string;
  lang: "en" | "ar";
}

export default function ProjectCaseStudyPanel({ projectId, lang }: ProjectCaseStudyPanelProps) {
  const caseStudy = getCaseStudyByProjectId(projectId);
  const isRtl = lang === "ar";
  const shouldShow = FEATURES.caseStudies && caseStudy?.status === "ready";

  useEffect(() => {
    if (!shouldShow || !caseStudy) return;
    trackEvent("case_study_viewed", { project_id: projectId, slug: caseStudy.slug, lang });
  }, [caseStudy, lang, projectId, shouldShow]);

  if (!shouldShow || !caseStudy) {
    return null;
  }

  return (
    <section className={`space-y-6 ${isRtl ? "font-arabic text-right" : "text-left"}`}>
      <div className="space-y-2">
        <h4 className="ds-label border-b border-white/5 pb-2">
          {lang === "ar" ? "دراسة الحالة" : "Case study"}
        </h4>
        <p className="text-sm ds-muted-copy text-slate-300">
          {caseStudy.summary[lang]}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {caseStudy.outcomes.map((outcome) => (
          <div key={`${outcome.label.en}-${outcome.value}`} className="ds-metric text-center">
            <div className="text-sm font-bold text-orange-300 font-mono">{outcome.value}</div>
            <div className={`text-[9px] text-slate-500 uppercase tracking-wider mt-1 ${isRtl ? "font-arabic tracking-normal" : "font-mono"}`}>
              {outcome.label[lang]}
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {caseStudy.decisions.slice(0, 2).map((decision) => (
          <article key={decision.title.en} className="ds-card p-4">
            <h5 className="text-xs text-orange-300 font-bold mb-2">
              {decision.title[lang]}
            </h5>
            <p className="text-xs ds-muted-copy leading-relaxed">
              {decision.body[lang]}
            </p>
          </article>
        ))}
      </div>

      <div className="ds-card p-4 border-cyan-500/15 bg-cyan-500/[0.035]">
        <h5 className={`text-xs text-cyan-300 mb-2 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-widest"}`}>
          {lang === "ar" ? "مسار التحقق" : "Verification path"}
        </h5>
        <p className="text-sm text-cyan-100/75 leading-relaxed">
          {caseStudy.verification[lang]}
        </p>
      </div>
    </section>
  );
}
