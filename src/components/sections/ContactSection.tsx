"use client";

import { Mail, Linkedin, Github, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioContent";
import { CONTACT_LINKS } from "@/data/contact";
import { t, type Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { track } from "@/lib/analytics";

const LINK_ICON: Record<string, React.ElementType> = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  cvOnePage: FileText,
  cvDetailed: FileText,
};

function displayValue(link: { type: string; href: string }): string {
  if (link.type === "email") return link.href.replace(/^mailto:/, "");
  if (link.type === "cvOnePage") return "one-page PDF";
  if (link.type === "cvDetailed") return "detailed PDF";
  return link.href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function ContactSection({ locale }: { locale: Locale }) {
  const c = PORTFOLIO_DATA.contact;

  return (
    <section id="contact" className="ds-section">
      <div className="ds-shell">
        <SectionHeading
          num={c.sectionNum}
          title={t(c.title, locale)}
          subtitle={t(c.subtitle, locale)}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div>
            {/* Contact links — compact grid */}
            <div className="grid gap-2 sm:grid-cols-2">
              {CONTACT_LINKS.map((link) => {
                const Icon = LINK_ICON[link.type] ?? Mail;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="ds-card ds-card-hover group flex items-center gap-3 p-3"
                    onClick={() =>
                      track({
                        eventName: "contact_card_clicked",
                        category: "contact",
                        props: { card: link.id },
                      })
                    }
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[var(--r-md)] border border-hairline bg-white/[0.02]">
                      <Icon className="h-4 w-4 text-accent" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-ink-soft">{t(link.label, locale)}</div>
                      <div className="mt-0.5 truncate text-[0.7rem] text-ink-faint">
                        {displayValue(link)}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Availability note */}
            <div className="mt-4 flex items-center gap-3 rounded-[var(--r-lg)] border border-hairline bg-white/[0.015] p-4">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-[var(--green)]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--green)]" />
              </span>
              <div>
                <div className="text-sm font-medium text-ink">
                  {t({ en: "Available for selected collaborations", ar: "متاح لتعاونات مختارة" }, locale)}
                </div>
                <div className="mt-0.5 text-xs text-ink-faint">
                  {t({ en: "Based in Cairo · Reply within 1 business day", ar: "من القاهرة · الرد خلال يوم عمل" }, locale)}
                </div>
              </div>
            </div>
            <BookingCTA locale={locale} />
          </div>

          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}
