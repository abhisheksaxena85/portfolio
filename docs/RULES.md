# Change Rules

These rules apply to every change to this portfolio, whether it's made by a person or an AI agent.
Read them before you touch any file.

## 1. Change only what was asked

- Modify **only** the section, component, token or content item named in the request.
- Do **not** restyle, reword, reorder or "clean up" anything that wasn't mentioned, even if it looks improvable.
  Suggest it separately instead.
- If a request is ambiguous, ask first. Don't widen the scope to cover guesses.
- When something has to change as a side effect (e.g. renumbering section labels after removing a section),
  keep it to the minimum and list it in the changelog entry.

## 2. Put each change in the right place

| What you're changing | Where it lives |
| --- | --- |
| Any text, numbers, links, projects, roles, skills | `src/data/profile.ts`, never hard-coded in components |
| Colours (light / dark) | CSS variables in `src/app/globals.css`. Edit the `[data-theme="dark"]` block **and** the no-JS `@media` fallback together |
| Fonts | `src/app/layout.tsx` |
| Section layout / markup | The matching file in `src/components/sections/` |
| Shared UI (nav, tags, section header, icons, floating buttons) | `src/components/` |
| Images (logos, app icons, screenshots) | `public/logos/`, `public/projects/<project>/` |

## 3. Facts must be true

- Only publish claims you can back up: the resume, public store listings, the company website, or the owner's explicit instruction.
- Don't invent metrics, dates, clients or achievements. If a number comes from the owner (e.g. "20+ projects"),
  record that in the changelog entry.
- Third-party product assets (Twizzr, Softboard Lite) come from EL Nova Labs' public site and the App Store listings.
  Keep the "A product by EL Nova Labs" credit.

## 4. Keep it lightweight

- No new runtime dependencies without a clear reason, recorded in the changelog.
- No animation or UI libraries. Use CSS only and respect `prefers-reduced-motion`.
- Prefer `next/image` for images. Keep screenshots ≲ 30 KB each (WebP).

## 5. Verify before calling it done

Run all of these and record the results in the changelog entry:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Then check the page in **both themes** and at **phone width (390px)**: no horizontal scroll, and the theme toggle still works.

## 6. Document every change

Add an entry at the top of [`CHANGELOG.md`](CHANGELOG.md) with:

1. Date and a short title
2. What was requested, quoted or paraphrased
3. What changed, and the files touched
4. Anything deliberately **not** changed, plus open follow-ups
5. Verification results
