# Content Model — InvoSpec Website

> **Update 2026-10-18 (ADR-002).** New content type **Package** (`src/types/content.ts`, data in `src/content/packages.ts`): `slug`, `name`, `kicker`, `audience`, `summary`, `price { inr, usd, unit }`, `includes`, `excludes`, `youProvide`, `typicalGoals` (goal slugs; the only place the package-to-goal mapping lives), `relatedService`, `notes`, `order`, `updated`. INR and USD are separate price lists, never computed from each other. Prices in MDX use `<PackagePrice slug="…" />`, never a typed number. Services are now four; the web application, SaaS and custom software services are retired. Content references use slug union types (`ServiceSlug`, `SolutionSlug`, `TechnologySlug`, `PackageSlug`).

> Defines all content types, their fields, and relationships.
> Editorial guidelines → [`editorial-guidelines.md`](./editorial-guidelines.md)

---

## Content Architecture Summary

| Type | Storage | Route |
|---|---|---|
| Service | `src/content/services/index.ts` | `/services/[slug]` |
| Solution | `src/content/solutions/index.ts` | `/solutions/[slug]` |
| Technology | `src/content/technologies/index.ts` | `/technologies/[slug]` |
| Industry | `src/content/industries/index.ts` | `/industries/[slug]` |
| Case Study | `src/content/case-studies/*.mdx` | `/case-studies/[slug]` |
| Blog Article | `src/content/blog/*.mdx` | `/blog/[slug]` |
| FAQ Entry | `src/content/faq/index.ts` | `/faq` |
| Author | `src/content/authors/index.ts` | (used in articles) |

---

## Shared Types

```typescript
// src/types/content.ts

export type FAQ = {
  question: string;
  answer: string;          // Markdown supported
};

export type SEOMeta = {
  title: string;           // Max 60 chars
  description: string;     // Max 160 chars
  ogImage?: string;        // Path to OG image
};

export type ContentStatus = 'published' | 'draft';
```

---

## Service

**Source:** `src/content/services/index.ts`
**TypeScript type:** `src/types/service.ts`

```typescript
export type Service = {
  // Identity
  slug: string;                    // URL slug, e.g. 'mobile-app-development'
  name: string;                    // Display name, e.g. 'Mobile App Development'
  shortDescription: string;        // 1–2 sentences, used in cards/lists
  description: string;             // Full description (markdown)

  // Page content
  heroHeading?: string;            // Optional custom H1 for service page
  problemsSolved: string[];        // List of problems this service addresses
  servicesIncluded: string[];      // Bullet list of what's included
  platforms?: string[];            // e.g. ['iOS', 'Android', 'Web']
  process?: Array<{                // Optional service-specific process steps
    step: string;
    title: string;
    description: string;
  }>;
  capabilities?: string[];         // Key capabilities/features

  // Relationships
  technologies: string[];          // Technology slugs used in this service
  industries: string[];            // Industry slugs typically served
  relatedServices: string[];       // Service slugs for "Related Services" block
  relatedCaseStudies: string[];    // Case study slugs
  relatedArticles: string[];       // Blog article slugs

  // Content
  faqs: FAQ[];                     // Service-specific FAQs

  // SEO
  seo: SEOMeta;
  keywords?: string[];             // Additional keywords (not for stuffing)

  // Status
  status: ContentStatus;
  order?: number;                  // Display order in services list
};
```

**Required fields:** `slug`, `name`, `shortDescription`, `description`, `seo`, `status`
**Optional but recommended:** `problemsSolved`, `faqs`, `technologies`, `relatedServices`

---

## Solution

**Source:** `src/content/solutions/index.ts`
**Distinction from Service:** Solutions are problem/outcome-oriented; services are capability-oriented.

```typescript
export type Solution = {
  slug: string;
  name: string;                    // e.g. 'MVP Development'
  tagline: string;                 // Short outcome statement
  shortDescription: string;
  description: string;

  // Problem → Solution framing
  problemStatement: string;
  outcomeStatement: string;

  // What's delivered
  deliverables: string[];

  // Relationships
  services: string[];              // Which services combine to deliver this solution
  technologies: string[];
  industries: string[];
  relatedCaseStudies: string[];
  faqs: FAQ[];

  seo: SEOMeta;
  status: ContentStatus;

  // Optional structured sections (added 2026-10-12; rendered only when present)
  eyebrow?: string;                // Mono eyebrow above the H1 (falls back to tagline)
  diagram?: "release-pipeline" | DiagramVariant; // Hero illustration
  facts?: FactCard[];              // Verifiable facts with { label, value, note?, source? }
  steps?: ProcessStep[];           // { title, description, youProvide?, weDo? }
  youNeed?: string[];              // Checklist of what the client brings
  sources?: SourceLink[];          // { label, href, checked: ISO date }

  // Goal-page structure (outcome-first plan, 2026-10-13)
  navLabel?: string;               // "I want to…" menu label
  icon?: IconName;
  parts?: Part[];                  // { plain, technical?, description } — plain first
  priceDrivers?: string[];         // questions that move the price
  afterContact?: string[];         // what happens after the enquiry, in order
  technicalDetails?: { summary: string; stack: string[]; notes: string[] }; // collapsed block for evaluators
};
```

**Goal pages.** `/solutions/[slug]` entries are the six goal pages. Each must answer, in order: what you would get (`parts`), how it works (`steps`), what affects the price (`priceDrivers`), what you need to bring (`youNeed`), what happens after you contact us (`afterContact`), and FAQ. Public copy follows `src/config/vocabulary.ts` and the readability gate (`yarn lint` runs `scripts/readability.mjs`; grade ≤ 9). The header's goal links are a literal in `src/config/navigation.ts`; keep `navLabel`, `icon` and `tagline` in sync.

**Fact policy for `facts` and `sources`:** every `FactCard` with a number, fee or rule must carry a `source` with the date it was checked. Facts without a source may only state what InvoSpec itself does. See `src/content/solutions.ts` (app-store-publishing) for the reference example.

---

## Technology

**Source:** `src/content/technologies/index.ts`

```typescript
export type Technology = {
  slug: string;                    // e.g. 'flutter'
  name: string;                    // e.g. 'Flutter'
  category: TechnologyCategory;    // See enum below
  shortDescription: string;
  description: string;             // What this technology is, what InvoSpec uses it for

  // Company's expertise context (factual only — no invented claims)
  usedFor: string[];               // e.g. ['Mobile app development', 'Cross-platform apps']
  platforms?: string[];            // e.g. ['iOS', 'Android', 'Web', 'Desktop']

  // Relationships
  services: string[];              // Which services use this technology
  relatedTechnologies: string[];   // Related/complementary techs
  relatedCaseStudies: string[];
  relatedArticles: string[];

  seo: SEOMeta;
  status: ContentStatus;
};

export type TechnologyCategory =
  | 'mobile'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'cloud'
  | 'language'
  | 'framework'
  | 'tool';
```

**IMPORTANT:** Only create Technology entries for technologies the company genuinely uses.

---

## Industry

> **Current type (2026-11-21):** see `Industry` in `src/types/content.ts`; data in `src/content/industries.ts` (eight entries, `noindex` until `INDUSTRIES_INDEXABLE`). Added fields: `icon` (an `IconName`), `accent` (`IndustryAccent`, maps to the `--color-ind-*` tokens) and `tags` (two short labels for the card). `industriesByOrder` is the sorted list every grid uses. The block below is the original plan, kept for history.

**Source:** `src/content/industries/index.ts`

```typescript
export type Industry = {
  slug: string;                    // e.g. 'healthcare'
  name: string;                    // e.g. 'Healthcare'
  shortDescription: string;
  description: string;

  // Context (factual only)
  commonChallenges: string[];      // Real challenges in this industry
  softwareSolutionsBuilt: string[]; // Types of software built for this industry (generic, not client-specific)

  // Relationships
  services: string[];
  technologies: string[];
  relatedCaseStudies: string[];
  relatedArticles: string[];
  faqs: FAQ[];

  seo: SEOMeta;
  status: ContentStatus;
};
```

**IMPORTANT:** Only create Industry entries for industries the company genuinely serves.

---

## Case Study

**Source:** `src/content/case-studies/[slug].mdx` · loader `src/lib/content/case-studies.ts` · route `/case-studies/[slug]`
**Template:** copy `src/content/case-studies/_TEMPLATE.mdx` (files starting with `_` are ignored).

Metadata is an `export const meta = { … }` at the top of the MDX file (not YAML frontmatter; `@next/mdx` has no frontmatter support), validated with Zod at build time. Invalid meta fails the build with the field named.

```ts
export const meta = {
  title: "Project title",                 // ≤ 90 characters
  summary: "One or two sentences.",       // 50–160 characters; cards and meta description
  status: "draft",                         // "published" only after owner review
  client: "Client name",                  // or "anonymised"
  permission: { grantedBy: "Name, role", date: "2026-01-01" }, // required
  industry: "Healthcare",                 // optional, free text
  goal: "take-bookings-and-orders-online",// optional: /solutions slug it illustrates
  services: ["mobile-app-development"],   // service slugs
  technologies: ["flutter", "spring-boot"],
  platforms: ["iOS", "Android"],
  published: "2026-01-01",
  updated: "2026-01-01",                   // ≥ published; feeds the sitemap
};
```

Body sections (template): Context · The problem · Constraints · What we built · Engineering decisions and trade-offs · Outcome · After launch.

Behaviour: `/case-studies` is `noindex` and out of the sitemap until at least one study is `published`; then it lists them and is indexed. Each published study gets `Article` + `BreadcrumbList` JSON-LD and appears on its goal page and on articles that point at that goal.

**CRITICAL RULES (ADR-001):** written client permission first (the `permission` field records it); never fabricate client names, metrics, timelines or quotes; "[Client Name Withheld]" / `client: "anonymised"` when the client allows the story but not the name.

---

## Blog Article

**Source:** `src/content/blog/[slug].mdx` · loader `src/lib/content/blog.ts` · routes `/blog`, `/blog/[slug]`
**Gate:** `scripts/readability.mjs` holds every published guide at reading grade 9 or below.

```ts
export const meta = {
  title: "Article title",                  // ≤ 90 characters; no brand suffix
  description: "For search results.",     // 50–160 characters
  published: "2026-10-14",
  updated: "2026-10-14",                   // ≥ published; feeds the sitemap and dateModified
  kind: "article",                         // or "sample": a labelled example of a real deliverable
  status: "published",                     // "draft" is excluded from routes, lists and sitemap
  author: "InvoSpec Softwares",            // default; a real person's name when one is supplied
  supports: { label: "Mobile app development", href: "/services/mobile-app-development" }, // the one page this article exists to send readers to
  goals: ["launch-a-product-idea"],        // /solutions slugs → "I want to…" cards and reverse links from goal pages
  services: ["mobile-app-development"],    // service slugs → reverse links from service pages
  faqs: [{ question, answer }],            // rendered + FAQPage JSON-LD; only questions the body does not already answer
  sources: [{ label, href, checked: "2026-10-14" }], // every external fact cites one of these
};
```

Rendered template order: breadcrumb · header (sample badge, title, description, author, dates, reading time) · body · "How we handle this" box (`supports`) · common questions · sources · related case study (when one exists for a goal) · "Where this leads" goal cards · enquiry form (`source = blog/<slug>`). JSON-LD: `BlogPosting` (author Organization unless a person is named), `BreadcrumbList`, `FAQPage`.

Reading time is computed from the file (220 words per minute). Authors: see **Author** below; until real names are supplied, articles are authored by the Organization.

---

## FAQ Entry

**Source:** `src/content/faq/index.ts`

```typescript
export type FAQEntry = {
  id: string;                      // Unique identifier
  question: string;
  answer: string;                  // Markdown supported
  category: FAQCategory;
  relatedService?: string;         // Service slug
  order: number;
};

export type FAQCategory =
  | 'general'
  | 'services'
  | 'process'
  | 'pricing'
  | 'maintenance'
  | 'publishing';
```

---

## Author

**Source:** `src/content/authors/index.ts`

```typescript
export type Author = {
  slug: string;
  name: string;                    // Real full name
  role?: string;                   // Real job title
  bio?: string;                    // Short biography
  image?: string;                  // Real photo path
  linkedin?: string;               // Real LinkedIn URL
  github?: string;                 // Real GitHub URL
};
```

**IMPORTANT:** Only real people. Never fabricate author identities.

---

## Content Validation Rules

Before adding any content:

- [ ] `slug` is lowercase, hyphenated, unique
- [ ] `status` is set correctly (`draft` until ready)
- [ ] All relationship slugs (technologies, services, etc.) exist in their respective data files
- [ ] SEO title is unique site-wide and ≤ 60 characters
- [ ] SEO description is unique site-wide and ≤ 160 characters
- [ ] No fabricated information
- [ ] All PLACEHOLDER values are clearly marked

---

*Last updated: 2026-10-14*
