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
          observer.disconnect(); // Once visible, keep loaded
        }
      },
      { rootMargin: "200px" } // Load 200px before reaching viewport
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="interactive-sandbox" className="py-24 border-t border-white/5 bg-slate-950/40 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-orange-500 uppercase tracking-widest">// THREEJS_ENGINE_MODULE_ACTIVE</span>
          <h2 className={`text-3xl md:text-4xl font-black text-white tracking-tight ${isRtl ? "font-arabic" : ""}`}>
            {lang === "ar" ? "معمل الهياكل ثلاثية الأبعاد التفاعلية" : "Interactive Systems Visualizer"}
          </h2>
          <p className={`text-slate-400 text-sm md:text-base leading-relaxed ${isRtl ? "font-arabic" : ""}`}>
            {lang === "ar"
              ? "قم بتخصيص وتدوير العقد ثلاثية الأبعاد التي تمثل محركات نظام حبيب البرمجية للتعرف على طريقة تنسيق تدفقات البيانات."
              : "Configure and manipulate the live 3D nodes that power Habib's product systems to understand how data flows in real-time."}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3D canvas with viewport observer guard */}
          <div className="lg:col-span-7 w-full h-[400px] md:h-[500px]">
            {isInViewport ? (
              <Suspense
                fallback={
                  <div className="w-full h-full bg-[#050505]/40 border border-white/10 rounded-2xl flex flex-col items-center justify-center font-mono text-xs text-slate-500 gap-3">
                    <span className="w-8 h-8 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin"></span>
                    <span>Initializing WebGL Scene...</span>
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
              <div className="w-full h-full bg-[#050505]/20 border border-white/5 rounded-2xl flex items-center justify-center font-mono text-xs text-slate-600">
                Approaching 3D viewport triggers WebGL setup
              </div>
            )}
          </div>

          {/* Right: Controls dashboard panel */}
          <div className="lg:col-span-5 w-full">
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
