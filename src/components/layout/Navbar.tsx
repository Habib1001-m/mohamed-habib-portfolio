"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Languages } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioContent";
import { isRtl, localeSwitchHref, t, type Locale } from "@/lib/i18n";
import { track } from "@/lib/analytics";

const NAV_IDS = [
  "about",
  "projects",
  "experience",
  "stack",
  "contact",
] as const;

export function Navbar({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<string>("about");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const rtl = isRtl(locale);
  const nav = PORTFOLIO_DATA.navigation;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.5, 1] },
    );
    NAV_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLink = (id: (typeof NAV_IDS)[number]) => {
    const isActive = active === id;
    return (
      <a
        key={id}
        href={`#${id}`}
        aria-current={isActive ? "page" : undefined}
        onClick={() => setOpen(false)}
        className={`text-sm font-medium transition-colors ${
          isActive
            ? "text-ink"
            : "text-ink-muted hover:text-ink"
        }`}
      >
        {t(nav[id], locale)}
      </a>
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass border-b border-hairline" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label={t({ en: "Primary", ar: "التنقل الرئيسي" }, locale)}
        className="ds-shell flex h-16 items-center justify-between gap-4"
      >
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 group"
          aria-label={t(
            { en: "Mohamed Habib portfolio home", ar: "صفحة البورتفوليو الرئيسية" },
            locale,
          )}
        >
          <span className="grid h-8 w-8 place-items-center rounded-md accent-gradient text-[#0a0b0e] font-bold text-sm">
            H
          </span>
          <span className="font-mono text-sm tracking-tight text-ink">
            habib<span className="text-gold">.</span>systems
          </span>
          <span
            className="ml-1 hidden font-mono text-[0.65rem] text-ink-faint transition-opacity duration-300 sm:inline"
            data-section-counter
          >
            {String(NAV_IDS.indexOf(active as typeof NAV_IDS[number]) + 1).padStart(2, "0")}
            <span className="text-ink-faint/50">/0{NAV_IDS.length}</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_IDS.map(navLink)}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={localeSwitchHref(pathname, locale === "en" ? "ar" : "en")}
            className="ds-action !min-h-0 !px-2.5 !py-1.5 text-xs"
            aria-label={t(
              { en: "Switch to Arabic", ar: "التبديل إلى الإنجليزية" },
              locale,
            )}
            onClick={() =>
              track({
                eventName: "language_toggled",
                category: "navigation",
                props: { from: locale, to: locale === "en" ? "ar" : "en" },
              })
            }
          >
            <Languages className="h-3.5 w-3.5" />
            {locale === "en" ? "عربي" : "EN"}
          </Link>
          <a
            href="#contact"
            className="ds-action-primary ds-action hidden sm:inline-flex !text-xs"
          >
            {t(nav.contact, locale)}
          </a>
          <button
            type="button"
            className="md:hidden ds-action !min-h-0 !px-2 !py-2"
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            aria-label={t({ en: "Open menu", ar: "فتح القائمة" }, locale)}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-nav-menu"
          className="glass md:hidden border-t border-hairline"
        >
          <div className="ds-shell flex flex-col gap-1 py-4">
            {NAV_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-ink-muted hover:bg-white/[0.03] hover:text-ink"
              >
                {t(nav[id], locale)}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
