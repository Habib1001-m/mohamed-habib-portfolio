import { useMemo, useState } from "react";
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

const statusCopy = {
  active: { en: "Active", ar: "نشط" },
  guarded: { en: "Guarded", ar: "محمي" },
  blocked: { en: "Restricted", ar: "مقيّد" },
  review: { en: "Review", ar: "مراجعة" },
};

const mobilePositions = [
  { x: 18, y: 28 },
  { x: 50, y: 22 },
  { x: 82, y: 34 },
  { x: 22, y: 66 },
  { x: 58, y: 64 },
  { x: 80, y: 78 },
];

export default function ArchitecturePresetOverlay({ lang, activePreset }: ArchitecturePresetOverlayProps) {
  const architecture = getArchitecturePreset(activePreset);
  const mobileNodes = useMemo(
    () => architecture.nodes.map((node, index) => ({ ...node, ...mobilePositions[index % mobilePositions.length] })),
    [architecture.nodes]
  );
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(architecture.nodes[0]?.id ?? null);
  const focusedNode = architecture.nodes.find((node) => node.id === focusedNodeId) ?? architecture.nodes[0];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-black/10 md:bg-black/20" />

      <div className="absolute inset-4 md:hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {architecture.links.map((link) => {
            const from = mobileNodes.find((node) => node.id === link.from);
            const to = mobileNodes.find((node) => node.id === link.to);
            if (!from || !to) return null;

            return (
              <line
                key={`${link.from}-${link.to}-mobile`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={architecture.accent}
                strokeOpacity="0.28"
                strokeWidth="0.55"
                strokeDasharray="2 1.8"
              />
            );
          })}
        </svg>

        {mobileNodes.map((node) => (
          <button
            key={`${node.id}-mobile`}
            type="button"
            onClick={() => setFocusedNodeId(node.id)}
            className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 w-[68px] rounded-lg border px-2 py-1.5 backdrop-blur-sm text-left transition-all active:scale-95 ${statusStyles[node.status]} ${focusedNode?.id === node.id ? "ring-1 ring-white/50" : ""}`}
            style={{ left: `${node.x}%`, top: `${node.y}%`, boxShadow: `0 0 20px ${architecture.accent}20` }}
            aria-label={node.label[lang]}
          >
            <div className="text-[9px] font-semibold text-white leading-tight truncate">{node.label[lang]}</div>
          </button>
        ))}
      </div>

      <div className="hidden md:block absolute inset-12">
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
                strokeOpacity="0.3"
                strokeWidth="0.45"
                strokeDasharray="2 1.6"
              />
            );
          })}
        </svg>

        {architecture.nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => setFocusedNodeId(node.id)}
            className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 min-w-[104px] max-w-[118px] rounded-xl border px-3 py-2 backdrop-blur-sm text-left transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 ${statusStyles[node.status]} ${focusedNode?.id === node.id ? "ring-1 ring-white/50" : ""}`}
            style={{ left: `${node.x}%`, top: `${node.y}%`, boxShadow: `0 0 24px ${architecture.accent}22` }}
            aria-label={node.label[lang]}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: architecture.accent }} />
              <span className="font-mono text-[9px] uppercase tracking-widest opacity-70">{node.kind[lang]}</span>
            </div>
            <div className="mt-1 text-[11px] font-semibold text-white leading-tight">{node.label[lang]}</div>
          </button>
        ))}
      </div>

      {focusedNode && (
        <div className="hidden md:block absolute right-4 bottom-12 w-[260px] rounded-2xl border border-white/10 bg-black/70 backdrop-blur px-4 py-3 pointer-events-none">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 mb-1">
                {lang === "ar" ? "العقدة النشطة" : "Focused node"}
              </div>
              <div className="text-sm font-bold text-white truncate">{focusedNode.label[lang]}</div>
            </div>
            <span className={`shrink-0 px-2 py-1 rounded-md border text-[10px] ${statusStyles[focusedNode.status]}`}>
              {statusCopy[focusedNode.status][lang]}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 leading-relaxed">
            {focusedNode.kind[lang]} · {architecture.mode[lang]}
          </div>
        </div>
      )}

      <div className="hidden md:block absolute left-4 bottom-12 md:bottom-14 max-w-[260px] rounded-2xl border border-white/10 bg-black/55 backdrop-blur px-4 py-3">
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
