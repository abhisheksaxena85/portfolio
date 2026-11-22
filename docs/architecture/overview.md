# Architecture Overview — InvoSpec Website

> Full architectural reference for AI agents and developers.
> For routing specifics → [`routing.md`](./routing.md)

---

## Framework: Next.js App Router

**Why Next.js App Router (not Pages Router):**
- Server Components by default → minimal JavaScript sent to client → faster Core Web Vitals
- Built-in `generateMetadata` API → clean, type-safe SEO metadata
- `generateStaticParams` for static generation of dynamic routes
- Nested layouts for shared navigation/footer without prop drilling
- Built-in `next/image` and `next/font` optimisations
- First-class TypeScript support
- Deployable on Vercel or any Node-compatible host

**Version:** Next.js 16 (App Router), React 19, TypeScript 5

---

## Server vs Client Components

**DECISION:** Server Components are the default. Client Components are used only when necessary.

| Use Server Component | Use Client Component |
|---|---|
| Fetching data | State (`useState`) |
| SEO metadata | Browser APIs (`window`, `document`) |
| Static/SSG content | User interaction handlers |
| JSON-LD schema | Animations (if JS-driven) |
| Layout and page shells | Form validation feedback |
| Navigation (mostly) | Mobile menu toggle |

Mark Client Components explicitly:
```tsx
'use client';
```

---

## Styling: Tailwind CSS v4

**Why Tailwind:**
- Utility-first → no large CSS framework bundles
- Design tokens enforced through config
- Excellent PurgeCSS/tree-shaking by default
- v4 uses PostCSS directly — no separate config file needed in most cases

**Design tokens are defined in:** `tailwind.config.ts` and `src/app/globals.css`

Do NOT use arbitrary values like `w-[347px]` for layout. Define reusable tokens.

---

## Content System

**Two content approaches are used:**

### 1. TypeScript Data Files (services, technologies, industries, solutions)

Structured data with full TypeScript types:

```
src/content/
  services/
    index.ts          ← all services array
    [slug].ts         ← individual service data (or all in index.ts)
  technologies/
    index.ts
  industries/
    index.ts
  solutions/
    index.ts
```

**Why:** Type-safe, no runtime parsing, statically analysable, directly imported into pages.

### 2. MDX (blog articles, case studies)

```
src/content/
  blog/
    article-slug.mdx
  case-studies/
    project-slug.mdx
```

**Why:** Rich content with embedded React components, frontmatter metadata, maintained separately from code.

**MDX processing:** Via `@next/mdx` or `next-mdx-remote` — **TODO: confirm library choice when implementing**.

---

## SEO Architecture

All metadata generated via **Next.js Metadata API** (`generateMetadata` function or static `metadata` export).

Key utilities in `src/lib/seo/`:
```
src/lib/seo/
  metadata.ts       ← generatePageMetadata() helper
  og.ts             ← Open Graph defaults + dynamic OG
  canonical.ts      ← canonical URL generator
```

No manual `<head>` tag injection. No `react-helmet`. Native Next.js only.

---

## JSON-LD Schema Architecture

Reusable generator functions in `src/lib/schema/`:

```
src/lib/schema/
  organization.ts   ← generateOrganizationSchema()
  website.ts        ← generateWebsiteSchema()
  service.ts        ← generateServiceSchema()
  breadcrumb.ts     ← generateBreadcrumbSchema()
  article.ts        ← generateArticleSchema()
  faq.ts            ← generateFAQSchema()
  webpage.ts        ← generateWebPageSchema()
```

JSON-LD is injected via `<script type="application/ld+json">` in Server Components — never duplicated.

---

## Form Architecture

Contact form in `src/components/forms/ContactForm.tsx`.

**DECISION:** Client Component for UX (validation feedback, loading states). Server Action handles submission.

```
ContactForm.tsx ('use client')
  → calls Server Action in src/app/actions/contact.ts
  → Server Action validates with Zod
  → Server Action submits to email service (configurable via env var)
```

The email delivery backend is swappable via environment variables without changing UI:
- `CONTACT_EMAIL` — destination email
- `RESEND_API_KEY` — Resend.com API (or swap for SendGrid, SMTP, etc.)

---

## Analytics Architecture

**DECISION:** Analytics is opt-in via environment variables. No tracking loaded without config.

```tsx
// src/components/analytics/GoogleAnalytics.tsx
// Only renders if NEXT_PUBLIC_GA_ID is set
```

Supported:
- Google Analytics 4 (via `NEXT_PUBLIC_GA_ID`)
- Google Search Console (via `robots.ts` + sitemap)

---

## Image Architecture

All images via `next/image`:
- Static images in `/public/images/`
- External images allowlisted in `next.config.ts`
- Open Graph images: static default + dynamic generated per page type

---

## Sitemap and Robots

- `src/app/sitemap.ts` — dynamic, includes all static + content pages
- `src/app/robots.ts` — deliberate policy (not blanket allow or block)

Both auto-update as new content is added to the data files.

---

## Environment Variables

All configuration via environment variables. Never hardcoded.

```
# .env.local (gitignored)
NEXT_PUBLIC_SITE_URL=https://invospec.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
CONTACT_EMAIL=contact@invospec.com
RESEND_API_KEY=re_xxxxxx
```

See `.env.example` for the full list.

---

## Deployment

Target: **Vercel** (primary) or any Node-compatible host.

Build command: `yarn build`
Start command: `yarn start`
Dev server: `yarn dev`

No Docker required for basic deployment. Containerisation is possible if needed later.

---

## Key Architectural Decisions

See `docs/decisions/` for full ADRs.

| Decision | Reason | ADR |
|---|---|---|
| App Router over Pages Router | Server Components, cleaner metadata API | ADR-001 |
| TypeScript data files over CMS | Type-safe, no external service dependency | ADR-002 |
| MDX for blog/case studies | Rich content + React component embedding | ADR-003 |
| Tailwind v4 | Performance, design token control | ADR-004 |
| Server Actions for forms | No separate API route needed, server-side validation | ADR-005 |

---

*Last updated: 2026-10-04*
