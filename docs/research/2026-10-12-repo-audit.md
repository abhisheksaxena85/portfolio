# Repository Audit — 2026-10-12

**Scope:** Current state of the `dev` branch at commit `ef15867`, plus the live homepage at www.invospec.com.
**Purpose:** Record what exists, what to preserve, and what blocks later phases. No source files were changed during this audit.

---

## 1. What exists

| Area | State |
|---|---|
| Framework | Next.js 16.3.8 (App Router), React 19.2.8, TypeScript 5, Tailwind CSS v4, ESLint 9. Yarn 1 lockfile. |
| Checks run | `npx tsc --noEmit` → exit 0. `yarn lint` → exit 0. Production build **not run** (deferred to Phase 7). |
| Routes | `/`, `/services` (+8 slugs), `/solutions` (+4), `/technologies` (+8), `/industries` (+6), `/case-studies`, `/about`, `/contact`, `/faq`, `/privacy`, `/terms`, `sitemap.ts`, `robots.ts`, `not-found.tsx`. No `/blog`. |
| Content | TypeScript data files in `src/content/` (services, solutions, technologies, industries, faqs). No MDX. |
| Config | `src/config/site.ts` is the single source of company facts. No `navigation.ts`; nav links are hardcoded in `Navigation.tsx` and `Footer.tsx`. |
| SEO | Per-page metadata with canonical and Open Graph; Organization JSON-LD in root layout; dynamic sitemap; robots allows all, disallows `/api/`. No `src/lib/seo` or `src/lib/schema` helpers yet (docs describe them as planned). |
| Forms | `ContactForm.tsx` → server action `submitContactForm` (manual validation, honeypot, **logs to console only**). `ConsultationForm.tsx` (used on 6 inner pages) **fakes success with a timeout and sends nothing**. |
| Design | Light theme implemented (`#FAFAF8` canvas, cobalt `#2563eb`/`#004ac6`, Manrope). Docs still describe a dark-first system with `#07111f` background and Inter. |
| Fonts/icons | Inter and Geist Mono loaded via `next/font` but Manrope and Material Symbols are loaded from Google Fonts via `<link>` in `layout.tsx`; the `next/font` variables appear unused. |
| Animation | `framer-motion` used in `HomeHero.tsx` (including an infinite floating loop) and `ServiceTabs.tsx`. |
| Images | 4 raw `<img>` tags and 4 `next/image` imports. Hero uses a raw `<img>` for `/assets/hero_apps.jpg`. |
| Env | No `.env.example`. A Google site-verification token is hardcoded in `layout.tsx`. |
| Docs | Thorough `/docs` set from 2026-10-04. Content-model doc and `src/types/content.ts` have drifted (field names, file layout). No `docs/decisions/`. |
| Live site | Homepage HTML matches this repository's homepage (same H1 and sections). |

---

## 2. Blocking issues (must be resolved before Phase 2 content work builds on them)

### 2.1 Fabricated or unverifiable claims (violates AGENTS.md "Never fabricate")

| Location | Claim | Required action |
|---|---|---|
| `src/app/page.tsx` ~L236–309 | "14% route idle time", "420 carrier trucks", "38% Route Efficiency Gain", "100% Launch Uptime" | Remove or replace with `[PLACEHOLDER: real case study]` |
| `src/app/case-studies/page.tsx` | Three invented case studies: "12 Weeks to Production", "95% shared codebase", "60% battery", "approval on first submission" | Remove; replace with an honest empty state until real studies exist |
| `src/components/sections/SelectedWork.tsx` | "reduced courier phone battery drain by 60%", "sub-1-second" | Remove |
| `src/components/sections/AboutCompany.tsx` L52 | Founding narrative ("was founded to give business owners…") | Mark PLACEHOLDER; owner to supply |
| `src/app/page.tsx` L461, L617 | "You work directly with senior architects"; "engineering directors review… within 24 hours" | Owner confirmation required |
| `src/app/contact/page.tsx` | "Technical Review within 24 Hours", "30-minute call", "fixed pricing or sprint cadence" | Owner confirmation required |
| `src/app/actions/contact.ts` success message | "respond within one business day" | Owner confirmation required |
| Multiple files | "100% IP & Code Ownership" (About, Hero, WhyUs, TrustGuarantees, CostFactors, FAQ, Terms, service pages) | Owner must confirm the contract says this; then keep |
| `src/app/page.tsx` trust strip | "Weekly plain-English synopses", "staging previews every two weeks", "Guaranteed ongoing maintenance" | Owner confirmation required |

### 2.2 Lead loss

- `ConsultationForm.tsx` does not submit anywhere. It is rendered on service, solution, technology and case-study pages.
- `submitContactForm` validates and then only `console.log`s. No email or storage backend.
- No rate limiting. Validation is hand-written rather than Zod (docs require Zod).

Recommendation: a small, isolated hotfix in Phase 6 scope but scheduled first: one shared server action, Zod schema, honeypot, simple rate limit, delivery backend via environment variables, and `.env.example`.

---

## 3. Non-blocking technical debt (schedule in Phases 4 and 6)

1. Replace `<link>` Google Fonts and Material Symbols with `next/font` (Manrope) and inline SVG icons. Removes two render-blocking stylesheets and an icon font.
2. Remove or justify `framer-motion` (AGENTS.md: no heavy animation libraries). The hero's infinite loop also conflicts with the restrained-motion rule and `prefers-reduced-motion`.
3. Convert remaining `<img>` tags to `next/image`.
4. Move the Google verification token to an environment variable.
5. Extract navigation to `src/config/navigation.ts` as the docs specify.
6. Reconcile `docs/design/design-system.md` (dark-first) with the implemented light theme; the brief's preferred direction is light. Record as an ADR in Phase 4.
7. Reconcile `docs/content/content-model.md` with `src/types/content.ts` (for example `title` vs `name`, `deliverables` vs `servicesIncluded`, single file vs folder).
8. Add `yarn typecheck` script (docs reference it; it does not exist).
9. Consultation form placeholder phone format is `+1 (555) 000-0000` while the company is in India; resolve with the geography decision.
10. `/privacy` and `/terms` contain substantive legal text that was not supplied by the owner; treat as PLACEHOLDER requiring legal review.
11. Next.js 16 docs ship in `node_modules/next/dist/docs/`; the system note says APIs differ from training data. Read them before Phase 6 changes.

---

## 4. What to preserve

- The App Router structure, typed content files, per-page metadata, sitemap and robots.
- The plain-language homepage narrative and section order (hero, trust strip, what we build, cost factors, how we work, FAQ, contact). It aligns with the brief's required homepage content.
- The light visual direction, cobalt accent and subtle borders. They match the brief's preferred direction better than the documented dark system.
- `src/config/site.ts` as the single source of truth.
