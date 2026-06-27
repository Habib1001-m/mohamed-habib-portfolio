export interface ProjectGalleryItem {
  src: string;
  label: { en: string; ar: string };
  caption?: { en: string; ar: string };
}

export interface Project {
  id: string;
  title: { en: string; ar: string };
  tagline: { en: string; ar: string };
  description: { en: string; ar: string };
  longDescription: { en: string; ar: string };
  category: { en: string; ar: string };
  status: { en: string; ar: string };
  tech: string[];
  image: string;
  gallery?: ProjectGalleryItem[];
  stats?: { label: { en: string; ar: string }; value: string }[];
  links?: { github?: string; demo?: string };
}

export interface ExperienceItem {
  id: string;
  role: { en: string; ar: string };
  company: { en: string; ar: string };
  location: { en: string; ar: string };
  period: { en: string; ar: string };
  badgeColor: string;
  points: { en: string; ar: string }[];
}

export interface TechCategory {
  id: string;
  title: { en: string; ar: string };
  items: string[];
}
