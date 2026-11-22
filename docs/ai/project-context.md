# Project Context — InvoSpec Softwares Website

> **Canonical AI project context.** Read this before making significant decisions.
> Symbols used: `FACT` | `PLACEHOLDER` | `ASSUMPTION` | `DECISION`

---

## Company

| Field | Value | Status |
|---|---|---|
| Name | InvoSpec Softwares | FACT |
| Short name | InvoSpec | FACT |
| Legal name | InvoSpec Softwares | FACT (assumed same) |
| Contact email | contact@invospec.com | FACT |
| Phone | +91 87439 36469 | FACT (owner, 2026-10-15; replaces +91 72660 91327) |
| WhatsApp | +91 87439 36469 (same number) | FACT (owner, 2026-10-15) |
| Physical address | Sector 63, Noida, Uttar Pradesh, India (PIN code pending) | FACT (owner, 2026-10-12) |
| City / Region | Noida, Uttar Pradesh | FACT |
| Country | India | FACT |
| Founded | — | PLACEHOLDER |
| Team size | — | PLACEHOLDER |
| Website URL | https://www.invospec.com | FACT (live); set `NEXT_PUBLIC_SITE_URL` |
| LinkedIn | https://www.linkedin.com/company/invospec/ | FACT (owner, 2026-10-15) |
| Facebook | https://www.facebook.com/invospec/ | FACT (owner, 2026-10-15) |
| Instagram | https://www.instagram.com/invospec/ | FACT (owner, 2026-10-15) |
| YouTube | https://www.youtube.com/@InvoSpecOfficial | FACT (owner, 2026-10-16) |
| GitHub | — | PLACEHOLDER |
| Twitter/X | — | PLACEHOLDER |

---

## Business Model

**FACT:** InvoSpec Softwares builds and maintains software products for businesses and startups.

**DECISION (owner, 2026-10-18, [ADR-002](../decisions/ADR-002-app-first-refocus-and-published-packages.md)):** The public site is focused on **app development**. Mobile apps for iPhone and Android are the headline; backends, admin panels and web portals are presented only as parts of an app project. The company stays an engineering partner, not a generic agency or freelance service.

**Core lifecycle message:**

```
BUILD → LAUNCH → MAINTAIN → IMPROVE
```

The company takes ownership of software products through their full lifecycle — from initial development through production deployment and ongoing maintenance.

---

## Primary Services

All confirmed services from the original `index.html` and project brief:

| Service | Status |
|---|---|
| Custom software development | FACT |
| Mobile application development (iOS + Android) | FACT |
| Web application development | FACT |
| Full-stack system development | FACT |
| Backend / API development | FACT |
| Admin panel development | FACT |
| Software maintenance | FACT |
| Application maintenance | FACT |
| Cloud / deployment services | FACT |
| Google Play Store publishing | FACT |
| Apple App Store publishing | FACT |
| MVP development | FACT |
| SaaS development | FACT |
| Business automation | FACT |
| Ongoing feature development | FACT |
| Performance optimisation | FACT |

**DECISION (owner, 2026-10-18):** The website offers four services only: mobile app development, the app backend with admin panel and web portal, first-version (MVP) app development, and app maintenance. Web application, SaaS and custom software are no longer standalone offers on the site (the company may still deliver them as parts of an app project).

---

## Packages and Prices (owner, 2026-10-18)

FACT, owner-approved. Starting prices; the exact price is in the written plan the client approves. India visitors see INR, everyone else USD; the two are separate lists, not conversions. Prices exclude taxes. Hosting, store fees and third-party services are billed separately, and production accounts are in the client's name.

| Package | INR | USD | Unit |
|---|---|---|---|
| Lean MVP | 15,000–30,000 (owner, 2026-10-18, lowered from 1,25,000–2,50,000 to match Indian market rates) | 2,500–5,000 | project |
| Business App | 1,50,000–2,00,000 (owner, 2026-10-18, lowered from 2,50,000–5,00,000) | 5,000–10,000 | project |
| Growth App | 3,00,000–10,00,000+ (owner, 2026-10-18, lowered from 5,00,000–12,00,000+) | 10,000–25,000+ | project |
| Existing App Audit and Recovery | 5,000–10,000 (owner, 2026-10-18, lowered from 10,000–25,000) | 250–600 | project |
| Ongoing Maintenance | 5,000–10,000 (owner, 2026-10-18, lowered from 10,000–30,000) | 250–750 | month |

Lean MVP scope is owner-defined (see ADR-002). The scopes of the other four packages were drafted by the agent on 2026-10-18 and are **PLACEHOLDER until the owner reviews them** (`OWNER REVIEW` comments in `src/content/packages.ts`).

---

## Technology Stack (Company's Delivery Stack)

Confirmed from `index.html` capabilities section:

| Technology | Status |
|---|---|
| Flutter | FACT |
| Dart | FACT |
| Java | FACT |
| Spring Boot | FACT |
| REST APIs | FACT |
| MySQL | FACT |
| Firebase | FACT |
| Android (native) | FACT |
| iOS (native) | FACT |
| Web (general) | FACT |
| Node.js | FACT (owner, 2026-10-15) |
| PHP | FACT (owner, 2026-10-15) |
| TypeScript | FACT (owner, 2026-10-15) |
| JavaScript | FACT (owner, 2026-10-15) |

Additional technologies to confirm:
- React / Next.js — PLACEHOLDER (likely, not confirmed)
- PostgreSQL — PLACEHOLDER (not confirmed)
- MongoDB — PLACEHOLDER (not confirmed)

> **Rule:** Only create technology pages for technologies the company genuinely provides.
> Do NOT create pages for Node.js, React, etc. unless confirmed.

> **DECISION (owner, 2026-10-18):** Public copy never names backend technologies (Java, Spring Boot, Node.js, PHP, MySQL, Firebase and the like). It says what the backend does and that the server technology is chosen per project, written into the plan and documented. Only Flutter, Android native and iOS native have technology pages. The stack above stays true internally.

---

## Industries Served

Confirmed from `index.html`:

| Industry | Status |
|---|---|
| Education | FACT |
| Retail | FACT |
| Healthcare | FACT |
| Logistics | FACT |
| Finance | FACT |
| Real Estate | FACT |
| Professional Services | FACT |
| Marketplaces | FACT |
| Startups | FACT |
| Internal Tools (any industry) | FACT |

---

## Target Customers

**ASSUMPTION (based on services and positioning):**

- Early-stage startups building their first product
- SMBs replacing manual workflows with custom software
- Product companies needing a development team
- Companies with existing apps that need maintenance or new features
- Businesses wanting to publish an app to Google Play or App Store

**DECISION (owner, 2026-10-12):** Target market is **global** ("all"). Copy must not assume one currency or time zone; the company is based in Noida, India and says so.

**TODO: COMPANY INPUT REQUIRED** — Confirm primary customer segment(s)

---

## Positioning

**DECISION (owner, 2026-10-18, supersedes 2026-10-04):** Position as an **app development company** that engineers properly, not a "digital agency".

**Tagline:** "Build, launch and maintain your app"

**Core value proposition:**
> "We build, launch and maintain mobile apps for iPhone and Android, with the backend and admin panel each app needs, for businesses and startups. Clear packages with published starting prices."

**Differentiators we may claim:** published packages and starting prices; plain language; the client owns the code and the accounts; the full lifecycle (build, publish, maintain). Do not claim "affordable", "cheapest" or delivery speed.

**Differentiators (to confirm with company):**
- TODO: COMPANY INPUT REQUIRED — What genuinely differentiates InvoSpec?
- TODO: COMPANY INPUT REQUIRED — Do they have specialisation in a particular tech or industry?
- TODO: COMPANY INPUT REQUIRED — Any notable project types or client types?

---

## Confirmed Commercial Terms (owner, 2026-10-12)

| Claim used on the site | Status |
|---|---|
| Client owns the code and IP on payment | FACT (contractual) |
| Client gets repository access from day one | FACT (contractual) |
| Response times stated on the site (review within 24 hours; reply within one business day) | FACT (contractual) |
| Refunds: advance refundable only before work starts; non-refundable once work has started unless InvoSpec confirms in writing it cannot deliver (then the undelivered portion is refunded); third-party costs never refundable | FACT (owner, 2026-10-16; written into `/terms` clause 5) |

Still unconfirmed and kept under review: "senior architects on every project", "30-minute discovery call", "fixed pricing or sprint cadence", "staging previews every two weeks". Do not add new numeric promises without owner sign-off.

## Website Goals

| Priority | Goal |
|---|---|
| 1 | Generate qualified software-development leads via contact form |
| 2 | Rank organically on Google/Bing for software development queries |
| 3 | Be understood by AI-powered search systems (ChatGPT, Perplexity, etc.) |
| 4 | Establish technical credibility as a software engineering company |
| 5 | Showcase real engineering capabilities and project types |
| 6 | Be architecturally scalable for hundreds of future content pages |

---

## Brand Personality

**DECISION based on brief and company type:**

| Dimension | Direction |
|---|---|
| Tone | Professional, clear, specific, engineering-focused |
| Visual | Premium B2B, minimal, technical, clean |
| Voice | Confident but not arrogant; specific not vague |
| Feel | "An engineering company with excellent product design" |

**Avoid:**
- Generic agency language
- Excessive marketing claims
- Meaningless buzzwords
- Fake enthusiasm ("amazing", "revolutionary", "cutting-edge")

---

## Design Direction

**DECISION:** Dark-first design system with professional blue/indigo accent palette.

Confirmed from original site: colors `#5b7cff` (accent), `#7c5cff` (accent-2), `#22c7a4` (accent-3), dark background `#07111f`.

This palette should be preserved and extended into the design system.

Full design system → [`/docs/design/design-system.md`](../design/design-system.md)

---

## SEO Strategy Summary

**DECISION:** Implement SEO as a **consequence of an excellent, useful website** — not as keyword manipulation.

Three search intent levels:
1. **Top of funnel:** Educational ("What is software maintenance?")
2. **Middle of funnel:** Commercial investigation ("How much does a Flutter app cost?")
3. **Bottom of funnel:** Service pages ("Flutter app development services")

**Anti-patterns explicitly prohibited:**
- Doorway pages
- Keyword stuffing
- Thin technology/city pages
- Nearly identical service pages
- Fake testimonials or metrics for SEO

Full strategy → [`/docs/seo/strategy.md`](../seo/strategy.md)

---

## Content Strategy

**DECISION:** MDX for blog articles and case studies. TypeScript data files for services, technologies, industries.

**Content types:**
- Services (TypeScript data + page template)
- Solutions (TypeScript data + page template)
- Technologies (TypeScript data + page template)
- Industries (TypeScript data + page template)
- Case Studies (MDX with frontmatter)
- Blog Articles (MDX with frontmatter)
- FAQ entries (TypeScript data)

Full model → [`/docs/content/content-model.md`](../content/content-model.md)

---

## Conversion Strategy

Primary CTA: **"Start a Project"** → `/contact`
Secondary CTA: **"See packages and prices"** → `/pricing` (2026-10-18; `/case-studies` is empty and noindex)

Contact form collects:
- Name
- Company (optional)
- Email
- Phone (optional, placeholder +91 format)
- Project type (dropdown)
- Delivery timeline (optional)
- Message / project details

Current form backend: `formsubmit.co/contact@invospec.com` (from original HTML)
Future: Replace with Resend / SendGrid / webhook via env vars

---

## Important Constraints

1. **No fake content** — no fabricated clients, metrics, testimonials, or statistics
2. **No keyword stuffing** — every page must serve real users
3. **No doorway pages** — don't create location pages without real offices
4. **No autoplay video** — performance requirement
5. **Server Components default** — Client Components only when genuinely required
6. **Tailwind CSS only** — no external UI libraries unless specifically justified
7. **Zod for server-side validation** — no trusting raw form input

---

## Project Inputs Required

> **These items must be filled in by the company before launch.**
> AI agents must NEVER invent values for these fields.

```
[x] Physical address / location (PIN code still needed)
[x] Phone number
[ ] Year founded (also drives "Years building apps" in the homepage track record)
[ ] Delivery figures for the homepage track record: apps delivered, apps live on the App Store / Google Play, number of clients, and the month they were counted (src/content/track-record.ts; hidden until at least two are filled)
[ ] Team size (approximate)
[x] LinkedIn company URL
[ ] GitHub organisation URL
[ ] Twitter/X handle
[ ] Primary differentiators vs competitors
[ ] Real case studies (at minimum titles, industries, technologies used)
[ ] Author names and bios for blog articles
[ ] Any real client testimonials (with permission)
[x] Privacy Policy content (agent draft 2026-10-16 from owner's refund instruction; owner/lawyer review before deploy)
[x] Terms of Service content (agent draft 2026-10-16; owner/lawyer review before deploy)
[ ] Cookie policy (if applicable)
[ ] Google Analytics ID (NEXT_PUBLIC_GA_ID)
[ ] Production domain (NEXT_PUBLIC_SITE_URL)
[ ] Email service API key (RESEND_API_KEY or equivalent)
```

---

*Last updated: 2026-10-18 (app-first refocus and packages, ADR-002)*
