import { PORTFOLIO_DATA } from "../../data/portfolioContent";

interface FooterProps {
  lang: "en" | "ar";
}

export default function Footer({ lang }: FooterProps) {
  const footer = PORTFOLIO_DATA.footer;
  const isRtl = lang === "ar";

  return (
    <footer className="border-t border-white/10 py-12 bg-[#050505]/90">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex items-center gap-3.5 justify-center md:justify-start">
          <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center text-black font-black text-sm font-mono">
            H
          </div>
          <div className={isRtl ? "text-right font-arabic" : "text-left"}>
            <p className="text-sm text-slate-400 font-medium">
              {footer.author[lang]}
            </p>
            <p className="text-xs text-slate-600 font-mono mt-0.5">
              {footer.rights[lang]}
            </p>
          </div>
        </div>

        <div className="font-mono text-[10px] text-slate-500 tracking-[0.35em] uppercase">
          {footer.shlogan[lang]}
        </div>
      </div>
    </footer>
  );
}
