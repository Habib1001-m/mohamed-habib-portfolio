import { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioContent";

const ROLES_EN = [
  "AI Infrastructure Engineer",
  "Privacy-First Developer",
  "Systems Architect",
  "Open Source Contributor",
];

const ROLES_AR = [
  "مهندس بنية تحتية للذكاء الاصطناعي",
  "مطور برمجيات يركز على الخصوصية",
  "مصمم ومخطط أنظمة برمجية",
  "مساهم في البرمجيات مفتوحة المصدر",
];

interface HeroSectionProps {
  lang: "en" | "ar";
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const h = PORTFOLIO_DATA.hero;
  const isRtl = lang === "ar";

  // Self-contained typewriter animation
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const rolesList = isRtl ? ROLES_AR : ROLES_EN;
    const currentWord = rolesList[roleIndex] || "";

    let timer: number;
    if (isDeleting) {
      timer = window.setTimeout(() => {
        setRoleText(currentWord.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 40);
    } else {
      timer = window.setTimeout(() => {
        setRoleText(currentWord.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 75);
    }

    if (!isDeleting && charIndex === currentWord.length) {
      timer = window.setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % rolesList.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, isRtl]);

  return (
    <header id="hero-section" className="min-h-screen relative flex items-center pt-24 pb-16">
      {/* Absolute container grid to bounds sizing */}
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Texts Column */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
          
          {/* Active status beacon indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full w-fit mb-6 mx-auto lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className={`text-[10px] uppercase font-mono font-bold tracking-widest ${isRtl ? "font-arabic" : ""}`}>
              {h.badge[lang]}
            </span>
          </div>

          {/* Slogan Titles */}
          {isRtl ? (
            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight text-white tracking-tight font-arabic">
              {h.title1[lang]}
              <span className="bg-gradient-to-r from-[#FF3E00] to-[#FFBE00] bg-clip-text text-transparent block mt-2">
                {h.title2[lang]}
              </span>
              <span className="block mt-2">{h.title3[lang]}</span>
            </h1>
          ) : (
            <h1 className="display-text text-5xl sm:text-6xl md:text-7xl xl:text-8xl leading-[0.85] text-white tracking-tighter">
              {h.title1[lang]}
              <span className="bg-gradient-to-r from-[#FF3E00] to-[#FFBE00] bg-clip-text text-transparent block mt-1">
                {h.title2[lang]}
              </span>
              {h.title3[lang]}
            </h1>
          )}

          {/* Typewriter text block */}
          <div className={`mt-6 mb-6 text-sm sm:text-base md:text-lg text-orange-400 flex items-center justify-center lg:justify-start gap-1 ${isRtl ? "font-arabic" : "font-mono"}`}>
            {!isRtl && <span className="text-slate-500 select-none">&gt;&nbsp;</span>}
            <span>{roleText}</span>
            <span className="w-1.5 h-4 md:h-5 bg-orange-400 animate-pulse mx-1" />
          </div>

          <p className={`text-slate-400 text-sm sm:text-base md:text-lg max-w-[680px] mb-10 ${isRtl ? "leading-[1.8] font-arabic text-slate-300 text-center lg:text-right" : "leading-relaxed text-center lg:text-left"}`}>
            {h.subtitle[lang]}
          </p>

          {/* CTAs and quick stats bar */}
          <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mb-12">
            <a
              href="#projects-section"
              className={`px-6 py-3.5 accent-gradient text-black text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-orange-500/15 flex items-center gap-2 hover:opacity-90 ${isRtl ? "font-arabic" : ""}`}
            >
              <span>{h.ctaPrimary[lang]}</span>
              <svg className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} fill="none" stroke="black" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="#contact-section"
              className={`px-6 py-3.5 border border-slate-800 hover:border-orange-500/30 text-slate-300 hover:text-white text-xs uppercase tracking-wider rounded-xl hover:bg-orange-500/[0.02] transition-all ${isRtl ? "font-arabic" : "font-mono"}`}
            >
              {h.ctaSecondary[lang]}
            </a>
          </div>

          {/* 3 Core Architecture Pillars */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-xl border-t border-white/10 pt-8">
            <div className={`text-center p-3.5 rounded-xl bg-white/[0.01] border border-white/5 ${isRtl ? "lg:text-right font-arabic" : "lg:text-left"}`}>
              <div className={`text-orange-400 text-xs mb-1 uppercase tracking-wider ${isRtl ? "font-arabic" : "font-mono"}`}>{h.pillarTitle1[lang]}</div>
              <div className={`text-[10px] text-slate-500 leading-snug ${isRtl ? "font-arabic" : ""}`}>{h.pillarDesc1[lang]}</div>
            </div>
            <div className={`text-center p-3.5 rounded-xl bg-white/[0.01] border border-white/5 ${isRtl ? "lg:text-right font-arabic" : "lg:text-left"}`}>
              <div className={`text-yellow-500 text-xs mb-1 uppercase tracking-wider ${isRtl ? "font-arabic" : "font-mono"}`}>{h.pillarTitle2[lang]}</div>
              <div className={`text-[10px] text-slate-500 leading-snug ${isRtl ? "font-arabic" : ""}`}>{h.pillarDesc2[lang]}</div>
            </div>
            <div className={`text-center p-3.5 rounded-xl bg-white/[0.01] border border-white/5 ${isRtl ? "lg:text-right font-arabic" : "lg:text-left"}`}>
              <div className={`text-amber-500 text-xs mb-1 uppercase tracking-wider ${isRtl ? "font-arabic" : "font-mono"}`}>{h.pillarTitle3[lang]}</div>
              <div className={`text-[10px] text-slate-500 leading-snug ${isRtl ? "font-arabic" : ""}`}>{h.pillarDesc3[lang]}</div>
            </div>
          </div>
        </div>

        {/* Hero Profile Illustration Column with responsive frame glow */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group">
            {/* Outer circular glowing halo */}
            <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-orange-600 via-amber-400 to-red-500 opacity-60 blur-md group-hover:opacity-80 transition-opacity duration-500" />
            
            <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-[#050505] relative z-10 bg-zinc-900">
              <img
                src="/images/developer_profile_art_1782504875526.jpg"
                alt="Habib Profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 hover:scale-105 transition-all duration-700"
              />
            </div>

            {/* Status floating tags overlay */}
            <div className={`absolute top-1/2 ${isRtl ? "-left-6" : "-right-6"} -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 bg-[#050505]/95 rounded-xl border border-white/10 shadow-xl z-20`}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className={`text-[10px] uppercase tracking-widest text-slate-300 ${isRtl ? "font-arabic" : "font-mono"}`}>{h.statusLocation[lang]}</span>
            </div>

            <div className={`absolute bottom-2 ${isRtl ? "-right-4" : "-left-4"} flex items-center gap-2 px-3 py-1.5 bg-[#050505]/95 rounded-xl border border-white/10 shadow-xl z-20`}>
              <span className="text-orange-400 text-xs">⚡</span>
              <span className={`text-[10px] uppercase tracking-widest text-slate-300 ${isRtl ? "font-arabic" : "font-mono"}`}>{h.statusExperience[lang]}</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
