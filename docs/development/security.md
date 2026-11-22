# Security — InvoSpec Website

> Referenced from `AGENTS.md`. Keep this short and current.

## Secrets

- No credentials in source. All configuration is read from environment variables; `.env.example` lists them and `.env.local` is gitignored.
- Only `NEXT_PUBLIC_*` variables reach the browser. Delivery credentials (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`) are read in server code only.
- The Search Console verification token is `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (public by nature, but kept out of source so it can differ per environment).

## Lead forms

All three lead forms (contact page, inner-page consultation form, homepage enquiry) submit to one server action, `submitContactForm` in `src/app/actions/contact.ts`.

| Control | Implementation |
|---|---|
| Validation | Zod schema in `src/lib/forms/contact-schema.ts`, run on the client for instant feedback (`useLeadForm`) and again in the server action, which is authoritative. Name, email, phone and message are required; phone is normalised to digits with an optional leading `+` and must have 7–15 digits; the message must contain words, at most 2 links and no HTML or BBCode links. |
| Bot filtering | Hidden honeypot field `website_bot`; filled submissions are silently accepted and dropped. A `formStartedAt` stamp is set by the client on mount: a post without it (raw HTML replay) is silently dropped, and a post under 3 seconds after mount gets a "please submit again" error. |
| Rate limiting | `src/lib/forms/rate-limit.ts`: 5 submissions per IP per 10 minutes and 3 per email address per hour, in-memory per server instance (see limitation in the file) |
| Delivery | `src/lib/forms/deliver.ts`: Resend HTTP API, plain-text email, `reply_to` set to the visitor |
| Failure handling | In production a missing or failing delivery returns an error with the direct email address and logs a minimal record (name, email, source, message length). It never reports false success. |
| Data retention | Nothing is stored by the site. Leads exist only in the destination inbox and server logs. |

## Known limitations

- Rate limiting is per instance; a shared store is needed if abuse appears.
- No CAPTCHA. Add one only if honeypot, fill-time check and rate limits prove insufficient.
- The fill-time check means a browser with JavaScript disabled cannot submit the forms; the email and phone number on the contact page remain the fallback.
- Privacy and Terms pages contain placeholder legal text pending review.

*Last updated: 2026-10-16*
