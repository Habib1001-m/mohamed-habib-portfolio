type PublicProofAssetArea =
  | "identity"
  | "cv"
  | "deployment"
  | "repository"
  | "project"
  | "screenshot"
  | "trust-content";

type PublicProofAssetStatus =
  | "public-ready"
  | "needs-review"
  | "restricted"
  | "blocked";

interface PublicProofAsset {
  id: string;
  area: PublicProofAssetArea;
  label: string;
  status: PublicProofAssetStatus;
  publicUseAllowed: boolean;
  href?: string;
  localPath?: string;
  projectId?: "portfolio" | "quickshed" | "sieve";
  notes: string;
}

export const PUBLIC_PROOF_ASSETS: PublicProofAsset[] = [
  {
    id: "portfolio-live-site",
    area: "deployment",
    label: "Portfolio live deployment",
    status: "public-ready",
    publicUseAllowed: true,
    href: "https://mohamed-habib-portfolio-opal.vercel.app",
    projectId: "portfolio",
    notes: "Public deployment is available as proof of the portfolio system.",
  },
  {
    id: "portfolio-source-repository",
    area: "repository",
    label: "Portfolio source repository",
    status: "public-ready",
    publicUseAllowed: true,
    href: "https://github.com/Habib1001-m/mohamed-habib-portfolio",
    projectId: "portfolio",
    notes: "Public repository is available for implementation validation.",
  },
  {
    id: "one-page-cv",
    area: "cv",
    label: "One-page CV",
    status: "public-ready",
    publicUseAllowed: true,
    localPath: "/cv/Mohamed_Habib_One_Page_CV.pdf",
    notes: "Existing public CV asset used by the portfolio.",
  },
  {
    id: "detailed-cv",
    area: "cv",
    label: "Detailed CV",
    status: "public-ready",
    publicUseAllowed: true,
    localPath: "/cv/Mohamed_Habib_Detailed_CV.pdf",
    notes: "Existing public detailed CV asset used by the portfolio.",
  },
  {
    id: "hero-portrait",
    area: "identity",
    label: "Hero portrait image",
    status: "public-ready",
    publicUseAllowed: true,
    localPath: "/images/mohamed-habib-hero.webp",
    notes: "Approved identity image already used in the public site.",
  },
  {
    id: "linkedin-og-image",
    area: "identity",
    label: "LinkedIn / OG profile image",
    status: "public-ready",
    publicUseAllowed: true,
    localPath: "/images/mohamed-habib-linkedin.webp",
    notes: "Approved social preview image already available in public assets.",
  },
  {
    id: "quickshed-live-product",
    area: "project",
    label: "QuickShed live product",
    status: "needs-review",
    publicUseAllowed: true,
    href: "https://quickshed.vercel.app",
    projectId: "quickshed",
    notes: "Public link exists, but case-study use still needs approved screenshots and outcome wording.",
  },
  {
    id: "quickshed-source-repository",
    area: "repository",
    label: "QuickShed source repository",
    status: "needs-review",
    publicUseAllowed: true,
    href: "https://github.com/Habib1001-m/quickshed",
    projectId: "quickshed",
    notes: "Public repository exists, but proof framing still needs review before case-study activation.",
  },
  {
    id: "sieve-private-walkthrough",
    area: "project",
    label: "SIEVE restricted walkthrough",
    status: "restricted",
    publicUseAllowed: false,
    projectId: "sieve",
    notes: "Restricted project proof must remain request-only until disclosure boundaries and redacted screenshots are approved.",
  },
  {
    id: "public-testimonials",
    area: "trust-content",
    label: "Public testimonials",
    status: "blocked",
    publicUseAllowed: false,
    notes: "No approved testimonial evidence exists yet.",
  },
  {
    id: "booking-proof-flow",
    area: "trust-content",
    label: "Booking workflow proof",
    status: "blocked",
    publicUseAllowed: false,
    notes: "Booking workflow is blocked until URL, availability, call purpose, and follow-up workflow are approved.",
  },
];

export const PUBLIC_READY_PROOF_ASSETS = PUBLIC_PROOF_ASSETS.filter(
  (asset) => asset.status === "public-ready" && asset.publicUseAllowed
);

export const PROOF_ASSETS_NEEDING_REVIEW = PUBLIC_PROOF_ASSETS.filter(
  (asset) => asset.status === "needs-review"
);

export const BLOCKED_OR_RESTRICTED_PROOF_ASSETS = PUBLIC_PROOF_ASSETS.filter(
  (asset) => asset.status === "blocked" || asset.status === "restricted"
);
