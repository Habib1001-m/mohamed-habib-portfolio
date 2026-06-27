import React, { useState } from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioContent";

interface NavbarProps {
  lang: "en" | "ar";
  setLang: React.Dispatch<React.SetStateAction<"en" | "ar">>;
}

const NAV_ITEMS = [
  { key: "about", href: "#about-section" },
  { key: "projects", href: "#projects-section" },
  { key: "experience", href: "#experience-section" },
  { key: "stack", href: "#stack-section" },
] as const;

export default function Navbar({ lang, setLang }: NavbarProps) {
  const nav = PORTFOLIO_DATA.navigation;
  const isRtl = lang === "ar";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav id="app-navbar" className="fixed top-0 left-0 right-0 z-40 bg-[#050505]/80 glass border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <a href="#hero-section" onClick={closeMenu} className="flex items-center gap-2.5 group" aria-label="Mohamed Habib portfolio home">
          <div className="w-9 h-9 rounded-xl accent-gradient flex items-center justify-center text-black font-black text-base font-mono transition-transform group-hover:scale-105">
            H
          </div>
          <span className="font-mono text-xs tracking-wider text-slate-400 group-hover:text-orange-400 transition-colors">
            habib.systems
          </span>
        </a>

        {/* Desktop nav list */}
        <div className="hidden md:flex items-center gap-1" role="navigation" aria-label={isRtl ? "التنقل الرئيسي" : "Primary navigation"}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`px-4 py-2 text-xs rounded-lg hover:bg-white/5 transition-all ${isRtl ? "font-arabic text-slate-400 hover:text-white" : "font-mono uppercase tracking-wider text-slate-400 hover:text-white"}`}
            >
              {nav[item.key][lang]}
            </a>
          ))}
          <a href="#contact-section" className={`ml-2 px-4 py-2 text-xs text-black font-black accent-gradient rounded-lg transition-all shadow-lg shadow-orange-500/10 hover:opacity-90 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-wider"}`}>
            {nav.contact[lang]}
          </a>
        </div>

        <div className="flex items-center gap-2">
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

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            type="button"
            aria-label={isMenuOpen ? (isRtl ? "إغلاق القائمة" : "Close menu") : (isRtl ? "فتح القائمة" : "Open menu")}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden w-9 h-9 rounded-lg border border-white/10 bg-white/[0.02] text-slate-300 hover:text-orange-400 hover:border-orange-500/30 transition-all flex items-center justify-center"
          >
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden="true">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-nav-menu"
        className={`md:hidden border-t border-white/10 bg-[#050505]/95 transition-all duration-200 ${isMenuOpen ? "block" : "hidden"}`}
      >
        <div className={`max-w-7xl mx-auto px-6 py-4 grid gap-2 ${isRtl ? "text-right font-arabic" : "text-left"}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={closeMenu}
              className="px-4 py-3 rounded-xl border border-white/5 bg-white/[0.015] text-sm text-slate-300 hover:text-white hover:border-orange-500/25 hover:bg-orange-500/[0.03] transition-all"
            >
              {nav[item.key][lang]}
            </a>
          ))}
          <a
            href="#contact-section"
            onClick={closeMenu}
            className="mt-1 px-4 py-3 rounded-xl accent-gradient text-black text-sm font-bold transition-all"
          >
            {nav.contact[lang]}
          </a>
        </div>
      </div>
    </nav>
  );
}
