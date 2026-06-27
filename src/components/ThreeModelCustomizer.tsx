import { useState } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioContent";
import { ARCHITECTURE_PRESETS, PRESET_ORDER, getArchitecturePreset } from "../data/architecturePresets";

interface ThreeModelCustomizerProps {
  lang: "en" | "ar";
  color: string;
  setColor: (color: string) => void;
  wireframe: boolean;
  setWireframe: (w: boolean) => void;
  rotationSpeed: number;
  setRotationSpeed: (speed: number) => void;
  showParticles: boolean;
  setShowParticles: (show: boolean) => void;
  activePreset: string;
  setActivePreset: (preset: string) => void;
}

const COLORS = [
  { hex: "#FF3E00", label: { en: "Orange", ar: "برتقالي" } },
  { hex: "#FFBE00", label: { en: "Gold", ar: "ذهبي" } },
  { hex: "#3b82f6", label: { en: "Blue", ar: "أزرق" } },
  { hex: "#22d3ee", label: { en: "Cyan", ar: "سماوي" } },
  { hex: "#a855f7", label: { en: "Purple", ar: "بنفسجي" } },
];

const toneClass = {
  orange: "border-orange-500/30 text-orange-300 bg-orange-500/10",
  yellow: "border-yellow-500/30 text-yellow-300 bg-yellow-500/10",
  cyan: "border-cyan-500/30 text-cyan-300 bg-cyan-500/10",
  purple: "border-purple-500/30 text-purple-300 bg-purple-500/10",
  slate: "border-slate-500/30 text-slate-300 bg-slate-500/10",
};

const activeButtonClass = {
  orange: "bg-orange-500/10 border-orange-500/45 text-orange-300",
  yellow: "bg-yellow-500/10 border-yellow-500/45 text-yellow-300",
  cyan: "bg-cyan-500/10 border-cyan-500/45 text-cyan-300",
  purple: "bg-purple-500/10 border-purple-500/45 text-purple-300",
  slate: "bg-slate-500/10 border-slate-500/45 text-slate-300",
};

export default function ThreeModelCustomizer({
  lang,
  color,
  setColor,
  wireframe,
  setWireframe,
  rotationSpeed,
  setRotationSpeed,
  showParticles,
  setShowParticles,
  activePreset,
  setActivePreset,
}: ThreeModelCustomizerProps) {
  const t = PORTFOLIO_DATA.playground3D;
  const isRtl = lang === "ar";
  const activeMeta = getArchitecturePreset(activePreset);
  const presets = PRESET_ORDER.map((id) => ARCHITECTURE_PRESETS[id]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handlePresetChange = (presetId: string) => {
    const preset = getArchitecturePreset(presetId);
    setActivePreset(preset.id);
    setColor(preset.accent);
    setWireframe(preset.wireframe);
    setRotationSpeed(preset.speed);
    setShowParticles(preset.particles);
  };

  const labelClass = `text-[10px] text-slate-500 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-[0.18em]"}`;
  const presetButtonClass = `shrink-0 lg:shrink px-3 py-2.5 text-[11px] rounded-xl border transition-all w-[210px] max-w-[78vw] lg:w-auto lg:max-w-none ${isRtl ? "text-right font-arabic" : "text-left font-mono"}`;
  const proofTitle = isRtl ? "لماذا هذا مهم؟" : "Why this matters";
  const proofNote = isRtl
    ? "هذا القسم يوضح طريقة تفكيري قبل التنفيذ: حدود النظام، تدفق البيانات، مسارات المستخدم، ونقاط الإثبات التي تجعل المنتج قابلًا للتشغيل لا مجرد واجهة جميلة."
    : "This section demonstrates how I think before implementation: system boundaries, data flow, user paths, and proof points that make a product operational, not just visually polished.";

  return (
    <div id="three-customizer" className={`w-full max-w-full overflow-hidden flex flex-col gap-4 p-4 md:p-5 rounded-[1.5rem] bg-zinc-950/80 border border-white/10 shadow-2xl glass ${isRtl ? "font-arabic" : ""}`}>
      <div className="min-w-0">
        <h3 className="text-white font-bold text-base mb-1 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_16px_rgba(255,62,0,0.75)]" />
          {t.consoleTitle[lang]}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed break-words">
          {t.consoleSubtitle[lang]}
        </p>
      </div>

      <div className="rounded-2xl bg-black/40 border border-white/10 p-4 space-y-3 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <span className={labelClass}>{isRtl ? "حالة النظام" : "System state"}</span>
          <span className={`px-2 py-1 rounded-md border text-[10px] ${toneClass[activeMeta.tone]} ${isRtl ? "font-arabic" : "font-mono uppercase tracking-wider"}`}>
            {activeMeta.shortLabel[lang]}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-sm text-white font-semibold leading-relaxed break-words">{activeMeta.mode[lang]}</p>
          <p className="text-[11px] text-slate-400 leading-relaxed mt-1 break-words">{activeMeta.signal[lang]}</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className={isRtl ? "font-arabic" : "font-mono uppercase tracking-wider"}>{activeMeta.state[lang]}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 min-w-0">
        <div className="rounded-xl bg-white/[0.015] border border-white/5 p-3 min-w-0">
          <span className={labelClass}>{isRtl ? "العقد" : "Nodes"}</span>
          <p className="mt-1 text-lg font-black text-white font-mono">{activeMeta.nodes.length}</p>
        </div>
        <div className="rounded-xl bg-white/[0.015] border border-white/5 p-3 min-w-0">
          <span className={labelClass}>{isRtl ? "المسارات" : "Links"}</span>
          <p className="mt-1 text-lg font-black text-white font-mono">{activeMeta.links.length}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 min-w-0">
        <label className={labelClass}>{t.controlPreset[lang]}</label>
        <div className="relative min-w-0">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-zinc-950/90 to-transparent z-10 lg:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-950/90 to-transparent z-10 lg:hidden" />
          <div className="w-full max-w-full min-w-0 flex lg:grid lg:grid-cols-1 gap-2 overflow-x-auto overflow-y-hidden pb-1 lg:overflow-visible lg:pb-0 scroll-smooth">
            {presets.map((preset) => (
              <button
                key={preset.id}
                id={`preset-${preset.id}`}
                type="button"
                onClick={() => handlePresetChange(preset.id)}
                className={`${presetButtonClass} ${activePreset === preset.id ? activeButtonClass[preset.tone] : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5 hover:border-white/10"}`}
              >
                <span className="block truncate">{preset.label[lang]}</span>
                <span className="block mt-1 text-[10px] opacity-70 truncate">{preset.state[lang]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-black/30 border border-white/5 p-3 space-y-2 min-w-0">
        <span className={labelClass}>{isRtl ? "مؤشرات معمارية" : "Architecture signals"}</span>
        <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-1.5">
          {activeMeta.signals.slice(0, 3).map((signal) => (
            <div key={signal.en} className="flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed min-w-0">
              <span className="text-orange-400 mt-0.5">•</span>
              <span className="break-words">{signal[lang]}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowAdvanced((value) => !value)}
        className={`flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.015] px-3 py-2 text-[11px] text-slate-400 hover:text-white hover:border-orange-500/30 transition-colors ${isRtl ? "font-arabic" : "font-mono uppercase tracking-[0.16em]"}`}
        aria-expanded={showAdvanced}
      >
        <span>{isRtl ? "إعدادات متقدمة" : "Advanced controls"}</span>
        <span>{showAdvanced ? "−" : "+"}</span>
      </button>

      {showAdvanced && (
        <div className="space-y-4 rounded-2xl border border-white/5 bg-black/25 p-3 min-w-0 overflow-hidden">
          <div className="flex flex-col gap-2.5 min-w-0">
            <label id="color-picker-label" className={labelClass}>{t.controlColor[lang]}</label>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="color-picker-label">
              {COLORS.map((c) => (
                <button
                  key={c.hex}
                  id={`color-btn-${c.hex.substring(1)}`}
                  type="button"
                  onClick={() => {
                    setColor(c.hex);
                    setActivePreset("custom");
                  }}
                  style={{ backgroundColor: c.hex }}
                  title={c.label[lang]}
                  aria-label={c.label[lang]}
                  className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center ${
                    color.toLowerCase() === c.hex.toLowerCase()
                      ? "border-white scale-105 shadow-lg shadow-white/10"
                      : "border-transparent"
                  }`}
                >
                  {color.toLowerCase() === c.hex.toLowerCase() && (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 min-w-0">
            <div className="flex flex-col gap-2 min-w-0">
              <label htmlFor="toggle-wireframe" className={labelClass}>{t.controlWireframe[lang]}</label>
              <button
                id="toggle-wireframe"
                type="button"
                aria-pressed={wireframe}
                onClick={() => {
                  setWireframe(!wireframe);
                  setActivePreset("custom");
                }}
                className={`px-3 py-2 text-[11px] rounded-lg border transition-all ${isRtl ? "font-arabic" : "font-mono"} ${
                  wireframe
                    ? "bg-orange-500/10 border-orange-500/40 text-orange-300 font-semibold"
                    : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5"
                }`}
              >
                {wireframe ? (isRtl ? "نشط" : "On") : (isRtl ? "مغلق" : "Off")}
              </button>
            </div>

            <div className="flex flex-col gap-2 min-w-0">
              <label htmlFor="toggle-particles" className={labelClass}>{t.controlParticle[lang]}</label>
              <button
                id="toggle-particles"
                type="button"
                aria-pressed={showParticles}
                onClick={() => {
                  setShowParticles(!showParticles);
                  setActivePreset("custom");
                }}
                className={`px-3 py-2 text-[11px] rounded-lg border transition-all ${isRtl ? "font-arabic" : "font-mono"} ${
                  showParticles
                    ? "bg-orange-500/10 border-orange-500/40 text-orange-300 font-semibold"
                    : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5"
                }`}
              >
                {showParticles ? (isRtl ? "نشط" : "On") : (isRtl ? "مغلق" : "Off")}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 min-w-0">
            <div className="flex items-center justify-between">
              <label htmlFor="speed-range-slider" className={labelClass}>{t.controlSpeed[lang]}</label>
              <span className="text-[11px] font-mono text-orange-400">{rotationSpeed.toFixed(1)}x</span>
            </div>
            <input
              id="speed-range-slider"
              type="range"
              min="0.0"
              max="3.0"
              step="0.1"
              value={rotationSpeed}
              aria-label={t.controlSpeed[lang]}
              onChange={(e) => {
                setRotationSpeed(parseFloat(e.target.value));
                setActivePreset("custom");
              }}
              className="w-full max-w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl min-w-0">
        <div className="flex items-start gap-2.5">
          <span className="text-orange-400 text-xs mt-0.5 select-none">•</span>
          <div>
            <p className={`text-[10px] text-orange-300 mb-1 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-[0.16em]"}`}>
              {proofTitle}
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed break-words">
              {proofNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
