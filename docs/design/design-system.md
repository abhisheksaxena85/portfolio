# Design System — InvoSpec Website

> **Superseded on 2026-10-12.** The design system now lives in [`/DESIGN.md`](../../DESIGN.md) and the tokens in `src/app/globals.css` (`@theme`).
> The earlier dark-first specification in this file was never implemented; the shipped site is light. Rationale: [`2026-10-12-visual-and-motion-plan.md`](./2026-10-12-visual-and-motion-plan.md) §3.

Quick reference:

- Direction: warm light surfaces, navy text, cobalt accent, hairline borders, monospace labels, SVG system diagrams.
- Tokens: `canvas`, `surface`, `surface-raised`, `ink-900/700/600/500/400`, `line-soft/line/line-strong`, `cobalt-*`, `sage-*`, `amber-*`, `danger`, `footer`, `ind-*` (per-industry accents, 2026-11-21).
- Type: Manrope (`font-sans`) and Geist Mono (`font-mono`) via `next/font`.
- Icons: `<Icon name="…" />` (lucide). Motion: `<Reveal>`, `.stagger`, diagram draw classes; see `/DESIGN.md`.

*Last updated: 2026-10-12*
