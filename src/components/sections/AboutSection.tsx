import { PORTFOLIO_DATA } from "@/data/portfolioContent";
import { t, type Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

export function AboutSection({ locale }: { locale: Locale }) {
  const a = PORTFOLIO_DATA.about;

  const renderMetricValue = (value: string) => {
    const num = parseInt(value, 10);
    if (!Number.isNaN(num) && String(num) === value.trim()) {
      return <AnimatedCounter value={num} />;
    }
    return <>{value}</>;
  };
  return (
    <section id="about" className="ds-section">
      <div className="ds-shell">
        <SectionHeading
          num={a.sectionNum}
          title={t(a.title, locale)}
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="max-w-2xl space-y-5">
            <p className="text-[length:var(--fs-body)] leading-relaxed text-ink-soft">
              {t(a.paragraph1, locale)}
            </p>
            <p className="text-[length:var(--fs-body)] leading-relaxed text-ink-soft">
              {t(a.paragraph2, locale)}
            </p>
            <p className="text-[length:var(--fs-body)] leading-relaxed text-ink-muted">
              {t(a.paragraph3, locale)}
            </p>
          </div>

          <div className="ds-panel p-6" data-reveal>
            <h3 className="text-[length:var(--fs-h3)] font-semibold text-ink">
              {t(a.drivesTitle, locale)}
            </h3>
            <ul className="mt-4 space-y-3">
              {[a.driveItem1, a.driveItem2, a.driveItem3, a.driveItem4].map(
                (item, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{t(item, locale)}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {a.outcomeMetrics.map((m, i) => (
            <div key={i} className="ds-metric group/metric transition-colors hover:border-hairline-accent">
              <div className="text-2xl font-bold text-ink transition-colors group-hover/metric:text-accent">
                {renderMetricValue(m.value)}
              </div>
              <div className="mt-1 text-sm font-medium text-ink-soft">
                {t(m.label, locale)}
              </div>
              <div className="mt-1 text-xs text-ink-faint">{t(m.note, locale)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
