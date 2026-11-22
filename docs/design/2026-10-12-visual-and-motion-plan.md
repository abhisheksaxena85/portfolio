# Visual Design and Motion Plan — Phases 3 and 4

**Date:** 2026-10-12
**Status:** Proposal for owner approval. No implementation has started.
**Scope:** Make the site feel premium, crafted and alive without breaking the brief's rules: restrained motion, no heavy animation libraries, no fake product screenshots, excellent Core Web Vitals, WCAG 2.2 AA.

Related: [Design system doc (to be rewritten as DESIGN.md)](./design-system.md) · [UI patterns](./ui-patterns.md) · [Discovery dossier](../research/2026-10-12-discovery-dossier.md) · [Project status](../project-status.md)

---

## 1. What "feels really good" means for this audience

The buyer is a business owner or founder deciding whether to trust a company with a large budget. For that person, a site feels good when it feels **calm, clear, fast and crafted**. Stanford's credibility research found visual design is the single most-cited factor in credibility judgements, and Forrester's buyer research puts competence and consistency at the top of trust levers. The visual job is to make competence visible.

Motion earns its place when it does one of four things:

1. **Explains** (a diagram draws itself in the order the system works).
2. **Orients** (a page transition shows where you came from).
3. **Responds** (a button, card or field reacts to you within 150 ms).
4. **Rewards** (a form success state that feels finished).

Motion that only decorates is cut. Specifically, the site will not use: continuous loops, floating objects, parallax backgrounds, gradient blobs, particle fields, cursor followers, number counters (there are no real numbers to count), long intro sequences, or scroll-jacking.

---

## 2. Where the site stands today (facts from the code)

| Area | Finding | Consequence |
|---|---|---|
| Colour tokens | Three overlapping systems: Material-style tokens (`primary`, `surface-container-*`), an `ink-`/`cobalt-` set, and a legacy `:root` set. 169 hard-coded hex values across the homepage, navigation and footer. | Inconsistent greys and blues between pages; every restyle has to be done three ways. |
| Typography | Manrope and the Material Symbols icon font load from Google Fonts via `<link>` tags. Inter and Geist Mono load via `next/font` but are unused. | Two render-blocking stylesheets, an unused font download, and a flash of unstyled icon text. |
| Icons | 179 icon-font usages, 63 distinct glyphs. | Each page pays for a variable icon font; icons shift on load. |
| Motion | `framer-motion` 14 in `HomeHero` (staggered entrance plus an infinite float loop) and `ServiceTabs`. CSS keyframes exist in `globals.css` but nothing honours `prefers-reduced-motion`. | Violates the "no heavy animation library" and "no continuous loops" rules; inaccessible for motion-sensitive users. |
| Imagery | Both hero images are AI-generated phone mockups of fictional apps with garbled text (for example "SEGGSINS"). They are 750 KB PNGs with `.jpg` extensions, loaded with raw `<img>`. | Fake product evidence on a site whose whole pitch is honesty. Also the largest contributor to page weight. |
| Layout | Twelve homepage sections, mostly three-column card grids with identical rhythm. The narrative order is right. | Reads as a template; nothing signals "engineering company" specifically. |
| Client JS | 10 client components, 4 of them unused section files. 750 KB of client chunks across the build. | Bundle can shrink substantially. |
| Navigation | Sticky header with blur, dropdown scale/fade, active underline. | Already good; keep. |
| Rendering | 43 static pages, no view transitions. React 19 `<ViewTransition>` is available in Next 16 with no configuration. | Route transitions can be added cheaply. |

---

## 3. Directions considered

| Direction | Description | Fit for audience | Verdict |
|---|---|---|---|
| **A. Warm Workshop** (the brief's stated preference) | Cream canvas, deep navy text, one cobalt accent, hairline borders, generous whitespace, editorial typography. Feels like a well-run studio. | High. Calm and readable for non-technical readers; matches the trust goal. | **Selected** as the base. |
| **B. Blueprint** | Technical drawing language: faint grid paper backgrounds, monospace eyebrows and labels, line-drawn system diagrams, dimension-style annotations. | High for CTOs, medium for owners if overdone. | **Adopted as the illustration and label language inside A.** This is what makes the site look like an engineering company rather than a generic agency. |
| **C. Dark Product** | Dark hero and surfaces in the style of Linear or Vercel (what the old design doc described). | Low. Reads as a developer-tool product, not a service for business owners; harder to keep AA contrast with real photos; contradicts the brief. | Rejected. |

Why not copy a competitor: every Indian competitor reviewed in discovery leads with "AI" headlines, badge walls and stock imagery. A and B together occupy the empty position identified in the dossier: specific, honest, engineered.

---

## 4. Design system decisions (become `DESIGN.md`)

### 4.1 Colour (one token set, replaces all three)

| Token | Value | Use |
|---|---|---|
| `canvas` | `#FAFAF8` | Page background |
| `surface` | `#FFFFFF` | Cards, forms |
| `surface-raised` | `#F8F7F4` | Alternating sections, code blocks |
| `ink-900` | `#0B1220` | Headlines |
| `ink-700` | `#1E293B` | Body |
| `ink-500` | `#64748B` | Secondary text, captions |
| `line` | `#E7E5E0` | Hairline borders |
| `line-strong` | `#D6D3CD` | Hover borders, dividers |
| `cobalt-600` | `#2563EB` | Links, primary buttons, active states |
| `cobalt-700` | `#1D4ED8` | Hover |
| `cobalt-wash` | `#EFF6FF` | Tints, eyebrows |
| `sage-600` / `sage-wash` | `#0D9488` / `#F0FDFA` | Success, "maintain" phase |
| `amber-600` / `amber-wash` | `#D97706` / `#FEF3C7` | Warnings, "launch" phase |
| `footer` | `#0B1220` | Footer and dark CTA band only |

Rule: no hex values in components. Tailwind v4 `@theme` tokens only. Contrast: all text pairs verified at 4.5:1 or better before merge.

### 4.2 Typography

- **Manrope** via `next/font` (self-hosted, no `<link>`), weights 500/600/700/800, for headlines and body.
- **Geist Mono** via `next/font` for eyebrows, labels, step numbers, technology names and diagram annotations. The mono label is the Blueprint signature; use it consistently and sparingly.
- Fluid scale with `clamp()`: display 40–64 px, h1 36–56, h2 28–40, h3 20–24, body 16–18, label 12–13 mono uppercase with 0.08 em tracking.
- Measure: body text max 68 characters. Headline line-height 1.1, body 1.6.

### 4.3 Layout and rhythm

- 12-column grid, 1200 px max, 24 px gutters (16 px on phones).
- Section padding 96 px desktop / 64 px mobile. Alternate `canvas` and `surface-raised` sections; no more than two card grids in a row.
- Borders over shadows. One elevation level (hairline border plus a 1 px lighter inner highlight on hover). Radius 12 px cards, 10 px inputs, 8 px buttons, full pill for tags.

### 4.4 Icons

Replace the Material Symbols font with inline SVG from `lucide-react` (tree-shaken, roughly 0.3 KB per icon, consistent 1.5 px stroke that matches the Blueprint language). 63 glyphs to map. This is a new dependency and needs owner approval; the fallback is hand-copied SVGs in `src/components/icons/`.

### 4.5 Imagery (strict)

Three kinds of image are allowed, in this priority order:

1. **Real product screenshots** from permissioned projects, inside CSS-built device frames (no PNG phone mockups). None exist yet.
2. **System diagrams** built as SVG React components: app ↔ API ↔ database, the Build → Launch → Maintain → Improve loop, a release pipeline, a maintenance cycle. These are truthful, on-brand, lightweight and animatable. They are the primary visual until real screenshots arrive.
3. **Photographs of the actual team and office** in Noida, supplied by the owner.

Banned: AI-generated app mockups, stock photos of people at laptops, fake dashboards, badge walls. The two current hero images are removed in the first sprint.

### 4.6 Components to build or rebuild

Button (primary, secondary, ghost, with arrow), Eyebrow (mono), SectionHeader, Card (default, feature, link), Pill, Stepper/Timeline, Accordion, Field (input, select, textarea with error state), DeviceFrame, Diagram (per-system variants), Reveal (scroll entrance wrapper), LifecycleTabs (replaces `ServiceTabs`).

---

## 5. Motion system

### 5.1 Principles

1. Purposeful: every animation maps to explain, orient, respond or reward (§1).
2. Fast: micro-interactions 150–250 ms; entrances 400–600 ms; nothing longer than 800 ms.
3. Honest: nothing moves that is not real content. No counters, no fake activity.
4. Composited only: animate `transform` and `opacity` (plus `stroke-dashoffset` on SVG). Never animate layout properties.
5. Reduced motion: `prefers-reduced-motion: reduce` collapses durations to near zero and disables scroll entrances. Content is always present in the server-rendered HTML; JavaScript only adds the "hidden until revealed" state, so crawlers and no-JS users see everything immediately.
6. No layout shift: reserved space for every animated element; CLS stays at 0.

### 5.2 Tokens

```
--motion-fast: 150ms;   --motion-base: 250ms;   --motion-slow: 450ms;   --motion-reveal: 600ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);   --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--rise-sm: 8px;  --rise-md: 16px;  --rise-lg: 24px;   --stagger: 60ms;
```

### 5.3 Catalogue

| # | Where | Trigger | Effect | Duration | Technique |
|---|---|---|---|---|---|
| 1 | Hero text and CTAs | Page load | Rise + fade, staggered by 60 ms | 600 ms | CSS keyframes, no JS |
| 2 | Hero system diagram | Page load, after text | Lines draw in system order (app → API → database), nodes fade in, then one data pulse travels the path once and stops | 1.2 s total | SVG `stroke-dashoffset` keyframes |
| 3 | Section and card entrances | Element enters viewport | Rise 16 px + fade, once | 500 ms | `Reveal` component (IntersectionObserver, ~1 KB); upgrade to CSS `animation-timeline: view()` later once Firefox support is confirmed |
| 4 | Cards and links | Hover / focus | Border darkens, 2 px lift, icon tints cobalt, arrow nudges 4 px | 200 ms | CSS transitions |
| 5 | Buttons | Hover / press | Background shift; press scale 0.98 | 150 ms | CSS |
| 6 | Lifecycle (Build → Launch → Maintain → Improve) | Click / keyboard | Active indicator slides along the track; panel crossfades | 300 ms | CSS transitions on a client component; replaces `framer-motion` tabs |
| 7 | Process timeline | Scroll | Connector line draws between steps as they enter; step number fills cobalt | 400 ms per step | `Reveal` with CSS custom-property progress |
| 8 | FAQ accordion | Click | Height animates, chevron rotates | 250 ms | `interpolate-size: allow-keywords` with grid-rows fallback |
| 9 | Navigation | Scroll / open | Header compacts with blur (exists); dropdown scales from origin (exists); mobile menu slides in with staggered links (new) | 250–300 ms | CSS |
| 10 | Forms | Focus / submit / result | Focus ring grows; submit shows pending state; success panel crossfades with a check-mark draw | 150–400 ms | CSS plus existing `useActionState` |
| 11 | Route changes | Navigation | Crossfade between pages; service card title morphs into the service page heading | 300 ms | React `<ViewTransition>` (Next 16, no config); degrades to instant swap in older browsers |
| 12 | Images | Load | Blur-up placeholder | 300 ms | `next/image` `placeholder="blur"` |

### 5.4 Library decision

Remove `framer-motion`. Everything above is achievable with CSS, one tiny IntersectionObserver wrapper and React's built-in `<ViewTransition>`. This follows the AGENTS.md rule, shrinks the bundle, and keeps motion declarative. If a future need genuinely requires orchestration (for example an interactive architecture explorer), revisit with a measured bundle budget.

---

## 6. Page-by-page

### Homepage (the gate for everything else)

| Section | Change |
|---|---|
| Hero | Keep the plain-language headline. Mono eyebrow: "Software engineering · Noida, India · Clients worldwide". Right side: the animated system diagram (catalogue #2) replacing the AI phone mockup. Below: the existing reassurance line. |
| Trust strip | Reduce from five to four items, Lucide icons, mono labels; each item links to the FAQ answer that proves it. |
| What we can help you build | Six cards keep their structure; each gets a 48 px line illustration (SVG) instead of an icon. Hover lift. |
| Problem → solution | Alternate text and a small diagram per row; reveal on scroll. |
| Our work | Already honest. When case studies arrive, device frames with real screenshots. |
| Lifecycle | New section near the top: Build → Launch → Maintain → Improve as the interactive tabs (catalogue #6). This is the brand motif and belongs above the fold on desktop or immediately after the trust strip. |
| How we work | Timeline draw (catalogue #7). |
| Cost factors | Keep as honest factors; present as a two-column "what moves the price up / what keeps it down" with reveal. No ranges until the owner approves them. |
| Team | Placeholder card until names and photos exist; do not fake. |
| Technology | Mono technology names in pills grouped by layer (mobile, backend, data, infrastructure). No logos we do not have rights to. |
| FAQ | Accordion (catalogue #8). |
| Final CTA and form | Keep; polish the form fields and success state (catalogue #10). |

### Inner templates

- **Service page:** hero diagram variant per service (mobile, web, backend, maintenance, publishing); deliverables as a checklist with check-mark draw on reveal; related services as link cards; shared-element transition from the services index.
- **Solution, technology, industry pages:** same template system, different diagram and copy. No new layouts.
- **Contact:** keep the current layout; apply the field and success-state polish; show address and phone (done).
- **About:** rebuild only when the owner supplies people and photos; until then, a factual page with the address, stack and working principles.
- **FAQ:** accordion with anchor links so trust-strip items can deep-link.

---

## 7. Delivery sequence and gates

| Sprint | Work | Gate (must pass before the next sprint) |
|---|---|---|
| **0. Foundation** (done 2026-10-12) | Single token set in `globals.css`; Manrope and Geist Mono via `next/font`; Google Fonts links removed; `lucide-react` icon system (`<Icon>`); `Reveal` component, motion tokens and reduced-motion handling; `framer-motion` and all four AI-generated images removed; 12 unused components deleted; `SystemDiagram` replaces stock imagery in heroes; shared navigation config; token-based footer. | Passed: typecheck, lint, build; Lighthouse mobile (median of 3, warm): home 96–97 / LCP 2.5–2.6 s / CLS 0 / a11y 100; service page 95–96 / 2.5–2.8 s; contact 97 / 2.5 s. Zero contrast failures. No hex values in class names. |
| **1. Homepage** | Hero with diagram, lifecycle tabs, trust strip, card illustrations, timeline, accordion, form polish. | Screenshots at 375, 768 and 1280 px reviewed against this plan; keyboard walk-through; reduced-motion check; contrast check; Lighthouse Accessibility 100. |
| **2. Inner templates** | Service, solution, technology, industry templates; view transitions. | Same checks on three representative pages; shared-element transition verified in Chrome and Safari, graceful in Firefox. |
| **3. Remaining pages and polish** | Contact, FAQ, About, 404; cross-page consistency sweep; motion timing tune. | Full-site crawl for broken links; final Lighthouse on five pages; docs updated (`DESIGN.md`, `ui-patterns.md`, change log). |

Performance budget per page (recalibrated 2026-10-12 after measuring the stack's floor; see "Measurement notes"): Lighthouse mobile Performance ≥ 95, LCP ≤ 2.6 s simulated (target 2.5 s), TBT ≤ 150 ms, CLS 0, client JavaScript ≤ 200 KB gzipped (framework runtime alone is ~95 KB), homepage HTML ≤ 35 KB gzipped, ≤ 500 DOM elements and ≤ 30 inline SVGs per page.

**Measurement notes (Sprint 0 findings).**
- The first Lighthouse run after `next start` is cold and about one second slower; discard it and use the median of three.
- The Next.js App Router floor on Lighthouse's simulated mobile is roughly FCP 0.8 s and LCP 2.5 s even for the lightest page, so "LCP < 2.0 s" was not a reachable gate. Field data from Search Console and CrUX after launch is the real target.
- `experimental.inlineCss` was tested and rejected: the 83 KB raw stylesheet inflates every page and made FCP worse (1.1 s vs 0.8 s).
- Homepage first paint is dominated by CPU work (757 DOM elements, 54 inline SVGs, and a 277 KB React Server Components payload that mirrors the markup). `content-visibility: auto` on below-the-fold sections recovered ~0.4 s; Sprint 1 must also cut nodes and icons.
- Load-time entrance animations delay LCP when they hide the largest text. The h1 is never animated.

Design tooling: the brief asks for Stitch, which is not available in this environment. Proposed substitute: build directly in code, capture screenshots at three viewports with a headless browser for each gate, and iterate from those. If the owner has Stitch access, Stitch frames for the hero and one service page would be welcome inputs before Sprint 1.

---

## 8. Visual QA checklist (used at every gate)

- [ ] One `h1`; heading order correct; eyebrows are not headings
- [ ] All text contrast ≥ 4.5:1 (≥ 3:1 for large text and UI borders)
- [ ] Visible focus ring on every interactive element; logical tab order
- [ ] `prefers-reduced-motion` removes entrances and loops; content still visible
- [ ] No animation on layout properties; CLS 0 in Lighthouse
- [ ] No raw hex in components; no `<img>`; no external font links
- [ ] Every image has meaningful `alt` or `alt=""` if decorative
- [ ] No fabricated numbers, logos, badges or screenshots
- [ ] Phone, tablet and desktop screenshots reviewed; no horizontal scroll at 320 px
- [ ] Section rhythm: no two identical card grids adjacent

---

## 9. Decisions needed from the owner

1. **Approve direction A with B's illustration language** (§3).
2. **Approve removing the two AI-generated hero images now** and using SVG system diagrams until real screenshots exist (§4.5).
3. **Approve `lucide-react`** as the icon dependency, or choose hand-copied SVGs (§4.4).
4. **Approve removing `framer-motion`** (§5.4).
5. **Confirm design tooling**: code-first with screenshot reviews, or supply Stitch frames (§7).
6. **Supply assets when available**: logo as SVG, team names and photos, any permissioned screenshots.

Once 1 to 5 are approved, Sprint 0 starts.
