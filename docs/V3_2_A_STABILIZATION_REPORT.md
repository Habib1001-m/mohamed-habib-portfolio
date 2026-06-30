# v3.2-A — Next Cinematic Candidate Stabilization

## Status

v3.2-A stabilized the Next.js cinematic candidate as a local candidate for later branch synchronization.

## Fixed

- Removed build-time dependency on `next/font/google` so production build no longer needs Google Fonts network fetches.
- Added offline-safe CSS font variables for Latin, mono, and Arabic fallback stacks.
- Fixed React lint errors from synchronous state updates inside effects.
- Updated production `start` script from Bun to Node for portable local standalone startup.

## Verified

- `npm run lint` passes.
- `npx tsc --noEmit` passes.
- `npm run build` passes.
- Standalone production server starts with Node.
- `/en` and `/ar` return HTTP 200.

## Decision

This candidate became suitable for the next visual/product evaluation gate.
