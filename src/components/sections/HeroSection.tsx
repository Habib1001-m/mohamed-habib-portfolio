"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioContent";
import { t, isRtl, type Locale } from "@/lib/i18n";
import { track } from "@/lib/analytics";

export function HeroSection({ locale }: { locale: Locale }) {
  const h = PORTFOLIO_DATA.hero;
  const rtl = isRtl(locale);
  const [portraitActive, setPortraitActive] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const portraitWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const togglePortrait = () => {
    setPortraitActive(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPortraitActive(false), 3200);
  };

  const onPortraitMove = (e: React.MouseEvent) => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const el = portraitWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -6, ry: px * 6 });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  const Arrow = rtl ? ArrowRight : ArrowRight;

  return (
    <header
      id="hero"
      className="relative overflow-hidden ds-section pt-32 md:pt-40"
    >
      {/* Ambient light — single controlled source, cinematic drift */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="drift-slow absolute top-[-10%] left-[12%] h-[42rem] w-[42rem] rounded-full opacity-[0.12] blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 60%)" }}
        />
        <div
          className="drift-reverse absolute bottom-[-20%] right-[8%] h-[28rem] w-[28rem] rounded-full opacity-[0.06] blur-[100px]"
          style={{ background: "radial-gradient(circle, var(--gold), transparent 60%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="ds-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_0.85fr] lg:gap-16">
          {/* Left: copy */}
          <div className="max-w-2xl">
            <div className="hero-enter delay-1 inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-[var(--green)]" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
              </span>
              <span className="font-mono text-[0.7rem] tracking-wide text-ink-muted">
                {t(h.badge, locale)}
              </span>
            </div>

            <h1 className="display-text hero-enter delay-2 mt-6 text-[length:var(--fs-display)]">
              <span className="block">{t(h.title1, locale)}</span>
              <span className="block">
                <span className="text-accent">{t(h.title2, locale)}</span>
              </span>
              <span className="block">{t(h.title3, locale)}</span>
            </h1>

            <p className="hero-enter delay-3 mt-5 font-mono text-xs tracking-wide text-ink-muted">
              {t(h.roleLine, locale)}
            </p>

            <p className="hero-enter delay-3 mt-4 max-w-xl text-[length:var(--fs-body)] leading-relaxed text-ink-soft">
              {t(h.subtitle, locale)}
            </p>

            <div className="hero-enter delay-4 mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="ds-action ds-action-primary"
                onClick={() =>
                  track({ eventName: "hero_projects_clicked", category: "navigation" })
                }
              >
                {t(h.ctaPrimary, locale)}
                <Arrow className={`h-4 w-4 ${rtl ? "rotate-180" : ""}`} />
              </a>
              <a
                href="#contact"
                className="ds-action ds-action-ghost"
                onClick={() =>
                  track({ eventName: "hero_contact_clicked", category: "navigation" })
                }
              >
                {t(h.ctaSecondary, locale)}
              </a>
              <a
                href="/cv/Mohamed_Habib_One_Page_CV.pdf"
                className="ds-action !px-3"
                aria-label={t(h.ctaCv, locale)}
                onClick={() =>
                  track({ eventName: "lead_cv_downloaded", category: "lead", props: { type: "one-page", source: "hero" } })
                }
              >
                <FileText className="h-4 w-4" />
              </a>
            </div>

            <div className="hero-enter delay-5 mt-8 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-ink-faint">
              <span className="font-mono">{t(h.statusLocation, locale)}</span>
              <span className="font-mono opacity-40">·</span>
              <span className="font-mono">{t(h.statusExperience, locale)}</span>
              <span className="font-mono opacity-40">·</span>
              <span className="font-mono inline-flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                {t(
                  { en: "Building systems lab", ar: "أبني مختبر الأنظمة" },
                  locale,
                )}
              </span>
            </div>
          </div>

          {/* Right: portrait — smaller, balanced */}
          <div
            ref={portraitWrapRef}
            className="hero-enter-fade delay-3 relative mx-auto w-full max-w-[14rem] sm:max-w-[16rem] lg:max-w-none"
            onMouseMove={onPortraitMove}
            onMouseLeave={resetTilt}
            style={{
              perspective: "1000px",
            }}
          >
            <button
              type="button"
              onClick={togglePortrait}
              aria-pressed={portraitActive}
              aria-label={t(
                { en: "Toggle portrait color", ar: "إظهار الصورة بالألوان" },
                locale,
              )}
              className="group relative block w-full overflow-hidden rounded-[var(--r-2xl)] border border-hairline transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 opacity-40 blur-[60px] transition-opacity duration-700"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, var(--accent-glow), transparent 70%)",
                  opacity: portraitActive ? 0.6 : 0.3,
                }}
              />
              { }
              <img
                src="/images/mohamed-habib-hero.webp"
                alt={t(
                  { en: "Portrait of Mohamed Habib", ar: "صورة محمد حبيب" },
                  locale,
                )}
                width={400}
                height={500}
                loading="eager"
                className={`aspect-[4/5] w-full object-cover object-top transition-all duration-700 ${
                  portraitActive
                    ? "grayscale-0 scale-100 brightness-100"
                    : "grayscale scale-[1.01] brightness-90"
                }`}
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gradient-to-t from-black/70 to-transparent py-3 text-[0.65rem] font-medium text-ink-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {portraitActive
                  ? t({ en: "Color enabled", ar: "الألوان مفعّلة" }, locale)
                  : t({ en: "Click for color", ar: "اضغط للألوان" }, locale)}
              </span>
            </button>
          </div>
        </div>

        {/* Pillar cards */}
        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {[
            { title: h.pillarTitle1, desc: h.pillarDesc1 },
            { title: h.pillarTitle2, desc: h.pillarDesc2 },
            { title: h.pillarTitle3, desc: h.pillarDesc3 },
          ].map((p, i) => (
            <div key={i} className="ds-card ds-card-hover p-5" data-reveal data-reveal-group="pillars">
              <div className="ds-kicker">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 text-[length:var(--fs-h3)] font-semibold text-ink">
                {t(p.title, locale)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {t(p.desc, locale)}
              </p>
            </div>
          ))}
        </div>

        {/* Stats ribbon */}
        <div className="hero-enter delay-6 mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--r-lg)] border border-hairline bg-[var(--hairline)] sm:grid-cols-4">
          {[
            { value: "4+", label: { en: "Years building", ar: "سنوات بناء" } },
            { value: "3", label: { en: "Proof projects", ar: "مشاريع موثقة" } },
            { value: "AR/EN", label: { en: "Bilingual", ar: "ثنائي اللغة" } },
            { value: "∞", label: { en: "Automation mindset", ar: "عقلية أتمتة" } },
          ].map((stat, i) => (
            <div key={i} className="bg-[var(--bg)] p-4 text-center">
              <div className="text-2xl font-bold text-ink">{stat.value}</div>
              <div className="mt-1 text-[0.7rem] text-ink-faint">
                {t(stat.label, locale)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="#about"
            aria-label={t({ en: "Scroll to content", ar: "انتقل للمحتوى" }, locale)}
            className="text-ink-faint transition-colors hover:text-accent"
          >
            <ArrowDown className="h-5 w-5 animate-pulse-soft" />
          </a>
        </div>
      </div>
    </header>
  );
}
