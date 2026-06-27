import { PORTFOLIO_DATA } from "../../data/portfolioContent";

interface AboutSectionProps {
  lang: "en" | "ar";
}

export default function AboutSection({ lang }: AboutSectionProps) {
  const ab = PORTFOLIO_DATA.about;
  const isRtl = lang === "ar";

  return (
    <section id="about-section" className="py-24 border-t border-white/5 relative bg-gradient-to-b from-transparent to-slate-950/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-orange-500 text-sm font-bold">{ab.sectionNum}</span>
          <h2 className={`text-2xl sm:text-3xl font-black text-white tracking-tight ${isRtl ? "font-arabic" : "uppercase"}`}>{ab.title[lang]}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-orange-500/20 to-transparent"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <p className={`text-slate-300 text-base md:text-lg leading-relaxed ${isRtl ? "font-arabic" : ""}`}>
              {ab.paragraph1[lang]}
            </p>
            <p className={`text-slate-400 text-sm md:text-base leading-relaxed ${isRtl ? "font-arabic" : ""}`}>
              {ab.paragraph2[lang]}
            </p>
            <p className={`text-slate-400 text-sm md:text-base leading-relaxed ${isRtl ? "font-arabic" : ""}`}>
              {ab.paragraph3[lang]}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {ab.outcomeMetrics.map((metric) => (
                <div key={metric.label.en} className={`p-4 rounded-xl bg-zinc-900/60 border border-white/10 glass ${isRtl ? "text-right" : "text-left"}`}>
                  <div className="text-xl font-black bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent font-mono mb-1">
                    {metric.value}
                  </div>
                  <div className={`text-[10px] text-slate-300 uppercase tracking-wider font-mono mb-1 ${isRtl ? "font-arabic tracking-normal" : ""}`}>
                    {metric.label[lang]}
                  </div>
                  <div className={`text-[11px] text-slate-500 leading-snug ${isRtl ? "font-arabic" : ""}`}>
                    {metric.note[lang]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-900/60 border border-white/10 glass shadow-xl">
            <h3 className={`text-white font-bold text-base mb-4 flex items-center gap-2 ${isRtl ? "font-arabic" : ""}`}>
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              {ab.drivesTitle[lang]}
            </h3>

            <ul className="space-y-4 text-xs md:text-sm text-slate-400">
              <li className={`flex items-start gap-3 ${isRtl ? "font-arabic" : ""}`}>
                <span className="text-orange-500 font-bold select-none mt-0.5">▹</span>
                <span>{ab.driveItem1[lang]}</span>
              </li>
              <li className={`flex items-start gap-3 ${isRtl ? "font-arabic" : ""}`}>
                <span className="text-orange-500 font-bold select-none mt-0.5">▹</span>
                <span>{ab.driveItem2[lang]}</span>
              </li>
              <li className={`flex items-start gap-3 ${isRtl ? "font-arabic" : ""}`}>
                <span className="text-orange-500 font-bold select-none mt-0.5">▹</span>
                <span>{ab.driveItem3[lang]}</span>
              </li>
              <li className={`flex items-start gap-3 ${isRtl ? "font-arabic" : ""}`}>
                <span className="text-orange-500 font-bold select-none mt-0.5">▹</span>
                <span>{ab.driveItem4[lang]}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
