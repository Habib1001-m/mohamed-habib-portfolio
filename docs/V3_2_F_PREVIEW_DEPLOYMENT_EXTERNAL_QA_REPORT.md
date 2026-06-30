# v3.2-F — Preview Deployment and External Visual QA Report

## Status

```text
Phase = v3.2-F
Status = HOLD_WITH_DEPLOYMENT_REQUIRED
Candidate = Next cinematic portfolio
Production merge = NO
```

## Executive decision

The candidate remains technically strong and deployment-ready, but external visual QA cannot be completed until a real preview URL exists.

## Technical gate recheck

```text
npm ci = PASS
npm run lint = PASS
npx tsc --noEmit = PASS
next build = PASS
standalone server = PASS
```

## Required external preview procedure

```bash
npm ci
npm run lint
npx tsc --noEmit
npm run build
vercel deploy
```

## Final gate

```text
Technical readiness = PASS
SEO locale readiness = PASS
Repo hygiene = PASS
Preview deployment = HOLD
External visual QA = HOLD
Merge readiness = HOLD_WITH_CONDITIONS
```
