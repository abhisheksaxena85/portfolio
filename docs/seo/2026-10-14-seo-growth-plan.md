# SEO Growth Plan — Existing Pages, Proof, Then Blog

> **Update 2026-10-18 (ADR-002).** Pricing posture is decided: published package ranges (§3 placeholder closed). Intent map §5.2 changes: `web-application-development`, `saas-development` and `custom-software-development` are retired and redirected; `backend-api-development` now means "the backend and admin panel behind my app"; `replace-spreadsheets-and-manual-work` pairs with it instead of custom software. Blog map §8: `custom-software-or-off-the-shelf` → `custom-app-or-off-the-shelf-software` (supports the spreadsheets goal), `how-to-evaluate-a-software-development-company` → `how-to-evaluate-an-app-development-company`, cost guide now supports `/pricing`, plus three new package guides.

**Date:** 2026-10-14
**Status:** Phases 1–5 implemented 2026-10-14 (uncommitted; see the status notes under each phase). Owner actions remaining: review the diff, deploy, set env vars, Search Console (see [measurement runbook](./measurement-runbook.md)), supply case-study projects, read the nine guides and correct anything that is not how InvoSpec works. Implements Phase 5 (Content and SEO) of the [project status](../project-status.md) gate table and parts of Phase 8 (Growth).
**Problem it solves:** The site has 38 indexable-in-principle routes but several defects that weaken every one of them, no measurement, no proof pages and no articles. An external SEO plan (reviewed 2026-10-14) had the right order but wrong facts about this repository. This plan keeps its order and replaces its assumptions with what the code and rendered HTML actually show.

Related: [SEO strategy](./strategy.md) · [Schema](./schema.md) · [Internal linking](./internal-linking.md) · [Outcome-first plan](../architecture/2026-10-13-outcome-first-plan.md) · [ADR-001](../decisions/ADR-001-phase-gated-delivery-and-fact-policy.md)

---

## 1. The plan in one paragraph

Fix the technical defects that affect every page first, because they cost nothing to fix and no content work pays off while they exist. Then make each existing page true and give it one distinct search intent. Then turn on measurement on the deployed, corrected site and wait for a baseline. Build proof pages only when the owner supplies permissioned projects. Start the blog last, with a small number of articles that each support one money page and do not compete with any existing URL.

## 2. Where we are (verified 2026-10-14)

| Area | Fact | Source |
|---|---|---|
| Routes | 11 static + 27 dynamic (7 services, 6 solutions, 6 industries, 8 technologies) = 38. No `/blog`, no `/case-studies/[slug]`. | `src/app/**/page.tsx`, `src/content/*.ts` |
| Live site | Still the old build with fabricated content (project-status risk 1) | `docs/project-status.md` |
| Measurement | `NEXT_PUBLIC_GA_ID` is read into `siteConfig` but **no component loads GA**. Search Console token is unset. | `src/config/site.ts`, `.env.example` |
| Case studies | `/case-studies` is `noindex` by design: no permissioned projects yet | `src/app/case-studies/page.tsx` |
| SEO helpers | `src/lib/seo/` and `src/lib/schema/` named in AGENTS.md **do not exist**. JSON-LD is inline in two files only. | `src/lib/` |
| MDX | Not installed, although project-context chose MDX for blog and case studies | `package.json` |
| Content depth (data only, excluding template copy) | Solutions ≈1,280 words/page · Services ≈280 · Industries ≈225 · Technologies ≈170 | `wc -w src/content/*.ts` |

### Defects found in the rendered HTML

| # | Defect | Pages affected | Evidence |
|---|---|---|---|
| D1 | `/services` has no metadata. It inherits the homepage title **and the homepage canonical**, telling Google the services index is a duplicate of `/`. | 1, high value | `.next/server/app/services.html`: `canonical = https://www.invospec.com` |
| D2 | Brand suffix doubled: `seo.title` already ends in "\| InvoSpec" and the root template appends "\| InvoSpec Softwares" again | All 27 dynamic pages + several static | `Backend & REST API Development Services \| InvoSpec \| InvoSpec Softwares` |
| D3 | `twitter:title` and `twitter:description` are the homepage values on every page | All 38 | Root `twitter` block is never overridden |
| D4 | No Open Graph image anywhere. `siteConfig.seo.defaultOgImage` points to a file that does not exist. | All 38 | `public/images/og-default.png` missing |
| D5 | `sitemap.ts` sets `lastModified: new Date()` on every URL, so every build claims every page changed | All 38 | `src/app/sitemap.ts` |
| D6 | JSON-LD only on the root layout (Organization) and solution pages. No `Service` or `BreadcrumbList` on services, industries or technologies. | 21 | `grep application/ld+json` |
| D7 | Services, industries and technology pages had **no in-content links** to goal pages. (Correction 2026-10-14: the "I want to…" navigation menu does link all six goal pages from every page; the gap is contextual links in the main content, which carry more weight.) | 21 | `<main>` of each template |

### Unverified claims still in copy (ADR-001 violations)

The service template prints these on **all seven** service pages: "Guaranteed Delivery", "Flawless Deployment & Launch", "0% (We resolve any platform…)" (`src/app/services/[slug]/page.tsx` ~L190–205). Also "Guaranteed" and "flawless SEO" on `/services`, "Senior Architects" on the homepage, "Flawless adherence" in `technologies.ts`. These are a ranking risk (thin trust signals) and a legal risk, and they are cheaper to fix than anything else in this plan.

## 3. Decisions (DECISION) and open questions (PLACEHOLDER)

- DECISION: Order of work is **technical defects → truthful copy and intent → deploy and measure → proof → blog**. No article is published before the money pages it links to are corrected and indexed.
- DECISION: One metadata helper, `src/lib/seo/metadata.ts`, builds title, description, canonical, Open Graph and Twitter for every page. Pages stop hand-writing these objects. This fixes D1–D4 in one place and matches AGENTS.md.
- DECISION: Target market is global (owner, 2026-10-12). Articles are not localised to India unless the topic is genuinely India-specific.
- DECISION: No case-study detail route is built until at least two permissioned projects exist. The route without content is wasted work.
- DECISION: Blog articles follow the same fact policy as goal pages: every external fact carries a source link and a checked date, as `solutions.ts` already does.
- PLACEHOLDER: Industry pages. Recommendation is `noindex, follow` until the owner confirms at least one real project per industry; then rewrite and re-index one at a time. Owner to decide.
- PLACEHOLDER: Technology pages overlap with each other (Flutter/Dart, Android/iOS vs mobile app development). Recommendation is to keep Flutter, Spring Boot and Firebase as full pages and merge Dart into Flutter with a 301. Owner to decide.
- PLACEHOLDER: Author identity for articles. Until names are supplied, articles are authored by the Organization; Google accepts this.
- PLACEHOLDER: Pricing posture (open question 3). Without it, cost articles explain price drivers only.

## 4. Phase 1 — Technical foundation (agent, ≈3 working days, no owner input)

| Step | Change | Fixes | Done when |
|---|---|---|---|
| 1.1 | Create `src/lib/seo/metadata.ts` with `buildMetadata({ title, description, path, type, image })`. It sets canonical from `path`, mirrors title and description into `openGraph` and `twitter`, and attaches the default OG image. | D2, D3 | Every page imports it; no page hand-writes `openGraph` or `twitter` |
| 1.2 | Strip the "\| InvoSpec…" suffix from every `seo.title` in `src/content/*.ts` and let the template add it once. Re-check lengths: ≤60 characters including suffix. | D2 | No rendered `<title>` contains "InvoSpec" twice |
| 1.3 | Add metadata to `src/app/services/page.tsx` through the helper | D1 | `/services` canonical is `/services` and its title is unique |
| 1.4 | Add a static `src/app/opengraph-image.png` (1200×630, brand lockup, no stock imagery). Per-section images later if useful. | D4 | `og:image` and `twitter:image` present on every page |
| 1.5 | Add an `updated` date to every content entry and to a small static-route map; sitemap reads it. Drop `changeFrequency` and `priority` (Google ignores both). | D5 | Sitemap dates change only when content changes |
| 1.6 | Create `src/lib/schema/` with `organization`, `breadcrumbs`, `service` and `faqPage` builders. Move the inline JSON-LD into it. Add `Service` + `BreadcrumbList` to services, `BreadcrumbList` to industries and technologies. | D6 | Rich Results Test passes on one page of each type; schema matches visible content |
| 1.7 | Add `relatedSolutions` to the service type and data; render a "Common goals this service serves" block on service pages. Derive the reverse links for industries and technologies. | D7 | Every service page links to at least one goal page; every goal page is linked from ≥3 pages |
| 1.8 | Load GA4 with `next/script` (`afterInteractive`) only when `gaId` is set and only in production. Fire a `generate_lead` event on successful enquiry submission from the server action's success state. | Measurement | GA DebugView shows page views and the lead event on a preview deploy |
| 1.9 | Add a script `yarn seo:check` that builds, then reads every HTML file in `.next/server/app` and fails on: missing or duplicate title, missing or non-self canonical on an indexable page, duplicated brand suffix, missing `og:image`, more or fewer than one `<h1>`. | Regression gate | Runs clean; added to the verification table in project status |

**Gate:** `yarn typecheck`, `yarn lint`, `yarn build`, `yarn seo:check` all pass.

### Phase 1 status (2026-10-14)

Done, with these differences from the steps above:

- **Title template is now `%s | InvoSpec`**, not "InvoSpec Softwares". With the longer suffix most service titles ran past 70 characters. Rendered titles are 40–62 characters. About, Contact and Home use absolute titles that name the company once.
- **Share image** is generated by `src/app/opengraph-image.tsx` and referenced explicitly from `buildMetadata()`. The file convention alone only reached the homepage, because a page's own `openGraph` object replaces the inherited one. No separate Twitter image; both tags use the same file.
- **Root layout no longer sets a canonical**, so a page without metadata cannot inherit the homepage's again (the cause of D1).
- **Internal links** are derived in `src/lib/content/related.ts` from the `services` and `technologies` each goal page already declares; no new data field. Industries need at least two shared services, because one shared "backend" linked finance to deliveries. Goal cards are now one component, `GoalCard`, shared with `/solutions`.
- **JSON-LD** goes through `src/lib/schema/` and the `JsonLd` component, which escapes `<`. Services: BreadcrumbList, Service, FAQPage. Industries: BreadcrumbList, FAQPage. Technologies: BreadcrumbList. Solutions: unchanged types, moved to the builders.
- **Analytics** loads only in production builds and only for an ID matching `G-…`. Verified by building with a test ID, an invalid ID and no ID. The `generate_lead` event fires from both forms' success states; not yet verified in GA DebugView (needs a real ID).
- **`yarn seo:check`** does not build; run it after `yarn build`. It also checks that the sitemap equals the set of indexable pages and that all JSON-LD parses.
- Not done in Phase 1: the Rich Results Test and a browser check of the new "goals" section on phone widths.

## 5. Phase 2 — Truthful copy and one intent per URL (agent drafts, owner approves, ≈2 weeks)

### 5.1 Remove unverified claims

Replace every claim listed in §2 with a contractual fact the owner has confirmed (IP ownership on payment, repository access from day one, stated response times) or delete it. This also closes project-status risks 4 and 5.

### 5.2 Intent map

Every indexable URL gets exactly one primary query intent. Where two pages compete, the split is:

| Pair | Service page answers | Goal page answers |
|---|---|---|
| `/services/software-maintenance` vs `/solutions/fix-or-take-over-an-existing-app` | "I want to hire a maintenance provider": scope of a retainer, what is monitored, response times, reporting | "My developer left / my app is broken": what to do this week, health check, recovering keys and accounts |
| `/services/mvp-development` vs `/solutions/launch-a-product-idea` | "MVP development company": deliverables, engagement model, technical foundations | "I have an idea, no tech team": deciding scope, what you bring, what the first version is |
| `/services/mobile-app-development` vs `/solutions/app-store-publishing` | Building the app | Getting an already-built app into the stores |
| `/services/custom-software-development` vs `/solutions/replace-spreadsheets-and-manual-work` | Hiring a team to build internal software | Recognising the problem and what a system replaces |

Each pair links to the other in one sentence that names the difference. The `<h1>`, title and first paragraph of each page must state its own intent and not the partner's.

### 5.3 Thin pages

- **Services:** ≈280 words of unique data per page. Add per service: what you receive (deliverables list), how an engagement runs, what affects the price, three to five page-specific FAQs with `FAQPage` schema. Target is "answers the hiring question completely", not a word count.
- **Industries:** apply the PLACEHOLDER decision in §3.
- **Technologies:** apply the PLACEHOLDER decision in §3. Kept pages explain how InvoSpec uses the technology and when it is the wrong choice.

**Gate:** owner reads every changed page; `yarn seo:check` passes; readability gate (grade 9) passes on goal pages.

### Phase 2 status (2026-10-14)

Done, with these decisions taken (reversible, flagged for the owner):

- **Claims removed or replaced** on the service template (launch card now says store rejections are fixed and resubmitted, included; price card lists the service's `priceDrivers`; ownership card uses the contractual wording), on `/services` (rebuilt from `services.ts`: no stats row, no fake filter bar, no hand-coded copy competing with the service pages, no non-functional form), on the homepage ("Senior Architects" → "Software architects"), on `/contact` (one business day, no call duration, fixed price or monthly team), in `technologies.ts` ("up to 40%", "60fps", "Flawless") and in `services.ts` ("95%+", "4 to 8 weeks", "24/7", "60%"). "A 30-minute call" became "A short call" on the goal pages.
- **Still unconfirmed and left in place:** the two-week preview cadence and weekly written update (homepage, goal pages, FAQ, vocabulary). Owner to confirm or soften; it is one find-and-replace.
- **Intent map implemented** with an `intentNote` on each side of the four pairs (§5.2), rendered under the hero paragraph with a link that names the difference. MVP hero no longer promises "weeks, not months".
- **Service pages gained** four `priceDrivers` each and two or three FAQs each (now four to five per page, all distinct from `/faq` and from the goal pages), plus `Service`/`BreadcrumbList`/`FAQPage` JSON-LD and the goal and guide links from Phase 1 and 5.
- **Industries:** `noindex, follow` and out of the sitemap via `INDUSTRIES_INDEXABLE = false` in `industries.ts`; index page copy no longer claims regulatory expertise. One-line flip to re-index.
- **Technologies:** Dart merged into the Flutter page with a 301 from `/technologies/dart`. Android and iOS kept (native work is a real, distinct service). Java and MySQL kept unchanged.
- Readability: services and industries remain report-only (they also serve technical evaluators); the new copy is plain.

## 6. Phase 3 — Deploy, measure, baseline (owner + agent, starts when Phase 2 ships)

1. Owner deploys `dev` to production. This retires the fabricated live content.
2. Owner sets `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and the Resend variables in the host.
3. Verify the domain property in Search Console (domain property, so `www` and apex are both covered). Submit `/sitemap.xml`.
4. Confirm the apex domain 301s to `https://www.invospec.com` and HTTP 301s to HTTPS.
5. Request indexing for the homepage, `/services`, the six goal pages and the seven service pages.
6. **Baseline at day 28 after deploy:** indexed URL count, impressions and clicks per page group, top queries per page, enquiries per landing page. No targets are set before the baseline exists.

KPIs, in order of importance:

| KPI | Source | Why |
|---|---|---|
| Qualified enquiries by landing page | GA4 `generate_lead` + inbox | The only number the business cares about |
| Indexed vs submitted URLs | Search Console, Pages report | Detects canonical and quality problems |
| Impressions per page group | Search Console, Performance | Leading indicator; moves months before clicks |
| CTR on pages with impressions | Search Console | Tells us which titles and descriptions to rewrite |
| Field Core Web Vitals | Search Console, CWV report | Appears once traffic is sufficient |

Monthly review: one short entry in `docs/project-status.md` with the five numbers and the one or two pages to improve next.

### Phase 3 status (2026-10-14)

Everything that can be done in the repository is done; the rest is in the [measurement runbook](./measurement-runbook.md) for the owner.

- **Consent:** Google Consent Mode v2 with analytics storage denied by default and a small prompt (`ConsentBanner`) that upgrades it on "Allow analytics". `siteConfig.analytics.consentBanner = false` switches the prompt off (owner decision; global market, EU/UK visitors need it). IP anonymisation on.
- **Privacy policy** now has an "Analytics & Cookies" section that describes GA4 and the prompt when `NEXT_PUBLIC_GA_ID` is set, and states that no analytics cookies are used when it is not. Policy date set to 14 October 2026.
- **Not possible from here:** deploy, env vars, Search Console verification and sitemap submission, GA4 property and key event, apex→www redirect check, and the day-28 baseline. The runbook lists each with the exact clicks. `.env.local` currently has no `NEXT_PUBLIC_GA_ID`.

## 7. Phase 4 — Proof pages (blocked on owner input)

Unblocks when the owner supplies at least two projects that may be described publicly, even anonymised, with permission.

- Route: `/case-studies/[slug]`, content as MDX with typed frontmatter (`client` or "anonymised", `industry`, `services`, `technologies`, `goal`, `permission` with date, `updated`).
- Structure: context · problem · constraints · what we built · engineering decisions and trade-offs · outcome stated only as verifiable facts · screenshots where permitted.
- When the first two exist, `/case-studies` becomes indexable and enters the sitemap.
- Each case study links to its service, goal page and technologies; those pages link back.

Proof that needs no client permission and can ship earlier, because InvoSpec owns it: a sample health-check report for takeover work, a sample handover checklist, a sample sprint report. Each is labelled "Sample" under the same rule as the hero screens.

### Phase 4 status (2026-10-14)

- **Route and template built:** `/case-studies/[slug]` renders MDX from `src/content/case-studies/`, with `Article` + `BreadcrumbList` JSON-LD, a facts sidebar (client, industry, platforms, services, technologies), the goal card and an enquiry form. `_TEMPLATE.mdx` is the starting file. The Zod meta requires a `permission` field (who, when) and defaults `status` to `draft`, so nothing can be published by accident.
- **Listing:** `/case-studies` stays `noindex` and out of the sitemap until the first published study, then lists them and is indexed. Goal pages and guides show a matching case study automatically when one exists.
- **Content:** none, by design (ADR-001). Blocked on the owner's project inventory with written permission.
- **Permission-free proof shipped:** the sample health-check report (`/blog/sample-app-health-check-report`, labelled "Sample" in the listing, the header and the body) and the handover checklist guide. A sample sprint report was not written: the two-week cadence it would describe is still unconfirmed (Phase 2 note).

## 8. Phase 5 — Blog (starts after Phase 3 baseline, ≈2 articles per month)

### 8.1 Build

- Install `@next/mdx` (check `node_modules/next/dist/docs/` for the Next 16 setup first).
- Routes: `/blog` and `/blog/[slug]` only. No category, tag or author archives until there are more than 15 articles.
- Content in `src/content/blog/*.mdx` with frontmatter validated by Zod: `title`, `description`, `published`, `updated`, `author`, `supports` (the money page it serves), `sources[]` with checked dates.
- `BlogPosting` + `BreadcrumbList` JSON-LD through `src/lib/schema/`. Sitemap reads `updated`.
- Article template: direct answer in the first paragraph · body · "How we handle this" box linking the supported page · related goal page and case study when one exists · FAQs only if not already answered above · enquiry CTA.

### 8.2 First eight articles (revised)

Changes from the external plan: the store-publishing guide is dropped because `/solutions/app-store-publishing` already owns that intent. The two maintenance articles are merged into one, and the takeover article is reframed so it does not compete with the goal page.

| # | Working title | Intent | Supports | Must not compete with |
|---|---|---|---|---|
| 1 | Mobile app or website: how to decide for your business | Informational, early | Mobile app and web app services | — |
| 2 | What decides the cost of a mobile app | Commercial research | Mobile app service, project planner | Planner copy (link to it, do not duplicate) |
| 3 | What to get from your developer before they leave: a handover checklist | Informational, preventative | Fix-or-take-over goal page | Goal page (that page is for after they have left) |
| 4 | What to build first in an MVP | Informational | MVP service, launch-a-product-idea | Goal page scope section |
| 5 | Custom software or an off-the-shelf tool: how to decide | Commercial research | Custom software service, replace-spreadsheets goal | — |
| 6 | How to evaluate a software development company before hiring | Commercial research | `/services`, `/about` | — |
| 7 | What app maintenance involves after launch | Informational | Software maintenance service | Maintenance service page |
| 8 | Flutter or native apps: the trade-offs for a business app | Technical evaluation | Flutter technology page, mobile service | Flutter page (that page is how we use it) |

Before drafting any of these, replace the working list with real queries once Search Console has data. Queries already producing impressions outrank anything on this list.

### 8.3 Per-article workflow

1. **Brief** (agent): target query, intent, the existing page it supports, overlap check against all 38 URLs, outline, sources to verify.
2. **Draft** (agent): original structure and examples drawn from how InvoSpec works; every external fact sourced and dated; no invented numbers.
3. **Expert pass** (owner or engineer): adds real experience, corrects anything that is not how InvoSpec works.
4. **Gate** (agent): `yarn seo:check`, readability, link check, schema check.
5. **Publish and link** (agent): add a link from the supported page back to the article.
6. **Review at 90 days**: rewrite title and description if impressions are high and CTR is low; merge or remove if no impressions.

### Phase 5 status (2026-10-14)

- **Built:** `@next/mdx` with `src/mdx-components.tsx` (styled elements), `src/lib/content/blog.ts` (Zod-validated `export const meta`, drafts excluded everywhere), `/blog` and `/blog/[slug]`, `ArticleCard`, `RelatedArticles` on service and goal pages, `BlogPosting` + `BreadcrumbList` + `FAQPage` JSON-LD, sitemap entries from each article's `updated`, "Guides" in the primary navigation and footer, `yarn seo:check` requiring `BlogPosting` on every article, and the readability gate extended to MDX (every guide at grade 9 or below; the nine are at 4.4–6.9).
- **Published:** the eight articles from §8.2 (titles shortened to fit search results) plus the sample health-check report. Every external fact cites a source URL checked on 2026-10-14 (store fees, Play target API levels, Apple upcoming requirements and certificates, Play App Signing, Flutter docs). No prices, durations or statistics are stated anywhere. The store-publishing guide was not written, as decided above.
- **Authorship:** Organization (`InvoSpec Softwares`), per the §3 placeholder. Swap to a person's name per article when the owner supplies one.
- **Pending owner review:** the guides describe how InvoSpec works (previews every two weeks, one-business-day replies, accounts in the client's name, health check before take-over). They follow the goal pages, which carry the same pending-review flag. Corrections are plain-text edits to the MDX files.
- **Not done:** replacing the §8.2 list with real queries. That needs the Phase 3 baseline, which needs the deploy.

## 9. Timeline

| Weeks | Work | Owner | Depends on |
|---|---|---|---|
| 1 | Phase 1 technical foundation | Agent | — |
| 2–3 | Phase 2 copy and intent; owner review | Agent drafts, owner approves | Phase 1 |
| 3 | Deploy, env vars, Search Console, sitemap | Owner | Phase 2 approved |
| 3–7 | Baseline window. In parallel: sample proof artefacts, blog build (no publishing) | Agent | Deploy |
| 7+ | First two articles; monthly review begins | Agent + owner | Baseline |
| When supplied | Case studies | Agent + owner | Project inventory with permission |

This fits the existing roadmap: Phase 1 here is small enough to run before Session B. Phase 2 here **is** project-status Phase 5. The blog belongs to Phase 8.

Search results typically take months to move after changes. The 90-day goal is a correct, measured foundation and the first evidence of which pages earn impressions, not a traffic target.

## 10. Owner decisions needed (ranked)

1. Approve this plan and its order.
2. Deploy `dev` and set the analytics, verification and Resend variables.
3. Industry pages: `noindex` until a real project per industry exists, or keep indexed?
4. Merge Dart into Flutter (and Android/iOS into mobile app development)?
5. Supply any projects that may be described publicly, even anonymised.
6. Names for article authorship, or confirm Organization authorship.
7. Pricing posture: ranges, or drivers only.
