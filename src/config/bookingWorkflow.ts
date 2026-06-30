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
