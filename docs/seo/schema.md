# Structured Data (JSON-LD) — InvoSpec Website

> **Update 2026-10-18 (ADR-002).** `/pricing` carries `BreadcrumbList` and `FAQPage` only. **No `Offer` or `PriceSpecification` in v1:** the visible price list depends on the visitor's country (INR in India, USD elsewhere), so one schema price would not match every visitor's page. Revisit after the page has been live, e.g. one `Service` per package with an INR and a USD `Offer`, omitting `maxPrice` for open-ended ranges.

> Defines which schemas to use, when, where, and what data to include.
> SEO strategy → [`strategy.md`](./strategy.md)

---

## Core Principle

> Schema must match visible page content. Never add schema purely for SEO manipulation.

All JSON-LD injected via `<script type="application/ld+json">` in Server Components.
Never duplicated (don't add the same schema twice to one page).

---

## Generator Functions

All defined in `src/lib/schema/`. Each function returns a valid JSON-LD object.

```
src/lib/schema/
  organization.ts   → generateOrganizationSchema()
  website.ts        → generateWebsiteSchema()
  service.ts        → generateServiceSchema()
  breadcrumb.ts     → generateBreadcrumbSchema()
  article.ts        → generateArticleSchema()
  faq.ts            → generateFAQSchema()
  webpage.ts        → generateWebPageSchema()
```

---

## Schema Definitions

---

### Organization

**When:** Root layout (`src/app/layout.tsx`) — present on every page.

**Required fields:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "InvoSpec Softwares",
  "url": "https://invospec.com",
  "email": "contact@invospec.com",
  "description": "InvoSpec Softwares builds custom software products — mobile apps, web applications, APIs and SaaS platforms.",
  "logo": "https://invospec.com/images/logo.png",
  "sameAs": []
}
```

**Optional fields (add when real data available):**
- `"telephone"` — only when real number is confirmed
- `"address"` — only when real address is confirmed (use `PostalAddress` type)
- `"foundingDate"` — only when real date is confirmed
- `"numberOfEmployees"` — only when accurate
- `"sameAs"` — LinkedIn URL, GitHub URL, etc. (add when confirmed)

**Source:** `src/config/site.ts`

**NEVER fabricate:** telephone, address, employee count, founding date, revenue

---

### WebSite

**When:** Homepage only.

**Required fields:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "InvoSpec Softwares",
  "url": "https://invospec.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://invospec.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

Only include `potentialAction` if site search is actually implemented.

---

### WebPage

**When:** Any page that doesn't have a more specific type (about, contact, FAQ, solutions index, industries index).

**Required fields:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Page Title",
  "description": "Page description",
  "url": "https://invospec.com/page",
  "isPartOf": { "@type": "WebSite", "url": "https://invospec.com" }
}
```

---

### Service

**When:** Every individual service page (`/services/[slug]`).

**Required fields:**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Mobile App Development",
  "description": "We build iOS and Android mobile applications using Flutter...",
  "provider": {
    "@type": "Organization",
    "name": "InvoSpec Softwares",
    "url": "https://invospec.com"
  },
  "serviceType": "Software Development",
  "areaServed": "Worldwide"
}
```

**Optional fields:**
- `"offers"` — if pricing tiers exist
- `"termsOfService"` — if terms page exists
- `"serviceOutput"` — what the service produces

**Data source:** `src/content/services/[slug].ts`

---

### BreadcrumbList

**When:** All pages more than 1 level deep (service pages, technology pages, case studies, blog articles, etc.).

**Format:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://invospec.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://invospec.com/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Mobile App Development",
      "item": "https://invospec.com/services/mobile-app-development"
    }
  ]
}
```

**Breadcrumb must match the visible breadcrumb on the page.**

---

### BlogPosting

**When:** Every individual blog article (`/blog/[slug]`).

**Required fields:**
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "description": "Article description",
  "url": "https://invospec.com/blog/article-slug",
  "datePublished": "2025-01-01",
  "dateModified": "2025-01-15",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "InvoSpec Softwares",
    "logo": {
      "@type": "ImageObject",
      "url": "https://invospec.com/images/logo.png"
    }
  }
}
```

**Optional:**
- `"image"` — article featured image URL
- `"wordCount"` — approximate word count
- `"articleSection"` — category name
- `"keywords"` — relevant tags

**Data source:** MDX frontmatter in `src/content/blog/[slug].mdx`

**NEVER fabricate:** author name, publish date, or any metric

---

### FAQPage

**When:** FAQ page (`/faq`) and service pages that include a FAQ section.

**Format:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does mobile app development cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The cost depends on the features, platforms supported, and complexity..."
      }
    }
  ]
}
```

**FAQ content must match the visible FAQ on the page.**
**Do NOT create FAQ schema for questions not visible on the page.**

---

### Person

**When:** Author profiles on blog articles. About page if team members are listed.

**Required fields:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Author Full Name",
  "url": "https://invospec.com/about"
}
```

**Optional:**
- `"jobTitle"` — if accurate
- `"image"` — if real photo available
- `"sameAs"` — LinkedIn URL, GitHub URL

**NEVER fabricate** author names, job titles, or bios.

---

### LocalBusiness

**When to use:** Only if InvoSpec Softwares has a genuine physical location with a real address, phone number, and business hours.

**When NOT to use:** Do not add `LocalBusiness` schema with a fabricated or incomplete address. This is misleading to Google Maps and users.

**Status:** PLACEHOLDER — requires real company address before implementing.

---

## Validation Rules

Before shipping any new schema:

1. **Match check:** Does every schema field have a corresponding visible element on the page?
2. **No fabrication:** Is every field value real, confirmed data?
3. **No duplication:** Is this schema already injected higher in the layout tree?
4. **Validation tool:** Test via [Google's Rich Results Test](https://search.google.com/test/rich-results) or [schema.org validator](https://validator.schema.org/)

---

## Implementation Pattern

In a Server Component page:

```tsx
import { generateServiceSchema } from '@/lib/schema/service';
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumb';

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug);
  const serviceSchema = generateServiceSchema(service);
  const breadcrumbSchema = generateBreadcrumbSchema([...]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* page content */}
    </>
  );
}
```

`dangerouslySetInnerHTML` is safe here because the data comes from our own controlled TypeScript data files — not user input.

---

*Last updated: 2026-10-04*
