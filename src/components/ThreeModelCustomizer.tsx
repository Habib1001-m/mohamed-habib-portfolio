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

const PRESET_META = {
  quickshed: {
    mode: { en: "Local-first utility system", ar: "نظام أدوات محلي" },
    signal: { en: "Browser runtime · zero account path", ar: "تشغيل داخل المتصفح · بدون حساب" },
    state: { en: "Privacy boundary active", ar: "حد الخصوصية نشط" },
    tone: "yellow",
  },
  sieve: {
    mode: { en: "Evidence screening gate", ar: "بوابة فحص الأدلة" },
    signal: { en: "Selection engine · decision blocked", ar: "محرك اختيار · القرار محظور" },
    state: { en: "Boundary enforcement visible", ar: "حدود النظام مرئية" },
    tone: "cyan",
  },
  portfolio: {
    mode: { en: "Lead capture pipeline", ar: "مسار التقاط تواصل" },
    signal: { en: "Contact form · Resend · PDF assets", ar: "نموذج تواصل · Resend · ملفات PDF" },
    state: { en: "Production path active", ar: "مسار إنتاجي نشط" },
    tone: "orange",
  },
  "ai-agent": {
    mode: { en: "Tool-assisted AI workflow", ar: "مسار AI مدعوم بالأدوات" },
    signal: { en: "Context · tool layer · review loop", ar: "سياق · طبقة أدوات · مراجعة" },
    state: { en: "Human-in-the-loop ready", ar: "جاهز لمراجعة بشرية" },
    tone: "purple",
  },
  custom: {
    mode: { en: "Custom inspection state", ar: "حالة فحص مخصصة" },
    signal: { en: "Manual controls override preset", ar: "تحكم يدوي خارج السيناريو" },
    state: { en: "Operator tuning", ar: "ضبط بواسطة المشغّل" },
    tone: "slate",
  },
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
  const activeMeta = PRESET_META[activePreset as keyof typeof PRESET_META] ?? PRESET_META.custom;

  const presets = [
    { id: "portfolio", label: t.presetPortfolio[lang], activeClass: "bg-orange-500/10 border-orange-500/45 text-orange-300", color: "#FF3E00", wireframe: false, speed: 1.15, particles: true },
    { id: "quickshed", label: t.presetQuickShed[lang], activeClass: "bg-yellow-500/10 border-yellow-500/45 text-yellow-300", color: "#FFBE00", wireframe: false, speed: 1.7, particles: true },
    { id: "sieve", label: t.presetSieve[lang], activeClass: "bg-cyan-500/10 border-cyan-500/45 text-cyan-300", color: "#22d3ee", wireframe: true, speed: 0.65, particles: true },
    { id: "ai-agent", label: t.presetAI[lang], activeClass: "bg-purple-500/10 border-purple-500/45 text-purple-300", color: "#a855f7", wireframe: false, speed: 1.35, particles: true },
  ];

  const handlePresetChange = (presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (!preset) return;
    setActivePreset(preset.id);
    setColor(preset.color);
    setWireframe(preset.wireframe);
    setRotationSpeed(preset.speed);
    setShowParticles(preset.particles);
  };

  const labelClass = `text-[10px] text-slate-500 ${isRtl ? "font-arabic" : "font-mono uppercase tracking-[0.18em]"}`;
  const buttonBase = `px-3 py-2.5 text-[11px] rounded-xl border transition-all ${isRtl ? "text-right font-arabic" : "text-left font-mono"}`;

  return (
    <div id="three-customizer" className={`flex flex-col gap-4 p-5 rounded-[1.5rem] bg-zinc-950/80 border border-white/10 shadow-2xl glass ${isRtl ? "font-arabic" : ""}`}>
      <div>
        <h3 className="text-white font-bold text-base mb-1 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_16px_rgba(255,62,0,0.75)]" />
          {t.consoleTitle[lang]}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          {t.consoleSubtitle[lang]}
        </p>
      </div>

      <div className="rounded-2xl bg-black/40 border border-white/10 p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <span className={labelClass}>{isRtl ? "حالة النظام" : "System state"}</span>
          <span className={`px-2 py-1 rounded-md border text-[10px] ${activeMeta.tone === "orange" ? "border-orange-500/30 text-orange-300 bg-orange-500/10" : activeMeta.tone === "yellow" ? "border-yellow-500/30 text-yellow-300 bg-yellow-500/10" : activeMeta.tone === "cyan" ? "border-cyan-500/30 text-cyan-300 bg-cyan-500/10" : activeMeta.tone === "purple" ? "border-purple-500/30 text-purple-300 bg-purple-500/10" : "border-slate-500/30 text-slate-300 bg-slate-500/10"} ${isRtl ? "font-arabic" : "font-mono uppercase tracking-wider"}`}>
            {activePreset}
          </span>
        </div>
        <div>
          <p className="text-sm text-white font-semibold leading-relaxed">{activeMeta.mode[lang]}</p>
          <p className="text-[11px] text-slate-400 leading-relaxed mt-1">{activeMeta.signal[lang]}</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className={isRtl ? "font-arabic" : "font-mono uppercase tracking-wider"}>{activeMeta.state[lang]}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>{t.controlPreset[lang]}</label>
        <div className="grid grid-cols-1 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              id={`preset-${preset.id}`}
              type="button"
              onClick={() => handlePresetChange(preset.id)}
              className={`${buttonBase} ${activePreset === preset.id ? preset.activeClass : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5 hover:border-white/10"}`}
            >
              {preset.label}
            </button>
          ))}
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
          max="3.0"
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
