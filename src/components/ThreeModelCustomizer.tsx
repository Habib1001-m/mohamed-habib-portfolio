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
  { hex: "#FF3E00", label: { en: "Volt Orange", ar: "البرتقالي الناري" } },
  { hex: "#FFBE00", label: { en: "Neon Gold", ar: "الذهب الساطع" } },
  { hex: "#3b82f6", label: { en: "Electric Blue", ar: "الأزرق الكهربائي" } },
  { hex: "#22d3ee", label: { en: "Neon Cyan", ar: "السيان المتوهج" } },
  { hex: "#a855f7", label: { en: "Radioactive Purple", ar: "البنفسجي الإشعاعي" } },
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

  return (
    <div id="three-customizer" className="flex flex-col gap-6 p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-white/10 glass shadow-2xl">
      <div>
        <h3 className="text-white font-bold text-xl mb-1 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
          {t.title[lang]}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          {t.subtitle[lang]}
        </p>
      </div>

      <div className="h-px bg-white/5"></div>

      {/* Preset Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">
          {t.controlPreset[lang]}
        </label>
        <div className="grid grid-cols-1 gap-2">
          <button
            id="preset-quickshed"
            type="button"
            onClick={() => handlePresetChange("quickshed")}
            className={`px-4 py-2.5 text-xs text-left font-mono rounded-lg border transition-all ${
              activePreset === "quickshed"
                ? "bg-yellow-500/10 border-yellow-500/50 text-yellow-300"
                : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5"
            } ${lang === "ar" ? "text-right" : ""}`}
          >
            {t.presetQuickShed[lang]}
          </button>
          <button
            id="preset-sieve"
            type="button"
            onClick={() => handlePresetChange("sieve")}
            className={`px-4 py-2.5 text-xs text-left font-mono rounded-lg border transition-all ${
              activePreset === "sieve"
                ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-300"
                : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5"
            } ${lang === "ar" ? "text-right" : ""}`}
          >
            {t.presetSieve[lang]}
          </button>
          <button
            id="preset-ai-agent"
            type="button"
            onClick={() => handlePresetChange("ai-agent")}
            className={`px-4 py-2.5 text-xs text-left font-mono rounded-lg border transition-all ${
              activePreset === "ai-agent"
                ? "bg-orange-500/10 border-orange-500/50 text-orange-300"
                : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5"
            } ${lang === "ar" ? "text-right" : ""}`}
          >
            {t.presetAI[lang]}
          </button>
          <button
            id="preset-data-stream"
            type="button"
            onClick={() => handlePresetChange("data-stream")}
            className={`px-4 py-2.5 text-xs text-left font-mono rounded-lg border transition-all ${
              activePreset === "data-stream"
                ? "bg-purple-500/10 border-purple-500/50 text-purple-300"
                : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5"
            } ${lang === "ar" ? "text-right" : ""}`}
          >
            {t.presetData[lang]}
          </button>
        </div>
      </div>

      <div className="h-px bg-white/5"></div>

      {/* Color Picker */}
      <div className="flex flex-col gap-2.5">
        <label id="color-picker-label" className="text-xs font-mono text-slate-500 uppercase tracking-widest">
          {t.controlColor[lang]}
        </label>
        <div className="flex flex-wrap gap-2.5" role="group" aria-labelledby="color-picker-label">
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
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 active:scale-95 flex items-center justify-center ${
                color.toLowerCase() === c.hex.toLowerCase()
                  ? "border-white scale-110 shadow-lg shadow-white/10"
                  : "border-transparent"
              }`}
            >
              {color.toLowerCase() === c.hex.toLowerCase() && (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 gap-4">
        {/* Wireframe */}
        <div className="flex flex-col gap-2">
          <label htmlFor="toggle-wireframe" className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            {t.controlWireframe[lang]}
          </label>
          <button
            id="toggle-wireframe"
            type="button"
            aria-pressed={wireframe}
            onClick={() => {
              setWireframe(!wireframe);
              setActivePreset("custom");
            }}
            className={`px-4 py-2.5 text-xs font-mono rounded-lg border transition-all ${
              wireframe
                ? "bg-orange-500/10 border-orange-500/40 text-orange-300 font-bold"
                : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5"
            }`}
          >
            {wireframe ? "ON // نشط" : "OFF // مغلق"}
          </button>
        </div>

        {/* Particles */}
        <div className="flex flex-col gap-2">
          <label htmlFor="toggle-particles" className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            {t.controlParticle[lang]}
          </label>
          <button
            id="toggle-particles"
            type="button"
            aria-pressed={showParticles}
            onClick={() => {
              setShowParticles(!showParticles);
              setActivePreset("custom");
            }}
            className={`px-4 py-2.5 text-xs font-mono rounded-lg border transition-all ${
              showParticles
                ? "bg-orange-500/10 border-orange-500/40 text-orange-300 font-bold"
                : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5"
            }`}
          >
            {showParticles ? "ON // نشط" : "OFF // مغلق"}
          </button>
        </div>
      </div>

      {/* Speed Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="speed-range-slider" className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            {t.controlSpeed[lang]}
          </label>
          <span className="text-xs font-mono text-orange-400">{rotationSpeed.toFixed(1)}x</span>
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
        <span className="text-orange-400 text-sm mt-0.5 select-none">💡</span>
        <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed">
          {t.interactiveTip[lang]}
        </p>
      </div>
    </div>
  );
}
