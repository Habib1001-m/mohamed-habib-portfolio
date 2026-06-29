export const TRUST_CONTENT_READINESS_DECISION = {
  phase: "v2.3-A",
  status: "plan-only",
  publicTrustActivation: "no-go",
  rationale:
    "Trust features should remain gated until testimonials, booking workflow, and case-study content have real approval evidence.",
  approvedNextAction: "prepare-content-collection-and-review-structures",
} as const;

export const TRUST_CONTENT_GATES = {
  testimonials: {
    publicActivation: false,
    minimumApprovedCount: 3,
    requiredEvidence: [
      "approvedForPublicUse",
      "sourceCategory",
      "authorName",
      "relationshipContext",
    ],
    blockedStates: ["placeholder", "anonymous-without-approval", "unverified-quote"],
  },
  booking: {
    publicActivation: false,
    requiredEvidence: [
      "approvedBookingUrl",
      "availabilityWindow",
      "callPurpose",
      "followUpWorkflow",
    ],
    blockedStates: ["placeholder-url", "unclear-offer", "overpromising-copy"],
  },
  caseStudies: {
    publicActivation: false,
    requiredEvidence: [
      "readyStatus",
      "proofSafeCopy",
      "approvedScreenshots",
      "approvedMetrics",
    ],
    blockedStates: ["draft", "restricted", "private-implementation-detail", "unapproved-metric"],
  },
} as const;

export const TRUST_CONTENT_NEXT_SEQUENCE = [
  "v2.3-B-testimonial-collection-schema",
  "v2.3-C-case-study-readiness-audit",
  "v2.3-D-booking-workflow-decision",
  "v2.3-E-trust-surface-activation-review",
] as const;
