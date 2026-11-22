# Changelog

Newest first. Every change follows [RULES.md](RULES.md).

---

## 2026-11-22 · v1.4.1 · Fix swapped founder photos

### Requested
The founder and co-founder photos were swapped.

### Changed
| Change | Files |
| --- | --- |
| Swapped the two image files. Sachin Srivastava (Founder) now shows the suit portrait and Ashutosh Singh (Co-founder) the outdoor photo. Files renamed to `sachin-srivastava.jpg` / `ashutosh-singh.jpg` so the new image URLs bypass Next's image cache and browser caches, which kept serving the old versions under the old names | `public/people/sachin-srivastava.jpg`, `public/people/ashutosh-singh.jpg`, `src/data/profile.ts` |

### Verification
- `npm run build`: pass · card checked in Chrome

---

## 2026-11-22 · v1.4 · Founder photos

### Requested
Add the founders' profile photos (supplied by the owner as two images).

### Changed
| Change | Files |
| --- | --- |
| Owner-supplied photos cropped square around the face (Sachin 300px, Ashutosh 240px) and wired to the founders in the ElNovaLabs card, replacing the initials fallback. Image order assumed to match the order the profiles were given: 1st = Sachin Srivastava, 2nd = Ashutosh Singh | `public/people/sachin.jpg`, `public/people/ashutosh.jpg`, `src/data/profile.ts` |

### Not changed / follow-ups
- Resolves the v1.3 founder-photo follow-up. If the two photos are swapped, swap the `photo` values in `profile.ts`.

### Verification
- `npx tsc --noEmit`: pass · `npm run lint`: pass · `npm run build`: pass
- ElNovaLabs card checked in Chrome: both photos render in the Founders row.

---

## 2026-11-22 · v1.3 · Profile panel text, LinkedIn profile photo

### Requested
1. Remove the "3 years of experience" text shown with the profile photo.
2. Use the LinkedIn profile photo.
3. Add the founders' LinkedIn profile photos.

### Changed
| # | Change | Files |
| --- | --- | --- |
| 1 | Profile panel subtitle is now just "Software Engineer". Removed the unused `profile.experience` field. The hero summary, spotlight and stats still mention 3 years, since those weren't part of this request | `src/components/Nav.tsx`, `src/data/profile.ts` |
| 2 | `public/people/abhishek.jpg` replaced (it was the temporary GitHub avatar) with the owner's LinkedIn headshot from `~/Downloads/linkedin_profile_image_with_background_edit.png`, cropped to a 480px square centered on the face | `public/people/abhishek.jpg`, `src/data/profile.ts` (comment) |

### Not changed / follow-ups
- **Founder photos: still pending.** LinkedIn can't be accessed from this environment, and no local copies were found. To add them, save each photo as `public/people/sachin.jpg` and `public/people/ashutosh.jpg` and set `photo` on each founder in `profile.ts` (or provide the image files / direct image URLs).

### Verification
- `npx tsc --noEmit`: pass · `npm run lint`: pass · `npm run build`: pass
- Header checked in Chrome: photo renders in both the expanded panel and the compact nav.

---

## 2026-11-22 · v1.2 · Profile header, founders, updated positioning

### Requested
1. Profile photo + name in the header. At the top it should expand like a section with no nav bottom line, showing name and total experience on the left. On scroll it should merge into the nav as before, and clicking it should expand it again. The photo should come from LinkedIn.
2. Add the ElNovaLabs founder and co-founder (LinkedIn: `sachinsrivastava24`, `ashutosh-singh-b5b771189`) at the bottom of the current-role card: horizontal, titled "Founders", compact.
3. Don't imply only two projects are live. Say 15+ projects are live on the Play Store and in production.
4. Experience should say I worked on the Spring Boot / MySQL backends of Twizzr and Softboard Lite.
5. Intro shouldn't position me as Flutter-only. Say software engineer across Flutter (mobile), native Android and Spring (backend).

### Changed
| # | Change | Files |
| --- | --- | --- |
| 1 | Header is now a fixed client component with an animated profile panel (grid-rows height animation, avatar scale/fade). Expanded at the top with a transparent border and solid background; collapses after 24px of scroll. The small avatar re-opens it, and it closes after 80px of scroll or on Escape. A constant-height spacer avoids layout jumps. New shared `Avatar` with an initials fallback. **Side effect:** hero top padding reduced (`pt-20/28` → `pt-6/10`) so the page doesn't start too low under the taller header | `src/components/Nav.tsx`, `src/components/Avatar.tsx`, `src/components/sections/Hero.tsx`, `src/data/profile.ts` (`experience`, `photo`), `public/people/abhishek.jpg` |
| 2 | `founders` added to the ElNovaLabs role: Sachin Srivastava (Founder) and Ashutosh Singh (Co-founder), linking to their LinkedIn profiles. Shown as a single compact row (32px avatars) under the tags | `src/data/profile.ts`, `src/components/sections/Experience.tsx` |
| 3 | Stat "2 enterprise apps live" → "15+ projects live on Play Store & in production". Spotlight copy now reads "20+ projects delivered, with 15+ live…" (figure from the owner) | `src/data/profile.ts`, `src/components/sections/Hero.tsx` |
| 4 | New ElNovaLabs bullet on the Spring Boot + MySQL backend work for Twizzr and Softboard Lite. Tags add Spring Boot, MySQL | `src/data/profile.ts` |
| 5 | Summary rewritten: mobile + backend, naming Flutter, native Android and Spring Boot | `src/data/profile.ts` |

### Not changed / follow-ups
- **Photos from LinkedIn: pending.** Automated access to LinkedIn isn't available here, so:
  - Profile photo: `public/people/abhishek.jpg` is a **temporary copy of the GitHub avatar**. Save the LinkedIn photo over this file (square, ≥ 400px) and no code change is needed.
  - Founders: `photo: null` shows initials. Add `public/people/sachin.jpg` / `public/people/ashutosh.jpg` and set `photo` in `profile.ts`.
- Founder names come from the LinkedIn URLs, and Founder vs Co-founder from the order given. Confirm both against the profiles.
- Hero headline ("I build mobile apps…") left as is. The request covered the intro paragraph only.
- Featured project badges ("Live on App Store & Google Play") are per-product facts and were kept.
- Skills from LinkedIn (v1.1 follow-up) still pending.

### Verification
- `npx tsc --noEmit`: pass · `npm run lint`: pass · `npm run build`: pass, `/` static
- Playwright + Chrome (light 1366px, dark 390px): top → expanded (193px, transparent border); scroll 700px → collapsed (65px, border); avatar click → expanded; +300px scroll → collapsed; back to top → expanded. No console errors, no horizontal overflow.

---

## 2026-11-22 · v1.1 · Theme refresh, product showcase, quick-contact buttons

### Requested
1. Dark theme was too dark and cards blended into the background; lift both the page and the cards.
2. Create a `docs/` folder to record changes and the rules for making them.
3. Light-theme switch "not working"; make light mode pure white with a blue main button.
4. *Currently* block should say **20+ projects** and **3 years** of experience (not 2.5).
5. Experience should mention freelance and personal projects, without listing them.
6. Twizzr and Softboard Lite should use information, logos and images from elnovalabs.com.
7. Remove the History section. Use skills from LinkedIn instead of the resume.
8. Floating WhatsApp button (bottom-right) and email button (bottom-left) with a pre-filled "just visited your portfolio" message.

### Changed
| # | Change | Files |
| --- | --- | --- |
| 1 | Dark tokens lifted from near-black to charcoal (`--bg #17181b`, `--surface #212226`, `--line #303238`). Experience cards now use `bg-surface` | `src/app/globals.css`, `src/components/sections/Experience.tsx`, `src/app/layout.tsx` (theme-color) |
| 2 | Added `docs/` with RULES, DESIGN and this CHANGELOG. Linked from `AGENTS.md` and `README.md` | `docs/*`, `AGENTS.md`, `README.md` |
| 3 | **Root cause:** the dev server was opened through the LAN IP (`192.168.31.119`). Next.js 16 blocks dev assets cross-origin, so the page never hydrated and no click handlers ran. The production build was unaffected. Fixed with `allowedDevOrigins`. Light theme: `--bg #ffffff`, cards `#f6f8fb`. New `--primary` token: blue main buttons with white text in both themes | `next.config.ts`, `src/app/globals.css`, `src/components/sections/Hero.tsx` |
| 4 | Summary, *Currently* spotlight and stats updated: 3 years, 20+ projects (figures from the owner) | `src/data/profile.ts`, `src/components/sections/Hero.tsx` |
| 5 | New "Freelance & Personal Projects" entry in Experience with a single line and no project list. `tags` is now optional on roles | `src/data/profile.ts`, `src/components/sections/Experience.tsx` |
| 6 | Featured projects rebuilt with app icon, 3 App Store screenshots, App Store / Google Play / website links and an EL Nova Labs credit. Copy taken from elnovalabs.com and twizzr.in. ElNovaLabs logo added to the Experience card. Softboard Lite's store listing is "Members – Lite" (bundle `com.enl.softboardLiteMobileMembers`) | `src/data/profile.ts`, `src/components/sections/Projects.tsx`, `public/projects/**`, `public/logos/elnovalabs.png` |
| 7 | History section and nav link removed. Sections renumbered (Contact 05 → 04) | `src/components/sections/Journey.tsx` (deleted), `src/app/page.tsx`, `src/components/Nav.tsx`, `src/components/sections/Contact.tsx` |
| 8 | `FloatingContact` added: `mailto:` with subject "Just visited your portfolio — let's connect", and `wa.me/918528284249` with a pre-filled message. Labels collapse to icons on phones. Footer gets bottom padding so the buttons don't cover it | `src/components/FloatingContact.tsx`, `src/components/icons.tsx`, `src/data/profile.ts`, `src/components/sections/Contact.tsx` |

### Not changed / follow-ups
- **Skills from LinkedIn: pending.** LinkedIn blocks automated access (HTTP 999), so the Technologies section still uses the resume skills. Paste the LinkedIn skills list and only the `stack` array in `src/data/profile.ts` needs updating.
- Hero headline, the GitHub projects grid and the Contact block copy were left as they were.

### Verification
- `npx tsc --noEmit`: pass
- `npm run lint`: pass
- `npm run build`: pass, `/` prerendered static
- Playwright + Chrome: theme toggle light → dark → light works; no horizontal overflow at 1366px or 390px in either theme; floating button hrefs checked.

---

## 2026-11-22 · v1.0 · Initial build

- Next.js 16 App Router + Tailwind v4 single-page portfolio, built from the resume (`Abhishek Saxena CV_spn.pdf`) and public GitHub repos.
- Sections: Hero with ex-Microsoft spotlight, Experience, Projects, Technologies, History, Contact.
- Light / dark themes with a no-flash inline script. All content lives in `src/data/profile.ts`.
- Phone number deliberately left off the page (added in v1.1 only as the WhatsApp link, at the owner's request).
