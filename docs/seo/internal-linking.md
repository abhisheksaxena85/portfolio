# Internal Linking Model — InvoSpec Website

> **Update 2026-10-18 (ADR-002).** `/pricing` is linked from the primary navigation, the footer "Packages" column (one link per package anchor), the hero, CTA sections, every goal and service page ("Packages that usually fit", via `packagesForGoal` / `packagesForService`), the cost and MVP guides, and the FAQ. Package cards link to `/contact?package=<slug>#enquiry` (canonical stays `/contact`).

> Defines how content types link to each other.
> SEO strategy → [`strategy.md`](./strategy.md)

---

## Purpose of Internal Linking

1. **User value** — guide users to the next relevant piece of information
2. **SEO** — distribute link equity; help search engines understand site structure
3. **Conversion** — every piece of content should have a clear path toward `/contact`

**Rule:** Never add an internal link purely for SEO. Links must be genuinely useful.

---

## Linking Map

### Blog Article
```
Article
  → Primary related service(s)        [RelatedServices component]
  → Primary related technology(s)     [RelatedTechnologies component]
  → Related case study(s)             [RelatedCaseStudies component]
  → Related articles                  [RelatedArticles component]
  → /contact (inline CTA mid-article or end CTA)
```

Example:
- Article: "How to build a Flutter app"
- Links to: `/services/mobile-app-development`
- Links to: `/technologies/flutter`
- Links to: relevant case study if one exists
- CTA to: `/contact`

---

### Service Page
```
Service page
  → Technologies used for this service  [tech badges + links]
  → Industries served by this service   [industry links]
  → Case studies using this service     [RelatedCaseStudies]
  → Relevant blog articles              [RelatedArticles]
  → Related services (similar/adjacent) [RelatedServices]
  → /contact (primary CTA)
```

Example:
- Service: "Mobile App Development"
- Links to: `/technologies/flutter` (Dart is covered on the Flutter page; `/technologies/dart` redirects there)
- Links to: `/industries/healthcare`, `/industries/retail`
- Links to: relevant case studies

---

### Technology Page
```
Technology page
  → Services that use this technology   [RelatedServices]
  → Case studies built with this tech   [RelatedCaseStudies]
  → Blog articles about this tech       [RelatedArticles]
  → /contact
```

Example:
- Technology: "Flutter"
- Links to: `/services/mobile-app-development`, `/services/app-publishing`
- Links to: Flutter case studies
- Links to: "How to build a Flutter app" blog post

---

### Case Study
```
Case study
  → Services used on this project       [RelatedServices]
  → Technologies used                   [tech badges + links]
  → Industry it belongs to              [industry link + badge]
  → Other case studies in same industry [RelatedCaseStudies]
  → /contact (CTA)
```

---

### Industry Page
```
Industry page
  → Services relevant to this industry  [RelatedServices]
  → Technologies commonly used          [RelatedTechnologies]
  → Case studies from this industry     [RelatedCaseStudies]
  → Articles relevant to this industry  [RelatedArticles]
  → /contact
```

---

### Solution Page
```
Solution page
  → Services that deliver this solution [RelatedServices]
  → Technologies used                   [RelatedTechnologies]
  → Case studies                        [RelatedCaseStudies]
  → /contact
```

---

### FAQ Page
```
Each FAQ answer
  → Links to relevant service page where appropriate
  → Links to relevant blog article where appropriate
  → /contact for "how to get started" answers
```

---

## Breadcrumb Links

All breadcrumbs link back up the hierarchy:

```
Home > Services > Mobile App Development
  (each level is a link)

Home > Blog > How to Build a Flutter App
Home > Case Studies > Project Name
Home > Technologies > Flutter
```

---

## Implementation in Data Files

Each content item carries its relationship data:

```typescript
// In service data
const mobileAppDevelopment = {
  slug: 'mobile-app-development',
  relatedTechnologies: ['flutter', 'dart', 'firebase'],
  relatedIndustries: ['healthcare', 'retail', 'education'],
  relatedCaseStudies: [], // fill as case studies are added
  relatedServices: ['web-development', 'backend-api-development'],
  relatedArticles: [], // fill as articles are added
};
```

The `RelatedServices`, `RelatedTechnologies`, etc. components resolve slugs to full content objects at render time.

---

## Navigation Links (Global)

The main navigation provides top-level linking across all content types:
- `/services` → `/technologies` → `/industries` → `/case-studies` → `/blog`

This ensures every content type is reachable from any page within a few clicks.

---

## Rules

1. **At most 3–5 related items per block** — don't overwhelm users
2. **Links must be genuinely related** — don't link technology X to service Y if there's no real connection
3. **Every page must have a path to /contact** — whether via navigation CTA or inline CTA
4. **Anchor text must be descriptive** — "Mobile App Development Services" not "click here"
5. **Related blocks appear at bottom of page** — after primary content, before final CTA

---

*Last updated: 2026-10-04*
