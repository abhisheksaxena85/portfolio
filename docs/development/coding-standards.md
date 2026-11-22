# Coding Standards — InvoSpec Website

> Development conventions for all engineers and AI agents.
> Architecture reference → [`/docs/architecture/overview.md`](../architecture/overview.md)

---

## TypeScript

### Rules

- Strict mode enabled (`"strict": true` in `tsconfig.json`)
- No `any` — use proper types or `unknown` if genuinely unknown
- Explicit return types on functions that are part of the public API
- Use `type` for object shapes; use `interface` only when extension is expected
- Enums → prefer `as const` union types over TypeScript `enum`
- Avoid type assertions (`as SomeType`) unless genuinely necessary and comment why

### Naming Conventions

| Construct | Convention | Example |
|---|---|---|
| Types | PascalCase | `ServiceContent` |
| Interfaces | PascalCase | `NavigationItem` |
| Functions | camelCase | `getServiceBySlug` |
| React components | PascalCase | `ServiceCard` |
| Variables | camelCase | `allServices` |
| Constants | SCREAMING_SNAKE or camelCase | `MAX_TITLE_LENGTH` or `siteConfig` |
| Files (components) | PascalCase | `ServiceCard.tsx` |
| Files (utilities) | camelCase | `metadata.ts` |

---

## React Conventions

### Component Structure

```tsx
// 1. Imports (external first, then internal)
import { type FC } from 'react';
import Link from 'next/link';
import { ServiceCard } from '@/components/cards/ServiceCard';

// 2. Type definitions local to this file
type Props = {
  title: string;
  services: Service[];
};

// 3. Component (named export preferred over default for non-page components)
export function ServiceGrid({ title, services }: Props) {
  return (
    <section>
      <h2>{title}</h2>
      <div>
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </section>
  );
}
```

### Server vs Client Components

**Default:** Server Component — no directive needed.

**Use `'use client'` only when:**
- Using `useState`, `useReducer`, `useEffect`, `useRef`
- Using browser APIs (`window`, `document`, `navigator`)
- Using event handlers that require runtime browser access
- Using third-party libraries that require browser context

**Pattern for hybrid components:**
```tsx
// Page is Server Component
// src/app/contact/page.tsx
import { ContactForm } from '@/components/forms/ContactForm'; // Client Component

export default function ContactPage() {
  return (
    <main>
      <h1>Contact Us</h1>
      <ContactForm />   {/* Client boundary here */}
    </main>
  );
}
```

---

## Next.js Conventions

### Pages

- `page.tsx` — page component (Server Component by default)
- `layout.tsx` — shared layout
- `loading.tsx` — loading state
- `error.tsx` — error boundary (requires `'use client'`)
- `not-found.tsx` — 404 for this route segment

### Dynamic Routes

Always implement `generateStaticParams` for dynamic routes:
```tsx
export async function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}
```

Always call `notFound()` for invalid slugs:
```tsx
const service = getServiceBySlug(params.slug);
if (!service) notFound();
```

### Metadata

Use `generateMetadata` or static `metadata` export — never inject `<head>` tags manually:
```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `${siteConfig.url}/services/${params.slug}` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `${siteConfig.url}/services/${params.slug}`,
      siteName: siteConfig.name,
    },
  };
}
```

---

## File Organisation

```
src/
  app/          → Pages (App Router) — minimal logic
  components/   → Reusable UI components
    layout/     → Header, Footer, Navigation (site-level)
    sections/   → Full-width page sections (Hero, FAQ, CTA, etc.)
    cards/      → Card components (ServiceCard, CaseStudyCard, etc.)
    forms/      → Form components (ContactForm, etc.)
    seo/        → JSON-LD injection components
    ui/         → Atoms (Button, Badge, Breadcrumb, Heading, etc.)
  content/      → Data files (TypeScript + MDX)
  lib/          → Utilities (seo/, schema/, content/, utils/)
  config/       → Site-wide configuration
  types/        → Shared TypeScript types
```

### Import Aliases

Use `@/` alias for all imports from `src/`:
```tsx
import { siteConfig } from '@/config/site';
import { ServiceCard } from '@/components/cards/ServiceCard';
```

Never use relative paths that traverse more than one directory:
```tsx
import foo from '../../../lib/foo';  ✗
import foo from '@/lib/foo';         ✓
```

---

## Error Handling

- Use `notFound()` for invalid dynamic route slugs
- Use Next.js `error.tsx` boundaries for runtime errors in page segments
- Form submission errors: return structured errors from Server Actions
- Never let unhandled errors expose internal stack traces to users
- Log errors server-side (console.error at minimum)

---

## Validation

- Use **Zod** for all server-side input validation (contact form, Server Actions)
- Define schemas in `src/lib/validation/`
- Never trust client-side form data without server validation
- Validate MDX frontmatter structure when loading content

---

## Environment Variables

**Rules:**
- All secrets in `.env.local` (gitignored — never committed)
- `.env.example` documents every variable with descriptions
- `NEXT_PUBLIC_*` prefix only for variables that **must** be public (GA ID, site URL)
- Never put API keys in `NEXT_PUBLIC_*` variables
- Access env vars through typed helpers, not raw `process.env` scattered across files

**Pattern:**
```typescript
// src/lib/config.ts
export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? null,
  contactEmail: process.env.CONTACT_EMAIL ?? 'contact@invospec.com',
  resendApiKey: process.env.RESEND_API_KEY,
} as const;
```

---

## Styling

- Tailwind CSS utility classes only
- No inline `style` props for layout (use Tailwind)
- No global CSS beyond `:root` variables, base resets, and `@layer` utilities
- Design tokens defined in `globals.css` as CSS custom properties
- Dark mode via `dark:` variants or CSS `light-dark()`

---

## Comments

- Comment **why**, not **what**
- TypeScript types serve as documentation for shapes
- Document non-obvious decisions inline
- Link to relevant ADR in significant comments

---

## Git Practices

- Commit messages: `type(scope): description` format
  - `feat(services): add mobile app development page`
  - `fix(contact): correct form validation for phone field`
  - `docs(seo): update schema documentation`
- Do not commit `.env.local` or any secrets
- Do not commit compiled/build artifacts

---

## Commands

```bash
yarn dev          # Start development server (localhost:3000)
yarn build        # Production build
yarn start        # Start production server
yarn lint         # Run ESLint
yarn typecheck    # Run TypeScript type checker (tsc --noEmit)
```

---

*Last updated: 2026-10-04*
