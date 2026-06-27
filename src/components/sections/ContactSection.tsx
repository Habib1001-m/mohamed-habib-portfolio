import { PORTFOLIO_DATA } from "../../data/portfolioContent";
import ContactForm from "../ContactForm";

interface ContactSectionProps {
  lang: "en" | "ar";
}

const contactCards = [
  {
    label: { en: "Email", ar: "البريد الإلكتروني" },
    value: "mohamedhabib49.MH@gmail.com",
    href: "mailto:mohamedhabib49.MH@gmail.com",
    tone: "orange",
    icon: "@",
  },
  {
    label: { en: "LinkedIn", ar: "LinkedIn" },
    value: "linkedin.com/in/mohamed-habib49",
    href: "https://www.linkedin.com/in/mohamed-habib49/",
    tone: "sky",
    icon: "in",
  },
  {
    label: { en: "CV", ar: "السيرة الذاتية" },
    value: { en: "Download one-page CV", ar: "تحميل السيرة المختصرة" },
    href: "/api/cv?type=one-page",
    tone: "emerald",
    icon: "CV",
  },
  {
    label: { en: "CV", ar: "السيرة الذاتية" },
    value: { en: "Download detailed CV", ar: "تحميل السيرة التفصيلية" },
    href: "/api/cv?type=detailed",
    tone: "emerald",
    icon: "PDF",
  },
  {
    label: { en: "GitHub", ar: "GitHub" },
    value: "github.com/Habib1001-m",
    href: "https://github.com/Habib1001-m",
    tone: "red",
    icon: "GH",
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
    <section id="contact-section" className="py-24 border-t border-white/5 relative bg-gradient-to-b from-transparent to-[#050505]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-orange-500 text-sm font-bold">{contactInfo.sectionNum}</span>
          <h2 className={`text-2xl sm:text-3xl font-black text-white tracking-tight ${isRtl ? "font-arabic" : "uppercase"}`}>{contactInfo.title[lang]}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-orange-500/20 to-transparent" />
        </div>
        <p className={`text-slate-400 text-sm md:text-base mb-12 ${isRtl ? "font-arabic leading-8" : ""}`}>
          {contactInfo.subtitle[lang]}
        </p>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            {contactCards.map((card) => {
              const tone = toneClasses[card.tone];
              const value = typeof card.value === "string" ? card.value : card.value[lang];
              return (
                <a
                  key={`${card.label.en}-${value}`}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-white/10 glass transition-all group ${tone.hover}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${tone.box}`}>
                    <span className={`text-xs font-mono font-bold ${tone.text}`}>{card.icon}</span>
                  </div>
                  <div>
                    <p className={`text-[10px] text-slate-500 uppercase font-mono tracking-wider ${isRtl ? "font-arabic tracking-normal" : ""}`}>{card.label[lang]}</p>
                    <p className={`text-sm font-mono text-white transition-colors ${tone.text}`}>{value}</p>
                  </div>
                </a>
              );
            })}

            <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-white/10 glass shadow-xl">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-orange-400 text-sm">◎</span>
              </div>
              <div>
                <p className={`text-[10px] text-slate-500 uppercase font-mono tracking-wider ${isRtl ? "font-arabic tracking-normal" : ""}`}>
                  {contactInfo.locationLabel[lang]}
                </p>
                <p className={`text-sm font-mono text-white ${isRtl ? "font-arabic" : ""}`}>
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
