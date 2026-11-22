# Editorial Guidelines — InvoSpec Website

> **Update 2026-10-18 (ADR-002).** Never name backend technologies (Java, Spring Boot, Node.js, PHP, MySQL, Firebase and the like) in public copy: say what the backend does and that the server technology is chosen per project, written into the plan and documented. Flutter, Android (Kotlin) and iOS (Swift) may be named. Prices: only the published package ranges, always as "starting" prices with the caveat that the exact price is in the written plan; never "affordable", "cheapest" or delivery-speed promises. `yarn seo:check` enforces the banned names and words.

> Standards for all written content on the website.
> Content model → [`content-model.md`](./content-model.md)

---

## Core Principle

> Write for real human beings solving real business problems.
> SEO is a side effect of useful, specific, honest content.

---

## Voice and Tone

### How InvoSpec Sounds

**Professional but not corporate:**
- Direct and clear, not verbose
- Technically grounded — uses actual technologies and methods
- Honest about what the company does and doesn't do
- Confident without claiming to be "the best"

**Specific not vague:**
- "We build mobile apps using Flutter for iOS and Android" ✓
- "We create amazing digital experiences" ✗

**Engineering-focused not marketing-focused:**
- Describes real work, real decisions, real constraints
- Uses correct technical terminology
- Explains processes like an engineer would, not a salesperson

---

## Vocabulary Rules

### Use

```
software development
mobile app development
web application
API development
backend services
deployment
cloud hosting
maintenance
feature development
SaaS product
MVP
business automation
Flutter, Java, Spring Boot, Firebase, MySQL (when accurate)
iOS, Android
client-side, server-side, database layer
```

### Avoid

```
"cutting-edge"
"innovative solutions"
"revolutionary"
"best-in-class"
"world-class"
"digital transformation"
"game-changing"
"paradigm shift"
"synergy"
"leverage" (unless technical context)
"utilize" (use "use")
"deep dive" (overused)
"seamless"
"robust" (without specifics)
"scalable" (without specifics)
"mission-critical" (without specifics)
```

---

## What Is Permitted vs Prohibited

### Permitted

| Content | Condition |
|---|---|
| Technology descriptions | Accurate, specific |
| Process explanations | Real company process |
| Service descriptions | Services actually provided |
| Industry knowledge | Real domains the company serves |
| Engineering how-tos | Accurate technical information |
| Cost guidance (ranges) | Honest, qualified ranges with clear caveats |
| Project types described | Generic project types without fabricated specifics |

### Prohibited — No Exceptions

| Content | Reason |
|---|---|
| Fabricated client names | Deceptive |
| Fabricated project metrics | Deceptive |
| Fabricated testimonials | Deceptive + Google policy violation |
| Fabricated team size | Deceptive |
| Fabricated years of experience | Deceptive |
| Fabricated award claims | Deceptive |
| Fabricated certifications | Deceptive |
| Invented statistics | Deceptive |
| AI-generated filler paragraphs | Thin content; poor user experience |
| Keyword-stuffed paragraphs | SEO spam; poor user experience |
| City pages without real offices | Doorway pages; SEO spam |

---

## Content Structure Standards

### Service Pages

Every service page must answer these questions naturally (not as a checklist):
1. What is this service?
2. What specific problems does it solve?
3. What does the work actually involve?
4. What technologies are used and why?
5. What is the typical process?
6. What kind of output/deliverable is produced?
7. What questions do buyers typically have? (FAQ section)

**Length:** Service pages should have enough content to genuinely inform a buyer. Typically 600–1200 words of body content. Not artificially padded.

### Blog Articles

Articles must answer a real question with genuine depth.

Article structure:
1. **Introduction** — state the problem or question clearly
2. **Body** — answer it with specific, accurate information
3. **Practical sections** — concrete steps, examples, considerations
4. **Conclusion** — summary + clear next step

**Length:** Determined by the topic. A shallow article is worse than no article. Aim for thorough coverage, not word count.

**Research standard:** Every factual claim should be verifiable. Engineering articles must be technically accurate.

### Case Studies

Structure:
1. Context — what was the business situation?
2. Problem — what needed to be solved?
3. Approach — how was it solved? (technical and strategic)
4. Outcome — what was delivered? (honest description)

**Results section:** Only real, verifiable outcomes. Never invented percentages.

Acceptable: "The app was successfully published to both the App Store and Google Play within the agreed timeline."
Not acceptable: "The app increased user engagement by 340%." (unless you have the real data)

---

## SEO Writing Standards

### Titles and Headings

- H1: Contains the primary topic. Reads naturally. Not keyword-stuffed.
- H2s: Break the content into logical sections. Contain secondary topics naturally.
- Not acceptable: Repeating the exact same keyword phrase in every heading.

### Meta Descriptions

- Describe what the page provides
- 140–160 characters
- Include a soft CTA ("Learn how InvoSpec builds...")
- Unique for every page
- Not a list of keywords

### Keyword Integration

Keywords appear naturally because the content is relevant — not because they were forced in.

✓ "Our mobile app development services cover iOS and Android using Flutter. We handle the full lifecycle from design through App Store publication."

✗ "Mobile app development services, mobile app development, app development services, mobile application development India — we provide mobile app development."

---

## Accessibility in Content

- Use plain language where possible without sacrificing technical accuracy
- Avoid jargon without explanation in public-facing content
- Lists are clearer than dense paragraphs for feature/benefit content
- Images need descriptive alt text that conveys what the image shows

---

## Updating Content

When updating existing content:
- Update the `updatedAt` date in frontmatter
- Verify all factual claims are still accurate
- Update internal links if related pages have changed slugs
- Do not silently change meaning of published content (it may affect SEO signals)

---

## The "Would a Real Engineer Say This?" Test

Before publishing any sentence, ask: "Would a working software engineer be comfortable saying this to a client?"

If the answer is no, rewrite it.

---

*Last updated: 2026-10-04*
