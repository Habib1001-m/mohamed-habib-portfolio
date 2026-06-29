export type CaseStudyAuditStatus = "no-go" | "ready-for-review" | "ready";

export type CaseStudyAuditBlocker =
  | "status-draft"
  | "status-restricted"
  | "screenshots-not-approved"
  | "metrics-not-approved"
  | "public-copy-not-approved"
  | "restricted-access"
  | "private-details-risk"
  | "timeline-not-final";

export interface CaseStudyReadinessAuditItem {
  projectId: "quickshed" | "sieve" | "portfolio";
  currentStatus: "draft" | "restricted" | "ready";
  auditStatus: CaseStudyAuditStatus;
  publicActivation: false;
  blockers: CaseStudyAuditBlocker[];
  requiredNextEvidence: string[];
}

export const CASE_STUDY_READINESS_AUDIT: CaseStudyReadinessAuditItem[] = [
  {
    projectId: "quickshed",
    currentStatus: "draft",
    auditStatus: "no-go",
    publicActivation: false,
    blockers: [
      "status-draft",
      "screenshots-not-approved",
      "metrics-not-approved",
      "public-copy-not-approved",
    ],
    requiredNextEvidence: [
      "final outcome wording",
      "approved product screenshots",
      "approved validation notes",
      "public-safe metrics or qualitative proof",
    ],
  },
  {
    projectId: "sieve",
    currentStatus: "restricted",
    auditStatus: "no-go",
    publicActivation: false,
    blockers: [
      "status-restricted",
      "restricted-access",
      "private-details-risk",
      "screenshots-not-approved",
      "public-copy-not-approved",
    ],
    requiredNextEvidence: [
      "restricted-safe summary",
      "approved redacted screenshots",
      "approved disclosure boundary",
      "explicit list of details that must stay hidden",
    ],
  },
  {
    projectId: "portfolio",
    currentStatus: "draft",
    auditStatus: "no-go",
    publicActivation: false,
    blockers: [
      "status-draft",
      "timeline-not-final",
      "screenshots-not-approved",
      "metrics-not-approved",
      "public-copy-not-approved",
    ],
    requiredNextEvidence: [
      "before and after screenshots",
      "sprint timeline",
      "deployment proof summary",
      "approved outcome wording",
    ],
  },
];

export const READY_CASE_STUDY_IDS = CASE_STUDY_READINESS_AUDIT.filter(
  (item) => item.auditStatus === "ready" && item.publicActivation === false
).map((item) => item.projectId);

export const caseStudyReadinessAuditIsReady = READY_CASE_STUDY_IDS.length > 0;

export const CASE_STUDY_ACTIVATION_DECISION = {
  phase: "v2.3-C",
  publicActivation: "no-go",
  reason:
    "All current case studies are still draft or restricted and require approved evidence before public activation.",
  nextSafeAction: "prepare-case-study-evidence-pack",
} as const;
