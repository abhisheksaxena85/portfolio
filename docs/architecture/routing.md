# Routing Architecture — InvoSpec Website

> **Update 2026-10-18 (ADR-002, app-first refocus).** Current routes: `/`, `/services` and four service pages (`mobile-app-development`, `backend-api-development`, `mvp-development`, `software-maintenance`), **`/pricing`** (new), `/solutions` and six goal pages, `/technologies` and three pages (`flutter`, `android`, `ios`), `/industries` (noindex), `/blog`, `/case-studies` (noindex), `/about`, `/contact`, `/faq`, `/privacy`, `/terms`. New 301s in `next.config.ts`: `/services/{web-application-development → backend-api-development, saas-development → /solutions/launch-a-product-idea, custom-software-development → /solutions/replace-spreadsheets-and-manual-work}`, eight `/technologies/{java,spring-boot,nodejs,php,firebase,mysql,typescript,javascript}` → `/technologies`, and two renamed guides. `src/proxy.ts` sets the price-region cookie on first view only. The route tables below predate this and are kept for history.

> Complete route map with purpose, SEO intent, content source and schema for each route.

---

## Route Hierarchy

```
/                           Homepage
├── /services               Services index
│   ├── /services/software-development
│   ├── /services/mobile-app-development
│   ├── /services/web-development
│   ├── /services/backend-api-development
│   ├── /services/software-maintenance
│   ├── /services/app-maintenance
│   ├── /services/app-publishing
│   ├── /services/google-play-publishing
│   ├── /services/apple-app-store-publishing
│   ├── /services/cloud-deployment
│   ├── /services/mvp-development
│   ├── /services/saas-development
│   └── /services/business-automation
│
├── /solutions              Solutions index
│   ├── /solutions/custom-software
│   ├── /solutions/mvp
│   ├── /solutions/saas
│   ├── /solutions/business-automation
│   └── /solutions/ecommerce          (add only if company serves this)
│
├── /technologies           Technologies index
│   ├── /technologies/flutter
│   ├── /technologies/dart        → 301 to /technologies/flutter (merged 2026-10-14)
│   ├── /technologies/java
│   ├── /technologies/spring-boot
│   ├── /technologies/firebase
│   └── /technologies/mysql
│   (add more only for technologies company genuinely provides)
│
├── /industries             Industries index
│   ├── /industries/education
│   ├── /industries/healthcare
│   ├── /industries/retail
│   ├── /industries/logistics
│   ├── /industries/finance
│   ├── /industries/real-estate
│   ├── /industries/social-networking   (2026-11-21)
│   └── /industries/on-demand           (2026-11-21)
│
├── /case-studies           Case studies index
│   └── /case-studies/[slug]
│
├── /blog                   Blog index
│   └── /blog/[slug]
│
├── /about                  About page
├── /contact                Contact + lead form
├── /faq                    FAQ page
├── /sitemap.xml            Dynamic sitemap (auto-generated)
└── /robots.txt             Robots policy
```

---

## Route Details

### `/` — Homepage

| Field | Value |
|---|---|
| **Purpose** | First impression, lead generation entry point, brand statement |
| **Target audience** | Businesses and startups evaluating software development partners |
| **SEO intent** | Brand awareness + broad software development keywords |
| **Content source** | `src/content/services/index.ts`, `src/content/technologies/index.ts` |
| **Schema** | Organization, WebSite, WebPage |
| **CTA** | "Start a Project" → /contact |
| **Key sections** | Hero, Services overview, Why us, Process, Technologies, Industries, FAQ, CTA |

---

### `/services` — Services Index

| Field | Value |
|---|---|
| **Purpose** | Overview of all services; links to individual service pages |
| **Target audience** | Users exploring what the company offers |
| **SEO intent** | Commercial investigation — "software development services" |
| **Content source** | `src/content/services/index.ts` (all services list) |
| **Schema** | WebPage, BreadcrumbList |
| **Internal links** | Each service card links to `/services/[slug]` |

---

### `/services/[slug]` — Individual Service Pages

| Field | Value |
|---|---|
| **Purpose** | Deep-dive page for a specific service |
| **Target audience** | Users with specific need (e.g., "I need a Flutter app built") |
| **SEO intent** | Bottom of funnel — high commercial intent |
| **Content source** | `src/content/services/[slug].ts` or entry in `index.ts` |
| **Schema** | Service, BreadcrumbList, FAQPage (if FAQs present) |
| **Internal links** | Related technologies, related industries, related case studies, contact CTA |
| **Template** | `src/app/services/[slug]/page.tsx` |
| **Static params** | `generateStaticParams()` from services data |
| **404 handling** | `notFound()` if slug not in data |

**Service page required sections:**
1. Hero with H1 and primary CTA
2. What this service includes
3. Problems this solves
4. Development process for this service
5. Technologies used
6. Relevant case studies (if available)
7. FAQ for this service
8. Related services
9. Final CTA

---

### `/solutions/[slug]` — Solution Pages

| Field | Value |
|---|---|
| **Purpose** | Problem-oriented pages (vs service-oriented) |
| **Difference from services** | Services = what we do; Solutions = what problem we solve |
| **Target audience** | Users searching by outcome, not by technology |
| **SEO intent** | Commercial investigation |
| **Content source** | `src/content/solutions/index.ts` |
| **Schema** | WebPage, BreadcrumbList |
| **Internal links** | → Relevant services, technologies, case studies |

---

### `/technologies/[slug]` — Technology Pages

| Field | Value |
|---|---|
| **Purpose** | Technical credibility pages for specific technologies |
| **Target audience** | Technical buyers, engineering managers |
| **SEO intent** | Commercial investigation + top of funnel technical |
| **Content source** | `src/content/technologies/index.ts` |
| **Schema** | WebPage, BreadcrumbList |
| **Internal links** | → Services using this tech, related case studies, blog articles |
| **IMPORTANT** | Only create pages for technologies the company genuinely provides |

---

### `/industries/[slug]` — Industry Pages

| Field | Value |
|---|---|
| **Purpose** | Industry-specific positioning — shows domain understanding |
| **Target audience** | Buyers in a specific vertical |
| **SEO intent** | Commercial investigation — "software development for healthcare" |
| **Content source** | `src/content/industries/index.ts` |
| **Schema** | WebPage, BreadcrumbList |
| **Internal links** | → Services, relevant case studies, relevant articles |
| **IMPORTANT** | Only create pages for industries the company genuinely serves |

---

### `/case-studies/[slug]` — Case Study Pages

| Field | Value |
|---|---|
| **Purpose** | Demonstrate real engineering work and problem-solving |
| **Target audience** | Buyers doing due diligence; also useful for SEO |
| **SEO intent** | Brand / authority building |
| **Content source** | `src/content/case-studies/[slug].mdx` |
| **Schema** | Article (or WebPage), BreadcrumbList |
| **Internal links** | → Services used, technologies used, industry, contact CTA |
| **CRITICAL** | Never fabricate results, clients, or metrics |

---

### `/blog/[slug]` — Blog / Article Pages

| Field | Value |
|---|---|
| **Purpose** | Educational content that attracts organic search traffic |
| **Target audience** | All funnel stages depending on article |
| **SEO intent** | Top of funnel (educational) + Middle of funnel (commercial investigation) |
| **Content source** | `src/content/blog/[slug].mdx` |
| **Schema** | BlogPosting, BreadcrumbList |
| **Internal links** | → Related services, technologies, case studies |
| **CRITICAL** | Never publish AI-generated filler. Content must have genuine engineering value |

---

### `/about` — About Page

| Field | Value |
|---|---|
| **Purpose** | Company story, team, values, credibility |
| **Target audience** | Buyers evaluating trust and legitimacy |
| **SEO intent** | Brand queries + "about software company" |
| **Content source** | Page content inline (pulled from `site.ts` for company info) |
| **Schema** | Organization, WebPage |
| **IMPORTANT** | Only include real information. Placeholder where unknown |

---

### `/contact` — Contact Page

| Field | Value |
|---|---|
| **Purpose** | Primary lead generation page |
| **Target audience** | High-intent buyers ready to start a conversation |
| **SEO intent** | Brand + "contact software company" |
| **Content source** | `src/config/site.ts` for contact info |
| **Schema** | ContactPage (WebPage), Organization |
| **Form handling** | Server Action → email service |
| **Validation** | Zod on server |

---

### `/faq` — FAQ Page

| Field | Value |
|---|---|
| **Purpose** | Answer common buyer questions; reduce contact-form friction |
| **Target audience** | Mid-funnel buyers with specific questions |
| **SEO intent** | Featured snippets; question-based searches |
| **Content source** | `src/content/faq/index.ts` |
| **Schema** | FAQPage |
| **Internal links** | Each answer links to relevant service or contact page |

---

## Static Utility Routes

| Route | Purpose |
|---|---|
| `/sitemap.xml` | Auto-generated XML sitemap (via `src/app/sitemap.ts`) |
| `/robots.txt` | Crawler policy (via `src/app/robots.ts`) |
| `/not-found` | Custom 404 page |

---

## Robots Policy

Allow:
- All major search engines
- All important content pages

Disallow:
- `/api/` routes
- Any `/admin/` routes (if added)
- Preview or draft routes

Do not blindly block AI crawlers. Review policy deliberately.

---

## URL Conventions

- All lowercase
- Hyphens for word separation
- No query parameters for indexable pages
- No trailing slashes (handled by Next.js config)
- Canonical URL always set

---

*Last updated: 2026-10-04*
