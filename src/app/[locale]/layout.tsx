import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/config/site";
import { DEFAULT_LOCALE, LOCALES, dir, isLocale, type Locale } from "@/lib/i18n";

export const dynamicParams = false;

const defaultDescription =
  "I build systems that create clarity, automate the complex, and turn ideas into products that matter. Full-stack development, automation workflows, and practical AI tools.";

const localizedSeo: Record<Locale, { title: string; description: string; ogLocale: string; alternateLocale: string[] }> = {
  en: {
    title: "Mohamed Habib — Full-Stack Developer & Systems Builder",
    description:
      "Web products, automation workflows, and practical AI tools designed with clarity, speed, and maintainability in mind.",
    ogLocale: "en_US",
    alternateLocale: ["ar_EG"],
  },
  ar: {
    title: "محمد حبيب — مطور Full-Stack وباني أنظمة",
    description:
      "منتجات ويب، ومسارات أتمتة، وأدوات ذكاء اصطناعي عملية مصممة للوضوح والسرعة وقابلية الصيانة.",
    ogLocale: "ar_EG",
    alternateLocale: ["en_US"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohamed Habib",
  jobTitle: "Full-Stack Developer & Systems Builder",
  description: defaultDescription,
  url: SITE_URL,
  email: "mailto:mohamedhabib49.mh@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  sameAs: [
    "https://www.linkedin.com/in/mohamed-habib49/",
    "https://github.com/Habib1001-m",
  ],
  knowsAbout: [
    "Full-stack development",
    "Automation workflows",
    "Practical AI",
    "Systems engineering",
  ],
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const seo = localizedSeo[loc];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: seo.title,
      template: "%s — Mohamed Habib",
    },
    description: seo.description,
    keywords: [
      "Mohamed Habib",
      "full-stack developer",
      "systems builder",
      "automation",
      "practical AI",
      "Cairo",
      "web development",
    ],
    authors: [{ name: "Mohamed Habib" }],
    creator: "Mohamed Habib",
    icons: {
      icon: "/favicon.svg",
    },
    alternates: {
      canonical: `/${loc}`,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: absoluteUrl(`/${loc}`),
      siteName: SITE_NAME,
      type: "website",
      locale: seo.ogLocale,
      alternateLocale: seo.alternateLocale,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0a0b0e]"
        >
          Skip to content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
