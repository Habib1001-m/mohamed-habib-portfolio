import { TRUST_CONFIG } from "../config/features";
import { BOOKING_COPY, bookingIsReady } from "../data/booking";
import { trackEvent } from "../lib/analytics";

interface BookingCTAProps {
  lang: "en" | "ar";
}

export default function BookingCTA({ lang }: BookingCTAProps) {
  const isRtl = lang === "ar";

  if (!bookingIsReady || !TRUST_CONFIG.bookingUrl) {
    return null;
  }

  return (
    <a
      href={TRUST_CONFIG.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("booking_clicked", { source: "contact_section", lang })}
      className={`ds-card ds-card-hover flex items-center gap-4 p-4 transition-all group hover:border-orange-500/30 ${isRtl ? "flex-row-reverse text-right font-arabic" : "text-left"}`}
    >
      <div className="w-10 h-10 rounded-[var(--habib-radius-md)] bg-orange-500/10 group-hover:bg-orange-500/20 flex items-center justify-center flex-shrink-0 transition-colors">
        <span className="text-xs font-mono font-bold text-orange-400 group-hover:text-orange-300">CAL</span>
      </div>
      <div className="min-w-0">
        <p className="ds-label">{BOOKING_COPY.label[lang]}</p>
        <p className={`text-sm text-white transition-colors text-orange-400 group-hover:text-orange-300 ${isRtl ? "font-arabic" : "font-mono"}`}>
          {BOOKING_COPY.value[lang]}
        </p>
      </div>
    </a>
  );
}
