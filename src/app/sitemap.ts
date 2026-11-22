import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { absoluteUrl } from "@/lib/site";

// Single-page site: only the home route is listed. Section anchors (#projects…)
// are fragments and don't belong in a sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
      ...(profile.photo ? { images: [absoluteUrl(profile.photo)] } : {}),
    },
  ];
}
