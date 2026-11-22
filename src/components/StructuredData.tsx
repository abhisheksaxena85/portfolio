// JSON-LD structured data (schema.org) so search engines can identify the page
// as a person's profile: name, job, employer, photo and linked profiles.
// Everything here must match what's visible on the page (docs/RULES.md §3).
import { experience, profile, seo, stack } from "@/data/profile";
import { absoluteUrl } from "@/lib/site";

export function StructuredData() {
  const current = experience.find((r) => r.featured) ?? experience[0];
  const [region, country] = profile.location.split(",").map((s) => s.trim());
  const pageUrl = absoluteUrl("/");
  const personId = `${pageUrl}#person`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profilepage`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: "en",
        mainEntity: { "@id": personId },
        isPartOf: { "@id": `${pageUrl}#website` },
      },
      {
        "@type": "WebSite",
        "@id": `${pageUrl}#website`,
        url: pageUrl,
        name: profile.name,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: pageUrl,
        ...(profile.photo ? { image: absoluteUrl(profile.photo) } : {}),
        jobTitle: profile.role,
        description: seo.description,
        email: `mailto:${profile.email}`,
        address: {
          "@type": "PostalAddress",
          addressRegion: region,
          addressCountry: country,
        },
        worksFor: {
          "@type": "Organization",
          name: current.company,
        },
        knowsAbout: stack.flatMap((g) => [...g.core, ...g.items]),
        sameAs: [profile.links.linkedin, profile.links.github],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can't close the script tag (Next.js JSON-LD guide).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
