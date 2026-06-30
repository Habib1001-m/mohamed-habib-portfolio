/** Public contact and CV links shared by the portfolio surfaces. */

type ContactLinkType =
  | "email"
  | "linkedin"
  | "github"
  | "cvOnePage"
  | "cvDetailed";

type ContactLinkTone = "orange" | "sky" | "emerald" | "red";

interface ContactLink {
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
