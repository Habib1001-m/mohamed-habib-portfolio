export type EvidenceArea = "testimonials" | "booking" | "caseStudies";

export type EvidenceStatus = "missing" | "collected" | "approved";

export interface ContentEvidenceItem {
  id: string;
  area: EvidenceArea;
  label: string;
  status: EvidenceStatus;
  requiredForActivation: boolean;
  notes: string;
}

export const CONTENT_EVIDENCE_PACK: ContentEvidenceItem[] = [
  {
    id: "testimonial-approved-quotes",
    area: "testimonials",
    label: "Approved public quotes",
    status: "missing",
    requiredForActivation: true,
    notes: "Collect at least 3 approved recommendations before enabling the public surface.",
  },
  {
    id: "testimonial-source-context",
    area: "testimonials",
    label: "Source and relationship context",
    status: "missing",
    requiredForActivation: true,
    notes: "Each recommendation needs source category and relationship context.",
  },
  {
    id: "booking-approved-url",
    area: "booking",
    label: "Approved booking URL",
    status: "missing",
    requiredForActivation: true,
    notes: "No booking link should be public before URL approval.",
  },
  {
    id: "booking-availability-window",
    area: "booking",
    label: "Availability window",
    status: "missing",
    requiredForActivation: true,
    notes: "Define when calls can actually be accepted.",
  },
  {
    id: "booking-call-workflow",
    area: "booking",
    label: "Call purpose and follow-up workflow",
    status: "missing",
    requiredForActivation: true,
    notes: "Define call purpose, expectations, and follow-up steps.",
  },
  {
    id: "case-study-approved-screenshots",
    area: "caseStudies",
    label: "Approved screenshots",
    status: "missing",
    requiredForActivation: true,
    notes: "Screenshots need review before public case-study activation.",
  },
  {
    id: "case-study-approved-outcomes",
    area: "caseStudies",
    label: "Approved outcome wording",
    status: "missing",
    requiredForActivation: true,
    notes: "Outcome language must be proof-safe and not overstate project impact.",
  },
  {
    id: "case-study-disclosure-boundaries",
    area: "caseStudies",
    label: "Disclosure boundaries",
    status: "missing",
    requiredForActivation: true,
    notes: "Restricted details need clear exclusion rules before publishing.",
  },
];

export const contentEvidencePackIsReady = CONTENT_EVIDENCE_PACK.every(
  (item) => !item.requiredForActivation || item.status === "approved"
);

export const CONTENT_EVIDENCE_PACK_DECISION = {
  phase: "v2.3-F",
  status: "collection-required",
  publicActivation: false,
  readyForActivation: contentEvidencePackIsReady,
  decisionSummary:
    "The evidence pack defines what must be collected and approved before trust surfaces can go public.",
  nextSafeSprint: "v2.3-G-trust-content-approval-workflow",
} as const;
