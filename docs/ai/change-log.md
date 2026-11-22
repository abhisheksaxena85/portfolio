# Change Log — InvoSpec Website

> **AI-readable record of significant project changes.**
> Do NOT record every CSS tweak. Record architectural decisions, content model changes, SEO decisions, and security changes.

---

## Format

```
## YYYY-MM-DD — [Title]
- **Change:** What changed
- **Reason:** Why it changed
- **Affected areas:** Which files / systems
- **Migration required:** Yes / No (what to do if yes)
- **Documentation updated:** Which docs were changed
```

---

## 2026-10-04 — Project Context System Created

- **Change:** Created full AI documentation hierarchy under `/docs/` and root `AGENTS.md`
- **Reason:** Establish durable AI context so future sessions can work consistently without re-establishing project rules
- **Affected areas:** `/docs/` (new), `AGENTS.md` (new), `src/config/site.ts` (new)
- **Migration required:** No
- **Documentation updated:** All `/docs/` files (initial creation)

## 2026-10-04 — Next.js Project Bootstrapped

- **Change:** Created Next.js 16 project with App Router, TypeScript, Tailwind CSS v4, ESLint using `create-next-app`
- **Reason:** Migrating from single `index.html` static site to production-grade Next.js application
- **Affected areas:** Entire project root, `src/app/`, `package.json`, `tsconfig.json`, `next.config.ts`
- **Migration required:** No — original `index.html` preserved as `index.html.bak` in `/tmp/invospec-bak/`
- **Documentation updated:** `AGENTS.md`, `docs/architecture/overview.md`

## 2026-10-04 — Central Site Configuration Created

- **Change:** Created `src/config/site.ts` as single source of truth for all company information
- **Reason:** Prevent company info from being scattered and hardcoded across many files
- **Affected areas:** `src/config/site.ts`
- **Migration required:** No
- **Documentation updated:** `AGENTS.md` (Sources of Truth table), `docs/ai/project-context.md`

## 2026-10-12 — Phase 1 Discovery Completed

- **Change:** Added `docs/research/` (discovery dossier, repository audit), `docs/project-status.md`, `docs/decisions/ADR-001`. No source files changed.
- **Reason:** Owner brief requires research-backed, phase-gated delivery before further implementation.
- **Affected areas:** `docs/` only
- **Migration required:** No
- **Documentation updated:** `AGENTS.md` (links to project status and decisions)

## 2026-10-12 — Fabrication Quarantine and Lead-Pipeline Hotfix (ADR-001 approved)

- **Change:** Removed invented case studies and metrics from the homepage and `/case-studies` (page now an honest, `noindex` placeholder, dropped from the sitemap); deleted unused `SelectedWork.tsx` and `AboutCompany.tsx` which held fabricated content. All three lead forms now post to one server action with Zod validation, honeypot, per-IP rate limit and Resend email delivery configured by environment variables; the homepage form and `ConsultationForm` previously sent nothing. Added `.env.example`, `yarn typecheck`, company address (Sector 63, Noida) to `site.ts`, footer, contact page and Organization JSON-LD; verification token moved to env.
- **Reason:** Owner approved ADR-001 and confirmed facts on 2026-10-12. Fabricated proof was live; enquiries were being lost.
- **Affected areas:** `src/app/page.tsx`, `src/app/case-studies/page.tsx`, `src/app/actions/contact.ts`, `src/components/forms/*`, `src/lib/forms/*` (new), `src/config/site.ts`, `src/app/layout.tsx`, `src/components/layout/Footer.tsx`, `src/app/contact/page.tsx`, `src/app/sitemap.ts`, `package.json` (zod)
- **Migration required:** Yes — set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (verified sender domain in Resend) and optionally `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in the hosting environment. Without them, production forms show a "email us directly" error instead of a false success.
- **Documentation updated:** `docs/development/security.md` (new), `docs/ai/project-context.md`, `docs/project-status.md`, `docs/decisions/ADR-001`

## 2026-10-12 — Design Foundation (Phase 4, Sprint 0)

- **Change:** One token set in `globals.css` (`@theme`) replaces three overlapping systems and 169 hard-coded hex values; Manrope and Geist Mono self-hosted via `next/font` (Google Fonts `<link>` tags removed); Material Symbols icon font replaced by `<Icon>` (lucide, inline SVG, 175 call sites migrated); `framer-motion` removed; `Reveal` scroll-entrance component, motion tokens and reduced-motion rules added; `SystemDiagram` SVG replaces all four AI-generated images (also removed from `public/`); 12 unused section/UI components deleted; navigation and footer links centralised in `src/config/navigation.ts`; footer rewritten as a server component without the cursor-glow effect; per-page `<style>` blocks moved into `globals.css`; `content-visibility: auto` on below-the-fold homepage sections; accent and grey tokens re-tuned to pass WCAG AA on every surface; `DESIGN.md` created and `docs/design/design-system.md` retired.
- **Reason:** Visual and motion plan approved by the owner ("continue"); the brief bans fake product imagery, icon fonts and animation libraries.
- **Affected areas:** `src/app/globals.css`, `src/app/layout.tsx`, `src/components/**`, `src/config/navigation.ts`, `src/app/**/page.tsx` (class and icon migration), `src/content/*.ts` and `src/types/content.ts` (`heroImage` removed), `public/assets`, `public/images`, `package.json` (`+lucide-react`, `-framer-motion`), `DESIGN.md`, `AGENTS.md`
- **Migration required:** No.
- **Documentation updated:** `DESIGN.md`, `docs/design/design-system.md`, `docs/design/2026-10-12-visual-and-motion-plan.md` (budget recalibrated with measurements), `docs/project-status.md`

## 2026-10-12 — Solution Template Rebuilt; App Store Publishing Page Fact-Checked

- **Change:** `src/app/solutions/[slug]/page.tsx` rebuilt on the design system (grid-paper hero with diagram, mono eyebrows, `Reveal` entrances, `content-visibility` on below-the-fold sections, native `<details>` FAQ, BreadcrumbList and FAQPage JSON-LD). `Solution` type gains optional `eyebrow`, `diagram`, `facts`, `steps`, `youNeed`, `sources`. New `ReleasePipelineDiagram` (build → sign → test track → review → live, one lane per store). The app-store-publishing entry rewritten with facts checked against Google and Apple documentation on 2026-10-12 (US$25 Google Play fee; 12 testers for 14 days on personal accounts; D-U-N-S for organisation accounts; US$99/year Apple fee and organisation requirements), each with a source link; the unverified "24–48 hours" Apple review claim removed.
- **Reason:** Owner asked for the page to be updated properly; the old page was a generic template with an unsourced review-time claim.
- **Affected areas:** `src/app/solutions/[slug]/page.tsx`, `src/types/content.ts`, `src/content/solutions.ts`, `src/components/diagrams/ReleasePipelineDiagram.tsx` (new)
- **Migration required:** No. The other three solution pages render unchanged content on the new template.
- **Documentation updated:** `docs/content/content-model.md` (new optional fields and fact policy), `docs/project-status.md` (duplicate publishing routes and diagram phone legibility flagged)

## 2026-10-13 — Outcome-First Site and Project Planner Plan

- **Change:** Added `docs/architecture/2026-10-13-outcome-first-plan.md` (goal map, sitemap v2 with redirects, planner specification, hero story, plain-language enforcement, delivery sessions, usability hypotheses). Status updated.
- **Reason:** Owner found the diagrams and language too technical for non-technical buyers and asked for a stronger direction and a proper plan.
- **Affected areas:** `docs/` only
- **Migration required:** No
- **Documentation updated:** `docs/project-status.md`

## 2026-10-13 — Outcome-First Session A: Goal Pages, Navigation, Plain Language

- **Change:** `/solutions` now holds six goal pages written in plain language (bookings and orders; deliveries and field teams; replace spreadsheets; launch a product idea; fix or take over an app; app-store publishing). `Solution` type gains `navLabel`, `icon`, `parts`, `priceDrivers`, `afterContact`, `technicalDetails`. Goal template renders the six questions in order with `<PlainTech>` two-line labels and a collapsed `<TechnicalDetails>` block. Header and mobile menu lead with "I want to…"; Services becomes a plain link; the App Store Publishing header button is removed. `/solutions` index rebuilt as the goal chooser. Permanent redirects for `/solutions/startups`, `/solutions/small-business`, `/solutions/business-automation` and `/services/app-store-publishing`; the duplicate publishing service entry removed. Homepage copy rewritten (trust strip, situations, process, price drivers, people, FAQ, final CTA); capability cards replaced by the six goals; the technology section now shows only the confirmed stack. `src/config/vocabulary.ts` house vocabulary; `scripts/readability.mjs` gate wired into `yarn lint`.
- **Reason:** Owner approved the outcome-first plan ("move ahead"); the site was organised and worded for engineers.
- **Affected areas:** `src/content/solutions.ts`, `src/types/content.ts`, `src/app/solutions/**`, `src/app/page.tsx`, `src/config/navigation.ts`, `src/config/vocabulary.ts`, `src/components/layout/Navigation.tsx`, `src/components/ui/PlainTech.tsx`, `src/components/ui/TechnicalDetails.tsx`, `src/content/services.ts`, `src/content/technologies.ts`, `next.config.ts`, `scripts/readability.mjs`, `package.json`
- **Migration required:** No. Old URLs redirect permanently.
- **Documentation updated:** `docs/content/content-model.md`, `DESIGN.md`, `docs/project-status.md`

## 2026-10-14 — Image Manifest and Generation Brief

- **Change:** Added `src/content/images.ts` (40 planned images with generation subject, shared style, file path, size, alt text, placement and a truthfulness guard) and `docs/design/image-brief.md` (style, sizes, review gate, web usage). Added `ImageAsset` and related types to `src/types/content.ts`. Added `scripts/image-prompts.mjs` (`yarn image:prompts`), which writes `docs/design/image-prompts.md` from the manifest, ordered P0 → P2, for use in any generation tool. `DESIGN.md` §Imagery now allows abstract blueprint illustration under the brief's rules. The prompts were then audited through four independent lenses (text and cliché traps, trademark and fabrication risk, series consistency and accents, page fit) with two adversarial refuters per finding: 89 raw findings, 36 confirmed and applied. Main effects: the shared avoid list now names the concrete things image models add to engineering drawings (dimension figures, title blocks, stamps, store badges, teardrop pins, branded device details); 18 subjects rewritten to be self-sufficient without a guard (blank cells instead of calendars, ticked squares instead of checklists, no "approval mark", no storefronts, no plus sign on the clinic); teal removed from two build-phase images; `usedOn` corrected where a slot did not exist or double-booked a page; `/technologies/dart` dropped; `blog-cover-base` became an `og` record; hero masters are never cropped to 1.91:1 (share images scale the master into the right 55%). Nothing is generated and no page imports the manifest yet.
- **Reason:** Owner noted the site uses no images and asked for generation metadata to improve engagement; approved the policy change on 2026-10-14. No image generation tool is available to the agent, so the prompt sheet is the hand-off.
- **Affected areas:** `src/content/images.ts`, `src/types/content.ts`, `scripts/image-prompts.mjs`, `package.json`, `DESIGN.md`, `docs/design/image-brief.md`, `docs/design/image-prompts.md`
- **Migration required:** No.
- **Documentation updated:** `DESIGN.md`, `docs/design/image-brief.md`, `docs/project-status.md`

## 2026-10-14 — SEO Plan Phase 1: Technical Foundation

- **Change:** Added `src/lib/seo/metadata.ts` (`buildMetadata`, `absoluteUrl`, `shareImage`) and moved every page to it. Title template is now `%s | InvoSpec`; brand suffix removed from all `seo.title` values. Root layout no longer sets a canonical. Added `src/app/opengraph-image.tsx`. Sitemap reads per-entry `updated` dates (new required field on content types) and drops `priority`/`changeFrequency`. Added `src/lib/schema/` and `JsonLd` (escapes `<`); Service, BreadcrumbList and FAQPage on service pages, BreadcrumbList (+ FAQPage) on industry and technology pages. Added `RelatedGoals` section and shared `GoalCard`; links derived in `src/lib/content/related.ts`. Added production-only GA4 loader and a `generate_lead` event on both forms. Added `yarn seo:check`.
- **Reason:** Rendered HTML showed `/services` canonicalised to the homepage, the brand doubled in every title, the homepage's Twitter title on every page, no share image, build-time sitemap dates, and GA never loaded.
- **Affected areas:** All `src/app/**/page.tsx` metadata, `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/content/*.ts`, `src/types/content.ts`, both forms, `src/config/site.ts`.
- **Migration required:** No URL changes.
- **Documentation updated:** `docs/seo/2026-10-14-seo-growth-plan.md`, `docs/seo/strategy.md`, `docs/project-status.md`, `.env.example`.

## 2026-10-14 — SEO Plan Phases 2–5: Truthful Copy, Measurement, Proof Route, Guides

- **Change:** Phase 2: unverified claims removed site-wide; `/services` rebuilt from `services.ts`; service template cards replaced (launch-from-checklist, price drivers, contractual ownership); `priceDrivers`, extra FAQs and `intentNote` added to services, `intentNote` to the four paired goal pages; industries `noindex` via `INDUSTRIES_INDEXABLE`; Dart merged into Flutter with a 301. Phase 3: Consent Mode + `ConsentBanner`, privacy policy analytics section, `docs/seo/measurement-runbook.md`. Phase 4: `/case-studies/[slug]` with Zod-validated MDX (`permission` required), `_TEMPLATE.mdx`, listing becomes indexable when a study is published. Phase 5: `@next/mdx`, `src/mdx-components.tsx`, blog loader, `/blog` and `/blog/[slug]`, `ArticleCard`, `RelatedArticles` on service and goal pages, `BlogPosting`/`Article` schema builders, sitemap and `seo:check` coverage, readability gate on MDX, nine guides in `src/content/blog/`.
- **Reason:** [SEO growth plan](../seo/2026-10-14-seo-growth-plan.md), owner instruction 2026-10-14 to complete all phases.
- **Affected areas:** `src/content/*`, `src/types/content.ts`, `src/app/services/**`, `src/app/solutions/[slug]`, `src/app/industries/**`, `src/app/blog/**`, `src/app/case-studies/**`, `src/app/privacy`, `src/app/contact`, `src/app/page.tsx`, `src/app/sitemap.ts`, `src/components/seo/*`, `src/components/cards/ArticleCard.tsx`, `src/components/sections/RelatedArticles.tsx`, `src/lib/content/*`, `src/lib/schema`, `src/lib/analytics.ts`, `src/config/{site,navigation}.ts`, `next.config.ts`, `package.json`, `scripts/*.mjs`.
- **Migration required:** `/technologies/dart` → 301 to `/technologies/flutter`. Content types gained a required `updated` field (set on all entries). New dependencies: `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`, `remark-gfm` (pipe tables in MDX; without it the sample report's table rendered as text).
- **Browser check (375 px, production build with a test GA ID):** `/services`, `/services/software-maintenance` (hero, price card, goal cards, guide cards), `/solutions/fix-or-take-over-an-existing-app` (intent note), `/blog`, an article (header, "How we handle this", FAQs) and the sample report: no horizontal overflow on any page, consent prompt readable and dismissible, sample badge and table render.
- **Documentation updated:** plan (status under each phase), `docs/seo/measurement-runbook.md` (new), `docs/content/content-model.md` (blog and case-study meta), `docs/seo/strategy.md`, `docs/architecture/routing.md`, `docs/seo/internal-linking.md`, `docs/project-status.md`.

## 2026-10-15 — First Images Wired: Goal Cards and Share Images

- **Change:** The seven P0 files the owner exported from Figma (`og-default` and the six goal heroes) were reviewed against the image brief §5 gate and all pass: no text, people, logos or UI; one accent each; subject inside the crop safe zone. Two notes recorded: `run-deliveries-and-field-teams` was drawn from the pre-audit prompt (teardrop pins, teal check) and can be regenerated later; the store shapes in `app-store-publishing` are generic bags, not store marks. Files moved to the manifest paths (`public/images/solutions/<id>.png`, `public/images/og/og-default.png`); the 2× OG export moved to `docs/design/exports/`. Masters are stored as PNG, not WebP: `next/og` (satori) cannot decode WebP, and `next/image` serves AVIF/WebP from a PNG per request anyway (5.6 KB for a card slot). `GoalCard` shows the goal's illustration (decorative `alt=""`, `sizes` for the 3-column grid) and the homepage goal grid now reuses `GoalCard` instead of duplicating its markup. New `src/lib/og/share-card.tsx` lays out share images (lockup and words in the clear left 45%, art in the right 55%); the root `opengraph-image.tsx` uses it with the `og-default` art, and a new `solutions/[slug]/opengraph-image.tsx` renders one per goal. `buildMetadata()` gained an `image` override because an explicit `openGraph.images` beats file-based metadata; goal pages pass their own route. Manifest: the seven records are `status: "generated"`, `goalImage()` and `hasFile()` helpers, and `make()` lets a seed set `status`.
- **Reason:** Owner supplied the P0 batch; plan step 6 (wire goal cards and share images).
- **Affected areas:** `public/images/**`, `docs/design/exports/`, `src/content/images.ts`, `src/components/cards/GoalCard.tsx`, `src/app/page.tsx`, `src/app/opengraph-image.tsx`, `src/app/solutions/[slug]/opengraph-image.tsx`, `src/app/solutions/[slug]/page.tsx`, `src/lib/og/share-card.tsx`, `src/lib/seo/metadata.ts`, `scripts/image-prompts.mjs`, `docs/design/image-brief.md`, `docs/design/image-prompts.md`
- **Migration required:** No. Image masters are PNG from now on (brief §3).
- **Documentation updated:** `docs/design/image-brief.md`, `docs/project-status.md`

## 2026-10-15 — Timed Contact Popup

- **Change:** New `ContactPopup` client component mounted once in the root layout. Eight seconds after the first page of a visit it opens a native `<dialog>` (browser-provided focus trap, Escape and inert background) holding the existing `ConsultationForm` with `source="contact-popup"`, an intro panel with reassurance points and the email/phone from `siteConfig`, and a close button. Backdrop click, Escape and the close button dismiss it. Frequency rules: once per browser session (`sessionStorage` key `invospec:contact-popup`), never on `/contact`, and not for 30 days after a successful enquiry (`localStorage` key `invospec:lead-sent`, written through a new optional `onSuccess` prop on `ConsultationForm`). Phone layout is a bottom sheet; from `md` up a centred two-column card. Entrance animation only under `prefers-reduced-motion: no-preference`; page scroll is locked while open. Fires a `contact_popup_open` GA4 event when analytics is on; leads still report through `TrackLead`.
- **Reason:** Owner request: make contacting the company easier from any page without visiting the contact page.
- **Affected areas:** `src/components/forms/ContactPopup.tsx` (new), `src/components/forms/ConsultationForm.tsx` (`onSuccess` prop), `src/app/layout.tsx`, `src/app/globals.css` ("Contact popup" section)
- **Migration required:** No
- **Documentation updated:** This log

## 2026-10-15 — Responsive Audit and Fixes

- **Change:** Audited all 47 prerendered pages at six widths (320–1024 px) for horizontal overflow, elements past the viewport, heading count, text size and tap-target size. Fixed: `/industries` and `/about` card grids overflowed at 320 px (fixed-minimum `minmax` → `minmax(min(N px, 100%), 1fr)`); `/contact` email link overflowed at 320 px (smaller size below `sm`, `break-words`); footer and breadcrumb links were 16–22 px tall (new rule in `@layer components` in `globals.css` gives them a 24 px minimum); "Learn More" on service-page industry cards and article source links given `min-h-6`.
- **Reason:** Owner asked whether the site is fully responsive on mobile. WCAG 2.2 AA 2.5.8 sets a 24 px minimum target.
- **Result:** 0 overflow and 0 off-screen content in 282 checks; remaining sub-24 px targets are inline links in sentences (exempt).
- **Affected areas:** `src/app/globals.css`, `src/app/industries/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/app/blog/[slug]/page.tsx`.
- **Migration required:** No.
- **Documentation updated:** `docs/project-status.md` verification table.

## 2026-10-17 — Lead attribution and mobile contact flow

- **Change:** Enquiries now carry campaign attribution (UTM tags, ad click IDs, landing page, referrer) captured on arrival and printed in the lead email; paid clicks get an `[Ad]` subject prefix. WhatsApp links get a "Ref:" line naming the page and campaign when tapped. `phone_click` event added. Phones get a fixed bottom contact bar (WhatsApp, Call, Get a quote) and a "Get a quote" header button; the timed popup no longer opens on phones or for campaign visitors. Contact-page form inputs are 16px on touch screens so iOS no longer zooms on focus. The "Expected Timeline / Budget" field became "Delivery Timeline" (`timeline`) end to end.
- **Reason:** Prepare the site for paid lead generation, where most traffic is mobile and every lead must be traceable to the ad that produced it.
- **Affected areas:** `src/lib/attribution.ts` (new), `src/components/seo/LeadAttribution.tsx` (new), `src/components/layout/MobileActionBar.tsx` (new), `src/components/forms/*`, `src/lib/forms/*`, `src/components/ui/WhatsAppButton.tsx`, `src/components/layout/Navigation.tsx`, `src/components/seo/ConsentBanner.tsx`, `src/app/layout.tsx`, `src/app/contact/page.tsx`, `src/app/privacy/page.tsx`, `src/app/globals.css`
- **Migration required:** No
- **Documentation updated:** `docs/seo/measurement-runbook.md`, `docs/design/ui-patterns.md`, `docs/ai/project-context.md`, privacy policy

## 2026-10-18 — App-first refocus, published packages and prices by country

- **Change:** The site is repositioned from a custom software company to an app development company ([ADR-002](../decisions/ADR-002-app-first-refocus-and-published-packages.md)).
  - **Catalogue:** four services (`mobile-app-development`, `backend-api-development` retitled "App Backend, Admin Panel and Web Portal", `mvp-development`, `software-maintenance`). The web application, SaaS and custom software services and eight backend, database and web technology pages are removed and 301-redirected; two guides renamed and redirected.
  - **Packages:** six packages with starting prices in `src/content/packages.ts`, a new `/pricing` page (BreadcrumbList and FAQPage JSON-LD, no Offer schema), and "Packages that usually fit" sections on goal and service pages (`RelatedPackages`, `PackageCard`).
  - **Prices by country:** `src/proxy.ts` sets an `invospec-region` cookie (`IN` or `INTL`) from `x-vercel-ip-country` or `cf-ipcountry` on the first view. A head script sets `html[data-region]` from the cookie, or from the browser time zone when there is none, and CSS shows one price list. Every price is server-rendered in both currencies, so pages stay static, crawlers and no-JS visitors see both labelled, and nothing shifts. `CurrencySwitch` lets visitors change it.
  - **Forms:** app-first project types, a package select, pre-fill from `/contact?package=<slug>`, and hidden `region`. The lead email shows package and price list; subject uses the package.
  - **Copy:** every public mention of backend technologies removed (diagram labels, goal-page technical details, About, homepage technology groups, Terms). Homepage, hero, footer, share images, CTA defaults, metadata and all page headers rewritten app-first. Three new guides (`how-much-does-an-app-cost`, `what-a-lean-mvp-package-includes`, `plan-the-app-before-you-build-it`) quote prices only through `<PackagePrice>`.
  - **Types:** `ServiceSlug`, `SolutionSlug`, `TechnologySlug` and `PackageSlug` unions make stale references a type error; this caught the non-existent `app-store-publishing` service slug on the publishing goal page.
  - **Gates:** `seo:check` now fails on backend technology names or banned words in any page's `<main>`, and requires BreadcrumbList and FAQPage on `/pricing`. The readability gate covers `packages.ts` and the pricing page.
  - **Fix found on the way:** header bar overflowed a 375 px screen by 1 px (gap now `gap-4 lg:gap-8`).
  - **Later the same day:** the owner lowered Lean MVP INR from 1,25,000–2,50,000 to 15,000–30,000; USD unchanged.
- **Reason:** Owner decisions 2026-10-18: focus on app development, publish packages with prices, INR for India and USD elsewhere, never name backend technology.
- **Affected areas:** `src/content/{services,technologies,solutions,industries,faqs,packages,images}.ts`, `src/types/content.ts`, `src/proxy.ts`, `src/lib/region.ts`, `src/lib/content/related.ts`, `src/lib/forms/*`, `src/config/{site,navigation,vocabulary,enquiry-options}.ts`, `src/components/**`, `src/app/**`, `src/content/blog/*.mdx`, `src/mdx-components.tsx`, `next.config.ts`, `scripts/{seo-check,readability}.mjs`
- **Migration required:** Yes, before production. Owner reviews the drafted package scopes (`OWNER REVIEW` comments in `src/content/packages.ts`). On a host other than Vercel or Cloudflare there is no country header, so only the time-zone fallback applies.
- **Documentation updated:** ADR-002, `AGENTS.md`, `docs/ai/project-context.md`, `docs/business/positioning.md`, `docs/project-status.md`, `docs/architecture/routing.md`, `docs/architecture/2026-10-13-outcome-first-plan.md`, `docs/content/content-model.md`, `docs/content/editorial-guidelines.md`, `docs/seo/schema.md`, `docs/seo/strategy.md`, `docs/seo/internal-linking.md`, `docs/seo/2026-10-14-seo-growth-plan.md`, `DESIGN.md`, `docs/design/ui-patterns.md`, `docs/design/image-brief.md`

## 2026-10-18 — App Blueprint package removed

- **Change:** The App Blueprint package (written plan and price, no code) is removed. Five packages remain. Deleted the `plan-the-app-before-you-build-it` guide (new in this branch, never deployed, so no redirect). Removed the slug from `PackageSlug`, the enquiry package select and the footer package links, and every mention on the homepage, `/pricing`, goal pages, services, FAQ and guides. "Six packages" copy now says five.
- **Reason:** Owner decision.
- **Affected areas:** `src/content/{packages,services,solutions,faqs}.ts`, `src/types/content.ts`, `src/config/{navigation,enquiry-options}.ts`, `src/app/page.tsx`, `src/app/pricing/page.tsx`, `src/content/blog/*.mdx`
- **Migration required:** No
- **Documentation updated:** ADR-002 (amendment note), `AGENTS.md`, `docs/ai/project-context.md`, `docs/business/positioning.md`, `docs/project-status.md`

## 2026-10-18 — INR prices lowered for four packages

- **Change:** INR starting prices changed in `src/content/packages.ts`: Business App ₹1,50,000–2,00,000 (was 2,50,000–5,00,000), Growth App ₹3,00,000–10,00,000+ (was 5,00,000–12,00,000+), Existing App Audit and Recovery ₹5,000–10,000 (was 10,000–25,000), Ongoing Maintenance ₹5,000–10,000 per month (was 10,000–30,000). USD prices unchanged.
- **Reason:** Owner decision, Indian market rates.
- **Affected areas:** `src/content/packages.ts` (every page and guide reads prices from here)
- **Migration required:** No
- **Documentation updated:** ADR-002 (amendment note), `docs/ai/project-context.md`, `docs/project-status.md`

## 2026-11-21 — Palette refresh and industry categories (appspine.com reference)

- **Change:** Colour tokens in `src/app/globals.css` re-valued with appspine.com as the reference (not copied): royal blue brand fill `cobalt-600` #0A5ED7 (was #2563EB), deep-navy `surface` #0D152D, canvas #050B14, glows re-tinted; same dark theme, same token names and roles, so no component class changed. Hardcoded copies updated (`layout.tsx` theme colour, share card, PageHeader and CTASection glows). New `--color-ind-*` tokens: one accent per industry. Industry content model gains `icon`, `accent`, `tags`; `industriesByOrder` added. Two new industries, Social & Community (`/industries/social-networking`) and On-Demand & Service Booking (`/industries/on-demand`); Finance renamed "Fintech & Finance" (wallets and payments added) and Retail renamed "E-Commerce & Retail" (marketplaces added); slugs unchanged, so no redirects. New `IndustryCard`; new homepage "Industries" section (eight industries plus a Startups card that links to `/solutions/launch-a-product-idea` instead of a duplicate page); `/industries` rebuilt on the card (inline styles removed); service-page industry tiles read icon and accent from data (removed a hardcoded switch that still used light-theme `bg-purple-50`). "Industries" added to the main navigation after Services. Two `todo` image records added.
- **Reason:** Owner asked to follow appspine.com's colour structure and its industry categories (fintech, logistics, social, on-demand, …) without changing the theme.
- **Affected areas:** `src/app/globals.css`, `src/app/layout.tsx`, `src/lib/og/share-card.tsx`, `src/components/ui/{PageHeader,Icon}.tsx`, `src/components/sections/CTASection.tsx`, `src/components/cards/IndustryCard.tsx` (new), `src/app/page.tsx`, `src/app/industries/page.tsx`, `src/app/industries/[slug]/page.tsx` (danger colour token), `src/app/services/[slug]/page.tsx`, `src/types/content.ts`, `src/content/{industries,services,images}.ts`, `src/config/navigation.ts`, `src/components/layout/Navigation.tsx`
- **Migration required:** No. Industry pages stay `noindex`. Owner must confirm InvoSpec serves the two new industries (content-model rule) before indexing.
- **Documentation updated:** `DESIGN.md`, `docs/design/design-system.md`, `docs/content/content-model.md`, `docs/architecture/routing.md`, `docs/project-status.md`

## 2026-11-21 — Fonts self-hosted with next/font/local

- **Change:** Manrope and Geist Mono now load from `src/app/fonts/` (variable WOFF2, Latin subset, downloaded from Google Fonts, OFL licences beside them) through `next/font/local` instead of `next/font/google`.
- **Reason:** `next dev` (Turbopack, Next 16.3.8) failed with "Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font' … next/font/google queries have exactly one entry" whenever Google Fonts answered with `fonts.gstatic.com/l/font?kit=…&skey=…` file URLs, which it does for some clients and networks. Local files make dev and build deterministic and offline-safe. Same families, same CSS variables (`--font-manrope`, `--font-geist-mono`), so no styling changed.
- **Affected areas:** `src/app/layout.tsx`, `src/app/fonts/` (new)
- **Migration required:** No
- **Documentation updated:** this entry
