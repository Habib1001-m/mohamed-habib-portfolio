import { useState } from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioContent";
import { TECH_STACK } from "../../data/techStack";

interface TechStackSectionProps {
  lang: "en" | "ar";
}

function CodeIcon() {
  return (
    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

const DEFAULT_TECH_CATEGORY = TECH_STACK[0]?.id ?? "frontend";

export default function TechStackSection({ lang }: TechStackSectionProps) {
  const skl = PORTFOLIO_DATA.skills;
  const isRtl = lang === "ar";
  const [activeTechCategory, setActiveTechCategory] = useState(DEFAULT_TECH_CATEGORY);
  const activeCategory = TECH_STACK.find((c) => c.id === activeTechCategory) ?? TECH_STACK[0];

  return (
    <section id="stack-section" className="py-24 border-t border-white/5 relative">
      <div className="ds-shell">
        <div className={isRtl ? "font-arabic text-right" : ""}>
          <div className="ds-section-heading mb-4">
            <span className="ds-kicker text-orange-500">{skl.sectionNum}</span>
            <h2 className={`ds-section-title ${isRtl ? "font-arabic" : "uppercase"}`}>{skl.title[lang]}</h2>
            <div className="ds-section-rule" />
          </div>
          <p className={`ds-muted-copy text-sm md:text-base mb-12 max-w-5xl ${isRtl ? "font-arabic" : ""}`}>
            {skl.subtitle[lang]}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div role="tablist" aria-label={lang === "ar" ? "الفئات التقنية" : "Technical Categories"} className="lg:col-span-4 flex flex-col gap-2">
            {TECH_STACK.map((cat) => {
              const isActive = activeCategory?.id === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`tech-cat-${cat.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="tech-items-panel"
                  type="button"
                  onClick={() => setActiveTechCategory(cat.id)}
                  className={`ds-action w-full justify-between px-5 py-4 text-xs sm:text-sm cursor-pointer ${
                    isActive ? "ds-action-accent font-bold shadow-lg shadow-orange-500/5" : ""
                  } ${isRtl ? "text-right flex-row-reverse font-arabic" : "text-left font-mono uppercase tracking-wider"}`}
                >
                  <span>{cat.title[lang]}</span>
                  {cat.id === "frontend" && <CodeIcon />}
                  {cat.id === "backend-data" && <GlobeIcon />}
                  {cat.id === "infrastructure" && <ServerIcon />}
                  {cat.id === "automation-ai" && <span className="text-orange-400 font-mono text-xs font-bold">[AI]</span>}
                  {cat.id === "systems-practices" && <span className="text-amber-500 font-mono text-xs font-bold">[ARCH]</span>}
                  {cat.id === "product-ops" && <span className="text-yellow-500 font-mono text-xs font-bold">[SYS]</span>}
                </button>
              );
            })}
          </div>

          <div
            id="tech-items-panel"
            role="tabpanel"
            aria-labelledby={`tech-cat-${activeCategory?.id ?? DEFAULT_TECH_CATEGORY}`}
            className="lg:col-span-8 ds-panel p-6 sm:p-8 min-h-[280px] flex flex-col justify-center"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {activeCategory?.items.map((item, idx) => (
                <div
                  key={idx}
                  id={`tech-item-${idx}`}
                  className={`ds-card ds-card-hover flex items-center gap-3 p-3.5 group ${isRtl ? "flex-row-reverse text-right" : ""}`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500/30 group-hover:bg-orange-400 transition-colors" />
                  <span className="text-sm font-mono text-slate-300 group-hover:text-white transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
