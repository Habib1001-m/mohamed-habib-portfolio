export function SectionHeading({
  num,
  title,
  subtitle,
}: {
  num: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-4xl" data-reveal>
      <div className="flex items-center gap-4">
        <span className="ds-section-num inline-flex h-7 w-7 items-center justify-center rounded-full border border-hairline-accent bg-[rgba(255,138,31,0.05)]">
          {num}
        </span>
        <span className="ds-rule" />
      </div>
      <h2 className="ds-section-title mt-5 max-w-3xl">{title}</h2>
      {subtitle && <p className="ds-muted mt-3 max-w-3xl text-[0.98rem]">{subtitle}</p>}
    </div>
  );
}
