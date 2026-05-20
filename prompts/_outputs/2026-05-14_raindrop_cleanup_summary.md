# Raindrop Cleanup — 2026-05-14 Session Summary

End-to-end Raindrop tag namespace cleanup + Stacks topic-tag seeding.

## Headline change

| Metric | Start | End | Δ |
|---|---|---|---|
| Bookmarks | 224 | 224 | 0 |
| Distinct tags | 779 | **359** | **−54%** |
| Tag-applications | 2,276 | 1,891 | −385 |
| Avg tags/bookmark | 10.16 | **8.44** | −1.72 |
| `topic:` namespace (Stacks-grade) | 0 | **27** | seeded |
| Topic-tag applications | 0 | 224 | full coverage |
| Untagged bookmarks | 0 | 26 | items the auto-tagger couldn't read |

## What was applied

### Batch A — singleton cull (-422 noise tags)
- Deleted every tag used on exactly 1 bookmark.
- Spared 4 named-entity outliers: `AIDS`, `LMIC`, `alan_kay`, `born-digital`.
- Affected 148 bookmarks; lost no searchable signal (singletons can't form clusters).
- Ledger: `scripts/_raindrop_cleanup_2026-05-14T073554Z_batch-A_ledger.json`

### Batch B — synonym/plural merges (-24 tags via 18 merge ops)
Canonical → variants merged:
- `digital` ← digitality, digitalage, digitization, digitalpublishing (38 combined)
- `internet` ← online, internetculture (35)
- `academic` ← academia, scholarship (24)
- `publishing` ← onlinepublication, publication, publish (24)
- `reflection` ← introspection (23)
- `culture` ← cultures; `guide` ← guides; `interface` ← interfaces; `society` ← social; `thinking` ← thoughts; `archive` ← archives; `engagement` ← engagements; `concept` ← concepts; `image` ← images, imagery; `tool` ← tools; `framework` ← frameworks; `network` ← networks; `pdf` ← PDF
- Ledger: `scripts/_raindrop_cleanup_2026-05-14T073956Z_batch-B_ledger.json`

### Topic-tag apply — 27 Stacks topics seeded as `topic:*` namespace (+27 tags, +224 applications)
- Pass 1: 17 bookmarks URL-matched against `content/items/*.md` (Lee's own classifications carried over verbatim)
- Pass 2: 207 bookmarks classified by 6 parallel agents using `_data/topics.json` (27-topic canon) + Lee's actual classifications as training. 103 HIGH / 93 MEDIUM / 11 LOW.
- Final form: `topic:Design`, `topic:Memory & Archives`, `topic:Architecture / Infrastructure / Maintenance` etc.
- Slash form for the two comma-bearing topics (Architecture / Infrastructure / Maintenance, Data / Evidence / Epidemiology) — Raindrop API splits commas in tag names.
- `topic:` prefix solves both case-collision and comma-split issues, and keeps Stacks-grade signal distinct from auto-tags.
- Ledger: `scripts/_raindrop_cleanup_2026-05-14T074855Z_topic-apply_ledger.json`

### Batch C — mega-tag retire (-5 tags / -170 applications)
- Retired: `technology` (55), `research` (43), `knowledge` (28), `website` (28), `interface` (18)
- Kept: `design` (33), `philosophy` (31), `internet` (31), `communication` (26), `digital` (25), `ai` (20), `culture` (18), `narrative` (18), `guide` (18) — all real discriminators
- Lee flip: kept `guide` after initial RETIRE? proposal (his list/guide hook)
- Ledger: `scripts/_raindrop_cleanup_2026-05-14T080029Z_batch-C_ledger.json`

## `topic:` namespace coverage (27 topics, 224 applications)

| Topic | Items |
|---|---|
| topic:Tech | 29 |
| topic:Organizations & Work | 16 |
| topic:Web Culture & Internet | 17 |
| topic:Writing | 15 |
| topic:Interfaces | 14 |
| topic:Sensemaking | 15 |
| topic:Design | 12 |
| topic:Architecture / Infrastructure / Maintenance | 11 |
| topic:Memory & Archives | 11 |
| topic:Strategy & Coordination | 11 |
| topic:Media | 9 |
| topic:Bullshit | 9 |
| topic:(Inner) Space | 7 |
| topic:Furniture & Craft | 6 |
| topic:Photography & Journalism | 6 |
| topic:Social Science | 7 |
| topic:Global Health | 5 |
| topic:Potpourri | 5 |
| topic:(Outer) Space | 4 |
| topic:Ethics | 4 |
| topic:Humor | 3 |
| topic:Fiction | 2 |
| topic:Hospitality | 2 |
| topic:Data / Evidence / Epidemiology, topic:Experiences, topic:Games, topic:Nature & Life | 1 each |

## Decisions made this session (memorialize)

1. **Raindrop is flat** — no folder use; `topic:` namespace is the only organizing layer (besides auto-tags).
2. **Stacks ≠ Raindrop shelf** — the leewilkers.com "shelf" is now called **Stacks**; Raindrop is the firehose. Stacks-topic-tags in Raindrop let you flag candidates without leaving Raindrop.
3. **Search by topic:** uses `#topic:Design` (or quoted `#"topic:Memory & Archives"`).
4. **Search by auto-tag** still works as before (`#design`, `#philosophy`, etc.).

## Open follow-ups

1. **Intent tags** — Batch D doc forthcoming; tags only Lee can apply going forward (`re-read`, `for-stacks`, `for-piece`, `craft-fuel`, `consulting-fuel`).
2. **26 untagged bookmarks** — auto-tagger had nothing to say; Hamming "You and Your Research", Stevey's Google Platforms Rant, marker/music, Castillo RM PDF, and 22 others. Hand-tag with intent tags or topic-tag at leisure.
3. **Topics.json canon drift** — items frontmatter has two non-canonical topics (`Thinking`, `Software`, `Experiences`) that don't appear in `_data/topics.json`. Reconcile when convenient.
4. **Monthly cleaning habit** — Raindrop's auto-tagger will keep producing the same patterns. Re-run singleton cull + synonym merge as a monthly 10-minute pass to keep the namespace useful.

## Rollback

All operations have pre-state ledgers in `scripts/_raindrop_cleanup_*.json` (gitignored per project policy). Each ledger records `tags_before` per affected bookmark id, so any operation can be reversed by re-applying the recorded tag arrays via `PUT /raindrop/{id}`.
