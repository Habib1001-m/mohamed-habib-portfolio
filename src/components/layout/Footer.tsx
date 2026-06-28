import { PORTFOLIO_DATA } from "../../data/portfolioContent";

interface FooterProps {
  lang: "en" | "ar";
}

const QUICK_LINKS = [
  { label: { en: "Email", ar: "البريد" }, href: "mailto:mohamedhabib49.mh@gmail.com" },
  { label: { en: "LinkedIn", ar: "LinkedIn" }, href: "https://www.linkedin.com/in/mohamed-habib49/" },
  { label: { en: "GitHub", ar: "GitHub" }, href: "https://github.com/Habib1001-m" },
  { label: { en: "One-page CV", ar: "السيرة المختصرة" }, href: "/cv/Mohamed_Habib_One_Page_CV.pdf" },
  { label: { en: "Detailed CV", ar: "السيرة التفصيلية" }, href: "/cv/Mohamed_Habib_Detailed_CV.pdf" },
  { label: { en: "QuickShed", ar: "QuickShed" }, href: "https://quickshed.vercel.app" },
];

const TRUST_SIGNALS = [
  { label: { en: "Based in", ar: "الموقع" }, value: { en: "Cairo, Egypt", ar: "القاهرة، مصر" } },
  { label: { en: "Contact", ar: "التواصل" }, value: { en: "Inbox delivery", ar: "إرسال مباشر" } },
  { label: { en: "CV", ar: "السيرة" }, value: { en: "PDF ready", ar: "ملفات PDF" } },
];

export default function Footer({ lang }: FooterProps) {
  const footer = PORTFOLIO_DATA.footer;
  const isRtl = lang === "ar";
  const textAlign = isRtl ? "text-right" : "text-left";

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[var(--habib-bg)] py-10 md:py-14">
      <div className="ds-shell">
        <div className="ds-panel px-5 py-6 md:px-7 md:py-7">
          <div className={`grid lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] gap-8 lg:gap-10 items-start ${isRtl ? "font-arabic" : ""}`}>
            <div className={`min-w-0 ${textAlign}`}>
              <div className={`flex items-start gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                <div className="shrink-0 w-10 h-10 rounded-[var(--habib-radius-md)] accent-gradient flex items-center justify-center text-black font-black text-base font-mono shadow-lg shadow-orange-500/10">
                  H
                </div>
                <div className="min-w-0">
                  <p className="text-base md:text-lg text-[var(--habib-text)] font-bold tracking-tight leading-snug">
                    {footer.author[lang]}
                  </p>
                  <p className={`mt-1.5 text-sm ds-muted-copy max-w-2xl ${isRtl ? "font-arabic" : ""}`}>
                    {footer.rights[lang]}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {TRUST_SIGNALS.map((signal) => (
                  <div key={signal.label.en} className="ds-metric">
                    <div className="ds-label">
                      {signal.label[lang]}
                    </div>
                    <div className="mt-1 text-sm text-slate-300 font-medium">
                      {signal.value[lang]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`min-w-0 ${textAlign}`}>
              <div className={`flex items-center justify-between gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                <p className="ds-kicker">
                  {isRtl ? "روابط سريعة" : "Quick actions"}
                </p>
                <span className="hidden sm:block h-px flex-1 bg-gradient-to-r from-orange-500/20 via-white/10 to-transparent" />
              </div>

              <div className={`mt-4 grid grid-cols-2 gap-2.5 ${isRtl ? "text-right" : "text-left"}`}>
                {QUICK_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`ds-action w-full ${isRtl ? "justify-end font-arabic" : "justify-start font-mono"}`}
                  >
                    {link.label[lang]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={`mt-7 pt-5 border-t border-white/10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between ${isRtl ? "font-arabic text-right" : "text-left"}`}>
            <p className="font-mono text-[10px] text-slate-600 tracking-[0.22em] uppercase">
              {footer.shlogan[lang]}
            </p>
            <a
              href="#hero-section"
              className={`ds-action ds-action-accent w-fit ${isRtl ? "font-arabic md:mr-auto" : "font-mono md:ml-auto"}`}
            >
              <span>{isRtl ? "العودة للأعلى" : "Back to top"}</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
