import { PORTFOLIO_DATA } from "../../data/portfolioContent";
import ContactForm from "../ContactForm";

interface ContactSectionProps {
  lang: "en" | "ar";
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const isRtl = lang === "ar";
  const contactInfo = PORTFOLIO_DATA.contact;

  return (
    <section id="contact-section" className="py-24 border-t border-white/5 relative bg-gradient-to-b from-transparent to-[#050505]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-orange-500 text-sm font-bold">{contactInfo.sectionNum}</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">{contactInfo.title[lang]}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-orange-500/20 to-transparent"></div>
        </div>
        <p className="text-slate-400 text-sm md:text-base mb-12">
          {contactInfo.subtitle[lang]}
        </p>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Contact details sidebar */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="mailto:mohamedhabib49.MH@gmail.com"
              className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-white/10 glass hover:border-orange-500/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className={`text-[10px] text-slate-500 uppercase font-mono tracking-wider ${isRtl ? "font-arabic" : ""}`}>{lang === "ar" ? "البريد الإلكتروني" : "Email"}</p>
                <p className="text-sm font-mono text-white group-hover:text-orange-400 transition-colors">mohamedhabib49.MH@gmail.com</p>
              </div>
            </a>

            <a
              href="https://quickshed.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-white/10 glass hover:border-amber-500/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <p className={`text-[10px] text-slate-500 uppercase font-mono tracking-wider ${isRtl ? "font-arabic" : ""}`}>{lang === "ar" ? "الرابط السحابي للمشروع" : "Cloud Project Website"}</p>
                <p className="text-sm font-mono text-white group-hover:text-amber-400 transition-colors">quickshed.vercel.app</p>
              </div>
            </a>

            <a
              href="https://github.com/Habib1001-m"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-white/10 glass hover:border-red-500/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">GitHub</p>
                <p className="text-sm font-mono text-white group-hover:text-red-400 transition-colors">github.com/Habib1001-m</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-white/10 glass shadow-xl">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className={`text-[10px] text-slate-500 uppercase font-mono tracking-wider ${isRtl ? "font-arabic" : ""}`}>
                  {contactInfo.locationLabel[lang]}
                </p>
                <p className={`text-sm font-mono text-white ${isRtl ? "font-arabic" : ""}`}>
                  {contactInfo.locationValue[lang]}
                </p>
              </div>
            </div>
          </div>

          {/* Right Form column */}
          <div className="lg:col-span-7">
            <ContactForm lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}
