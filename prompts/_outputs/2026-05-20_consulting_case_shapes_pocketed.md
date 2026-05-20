# Consulting page — case shapes: pocketed, not shipped

**Date**: 2026-05-20
**Status**: Slot drafted, declined for now, kept in pocket.

## What this is

A credibility-leaf section that would sit between the deliverables list and Contact on `/consulting/` — 2-3 anonymized engagement archetypes ("case shapes") demonstrating the *type* of problems Lee has actually been hired to solve. Past-tense pattern-recognition, no client names.

## The slot template (Nunjucks snippet)

```njk
<section class="consulting-section consulting-cases">
  <p>Recent work:</p>
  <ul class="cases-list">
    <li>[shape 1 — e.g. a synthesis memo for a multinational research team on informed consent in a high-stakes drug-distribution program]</li>
    <li>[shape 2 — e.g. manuscript revisions for a global health agency at draft 3, with reviewer-anticipation framing]</li>
    <li>[shape 3 — e.g. a problem-framing memo for a philanthropic grant before drafting started]</li>
  </ul>
</section>
```

Insert between `consulting-deliverables` and `consulting-contact` sections in `consulting.njk`.

## Why declined for now

- **Essay link is already the credibility move.** A buyer who reads `/consider-the-tree/` learns more about how Lee thinks than three engagement bullets can convey.
- **Wounds list does double duty.** Each wound is also implicit case-evidence — the specificity proves pattern-recognition without needing a separate section.
- **Anonymized always signals weaker than named.** Most of Lee's recent work is NDA-coded (Merck, Pfizer, WHO drafts). Shapes carry an unavoidable *"I can't say more"* subtext that undercuts the rhetorical move.
- **Pipeline is warm, not cold.** Most inbound comes via FACE/Task Force/Emory network where Lee is pre-credentialed; case shapes are higher leverage for cold inbound from strangers.

## When to revisit

Add the section IF:
- Cold inbound from strangers becomes a meaningful share of contacts
- A non-NDA client gives explicit permission to name them
- Buyer feedback specifically flags missing credentialing as a reason for not engaging
- Lee adds a separate "selected work" surface (CV-style) elsewhere on the site and wants to mirror its shape on the consulting page

## Related

- `prompts/_outputs/2026-05-16_procurement_page_DRAFT.md` — original consulting MVP draft
- `00_SYSTEM/AGENT_MEMORY/HANDOFF_NOTE_2026-05-20_TREE_ESSAY_QUARRY_AND_CONSULTING_PAGE.md` — context for the MVP ship + revert cycle
- Commits `f080232` (CTA + nuts-and-bolts) and `945a1c5` (bridge line + slot installed) on `perception-wip` — the consulting page work this slot was originally part of
