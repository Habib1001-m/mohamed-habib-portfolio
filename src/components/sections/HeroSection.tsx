import { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioContent";

interface HeroSectionProps {
  lang: "en" | "ar";
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const h = PORTFOLIO_DATA.hero;
  const isRtl = lang === "ar";
  const [isPortraitActive, setIsPortraitActive] = useState(false);

  useEffect(() => {
    if (!isPortraitActive) return;
    const timeout = window.setTimeout(() => setIsPortraitActive(false), 3200);
    return () => window.clearTimeout(timeout);
  }, [isPortraitActive]);

  const portraitStateClass = isPortraitActive
    ? "-translate-x-[7%] scale-[1.18] grayscale-0 brightness-105"
    : "-translate-x-[7%] scale-[1.15] grayscale brightness-90";

  const actionTextClass = isRtl ? "font-arabic" : "font-mono uppercase tracking-[0.16em]";
  const pillarCardClass = `ds-card ds-card-hover min-h-[86px] p-4 ${isRtl ? "text-right font-arabic" : "text-left"}`;

  return (
    <header id="hero-section" className="min-h-screen relative flex items-center pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-14 xl:gap-20 items-center relative z-10">
        <div className={`lg:col-span-7 flex flex-col justify-center text-center ${isRtl ? "lg:text-right font-arabic" : "lg:text-left"}`}>
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-500/[0.08] border border-orange-500/20 text-orange-300 rounded-full w-fit mb-8 mx-auto ${isRtl ? "lg:mx-0 lg:mr-0" : "lg:mx-0"}`}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-30" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            <span className={`text-[10px] font-medium ${isRtl ? "font-arabic tracking-normal" : "font-mono uppercase tracking-[0.22em]"}`}>
              {h.badge[lang]}
            </span>
          </div>

          <h1 className={`display-text max-w-[700px] mx-auto ${isRtl ? "lg:mr-0 lg:ml-auto" : "lg:ml-0 lg:mr-auto"} text-[2.85rem] sm:text-[4rem] md:text-[4.8rem] xl:text-[5.55rem] text-white`}>
            <span className="block text-slate-50">{h.title1[lang]}</span>
            <span className="block bg-gradient-to-r from-[var(--habib-orange)] to-[var(--habib-gold)] bg-clip-text text-transparent py-1">
              {h.title2[lang]}
            </span>
            <span className="block text-slate-100">{h.title3[lang]}</span>
          </h1>

          <div className={`mt-7 mb-6 text-sm sm:text-base text-orange-300/95 flex items-center justify-center ${isRtl ? "lg:justify-end font-arabic" : "lg:justify-start font-mono"}`}>
            {!isRtl && <span className="text-slate-500 select-none mr-2">›</span>}
            <span>{h.roleLine[lang]}</span>
          </div>

          <p className={`hero-copy ds-muted-copy text-sm sm:text-base md:text-[1.05rem] max-w-[610px] mb-10 ${isRtl ? "leading-[1.95] font-arabic text-slate-300 mx-auto lg:mr-0 lg:ml-auto" : "mx-auto lg:ml-0 lg:mr-auto"}`}>
            {h.subtitle[lang]}
          </p>

          <div className={`flex flex-wrap items-center gap-4 justify-center ${isRtl ? "lg:justify-end" : "lg:justify-start"} mb-10`}>
            <a
              href="#projects-section"
              className={`ds-action ds-action-primary px-6 ${actionTextClass}`}
            >
              <span>{h.ctaPrimary[lang]}</span>
              <svg className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} fill="none" stroke="black" viewBox="0 0 24 24" strokeWidth="2.4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="#contact-section"
              className={`ds-action px-6 ${actionTextClass}`}
            >
              {h.ctaSecondary[lang]}
            </a>
            <a
              href="/cv/Mohamed_Habib_One_Page_CV.pdf"
              className={`ds-action ds-action-success px-6 ${actionTextClass}`}
            >
              {h.ctaCv[lang]}
            </a>
          </div>

          <div className={`w-full max-w-2xl mx-auto lg:mx-0 rounded-[var(--habib-radius-xl)] border border-white/10 bg-black/25 p-2.5 shadow-xl shadow-black/10 ${isRtl ? "font-arabic" : ""}`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className={pillarCardClass}>
                <div className={`text-orange-300 text-xs mb-1.5 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-wider"}`}>{h.pillarTitle1[lang]}</div>
                <div className={`text-[11px] text-slate-400 leading-snug ${isRtl ? "font-arabic" : ""}`}>{h.pillarDesc1[lang]}</div>
              </div>
              <div className={pillarCardClass}>
                <div className={`text-yellow-400 text-xs mb-1.5 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-wider"}`}>{h.pillarTitle2[lang]}</div>
                <div className={`text-[11px] text-slate-400 leading-snug ${isRtl ? "font-arabic" : ""}`}>{h.pillarDesc2[lang]}</div>
              </div>
              <div className={pillarCardClass}>
                <div className={`text-amber-400 text-xs mb-1.5 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-wider"}`}>{h.pillarTitle3[lang]}</div>
                <div className={`text-[11px] text-slate-400 leading-snug ${isRtl ? "font-arabic" : ""}`}>{h.pillarDesc3[lang]}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <button
            type="button"
            onClick={() => setIsPortraitActive((value) => !value)}
            className="relative group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 rounded-full"
            aria-pressed={isPortraitActive}
            aria-label={isRtl ? "اضغط لإظهار الصورة الشخصية بالألوان" : "Tap to reveal the portrait in color"}
          >
            <div className={`absolute inset-[-3px] rounded-full bg-gradient-to-r from-orange-600 via-amber-400 to-red-500 blur-md transition-opacity duration-500 ${isPortraitActive ? "opacity-65" : "opacity-45 group-hover:opacity-65"}`} />
            <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 xl:w-[22rem] xl:h-[22rem] rounded-full overflow-hidden border-4 border-[var(--habib-bg)] relative z-10 bg-zinc-900">
              <img
                src="/images/mohamed-habib-hero.webp"
                alt={isRtl ? "صورة شخصية حقيقية لمحمد حبيب" : "Real portrait of Mohamed Habib"}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center origin-center contrast-105 transition-all duration-700 group-hover:-translate-x-[7%] group-hover:scale-[1.18] group-hover:grayscale-0 group-hover:brightness-105 ${portraitStateClass}`}
              />
            </div>
            <div className="md:hidden absolute -top-7 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-[var(--habib-bg)]/90 border border-white/10 text-[10px] text-slate-400 font-mono uppercase tracking-wider">
              {isRtl ? "اضغط للألوان" : "Tap for color"}
            </div>
            <div className={`absolute top-1/2 ${isRtl ? "-left-6" : "-right-6"} -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 bg-[var(--habib-bg)]/95 rounded-[var(--habib-radius-md)] border border-white/10 shadow-xl z-20`}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className={`text-[10px] text-slate-300 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-widest"}`}>{h.statusLocation[lang]}</span>
            </div>
            <div className={`absolute bottom-2 ${isRtl ? "-right-4" : "-left-4"} flex items-center gap-2 px-3 py-1.5 bg-[var(--habib-bg)]/95 rounded-[var(--habib-radius-md)] border border-white/10 shadow-xl z-20`}>
              <span className="text-orange-400 text-xs">⚡</span>
              <span className={`text-[10px] text-slate-300 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-widest"}`}>{h.statusExperience[lang]}</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
