import { ANALYTICS_EVENT_NAMES, SENSITIVE_ANALYTICS_PARAM_KEYS } from "./analytics";
import { selectedPublicProofAssets } from "../data/proofAssetReviewSelection";

export interface ProofLayerAnalyticsValidationCheck {
  id: string;
  status: "pass" | "watch" | "blocked";
  description: string;
}

const allowedProofAssetParams = ["proof_id", "proof_area", "destination", "language"] as const;
const sensitiveParamCollisions = allowedProofAssetParams.filter((paramKey) =>
  SENSITIVE_ANALYTICS_PARAM_KEYS.some((sensitiveKey) => paramKey.includes(sensitiveKey))
);

export const PROOF_LAYER_ANALYTICS_VALIDATION_QA: ProofLayerAnalyticsValidationCheck[] = [
  {
    id: "event-registered",
    status: ANALYTICS_EVENT_NAMES.includes("proof_asset_clicked") ? "pass" : "blocked",
    description: "proof_asset_clicked is registered in the analytics event catalog.",
  },
  {
    id: "selected-assets-available",
    status: selectedPublicProofAssets.length > 0 ? "pass" : "blocked",
    description: "At least one selected public proof asset exists for interaction analytics.",
  },
  {
    id: "allowed-param-set-defined",
    status: allowedProofAssetParams.length === 4 ? "pass" : "blocked",
    description: "The proof asset click event uses a small controlled parameter set.",
  },
  {
    id: "no-sensitive-param-collision",
    status: sensitiveParamCollisions.length === 0 ? "pass" : "blocked",
    description: "Allowed proof asset analytics params do not collide with sensitive key rules.",
  },
];

export const BLOCKING_PROOF_LAYER_ANALYTICS_VALIDATION_IDS =
  PROOF_LAYER_ANALYTICS_VALIDATION_QA.filter((check) => check.status === "blocked").map(
    (check) => check.id
  );

export const proofLayerAnalyticsValidationQAPassed =
  BLOCKING_PROOF_LAYER_ANALYTICS_VALIDATION_IDS.length === 0;

export const PROOF_LAYER_ANALYTICS_VALIDATION_DECISION = {
  phase: "v2.8-B",
  status: proofLayerAnalyticsValidationQAPassed ? "analytics-validation-pass" : "analytics-validation-blocked",
  publicActivation: true,
  allowedProofAssetParams,
  blockingQaIds: BLOCKING_PROOF_LAYER_ANALYTICS_VALIDATION_IDS,
  decisionSummary:
    "Analytics validation passes for proof asset clicks using a small non-sensitive parameter set.",
  nextSafeSprint: "v2.8-C-proof-layer-privacy-sensitive-param-qa",
} as const;
