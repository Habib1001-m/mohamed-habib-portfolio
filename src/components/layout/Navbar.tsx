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
          { sectionId: "hero-section", ratio: 0 }
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
  }, []);

  const desktopLinkClass = (sectionId: string) => {
    const isActive = activeSection === sectionId;
    return `min-h-9 inline-flex items-center rounded-[var(--habib-radius-md)] border px-4 text-xs transition-all ${
      isRtl ? "font-arabic" : "font-mono uppercase tracking-wider"
    } ${
      isActive
        ? "border-orange-500/20 bg-orange-500/[0.08] text-orange-300"
        : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.03] hover:text-white"
    }`;
  };

  const mobileLinkClass = (sectionId: string) => {
    const isActive = activeSection === sectionId;
    return `min-h-11 rounded-[var(--habib-radius-md)] border px-4 py-3 text-sm transition-all ${
      isActive
        ? "border-orange-500/30 bg-orange-500/[0.07] text-orange-300"
        : "border-[var(--habib-border-soft)] bg-black/25 text-slate-300 hover:border-orange-500/25 hover:bg-orange-500/[0.03] hover:text-white"
    }`;
  };

  return (
    <nav id="app-navbar" className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--habib-border)] bg-[var(--habib-bg)]/82 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <a href="#hero-section" onClick={closeMenu} className="flex items-center gap-2.5 group" aria-label="Mohamed Habib portfolio home">
          <div className="w-9 h-9 rounded-[var(--habib-radius-md)] accent-gradient flex items-center justify-center text-black font-black text-base font-mono transition-transform group-hover:scale-105 shadow-lg shadow-orange-500/10">
            H
          </div>
          <span className="font-mono text-xs tracking-wider text-slate-400 group-hover:text-orange-400 transition-colors">
            habib.systems
          </span>
        </a>

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
            className={`ml-2 ds-action ds-action-primary min-h-9 px-4 py-2 text-xs ${isRtl ? "font-arabic" : "font-mono uppercase tracking-wider"}`}
          >
            {nav.contact[lang]}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="lang-toggle-btn"
            type="button"
            onClick={() => setLang((prev) => (prev === "ar" ? "en" : "ar"))}
            aria-label={lang === "ar" ? "Switch to English" : "تغيير اللغة إلى العربية"}
            className="ds-action min-h-9 px-3 py-1.5 cursor-pointer font-mono"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5c-.006 2.16-.723 4.192-2.017 5.83m-2.664-3.417A17.95 17.95 0 015.631 5h1.22" />
            </svg>
            <span>{lang === "ar" ? "English" : "العربية"}</span>
          </button>

          <button
            id="mobile-menu-toggle"
            type="button"
            aria-label={isMenuOpen ? (isRtl ? "إغلاق القائمة" : "Close menu") : (isRtl ? "فتح القائمة" : "Open menu")}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden ds-action min-h-9 w-9 px-0 py-0 text-slate-300 hover:text-orange-400"
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

      <div
        id="mobile-nav-menu"
        className={`md:hidden border-t border-[var(--habib-border)] bg-[var(--habib-bg)]/96 backdrop-blur-xl transition-all duration-200 ${isMenuOpen ? "block" : "hidden"}`}
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
            className="mt-1 ds-action ds-action-primary w-full"
          >
            {nav.contact[lang]}
          </a>
        </div>
      </div>
    </nav>
  );
}
