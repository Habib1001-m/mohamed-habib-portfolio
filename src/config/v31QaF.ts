import { MOTION_CONFIG } from "./motion";
import { V31_PROJECTS_PROOF_QA_DECISION } from "./v31ProjectsProofQA";

export const V31_QA_F = {
  phase: "v3.1-F",
  status: "qa-pass-with-local-check-watch",
  branch: "feature-v31-implementation",
  productionBehaviorChangeApproved: false,
  checkedInputs: ["package-json-scripts", "motion-config", "reveal-shell", "preview-status"],
  scriptChecks: {
    lintScript: "present",
    buildScript: "present",
  },
  previewBuild: "success",
  localCheckWatch: ["lint", "build"],
  reducedMotionPolicy: MOTION_CONFIG.respectReducedMotion ? "pass" : "blocked",
  projectProofGate: V31_PROJECTS_PROOF_QA_DECISION.status,
  blockingItems: MOTION_CONFIG.respectReducedMotion ? [] : ["reduced-motion-policy"],
  nextSafeSprint: "v3.1-G-preview-deploy-review",
} as const;

export const v31QaFIsSafe =
  V31_QA_F.status === "qa-pass-with-local-check-watch" &&
  V31_QA_F.productionBehaviorChangeApproved === false &&
  V31_QA_F.blockingItems.length === 0;
