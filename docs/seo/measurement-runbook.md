# Measurement Runbook — Deploy, Search Console, Analytics, Baseline

**Date:** 2026-10-14
**For:** the owner. These are the steps only the owner can do (hosting and Google accounts). The code side is done: see [SEO growth plan](./2026-10-14-seo-growth-plan.md) Phase 1 and 3.
**Order matters:** deploy first, measure second. Data collected from the old live site describes content that no longer exists.

## 1. Deploy the `dev` branch

1. Merge or deploy `dev` to production. This retires the fabricated content still live on www.invospec.com (project-status risk 1).
2. Check that the apex domain and HTTP redirect to `https://www.invospec.com` with a 301. From any terminal:

```
curl -sI http://invospec.com/ | head -3
curl -sI https://invospec.com/ | head -3
curl -sI http://www.invospec.com/ | head -3
```

Each should show `301` and a `location:` starting with `https://www.invospec.com`. If not, set the redirect in the hosting provider's domain settings (on Vercel: Project → Settings → Domains, mark `www` as the primary domain).

## 2. Environment variables (hosting provider → production)

| Variable | Value | Effect |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.invospec.com` | Canonicals, sitemap, share image URLs |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` from GA4 → Admin → Data streams → Web | Loads analytics (with the consent prompt) and switches the privacy policy's analytics section on |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Only if using the HTML-tag method in step 3 | Adds the verification meta tag |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | From Resend, with a verified sender domain | Lead delivery (project-status risk 2) |

Redeploy after changing any of them: they are read at build time.

**Before setting `NEXT_PUBLIC_GA_ID`:** decide whether to keep the consent prompt (`siteConfig.analytics.consentBanner`, default `true`). With it on, EU and UK visitors are only counted if they accept. With it off, analytics runs for everyone without asking, which is not compliant for EU/UK visitors.

## 3. Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console) with the Google account that should own the data.
2. Add a **Domain** property for `invospec.com` (covers `www`, apex, http and https in one view). Verify with the DNS TXT record it gives you, at the domain registrar. Allow up to a day for DNS.
   - Alternative, faster: add a **URL-prefix** property for `https://www.invospec.com/` and choose the HTML tag method; paste only the `content` value into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy.
3. Sitemaps → add `https://www.invospec.com/sitemap.xml`. Status should become "Success" within a few days.
4. URL inspection → enter each of these and click "Request indexing":
   - `/`, `/services`, `/solutions`
   - the six `/solutions/...` goal pages
   - the seven `/services/...` pages
   - `/blog` and the published articles
5. Settings → Users: add a second owner, so access does not depend on one account.

## 4. Google Analytics 4

1. Create a GA4 property for the site, timezone Asia/Kolkata, currency as you invoice.
2. Add a Web data stream for `https://www.invospec.com`; copy the Measurement ID into `NEXT_PUBLIC_GA_ID` and redeploy.
3. Admin → Events: after the first enquiry, `generate_lead` appears. Mark it as a **key event**. It carries a `form_source` parameter naming the page the enquiry came from; register it as a custom dimension (Admin → Custom definitions) to report leads by page.
4. Link the GA4 property to Search Console (Admin → Product links) so queries and landing pages appear together.
5. Check with Admin → DebugView while submitting a test enquiry on the live site.
6. Also mark `whatsapp_click` and `phone_click` as key events. Both carry `link_source` (for example `mobile-bar`, `floating-button`, `contact-page`, `footer`); register it as a custom dimension too.

## 4a. Paid campaigns

Every enquiry records where the visitor came from (`src/lib/attribution.ts`): UTM tags, ad click IDs (`gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`), the landing page and the referring site. The lead email lists them under "How they found us". Paid clicks get an `[Ad]` subject prefix.

1. Tag every ad's final URL: `?utm_source=google&utm_medium=cpc&utm_campaign=<campaign>&utm_term={keyword}`. Google Ads adds `gclid` itself when auto-tagging is on (the default).
2. Link GA4 to Google Ads (Admin → Product links) and import `generate_lead` as the primary conversion. Import `whatsapp_click` and `phone_click` as secondary.
3. WhatsApp chats started on the site end with a line such as `Ref: solutions/mobile-apps | google/flutter-india`, naming the page and campaign. Log it with the lead.
4. Weekly: upload the `gclid` of each *qualified* lead to Google Ads (Tools → Conversions → Uploads) so bidding optimises for real prospects, not every form fill.
5. Visitors from a campaign link, and all phone visitors, never see the timed enquiry popup. Phones get the bottom contact bar instead.

## 5. Baseline at day 28

Fill this table in `docs/project-status.md` 28 days after deploy, then monthly.

| Measure | Where | Value |
|---|---|---|
| Indexed / submitted URLs | Search Console → Pages | |
| Impressions, clicks, average position: site total | Search Console → Performance, 28 days | |
| Same, per group: `/services/*`, `/solutions/*`, `/technologies/*`, `/blog/*` | Performance → Pages filter | |
| Top ten queries | Performance → Queries | |
| Enquiries (key events), by `form_source` | GA4 → Reports → Engagement → Key events | |
| Pages with impressions but CTR under 1% | Performance → Pages, sort by impressions | |
| Core Web Vitals status | Search Console → Core Web Vitals (appears once there is enough traffic) | |

Then, each month, choose at most two actions from this list and record them in the status file:
- Rewrite the title and description of a page with high impressions and low CTR.
- Give a page that ranks for a query it does not answer well a section that answers it.
- Write the next article for a query that already produces impressions.
- Merge or noindex a page that has had no impressions in three months.
