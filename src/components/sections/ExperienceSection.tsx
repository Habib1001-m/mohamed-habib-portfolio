import { PORTFOLIO_DATA } from "../../data/portfolioContent";
import { EXPERIENCE_LIST } from "../../data/experience";
import ExperienceCard from "../ExperienceCard";

interface ExperienceSectionProps {
  lang: "en" | "ar";
}

export default function ExperienceSection({ lang }: ExperienceSectionProps) {
  const exp = PORTFOLIO_DATA.experience;
  const isRtl = lang === "ar";

  return (
    <section id="experience-section" className="py-24 border-t border-white/5 bg-slate-950/20 relative">
      <div className="ds-shell">
        <div className={isRtl ? "font-arabic text-right" : ""}>
          <div className="ds-section-heading mb-4">
            <span className="ds-kicker text-orange-500">{exp.sectionNum}</span>
            <h2 className={`ds-section-title ${isRtl ? "font-arabic" : "uppercase"}`}>{exp.title[lang]}</h2>
            <div className="ds-section-rule" />
          </div>
          <p className={`ds-muted-copy text-sm md:text-base mb-12 max-w-5xl ${isRtl ? "font-arabic" : ""}`}>
            {exp.subtitle[lang]}
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-0">
          {EXPERIENCE_LIST.map((item) => (
            <ExperienceCard key={item.id} item={item} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
