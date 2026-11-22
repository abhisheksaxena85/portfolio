// og:image: the preview shown when the site is shared on LinkedIn, Facebook,
// WhatsApp, Slack, etc. Generated at build time from src/data/profile.ts.
import {
  renderSocialImage,
  socialImageAlt,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const alt = socialImageAlt;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function Image() {
  return renderSocialImage();
}
