import { ExperienceItem } from "../types/portfolio";

interface ExperienceCardProps {
  key?: string;
  item: ExperienceItem;
  lang: "en" | "ar";
}

export default function ExperienceCard({ item, lang }: ExperienceCardProps) {
  return (
    <div
      id={`experience-timeline-node-${item.id}`}
      className={`group relative pb-12 last:pb-0 transition-all duration-300 ${
        lang === "ar" ? "pr-8 sm:pr-10 pl-0 text-right" : "pl-8 sm:pl-10 pr-0 text-left"
      }`}
    >
      {/* Visual Timeline connector line and pulsing dot */}
      <div className={`absolute top-1.5 bottom-0 border-slate-800 group-last:border-transparent ${
        lang === "ar" ? "right-[-1px] left-auto border-r-2" : "left-[-1px] right-auto border-l-2"
      }`}></div>
      
      {/* Animated glowing timeline pulse node */}
      <div className={`absolute top-2.5 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-orange-500 transition-colors duration-300 ${
        lang === "ar" ? "right-[-6px] left-auto" : "left-[-6px] right-auto"
      }`}>
        <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-orange-400 transition-colors duration-300 animate-pulse"></div>
      </div>

      {/* Main card box body */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl glass flex flex-col gap-4">
        {/* Header containing role title and period */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-orange-400 transition-colors duration-300">
              {item.role[lang]}
            </h3>
            
            <p className="text-sm font-mono text-slate-400 flex flex-wrap items-center gap-2 mt-1.5">
              <span className="text-orange-400 font-bold">{item.company[lang]}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
              <span>{item.location[lang]}</span>
            </p>
          </div>
          
          <span className="font-mono text-xs text-slate-500 bg-white/[0.03] border border-white/5 px-3 py-1 rounded-lg w-fit whitespace-nowrap">
            {item.period[lang]}
          </span>
        </div>

        {/* Detailed execution bullet points */}
        <ul className="space-y-3.5 pt-4 border-t border-white/10 text-sm text-slate-300 leading-relaxed">
          {item.points.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-orange-500 text-xs mt-1 font-bold select-none">
                {lang === "ar" ? "◂" : "▹"}
              </span>
              <span>{pt[lang]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
