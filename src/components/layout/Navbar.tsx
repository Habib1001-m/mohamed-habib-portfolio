import React, { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioContent";

interface NavbarProps {
  lang: "en" | "ar";
  setLang: React.Dispatch<React.SetStateAction<"en" | "ar">>;
}

const NAV_ITEMS = [
  { key: "about", href: "#about-section", sectionId: "about-section" },
  { key: "projects", href: "#projects-section", sectionId: "projects-section" },
  { key: "experience", href: "#experience-section", sectionId: "experience-section" },
  { key: "stack", href: "#stack-section", sectionId: "stack-section" },
  { key: "contact", href: "#contact-section", sectionId: "contact-section" },
] as const;

export default function Navbar({ lang, setLang }: NavbarProps) {
  const nav = PORTFOLIO_DATA.navigation;
  const isRtl = lang === "ar";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero-section");

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const sectionIds = ["hero-section", ...NAV_ITEMS.map((item) => item.sectionId)];
    const visibleMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleMap.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        const best = sectionIds.reduce(
          (currentBest, sectionId) => {
            const ratio = visibleMap.get(sectionId) ?? 0;
            return ratio > currentBest.ratio ? { sectionId, ratio } : currentBest;
          },
          { sectionId: activeSection, ratio: 0 }
        );

        if (best.ratio > 0.1) {
          setActiveSection(best.sectionId);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75] }
    );

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [activeSection]);

  const desktopLinkClass = (sectionId: string) => {
    const isActive = activeSection === sectionId;
    return `px-4 py-2 text-xs rounded-lg transition-all ${
      isRtl ? "font-arabic" : "font-mono uppercase tracking-wider"
    } ${
      isActive
        ? "text-orange-300 bg-orange-500/[0.08] border border-orange-500/20"
        : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
    }`;
  };

  const mobileLinkClass = (sectionId: string) => {
    const isActive = activeSection === sectionId;
    return `px-4 py-3 rounded-xl border text-sm transition-all ${
      isActive
        ? "border-orange-500/30 bg-orange-500/[0.07] text-orange-300"
        : "border-white/5 bg-white/[0.015] text-slate-300 hover:text-white hover:border-orange-500/25 hover:bg-orange-500/[0.03]"
    }`;
  };

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
          {NAV_ITEMS.slice(0, 4).map((item) => (
            <a
              key={item.key}
              href={item.href}
              aria-current={activeSection === item.sectionId ? "page" : undefined}
              className={desktopLinkClass(item.sectionId)}
            >
              {nav[item.key][lang]}
            </a>
          ))}
          <a
            href="#contact-section"
            aria-current={activeSection === "contact-section" ? "page" : undefined}
            className={`ml-2 px-4 py-2 text-xs text-black font-black accent-gradient rounded-lg transition-all shadow-lg shadow-orange-500/10 hover:opacity-90 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-wider"}`}
          >
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
          {NAV_ITEMS.slice(0, 4).map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={closeMenu}
              aria-current={activeSection === item.sectionId ? "page" : undefined}
              className={mobileLinkClass(item.sectionId)}
            >
              {nav[item.key][lang]}
            </a>
          ))}
          <a
            href="#contact-section"
            onClick={closeMenu}
            aria-current={activeSection === "contact-section" ? "page" : undefined}
            className="mt-1 px-4 py-3 rounded-xl accent-gradient text-black text-sm font-bold transition-all"
          >
            {nav.contact[lang]}
          </a>
        </div>
      </div>
    </nav>
  );
}
