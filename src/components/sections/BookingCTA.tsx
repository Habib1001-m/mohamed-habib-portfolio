"use client";

import { CalendarDays, ArrowUpRight } from "lucide-react";
import { FEATURES, TRUST_CONFIG } from "@/config/features";
import { bookingTrustReady } from "@/config/trust";
import { bookingWorkflowIsReady } from "@/config/bookingWorkflow";
import { BOOKING_COPY } from "@/data/booking";
import { canPublishBooking } from "@/lib/trustPresentation.mjs";
import { track } from "@/lib/analytics";
import { t, type Locale } from "@/lib/i18n";

export function BookingCTA({ locale }: { locale: Locale }) {
  const shouldShow = canPublishBooking({
    featureEnabled: FEATURES.booking,
    trustReady: bookingTrustReady,
    workflowReady: bookingWorkflowIsReady,
    bookingUrl: TRUST_CONFIG.bookingUrl,
  });

  if (!shouldShow || !TRUST_CONFIG.bookingUrl) return null;

  return (
    <a
      href={TRUST_CONFIG.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="ds-card ds-card-hover group mt-4 flex items-center gap-3 p-4"
      onClick={() =>
        track({
          eventName: "booking_clicked",
          category: "lead",
          props: { source: "contact_section", language: locale },
        })
      }
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--r-md)] border border-hairline-accent bg-[var(--accent-glow)]">
        <CalendarDays className="h-4 w-4 text-accent" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="ds-label block">{t(BOOKING_COPY.label, locale)}</span>
        <span className="mt-0.5 block text-sm font-medium text-ink">
          {t(BOOKING_COPY.value, locale)}
        </span>
      </span>
      <ArrowUpRight className="h-4 w-4 text-ink-faint transition-colors group-hover:text-accent rtl:-rotate-90" />
    </a>
  );
}
