import React, { useState, useEffect, Suspense, lazy } from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioContent";
import ThreeModelCustomizer from "../ThreeModelCustomizer";
import ArchitecturePresetOverlay from "../ArchitecturePresetOverlay";

const ThreeCanvas = lazy(() => import("../ThreeCanvas"));

interface InteractiveSandboxSectionProps {
  lang: "en" | "ar";
}

export default function InteractiveSandboxSection({ lang }: InteractiveSandboxSectionProps) {
  const isRtl = lang === "ar";
  const t = PORTFOLIO_DATA.playground3D;
  const [isInViewport, setIsInViewport] = useState(false);

  const [color, setColor] = useState("#FF3E00");
  const [wireframe, setWireframe] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1.15);
  const [showParticles, setShowParticles] = useState(true);
  const [activePreset, setActivePreset] = useState("portfolio");

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
      { rootMargin: "180px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const proofSignals = [t.proofSignal1[lang], t.proofSignal2[lang], t.proofSignal3[lang]];

  return (
    <section id="interactive-sandbox" className="py-20 md:py-24 border-y border-white/5 bg-[#050505] relative overflow-hidden max-w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(255,62,0,0.08),transparent_32%),radial-gradient(circle_at_20%_78%,rgba(59,130,246,0.06),transparent_34%)] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 relative z-10 overflow-hidden">
        <div className={`grid lg:grid-cols-12 gap-7 lg:gap-10 items-end mb-8 min-w-0 ${isRtl ? "font-arabic" : ""}`}>
          <div className={`lg:col-span-7 min-w-0 ${isRtl ? "text-right" : "text-left"}`}>
            <span className={`text-[10px] text-orange-400 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-[0.24em]"}`}>
              {t.eyebrow[lang]}
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white leading-[1.05] max-w-2xl">
              {t.title[lang]}
            </h2>
            <p className="mt-5 text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
              {t.subtitle[lang]}
            </p>
          </div>

          <div className="lg:col-span-5 min-w-0 flex lg:grid lg:grid-cols-1 gap-3 overflow-x-auto pb-1 lg:overflow-visible lg:pb-0">
            {proofSignals.map((signal) => (
              <div key={signal} className={`min-w-[210px] max-w-[78vw] lg:max-w-none lg:min-w-0 rounded-2xl bg-white/[0.025] border border-white/10 px-4 py-3 glass ${isRtl ? "text-right" : "text-left"}`}>
                <div className="flex items-center gap-2 text-orange-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_18px_rgba(255,62,0,0.7)]" />
                  <span className={`text-[10px] ${isRtl ? "font-arabic" : "font-mono uppercase tracking-[0.18em]"}`}>{signal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`grid lg:grid-cols-12 gap-6 lg:gap-8 items-start min-w-0 ${isRtl ? "font-arabic" : ""}`}>
          <div className="lg:col-span-8 min-w-0 max-w-full">
            <div className="rounded-[1.75rem] border border-orange-500/10 bg-zinc-950/70 shadow-2xl shadow-orange-500/5 overflow-hidden glass max-w-full">
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.7)]" />
                  <span className={`text-[10px] text-slate-300 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-[0.18em]"}`}>{t.canvasStatus[lang]}</span>
                </div>
                <span className={`hidden sm:block text-[10px] text-slate-600 max-w-[240px] ${isRtl ? "font-arabic text-right" : "font-mono uppercase tracking-[0.16em] text-right"}`}>{t.canvasHint[lang]}</span>
              </div>

              <div className="w-full max-w-full h-[340px] sm:h-[390px] md:h-[430px] xl:h-[480px] p-3 overflow-hidden">
                {isInViewport ? (
                  <div className="relative w-full h-full max-w-full overflow-hidden">
                    <Suspense
                      fallback={
                        <div className="w-full h-full bg-white/[0.015] border border-white/10 rounded-2xl flex flex-col items-center justify-center font-mono text-xs text-slate-500 gap-3">
                          <span className="w-7 h-7 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
                          <span>{isRtl ? "جاري تجهيز طبقة WebGL..." : "Initializing WebGL architecture layer..."}</span>
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
                    <ArchitecturePresetOverlay lang={lang} activePreset={activePreset} />
                  </div>
                ) : (
                  <div className="w-full h-full bg-white/[0.01] border border-white/5 rounded-2xl flex items-center justify-center font-mono text-xs text-slate-600">
                    {isRtl ? "يتم تحميل المختبر عند الاقتراب" : "Approach the lab to load the proof layer"}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 min-w-0 max-w-full lg:sticky lg:top-24 overflow-hidden">
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
    </section>
  );
}
