# Phase 1 Discovery Dossier — InvoSpec Softwares Website

**Date:** 2026-10-12
**Status:** Draft for owner review (Phase 1 gate)
**Prepared by:** AI agent (research, UX, SEO, engineering roles) for the project owner
**Labels used:** `FACT` (verified or sourced) · `ASSUMPTION` (reasoned, unverified) · `DECISION` (proposed or taken) · `PLACEHOLDER` (needs company input)

Companion documents:
- Repository audit → [`2026-10-12-repo-audit.md`](./2026-10-12-repo-audit.md)
- Project status → [`/docs/project-status.md`](../project-status.md)
- Decision record → [`/docs/decisions/ADR-001-phase-gated-delivery-and-fact-policy.md`](../decisions/ADR-001-phase-gated-delivery-and-fact-policy.md)

---

## 1. Summary

InvoSpec Softwares is an India-based company that builds, launches, maintains and improves software for businesses. The existing website (live at www.invospec.com and in this repository) already states that plainly and speaks to non-technical buyers, which is rarer than expected among competitors. The two largest problems found are not design problems:

1. **Credibility risk.** The site publishes fabricated case-study metrics and unverified promises (see audit). If a buyer or a reviewer checks them, trust collapses, and the project's own content rules prohibit them.
2. **Lead loss.** The consultation form used on most inner pages does not send anything anywhere, and the main contact form only logs to the server console. Every enquiry from those forms is lost today.

The research below supports a positioning that competitors have largely abandoned in 2026: a plain-language, full-lifecycle software partner for business owners and founders, backed by specific, verifiable evidence rather than badges and volume claims.

---

## 2. Research method and limits

| Source type | What was done | Limits |
|---|---|---|
| Repository | Read all docs, config, content files and pages; ran `tsc` and `eslint` | Production build not run yet (Phase 7) |
| Live site | Fetched www.invospec.com homepage (2026-10-12) | Homepage only |
| Competitors | Fetched and read 10 competitor homepages directly (text extracted locally) | Homepages only; inner pages not reviewed; Radixweb renders client-side so no text was readable |
| Official platform guidance | Google Search Central (AI features, AI optimization guide, helpful content), Google Play Console help, Apple Developer Program, web.dev | Current as of fetch date |
| Buyer research | Forrester (2024), TrustRadius (2026), Nielsen Norman Group, Stanford Web Credibility guidelines, Clutch buyer guides | Most "B2B statistics" circulating online are vendor-relayed; only primary sources are cited below |
| Search demand | **Not measured.** No keyword tool or Search Console access in this session | Volumes are not estimated anywhere in this document; see §8 |
| Pricing benchmarks | Vendor-published 2026 cost guides for India | Marketing content; ranges vary widely; used only to frame "what affects price" |

---

## 3. Company facts and gaps

| Item | Value | Label |
|---|---|---|
| Name | InvoSpec Softwares | FACT (site config) |
| Email | contact@invospec.com | FACT |
| Phone | +91 72660 91327 | FACT (in `src/config/site.ts`; shown in JSON-LD) |
| Country | India | FACT |
| City / address | — | PLACEHOLDER |
| Founded, team size | — | PLACEHOLDER |
| Delivery stack | Flutter, Dart, Java, Spring Boot, REST, MySQL, Firebase, native Android/iOS | FACT (from original site, per project-context) |
| Services | Mobile, web, backend/API, SaaS, MVP, custom software, maintenance, app-store publishing, business automation, cloud deployment | FACT |
| Industries | Healthcare, education, retail, logistics, finance, real estate (pages exist); others listed in context | FACT that pages exist; depth of real experience is PLACEHOLDER |
| Target geography | — | PLACEHOLDER (the single most consequential open question) |
| Real clients, results, testimonials | None confirmed | PLACEHOLDER |
| Certifications, review profiles (Clutch, GoodFirms, Google Business Profile) | None confirmed | PLACEHOLDER |
| Contract terms (IP ownership, payment, SLA) | Site claims "100% IP ownership", "respond within 24 hours", "within one business day" | ASSUMPTION until the owner confirms these are contractual |

---

## 4. Audience

### Primary: business owners, founders, managers, non-technical decision-makers

What they are trying to do (ASSUMPTION, consistent with the services offered and the live site's own framing):

- Get a mobile app, web app, portal or internal tool built without having a technical team.
- Replace spreadsheets, WhatsApp coordination and manual processes with software.
- Get an existing app fixed, updated for new OS versions, or taken over after the original developer left.
- Get an app into the Apple App Store and Google Play without being blocked by platform rules.
- Understand what it will cost and how long it will take before talking to anyone.

What they fear (sourced):

- **Incompetence and inconsistency.** Forrester's survey of 1,420 purchase influencers found competence, consistency and dependability are the top three trust levers for business buyers (North America: 30% / 17% / 19%; Europe: 46% / 23% / 25%). [F1]
- **Being misled online.** TrustRadius (Jan 2026, 1,862 buyers): 94% of buyers who used AI for research still fact-checked it; 47% trust online resources less than before; demos, trials, prior experience and user reviews rank among the most influential resources. [T1]
- **Hidden pricing.** Nielsen Norman Group: price is the number-one information need on any website, and B2B sites often hide it. [N1]
- **Losing control of the project.** Clutch's buyer guides tell buyers to ask who owns the IP and source code, how change requests are handled, what the QA process is, and to treat "no access to source code repositories" and "infrequent status updates" as red flags. [C1][C2]
- **Picking on price alone.** An academic study of a freelance marketplace (Jørgensen, *Journal of Systems and Software*) found that choosing vendors on low price raises failure risk and choosing on prior good performance lowers it. [J1]

### Secondary: CTOs and technical evaluators

They want the stack, architecture decisions, code quality evidence, testing and deployment practice, and the engagement model. Technology pages and case studies serve them. They are not the homepage's first reader.

---

## 5. Buyer-objection map

Each objection lists the evidence that would answer it and where on the site it belongs. "Evidence available today" is honest about the current state.

| # | Objection (buyer's words) | Evidence that answers it | Where | Available today? |
|---|---|---|---|---|
| 1 | "Are they a real company or one freelancer?" | Physical address, named people with photos and roles, founding year, legal entity, phone | About, Contact, footer | **No** (all PLACEHOLDER) |
| 2 | "Have they built something like mine?" | Real case studies with permission, named or anonymised by industry, with architecture detail and honest outcomes | Case studies, service pages | **No** (current case studies are fabricated) |
| 3 | "What will it cost?" | Factors that drive price, engagement models, indicative ranges if the owner approves, what a quote includes | Homepage section, FAQ, each service page | Partly (cost factors exist; ranges absent) |
| 4 | "How long will it take?" | Typical phase durations stated as ranges with the conditions that change them | Process section, FAQ | Partly (unverified "12 weeks" style claims exist) |
| 5 | "Will I understand what is going on?" | Named point of contact, update cadence, demo cadence, tools used | Process, FAQ | Claimed; must be confirmed |
| 6 | "Will I own my code?" | Plain statement of contractual IP terms, repository access from day one | FAQ, Terms, service pages | Claimed as "100%"; must be confirmed contractually |
| 7 | "What happens after launch?" | Maintenance options, response-time commitments, what is included and what is extra | Maintenance service page, FAQ | Claimed; SLA figures must be confirmed |
| 8 | "Can they get my app into the stores?" | Accurate explanation of current Apple and Google requirements and who holds the developer accounts | App-store publishing page | Partly; must be fact-checked against §9 |
| 9 | "What if they disappear like the last developer?" | Documentation, handover practice, code ownership, maintenance continuity | About, Maintenance page | Not addressed directly |
| 10 | "Why not a bigger firm or a cheaper freelancer?" | Honest comparison of trade-offs; what InvoSpec is and is not | About, FAQ | Not addressed |
| 11 | "What happens after I submit the form?" | Explicit next steps, who replies, within what time, what is needed from the buyer | Contact page, form success state | Claimed ("24 hours"); confirm and keep |

---

## 6. Competitor comparison

Ten homepages were fetched directly on 2026-10-12. Numbers below are each company's own claims as printed on their homepage, not verified facts.

| Company | HQ signals | Homepage H1 / positioning | Self-reported proof | Trust badges | Pricing / engagement on homepage | Primary CTA | Who it speaks to |
|---|---|---|---|---|---|---|---|
| Intuz | India, US-facing | "We build what enterprises bet their operations on"; AI, IoT, cloud | 16 years, 700+ products, OpenAI Select Partner, case studies with HIPAA | Clutch, HIPAA | Not present | "Start the Conversation" | Enterprise |
| MindInventory | India | "Custom Software and AI Product Development That Drives Business Growth" | 15+ years, 2,700+ projects, 300+ specialists | ISO 9001, ISO 27001, SOC 2, GDPR, HIPAA, Clutch, GoodFirms | "Dedicated team" model named; no pricing | "Book a Call" | Enterprise and startups |
| Mindbowser | India, US-facing | "How are you planning to Transform Healthcare?" | Partners: Epic, Cerner, AWS | HIPAA, SOC 2 | Not present | "Contact Us" | Healthcare only (full vertical pivot) |
| GeekyAnts | India (Bengaluru) | "Turning Ambitious Technology Strategies into Production-Grade Reality" | Client logos (Google, ICICI, WeWork, SKF) | Clutch, GoodFirms | Not present | "Schedule a Strategy Conversation" | Enterprise |
| SoluteLabs | India (Ahmedabad) | "Product engineering with AI agents" | Founded 2014, 150+ shipped, 4.7 Clutch, 100% would refer | Google Cloud partner, SOC 2 | Not present | "Book a 30-min call" | Product teams |
| CMARIX | India (Ahmedabad), US number | "AI-Powered Software Development Company" | 2,000+ clients, 40+ industries | ISO 9001/27001, SOC 2, GDPR, HIPAA | "Fixed price" mentioned; "Hire developers" pages | "Let's connect" | Everyone (very wide catalogue) |
| Squareboat | India (Gurugram) | "Design-first Software Development Company" | Case studies, ISO badges, Great Place to Work logo | ISO | Not present | "Contact Us" | Startups, product companies |
| Radixweb | India | Page is client-rendered; no readable text without JavaScript | — | — | — | — | — |
| Netguru | Poland | "AI-native commerce"; 630+ developers, 10+ years | Testimonials, Clutch | — | Engagement models named (Dedicated Teams, Staff Augmentation) | "Let's talk" | Enterprise, scale-ups |
| thoughtbot | US | "When the stakes are high, experience matters" | One featured case study with a named client quote; "1,000+ positive outcomes"; playbook, podcasts, open source | — | Not present | "Let's talk" | Product leaders in regulated industries |

### What the comparison shows

1. **Nearly every Indian competitor has rewritten its H1 around "AI" in 2026.** Intuz, MindInventory, GeekyAnts, SoluteLabs and CMARIX all lead with AI. None of them now addresses the business owner who simply needs an app or a workflow system built and kept running. That is an open position. (FACT from the fetched pages; the gap is an ASSUMPTION.)
2. **Proof is dominated by volume claims and badges.** "2,700+ projects", "2,000+ clients", ISO/SOC 2/HIPAA logos and Clutch ratings. InvoSpec cannot truthfully compete on these today and should not try. The alternative is specificity: real architecture detail, real process, real people, real contract terms.
3. **Pricing is almost universally absent**, which contradicts what buyers want most (NN/g). Publishing "what affects price" honestly, and indicative ranges if the owner agrees, is a differentiator at near-zero risk.
4. **Catalogue sprawl is common** (MindInventory and CMARIX list 100+ service links in the header). It signals breadth, not depth, and produces thin pages. InvoSpec should keep a short, deep service list.
5. **thoughtbot is the best model for tone and evidence**: a senior-team promise, one real client quote, maintenance as a named service, and resources that demonstrate expertise. It wins on specificity, not on badges.
6. **Server-rendered HTML matters.** Radixweb's homepage returned no readable text without JavaScript. The current Next.js App Router setup already avoids this; keep critical content server-rendered.
7. **Clear post-contact steps are rare.** Only InvoSpec's own current site states what happens after the form is submitted. Keep it, but make the claims true.

---

## 7. Positioning and differentiators

### Core positioning (DECISION, carried over from project-context)

> InvoSpec Softwares builds, launches, maintains and improves software for businesses.
> Build → Launch → Maintain → Improve.

### Candidate differentiators

Only the first two can be claimed today. The rest need owner confirmation.

| Differentiator | Status | What is required to claim it |
|---|---|---|
| Plain-language engagement for non-technical buyers | FACT (the site already does this; competitors do not) | Keep; back every promise with a concrete process description |
| Full lifecycle including maintenance and "rescue" of existing apps | FACT (services offered) | A dedicated, detailed maintenance and takeover page with a real intake checklist |
| Focused stack (Flutter + Spring Boot + MySQL/Firebase) rather than everything | FACT (delivery stack) | Technology pages that explain *why* this stack and when it is the wrong choice |
| Transparent pricing factors and engagement models | DECISION (recommended) | Owner approves wording; indicative ranges optional |
| Contractual IP ownership and repository access from day one | ASSUMPTION | Owner confirms the contract actually says this |
| Named senior engineers on every project; stated response times | ASSUMPTION | Owner confirms team structure and SLA |
| Specific industry depth (for example healthcare, logistics) | PLACEHOLDER | Real, permissioned project examples |

### What InvoSpec should not do

- Chase the "AI company" H1 unless there is real, demonstrable AI delivery work.
- Display volume numbers, awards, ratings or certifications it does not hold.
- Build 100-link mega-menus or city pages.
- Publish case studies without owner-confirmed facts.

---

## 8. Search demand and intent (qualitative)

No keyword volumes were measured. The intent clusters below come from the services offered and from how competitors structure their pages. Volumes and priorities must be validated in Phase 5 with Google Keyword Planner and, after launch, Search Console.

| Intent level | Example queries | Page type | Notes |
|---|---|---|---|
| Service (bottom) | "flutter app development company", "mobile app development company india", "software maintenance services", "app store publishing service" | Service and technology pages | Highly competitive; geography modifier depends on the open target-market decision |
| Commercial investigation (middle) | "how much does it cost to build an app in india", "flutter vs native", "how to publish app on google play 2026", "what happens when app developer disappears" | Guides and FAQ | Lower competition; strong fit with plain-language positioning; the Google Play 12-tester rule and Apple fee are concrete, evergreen topics |
| Informational (top) | "what is software maintenance", "what is an mvp", "what is a backend api" | Articles | Only publish where InvoSpec has first-hand perspective; Google's guidance rewards "unique, non-commodity content" and penalises scaled, generic pages [G2][G3] |
| Brand | "invospec" | Homepage, About | Ensure Organization schema and consistent naming |

Geography (PLACEHOLDER): if the company sells mainly in India, pages should use INR, Indian examples and `en-IN`; if it sells abroad, it must say so and show timezone and communication practices. The site currently mixes signals (locale `en_IN`, phone +91, placeholder phone format `+1 (555)` in the consultation form).

---

## 9. Platform facts that content must respect

These are concrete constraints a non-technical buyer does not know and will value learning. All are from official sources fetched on 2026-10-12.

| Fact | Source |
|---|---|
| Google Play: personal developer accounts created after 13 November 2023 must run a closed test with at least 12 testers opted in continuously for the preceding 14 days before applying for production access; review usually takes seven days or less. | Google Play Console Help [P1] |
| Google Play: an organisation developer account cannot be created without a D-U-N-S number; obtaining one can take up to 30 days. | Google Play Console Help [P2] |
| Apple Developer Program: USD 99 annual membership; enrol as an individual or organisation. Enterprise Program is USD 299/year for private internal distribution. | Apple Developer [A1] |
| Core Web Vitals "good" thresholds: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, measured at the 75th percentile. | web.dev [W1] |
| Google: "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary." Pages must be indexed and eligible for a snippet. Structured data should match visible text. | Google Search Central, AI features (updated 2025-12-10) [G1] |
| Google: "You don't need to create new machine readable files, AI text files, markup, or Markdown to appear in Google Search"; llms.txt is ignored; no chunking required; structured data not required for generative features; mass-producing query-variant pages can violate the scaled content abuse policy. | Google AI optimization guide (updated 2026-07-10) [G2] |
| Google: "unique, non-commodity content", good page experience, crawlability, consistent structured data, preview controls; clicks from AI Overviews "tend to be higher quality". | John Mueller, Google Search Central blog, 2025-05-21 [G3] |
| Google: helpful-content self-assessment asks "Is it self-evident to your visitors who authored your content?" and whether AI use is disclosed. | Google Search Central (updated 2026-10-05) [G4] |
| Search Console now has a Search Generative AI performance report (announced 2026-06-03, available to all sites from 2026-08-31). A site must be included in the generative AI features setting to be eligible. | Google Search Central blog [G5] |

Implication for the "AI search visibility" objective: do the fundamentals, write original evidence-based content with named authors, keep schema truthful, and measure with the Search Console generative AI report after launch. No llms.txt, no "GEO" tricks.

---

## 10. Trust-signal checklist for this site

Derived from Stanford's web credibility guidelines [S1], Forrester [F1], TrustRadius [T1], NN/g [N1] and Clutch's buyer questions [C1][C2].

| Signal | Priority | Current state |
|---|---|---|
| Physical address, phone, email on Contact and footer | High | Email and phone present; address PLACEHOLDER |
| Real people: names, roles, photos | High | Absent |
| Verifiable case studies with permission | High | Fabricated; must be removed |
| Plain contract facts: IP ownership, repository access, payment structure | High | Claimed; unconfirmed |
| Price factors and engagement models | High | Partly present |
| Process with named cadence (updates, demos, staging) | High | Present; unconfirmed |
| Post-contact steps and response time | High | Present; unconfirmed |
| Third-party reviews (Clutch, GoodFirms, Google Business Profile) | Medium | None known; decide whether to build these |
| Written expertise (guides on real constraints, with authors) | Medium | Absent |
| Design quality, zero errors, recent "last updated" | Medium | Design is competent; fonts and animation need cleanup (see audit) |
| Certifications | Low (do not fake) | None |

---

## 11. Open questions for the owner (ranked by impact)

1. **Target market and geography.** India, international, or both? Which currency and examples? This changes copy, pricing display, locale and the keyword plan.
2. **Real proof.** Which projects can be described publicly (even anonymised by industry)? What can be said truthfully about outcomes? Any client willing to be quoted?
3. **Who you are.** City/address, founding year, team size, names and roles of senior engineers, a photo policy.
4. **Contract facts.** Is IP ownership on payment contractual? Do clients get repository access from day one? What are the real response-time commitments for maintenance clients?
5. **Pricing posture.** Publish indicative ranges, or only factors and engagement models? What minimum project size, if any?
6. **Engagement models actually offered.** Fixed scope, monthly retainer, dedicated team, hourly?
7. **Technologies to confirm.** Node.js, React/Next.js, PostgreSQL, MongoDB are listed as "likely" in project-context. Only confirmed ones get pages.
8. **Review profiles.** Do Clutch, GoodFirms or Google Business Profile listings exist? Should they be created?
9. **Lead handling.** Which inbox or tool should the form deliver to? Is a transactional email provider (for example Resend) acceptable? Who replies and within what time?
10. **Analytics and domain.** Google Analytics property ID; canonical host (www vs apex); Search Console ownership (a verification token is currently hardcoded in the layout).
11. **Design direction.** The repo documents a dark-first design but implements a light one, and the brief asks for warm light surfaces with a cobalt accent. Confirm light is the direction so the docs can be corrected in Phase 4.
12. **Stitch access.** The brief asks for Stitch for visual generation; no Stitch tool is available in this environment. Confirm how designs should be produced in Phase 4.

---

## 12. Ranked recommendations

1. **Quarantine fabricated and unverified claims now, before any further work.** Replace invented case studies and metrics with clearly marked placeholders or remove the sections; mark unconfirmed promises for owner confirmation. This is live on the public site. (Credibility, legal, and policy risk.)
2. **Repair the lead pipeline as an isolated hotfix.** Wire both forms to a single server action with Zod validation, honeypot, rate limiting and a real delivery backend configured by environment variables. Until then, every inner-page enquiry is silently discarded.
3. **Answer the geography and proof questions (§11, items 1 to 4) before Phase 2.** The information architecture and content briefs depend on them.
4. **Keep the plain-language, full-lifecycle positioning and make it the headline differentiator.** Competitors vacated it. Do not chase an "AI company" headline.
5. **Add a real "Maintenance and takeover" offer with an intake checklist.** It serves objection 9, a gap in every competitor reviewed, and matches the Maintain/Improve half of the positioning.
6. **Publish pricing factors and engagement models; add indicative ranges if approved.** Addresses the number-one buyer information need and is nearly absent among competitors.
7. **Keep a short, deep service catalogue** (the current eight services are a reasonable base) and resist mega-menus and city pages.
8. **Treat app-store publishing as a content asset.** The Google Play tester rule, D-U-N-S lead time and Apple fee are concrete, searchable, evergreen facts that buyers need and that most competitors do not explain.
9. **Reconcile the design system documentation with the implemented light theme in Phase 4**, and remove the external font and icon-font links in favour of `next/font` and inline SVG icons.
10. **AI search visibility: fundamentals only.** Named authors, original guides, truthful schema, server-rendered HTML, Search Console generative AI report after launch. No llms.txt.

---

## 13. Acceptance-criteria self-critique

| Criterion | Met? | Note |
|---|---|---|
| Research before deciding, with sources and dates | Partly | Official platform guidance and competitor homepages are first-hand; buyer research relies on three primary reports plus Stanford; search volumes not measured |
| Inspected real competitor pages | Yes, homepages only | Inner pages (pricing, process, case studies) not reviewed; recommended for Phase 2 |
| FACT / ASSUMPTION / DECISION / PLACEHOLDER separated | Yes | |
| No fabricated company facts | Yes | Existing fabrications are flagged for removal, not reused |
| Competitor comparison, objection map, differentiators, open questions, ranked recommendations | Yes | |
| Repository inspected and preserved | Yes | No source files changed in Phase 1 |

---

## Sources

- [F1] Forrester, press release "Global Business Buyers Rank Competence, Consistency, And Dependability As Their Top Trust Levers", 2024-01-08; report "The State Of Global Business Buyer Trust In 2024"; survey of 1,420 purchase influencers. https://www.forrester.com/press-newsroom/forrester-global-business-buyer-trust-2023/
- [T1] TrustRadius, "Bridging the B2B Buying Disconnect" (2026 edition, released 2026-07-15; survey of 1,862 buyers and 444 vendors, January 2026), as reported by Demand Gen Report and MarketScale. Primary report not accessed. https://www.demandgenreport.com/?p=53853
- [N1] Nielsen Norman Group, "B2B Website Usability for Converting Users into Leads and Customers" (report page) and "B2B Usability" article. https://www.nngroup.com/reports/b2b-websites-usability/ ; https://www.nngroup.com/articles/b2b-usability/
- [S1] Stanford Persuasive Technology Lab, "Stanford Guidelines for Web Credibility" (updated June 2002; based on research with over 4,500 people). https://credibility.stanford.edu/guidelines/
- [C1] Clutch, "How to Choose a Software Developer [With Checklist]" (updated 2025-05-07). https://clutch.co/resources/how-to-choose-a-software-developer
- [C2] Clutch, "Top Software Development Companies" FAQ and "Software Development Services Guide". https://clutch.co/developers ; https://clutch.co/developers/service-guide
- [J1] Jørgensen, M., "Failure factors of small software projects at a global outsourcing marketplace", Journal of Systems and Software (cited via search summary; primary paper not accessed).
- [G1] Google Search Central, "AI features and your website" (updated 2025-12-10). https://developers.google.com/search/docs/appearance/ai-features
- [G2] Google Search Central, "Google's Guide to Optimizing for Generative AI Features on Google Search" (updated 2026-07-10). https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- [G3] John Mueller, "Top ways to ensure your content performs well in Google's AI experiences on Search", Google Search Central Blog, 2025-05-21. https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search
- [G4] Google Search Central, "Creating helpful, reliable, people-first content" (updated 2026-10-05). https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- [G5] Google Search Central Blog, "Introducing Search Generative AI performance reports in Search Console", 2026-06-03. https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
- [P1] Google Play Console Help, "App testing requirements for new personal developer accounts". https://support.google.com/googleplay/android-developer/answer/14151465
- [P2] Google Play Console Help, D-U-N-S number requirement for organisation accounts. https://support.google.com/googleplay/android-developer/answer/13628312
- [A1] Apple Developer Program. https://developer.apple.com/programs/
- [W1] web.dev, "Web Vitals" (updated 2024-10-31). https://web.dev/articles/vitals
- Competitor homepages fetched 2026-10-12: intuz.com, mindinventory.com, mindbowser.com, geekyants.com, solutelabs.com, cmarix.com, squareboat.com, radixweb.com, netguru.com, thoughtbot.com
- Nasscom Annual Strategic Review 2026 (industry context only; FY26 tech industry revenue projected at about USD 315 billion), via press coverage. https://nasscom.in/sites/default/files/media_pdf/Nasscom%20SR%20Press%20release.pdf
- India cost guides (vendor marketing, used only to frame price factors): itmtb.com, shimirait.com, rannlab.com, spacetotech.com (2026 editions)
