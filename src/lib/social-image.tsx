// Shared renderer for the link-preview image (Open Graph + Twitter/X).
// Used by src/app/opengraph-image.tsx and src/app/twitter-image.tsx.
// LinkedIn, Facebook, WhatsApp and Slack read og:image; X reads twitter:image.
// 1200×630 is the recommended size for all of them (LinkedIn min: 1200×627).
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { experience, profile, seo, stats } from "@/data/profile";
import { siteUrl } from "@/lib/site";

export const socialImageSize = { width: 1200, height: 630 };
export const socialImageContentType = "image/png";
export const socialImageAlt = `${profile.name}, ${profile.role}. ${seo.tagline}`;

// Light-theme tokens from src/app/globals.css.
const color = {
  bg: "#ffffff",
  surface: "#f6f8fb",
  fg: "#0f1115",
  muted: "#5a5f6a",
  line: "#e4e8ee",
  accent: "#2563eb",
  accentSoft: "#eaf1ff",
};

// Read synchronously at module scope: sync I/O is a "predictable value", so the
// image is prerendered at build time instead of rendered per request.
const photo = profile.photo
  ? `data:image/jpeg;base64,${readFileSync(join(process.cwd(), "public", profile.photo), "base64")}`
  : null;

export function renderSocialImage(): ImageResponse {
  const current = experience.find((r) => r.featured) ?? experience[0];
  // The first three stats are numeric; the fourth is shown in the pill instead.
  const shownStats = stats.slice(0, 3);
  const host = siteUrl.hostname === "localhost" ? null : siteUrl.host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: color.bg,
          padding: "64px 72px",
          fontFamily: "Geist",
          color: color.fg,
          borderTop: `12px solid ${color.accent}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                alignItems: "center",
                gap: 12,
                padding: "10px 20px",
                borderRadius: 999,
                background: color.accentSoft,
                color: color.accent,
                fontSize: 24,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 999, background: color.accent }} />
              {`${current.title} at ${current.company}`}
            </div>
            <div style={{ marginTop: 28, fontSize: 84, lineHeight: 1.02, letterSpacing: -3 }}>
              {profile.name}
            </div>
            <div style={{ marginTop: 14, fontSize: 40, color: color.accent, letterSpacing: -1 }}>
              {profile.role}
            </div>
            <div style={{ marginTop: 18, fontSize: 26, lineHeight: 1.35, color: color.muted }}>
              {seo.tagline}
            </div>
          </div>

          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the DOM
            <img
              src={photo}
              alt=""
              width={260}
              height={260}
              style={{
                borderRadius: 999,
                border: `8px solid ${color.surface}`,
                boxShadow: `0 0 0 2px ${color.line}`,
              }}
            />
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: `2px solid ${color.line}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", gap: 56 }}>
            {shownStats.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 44, letterSpacing: -1.5 }}>{s.value}</div>
                <div style={{ fontSize: 20, color: color.muted, maxWidth: 260 }}>{s.label}</div>
              </div>
            ))}
          </div>
          {host ? <div style={{ fontSize: 24, color: color.muted }}>{host}</div> : null}
        </div>
      </div>
    ),
    { ...socialImageSize },
  );
}
