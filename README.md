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

Push to GitHub and import the repo on Vercel.

**Set `NEXT_PUBLIC_SITE_URL`** to the live domain (e.g. `https://yourdomain.com`) in the
host's environment variables. Canonical URL, `og:image`, `robots.txt` and `sitemap.xml`
are built from it, and LinkedIn / Google need absolute URLs. Without it, Vercel builds fall
back to the project's `*.vercel.app` production URL, and other hosts fall back to
`http://localhost:3000`, which breaks link previews. See [`src/lib/site.ts`](src/lib/site.ts).

## SEO & link previews

- Title, description and keywords: `seo` in [`src/data/profile.ts`](src/data/profile.ts)
- Meta tags (Open Graph, Twitter card, robots, canonical): [`src/app/layout.tsx`](src/app/layout.tsx)
- Preview image (1200×630, generated at build time): [`src/lib/social-image.tsx`](src/lib/social-image.tsx)
- Structured data (JSON-LD `ProfilePage` + `Person`): [`src/components/StructuredData.tsx`](src/components/StructuredData.tsx)
- `robots.txt` / `sitemap.xml`: [`src/app/robots.ts`](src/app/robots.ts), [`src/app/sitemap.ts`](src/app/sitemap.ts)

LinkedIn caches previews. After deploying, paste the URL into the
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to refresh it.
