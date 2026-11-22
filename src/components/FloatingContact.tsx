import { contactPrompts, profile } from "@/data/profile";
import { Mail, WhatsApp } from "./icons";

// Two fixed quick-contact buttons: email bottom-left, WhatsApp bottom-right.
// Plain links (no JS) — `mailto:` opens the device's mail app on mobile and
// `wa.me` opens the WhatsApp app or WhatsApp Web with the message pre-filled.
export function FloatingContact() {
  const mailHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    contactPrompts.emailSubject,
  )}&body=${encodeURIComponent(contactPrompts.emailBody)}`;
  const whatsappHref = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
    contactPrompts.whatsappText,
  )}`;

  return (
    <>
      <a
        href={mailHref}
        aria-label="Email me"
        className="group fixed bottom-5 left-5 z-40 flex h-13 items-center gap-2 rounded-full bg-primary pr-4 pl-4 text-primary-fg shadow-[0_10px_30px_-8px_var(--primary)] transition-transform hover:-translate-y-0.5 hover:bg-primary-hover sm:bottom-6 sm:left-6"
      >
        <Mail className="size-5" />
        <span className="text-sm font-medium max-sm:sr-only">Let&apos;s connect</span>
      </a>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group fixed right-5 bottom-5 z-40 flex h-13 items-center gap-2 rounded-full bg-[#25D366] pr-4 pl-4 text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-transform hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
      >
        <WhatsApp className="size-6" />
        <span className="text-sm font-medium max-sm:sr-only">WhatsApp</span>
      </a>
    </>
  );
}
