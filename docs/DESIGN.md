# Design Reference

A clean, editorial single page with two themes and one accent colour.

## Themes

The theme is set by `data-theme="light" | "dark"` on `<html>`. An inline script in `src/app/layout.tsx`
applies the saved choice (`localStorage.theme`) or the OS preference before first paint.
`ThemeToggle` flips the attribute and saves the choice.

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| `--bg` | `#ffffff` | `#17181b` | Page background |
| `--surface` | `#f6f8fb` | `#212226` | Cards, pills, stat tiles |
| `--fg` | `#0f1115` | `#ececee` | Primary text |
| `--muted` | `#5a5f6a` | `#a9abb2` | Body copy |
| `--subtle` | `#8a909b` | `#767982` | Meta text, labels |
| `--line` | `#e4e8ee` | `#303238` | Borders, dividers |
| `--accent` | `#2563eb` | `#82a0ff` | Highlights, badges, links |
| `--accent-soft` | `#eaf1ff` | `#232a40` | Accent backgrounds |
| `--primary` | `#2563eb` | `#3b68f0` | Main buttons (white text) |
| `--primary-hover` | `#1d4ed8` | `#4d77f5` | Main button hover |
| `--dot` | `#dfe4ec` | `#2c2e33` | Hero dot grid |

Tailwind utilities map to these tokens: `bg-bg`, `bg-surface`, `text-fg`, `text-muted`, `text-subtle`,
`border-line`, `text-accent`, `bg-accent-soft`, `bg-primary`, `text-primary-fg`, `hover:bg-primary-hover`.

## Typography

- **Geist**: UI and body text
- **Geist Mono**: eyebrow labels, dates
- **Instrument Serif (italic)**: accent words in headings (`<Serif>`) and featured project names

## Page structure

1. **Header** (`Nav.tsx`, fixed): at the top of the page an expanded profile panel shows the photo, name and "Software Engineer · 3 years of experience", with no bottom border. After scrolling > 24px the panel collapses and merges into the nav (small avatar + name, border back). Clicking the small avatar re-expands the panel over the content; it tucks away after 80px of further scrolling or on Escape. A spacer of `NAV_H + PANEL_H` (64 + 128px) keeps the layout stable.
2. **Hero**: headline, intro, primary CTA, *Currently* spotlight (ElNovaLabs + ex-Microsoft team, 3 years, 20+ projects, 15+ live), stats row
3. **01 Experience**: ElNovaLabs (featured, logo, badge, Founders row), Altakart, Freelance & Personal Projects
4. **02 Projects**: Twizzr and Softboard Lite (icon, screenshots, store links), then the GitHub projects grid
5. **03 Technologies**: grouped skill tags, core skills filled
6. **04 Contact**: inverted call-to-action block, footer
7. **Floating buttons**: email (bottom-left, pre-filled subject) and WhatsApp (bottom-right, pre-filled message)
