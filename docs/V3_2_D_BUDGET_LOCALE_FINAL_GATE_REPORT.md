# v3.2-D — Budget, Locale, and Final Merge Gate

## Executive status

```text
v3.2-D = PASS IN LOCAL CANDIDATE
Candidate = Next cinematic foundation
Production merge = NO
Final merge gate = CONDITIONAL GO after live visual QA and deployment target confirmation
```

## Locale / SEO decision

- Root `/` now redirects permanently to `/en` with HTTP 308.
- `/en` renders server HTML as `<html lang="en" dir="ltr">`.
- `/ar` renders server HTML as `<html lang="ar" dir="rtl">`.
- No client-only lang/dir correction script is needed for indexed pages.
- `x-default` hreflang points to `/en` for stable SEO.
- Canonical URLs use `https://habib.systems` by default.
- `NEXT_PUBLIC_SITE_URL` can override the canonical host if deployment changes.

## Budget decision

The dependency surface was reduced before any merge decision.

## QA evidence

```text
npm run lint = PASS
npx tsc --noEmit = PASS
npm run build = PASS
Production standalone server = PASS
/ = 308 -> /en
/en = 200, <html lang="en" dir="ltr">
/ar = 200, <html lang="ar" dir="rtl">
```

## Final merge gate

```text
Technical stabilization = PASS
SEO locale gate = PASS
Dependency budget first-pass = PASS
Final merge = HOLD until live preview + visual QA
```
