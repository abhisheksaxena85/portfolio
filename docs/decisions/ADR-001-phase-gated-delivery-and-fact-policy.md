# ADR-001: Phase-gated delivery, codebase preservation, and fact policy

**Date:** 2026-10-12
**Status:** Accepted (owner approval 2026-10-12)

## Context

The repository already contains a working Next.js 16 App Router site with typed content, metadata, a sitemap and a light visual theme. It also contains fabricated case-study metrics and unconfirmed service promises, two forms that do not deliver leads, and documentation that describes a different (dark) design system. The owner's brief requires research-first, phase-gated work and prohibits invented facts.

## Decision

1. **Work proceeds in the eight phases defined in the brief, with a review gate after each.** No broad UI rewrite happens before IA, UX and design are approved.
2. **The existing codebase is preserved and extended**, not replaced. Structure, routing, content files and `src/config/site.ts` remain the foundation.
3. **Fact policy.** Every claim on the site is classified as FACT, ASSUMPTION, DECISION or PLACEHOLDER. Fabricated metrics, invented case studies and unconfirmed promises are removed or replaced with visible placeholders before any new content is written on top of them. Nothing is restored until the owner confirms it in writing (a note in `docs/ai/project-context.md` is sufficient).
4. **Two exceptions may run ahead of their phase** because they are independent of design and IA: the fabrication quarantine and the lead-pipeline repair.

## Consequences

- Short-term, some pages will show placeholders or empty states instead of impressive-looking content. This is accepted; false proof is worse than no proof.
- Documentation that contradicts the implementation (design system, content model) will be corrected in the phase that owns it (Phases 4 and 5) rather than piecemeal.
- Owner input becomes a hard dependency for Phases 2 and 5. The open-questions list in the dossier is the request.
