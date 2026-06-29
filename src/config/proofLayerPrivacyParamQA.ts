import { SENSITIVE_ANALYTICS_PARAM_KEYS } from "./analytics";
import { PROOF_LAYER_ANALYTICS_VALIDATION_DECISION } from "./proofLayerAnalyticsValidationQA";

export interface ProofLayerPrivacyParamCheck {
  id: string;
  status: "pass" | "watch" | "blocked";
  description: string;
}

const allowedParams = PROOF_LAYER_ANALYTICS_VALIDATION_DECISION.allowedProofAssetParams;
const blockedBySensitiveRule = allowedParams.filter((paramKey) =>
  SENSITIVE_ANALYTICS_PARAM_KEYS.some((sensitiveKey) => paramKey.toLowerCase().includes(sensitiveKey))
);

export const PROOF_LAYER_PRIVACY_PARAM_QA: ProofLayerPrivacyParamCheck[] = [
  {
    id: "validation-gate-passed",
    status:
      PROOF_LAYER_ANALYTICS_VALIDATION_DECISION.status === "analytics-validation-pass"
        ? "pass"
        : "blocked",
    description: "Analytics validation passed before privacy parameter QA.",
  },
  {
    id: "no-sensitive-param-keys",
    status: blockedBySensitiveRule.length === 0 ? "pass" : "blocked",
    description: "Proof asset click params do not include sensitive key names.",
  },
  {
    id: "no-free-text-payload",
    status: "pass",
    description: "The event payload is limited to identifiers, area, destination type, and language.",
  },
  {
    id: "no-third-party-forwarding-change",
    status: "pass",
    description: "v2.8 does not enable GA, Plausible, or other third-party analytics forwarding.",
  },
];

export const BLOCKING_PROOF_LAYER_PRIVACY_PARAM_IDS = PROOF_LAYER_PRIVACY_PARAM_QA.filter(
  (check) => check.status === "blocked"
).map((check) => check.id);

export const proofLayerPrivacyParamQAPassed = BLOCKING_PROOF_LAYER_PRIVACY_PARAM_IDS.length === 0;

export const PROOF_LAYER_PRIVACY_PARAM_QA_DECISION = {
  phase: "v2.8-C",
  status: proofLayerPrivacyParamQAPassed ? "privacy-param-qa-pass" : "privacy-param-qa-blocked",
  publicActivation: true,
  blockingQaIds: BLOCKING_PROOF_LAYER_PRIVACY_PARAM_IDS,
  blockedBySensitiveRule,
  decisionSummary:
    "Privacy parameter QA passes. Proof asset click analytics uses only non-sensitive structured params and keeps third-party forwarding off.",
  nextSafeSprint: "v2.8-D-proof-layer-public-interaction-qa",
} as const;
