# Project Status — InvoSpec Website

**Updated:** 2026-10-18 (app-first refocus and published packages, [ADR-002](./decisions/ADR-002-app-first-refocus-and-published-packages.md))
**Current phase:** App-first refocus implemented 2026-10-18 and awaiting owner review: four app services, `/pricing` with five packages, prices by visitor country, all backend technology names removed. Next: owner reviews the drafted package scopes, then Session B (planner, re-scoped to recommend a package), C (story hero, diagrams v2), D (usability check).

## Phase gate status

| Phase | Status | Deliverables |
|---|---|---|
| 1 Discovery | Complete, reviewed by owner | [Dossier](./research/2026-10-12-discovery-dossier.md), [Repo audit](./research/2026-10-12-repo-audit.md), [ADR-001](./decisions/ADR-001-phase-gated-delivery-and-fact-policy.md) |
| 2 Information architecture | Session A done | Six goal pages live under `/solutions`, "I want to…" navigation, redirects for retired routes; [plan](./architecture/2026-10-13-outcome-first-plan.md) |
| 3 UX | Session A done; B–D pending | Plain-language pass and readability gate done; planner, story hero and usability check next |
| 4 Visual design | Sprint 0 done; Sprint 1 next; image plan approved 2026-10-14 | Plan approved 2026-10-12 ("continue"). `DESIGN.md` is the system of record. Code-first with Lighthouse and screenshot gates. [Image brief](./design/image-brief.md) and manifest (`src/content/images.ts`, 40 records): prompts ready in [image-prompts.md](./design/image-prompts.md). 2026-10-15: 7 of 8 P0 files supplied (Figma exports) and wired: goal cards on `/` and `/solutions`, default share image, per-goal share images. Remaining: `team-working-session` photo, then P1 (24), P2 (8). |
| 5 Content and SEO | Phases 1–5 implemented 2026-10-14; owner review and deploy pending | [SEO growth plan](./seo/2026-10-14-seo-growth-plan.md): technical defects, intent map, measurement, proof, blog |
| 6 Engineering | Not started | Lead-pipeline hotfix done early (see change log) |
| 7 Validation | Not started | |
| 8 Growth | Blog live in code (9 guides); measurement wired, awaiting deploy and Search Console ([runbook](./seo/measurement-runbook.md)) | |

## Approved decisions

- ADR-001 accepted 2026-10-12: phase-gated delivery; preserve the existing Next.js codebase; fabricated or unverified claims are quarantined, not reused.
- Target market: global (owner, 2026-10-12). Based in Sector 63, Noida, Uttar Pradesh, India.
- Contractual and therefore claimable: client IP ownership on payment, repository access from day one, response times stated on the site (owner, 2026-10-12).
- ADR-002 accepted 2026-10-18: app development focus; four services; backend technology never named; six packages with published starting prices; INR for visitors in India and USD elsewhere; Lean MVP INR lowered the same day to 15,000–30,000 (USD unchanged). App Blueprint package removed the same day, leaving five, and INR lowered for Business App, Growth App, Existing App Audit and Ongoing Maintenance.

## Unresolved risks

1. Fabricated content is removed in this repository but remains live on www.invospec.com until the next deploy.
2. Lead delivery depends on `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` being set in the hosting environment (and a verified sender domain in Resend). Until then production forms show a direct-email fallback.
3. No permissioned case studies, team names or founding year yet. `/case-studies/[slug]` is built and empty; `/case-studies` stays `noindex` until the first study is published from `src/content/case-studies/_TEMPLATE.mdx`.
4. One unconfirmed process claim remains, deliberately: the weekly written update and two-week preview cadence (homepage, goal pages, FAQ, guides, `vocabulary.ts`). "Senior architects", "30-minute call" and "fixed pricing or sprint cadence" were softened 2026-10-14. Owner: confirm the cadence or say what it should be.
5. Resolved 2026-10-14: "Guaranteed Delivery", "0% rejection risk", "Flawless Deployment", "99.99% uptime", "up to 40%", "95%+", "4 to 8 weeks" and "24/7" removed; `/services` rebuilt from data.
6. PIN code for the Noida address is missing.
7. About, FAQ, Privacy, Terms, Industries and 404 pages still use the legacy `var(--x)` aliases and inline styles; migrate in Sprints 2–3.
8. Homepage DOM (757 elements, 54 inline SVGs) and RSC payload (277 KB) are the main performance cost; Sprint 1 must reduce them.
9. Resolved 2026-10-13: `/services/app-store-publishing` now redirects to the goal page; the duplicate service entry is removed.
11. The homepage technology section previously listed tools the company has not confirmed (React Native, Node.js, Go, PostgreSQL, AWS, Kubernetes and others). Replaced with the confirmed stack from `src/content/technologies.ts`. Check `services.ts` and `technologies.ts` copy for the same problem in Phase 5.
12. Goal-page copy was written by the agent from confirmed services and owner-confirmed terms; it describes process, not results. Owner should read all six pages once and correct anything that is not how InvoSpec works.
13. Resolved 2026-10-14 (uncommitted): site-wide SEO defects fixed in Phase 1 of the [SEO growth plan](./seo/2026-10-14-seo-growth-plan.md): `/services` canonical, doubled brand in titles, shared `twitter:title`, missing share image, build-time sitemap dates, missing JSON-LD, no in-content links to goal pages, GA never loaded. `yarn seo:check` now guards them.
14. Resolved in code 2026-10-14: privacy policy gains an analytics section (conditional on the ID being set) and a consent prompt with Consent Mode defaults denied. Owner decision remains: keep the prompt (`siteConfig.analytics.consentBanner`, default true) or run analytics without asking.
15. Resolved 2026-10-14 (see 5). New since: industry pages are `noindex` (`INDUSTRIES_INDEXABLE` in `industries.ts`) and `/technologies/dart` redirects to Flutter; both reversible, both awaiting the owner's yes or no.
16. Nine guides under `/blog` were drafted by the agent from the confirmed services and terms. Owner should read them once before deploy and correct anything that is not how InvoSpec works, as with the goal pages. Authorship is the company until names are supplied.
21. The industry copy (all eight entries) was drafted by the agent and describes what would be built, not past projects. Pages stay `noindex`; the homepage and navigation now link to them. Owner review needed before `INDUSTRIES_INDEXABLE` is flipped (2026-11-21).
10. SVG diagram labels become small on phones (about 6 px for sub-labels at 360 px wide). Sprint 1: add a compact phone variant or hide secondary labels below the `sm` breakpoint.

17. **Pre-deploy blocker (2026-10-18):** the scopes of Business App, Growth App, the audit "recovery" boundary and the maintenance allowance were drafted by the agent (`OWNER REVIEW` comments in `src/content/packages.ts`). Owner must confirm or correct them before production.
18. Lean MVP is ₹15,000–30,000 and the next package, Business App, starts at ₹1,50,000 (INR lowered 2026-10-18). Owner may want to narrow the Lean MVP scope for India or add a package between them.
19. Prices by country depend on the host adding a country header (`x-vercel-ip-country` on Vercel, `cf-ipcountry` behind Cloudflare). Elsewhere only the time-zone fallback applies (India time zone means INR). Visitors can always switch.
20. A 2026-10-18 Lighthouse comparison against the previous commit on the same machine is recorded in the verification table; absolute scores were lower than the 2026-10-12 baseline because the machine was also running `next dev`.

## Open questions for the owner (ranked)

Answered: target geography (global), address (Sector 63, Noida), contractual terms (confirmed), ADR-001 (approved).
Answered 2026-10-14: generated imagery allowed, abstract blueprint style only (`DESIGN.md` §Imagery).
Answered 2026-10-18: pricing posture (published packages, ADR-002); engagement models (package, fixed price for an agreed scope, monthly team).
Still open, in priority order: (0) review the drafted package scopes (risk 17); (1) real projects that may be described publicly and any client willing to be quoted; (2) founding year, team size, names and roles, photo policy, and the two real photographs the image manifest needs (`team-working-session`, `office-noida`); (3) pricing posture (ranges or factors only) and engagement models; (4) technologies to confirm beyond the core stack; (5) review profiles; (6) Resend account and sender domain; (7) Analytics ID and Search Console token; (8) image generation tool: none is available to the agent, so the owner runs `docs/design/image-prompts.md` in a tool of their choice or grants access; (9) Phase 4 design tooling (Stitch unavailable here); (10) PIN code.

## Next actions

-2. Owner reviews the 2026-11-21 palette refresh and industry categories (uncommitted): homepage "Industries" section, `/industries`, the two new pages `/industries/social-networking` and `/industries/on-demand` (agent-drafted copy, process only, no client claims), and the renamed Fintech and E-Commerce entries. Confirm InvoSpec serves Social and On-Demand, or remove them.

-1. Owner reviews the app-first refocus (uncommitted on `dev`): `/pricing`, the four service pages, the six goal pages, the three new guides, and the `OWNER REVIEW` lines in `src/content/packages.ts`. Then commit and deploy.

0. SEO plan Phases 1–5 are implemented and uncommitted. Owner: review the diff (services index, service template, nine guides, industries noindex, Dart redirect, consent prompt), then follow the [measurement runbook](./seo/measurement-runbook.md): deploy, env vars, Search Console, GA4.
1. Owner reads the six goal pages and `src/config/vocabulary.ts` and corrects anything that is not how InvoSpec works (the agent wrote them from confirmed services and terms).
2. Session B: project planner (`src/content/planner.ts`, `ProjectPlanner` component, pre-filled enquiry, analytics hooks).
3. Owner sets the delivery environment variables and deploys `dev`.
4. Owner supplies the real-project inventory (even anonymised) so Phase 2 can plan case-study and proof pages.
5. Sessions B (planner) and C (story hero, diagrams v2) follow Session A; then the usability check (D).
6. Images: P0 done except the team photo. Next: owner looks at the goal cards and share images on the deployed `dev` and marks the seven records `approved` in `src/content/images.ts`; then P1 (24) from `docs/design/image-prompts.md` → service and index banners, process steps → P2 (8) → `image` on Organization and Service JSON-LD. Optional polish: regenerate `run-deliveries-and-field-teams` to the audited prompt (it predates the audit: teardrop pins, teal check). Team and office photos come from the owner whenever ready.

## Verification status

| Check | Result | Date |
|---|---|---|
| `yarn typecheck` | Pass (exit 0) | 2026-10-12 |
| `yarn lint` | Pass (0 errors, 9 warnings: raw `<img>` and unused imports in untouched files) | 2026-10-12 |
| `yarn build` | Pass; 43 static pages | 2026-10-12 |
| Lead action, no-JS POST against `next start` | Validation errors, honeypot, unconfigured-delivery error with direct email, rate limit after 5 per 10 min all behave as specified. Successful Resend delivery not tested (no API key). | 2026-10-12 |
| Sprint 0 gate (Lighthouse mobile, warm, median of 3) | Home perf 96–97, LCP 2.5–2.6 s, TBT 60–80 ms, CLS 0, a11y 100, BP 100, SEO 100; service page 95–96 / 2.5–2.8 s; contact 97 / 2.5 s; 0 contrast failures | 2026-10-12 |
| Solution template + publishing page (production build, warm) | perf 94–97, a11y 100, BP 100, SEO 100, LCP 2.6–3.1 s, CLS 0, 0 contrast failures; BreadcrumbList and FAQPage JSON-LD present; all six store facts render with source links | 2026-10-12 |
| Rendered HTML (Sprint 0) | No Google Fonts or icon-font requests; fonts self-hosted; no `framer-motion` in client chunks; diagram and js-flag script present | 2026-10-12 |
| Rendered HTML | Fabricated strings absent from `/` and `/case-studies`; `/case-studies` has `noindex, follow` and is out of the sitemap; PostalAddress in Organization JSON-LD; address and phone in footer and contact page | 2026-10-12 |
| SEO Phase 1: `yarn typecheck`, `yarn lint` (0 errors, 0 warnings), `yarn build`, `yarn seo:check` | Pass; 38 pages checked, 37 indexable, sitemap matches indexable set | 2026-10-14 |
| GA loader | Renders with a valid test ID, absent with an invalid ID or none (production builds) | 2026-10-14 |
| SEO Phases 2–5: `yarn typecheck`, `yarn lint` (0 errors; readability gate now covers the 9 guides, grades 4.4–6.9), `yarn build`, `yarn seo:check` | Pass; 47 pages, 40 indexable (6 industries + `/case-studies` noindex), sitemap matches, BlogPosting/Article/BreadcrumbList present where required | 2026-10-14 |
| Phone-width (375 px) render of `/services`, a service page, a goal page, `/blog` and an article on a production build with a test GA ID | No horizontal overflow; consent prompt, intent notes, price card, goal and guide cards, article template and sample table all render | 2026-10-14 |
| Images (production build, `next start`) | Goal cards render through `next/image` with `srcSet`, lazy, optimizer returns 5.6 KB WebP for a card slot; `/opengraph-image` and the six `/solutions/[slug]/opengraph-image` routes return 1200×630 PNG (78–143 KB); goal pages carry their own `og:image`, other pages the default; typecheck, lint (0 warnings), build (54 pages), `seo:check` pass | 2026-10-15 |
| Responsive audit, production build: all 47 pages at 320, 360, 375, 414, 768 and 1024 px (282 checks) | No horizontal overflow, no content past the right edge, one `<h1>` on every page. Fixed on the way: `/industries` and `/about` grids (`minmax(350px)` → `minmax(min(350px,100%))`), `/contact` email link at 320 px, footer and breadcrumb links below the 24 px WCAG 2.2 target (now ≥ 24 px), service-card "Learn More", article source links. Remaining small targets are inline links inside sentences (WCAG exception). | 2026-10-15 |
| Text under 12 px on phones | By design: 11 px mono captions (`text-caption` token) and the homepage diagram labels (9.5–10.5 px, risk 10). Not a WCAG failure; diagram labels still need the phone variant planned in Sprint 1. | 2026-10-15 |
| App-first refocus: `yarn typecheck`, `yarn lint` (readability now gates `packages.ts`, the pricing page and 12 guides), `yarn build` (57 static outputs, proxy registered), `yarn seo:check` (44 pages, 37 indexable, sitemap matches, `/pricing` JSON-LD, no backend names or banned words in any `<main>`) | Pass | 2026-10-18 |
| Redirects and region cookie against `next start` | 13 new redirects return 308 to the right target; `/contact?package=…` canonical is `/contact`; cookie set only on first view with a country header (`IN`/`INTL`), not on assets or when already present | 2026-10-18 |
| Headless Chrome (15 checks) | Cookie beats time zone both ways; time-zone fallback (Kolkata, Calcutta, London); no-JS shows both lists labelled; switch persists; package link pre-fills and survives reload; hidden region field set; no console errors; 320/375/414 px × IN/INTL × 7 routes no overflow, one h1. Found and fixed: cookie regex matched "IN" inside "INTL"; header 1 px overflow at 375 px (pre-existing) | 2026-10-18 |
| Lighthouse mobile, homepage, 5 interleaved runs vs previous commit on the same machine | Before 67–86 (median 82), after 64–88 (median 72), CLS 0 both; machine also ran `next dev`, so absolute scores and the gap are noise. Shipped homepage JS +0.7 KB gzip, HTML −2 KB, DOM −3 elements. Re-measure on a quiet machine before deploy | 2026-10-18 |
| Lead email with package and region | Not tested end to end: `.env.local` has live Resend keys, so a test would email the company inbox. Covered by typecheck only | 2026-10-18 |
| Accessibility, metadata, schema, performance audits | Not run | |
