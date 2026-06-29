export type ProofLayerPlacementId =
  | "after-about-before-projects"
  | "after-projects-before-systems-lab"
  | "after-tech-stack-before-contact"
  | "inside-contact-conversion-area";

export type ProofLayerPlacementStatus = "recommended" | "acceptable" | "rejected";

export interface ProofLayerPlacementCandidate {
  id: ProofLayerPlacementId;
  status: ProofLayerPlacementStatus;
  rationale: string;
  risks: string[];
}

export const PROOF_LAYER_PLACEMENT_CANDIDATES: ProofLayerPlacementCandidate[] = [
  {
    id: "after-about-before-projects",
    status: "acceptable",
    rationale:
      "This placement adds credibility early, but it can interrupt the transition from identity to project evidence.",
    risks: ["May feel too self-validating before the user sees actual projects."],
  },
  {
    id: "after-projects-before-systems-lab",
    status: "recommended",
    rationale:
      "This placement lets users see projects first, then provides proof assets before the deeper systems narrative.",
    risks: ["Requires careful spacing so it does not compete with the Projects section."],
  },
  {
    id: "after-tech-stack-before-contact",
    status: "acceptable",
    rationale:
      "This placement works as a late-stage trust layer before conversion, but users may miss the proof if they do not scroll that far.",
    risks: ["Proof may appear too late in the page journey."],
  },
  {
    id: "inside-contact-conversion-area",
    status: "rejected",
    rationale:
      "This placement risks mixing proof with conversion and may make the contact area feel overloaded.",
    risks: ["Can weaken clarity of the contact section.", "May look like overclaiming near conversion CTAs."],
  },
];

export const RECOMMENDED_PROOF_LAYER_PLACEMENT =
  "after-projects-before-systems-lab" as const;

export const PROOF_LAYER_PLACEMENT_REVIEW_DECISION = {
  phase: "v2.5-A",
  status: "placement-reviewed",
  publicActivation: false,
  mountApproved: false,
  recommendedPlacement: RECOMMENDED_PROOF_LAYER_PLACEMENT,
  decisionSummary:
    "The proof layer should be placed after Projects and before Systems Lab if activation is approved later. No App mount or feature activation is approved in this phase.",
  nextSafeSprint: "v2.5-B-proof-layer-risk-review",
} as const;
