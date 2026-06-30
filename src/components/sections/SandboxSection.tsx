"use client";

import { useEffect, useState, Suspense, lazy, useMemo } from "react";
import { Boxes, Cpu, Sparkles, Loader2, X, Activity, ArrowRight, Zap, Shield, Eye } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioContent";
import {
  ARCHITECTURE_PRESETS,
  PRESET_ORDER,
  getArchitecturePreset,
  STATUS_COLORS,
  LINK_TYPE_COLORS,
  type ArchitectureNode,
  type NodeStatus,
  type LinkType,
} from "@/data/architecturePresets";
import { t, isRtl, type Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { WebGLBoundary } from "@/components/sandbox/WebGLBoundary";
import { track } from "@/lib/analytics";

const ThreeCanvas = lazy(() => import("@/components/sandbox/ThreeCanvas"));

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => setReduced(mq.matches);
    window.requestAnimationFrame(syncReducedMotion);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

const STATUS_LABELS: Record<NodeStatus, { en: string; ar: string }> = {
  active: { en: "Active", ar: "نشط" },
  guarded: { en: "Guarded", ar: "محروس" },
  blocked: { en: "Blocked", ar: "محظور" },
  review: { en: "Review", ar: "مراجعة" },
};

const LINK_TYPE_LABELS: Record<LinkType, { en: string; ar: string }> = {
  request: { en: "Request", ar: "طلب" },
  data: { en: "Data", ar: "بيانات" },
  signal: { en: "Signal", ar: "إشارة" },
  control: { en: "Control", ar: "تحكم" },
};

const PRESET_LABEL: Record<string, { en: string; ar: string }> = {
  portfolio: { en: "Portfolio", ar: "البورتفوليو" },
  quickshed: { en: "QuickShed", ar: "QuickShed" },
  sieve: { en: "SIEVE", ar: "SIEVE" },
  "ai-agent": { en: "AI Workflow", ar: "مسار AI" },
};

const TREND_ICON = { up: "↗", down: "↘", stable: "→" };

export function SandboxSection({ locale }: { locale: Locale }) {
  const s = PORTFOLIO_DATA.playground3D;
  const reducedMotion = useReducedMotion();
  const rtl = isRtl(locale);

  const [activePreset, setActivePreset] = useState<string>("portfolio");
  const [color, setColor] = useState(ARCHITECTURE_PRESETS.portfolio.accent);
  const [wireframe, setWireframe] = useState(ARCHITECTURE_PRESETS.portfolio.wireframe);
  const [rotationSpeed, setRotationSpeed] = useState(ARCHITECTURE_PRESETS.portfolio.speed);
  const [showParticles, setShowParticles] = useState(ARCHITECTURE_PRESETS.portfolio.particles);
  const [inView, setInView] = useState(false);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [tick, setTick] = useState(0);

  const preset = getArchitecturePreset(activePreset);

  // Telemetry tick (updates metrics display every 3s for liveness)
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    const el = document.getElementById("systems");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once in view, stay in view (don't unload the canvas on scroll-back-up)
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "180px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePresetChange = (id: string) => {
    const p = getArchitecturePreset(id);
    setActivePreset(id);
    setColor(p.accent);
    setWireframe(p.wireframe);
    setRotationSpeed(p.speed);
    setShowParticles(p.particles);
    setFocusedNodeId(null);
    track({
      eventName: "sandbox_preset_changed",
      category: "engagement",
      props: { preset: id },
    });
  };

  const focusedNode = useMemo(
    () => preset.nodes.find((n) => n.id === focusedNodeId) ?? null,
    [preset, focusedNodeId],
  );

  const focusedConnections = useMemo(() => {
    if (!focusedNode) return [];
    return preset.links
      .filter((l) => l.from === focusedNode.id || l.to === focusedNode.id)
      .map((l) => {
        const otherId = l.from === focusedNode.id ? l.to : l.from;
        const other = preset.nodes.find((n) => n.id === otherId);
        return { link: l, other, direction: l.from === focusedNode.id ? "out" : "in" };
      });
  }, [preset, focusedNode]);

  const COLOR_SWATCHES = ["#f97316", "#ffc857", "#22d3ee", "#a855f7", "#10f29a"];

  return (
    <section id="systems" className="ds-section">
      <div className="ds-shell">
        <SectionHeading
          num="04."
          title={t(s.title, locale)}
          subtitle={t(s.subtitle, locale)}
        />

        {/* Narrative paragraph */}
        <div className="mt-6 max-w-3xl" data-reveal>
          <p className="text-[var(--fs-body)] leading-relaxed text-ink-soft">
            {t(preset.narrative, locale)}
          </p>
        </div>

        {/* Preset selector — segmented control */}
        <div className="mt-8 flex flex-wrap gap-2" data-reveal>
          {PRESET_ORDER.map((id) => {
            const isActive = activePreset === id;
            const p = ARCHITECTURE_PRESETS[id];
            return (
              <button
                key={id}
                onClick={() => handlePresetChange(id)}
                aria-pressed={isActive}
                className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                  isActive
                    ? "border-hairline-accent bg-[rgba(249,115,22,0.06)] text-ink"
                    : "border-hairline text-ink-muted hover:text-ink hover:border-hairline"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full transition-opacity"
                  style={{ background: p.accent, opacity: isActive ? 1 : 0.4 }}
                />
                {t(PRESET_LABEL[id], locale)}
              </button>
            );
          })}
        </div>

        {/* Telemetry strip */}
        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--r-lg)] border border-hairline bg-[var(--hairline)] sm:grid-cols-4" data-reveal>
          {preset.metrics.map((m, i) => (
            <div key={i} className="bg-[var(--bg)] p-3.5">
              <div className="flex items-center justify-between">
                <span className="ds-label">{t(m.label, locale)}</span>
                <span
                  className={`font-mono text-xs ${
                    m.trend === "up" ? "text-[var(--green)]" :
                    m.trend === "down" ? "text-[var(--accent)]" : "text-ink-faint"
                  }`}
                >
                  {TREND_ICON[m.trend]}
                </span>
              </div>
              <div className="mt-1 text-lg font-bold text-ink">
                {m.value}
                <span className="ml-1 text-[0.6rem] font-normal text-ink-faint opacity-0">
                  {tick}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main canvas + controls + detail panel — mobile-first stacking */}
        <div className="mt-6 flex flex-col gap-4 lg:grid lg:grid-cols-[1.5fr_1fr] xl:grid-cols-[1.5fr_300px_1fr]" data-reveal>
          {/* Canvas (first on all breakpoints) */}
          <div className="relative order-1">
            {inView ? (
              <WebGLBoundary
                fallback={
                  <div className="grid h-[300px] place-items-center rounded-[var(--r-2xl)] border border-hairline bg-[#0a0b0e] p-6 text-center sm:h-[420px]">
                    <div>
                      <Boxes className="mx-auto h-8 w-8 text-ink-faint" />
                      <p className="mt-3 text-sm text-ink-muted">
                        {t(
                          { en: "WebGL unavailable. The architecture graph cannot render.", ar: "WebGL غير متاح. تعذر عرض المخطط المعماري." },
                          locale,
                        )}
                      </p>
                    </div>
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="grid h-[300px] place-items-center rounded-[var(--r-2xl)] border border-hairline bg-[#0a0b0e] sm:h-[420px]">
                      <div className="flex items-center gap-2 text-sm text-ink-muted">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t({ en: "Initializing WebGL layer…", ar: "جاري تحميل طبقة WebGL…" }, locale)}
                      </div>
                    </div>
                  }
                >
                  <ThreeCanvas
                    color={color}
                    wireframe={wireframe}
                    rotationSpeed={rotationSpeed}
                    showParticles={showParticles}
                    activePreset={activePreset}
                    focusedNodeId={focusedNodeId}
                    reducedMotion={reducedMotion}
                  />
                </Suspense>
              </WebGLBoundary>
            ) : (
              <div className="grid h-[300px] place-items-center rounded-[var(--r-2xl)] border border-hairline bg-[#0a0b0e] sm:h-[420px]">
                <p className="text-sm text-ink-faint">
                  {t({ en: "Approach the lab to load the proof layer", ar: "اقترب لتحميل طبقة الإثبات" }, locale)}
                </p>
              </div>
            )}

            {/* Node selector chips below canvas */}
            <div className="mt-3 flex flex-wrap gap-2">
              {preset.nodes.map((node) => {
                const isFocused = focusedNodeId === node.id;
                const sc = STATUS_COLORS[node.status];
                return (
                  <button
                    key={node.id}
                    onClick={() => setFocusedNodeId(isFocused ? null : node.id)}
                    className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all ${
                      isFocused ? "border-hairline-accent bg-white/[0.04]" : "border-hairline hover:border-hairline"
                    }`}
                    aria-pressed={isFocused}
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: sc }} />
                    <span className={isFocused ? "text-ink" : "text-ink-muted"}>{t(node.label, locale)}</span>
                  </button>
                );
              })}
            </div>

            {/* Legend — stacked on mobile, row on desktop */}
            <div className="mt-3 rounded-[var(--r-md)] border border-hairline bg-white/[0.015] p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="ds-label">{t({ en: "Status", ar: "الحالة" }, locale)}</span>
                  {(Object.keys(STATUS_COLORS) as NodeStatus[]).map((st) => (
                    <span key={st} className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: STATUS_COLORS[st] }} />
                      {t(STATUS_LABELS[st], locale)}
                    </span>
                  ))}
                </div>
                <span className="hidden h-3 w-px bg-hairline sm:block" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="ds-label">{t({ en: "Flow", ar: "التدفق" }, locale)}</span>
                  {(Object.keys(LINK_TYPE_COLORS) as LinkType[]).map((lt) => (
                    <span key={lt} className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: LINK_TYPE_COLORS[lt] }} />
                      {t(LINK_TYPE_LABELS[lt], locale)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Node detail panel — order 2 on mobile (right after canvas), middle on xl */}
          <aside className="order-2 xl:order-2 xl:border-l xl:border-hairline xl:pl-4">
            {focusedNode ? (
              <div className="ds-card animate-fade-in p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ background: STATUS_COLORS[focusedNode.status] }}
                      />
                      <span className="ds-label">{t(focusedNode.kind, locale)}</span>
                    </div>
                    <h3 className="mt-1.5 text-base font-semibold text-ink sm:text-lg">
                      {t(focusedNode.label, locale)}
                    </h3>
                  </div>
                  <button
                    onClick={() => setFocusedNodeId(null)}
                    aria-label={t({ en: "Close", ar: "إغلاق" }, locale)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-[var(--r-sm)] text-ink-faint hover:bg-white/[0.03] hover:text-ink transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <span
                  className="mt-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.65rem]"
                  style={{
                    borderColor: STATUS_COLORS[focusedNode.status] + "44",
                    color: STATUS_COLORS[focusedNode.status],
                  }}
                >
                  {t(STATUS_LABELS[focusedNode.status], locale)}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {t(focusedNode.description, locale)}
                </p>

                {/* Connections */}
                {focusedConnections.length > 0 && (
                  <div className="mt-4">
                    <div className="ds-label mb-2">
                      {t({ en: "Connections", ar: "الاتصالات" }, locale)} ({focusedConnections.length})
                    </div>
                    <ul className="space-y-2">
                      {focusedConnections.map((c, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: LINK_TYPE_COLORS[c.link.type] }}
                          />
                          <span className="shrink-0 text-ink-faint">
                            {c.direction === "out" ? "→" : "←"}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-ink-soft">
                            {c.other ? t(c.other.label, locale) : "?"}
                          </span>
                          <span className="shrink-0 font-mono text-[0.65rem] text-ink-faint">
                            {t(LINK_TYPE_LABELS[c.link.type], locale)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="ds-card flex min-h-[140px] flex-col items-center justify-center p-4 text-center sm:min-h-[200px]">
                <Eye className="h-6 w-6 text-ink-faint" />
                <p className="mt-3 text-sm text-ink-muted">
                  {t(
                    { en: "Tap a node to inspect its role, status, and connections.", ar: "اضغط على عقدة لفحص دورها وحالتها واتصالاتها." },
                    locale,
                  )}
                </p>
              </div>
            )}
          </aside>

          {/* Controls — order 3 on mobile (below detail), right on xl */}
          <div className="order-3 space-y-3 xl:order-3">
            {/* Console info card */}
            <div className="ds-card p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 shrink-0 text-accent" />
                <span className="ds-label">{t(s.consoleTitle, locale)}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                {t(preset.signal, locale)}
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                <div>
                  <div className="ds-label">{t({ en: "Mode", ar: "النمط" }, locale)}</div>
                  <div className="mt-0.5 text-ink-soft">{t(preset.mode, locale)}</div>
                </div>
                <div>
                  <div className="ds-label">{t({ en: "State", ar: "الحالة" }, locale)}</div>
                  <div className="mt-0.5 text-ink-soft">{t(preset.state, locale)}</div>
                </div>
              </div>
            </div>

            {/* Proof points */}
            <div className="ds-card p-4">
              <div className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 shrink-0 text-[var(--green)]" />
                <span className="ds-label">{t({ en: "What this proves", ar: "ما يثبته هذا" }, locale)}</span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {preset.proofPoints.map((p, i) => (
                  <li key={i} className="flex gap-2 text-xs text-ink-muted">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--green)]" />
                    <span>{t(p, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advanced controls (collapsible) */}
            <div className="ds-card p-4">
              <button
                onClick={() => setShowAdvanced((a) => !a)}
                aria-expanded={showAdvanced}
                className="flex w-full items-center justify-between min-h-[44px]"
              >
                <span className="ds-label flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 shrink-0 text-accent" />
                  {t({ en: "Advanced controls", ar: "تحكم متقدم" }, locale)}
                </span>
                <ArrowRight className={`h-4 w-4 shrink-0 text-ink-faint transition-transform ${showAdvanced ? "rotate-90" : ""} ${rtl ? "scale-x-[-1]" : ""}`} />
              </button>

              {showAdvanced && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  <div>
                    <div className="ds-label">{t(s.controlColor, locale)}</div>
                    <div className="mt-2 flex flex-wrap gap-2.5">
                      {COLOR_SWATCHES.map((c) => (
                        <button
                          key={c}
                          onClick={() => setColor(c)}
                          aria-label={c}
                          className={`h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 ${
                            color === c ? "border-white" : "border-transparent"
                          }`}
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between min-h-[44px]">
                    <span className="ds-label">{t(s.controlWireframe, locale)}</span>
                    <button
                      onClick={() => setWireframe((w) => !w)}
                      aria-pressed={wireframe}
                      className={`relative h-7 w-12 rounded-full transition-colors ${wireframe ? "bg-[var(--accent)]" : "bg-white/10"}`}
                    >
                      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${wireframe ? "left-[1.5rem]" : "left-1"}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between min-h-[44px]">
                    <span className="ds-label">{t(s.controlParticle, locale)}</span>
                    <button
                      onClick={() => setShowParticles((p) => !p)}
                      aria-pressed={showParticles}
                      className={`relative h-7 w-12 rounded-full transition-colors ${showParticles ? "bg-[var(--accent)]" : "bg-white/10"}`}
                    >
                      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${showParticles ? "left-[1.5rem]" : "left-1"}`} />
                    </button>
                  </div>

                  <div className="min-h-[44px]">
                    <div className="flex items-center justify-between">
                      <span className="ds-label">{t(s.controlSpeed, locale)}</span>
                      <span className="font-mono text-xs text-ink-muted">{rotationSpeed.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={3}
                      step={0.1}
                      value={rotationSpeed}
                      onChange={(e) => setRotationSpeed(Number(e.target.value))}
                      className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[var(--accent)]"
                      aria-label={t(s.controlSpeed, locale)}
                    />
                  </div>

                  {reducedMotion && (
                    <p className="text-[0.7rem] text-ink-faint">
                      {t({ en: "Reduced-motion: animation frozen, static render.", ar: "حركة مخفّضة: الرسوم متوقفة، عرض ثابت." }, locale)}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Boundaries */}
            <div className="ds-card p-4">
              <div className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 shrink-0 text-[#ef4444]" />
                <span className="ds-label">{t({ en: "Boundaries", ar: "الحدود" }, locale)}</span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {preset.boundaries.map((b, i) => (
                  <li key={i} className="flex gap-2 text-xs text-ink-muted">
                    <span className="mt-0.5 shrink-0 text-[#ef4444]">✕</span>
                    <span>{t(b, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
