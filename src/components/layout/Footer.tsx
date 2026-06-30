import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioContent";
import { CONTACT_LINKS } from "@/data/contact";
import { t, type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const f = PORTFOLIO_DATA.footer;
  return (
    <footer className="mt-auto border-t border-hairline bg-bg">
      <div className="ds-shell py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-md accent-gradient text-[#0a0b0e] font-bold text-xs">
                H
              </span>
              <span className="font-mono text-sm text-ink">
                habib<span className="text-gold">.</span>systems
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {t(f.author, locale)}
            </p>
            <p className="mt-2 text-xs text-ink-faint">{t(f.rights, locale)}</p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="ds-label">
              {t({ en: "Connect", ar: "تواصل" }, locale)}
            </span>
            <div className="flex flex-wrap gap-2">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="ds-chip hover:border-hairline-accent hover:text-ink transition-colors"
                >
                  {t(link.label, locale)}
                </a>
              ))}
            </div>
            <p className="mt-2 font-mono text-[0.7rem] tracking-widest text-ink-faint">
              {t(f.shlogan, locale)}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-ink-faint">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-[var(--green)]" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
              </span>
              {t({ en: "Available for work", ar: "متاح للعمل" }, locale)}
            </span>
            <span className="font-mono text-[0.7rem] text-ink-faint">
              © {new Date().getFullYear()} Mohamed Habib
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[0.7rem] text-ink-faint sm:inline">
              {t({ en: "Press ? for shortcuts", ar: "اضغط ? لل shortcuts" }, locale)}
            </span>
            <Link
              href="#hero"
              className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink transition-colors"
            >
              <ArrowUp className="h-3 w-3" />
              {t({ en: "Back to top", ar: "إلى الأعلى" }, locale)}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
