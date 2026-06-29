import { FEATURES, TRUST_CONFIG } from "../config/features";
import { bookingWorkflowIsReady } from "../config/bookingWorkflow";

export const BOOKING_COPY = {
  label: {
    en: "Booking",
    ar: "حجز مكالمة",
  },
  value: {
    en: "Book a discovery call",
    ar: "احجز مكالمة تعريفية",
  },
  note: {
    en: "Booking is enabled only after availability and call workflow are approved.",
    ar: "يتم تفعيل الحجز فقط بعد اعتماد المواعيد ومسار المكالمات.",
  },
} as const;

export const bookingIsReady = Boolean(
  FEATURES.booking && TRUST_CONFIG.bookingUrl && bookingWorkflowIsReady
);
