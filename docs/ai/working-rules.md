# AI Working Rules — InvoSpec Website

> Rules AI agents **must follow** on every task in this repository.

---

## Before Touching Any Code

- [ ] Read `AGENTS.md` at the root
- [ ] Inspect the files you plan to modify **before** modifying them
- [ ] Search for existing components, utilities, or patterns before creating new ones
- [ ] Check whether the change affects SEO, performance, or accessibility

---

## Code Integrity Rules

### Inspect Before Editing
Never assume file contents. Read the file first, then edit.

### Follow Existing Architecture
Do not create a new pattern if one already exists.
Do not introduce a parallel component system.
Do not add a new folder structure without justification.

### Reuse Components
Before creating any component, search:
```
src/components/
src/ui/
```
If a similar component exists, extend it — don't duplicate it.

### No Unnecessary Dependencies
Before adding any `npm` / `yarn` package:
1. Check if the built-in Next.js / React / TypeScript API can solve it
2. Check if an existing utility in `src/lib/` already does it
3. Only add if genuinely necessary
4. Document the reason in the PR / change log

### No Silent Behaviour Changes
Never silently change:
- Business logic
- Form submission targets
- SEO metadata defaults
- Navigation structure
- Content model fields

If you change any of these, document it in [`/docs/ai/change-log.md`](./change-log.md).

---

## Content / Information Rules

### Absolute Prohibitions — Never Do These

| Rule | Category |
|---|---|
| Never invent revenue or growth figures | Anti-hallucination |
| Never invent client names | Anti-hallucination |
| Never invent project results or metrics | Anti-hallucination |
| Never invent testimonials | Anti-hallucination |
| Never invent team sizes | Anti-hallucination |
| Never invent years of experience | Anti-hallucination |
| Never invent awards or certifications | Anti-hallucination |
| Never invent partnership claims | Anti-hallucination |
| Never invent office locations | Anti-hallucination |
| Never invent ratings or review counts | Anti-hallucination |
| Never keyword-stuff page content | Anti-spam |
| Never create thin pages for SEO | Anti-spam |
| Never create near-identical service pages | Anti-spam |
| Never create fake city/location pages | Anti-spam |
| Never create doorway pages | Anti-spam |
| Never fabricate comparison content | Anti-spam |

### Use Placeholders Correctly

When information is unknown, use:
```
[PLACEHOLDER: Company Description]
TODO: COMPANY INPUT REQUIRED — phone number
```

Never silently omit required fields or fill them with invented data.

---

## SEO Rules

- Do not optimise content **only** for search engines
- Every indexable page must provide **independent value to a human reader**
- Do not add keywords to content unless they are natural and accurate
- Do not create pages just to target a keyword phrase
- Ensure every page has a unique title and meta description (via Next.js Metadata API)
- Do not create near-duplicate pages
- Internal links must be genuinely useful — do not add links purely to pass SEO value

---

## Performance Rules

- Never add a large JavaScript library without explicit justification
- Never add autoplay video
- Never block rendering on client-side data fetching for content that can be static
- Use `next/image` for all images
- Use `next/font` for all fonts
- Prefer Server Components; only use `'use client'` when genuinely required

---

## Accessibility Rules

- Never remove semantic HTML in favour of divs
- Never remove visible focus indicators
- Never add decorative images without `alt=""`
- Never add informative images without descriptive `alt` text
- Always associate form inputs with `<label>`
- Always provide keyboard navigation for interactive elements

---

## Security Rules

- Never put API keys, tokens or credentials in source code
- Never put secrets in client-side code (anything in `'use client'` files or `NEXT_PUBLIC_` vars)
- Always validate form input on the server (use Zod)
- Never trust user-submitted data without sanitisation

---

## Documentation Update Rules

Update documentation when you change:
- The routing structure → `docs/architecture/routing.md`
- The design system (tokens, patterns) → `docs/design/design-system.md`
- The content model (fields, types) → `docs/content/content-model.md`
- An SEO decision → `docs/seo/strategy.md`
- A major architectural decision → create `docs/decisions/ADR-NNN-title.md`
- Any significant change → add entry to `docs/ai/change-log.md`

---

## Validation Checklist (after significant changes)

```
[ ] yarn typecheck — no TypeScript errors
[ ] yarn lint      — no ESLint errors
[ ] yarn build     — production build succeeds
[ ] All dynamic routes return data or notFound()
[ ] Metadata API returns unique title + description per page
[ ] Sitemap includes new pages
[ ] No broken internal links introduced
[ ] No accessibility regressions (keyboard nav, alt text, labels)
[ ] Core Web Vitals considerations reviewed
[ ] JSON-LD matches visible page content
```

---

*Last updated: 2026-10-04*
