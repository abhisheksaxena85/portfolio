# AI Task Protocol — InvoSpec Website

> **Standard workflow for every significant task.**
> Follow these steps in order. Do not skip steps.

---

## Quick Reference

```
UNDERSTAND → INSPECT → LOCATE → CHECK DOCS → IMPLEMENT → VALIDATE → REVIEW → DOCUMENT → SUMMARISE
```

---

## Step 1 — Understand the Request

- What is the user asking for?
- What is the **business purpose** of this change?
- What is the expected **user-facing outcome**?
- Is any information missing or ambiguous? → **Ask, don't assume**
- Does this request involve fabricating company information? → **Refuse and explain**

---

## Step 2 — Inspect Relevant Existing Files

**Before editing any file, read it.**

For UI changes:
- Read the component you plan to modify
- Read the parent page or layout
- Check if a similar component already exists in `src/components/`

For content changes:
- Read the content type definition in `src/types/`
- Read the relevant data file in `src/content/`

For SEO changes:
- Read `src/lib/seo/`
- Read the relevant page's `generateMetadata` function

For routing changes:
- Read `src/app/` structure
- Read `docs/architecture/routing.md`

---

## Step 3 — Identify the Architectural Location

Determine **where** the change belongs:

| Change type | Location |
|---|---|
| New page | `src/app/[route]/page.tsx` |
| New reusable section | `src/components/sections/` |
| New reusable UI element | `src/components/ui/` |
| New card | `src/components/cards/` |
| New form | `src/components/forms/` |
| New content type data | `src/content/[type]/` |
| New content type definition | `src/types/` |
| New SEO utility | `src/lib/seo/` |
| New JSON-LD generator | `src/lib/schema/` |
| Config change | `src/config/site.ts` or `src/config/navigation.ts` |

If the change does not fit an existing location, propose a new one and document the decision.

---

## Step 4 — Check Relevant Documentation

Load only what is needed (see `AGENTS.md` → Context Loading Guide):

- UI work: `design-system.md` + `ui-patterns.md`
- SEO work: `seo/strategy.md` + `seo/schema.md`
- Content work: `content-model.md` + `editorial-guidelines.md`
- Architecture work: `architecture/overview.md` + `architecture/routing.md`
- Security work: `development/security.md`

---

## Step 5 — Implement the Smallest Appropriate Change

- Make the **minimum necessary change** to achieve the goal
- Do not refactor unrelated code
- Do not introduce new patterns without justification
- Prefer extending existing components over creating new ones
- Keep Server Components as the default
- Add `'use client'` only if the component genuinely requires browser APIs or state

---

## Step 6 — Run Validation

After significant changes, run:

```bash
# TypeScript type checking
yarn typecheck

# ESLint
yarn lint

# Production build
yarn build
```

**Do not claim validation passed if you did not run it.**

For small/obviously correct changes (e.g., updating a text value), full build is optional but `typecheck` and `lint` are still recommended.

---

## Step 7 — Review SEO Implications

Ask:
- [ ] Did I change or add a page? → Does it have unique title, description, canonical?
- [ ] Did I change content? → Does it remain accurate and non-spammy?
- [ ] Did I add a dynamic route? → Does `generateStaticParams` work? Does `notFound()` handle bad slugs?
- [ ] Did I change the sitemap? → Will new pages be indexed correctly?
- [ ] Did I change JSON-LD? → Does it match the visible page content?

---

## Step 8 — Review Accessibility

Ask:
- [ ] Is the heading hierarchy correct? (one `<h1>` per page)
- [ ] Are all interactive elements keyboard accessible?
- [ ] Do all images have appropriate `alt` text?
- [ ] Are form inputs associated with labels?
- [ ] Are focus states visible?
- [ ] Is colour contrast sufficient?
- [ ] Is motion controlled by `prefers-reduced-motion`?

---

## Step 9 — Review Performance

Ask:
- [ ] Did I add a Client Component unnecessarily?
- [ ] Did I add a large dependency?
- [ ] Are images using `next/image`?
- [ ] Is any large data fetch blocking the render?
- [ ] Did I introduce layout shift (CLS)?

---

## Step 10 — Update Documentation (if required)

If the change affects:
- Routing → update `docs/architecture/routing.md`
- Design system → update `docs/design/design-system.md`
- Content model → update `docs/content/content-model.md`
- SEO strategy → update `docs/seo/strategy.md`
- A major architectural decision → create `docs/decisions/ADR-NNN-title.md`

Always add an entry to `docs/ai/change-log.md` for significant changes.

---

## Step 11 — Summarise

Provide a clear summary of:
- **What changed** (specific files)
- **Why it changed** (business reason)
- **What was validated** (tests/build run)
- **Remaining tasks or known limitations**
- **Any placeholders left that need company input**

---

## Special Cases

### Adding a New Service Page

1. Add service data to `src/content/services/`
2. Verify `[slug]/page.tsx` template handles the new data
3. Ensure `generateStaticParams` includes the new slug
4. Verify metadata is unique and accurate
5. Add JSON-LD `Service` schema
6. Add internal links from related technologies, industries, case studies
7. Update sitemap (automatic if using dynamic sitemap)

### Adding a New Blog Article

1. Create MDX file in `src/content/blog/`
2. Fill all required frontmatter fields
3. Do NOT fabricate information
4. Add internal links to related services and technologies
5. Verify reading time, author, date are accurate

### Changing the Contact Form

1. Read `src/components/forms/` first
2. Verify server-side validation (Zod)
3. Do not expose API keys
4. Test form submission logic
5. Update `docs/development/security.md` if backend changes

---

*Last updated: 2026-10-04*
