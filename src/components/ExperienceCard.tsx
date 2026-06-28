import { ExperienceItem } from "../types/portfolio";

interface ExperienceCardProps {
  key?: string;
  item: ExperienceItem;
  lang: "en" | "ar";
}

export default function ExperienceCard({ item, lang }: ExperienceCardProps) {
  const isRtl = lang === "ar";

  return (
    <div
      id={`experience-timeline-node-${item.id}`}
      className={`group relative pb-12 last:pb-0 transition-all duration-300 ${
        isRtl ? "pr-8 sm:pr-10 pl-0 text-right" : "pl-8 sm:pl-10 pr-0 text-left"
      }`}
    >
      <div className={`absolute top-1.5 bottom-0 border-slate-800 group-last:border-transparent ${
        isRtl ? "right-[-1px] left-auto border-r-2" : "left-[-1px] right-auto border-l-2"
      }`} />

      <div className={`absolute top-2.5 w-3.5 h-3.5 rounded-full bg-[var(--habib-bg)] border-2 border-slate-700 group-hover:border-orange-500 transition-colors duration-300 flex items-center justify-center ${
        isRtl ? "right-[-6px] left-auto" : "left-[-6px] right-auto"
      }`}>
        <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-orange-400 transition-colors duration-300 animate-pulse" />
      </div>

      <div className="ds-card ds-card-hover p-6 sm:p-8 shadow-xl flex flex-col gap-4">
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isRtl ? "sm:flex-row-reverse" : ""}`}>
          <div className="min-w-0">
            <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-orange-400 transition-colors duration-300">
              {item.role[lang]}
            </h3>

            <p className={`text-sm text-slate-400 flex flex-wrap items-center gap-2 mt-1.5 ${isRtl ? "font-arabic justify-end" : "font-mono"}`}>
              <span className="text-orange-400 font-bold">{item.company[lang]}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span>{item.location[lang]}</span>
            </p>
          </div>

          <span className={`ds-chip w-fit whitespace-nowrap ${isRtl ? "font-arabic" : ""}`}>
            {item.period[lang]}
          </span>
        </div>

        <ul className={`space-y-3.5 pt-4 border-t border-white/10 text-sm ds-muted-copy ${isRtl ? "font-arabic" : ""}`}>
          {item.points.map((pt, idx) => (
            <li key={idx} className={`flex items-start gap-3 ${isRtl ? "flex-row-reverse text-right" : ""}`}>
              <span className="text-orange-500 text-xs mt-1 font-bold select-none">
                {isRtl ? "◂" : "▹"}
              </span>
              <span>{pt[lang]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
