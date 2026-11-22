// Absolute origin of the deployed site. Search engines and social crawlers
// (LinkedIn, X, WhatsApp, Slack…) require absolute URLs for canonical links and
// preview images, so every metadata URL is resolved against this.
//
// Resolution order:
//   1. NEXT_PUBLIC_SITE_URL: set this to the real domain, e.g. https://example.com
//   2. VERCEL_PROJECT_PRODUCTION_URL: provided automatically by Vercel builds
//   3. http://localhost:3000: local development only
function resolveSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return new URL(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return new URL(`https://${vercel}`);

  return new URL("http://localhost:3000");
}

export const siteUrl = resolveSiteUrl();

/** Absolute URL for a site path, e.g. absoluteUrl("/people/abhishek.jpg"). */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}
