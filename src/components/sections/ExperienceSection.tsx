import { PORTFOLIO_DATA } from "../../data/portfolioContent";
import { EXPERIENCE_LIST } from "../../data/experience";
import ExperienceCard from "../ExperienceCard";

interface ExperienceSectionProps {
  lang: "en" | "ar";
}

export default function ExperienceSection({ lang }: ExperienceSectionProps) {
  const exp = PORTFOLIO_DATA.experience;

  return (
    <section id="experience-section" className="py-24 border-t border-white/5 bg-slate-950/20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-orange-500 text-sm font-bold">{exp.sectionNum}</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">{exp.title[lang]}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-orange-500/20 to-transparent"></div>
        </div>
        <p className="text-slate-400 text-sm md:text-base mb-12">
          {exp.subtitle[lang]}
        </p>

        <div className="max-w-4xl mx-auto flex flex-col gap-0">
          {EXPERIENCE_LIST.map((item) => (
            <ExperienceCard key={item.id} item={item} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
