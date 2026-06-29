import { V31_BASELINE_ROLLBACK } from "./v31BaselineRollback";

export type V31SectionRole = "layout" | "core" | "support" | "overlay";
export type V31ChangeMode = "preserve" | "wrap" | "enhance-later";

export interface V31SectionBoundary {
  id: string;
  component: string;
  role: V31SectionRole;
  changeMode: V31ChangeMode;
  notes: string[];
}

export const V31_SECTION_BOUNDARIES: V31SectionBoundary[] = [
  {
    id: "navbar",
    component: "Navbar",
    role: "layout",
    changeMode: "preserve",
    notes: ["Keep language switching stable", "Do not change routing or navigation behavior in v3.1-B"],
  },
  {
    id: "hero",
    component: "HeroSection",
    role: "core",
    changeMode: "wrap",
    notes: ["Candidate for first motion shell", "Keep copy and CTA behavior stable"],
  },
  {
    id: "about",
    component: "AboutSection",
    role: "support",
    changeMode: "enhance-later",
    notes: ["Preserve current content flow", "No cinematic work before shell approval"],
  },
  {
    id: "projects",
    component: "ProjectsSection",
    role: "core",
    changeMode: "wrap",
    notes: ["Preserve project selection modal", "Do not add unapproved case-study claims"],
  },
  {
    id: "proof",
    component: "ProofLayerSection",
    role: "core",
    changeMode: "preserve",
    notes: ["Preserve selected public proof scope", "Preserve click analytics contract"],
  },
  {
    id: "systems-lab",
    component: "InteractiveSandboxSection",
    role: "support",
    changeMode: "enhance-later",
    notes: ["Keep current compact lab stable", "No heavy visual work before budget gate"],
  },
  {
    id: "experience",
    component: "ExperienceSection",
    role: "support",
    changeMode: "enhance-later",
    notes: ["Keep scan speed high", "Improve later after hero and projects are safe"],
  },
  {
    id: "tech-stack",
    component: "TechStackSection",
    role: "support",
    changeMode: "enhance-later",
    notes: ["Keep readable stack grouping", "No dependency showcase inflation"],
  },
  {
    id: "contact",
    component: "ContactSection",
    role: "core",
    changeMode: "preserve",
    notes: ["Keep conversion path calm", "Booking remains gated"],
  },
  {
    id: "project-modal",
    component: "ProjectModal",
    role: "overlay",
    changeMode: "preserve",
    notes: ["Preserve modal state contract", "Case-study panels remain gated by existing flags"],
  },
];

export const V31_COMPONENT_BOUNDARY_DECISION = {
  phase: "v3.1-B",
  status: "section-boundaries-recorded",
  branch: V31_BASELINE_ROLLBACK.implementationBranch,
  baselineCommit: V31_BASELINE_ROLLBACK.baselineCommit,
  productionBehaviorChangeApproved: false,
  firstImplementationTargets: ["hero", "projects"],
  preservationTargets: ["proof", "contact", "project-modal"],
  holdTargets: ["systems-lab", "experience", "tech-stack"],
  nextSafeSprint: "v3.1-C-motion-shell-implementation",
} as const;

export const v31SectionBoundariesAreSafe =
  V31_COMPONENT_BOUNDARY_DECISION.status === "section-boundaries-recorded" &&
  V31_COMPONENT_BOUNDARY_DECISION.productionBehaviorChangeApproved === false;
