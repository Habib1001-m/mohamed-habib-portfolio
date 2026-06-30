/**
 * Centralized contact links for the v3.1 Next.js port.
 *
 * The Vite baseline duplicated contact info in three places
 * (`ContactSection.tsx`, `Footer.tsx`, and `booking.ts`). This file is the
 * single source of truth for the Next.js port.
 *
 * URLs and labels are sourced verbatim from `repo_clone/src/components/sections/ContactSection.tsx`
 * and `repo_clone/src/components/layout/Footer.tsx` — do NOT edit them here
 * without updating those components.
 */

export type ContactLinkType =
  | "email"
  | "linkedin"
  | "github"
  | "cvOnePage"
  | "cvDetailed";

export type ContactLinkTone = "orange" | "sky" | "emerald" | "red";

export interface ContactLink {
  id: string;
  type: ContactLinkType;
  label: { en: string; ar: string };
  href: string;
  tone: ContactLinkTone;
  icon: string;
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: "email",
    type: "email",
    label: { en: "Email", ar: "البريد الإلكتروني" },
    href: "mailto:mohamedhabib49.mh@gmail.com",
    tone: "orange",
    icon: "@",
  },
  {
    id: "linkedin",
    type: "linkedin",
    label: { en: "LinkedIn", ar: "LinkedIn" },
    href: "https://www.linkedin.com/in/mohamed-habib49/",
    tone: "sky",
    icon: "in",
  },
  {
    id: "github",
    type: "github",
    label: { en: "GitHub", ar: "GitHub" },
    href: "https://github.com/Habib1001-m",
    tone: "red",
    icon: "GH",
  },
  {
    id: "cv-one-page",
    type: "cvOnePage",
    label: { en: "One-page CV", ar: "السيرة المختصرة" },
    href: "/cv/Mohamed_Habib_One_Page_CV.pdf",
    tone: "emerald",
    icon: "CV",
  },
  {
    id: "cv-detailed",
    type: "cvDetailed",
    label: { en: "Detailed CV", ar: "السيرة التفصيلية" },
    href: "/cv/Mohamed_Habib_Detailed_CV.pdf",
    tone: "emerald",
    icon: "PDF",
  },
];

export const EMAIL_ADDRESS = "mohamedhabib49.mh@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/mohamed-habib49/";
export const GITHUB_URL = "https://github.com/Habib1001-m";
export const CV_ONE_PAGE_PATH = "/cv/Mohamed_Habib_One_Page_CV.pdf";
export const CV_DETAILED_PATH = "/cv/Mohamed_Habib_Detailed_CV.pdf";

export function getContactLinkByType(type: ContactLinkType): ContactLink | undefined {
  return CONTACT_LINKS.find((link) => link.type === type);
}

export function getContactLinksByType(...types: ContactLinkType[]): ContactLink[] {
  const typeSet = new Set(types);
  return CONTACT_LINKS.filter((link) => typeSet.has(link.type));
}
