# Gym Machine Guide

A responsive gym reference and workout planner. Browse machine instructions and safety guidance, explore prebuilt routines, create custom plans, and export them as PDFs.

## What is included

- 65 machine guides with local images, muscle diagrams, videos, and safety notes
- 18 prebuilt workout routines
- A custom workout builder with editable sets, reps, rest, ordering, and PDF export
- Light and dark themes
- Browser-only storage for custom plans

## Development

Use Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Quality checks:

```sh
npm run lint
npm test
npm run build
```

Preview the production build with `npm run preview`.

## Data and privacy

Machine and routine content lives in `src/data`. Custom plans and theme preferences stay in the browser's local storage; there is no account or server synchronization. Clearing site data removes saved custom plans.

Exercise videos are embedded from YouTube. PDF export runs entirely in the browser.
