import { PORTFOLIO_DATA } from "../../data/portfolioContent";
import { trackEvent } from "../../lib/analytics";
import BookingCTA from "../BookingCTA";
import ContactForm from "../ContactForm";

interface ContactSectionProps {
  lang: "en" | "ar";
}

const contactCards = [
  {
    label: { en: "Email", ar: "البريد الإلكتروني" },
    value: "mohamedhabib49.mh@gmail.com",
    href: "mailto:mohamedhabib49.mh@gmail.com",
    tone: "orange",
    icon: "@",
    eventName: "email_clicked" as const,
  },
  {
    label: { en: "LinkedIn", ar: "LinkedIn" },
    value: "linkedin.com/in/mohamed-habib49",
    href: "https://www.linkedin.com/in/mohamed-habib49/",
    tone: "sky",
    icon: "in",
    eventName: "linkedin_clicked" as const,
  },
  {
    label: { en: "CV", ar: "السيرة الذاتية" },
    value: { en: "Download one-page CV", ar: "تحميل السيرة المختصرة" },
    href: "/cv/Mohamed_Habib_One_Page_CV.pdf",
    tone: "emerald",
    icon: "CV",
    eventName: "cv_one_page_clicked" as const,
  },
  {
    label: { en: "CV", ar: "السيرة الذاتية" },
    value: { en: "Download detailed CV", ar: "تحميل السيرة التفصيلية" },
    href: "/cv/Mohamed_Habib_Detailed_CV.pdf",
    tone: "emerald",
    icon: "PDF",
    eventName: "cv_detailed_clicked" as const,
  },
  {
    label: { en: "GitHub", ar: "GitHub" },
    value: "github.com/Habib1001-m",
    href: "https://github.com/Habib1001-m",
    tone: "red",
    icon: "GH",
    eventName: "github_clicked" as const,
  },
];

const toneClasses: Record<string, { box: string; text: string; hover: string }> = {
  orange: { box: "bg-orange-500/10 group-hover:bg-orange-500/20", text: "text-orange-400 group-hover:text-orange-300", hover: "hover:border-orange-500/30" },
  sky: { box: "bg-sky-500/10 group-hover:bg-sky-500/20", text: "text-sky-400 group-hover:text-sky-300", hover: "hover:border-sky-500/30" },
  emerald: { box: "bg-emerald-500/10 group-hover:bg-emerald-500/20", text: "text-emerald-400 group-hover:text-emerald-300", hover: "hover:border-emerald-500/30" },
  red: { box: "bg-red-500/10 group-hover:bg-red-500/20", text: "text-red-400 group-hover:text-red-300", hover: "hover:border-red-500/30" },
};

export default function ContactSection({ lang }: ContactSectionProps) {
  const isRtl = lang === "ar";
  const contactInfo = PORTFOLIO_DATA.contact;

  return (
    <section id="contact-section" className="py-24 border-t border-white/5 relative bg-gradient-to-b from-transparent to-[var(--habib-bg)]">
      <div className="ds-shell">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-orange-500 text-sm font-bold">{contactInfo.sectionNum}</span>
          <h2 className={`text-2xl sm:text-3xl font-black text-white tracking-tight ${isRtl ? "font-arabic" : "uppercase"}`}>{contactInfo.title[lang]}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-orange-500/20 to-transparent" />
        </div>
        <p className={`ds-muted-copy text-sm md:text-base mb-12 max-w-5xl ${isRtl ? "font-arabic leading-8 text-right" : ""}`}>
          {contactInfo.subtitle[lang]}
        </p>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-5 space-y-3.5">
            {contactCards.map((card) => {
              const tone = toneClasses[card.tone];
              const value = typeof card.value === "string" ? card.value : card.value[lang];
              return (
                <a
                  key={`${card.label.en}-${value}`}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={() => {
                    trackEvent("contact_card_clicked", { label: card.label.en, href_type: card.href.startsWith("http") ? "external" : "internal", lang });
                    trackEvent(card.eventName, { source: "contact_section", lang });
                  }}
                  className={`ds-card ds-card-hover flex items-center gap-4 p-4 transition-all group ${tone.hover} ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}
                >
                  <div className={`w-10 h-10 rounded-[var(--habib-radius-md)] flex items-center justify-center flex-shrink-0 transition-colors ${tone.box}`}>
                    <span className={`text-xs font-mono font-bold ${tone.text}`}>{card.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="ds-label">{card.label[lang]}</p>
                    <p className={`text-sm text-white transition-colors truncate ${isRtl ? "font-arabic" : "font-mono"} ${tone.text}`}>{value}</p>
                  </div>
                </a>
              );
            })}

            <BookingCTA lang={lang} />

            <div className={`ds-card flex items-center gap-4 p-4 shadow-xl ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
              <div className="w-10 h-10 rounded-[var(--habib-radius-md)] bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-orange-400 text-sm">◎</span>
              </div>
              <div className="min-w-0">
                <p className="ds-label">
                  {contactInfo.locationLabel[lang]}
                </p>
                <p className={`text-sm text-white ${isRtl ? "font-arabic" : "font-mono"}`}>
                  {contactInfo.locationValue[lang]}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}
