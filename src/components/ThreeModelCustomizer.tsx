import { PORTFOLIO_DATA } from "../data/portfolioContent";

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

  const handlePresetChange = (presetId: string) => {
    setActivePreset(presetId);
    switch (presetId) {
      case "quickshed":
        setColor("#FFBE00");
        setWireframe(false);
        setRotationSpeed(2.0);
        setShowParticles(true);
        break;
      case "sieve":
        setColor("#22d3ee");
        setWireframe(true);
        setRotationSpeed(0.5);
        setShowParticles(true);
        break;
      case "ai-agent":
        setColor("#FF3E00");
        setWireframe(false);
        setRotationSpeed(1.2);
        setShowParticles(false);
        break;
      case "data-stream":
        setColor("#a855f7");
        setWireframe(false);
        setRotationSpeed(2.5);
        setShowParticles(true);
        break;
      default:
        break;
    }
  };

  const labelClass = `text-[10px] text-slate-500 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-[0.18em]"}`;
  const buttonBase = `px-3 py-2 text-[11px] rounded-lg border transition-all ${isRtl ? "text-right font-arabic" : "text-left font-mono"}`;

  return (
    <div id="three-customizer" className={`flex flex-col gap-4 p-5 rounded-2xl bg-white/[0.025] border border-white/10 shadow-xl ${isRtl ? "font-arabic" : ""}`}>
      <div>
        <h3 className="text-white font-semibold text-base mb-1 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          {t.title[lang]}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          {t.subtitle[lang]}
        </p>
      </div>

      <div className="h-px bg-white/5" />

      <div className="flex flex-col gap-2">
        <label className={labelClass}>{t.controlPreset[lang]}</label>
        <div className="grid grid-cols-1 gap-2">
          <button
            id="preset-quickshed"
            type="button"
            onClick={() => handlePresetChange("quickshed")}
            className={`${buttonBase} ${activePreset === "quickshed" ? "bg-yellow-500/10 border-yellow-500/45 text-yellow-300" : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5"}`}
          >
            {t.presetQuickShed[lang]}
          </button>
          <button
            id="preset-sieve"
            type="button"
            onClick={() => handlePresetChange("sieve")}
            className={`${buttonBase} ${activePreset === "sieve" ? "bg-cyan-500/10 border-cyan-500/45 text-cyan-300" : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5"}`}
          >
            {t.presetSieve[lang]}
          </button>
          <button
            id="preset-ai-agent"
            type="button"
            onClick={() => handlePresetChange("ai-agent")}
            className={`${buttonBase} ${activePreset === "ai-agent" ? "bg-orange-500/10 border-orange-500/45 text-orange-300" : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5"}`}
          >
            {t.presetAI[lang]}
          </button>
          <button
            id="preset-data-stream"
            type="button"
            onClick={() => handlePresetChange("data-stream")}
            className={`${buttonBase} ${activePreset === "data-stream" ? "bg-purple-500/10 border-purple-500/45 text-purple-300" : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5"}`}
          >
            {t.presetData[lang]}
          </button>
        </div>
      </div>

      <div className="h-px bg-white/5" />

      <div className="flex flex-col gap-2.5">
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

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
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

        <div className="flex flex-col gap-2">
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

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="speed-range-slider" className={labelClass}>{t.controlSpeed[lang]}</label>
          <span className="text-[11px] font-mono text-orange-400">{rotationSpeed.toFixed(1)}x</span>
        </div>
        <input
          id="speed-range-slider"
          type="range"
          min="0.0"
          max="4.0"
          step="0.1"
          value={rotationSpeed}
          aria-label={t.controlSpeed[lang]}
          onChange={(e) => {
            setRotationSpeed(parseFloat(e.target.value));
            setActivePreset("custom");
          }}
          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500 focus:outline-none"
        />
      </div>

      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-start gap-2.5">
        <span className="text-orange-400 text-xs mt-0.5 select-none">•</span>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          {t.interactiveTip[lang]}
        </p>
      </div>
    </div>
  );
}
