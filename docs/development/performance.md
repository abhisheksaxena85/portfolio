# Performance Standards — InvoSpec Website

> Performance is a first-class requirement. Fast pages rank better and convert better.

---

## Core Web Vitals Targets

| Metric | Target | What it measures |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Perceived loading speed |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability |
| INP (Interaction to Next Paint) | < 200ms | Interactivity responsiveness |

These are Google's ranking signals. Hitting "Good" in all three is required.

---

## Architecture Performance Principles

### Server-first Rendering

**DECISION:** Server Components are default. This reduces JavaScript sent to the browser.

- Page content (hero text, service descriptions, metadata) = Server Component
- Interactive UI (mobile menu, contact form, accordion) = Client Component with minimal JS

Never put static content in a Client Component when a Server Component would work.

### Static Generation

Use `generateStaticParams` on all dynamic routes:
```tsx
// Generates all service pages at build time
export async function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}
```

Use `export const revalidate = 86400;` (ISR) for content that changes infrequently.

### No Unnecessary Hydration

Every Client Component adds hydration cost. Each one must be justified.
Ask before adding `'use client'`: "Can this be achieved with a Server Component?"

---

## Image Optimisation

**Rule:** Every image on the site must use `next/image`. No raw `<img>` tags.

```tsx
import Image from 'next/image';

// Always specify width and height to prevent CLS
<Image
  src="/images/hero.webp"
  alt="Descriptive alt text"
  width={1200}
  height={630}
  priority     // Add for above-the-fold images (LCP image)
/>
```

**Image formats:** Use WebP. PNG/JPEG only as fallback for older browsers (Next.js handles this automatically).

**Above-the-fold images:** Add `priority` prop to the hero/LCP image. Never lazy-load the LCP image.

**Sizing:** Use `fill` + `sizes` prop for responsive images:
```tsx
<div style={{ position: 'relative', height: '400px' }}>
  <Image
    src="/images/image.webp"
    alt="..."
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
    style={{ objectFit: 'cover' }}
  />
</div>
```

---

## Font Optimisation

**Rule:** All fonts loaded via `next/font`. Never from external CDN.

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',        // Prevents invisible text during font load
  variable: '--font-inter',
});
```

Only load the font weights you actually use. Don't load all 9 weights.

---

## JavaScript Reduction

**Don't add large libraries when native alternatives work:**

| Avoid | Use instead |
|---|---|
| `moment.js` | `date-fns` (tree-shakable) or `Intl.DateTimeFormat` |
| `lodash` (full) | Individual imports or native JS |
| `framer-motion` for simple transitions | CSS transitions |
| `react-query` for static data | `async/await` in Server Components |
| `axios` | Native `fetch` |

**Check bundle size** before adding any new dependency: `yarn build` shows page sizes.

---

## Layout Shift (CLS) Prevention

Common CLS causes to avoid:

1. **Images without dimensions** → always specify `width` and `height`
2. **Dynamic content above static content** → reserve space for async content
3. **Web fonts** → use `font-display: swap` (next/font handles this)
4. **Embeds (videos, ads)** → use aspect-ratio containers
5. **Toast notifications / banners** → position fixed/absolute, not in flow

---

## Lazy Loading

Images below the fold are lazy-loaded automatically by `next/image`.

Other content:
- Use React's `lazy()` + `Suspense` for heavy Client Components not needed at initial load
- Do NOT lazy-load content that is critical for SEO (search engines may not see lazy content)

---

## What To Avoid

| Action | Performance impact |
|---|---|
| Autoplay video backgrounds | Massive bandwidth, blocks LCP |
| CSS animations on `width`/`height` | Triggers layout, destroys CLS |
| Animating `box-shadow` | Expensive — animate `opacity` + pseudo-element instead |
| Large third-party scripts (chatbots, etc.) | Blocks INP |
| Loading all icon packs | Bundle bloat |
| Global CSS that affects every element | Hard to optimise |
| `useEffect` for data that can be fetched server-side | Unnecessary client round-trip |
| Render-blocking synchronous data fetches | Delays LCP |

---

## Monitoring

**Google Search Console** — monitors Core Web Vitals from real user data.
**PageSpeed Insights** — test individual pages at `pagespeed.web.dev`.

Run PageSpeed Insights on key pages after major changes:
- Homepage
- A service page
- A blog article

---

*Last updated: 2026-10-04*
