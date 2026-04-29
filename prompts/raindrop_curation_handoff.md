# Raindrop Curation Handoff (for Codex)

**Owner:** Lee Wilkers (ltwilkers@gmail.com on Raindrop)
**Goal:** Zhuzh up Raindrop. Sort 169 bookmarks into the right collections (`shelf` vs `stream`), then audit and clean the tag set. Output is a series of reports Lee reviews; an apply step writes to Raindrop only after Lee confirms.
**Created:** 2026-04-26 from `Projects/personal_website/`

---

## 0. Hard rules

1. **Dry-run by default.** No `PUT`/`POST`/`DELETE` to Raindrop until Lee explicitly approves a specific report.
2. **Don't fabricate metadata.** Sort and tag decisions must be grounded in the bookmark's title, URL, excerpt, and existing tags. If you'd be guessing, mark `LOW_CONFIDENCE` and leave it.
3. **Reports go to `prompts/_outputs/`** in this repo (create the dir). One markdown file per phase. Filename = `YYYY-MM-DD_phase-N_<slug>.md`.
4. **Channel-style tags** (`channel:globalhlth`, `channel:substack`, etc.) are routing metadata, not subject. Treat them as their own namespace — never merge into subject tags.
5. **Lee uses en-dashes (–), not em-dashes (—).** Reports inherit this.

---

## 1. Auth + environment

```bash
# Working directory
cd /Users/leewilkers/vaults/claude_hub/Projects/personal_website

# Token lives in .env (gitignored). Load it:
source .env
echo $RAINDROP_TOKEN   # 7c3a9d92-... (personal access token, no expiry)

# Collection IDs (also in .env)
echo $RAINDROP_SHELF_ID    # 70176122
echo $RAINDROP_STREAM_ID   # 70173349
```

All Raindrop API calls use `Authorization: Bearer $RAINDROP_TOKEN`.

---

## 2. Raindrop API recipes Codex will need

Base: `https://api.raindrop.io/rest/v1`. Special collection IDs: `0` = all, `-1` = unsorted (Inbox surrogate), `-99` = trash.

**List all bookmarks (paginated, 50/page max):**
```bash
curl -s -H "Authorization: Bearer $RAINDROP_TOKEN" \
  "https://api.raindrop.io/rest/v1/raindrops/0?perpage=50&page=0" | jq .
```
Response has `count` (total) and `items[]` with `_id`, `title`, `link`, `excerpt`, `tags`, `collection.$id`, `created`, `note`.

**List all tags with counts (across all collections):**
```bash
curl -s -H "Authorization: Bearer $RAINDROP_TOKEN" \
  "https://api.raindrop.io/rest/v1/tags/0" | jq .
```

**Move one bookmark to a collection:**
```bash
curl -s -X PUT -H "Authorization: Bearer $RAINDROP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"collection":{"$id": 70176122}}' \
  "https://api.raindrop.io/rest/v1/raindrop/<id>"
```

**Bulk move (preferred for apply step — single API call):**
```bash
curl -s -X PUT -H "Authorization: Bearer $RAINDROP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ids":[1,2,3], "collection":{"$id": 70173349}}' \
  "https://api.raindrop.io/rest/v1/raindrops/0"
```

**Rename a tag globally:**
```bash
curl -s -X PUT -H "Authorization: Bearer $RAINDROP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"replace":"new-tag"}' \
  "https://api.raindrop.io/rest/v1/tags/0/old-tag"
```

**Delete a tag globally:**
```bash
curl -s -X DELETE -H "Authorization: Bearer $RAINDROP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tags":["dead-tag"]}' \
  "https://api.raindrop.io/rest/v1/tags/0"
```

Rate limit: 120 req/min. Sleep 0.5s between writes; for reads stay under 100/min.

---

## 3. Local site context (what shelf vs stream actually mean)

Lee's site is a static Eleventy site. Raindrop is upstream of it — what gets sorted into `shelf` vs `stream` here will eventually flow into `content/items/*.md` records on the site.

### shelf — high-bar topical influence index

- **Purpose:** load-bearing influences. Things that shaped how Lee thinks. Permanent reference.
- **Form:** each item lives under exactly one **topic** from a fixed 26-item list and carries editorial voice (dek/blurb/quote/note) when published.
- **Valid types:** `book`, `essay`, `journal article`, `paper`, `working paper`, `report`, `site`, `tool`, `project`, `film`, `interview`, `slides`, `concept`.
- **Site rendering:** topical index, mono-small-caps label + serif body. Each row shows e.g. `BOOK <title> <author> <year>` plus optional dek/blurb/quote/note.
- **Topics (canonical, from `_data/topics.json`):**
  ```
  Architecture & Built Environment
  Classification, Diagrams & Representation
  Design
  Ecology & Life Sciences
  Ethics & Moral Philosophy
  Experiences
  Furniture & Craft
  Games, Play & Performance
  Global Health, Aid & Development
  Infrastructure & Maintenance
  Interfaces & Interaction
  Language & Writing
  Measurement, Value & Scale
  Methods, Evidence & Judgement
  Organizations, Institutions & Strategy
  Potpourri
  Social Theory
  Tech Culture
  Tech History, STS & Criticism
  Technology, general
  Visual Culture
  Web
  ```

### stream — link feed (default bucket)

- **Purpose:** interesting reads, signal worth surfacing, single-author newsletters, editorial publications (Real Life, Paris Review, etc.), ephemera.
- **Form:** linkblog character. No topic required. Optional `section` slug from `_data/stream_sections.json` (currently empty `[]` — section taxonomy not yet defined).
- **Site rendering:** sectioned feed; editorial-voice publications render with empty title.

### Distribution expectation

Lee expects stream to **dwarf** shelf (e.g. ~150 stream / ~20 shelf out of 169). Shelf is high-bar; treat stream as default.

### Reference files in this repo (read for grounding)

- `CLAUDE.md` — project overview, item frontmatter spec
- `_data/topics.json` — the 26 shelf topics
- `_data/stream_sections.json` — stream section slugs (currently empty)
- `content/items/*.md` — 253 existing item records; useful for calibrating "what kind of thing has Lee already shelved vs streamed"

---

## 4. Phase 1 — Sort report (shelf vs stream)

**Input:** all 169 bookmarks across all collections (call `/raindrops/0` paginated until you have them all).

**Per-bookmark decision rules — default STREAM. Promote to SHELF only if ALL hold:**

1. Lee would plausibly write a 1–3 sentence blurb or pull a quote about it.
2. It maps cleanly to ONE of the 26 topics.
3. It's a primary work — a book, a canonical essay, a named concept, a person's site treated as a body of work, a film, slide deck, or interview — not a single news item or one-off post.
4. It would still feel relevant 2 years from now.

If unsure → STREAM. If something looks like junk / dead link / accidental save → flag as `ARCHIVE_CANDIDATE` (do not auto-trash).

**Output:** `prompts/_outputs/2026-04-26_phase-1_sort.md`

```markdown
# Phase 1 — Sort report (169 bookmarks)

## Summary
- shelf: N (X%)
- stream: N (X%)
- archive_candidate: N
- low_confidence: N

## Shelf candidates (N)
| id | title | url | type | topic | confidence | reason |
|----|-------|-----|------|-------|------------|--------|
| ... |

## Stream (N)
| id | title | url | suggested_section | confidence | reason |
|----|-------|-----|-------------------|------------|--------|
| ... |

## Archive candidates (N)
| id | title | url | reason |

## Low-confidence calls (N) — Lee to rule on these
| id | title | url | proposed | alternative | what's ambiguous |
```

`reason` ≤ 15 words and must cite which rule the call hangs on. Don't write a sales pitch.

---

## 5. Phase 2 — Tag audit (report only, no edits)

**Input:** full tag list with counts (`/tags/0`) plus 5 sample bookmarks per tag.

**Output:** `prompts/_outputs/2026-04-26_phase-2_tag_audit.md`

```markdown
# Phase 2 — Tag audit

## Statistics
- Total tags: N
- Total bookmarks: 169
- Mean tags/bookmark: X
- % untagged: X

## Mechanical issues
- Casing inconsistency (`Tech-Criticism` vs `tech-criticism`)
- Singular/plural splits (`interface` vs `interfaces`)
- Punctuation/whitespace variants
- Typos and near-duplicates (Levenshtein ≤ 2)

## Semantic issues
- Synonym clusters (2+ tags doing the same job)
- Overlap with the 26 shelf topics — which tags duplicate a topic
- Dead/orphan tags (count = 1 and not part of an axis)
- Missing axes — concepts that recur in titles/excerpts but have no tag
- Channel-style tags — list separately, do not mix with subject

## Raw tag list (sortable)
| tag | count | sample bookmarks |
```

Flag only. No renames yet.

---

## 6. Phase 3 — Tag improvement proposal

**Input:** Phase 2 audit + Lee's review marks.

**Design constraints:**

- Subject tags sit BELOW topic-level granularity (topics coarse; tags specific — e.g. topic `Infrastructure` + tag `maintenance`).
- `channel:*` is a separate namespace; do not mix.
- Lowercase, hyphenated, singular by default unless plural reads naturally.
- Aim for ≤ 120 active tags. Prefer merging to splitting.
- Every proposed tag must apply to ≥ 3 existing bookmarks OR fill a clear missing axis.

**Output:** `prompts/_outputs/2026-04-26_phase-3_tag_proposal.md`

```markdown
# Phase 3 — Tag improvement proposal

## Renames        old → new, count, rationale
## Merges         tag_a + tag_b → kept, count, rationale
## Retirements    tag, count, where bookmarks should redirect
## New tags       tag, axis, candidate bookmarks (≤5)
## Final canonical set (grouped by axis: subject / channel / format / status)

## Apply plan (JSON — not executed until Lee approves)
```json
{
  "renames": {"old": "new"},
  "merges":  {"old_a,old_b": "kept"},
  "retire":  ["dead_tag"],
  "add":     [{"tag": "...", "applies_to": [<ids>]}]
}
```
```

Flag any change <80% confidence with `LOW_CONFIDENCE` so Lee can rule.

---

## 7. Phase 4 — Apply (gated)

**Do not enter this phase without an explicit "apply phase 1" / "apply phase 3" from Lee.**

When approved:

- **Sort apply:** bulk-move bookmarks per Phase 1 verdicts. Group by destination, one bulk PUT per destination. Skip `ARCHIVE_CANDIDATE` and `LOW_CONFIDENCE` items unless Lee specifies.
- **Tag apply:** rename → merge → retire → add, in that order. Sleep 0.5s between writes. Log every API call with timestamp + response code.
- **Write log:** `prompts/_outputs/2026-04-26_phase-4_apply.log` — append-only, one line per API call.
- **Verify after:** re-pull collection counts and the tag list; diff against expected and report any drift.

---

## 8. Run order

```
Phase 1 (sort report)         → Lee reviews → maybe apply
Phase 2 (tag audit, flags)    → Lee reviews
Phase 3 (tag proposal)        → Lee reviews → maybe apply
Phase 4 (apply, gated)        → only on explicit go
```

Phases 1 and 2 can run in parallel (independent inputs). Phase 3 depends on 2.

---

## 9. Things to ASK Lee about before starting (don't guess)

- **Stream sections** are currently `[]` in `_data/stream_sections.json`. Phase 1 sort can suggest sections, but the canonical list doesn't exist yet. Either (a) suggest sections inline and let Lee pick a final set after, or (b) leave `section: null` for everything and address sectioning in a follow-up.
- **Inbox handling** — collection `64707165 (Inbox)` is currently empty. Confirm with Lee whether unsorted future bookmarks should land there or in `-1` (Raindrop's built-in Unsorted).
- **Archive vs trash** — `ARCHIVE_CANDIDATE` items: keep in current collection with a tag, move to a new `archive` collection, or send to trash? Default: tag and leave in place.

---

## 10. Definition of done

- [ ] Phases 1 and 2 reports written to `prompts/_outputs/`.
- [ ] Lee has reviewed and given verdicts on Phase 1 + Phase 2.
- [ ] Phase 3 proposal written, reviewed.
- [ ] Phase 4 apply log shows expected number of API calls with no errors.
- [ ] Post-apply verification confirms shelf + stream counts match the approved sort, and tag counts match the approved proposal.
