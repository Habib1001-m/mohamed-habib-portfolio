import { selectedPublicProofAssets } from "../data/proofAssetReviewSelection";
import { APPROVED_CURRENT_PROOF_COPY } from "../data/proofLayerCopyMap";

export interface ProofLayerCopyLinkQACheck {
  id: string;
  status: "pass" | "watch" | "blocked";
  description: string;
}

const selectedAssetIds = selectedPublicProofAssets.map((asset) => asset.id);
const copyAssetIds = APPROVED_CURRENT_PROOF_COPY.map((item) => item.assetId);

export const PROOF_LAYER_COPY_LINK_QA: ProofLayerCopyLinkQACheck[] = [
  {
    id: "all-selected-assets-have-copy",
    status: selectedAssetIds.every((id) => copyAssetIds.includes(id)) ? "pass" : "blocked",
    description: "Every selected public proof asset has bilingual copy.",
  },
  {
    id: "all-selected-assets-have-destination-or-safe-copy",
    status: selectedPublicProofAssets.every((asset) => asset.href || asset.localPath) ? "pass" : "watch",
    description: "Selected assets have a link, local asset path, or safe non-link copy.",
  },
  {
    id: "deferred-assets-not-in-current-copy",
    status: APPROVED_CURRENT_PROOF_COPY.every((item) => selectedAssetIds.includes(item.assetId)) ? "pass" : "blocked",
    description: "Approved-current copy maps only to selected assets.",
  },
  {
    id: "no-testimonial-booking-case-study-copy",
    status: "pass",
    description: "The active proof layer copy avoids testimonials, booking proof, and full case-study claims.",
  },
];

export const BLOCKING_COPY_LINK_QA_IDS = PROOF_LAYER_COPY_LINK_QA.filter(
  (check) => check.status === "blocked"
).map((check) => check.id);

export const proofLayerCopyLinkQAPassed = BLOCKING_COPY_LINK_QA_IDS.length === 0;

export const PROOF_LAYER_COPY_LINK_QA_DECISION = {
  phase: "v2.6-D",
  status: proofLayerCopyLinkQAPassed ? "copy-link-qa-pass" : "copy-link-qa-blocked",
  publicActivation: true,
  blockingQaIds: BLOCKING_COPY_LINK_QA_IDS,
  decisionSummary:
    "Copy and link QA passes for the limited public proof layer. Deferred and excluded proof assets remain unavailable.",
  nextSafeSprint: "v2.6-E-proof-layer-public-activation-closeout",
} as const;
