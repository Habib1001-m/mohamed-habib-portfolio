import { useEffect, useMemo, useState } from "react";
import { getArchitecturePreset } from "../data/architecturePresets";

interface ArchitecturePresetOverlayProps {
  lang: "en" | "ar";
  activePreset: string;
  offsetX?: number;
  offsetY?: number;
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
  { x: 18, y: 27 },
  { x: 50, y: 23 },
  { x: 82, y: 34 },
  { x: 22, y: 62 },
  { x: 56, y: 64 },
  { x: 80, y: 73 },
];

export default function ArchitecturePresetOverlay({ lang, activePreset, offsetX = 0, offsetY = 0 }: ArchitecturePresetOverlayProps) {
  const architecture = getArchitecturePreset(activePreset);
  const mobileNodes = useMemo(
    () => architecture.nodes.map((node, index) => ({ ...node, ...mobilePositions[index % mobilePositions.length] })),
    [architecture.nodes]
  );
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(architecture.nodes[0]?.id ?? null);
  const focusedNode = architecture.nodes.find((node) => node.id === focusedNodeId) ?? architecture.nodes[0];
  const nodeOffsetStyle = { transform: `translate3d(${offsetX}px, ${offsetY}px, 0)` };

  useEffect(() => {
    setFocusedNodeId(architecture.nodes[0]?.id ?? null);
  }, [activePreset, architecture.nodes]);

  const focusNode = (nodeId: string) => {
    setFocusedNodeId(nodeId);
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-black/10 md:bg-black/20" />

      <div className="absolute inset-4 md:hidden transition-transform duration-150 ease-out" style={nodeOffsetStyle}>
        {mobileNodes.map((node) => (
          <button
            key={`${node.id}-mobile`}
            type="button"
            data-architecture-node="true"
            onTouchStart={(event) => {
              event.stopPropagation();
              focusNode(node.id);
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              focusNode(node.id);
            }}
            onPointerUp={(event) => {
              event.stopPropagation();
              focusNode(node.id);
            }}
            onClick={(event) => {
              event.stopPropagation();
              focusNode(node.id);
            }}
            className={`z-20 pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 w-[72px] h-[34px] rounded-[0.7rem] border px-2 py-1 backdrop-blur-md text-left transition-all active:scale-95 touch-manipulation focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 ${statusStyles[node.status]} ${focusedNode?.id === node.id ? "ring-1 ring-white/60 bg-white/10" : ""}`}
            style={{ left: `${node.x}%`, top: `${node.y}%`, boxShadow: `0 0 16px ${architecture.accent}16` }}
            aria-label={node.label[lang]}
          >
            <div className="text-[9px] font-semibold text-white leading-tight truncate">{node.label[lang]}</div>
          </button>
        ))}
      </div>

      <div className="hidden md:block absolute inset-12 transition-transform duration-150 ease-out" style={nodeOffsetStyle}>
        {architecture.nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            data-architecture-node="true"
            onPointerDown={(event) => {
              event.stopPropagation();
              focusNode(node.id);
            }}
            onClick={(event) => {
              event.stopPropagation();
              focusNode(node.id);
            }}
            className={`z-20 pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 w-[112px] h-[48px] rounded-xl border px-3 py-2 backdrop-blur-md text-left transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 hover:border-white/35 hover:bg-white/[0.06] ${statusStyles[node.status]} ${focusedNode?.id === node.id ? "ring-1 ring-white/45 bg-white/[0.04]" : ""}`}
            style={{ left: `${node.x}%`, top: `${node.y}%`, boxShadow: `0 0 16px ${architecture.accent}12` }}
            aria-label={node.label[lang]}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 shrink-0 rounded-full" style={{ backgroundColor: architecture.accent }} />
              <span className="font-mono text-[8px] uppercase tracking-widest opacity-70 truncate">{node.kind[lang]}</span>
            </div>
            <div className="mt-1 text-[11px] font-semibold text-white leading-tight truncate">{node.label[lang]}</div>
          </button>
        ))}
      </div>

      {focusedNode && (
        <div className="z-30 absolute left-3 right-3 bottom-3 md:left-4 md:right-auto md:bottom-4 md:w-[255px] rounded-[1.15rem] border border-white/[0.08] bg-black/60 backdrop-blur-xl px-3 py-2 pointer-events-none shadow-xl shadow-black/30">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-500 mb-0.5">
                {lang === "ar" ? "العقدة النشطة" : "Focused node"}
              </div>
              <div className="text-xs font-bold text-white truncate">{focusedNode.label[lang]}</div>
              <div className="text-[10px] text-slate-400 truncate">{focusedNode.kind[lang]} · {architecture.shortLabel[lang]}</div>
            </div>
            <span className={`shrink-0 px-2 py-1 rounded-md border text-[9px] ${statusStyles[focusedNode.status]}`}>
              {statusCopy[focusedNode.status][lang]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
