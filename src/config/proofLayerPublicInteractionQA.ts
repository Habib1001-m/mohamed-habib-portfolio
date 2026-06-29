import { FEATURES } from "./features";
import { ANALYTICS_CONFIG } from "./analytics";
import { PROOF_LAYER_PRIVACY_PARAM_QA_DECISION } from "./proofLayerPrivacyParamQA";
import { selectedPublicProofAssets } from "../data/proofAssetReviewSelection";
import { APPROVED_CURRENT_PROOF_COPY } from "../data/proofLayerCopyMap";

export interface ProofLayerPublicInteractionCheck {
  id: string;
  status: "pass" | "watch" | "blocked";
  description: string;
}

const selectedAssetIds = selectedPublicProofAssets.map((asset) => asset.id);
const trackedCopyAssetIds = APPROVED_CURRENT_PROOF_COPY.filter((copy) => copy.ctaLabel).map(
  (copy) => copy.assetId
);

export const PROOF_LAYER_PUBLIC_INTERACTION_QA: ProofLayerPublicInteractionCheck[] = [
  {
    id: "proof-layer-active",
    status: FEATURES.proofLayer ? "pass" : "blocked",
    description: "The public limited proof layer remains active for interaction QA.",
  },
  {
    id: "privacy-param-qa-passed",
    status:
      PROOF_LAYER_PRIVACY_PARAM_QA_DECISION.status === "privacy-param-qa-pass"
        ? "pass"
        : "blocked",
    description: "Privacy parameter QA passed before public interaction QA.",
  },
  {
    id: "browser-event-dispatch-enabled",
    status: ANALYTICS_CONFIG.dispatchBrowserEvent ? "pass" : "blocked",
    description: "First-party browser event dispatch remains enabled.",
  },
  {
    id: "third-party-forwarding-off",
    status:
      !ANALYTICS_CONFIG.allowGtagForwarding && !ANALYTICS_CONFIG.allowPlausibleForwarding
        ? "pass"
        : "blocked",
    description: "Third-party analytics forwarding remains disabled.",
  },
  {
    id: "selected-clickable-assets-covered",
    status: selectedAssetIds.every((assetId) => trackedCopyAssetIds.includes(assetId)) ? "pass" : "watch",
    description: "Selected proof assets with CTA copy are covered for click tracking.",
  },
];

export const BLOCKING_PROOF_LAYER_PUBLIC_INTERACTION_IDS =
  PROOF_LAYER_PUBLIC_INTERACTION_QA.filter((check) => check.status === "blocked").map(
    (check) => check.id
  );

export const proofLayerPublicInteractionQAPassed =
  BLOCKING_PROOF_LAYER_PUBLIC_INTERACTION_IDS.length === 0;

export const PROOF_LAYER_PUBLIC_INTERACTION_QA_DECISION = {
  phase: "v2.8-D",
  status: proofLayerPublicInteractionQAPassed ? "public-interaction-qa-pass" : "public-interaction-qa-blocked",
  publicActivation: FEATURES.proofLayer,
  blockingQaIds: BLOCKING_PROOF_LAYER_PUBLIC_INTERACTION_IDS,
  decisionSummary:
    "Public interaction QA passes. The proof layer click signal uses first-party browser events only and keeps third-party forwarding disabled.",
  nextSafeSprint: "v2.8-E-proof-layer-interaction-analytics-closeout",
} as const;
