# habib.systems — Mohamed Habib Portfolio

A bilingual cinematic portfolio for **Mohamed Habib** — a full-stack developer and systems builder focused on practical AI tools, automation workflows, and maintainable web products.

**Live site:** https://habib.systems  
**Primary locales:** `/en` and `/ar`

## Purpose

This repository powers the public portfolio at `habib.systems`. It is designed as a product-grade portfolio rather than a static résumé page: fast, bilingual, evidence-gated, SEO-aware, and built around clear project storytelling.

The site is intentionally restrained: dark editorial layout, strong typography, warm accent color, controlled motion, and proof surfaces that avoid exaggerated claims.

## Product goals

- Present Mohamed Habib clearly to recruiters, technical hiring managers, and serious clients.
- Show selected work through a cinematic project-preview flow.
- Keep public proof honest, limited, and evidence-gated.
- Support English and Arabic with proper RTL/LTR behavior.
- Provide a calm lead-generation path through CV links and contact flow.
- Preserve accessibility, reduced-motion behavior, and SEO quality.

## Core experience

- **Cinematic hero** — dark canvas, large confident typography, clean portrait treatment, and direct calls to action.
- **Project preview system** — selected project list with visual preview and case-study routes.
- **Public proof layer** — approved proof assets only; no fabricated social proof.
- **Systems Lab** — interactive architecture proof surface for selected systems and workflows.
- **Command palette** — fast navigation across sections and project surfaces.
- **Bilingual routing** — `/en` and `/ar`, with server-rendered `lang` and `dir`.
- **SEO foundation** — canonical URLs, sitemap, robots, Open Graph, Twitter metadata, and hreflang alternates.

## Technology

- **Framework:** Next.js App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 with CSS-first design tokens
- **3D / systems visualization:** Three.js, lazy-loaded and reduced-motion aware
- **UI primitives:** Radix UI / shadcn-style components
- **Icons:** Lucide
- **Email path:** Resend-compatible contact route
- **Deployment target:** Vercel or any Node-compatible Next.js standalone host

## Locale and SEO behavior

The root URL redirects permanently to English:

```text
/   -> /en
/en -> English, lang="en", dir="ltr"
/ar -> Arabic,  lang="ar", dir="rtl"
```

`x-default` points to `/en` for a stable crawler path. Browser-language routing can be added later, but the current production policy prioritizes predictable SEO and canonical indexing.

## Trust and content policy

This portfolio does not publish unverified claims. The following surfaces remain gated unless supporting evidence is approved:

- Testimonials
- Booking workflow
- Full case studies
- Restricted/private proof assets

Public proof should show evidence without overstating outcomes.

## Local development

```bash
npm ci
npm run dev
```

Open:

```text
http://localhost:3000/en
http://localhost:3000/ar
```

## Quality gates

Before any production merge or deployment decision, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Recommended manual checks:

- `/en` and `/ar` render correctly.
- Arabic pages use RTL layout and Arabic copy.
- Navigation, command palette, project preview, proof layer, and contact flow remain usable.
- Reduced-motion users receive static or simplified motion.
- Case-study and proof gates remain honest and evidence-based.

## Environment variables

Create `.env.local` when enabling the contact route:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_TO_EMAIL=your@email.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
CONTACT_FROM_NAME=Mohamed Habib Portfolio
NEXT_PUBLIC_SITE_URL=https://habib.systems
```

## Documentation

Operational release reports are kept in [`docs/`](./docs/):

- [`V3_2_A_STABILIZATION_REPORT.md`](./docs/V3_2_A_STABILIZATION_REPORT.md)
- [`V3_2_C_HARDENING_REPORT.md`](./docs/V3_2_C_HARDENING_REPORT.md)
- [`V3_2_D_BUDGET_LOCALE_FINAL_GATE_REPORT.md`](./docs/V3_2_D_BUDGET_LOCALE_FINAL_GATE_REPORT.md)
- [`V3_2_E_PREMERGE_CLEANUP_REPORT.md`](./docs/V3_2_E_PREMERGE_CLEANUP_REPORT.md)
- [`V3_2_E_LIVE_PREVIEW_QA_REPORT.md`](./docs/V3_2_E_LIVE_PREVIEW_QA_REPORT.md)
- [`V3_2_F_PREVIEW_DEPLOYMENT_EXTERNAL_QA_REPORT.md`](./docs/V3_2_F_PREVIEW_DEPLOYMENT_EXTERNAL_QA_REPORT.md)

Internal worklogs and run logs are intentionally excluded from the repository.

## License

Personal portfolio. All rights reserved.
