# ADR-002: App-first refocus and published packages

**Date:** 2026-10-18
**Status:** Accepted (owner decisions in conversation, 2026-10-18)
**Supersedes:** the "software engineering company" positioning in `docs/business/positioning.md` and the "drivers only" pricing posture (open question 3 in `docs/project-status.md`).

## Context

The site presented InvoSpec as a custom software company with seven services, eleven technology pages and no prices. The owner reviewed a proposal to become a productized app-development company and decided to refocus the whole site on app development, with packages and published starting prices.

## Decision

1. **Scope.** Mobile apps for iPhone and Android are the headline offer. Backends, admin panels and web portals are presented only as parts of an app project. The standalone web application, SaaS and custom software services are retired and redirected.
2. **Backend technology is not named.** Public copy describes what the backend does, never which server language, framework or database is used. It says the server technology is chosen per project, written into the plan and documented. Flutter, Android native and iOS native stay as technology pages.
3. **Structure.** The six goal pages under `/solutions` and every existing redirect stay. A new `/pricing` page lists the packages. Goal and service pages show the packages that usually fit.
4. **Published packages and starting prices** (FACT, owner-approved 2026-10-18):

   | Package | India (INR) | International (USD) | Unit |
   |---|---|---|---|
   | App Blueprint | 12,000–30,000 | 250–600 | project |
   | Lean MVP | 15,000–30,000 | 2,500–5,000 | project |
   | Business App | 2,50,000–5,00,000 | 5,000–10,000 | project |
   | Growth App | 5,00,000–12,00,000+ | 10,000–25,000+ | project |
   | Existing App Audit and Recovery | 10,000–25,000 | 250–600 | project |
   | Ongoing Maintenance | 10,000–30,000 | 250–750 | month |

   **Amended 2026-10-18 (owner):** App Blueprint removed from the site. Five packages remain; the row above is kept as the record of the original decision.

   **Amended 2026-10-18 (owner):** INR lowered for four packages to match Indian market rates; USD unchanged. Business App 1,50,000–2,00,000; Growth App 3,00,000–10,00,000+; Existing App Audit and Recovery 5,000–10,000; Ongoing Maintenance 5,000–10,000 per month. `src/content/packages.ts` holds the current prices.

   Lean MVP INR was first approved as 1,25,000–2,50,000 and lowered by the owner the same day to 15,000–30,000, in line with what other companies in India charge. The USD price is unchanged.

5. **Currency by visitor country.** Visitors in India see INR. Everyone else sees USD. The two lists are separate price lists, not conversions, and are used exactly as given.
6. **Package scopes.** The Lean MVP scope is owner-defined: one primary workflow, about 5–8 screens, one user role with simple sign-in, basic create/read/update/delete, a managed cloud backend, basic testing, crash reporting, deployment preparation, and a limited revision and support window. Payments, real-time tracking, more roles, data migration and third-party integrations are excluded unless written into the plan. The scopes of the other packages are drafted by the agent and need owner review before production deploy (marked `OWNER REVIEW` in `src/content/packages.ts`).
7. **Market.** The target market stays global. There are no separate India or international pages.
8. **Commercial rules stated on the site** (FACT, owner-approved with the packages): every price is a starting price; the exact price is in the written plan the client approves; hosting, store fees and third-party services are billed separately; production accounts are in the client's name; prices exclude taxes.

## Consequences

- Three service pages and eight technology pages are removed and redirected (`next.config.ts`). Two guides are renamed and redirected.
- No `Offer` structured data in v1. The visible price depends on the visitor's region, so a single schema price would not match every visitor's page. Revisit once the page has been live.
- Pages stay statically rendered. `src/proxy.ts` sets a region cookie from the host's country header, and a small client island shows the matching price. Without JavaScript both prices show.
- Positioning words "affordable" and "cheapest" and delivery-speed claims are not used. ADR-001's fact policy still applies to everything not listed above.
- `docs/business/positioning.md`, `docs/ai/project-context.md`, the content model, editorial guidelines, SEO docs and `AGENTS.md` are updated to match.
