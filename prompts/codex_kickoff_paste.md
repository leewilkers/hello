# Codex Kickoff — paste the block below

Run from `~/vaults/claude_hub/Projects/personal_website/`.

```
cat prompts/codex_kickoff_paste.md | pbcopy
codex   # paste at the prompt
```

Or just paste the fenced block below directly into Codex.

---

````
ROLE
You are a curation agent operating on Lee Wilkers's Raindrop.io account
(ltwilkers@gmail.com, 169 bookmarks). You will produce review reports —
NOT direct writes to Raindrop — across three phases. A fourth apply
phase exists but you will NOT run it without an explicit later
instruction from Lee that names the phase ("apply phase 1", etc.).

WORKING DIR
/Users/leewilkers/vaults/claude_hub/Projects/personal_website

ENV
The Raindrop token and collection IDs live in .env (gitignored). Load:
    source .env
You will use:
    $RAINDROP_TOKEN          # personal access token, no expiry
    $RAINDROP_SHELF_ID       # 70176122
    $RAINDROP_STREAM_ID      # 70173349

OUTPUT DIR
Create prompts/_outputs/ if missing. All reports go there. Filename
convention: YYYY-MM-DD_phase-N_<slug>.md . Use today's date.

HARD RULES
1. Dry-run only. No PUT / POST / DELETE to Raindrop in this run.
2. Don't fabricate metadata. Sort + tag decisions must be grounded in
   the bookmark's title, URL, excerpt, existing tags. If you'd be
   guessing, mark LOW_CONFIDENCE and leave the call to Lee.
3. channel:* tags are routing, not subject. Never merge them into
   subject tags.
4. En-dashes (–), not em-dashes (—). Inherit Lee's house style.
5. Reason fields stay ≤ 15 words. No sales pitches. Cite the rule.

==============================================================
SITE CONTEXT — what shelf and stream actually mean
==============================================================

Lee's site (leewilkers.com) is a static Eleventy site. Raindrop is
upstream of it; what gets sorted here will eventually flow into local
content/items/*.md records. Two destination collections exist on
Raindrop:

SHELF (high bar, expect ~10–15% of items)
  Topical index of load-bearing influences — things that shaped how
  Lee thinks. Permanent reference. Each shelf item lives under exactly
  one topic from the fixed 26-topic list and carries editorial voice
  (dek/blurb/quote/note) when published to the site.
  Valid types: book, essay, journal article, paper, working paper, report, site, tool, project, film, interview, slides, concept.

STREAM (default, expect ~85–90% of items)
  Link feed — interesting reads, signal, single-author newsletters,
  editorial publications (Real Life, Paris Review, etc.), ephemera.
  Linkblog character. No topic required. Optional section slug.

THE 22 SHELF TOPICS (canonical, from _data/topics.json)
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

REFERENCE FILES IN REPO (read for grounding before sorting)
  CLAUDE.md                       project overview + item frontmatter spec
  _data/topics.json               the 22 topics
  _data/stream_sections.json      stream sections (currently [])
  content/items/*.md              253 existing site items — useful for
                                  calibrating "what kind of thing has
                                  Lee already shelved vs streamed"

==============================================================
RAINDROP API RECIPES — everything you need
==============================================================

Base: https://api.raindrop.io/rest/v1
Auth header: Authorization: Bearer $RAINDROP_TOKEN
Special collection IDs: 0 = all, -1 = unsorted, -99 = trash
Rate limit: 120 req/min. Stay under 100/min for reads.

LIST ALL BOOKMARKS (paginated, 50/page max)
  curl -s -H "Authorization: Bearer $RAINDROP_TOKEN" \
    "https://api.raindrop.io/rest/v1/raindrops/0?perpage=50&page=0"
  Response: {count, items[{_id, title, link, excerpt, tags, note,
    created, collection:{$id}}]}.
  Iterate page=0,1,2,... until you have all 169.

LIST ALL TAGS (with counts)
  curl -s -H "Authorization: Bearer $RAINDROP_TOKEN" \
    "https://api.raindrop.io/rest/v1/tags/0"

(Phase-4-only — DO NOT run in this session)
MOVE ONE BOOKMARK
  curl -X PUT -H "Authorization: Bearer $RAINDROP_TOKEN" \
       -H "Content-Type: application/json" \
       -d '{"collection":{"$id": <ID>}}' \
       "https://api.raindrop.io/rest/v1/raindrop/<bookmark_id>"
BULK MOVE
  curl -X PUT -H "Authorization: Bearer $RAINDROP_TOKEN" \
       -H "Content-Type: application/json" \
       -d '{"ids":[1,2,3], "collection":{"$id": <ID>}}' \
       "https://api.raindrop.io/rest/v1/raindrops/0"
RENAME TAG GLOBALLY
  curl -X PUT -H "Authorization: Bearer $RAINDROP_TOKEN" \
       -H "Content-Type: application/json" \
       -d '{"replace":"new-tag"}' \
       "https://api.raindrop.io/rest/v1/tags/0/old-tag"
DELETE TAG GLOBALLY
  curl -X DELETE -H "Authorization: Bearer $RAINDROP_TOKEN" \
       -H "Content-Type: application/json" \
       -d '{"tags":["dead-tag"]}' \
       "https://api.raindrop.io/rest/v1/tags/0"

==============================================================
PHASE 1 — SORT REPORT (shelf vs stream)
==============================================================

Input: all 169 bookmarks across all collections.

Per-bookmark decision rules. Default STREAM. Promote to SHELF only if
ALL hold:
  1. Lee would plausibly write a 1–3 sentence blurb or pull a quote.
  2. It maps cleanly to ONE of the 26 topics.
  3. It's a primary work — book, canonical essay, named concept, a
     person's site treated as a body of work, film, slide deck,
     interview — not a single news item or one-off post.
  4. It would still feel relevant 2 years from now.
If unsure → STREAM.
If junk / dead link / accidental save → ARCHIVE_CANDIDATE (do not
auto-trash).

Output file: prompts/_outputs/<DATE>_phase-1_sort.md

# Phase 1 — Sort report (169 bookmarks)

## Summary
- shelf: N (X%)
- stream: N (X%)
- archive_candidate: N
- low_confidence: N

## Shelf candidates (N)
| id | title | url | type | topic | confidence | reason |

## Stream (N)
| id | title | url | suggested_section | confidence | reason |

## Archive candidates (N)
| id | title | url | reason |

## Low-confidence calls (N) — Lee to rule
| id | title | url | proposed | alternative | what's ambiguous |

==============================================================
PHASE 2 — TAG AUDIT (report only, flag don't fix)
==============================================================

Input: full tag list with counts (/tags/0) + 5 sample bookmarks per
tag (sample by hitting /raindrops/0?search=%23<tag>).

Output file: prompts/_outputs/<DATE>_phase-2_tag_audit.md

# Phase 2 — Tag audit

## Statistics
- Total tags, total bookmarks (169), mean tags/bookmark, % untagged

## Mechanical issues
- Casing inconsistency
- Singular/plural splits
- Punctuation/whitespace variants
- Typos and near-duplicates (Levenshtein ≤ 2)

## Semantic issues
- Synonym clusters (2+ tags doing same job)
- Overlap with the 26 shelf topics — which tags duplicate a topic
- Dead/orphan tags (count = 1 and not part of an axis)
- Missing axes — concepts that recur in titles/excerpts but lack a tag
- channel:* tags listed separately — routing, not subject

## Raw tag list
| tag | count | sample bookmarks |

==============================================================
PHASE 3 — TAG IMPROVEMENT PROPOSAL
==============================================================

Run AFTER Phase 2. Depends on Lee's review marks if available; if not,
proceed with proposal and flag everything <80% confidence as
LOW_CONFIDENCE.

Design constraints:
  - Subject tags sit BELOW topic-level granularity (topics coarse;
    tags specific — e.g. topic Infrastructure + tag maintenance).
  - channel:* is its own namespace; do not mix.
  - Lowercase, hyphenated, singular by default unless plural reads
    naturally.
  - Aim for ≤ 120 active tags. Prefer merging to splitting.
  - Every proposed tag must apply to ≥ 3 existing bookmarks OR fill
    a clear missing axis.

Output file: prompts/_outputs/<DATE>_phase-3_tag_proposal.md

# Phase 3 — Tag improvement proposal

## Renames        old → new, count, rationale
## Merges         tag_a + tag_b → kept, count, rationale
## Retirements    tag, count, where bookmarks should redirect
## New tags       tag, axis, candidate bookmarks (≤5)
## Final canonical set (grouped by axis: subject / channel / format / status)

## Apply plan (JSON — DO NOT EXECUTE)
```json
{
  "renames": {"old": "new"},
  "merges":  {"old_a,old_b": "kept"},
  "retire":  ["dead_tag"],
  "add":     [{"tag": "...", "applies_to": [<bookmark_ids>]}]
}
```

==============================================================
PHASE 4 — APPLY (DO NOT RUN IN THIS SESSION)
==============================================================

Only on Lee's explicit "apply phase N" later. When run:
  - Sort apply: bulk-move per Phase 1 verdicts, grouped by destination,
    one bulk PUT per destination. Skip ARCHIVE_CANDIDATE +
    LOW_CONFIDENCE unless Lee specifies.
  - Tag apply: rename → merge → retire → add, in that order. Sleep
    0.5s between writes. Log every API call.
  - Log file: prompts/_outputs/<DATE>_phase-4_apply.log
  - Verify: re-pull collection counts and tag list, diff against
    expected, report any drift.

==============================================================
RUN ORDER FOR THIS SESSION
==============================================================

1. ASK Lee these three questions FIRST. Do not proceed until answered:
   a) Stream sections — _data/stream_sections.json is currently []. For
      Phase 1, do you want me to (i) suggest sections inline so you can
      finalize a list later, or (ii) leave section: null and address
      sectioning separately?
   b) Inbox handling — collection 64707165 (Inbox) is empty. Should
      future unsorted bookmarks land there or in -1 (Raindrop's
      built-in Unsorted)?
   c) Archive vs trash — for ARCHIVE_CANDIDATE items in Phase 1, the
      default is "tag and leave in place." Confirm or specify
      alternative (move to a new "archive" collection / send to trash).

2. Run Phase 1 and Phase 2 IN PARALLEL (independent inputs). Write both
   reports to prompts/_outputs/.

3. Run Phase 3 once Phase 2 is complete (does not require Lee's review
   of Phase 2 to proceed — flag low-confidence items so Lee can rule
   in one pass).

4. STOP. Report file paths back to Lee. Do not enter Phase 4.

==============================================================
DEFINITION OF DONE FOR THIS SESSION
==============================================================

[ ] Three reports written under prompts/_outputs/.
[ ] Three pre-flight questions answered before any sort decisions made.
[ ] No PUT/POST/DELETE calls made to Raindrop API.
[ ] Final message to Lee = bullet list of file paths + a one-line
    summary per report (e.g., "Phase 1: 21 shelf / 142 stream / 6
    archive_candidate / 14 low_confidence").
````
