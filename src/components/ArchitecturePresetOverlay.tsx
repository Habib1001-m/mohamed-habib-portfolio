import { getArchitecturePreset } from "../data/architecturePresets";

interface ArchitecturePresetOverlayProps {
  lang: "en" | "ar";
  activePreset: string;
}

const statusStyles = {
  active: "border-emerald-400/45 bg-emerald-500/10 text-emerald-200",
  guarded: "border-orange-400/45 bg-orange-500/10 text-orange-200",
  blocked: "border-red-400/45 bg-red-500/10 text-red-200",
  review: "border-cyan-400/45 bg-cyan-500/10 text-cyan-200",
};

export default function ArchitecturePresetOverlay({ lang, activePreset }: ArchitecturePresetOverlayProps) {
  const architecture = getArchitecturePreset(activePreset);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-8 md:inset-12">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {architecture.links.map((link) => {
            const from = architecture.nodes.find((node) => node.id === link.from);
            const to = architecture.nodes.find((node) => node.id === link.to);
            if (!from || !to) return null;

            return (
              <line
                key={`${link.from}-${link.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={architecture.accent}
                strokeOpacity="0.32"
                strokeWidth="0.45"
                strokeDasharray="2 1.6"
              />
            );
          })}
        </svg>

        {architecture.nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 min-w-[104px] rounded-xl border px-3 py-2 backdrop-blur-sm ${statusStyles[node.status]}`}
            style={{ left: `${node.x}%`, top: `${node.y}%`, boxShadow: `0 0 24px ${architecture.accent}22` }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: architecture.accent }} />
              <span className="font-mono text-[9px] uppercase tracking-widest opacity-70">{node.kind[lang]}</span>
            </div>
            <div className="mt-1 text-[11px] font-semibold text-white leading-tight">{node.label[lang]}</div>
          </div>
        ))}
      </div>

      <div className="absolute left-4 bottom-12 md:bottom-14 max-w-[260px] rounded-2xl border border-white/10 bg-black/55 backdrop-blur px-4 py-3">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 mb-2">Architecture signals</div>
        <div className="space-y-1.5">
          {architecture.signals.slice(0, 3).map((signal) => (
            <div key={signal.en} className="flex items-center gap-2 text-[10px] text-slate-300">
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: architecture.accent }} />
              <span>{signal[lang]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
