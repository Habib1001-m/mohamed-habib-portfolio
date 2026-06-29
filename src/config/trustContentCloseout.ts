import {
  TRUST_CONTENT_APPROVAL_WORKFLOW_DECISION,
  missingEvidenceItemIds,
  trustContentApprovalWorkflowIsReady,
} from "./trustContentApprovalWorkflow";
import { TRUST_SURFACE_ACTIVATION_DECISION } from "./trustSurfaceActivationReview";
import { CONTENT_EVIDENCE_PACK_DECISION } from "../data/contentEvidencePack";

export const TRUST_CONTENT_CLOSEOUT_DECISION = {
  phase: "v2.3-H",
  status: "closed-with-blockers",
  publicActivation: false,
  readyForActivation: trustContentApprovalWorkflowIsReady,
  planningStatus: "complete",
  activationStatus: "blocked-until-real-evidence-is-approved",
  decisionSummary:
    "Trust content planning is complete. Public trust surfaces remain blocked because required evidence is still missing or unapproved.",
  carriedForwardBlockers: missingEvidenceItemIds,
  sourceDecisions: {
    evidencePack: CONTENT_EVIDENCE_PACK_DECISION.status,
    activationReview: TRUST_SURFACE_ACTIVATION_DECISION.status,
    approvalWorkflow: TRUST_CONTENT_APPROVAL_WORKFLOW_DECISION.status,
  },
  nextSafeSprint: "v2.4-public-proof-assets",
} as const;

export const TRUST_CONTENT_CLOSEOUT_GUARDRAILS = [
  "Keep testimonials hidden until at least 3 approved recommendations exist.",
  "Keep booking hidden until URL, availability, purpose, and follow-up workflow are approved.",
  "Keep case studies hidden until screenshots, outcomes, and disclosure boundaries are approved.",
  "Do not add placeholder trust content.",
  "Do not activate public trust surfaces in the same commit that approves content.",
  "Do not expose restricted project details.",
] as const;

export const trustContentCloseoutIsSafe =
  TRUST_CONTENT_CLOSEOUT_DECISION.planningStatus === "complete" &&
  TRUST_CONTENT_CLOSEOUT_DECISION.publicActivation === false;
