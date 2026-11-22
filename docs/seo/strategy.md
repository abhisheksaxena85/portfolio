# SEO Strategy — InvoSpec Website

> **Update 2026-10-18 (ADR-002).** Positioning is app development. Bottom-of-funnel targets shift to app queries ("mobile app development company", "Flutter app development", "MVP app development", "app maintenance services", "app development cost India"). `/pricing` is the money page for cost intent; the guide "What decides the cost of a mobile app" and "How much does an app cost?" support it and must not duplicate it. No separate India or international pages: one URL, price list chosen by country.

> Canonical SEO reference for all AI agents and developers.
> Schema details → [`schema.md`](./schema.md)
> Internal linking → [`internal-linking.md`](./internal-linking.md)

---

## Core SEO Principle

> **SEO is a consequence of a technically excellent, authoritative, useful website — not keyword manipulation.**

Build for:
1. **Real users** — clear, useful, honest content
2. **Search engines** — technical correctness, structured data
3. **AI systems** — clear entity definition, factual language

In that priority order.

---

## Technical SEO

### Metadata (via Next.js Metadata API)

Every indexable page builds its metadata with `buildMetadata()` from `src/lib/seo/metadata.ts`. Do not hand-write `openGraph`, `twitter` or `alternates`: Next.js replaces (does not merge) a parent's `openGraph` and `twitter` objects, which is how every page once shared the homepage's Twitter title and lost its share image.

```tsx
// Static page
export const metadata: Metadata = buildMetadata({
  title: "Software Development Services",      // no brand suffix; the template adds it
  description: "Unique description under 160 characters.",
  path: "/services",                            // becomes the canonical URL
});

// Dynamic page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) return { title: "Not found" };
  return buildMetadata({ title: item.seo.title, description: item.seo.description, path: `/services/${item.slug}` });
}
```

Options: `absoluteTitle: true` when the title already names the brand (About, Contact, Home); `noindex: true` keeps a page out of the index but followable.

**Rules:**
- Every title must be unique site-wide
- Every description must be unique site-wide
- Canonical URLs come from `path`; never set them by hand
- The root layout sets no canonical, so a page without metadata cannot inherit the homepage's
- Title template: `{Page Title} | InvoSpec` (set in `siteConfig.seo.titleTemplate`). `seo.title` values in `src/content/` must not include the suffix
- `yarn build && yarn seo:check` enforces all of the above on the rendered HTML

---

### Heading Hierarchy

- One `<h1>` per page — contains the primary keyword/topic naturally
- `<h2>` for major page sections
- `<h3>` for subsections or card titles
- Never skip levels (e.g., h1 → h3 with no h2)
- Headings must describe content, not just be decorative

---

### Semantic HTML

- `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`, `<aside>`
- `<article>` for case studies and blog posts
- `<section>` with `aria-label` or a heading for page sections
- No `<div>` soup where semantic elements exist

---

### URL Structure

```
/services/mobile-app-development          ✓
/services?id=mobile-app-development       ✗
/service1                                 ✗
/services/MobileAppDevelopment            ✗
```

Rules:
- All lowercase
- Hyphens only (no underscores, no spaces)
- Descriptive slugs (meaningful to humans)
- No query params for indexable pages
- No trailing slashes (Next.js handles via config)

---

### Canonical URLs

Set canonical on every indexable page. Source: `NEXT_PUBLIC_SITE_URL` env var.

```tsx
alternates: {
  canonical: `${siteConfig.url}/services/mobile-app-development`,
},
```

Do not index:
- `/api/` routes
- Admin routes
- Preview or draft routes
- Duplicate content (use canonical)

---

### Sitemap

**File:** `src/app/sitemap.ts` (Next.js dynamic sitemap)

Include:
- Homepage
- All service pages
- All solution pages
- All technology pages
- All industry pages
- Published case studies (and `/case-studies` once one exists)
- Published guides (`/blog` and `/blog/[slug]`), with `lastModified` from each article's `updated`
- About, Contact, FAQ, Privacy, Terms

Exclude:
- `noindex` pages (industries while `INDUSTRIES_INDEXABLE` is false; `/case-studies` while empty; drafts)
- `/api/` routes
- Draft/preview content
- Admin routes

Dynamic entries are added automatically from the data files. `lastModified` comes from each entry's `updated` field (content entries) or the `staticRoutes` list in `sitemap.ts`: update that date when a page's content changes materially, never set it to the build time. `priority` and `changeFrequency` are not used (Google ignores both). `yarn seo:check` fails if the sitemap and the set of indexable pages drift apart.

---

### Robots

**File:** `src/app/robots.ts`

Policy:
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: https://invospec.com/sitemap.xml
```

Do NOT blanket-block AI crawlers. Make deliberate choices.
Consider: GPTBot, Claude-Web, Applebot — allow unless there is a specific reason not to.

---

### Core Web Vitals

**LCP (Largest Contentful Paint) < 2.5s:**
- Hero image via `next/image` with `priority` prop
- No render-blocking scripts
- Critical CSS inlined (Tailwind handles this)

**CLS (Cumulative Layout Shift) < 0.1:**
- Always specify `width` and `height` on images
- Reserve space for async-loaded content
- Avoid injecting content above existing content

**INP (Interaction to Next Paint) < 200ms:**
- Minimise JavaScript in Client Components
- No heavy animation libraries
- Debounce/throttle expensive handlers

---

## On-Page SEO

### Title Tag Formula

The template appends ` | InvoSpec`. Write only the part before it, and keep the full rendered title near 60 characters.

```
Service pages:    {Service Name} Services                         → "… | InvoSpec"
Technology pages: {Technology} Development Services
Goal pages:       {Outcome in the visitor's words}
Blog articles:    {Article Title}
Case studies:     {Project Name}: {Industry} Software Development
About / Contact:  absolute titles that name InvoSpec Softwares once
```

### Meta Description Formula

- 140–160 characters
- Contains primary keyword naturally
- Describes what the page provides
- Has a soft CTA if appropriate
- Unique per page — never reuse

### Content Quality Requirements

Every indexable page must:
- Provide standalone value to a human reader
- Answer a real question or serve a real need
- Contain accurate, specific information
- Not be a thin duplicate of another page
- Have sufficient depth for its purpose (service pages need real content, not 200-word stubs)

---

## Search Intent Architecture

### Top of Funnel (Educational)
Target: People researching, not yet buying.

Examples:
- "What is software maintenance?"
- "Flutter vs React Native comparison"
- "How to build an MVP"
- "What does a backend API do?"

Content type: Blog articles in `src/content/blog/`
Internal links: → Related service → Related technology → Contact

### Middle of Funnel (Commercial Investigation)
Target: People evaluating options, comparing costs.

Examples:
- "How much does a Flutter app cost?"
- "Best technology stack for SaaS"
- "Software maintenance cost guide"
- "How to choose a mobile app development company"

Content type: Long-form blog articles or dedicated solution pages
Internal links: → Service page → Case studies → Contact

### Bottom of Funnel (Service / Transactional)
Target: Ready to hire. Searching for a provider.

Examples:
- "Flutter app development services"
- "Custom software development company India"
- "Mobile app development agency"
- "Software maintenance services"

Content type: Service pages in `src/content/services/`
Internal links: → Technologies used → Case studies → Contact form

---

## AI Search Optimisation (LLM/Entity SEO)

AI-powered search (ChatGPT, Perplexity, Google AI Overviews) works by understanding **entities**, not just keywords.

### Entity Definition Strategy

The website must clearly communicate:

```
ENTITY: InvoSpec Softwares
TYPE: Software Engineering Company
LOCATION: India
SERVICES: [explicit list]
TECHNOLOGIES: [explicit list]
INDUSTRIES: [explicit list]
CONTACT: contact@invospec.com
URL: invospec.com
```

This is achieved via:
1. **Organization JSON-LD** on every page (from root layout)
2. **Consistent factual language** throughout content
3. **Dedicated About page** with clear company description
4. **Consistent naming** — always "InvoSpec Softwares", not variations
5. **Social profile consistency** — same description on LinkedIn, GitHub, etc.

### Factual Language Requirements

AI systems extract facts from prose. Write factually:

✓ "InvoSpec Softwares provides Flutter mobile app development for iOS and Android."
✗ "We offer innovative cutting-edge mobile solutions."

✓ "The company uses Java and Spring Boot for backend API development."
✗ "Our backend team uses the latest technologies."

---

## What NOT To Do

| Action | Why not |
|---|---|
| Create 50 city pages | Spam; no real office in those cities |
| Create near-identical service pages | Thin content; Google penalties |
| Keyword stuff page copy | User experience damage; ranking damage |
| Create fake FAQ pages for keywords | Thin content |
| Buy backlinks | Against Google Webmaster Guidelines |
| Use AI to generate filler articles | Low quality; potentially penalised |
| Create doorway pages | Against Google Webmaster Guidelines |
| Add fake testimonials with keywords | Deceptive + SEO manipulation |

---

## Open Graph

Every major page must have OG metadata:

```tsx
openGraph: {
  title: 'Page Title',
  description: 'Page description',
  url: 'https://invospec.com/page',
  siteName: 'InvoSpec Softwares',
  images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  type: 'website', // or 'article' for blog
},
```

OG image:
- Static default: `/public/images/og-default.png` (1200×630)
- Dynamic OG images for blog posts and case studies (optional, implement later)

---

*Last updated: 2026-10-04*
