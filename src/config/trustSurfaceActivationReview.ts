import { FEATURES, TRUST_CONFIG } from "./features";
import { bookingWorkflowIsReady } from "./bookingWorkflow";
import { testimonialReviewQueueIsReady } from "../data/testimonialReviewQueue";
import { caseStudyReadinessAuditIsReady } from "../data/caseStudyReadinessAudit";

export type TrustSurfaceName = "testimonials" | "booking" | "caseStudies";

export type TrustSurfaceReviewStatus = "no-go" | "ready-for-review" | "ready";

export interface TrustSurfaceActivationReviewItem {
  surface: TrustSurfaceName;
  currentFeatureFlag: boolean;
  readiness: boolean;
  activationStatus: TrustSurfaceReviewStatus;
  publicActivation: false;
  blockers: string[];
}

export const TRUST_SURFACE_ACTIVATION_REVIEW: TrustSurfaceActivationReviewItem[] = [
  {
    surface: "testimonials",
    currentFeatureFlag: FEATURES.testimonials,
    readiness: testimonialReviewQueueIsReady,
    activationStatus: "no-go",
    publicActivation: false,
    blockers: [
      "review queue is empty",
      `minimum approved count is ${TRUST_CONFIG.testimonialsMinimumCount}`,
      "public-use evidence is not available",
      "feature flag remains off",
    ],
  },
  {
    surface: "booking",
    currentFeatureFlag: FEATURES.booking,
    readiness: bookingWorkflowIsReady,
    activationStatus: "no-go",
    publicActivation: false,
    blockers: [
      "booking URL is not approved",
      "availability window is not approved",
      "call purpose is not approved",
      "follow-up workflow is not approved",
      "feature flag remains off",
    ],
  },
  {
    surface: "caseStudies",
    currentFeatureFlag: FEATURES.caseStudies,
    readiness: caseStudyReadinessAuditIsReady,
    activationStatus: "no-go",
    publicActivation: false,
    blockers: [
      "no case study is ready",
      "current case studies are draft or restricted",
      "screenshots and metrics are not approved",
      "feature flag remains off",
    ],
  },
];

export const trustSurfaceActivationIsReady = TRUST_SURFACE_ACTIVATION_REVIEW.every(
  (item) => item.activationStatus === "ready" && item.readiness && item.currentFeatureFlag
);

export const TRUST_SURFACE_ACTIVATION_DECISION = {
  phase: "v2.3-E",
  status: "no-go",
  publicActivation: false,
  decisionSummary:
    "Trust surfaces remain hidden because testimonials, booking workflow, and case studies do not meet approval gates yet.",
  nextSafeSprint: "v2.3-F-content-evidence-pack",
} as const;
