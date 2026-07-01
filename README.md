# Mohamed Habib Portfolio

[mohamed-habib-portfolio-opal.vercel.app](https://mohamed-habib-portfolio-opal.vercel.app/) is Mohamed Habib's bilingual portfolio and personal product platform. It presents selected work, technical experience, and systems thinking through a fast, cinematic Next.js experience built for both English and Arabic audiences.

This repository is the final product implementation, not a static résumé template. It combines product storytelling, verifiable proof, accessible interaction, lead capture, and production-oriented web architecture.

## About the developer

Mohamed Habib is a Cairo-based full-stack developer and systems builder working across web products, automation, practical AI, and operational tooling.

His experience combines:

- Full-stack product development with React, Next.js, TypeScript, Node.js, Python, FastAPI, PostgreSQL, and Redis.
- Browser-first and privacy-conscious tools that reduce repetitive work without unnecessarily exposing user data.
- AI-assisted workflows using MCP-style tool access, local models, knowledge routing, and structured memory.
- Infrastructure and delivery practices across GitHub, Vercel, Docker, Linux, and observable workflow design.
- Product positioning, SEO, analytics, and conversion thinking developed through digital marketing work.
- Reliability, troubleshooting, and escalation discipline developed in senior technical-support and network-operations roles.

Featured work includes:

- **QuickShed** — a bilingual, browser-first utility workspace for common text, data, and developer tasks.
- **SIEVE Research OS** — an evidence-screening workspace that makes review gates, confidence, and decision boundaries explicit.
- **Mohamed Habib Portfolio** — this portfolio, rebuilt as a bilingual Next.js product with project proof, contact delivery, and an interactive systems lab.

## Product experience

- **Bilingual by design** — first-class `/en` and `/ar` routes with server-rendered `lang`, LTR/RTL direction, localized content, and locale-aware metadata.
- **Cinematic interface** — editorial typography, restrained motion, responsive layouts, and a dark visual system designed around the developer's work.
- **Project storytelling** — selected projects, proof assets, galleries, and statically generated project routes.
- **Interactive systems lab** — lazy-loaded Three.js architecture scenarios with graceful WebGL and reduced-motion fallbacks.
- **Accessible navigation** — semantic landmarks, keyboard shortcuts, a command palette, visible focus behavior, and reduced-motion support.
- **Lead capture** — downloadable CVs, direct contact channels, and a validated Resend-compatible contact API.
- **Trust-aware publishing** — testimonials, booking, restricted proof, and unsupported claims remain gated until their evidence is approved.
- **Search foundation** — canonical URLs, hreflang alternates, sitemap, robots directives, Open Graph data, and structured metadata.
- **Privacy-conscious analytics** — first-party browser events without a mandatory third-party analytics dependency.

## Architecture

| Area | Implementation |
|---|---|
| Framework | Next.js 16 App Router |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Motion | CSS-driven motion with reduced-motion fallbacks |
| Interactive graphics | Three.js, dynamically loaded behind a WebGL boundary |
| Localization | Server-rendered English and Arabic routes |
| Content | Typed project, experience, proof, and case-study data |
| Contact | Next.js route handler with validation, honeypot protection, and Resend delivery |
| Deployment | Next.js standalone output on Vercel |

The root route redirects permanently to English:

```text
/    -> /en
/en  -> English, lang="en", dir="ltr"
/ar  -> Arabic,  lang="ar", dir="rtl"
```

## Local development

### Requirements

- Node.js 22 or newer
- npm

### Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) or [http://localhost:3000/ar](http://localhost:3000/ar).

### Production verification

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

The build packages `public/` and Next.js static assets into the generated standalone output automatically. Start that production server with:

```bash
npm run start
```

## Environment

Copy `.env.example` to `.env.local` when enabling the contact workflow:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=your@email.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
CONTACT_FROM_NAME=Mohamed Habib Portfolio
NEXT_PUBLIC_SITE_URL=https://mohamed-habib-portfolio-opal.vercel.app
```

Secrets, local environment files, deployment metadata, build output, QA artifacts, worklogs, and internal release documents are intentionally excluded from version control.

## Repository structure

```text
src/app/          Routes, metadata, sitemap, robots, and contact API
src/components/   Layout, sections, motion, project, UI, and 3D components
src/config/       Feature, trust, motion, analytics, and site configuration
src/data/         Typed portfolio, project, proof, and experience content
public/           Approved public images, CVs, favicon, and social preview
```

## Publication policy

The public repository contains the product source and this README. Internal worklogs, temporary QA evidence, release-phase reports, local configuration, and scratch assets are not publication artifacts and must remain outside Git.

## License

Personal portfolio. All rights reserved.
