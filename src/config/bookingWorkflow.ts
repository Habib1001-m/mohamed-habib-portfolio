export type BookingWorkflowStatus = "no-go" | "ready-for-review" | "ready";

export const BOOKING_WORKFLOW_DECISION = {
  phase: "v2.3-D",
  status: "no-go" as BookingWorkflowStatus,
  publicActivation: false,
  bookingUrlApproved: false,
  availabilityApproved: false,
  callPurposeApproved: false,
  followUpWorkflowApproved: false,
  decisionSummary:
    "Booking remains hidden until a real booking URL, availability window, call purpose, and follow-up workflow are approved.",
  nextSafeAction: "define-booking-availability-and-call-workflow",
} as const;

export const BOOKING_WORKFLOW_REQUIREMENTS = {
  approvedBookingUrl: null as string | null,
  availabilityWindows: [] as string[],
  callPurpose: {
    en: "",
    ar: "",
  },
  preCallExpectations: [] as string[],
  followUpWorkflow: [] as string[],
} as const;

export const bookingWorkflowIsReady = Boolean(
  BOOKING_WORKFLOW_DECISION.publicActivation &&
    BOOKING_WORKFLOW_DECISION.bookingUrlApproved &&
    BOOKING_WORKFLOW_DECISION.availabilityApproved &&
    BOOKING_WORKFLOW_DECISION.callPurposeApproved &&
    BOOKING_WORKFLOW_DECISION.followUpWorkflowApproved &&
    BOOKING_WORKFLOW_REQUIREMENTS.approvedBookingUrl
);
