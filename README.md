# Abhishek Saxena — Portfolio

Single-page portfolio built with Next.js 16 (App Router), Tailwind CSS v4 and TypeScript.
Statically prerendered, no runtime dependencies beyond React/Next.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Docs & change rules

See [`docs/`](docs/README.md). **Read [`docs/RULES.md`](docs/RULES.md) before making changes** and log each change in [`docs/CHANGELOG.md`](docs/CHANGELOG.md).

## Editing content

All copy lives in [`src/data/profile.ts`](src/data/profile.ts) — experience, projects,
technologies, journey, links and stats. Components only render that data.

- Add a store link to a featured project by setting its `href`.
- Mark a role with `featured: true` and a `badge` to give it the highlighted treatment.

## Theme

Light / dark is controlled by `data-theme` on `<html>`. An inline script in
[`src/app/layout.tsx`](src/app/layout.tsx) applies the saved or system preference before
first paint; colour tokens are in [`src/app/globals.css`](src/app/globals.css).

## Deploy

Push to GitHub and import the repo on Vercel — no configuration needed.
