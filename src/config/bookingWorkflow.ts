/**
 * Runtime booking-workflow configuration for the v3.1 Next.js port.
 *
 * Ported from the frozen Vite baseline (`repo_clone/src/config/bookingWorkflow.ts`),
 * keeping BOOKING_WORKFLOW_REQUIREMENTS and bookingWorkflowIsReady behavior
 * verbatim. The boolean readiness flags (all `false`) are preserved as a
 * runtime status object.
 *
 * The BOOKING_WORKFLOW_DECISION history object is a decision-record artifact
 * (documentation-as-code) and remains in the frozen Vite baseline — only its
 * boolean gate flags are preserved here, as BOOKING_WORKFLOW_STATUS.
 */
export type BookingWorkflowStatus = "no-go" | "ready-for-review" | "ready";

export const BOOKING_WORKFLOW_STATUS = {
  status: "no-go" as BookingWorkflowStatus,
  publicActivation: false,
  bookingUrlApproved: false,
  availabilityApproved: false,
  callPurposeApproved: false,
  followUpWorkflowApproved: false,
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
  BOOKING_WORKFLOW_STATUS.publicActivation &&
    BOOKING_WORKFLOW_STATUS.bookingUrlApproved &&
    BOOKING_WORKFLOW_STATUS.availabilityApproved &&
    BOOKING_WORKFLOW_STATUS.callPurposeApproved &&
    BOOKING_WORKFLOW_STATUS.followUpWorkflowApproved &&
    BOOKING_WORKFLOW_REQUIREMENTS.approvedBookingUrl
);
