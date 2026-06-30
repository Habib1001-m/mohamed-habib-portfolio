import {
  BLOCKED_OR_RESTRICTED_PROOF_ASSETS,
  PROOF_ASSETS_NEEDING_REVIEW,
  PUBLIC_READY_PROOF_ASSETS,
  PUBLIC_PROOF_ASSETS,
} from "./publicProofAssets";

type ProofAssetSelectionStatus = "selected" | "deferred" | "excluded";

interface ProofAssetReviewSelectionItem {
  assetId: string;
  selectionStatus: ProofAssetSelectionStatus;
  approvedForCurrentPublicUse: boolean;
  selectedFor: "current-proof-foundation" | "future-case-study" | "request-only" | "not-selected";
  reason: string;
}

const PROOF_ASSET_REVIEW_SELECTION: ProofAssetReviewSelectionItem[] = [
  ...PUBLIC_READY_PROOF_ASSETS.map((asset) => ({
    assetId: asset.id,
    selectionStatus: "selected" as const,
    approvedForCurrentPublicUse: true,
    selectedFor: "current-proof-foundation" as const,
    reason: "Already public-ready and safe for current identity, CV, deployment, or repository proof.",
  })),
  ...PROOF_ASSETS_NEEDING_REVIEW.map((asset) => ({
    assetId: asset.id,
    selectionStatus: "deferred" as const,
    approvedForCurrentPublicUse: false,
    selectedFor: "future-case-study" as const,
    reason: "Public link exists, but proof framing, screenshots, and outcome wording still need review before selection.",
  })),
  ...BLOCKED_OR_RESTRICTED_PROOF_ASSETS.map((asset) => ({
    assetId: asset.id,
    selectionStatus: "excluded" as const,
    approvedForCurrentPublicUse: false,
    selectedFor: asset.id === "sieve-private-walkthrough" ? "request-only" as const : "not-selected" as const,
    reason: "Blocked or restricted asset. Do not expose publicly in the current proof layer.",
  })),
];

const SELECTED_PUBLIC_PROOF_ASSET_IDS = PROOF_ASSET_REVIEW_SELECTION.filter(
  (item) => item.selectionStatus === "selected" && item.approvedForCurrentPublicUse
).map((item) => item.assetId);

export const selectedPublicProofAssets = PUBLIC_PROOF_ASSETS.filter((asset) =>
  SELECTED_PUBLIC_PROOF_ASSET_IDS.includes(asset.id)
);
