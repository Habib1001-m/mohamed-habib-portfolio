# v3.2-E — Live Preview QA and Merge Readiness Decision

## Executive status

```text
Phase = v3.2-E Live Preview QA
Candidate = Next cinematic portfolio
Environment = local production standalone server
Merge readiness = HOLD WITH CONDITIONS
```

## Commands and checks

```text
npm ci = PASS
npm run lint = PASS
npx tsc --noEmit = PASS
npm run build = PASS
Production standalone server = PASS
```

## SEO and locale QA

```text
/ = 308 -> /en
/en html = <html lang="en" dir="ltr">
/ar html = <html lang="ar" dir="rtl">
/en canonical = https://habib.systems/en
/ar canonical = https://habib.systems/ar
x-default = /en
```

## Merge readiness decision

```text
Technical live preview QA = PASS
SEO locale gate = PASS
Repository hygiene = PASS
Contact configuration = WATCH
Browser visual QA = HOLD
Final merge readiness = HOLD WITH CONDITIONS
```
