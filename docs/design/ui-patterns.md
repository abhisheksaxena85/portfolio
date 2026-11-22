# UI Patterns — InvoSpec Website

> **Update 2026-10-18.** Package pattern: a `PackageCard` shows kicker, name, `<Price>`, audience or summary, and (full variant) Included / Not included unless written into the plan / You provide / notes, ending with "Ask about <package>" to the pre-filled enquiry. Prices always render both currencies in the HTML; never hide one with JavaScript-only logic or compute one from the other. The currency switch sits above any list of prices.

> Reusable UI patterns with purpose, usage rules and accessibility requirements.
> Visual specification → [`design-system.md`](./design-system.md)

---

## Hero Section

**Component:** `src/components/sections/Hero.tsx`

**Purpose:** Create immediate clarity about what the company does. Drive primary CTA.

**When to use:** Homepage only. Each page has its own page-specific hero (simpler structure).

**Required elements:**
- Eyebrow badge (e.g., "Software solutions for modern business")
- H1 — clear, specific value proposition
- 1–2 sentence supporting description
- Primary CTA button → `/contact`
- Secondary CTA button → `/case-studies` or `/services`

**Must NOT include:**
- Generic phrases ("digital transformation", "innovative solutions")
- Animated video background
- Fake dashboard screenshots
- Fabricated metrics

**Responsive:** Two-column (text + visual) on desktop → single column on mobile. Visual de-emphasised on mobile.

**Accessibility:**
- H1 must be the first heading on the page
- CTA buttons must have descriptive text (not just "Click here")
- Visual decorations must have `aria-hidden="true"`

---

## Section Header

**Component:** `src/components/ui/SectionHeader.tsx`

**Purpose:** Consistent section introduction across all pages.

**Required props:**
```tsx
kicker: string        // Uppercase label above heading
heading: string       // H2 or H3 depending on context
description?: string  // Optional explanatory paragraph
viewAllLink?: string  // Optional "View all →" right side link
viewAllText?: string
```

**Pattern:**
```
KICKER TEXT (accent, uppercase, small)
H2 / Section Title
Optional description paragraph (muted, max-width 520px)
```

**Responsive:** Description and link stack vertically on mobile.

---

## Service Card

**Component:** `src/components/cards/ServiceCard.tsx`

**Purpose:** Display a single service with icon, title, and short description.

**Required props:**
```tsx
icon: ReactNode        // SVG icon
title: string
description: string
href: string           // Link to /services/[slug]
```

**Pattern:**
```
Icon box (46×46, surface-2 background, accent colour)
H3 — service name (margin-top: 22px)
Description paragraph (muted, 0.92rem)
```

**Hover:** `translateY(-5px)` + accent border + shadow.

**Accessibility:** Card must be keyboard-focusable. Use `<article>` wrapper. Icon is decorative (`aria-hidden`).

**When NOT to use:** Do not use service cards as navigation without a clear link destination.

---

## Process Timeline

**Component:** `src/components/sections/ProcessTimeline.tsx`

**Purpose:** Explain the company's delivery process in sequential steps.

**Pattern:**
```
Step label (e.g., "01 / DISCOVER") — accent, small caps
H3 — step title
Paragraph description
Arrow connector → (between steps, hidden on mobile)
```

**Steps for InvoSpec:**
1. Discover — Understand the problem
2. Plan — Shape the solution
3. Build — Engineer the product
4. Launch — Handover & improve

**Responsive:** 4 columns → 2 columns → 1 column. Arrows hidden on non-desktop.

**Accessibility:** Use `<ol>` or `<article>` with `aria-label` on each step.

---

## Technology Badge/Grid

**Component:** `src/components/sections/TechGrid.tsx`

**Purpose:** Display a group of technologies as visual badges.

**Pattern:**
```
Badge: border, surface background, muted text, 9px 12px padding, 10px border-radius
```

**When to use:**
- Capabilities section on homepage
- Service page "Technologies used" section
- Technology page header

**Data source:** `src/content/technologies/index.ts`

---

## Case Study Card

**Component:** `src/components/cards/CaseStudyCard.tsx`

**Purpose:** Preview a case study with key metadata.

**Required props:**
```tsx
title: string
industry: string
technologies: string[]
summary: string          // 1–2 sentences
slug: string
image?: string           // Optional featured image
```

**Pattern:**
```
Optional featured image (next/image, aspect-video)
Industry badge
H3 — project title
Technology pills
Short summary
Link → /case-studies/[slug]
```

**CRITICAL:** Never display fake metrics or client names. Only real data.

---

## FAQ Component

**Component:** `src/components/sections/FAQ.tsx`

**Purpose:** Answer common questions. Generate `FAQPage` JSON-LD. Target featured snippets.

**Pattern:** Accordion — question is button, answer expands below.

**Required props:**
```tsx
items: Array<{ question: string; answer: string }>
schemaEnabled?: boolean  // Whether to render JSON-LD (default true)
```

**Accessibility:**
- Use `<details>/<summary>` or ARIA `button` + `[role="region"]`
- Must be keyboard navigable
- Expanded state must be announced to screen readers

**When NOT to use:** Do not use FAQ for content that belongs in dedicated page sections.

---

## CTA Section

**Component:** `src/components/sections/CTASection.tsx`

**Purpose:** Drive conversion at end of page.

**Required props:**
```tsx
heading: string
description?: string
primaryCTA: { text: string; href: string }
secondaryCTA?: { text: string; href: string }
```

**Pattern:**
```
H2 — compelling heading
Short description (optional)
Primary button (accent gradient)
Secondary button (outline/ghost)
```

**Do NOT use generic headings** like "Ready to get started?" — be specific to context.

---

## Breadcrumb

**Component:** `src/components/ui/Breadcrumb.tsx`

**Purpose:** Navigation hierarchy + `BreadcrumbList` JSON-LD.

**When to use:**
- All service pages
- All technology pages
- All industry pages
- All case study pages
- All blog articles
- Any page more than 1 level deep

**Pattern:**
```
Home / Services / Mobile App Development
```

**Accessibility:** Use `<nav aria-label="Breadcrumb">` with `<ol>`.

---

## Related Content Blocks

**Components:**
- `src/components/sections/RelatedServices.tsx`
- `src/components/sections/RelatedTechnologies.tsx`
- `src/components/sections/RelatedCaseStudies.tsx`
- `src/components/sections/RelatedArticles.tsx`

**Purpose:** Internal linking — guide users to related content. Improve SEO.

**Pattern:**
```
Section heading: "Related Services" / "Related Technologies" etc.
2–4 cards in a row
Each card links to the relevant page
```

**Data source:** Each content item has `relatedServices`, `relatedTechnologies`, etc. arrays in its data file.

**When to use:**
- Bottom of every service page
- Bottom of every technology page
- Bottom of every case study
- Bottom of every blog article

---

## Contact Form

**Component:** `src/components/forms/ContactForm.tsx` (Client Component)

**Purpose:** Primary lead generation mechanism.

**Fields:**
```
Name (required)
Company (optional)
Email (required)
Phone (optional)
Project type (select, required)
Delivery timeline (select, optional)
Message (textarea, optional but encouraged)
```

**Accessibility:**
- All inputs associated with `<label>`
- Error states announced via `aria-live`
- Submit button has descriptive text
- Honeypot field hidden from screen readers and non-humans

**Validation:**
- Client-side: visual feedback, prevents obvious errors
- Server-side (Zod): all validation authoritative on server

---

## Navigation

**Component:** `src/components/layout/Navigation.tsx`

**Desktop pattern:**
```
[Logo]  Services  Solutions  Technologies  Industries  Case Studies  Resources  About  [Start a Project CTA]
```

**Mobile pattern:**
```
[Logo]  [Hamburger]
  ↓ (open)
Full-width dropdown menu
```

**Accessibility:**
- `<nav aria-label="Primary navigation">`
- Mobile button: `aria-expanded`, `aria-controls`
- Keyboard: Tab through links, Escape closes mobile menu

---

## Footer

**Component:** `src/components/layout/Footer.tsx`

**Pattern:**
```
Company description (1–2 sentences)
----
Services | Solutions | Technologies | Resources | Company
----
Contact info | Social links
----
© 2025 InvoSpec Softwares | Privacy Policy | Terms of Service
```

**Data source:** `src/config/navigation.ts`, `src/config/site.ts`

**Accessibility:** `<footer>` element, heading hierarchy within footer columns.

---

## Article Preview Card

**Component:** `src/components/cards/ArticleCard.tsx`

**Purpose:** Preview a blog article in a listing page.

**Required props:**
```tsx
title: string
description: string
publishedAt: string
readingTime: number
category: string
slug: string
image?: string
tags?: string[]
```

---

*Last updated: 2026-10-04*
