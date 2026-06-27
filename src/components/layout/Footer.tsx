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

export default function Footer({ lang }: FooterProps) {
  const footer = PORTFOLIO_DATA.footer;
  const isRtl = lang === "ar";

  return (
    <footer className="border-t border-white/10 py-12 bg-[#050505]/90 relative z-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1fr_auto] gap-8 items-start">
        <div className={`space-y-5 ${isRtl ? "text-right font-arabic" : "text-left"}`}>
          <div className={`flex items-center gap-3.5 ${isRtl ? "justify-end" : "justify-start"}`}>
            <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center text-black font-black text-sm font-mono">
              H
            </div>
            <div>
              <p className="text-sm text-slate-300 font-medium">
                {footer.author[lang]}
              </p>
              <p className="text-xs text-slate-600 font-mono mt-0.5">
                {footer.rights[lang]}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:max-w-2xl">
            {QUICK_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-xs text-slate-400 hover:text-white hover:border-orange-500/30 hover:bg-orange-500/[0.04] transition-all ${isRtl ? "font-arabic" : "font-mono"}`}
              >
                {link.label[lang]}
              </a>
            ))}
            <a
              href="#hero-section"
              className={`px-3 py-1.5 rounded-lg border border-orange-500/20 bg-orange-500/[0.06] text-xs text-orange-300 hover:text-orange-200 transition-all ${isRtl ? "font-arabic" : "font-mono"}`}
            >
              {isRtl ? "العودة للأعلى" : "Back to top"}
            </a>
          </div>
        </div>

        <div className={`font-mono text-[10px] text-slate-500 tracking-[0.35em] uppercase ${isRtl ? "md:text-left" : "md:text-right"}`}>
          {footer.shlogan[lang]}
        </div>
      </div>
    </footer>
  );
}
