import { CONTENT_EVIDENCE_PACK, contentEvidencePackIsReady } from "../data/contentEvidencePack";
import { trustSurfaceActivationIsReady } from "./trustSurfaceActivationReview";

export type TrustApprovalStage =
  | "collect-evidence"
  | "review-evidence"
  | "approve-content"
  | "activate-surface";

export type TrustApprovalStatus = "not-started" | "in-progress" | "blocked" | "approved";

export interface TrustApprovalWorkflowStep {
  id: string;
  stage: TrustApprovalStage;
  status: TrustApprovalStatus;
  owner: "operator" | "reviewer" | "implementation";
  requiredBeforePublicActivation: boolean;
  description: string;
}

export const TRUST_CONTENT_APPROVAL_WORKFLOW: TrustApprovalWorkflowStep[] = [
  {
    id: "collect-testimonial-evidence",
    stage: "collect-evidence",
    status: "not-started",
    owner: "operator",
    requiredBeforePublicActivation: true,
    description: "Collect approved recommendations with source and relationship context.",
  },
  {
    id: "collect-booking-workflow",
    stage: "collect-evidence",
    status: "not-started",
    owner: "operator",
    requiredBeforePublicActivation: true,
    description: "Define approved booking URL, availability, call purpose, and follow-up workflow.",
  },
  {
    id: "collect-case-study-evidence",
    stage: "collect-evidence",
    status: "not-started",
    owner: "operator",
    requiredBeforePublicActivation: true,
    description: "Collect approved screenshots, outcome wording, and disclosure boundaries for case studies.",
  },
  {
    id: "review-evidence-pack",
    stage: "review-evidence",
    status: contentEvidencePackIsReady ? "in-progress" : "blocked",
    owner: "reviewer",
    requiredBeforePublicActivation: true,
    description: "Review the content evidence pack before any public trust surface activation.",
  },
  {
    id: "approve-public-copy",
    stage: "approve-content",
    status: "blocked",
    owner: "reviewer",
    requiredBeforePublicActivation: true,
    description: "Approve public-facing copy only after evidence has been collected and reviewed.",
  },
  {
    id: "activate-trust-surfaces",
    stage: "activate-surface",
    status: trustSurfaceActivationIsReady ? "in-progress" : "blocked",
    owner: "implementation",
    requiredBeforePublicActivation: true,
    description: "Enable public trust surfaces only in a separate activation commit after approval.",
  },
];

export const missingEvidenceItemIds = CONTENT_EVIDENCE_PACK.filter(
  (item) => item.requiredForActivation && item.status !== "approved"
).map((item) => item.id);

export const trustContentApprovalWorkflowIsReady =
  missingEvidenceItemIds.length === 0 && trustSurfaceActivationIsReady;

export const TRUST_CONTENT_APPROVAL_WORKFLOW_DECISION = {
  phase: "v2.3-G",
  status: "blocked-until-evidence-approved",
  publicActivation: false,
  readyForActivation: trustContentApprovalWorkflowIsReady,
  missingEvidenceItemIds,
  hardRule: "Content approval and public activation must not happen in the same commit.",
  nextSafeSprint: "v2.3-H-trust-content-closeout",
} as const;
