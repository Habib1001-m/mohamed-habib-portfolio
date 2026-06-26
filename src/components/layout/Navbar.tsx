import React from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioContent";

interface NavbarProps {
  lang: "en" | "ar";
  setLang: React.Dispatch<React.SetStateAction<"en" | "ar">>;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const nav = PORTFOLIO_DATA.navigation;

  return (
    <nav id="app-navbar" className="fixed top-0 left-0 right-0 z-40 bg-[#050505]/80 glass border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero-section" className="flex items-center gap-2.5 group" aria-label="Mohamed Habib portfolio home">
          <div className="w-9 h-9 rounded-xl accent-gradient flex items-center justify-center text-black font-black text-base font-mono transition-transform group-hover:scale-105">
            H
          </div>
          <span className="font-mono text-xs tracking-wider text-slate-400 group-hover:text-orange-400 transition-colors">
            habib.systems
          </span>
        </a>

        {/* Nav list */}
        <div className="hidden md:flex items-center gap-1" role="navigation">
          <a href="#about-section" className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
            {nav.about[lang]}
          </a>
          <a href="#projects-section" className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
            {nav.projects[lang]}
          </a>
          <a href="#experience-section" className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
            {nav.experience[lang]}
          </a>
          <a href="#stack-section" className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
            {nav.stack[lang]}
          </a>
          <a href="#contact-section" className="ml-2 px-4 py-2 text-xs font-mono uppercase tracking-wider text-black font-black accent-gradient rounded-lg transition-all shadow-lg shadow-orange-500/10 hover:opacity-90">
            {nav.contact[lang]}
          </a>
        </div>

        {/* Localization Toggle Button */}
        <button
          id="lang-toggle-btn"
          type="button"
          onClick={() => setLang((prev) => (prev === "ar" ? "en" : "ar"))}
          aria-label={lang === "ar" ? "Switch to English" : "تغيير اللغة إلى العربية"}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-orange-500/30 bg-white/[0.02] hover:bg-orange-500/[0.03] text-xs font-mono text-slate-300 hover:text-orange-400 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5c-.006 2.16-.723 4.192-2.017 5.83m-2.664-3.417A17.95 17.95 0 015.631 5h1.22" />
          </svg>
          <span>{lang === "ar" ? "English" : "العربية"}</span>
        </button>
      </div>
    </nav>
  );
}
