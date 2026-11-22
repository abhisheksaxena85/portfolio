# Outcome-First Site and Project Planner — Plan

> **Update 2026-10-18.** ADR-002 refocused the site on app development and published packages with starting prices. Sessions B–D are re-scoped: the planner's result recommends a package from `typicalGoals` in `src/content/packages.ts` and shows its price with `<Price>`, instead of price drivers and "we confirm after a call". The six goal pages and their slugs are unchanged. Planner work is still to do.

**Date:** 2026-10-13
**Status:** Proposal for owner approval. Covers Phase 2 (information architecture), Phase 3 (UX) and the plain-language work from the design plan.
**Problem it solves:** The site is organised the way engineers think (services, technologies, architecture diagrams) and speaks in engineering words. A non-technical owner cannot quickly answer the four questions they came with: what would I get, what will it cost, how long, and what do I have to do.

Related: [Visual and motion plan](../design/2026-10-12-visual-and-motion-plan.md) · [Discovery dossier](../research/2026-10-12-discovery-dossier.md) · [Project status](../project-status.md) · [DESIGN.md](../../DESIGN.md)

---

## 1. The idea in one paragraph

Reorganise the public site around **what the client wants to achieve** ("I want to take bookings online"), let the homepage **respond to the visitor** through a short project planner that produces a personalised, honest summary, and replace the architecture diagram in the hero with a **story told through sample screens**. Keep every technical page, one level down, for technical evaluators. Nothing is invented: the goal pages, the planner's answers and the sample screens are all derived from the services InvoSpec already offers and the facts the owner has confirmed.

## 2. Evidence

| Finding | Source | Consequence |
|---|---|---|
| Price is the first thing visitors want on any site; B2B sites hide it | Nielsen Norman Group, B2B usability | The planner shows what moves the price before asking for contact details |
| Demos, trials and peer experience are the most influential resources for buyers | TrustRadius, 2026 buyer survey (1,862 buyers) | Sample screens and the planner are the nearest a services firm gets to a demo |
| Competence and consistency are the top trust levers | Forrester, 2024 (1,420 buyers) | One vocabulary, one structure, no contradictions between pages |
| Every Indian competitor reviewed uses an engineer's taxonomy and "AI" headlines | Dossier §6 | The outcome-first layout is an open position |
| Trust strip promises "plain-English synopses"; service content has one technical term every 14 words | Jargon audit, 2026-10-13 | Plain language must be enforced, not aspired to |

## 3. Decisions (DECISION) and what is still open (PLACEHOLDER)

- DECISION: Primary navigation becomes **"I want to…"** with six goals. Services, Technologies and Industries remain as secondary navigation and in the footer.
- DECISION: Goal pages live under `/solutions/[slug]`, replacing the current mixed set. `app-store-publishing` keeps its slug. `startups`, `small-business` and `business-automation` are retired with permanent redirects (see §5).
- DECISION: The planner is a Client Component with state in the URL, no backend, no account, no cookies. Its output pre-fills the existing enquiry form.
- DECISION: The hero story uses **sample screens built in HTML and CSS**, labelled "Sample", never presented as client work. They replace the system diagram on the homepage only; diagrams stay on technical pages with two-line labels.
- DECISION: Readability becomes a gate: public copy at reading grade 9 or below, sentences under 20 words, checked by a script.
- PLACEHOLDER: Price ranges and typical durations per goal. Until the owner approves them the planner shows price *drivers* and "we confirm after a 30-minute call". With approved ranges the planner becomes materially more useful.
- PLACEHOLDER: Owner confirmation that the sample screens are acceptable.
- PLACEHOLDER: Owner confirmation of the six goals and the business types below.

## 4. The goal map

Each goal page answers, in this order: what you would get · how it works · what affects the price · what you need to bring · what happens after you contact us · questions people ask. Technical detail sits in a collapsed "Technical details" block for evaluators.

| # | Goal (nav label) | Slug | Who and trigger | What you would get (plain → technical second line) | Services behind it | Price drivers |
|---|---|---|---|---|---|---|
| 1 | Take bookings or orders online | `take-bookings-and-orders-online` | Clinics, salons, restaurants, shops, service businesses tired of phone and WhatsApp orders | Customer app or website · Staff screen · Reminders and notifications · Payments → (Flutter or web app, admin panel, Spring Boot API, MySQL, Firebase) | Web app, mobile app, backend | Number of screens; kinds of user; payments; existing systems to connect |
| 2 | Run deliveries or field staff from one screen | `run-deliveries-and-field-teams` | Logistics, distribution, home services, maintenance crews | Driver or technician app · Dispatcher screen · Live location · Proof of delivery → (Flutter, Spring Boot, MySQL, Maps) | Mobile app, backend, web app | Live tracking; offline use; number of roles; routing complexity |
| 3 | Replace spreadsheets and manual work with one system | `replace-spreadsheets-and-manual-work` | SMBs running operations on sheets, email and re-typing | One shared system · Automatic documents (invoices, labels) · Alerts when something goes wrong → (custom software, business automation, admin panel, APIs) | Custom software, business automation, backend | Number of workflows; documents to generate; systems to connect; data to migrate |
| 4 | Launch a product idea | `launch-a-product-idea` | Founders with an idea or designs, no technical team | A first version real users can try · A plan for what comes next → (MVP, SaaS foundations, mobile or web) | MVP, SaaS, mobile or web | Scope of the first version; platforms; payments and accounts; design depth |
| 5 | Fix or take over an existing app | `fix-or-take-over-an-existing-app` | Businesses whose developer left, or whose app breaks on new phones | A health check with a written report · Keys and accounts recovered · A maintenance plan → (code review, documentation, OS and dependency updates, monitoring) | Software maintenance | What exists and in what state; access to code and accounts; urgency |
| 6 | Get an app into the App Store and Google Play | `app-store-publishing` (exists) | Teams with a finished app and no release experience | Already built, fact-checked, with sources | App store publishing | Account type; readiness of the app; testers |

Business types the planner offers (for wording and examples only): clinic or health practice · shop or online store · restaurant or food · logistics or transport · services or agency · education · real estate · something else or a startup.

## 5. Sitemap v2

```
/                                  Homepage v2 (story hero, planner, goals, proof, how we work, price drivers, FAQ, contact)
/solutions                         "What do you want to achieve?" index (six goal cards)
/solutions/take-bookings-and-orders-online
/solutions/run-deliveries-and-field-teams
/solutions/replace-spreadsheets-and-manual-work
/solutions/launch-a-product-idea
/solutions/fix-or-take-over-an-existing-app
/solutions/app-store-publishing    (existing; becomes goal 6)
/services, /services/[slug]        Capability pages (kept; demoted to secondary nav; cross-link to goals)
/technologies, /technologies/[slug] Technical pages (kept; technical language allowed)
/industries, /industries/[slug]    Kept; each links to the goals most common in that industry
/about, /contact, /faq, /case-studies, /privacy, /terms  Unchanged

Redirects (301, in next.config):
/solutions/startups            → /solutions/launch-a-product-idea
/solutions/small-business      → /solutions/replace-spreadsheets-and-manual-work
/solutions/business-automation → /solutions/replace-spreadsheets-and-manual-work
/services/app-store-publishing → /solutions/app-store-publishing   (resolves the duplicate flagged in status)
```

Search intent per goal page: commercial investigation ("online booking app for clinic", "delivery tracking app for small business", "replace excel with software", "app developer left what to do", "publish app on google play"). Titles name the outcome and the audience, never the technology. One `h1`, Service and FAQPage schema where the content matches, BreadcrumbList everywhere.

## 6. The project planner

**Where:** homepage, directly under the hero; also at the top of `/solutions`.
**Flow:** three questions, one screen each, radio cards, back button, keyboard-operable, 60 to 90 seconds.

1. What kind of business? (eight types)
2. What do you want it to do? (six goals, plain labels)
3. Where are you today? idea only · designs or a spec exist · half-built app · live app that needs help

**Result panel** (rendered from `src/content/planner.ts`, no server call):
- "You would get": the parts, plain name first, technical name in small mono.
- "How it would go": the stages for that goal and stage (a live app starts with a health check; an idea starts with a short discovery).
- "What moves the price": the drivers for that goal, phrased as questions the owner can answer.
- "Typical duration": PLACEHOLDER until the owner approves ranges; shown as "confirmed after a 30-minute call".
- "Send this plan to us": opens the enquiry form with project type, stage and a readable summary pre-filled in the message. The visitor edits and sends.

**Rules:** composition is additive and transparent (goal → parts; stage → adjustments; business type → wording and examples). No scoring, no hidden logic, no claims of fit. Wording always "typically" and "we confirm".
**State:** in the URL query (`?biz=clinic&goal=bookings&stage=idea`) so a plan can be shared and returned to; no storage.
**Without JavaScript:** the three questions render as links to the goal pages, so nothing is lost.
**Analytics events** (Phase 8): `planner_start`, `planner_step`, `planner_complete` (business, goal, stage), `plan_sent`. These become the first qualified-lead metrics.
**Performance budget:** the planner adds at most 12 KB gzipped of client JavaScript; the homepage stays at Lighthouse mobile 95 or above.

## 7. The hero story

"Follow one order." Three sample screens in CSS device frames, shown in sequence, once:

1. A customer's phone: taps "Book Tuesday 10:00", sees confirmation.
2. The staff screen: the booking appears at the top of today's list, a reminder is scheduled.
3. The owner's phone: today's bookings and takings update.

Caption under the screens: "Your customers use the app, your team sees it instantly, you watch the numbers. We build all three parts and keep them running." A small "Sample app" label sits on each frame. Reduced motion shows all three at once. On phones the three frames stack. The system diagram with two-line labels stays on service and technology pages.

## 8. Plain language, enforced

- `src/config/vocabulary.ts`: one plain phrase per technical term (backend → the engine; database → your records; API → the connection; deployment → going live; staging → preview version; MVP → first version). Components render the plain word and the technical word as a secondary line.
- Rewrite pass on homepage, trust strip, goal pages, service deliverables: outcome first, then how; sentences under 20 words; no "synopses", "milestone criteria", "architecture" outside technical blocks.
- `TechnicalDetails` disclosure component (native `<details>`): stack, architecture, process depth for evaluators.
- First-use definitions for unavoidable terms (D-U-N-S, signing key, TestFlight).
- `scripts/readability.mjs`: scores every content file and page copy; fails above grade 9. Runs with `yarn lint`.
- Technology pages are exempt; their readers are technical.

## 9. Delivery sequence and gates

| Session | Work | Gate |
|---|---|---|
| **A. Structure and words** | Goal content in `src/content/goals.ts` (six entries, written for the owner's review); vocabulary map; goal page template built from the solution template with two-line labels and `TechnicalDetails`; `/solutions` index; navigation "I want to…"; redirects; homepage and trust-strip rewrite; readability script. | Owner approves the copy. Build, lint, typecheck, readability pass. Lighthouse mobile ≥ 95 on home and two goal pages. Every goal page answers the six questions in §4 in order. |
| **B. Planner** | `src/content/planner.ts` (parts, stages, drivers per goal and stage); `ProjectPlanner` client component; URL state; pre-filled enquiry; no-JS fallback; analytics event hooks; unit tests for the composition rules. | Keyboard-only completion; screen reader announces each step; no-JS fallback verified; homepage perf ≥ 95 and ≤ 12 KB added JS; 5 test runs produce the expected summary. |
| **C. Story hero and diagrams v2** | `DeviceFrame` and three sample screens; sequence animation; diagram two-line labels and compact phone variant; homepage section order finalised. | Screenshots at 375, 768, 1280 reviewed; reduced-motion check; CLS 0; LCP h1 unaffected. |
| **D. Usability check** | Five non-technical people and two technical people, 10 minutes each, remote; the hypotheses in §10. | Four of five pass each non-technical hypothesis, or the failing element is revised before Phase 5 content work continues. |

Rough effort: A two sessions, B one, C one, D half. Sessions A and C depend on owner decisions in §3; B can start immediately after A.

## 10. Usability hypotheses (Phase 3 deliverable)

| # | Hypothesis | Test |
|---|---|---|
| H1 | After five seconds on the homepage, four of five non-technical people can say what InvoSpec does in their own words | Five-second test, verbal answer |
| H2 | Four of five can find what affects the price within 30 seconds | Timed task |
| H3 | Four of five complete the planner in under 90 seconds and say the summary matches what they meant | Timed task plus question |
| H4 | Four of five can explain the three hero screens without reading the caption | Caption hidden, verbal answer |
| H5 | Both technical testers find the stack and process detail for a service within 60 seconds | Timed task on a goal page |
| H6 | Nobody reports a word they did not understand on the homepage or a goal page | Highlight task |

## 11. Risks and trade-offs

- **More pages, thin content.** Mitigation: exactly six goals, each with the six-question structure and at least one fact-checked section, like the publishing page.
- **Over-promising in the planner.** Mitigation: "typically" and "we confirm" wording; no numbers without owner approval; the output is a plan to discuss, not a quote.
- **Confusion between goals and services.** Mitigation: goals say "what you get", services say "what we do"; every goal page links to its services and vice versa; the duplicate publishing route is redirected.
- **Homepage weight.** Mitigation: planner budget of 12 KB; sample screens are CSS, not images; `content-visibility` on later sections; Sprint 1's DOM reduction applies.
- **Sample screens mistaken for client work.** Mitigation: a visible "Sample app" label, generic content, and no business names.

## 12. Decisions needed from the owner

1. Approve the six goals and the business-type list (§4).
2. Approve the redirects (§5), including `/services/app-store-publishing` → `/solutions/app-store-publishing`.
3. Confirm the sample screens are acceptable as labelled design assets (§7).
4. Provide price ranges and typical durations per goal, or confirm the planner shows drivers only for now (§6).
5. Approve the vocabulary mapping once drafted (§8), since it becomes the house style.

With 1 to 3 approved, Session A starts and the goal copy comes back for review before anything is built.
