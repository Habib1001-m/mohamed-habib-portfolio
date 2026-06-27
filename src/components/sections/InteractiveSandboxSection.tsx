import React, { useState, useEffect, Suspense, lazy } from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioContent";
import ThreeModelCustomizer from "../ThreeModelCustomizer";

// Lazy load ThreeCanvas for optimized performance and better bundle delivery
const ThreeCanvas = lazy(() => import("../ThreeCanvas"));

interface InteractiveSandboxSectionProps {
  lang: "en" | "ar";
}

export default function InteractiveSandboxSection({ lang }: InteractiveSandboxSectionProps) {
  const isRtl = lang === "ar";
  const t = PORTFOLIO_DATA.playground3D;
  const [isInViewport, setIsInViewport] = useState(false);

  // Localized state variables for ThreeJS, completely decoupled from App.tsx
  const [color, setColor] = useState("#3b82f6");
  const [wireframe, setWireframe] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1.2);
  const [showParticles, setShowParticles] = useState(true);
  const [activePreset, setActivePreset] = useState("ai-agent");

  // IntersectionObserver to lazy load the 3D scene only when the section is near viewport
  useEffect(() => {
    const element = document.getElementById("interactive-sandbox");
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="interactive-sandbox" className="py-20 border-y border-white/5 bg-[#050505]/70 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`grid lg:grid-cols-12 gap-8 lg:gap-10 items-start ${isRtl ? "font-arabic" : ""}`}>
          {/* Editorial section copy */}
          <div className={`lg:col-span-4 ${isRtl ? "text-right" : "text-left"}`}>
            <span className={`text-[10px] text-orange-400 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-[0.22em]"}`}>
              {isRtl ? "مختبر اختياري" : "Optional systems lab"}
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-white leading-tight">
              {t.title[lang]}
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-400 leading-relaxed max-w-md">
              {t.subtitle[lang]}
            </p>
            <p className="mt-5 text-xs text-slate-600 leading-relaxed max-w-md">
              {isRtl
                ? "تم نقله بعد المشاريع حتى يظل الهيرو وقصة الأعمال أكثر وضوحًا قبل الدخول في التجربة التفاعلية."
                : "Moved below the work section so the portfolio story stays clear before the interactive experiment."}
            </p>
          </div>

          {/* Compact lab canvas and controls */}
          <div className="lg:col-span-8 grid md:grid-cols-12 gap-5 items-stretch">
            <div className="md:col-span-7 w-full h-[300px] md:h-[360px]">
              {isInViewport ? (
                <Suspense
                  fallback={
                    <div className="w-full h-full bg-white/[0.015] border border-white/10 rounded-2xl flex flex-col items-center justify-center font-mono text-xs text-slate-500 gap-3">
                      <span className="w-7 h-7 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
                      <span>{isRtl ? "جاري تجهيز WebGL..." : "Initializing WebGL..."}</span>
                    </div>
                  }
                >
                  <ThreeCanvas
                    lang={lang}
                    color={color}
                    wireframe={wireframe}
                    rotationSpeed={rotationSpeed}
                    showParticles={showParticles}
                    activePreset={activePreset}
                  />
                </Suspense>
              ) : (
                <div className="w-full h-full bg-white/[0.01] border border-white/5 rounded-2xl flex items-center justify-center font-mono text-xs text-slate-600">
                  {isRtl ? "يتم تحميل التجربة عند الاقتراب" : "Approach the section to load the lab"}
                </div>
              )}
            </div>

            <div className="md:col-span-5 w-full">
              <ThreeModelCustomizer
                lang={lang}
                color={color}
                setColor={setColor}
                wireframe={wireframe}
                setWireframe={setWireframe}
                rotationSpeed={rotationSpeed}
                setRotationSpeed={setRotationSpeed}
                showParticles={showParticles}
                setShowParticles={setShowParticles}
                activePreset={activePreset}
                setActivePreset={setActivePreset}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
