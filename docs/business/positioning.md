# Business Positioning — InvoSpec Softwares

> Defines how the company presents itself, who it serves, and how to talk about its work.
> Project context → [`/docs/ai/project-context.md`](../ai/project-context.md)
> Decision record → [`ADR-002`](../decisions/ADR-002-app-first-refocus-and-published-packages.md) (2026-10-18, supersedes the 2026-10-04 "software products" positioning)

---

## Core Positioning Statement

> "InvoSpec Softwares builds, launches and maintains mobile apps for businesses and startups."

Tagline: **"Build, launch and maintain your app."**

This is the single most important sentence on the website. Every other piece of content supports it.

---

## The Lifecycle Framing

The lifecycle stays, applied to apps:

```
PLAN        →    BUILD       →    LAUNCH         →    MAINTAIN
Written plan     App + backend    App Store and       Updates, fixes,
and price        + admin panel    Google Play         monitoring
```

Each stage has a package with a published starting price (see `src/content/packages.ts` and `/pricing`).

---

## What The Company Is NOT

| NOT | IS |
|---|---|
| A design agency | An app development company that engineers properly |
| A freelancer | A company with a team |
| A digital marketing agency | A product development company |
| A generalist "we build anything" shop | Focused on mobile apps and what sits behind them |
| The cheapest app developer | Clear packages, published starting prices, no surprises |

---

## What We Sell

| Offer | Where it lives |
|---|---|
| Mobile app development (iPhone and Android, Flutter or native) | `/services/mobile-app-development` |
| The app backend, admin panel and web portal | `/services/backend-api-development` (URL kept; retitled) |
| First-version (MVP) apps | `/services/mvp-development` |
| App maintenance and support | `/services/software-maintenance` |
| Store publishing | `/solutions/app-store-publishing` |
| Five packages with starting prices | `/pricing` |

The backend is always part of an app project. Copy never names backend technologies; it says what the backend does and that the server technology is chosen per project and documented.

---

## Target Customers

**ASSUMPTION (to be confirmed with company):**

- **Founders** who want a first version of an app without hiring a team (Lean MVP).
- **Small and mid-sized businesses** that want an app for customers or staff: bookings, orders, deliveries, field work, replacing spreadsheets (Business App, Growth App).
- **Owners of an existing app** whose developer left or whose app is unreliable (Existing App Audit, Ongoing Maintenance).

---

## Problems The Company Solves

| Customer says | We answer with |
|---|---|
| "I have an app idea but no technical team" | Lean MVP |
| "Customers keep phoning to book or order" | Bookings or orders app (Lean MVP or Business App) |
| "My team runs on spreadsheets and WhatsApp" | An app for the team with an admin screen behind it |
| "My drivers and field staff need one app" | Delivery and field app (Business or Growth App) |
| "I built an app but cannot get it into the stores" | Store publishing |
| "Our app developer disappeared" | Existing App Audit and Recovery |
| "Our app breaks on new phones" | Ongoing Maintenance |

---

## Value Proposition

**Primary:** Clear packages, published starting prices, plain language, and you own the code and every account.

Supporting proof points still needed: TODO: COMPANY INPUT REQUIRED — real project examples (see `docs/project-status.md`, open question 1).

---

## Primary CTAs

| Placement | CTA | Destination |
|---|---|---|
| Navigation (desktop) | "Start a Project" | `/contact` |
| Hero (primary) | "Discuss your app" | `/contact` |
| Hero (secondary) | "See packages and prices" | `/pricing` |
| Package cards | "Ask about this package" | `/contact?package=<slug>#enquiry` |
| Service and goal pages | "Discuss your app" | enquiry form on the page |
| Footer | "Start a Project" | `/contact` |

---

## Brand Voice

| Attribute | Description |
|---|---|
| Confident | States what it does clearly, without hedging |
| Honest | Doesn't promise what it can't deliver |
| Specific | Real platforms, real store rules, real package scopes |
| Professional | B2B tone; not casual, not stiff |
| Grounded | No hype, no "revolutionary", no "game-changing" |

**The test:** Would a founder trust this company with their first app budget after reading the website? The website should make the answer "yes."

---

## What The Website Must NOT Claim

- Specific employee count (unknown)
- Specific years in operation (unknown)
- Specific number of projects or apps completed (unknown)
- Specific client names (unknown / not confirmed)
- Specific revenue or growth (unknown)
- Awards or certifications (unknown)
- "Top-rated", "award-winning", "affordable", "cheapest" (unsubstantiated or price-led)
- Delivery speed ("launch in N weeks") without delivery data
- Prices other than the published package ranges; discounts; a final price before a written scope
- Names of backend technologies (owner decision, 2026-10-18)

---

*Last updated: 2026-10-18*
