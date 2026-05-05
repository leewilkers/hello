# Personal Website Agent Instructions

## Project

- Site repo: `/Users/leewilkers/vaults/claude_hub/Projects/personal_website`
- Live site: `https://leewilkers.com`
- Local dev URL usually: `http://localhost:8125/`
- Stack: Eleventy static site, hand-written Nunjucks/CSS/JS, GitHub Actions deploy.

## Read First

1. `/Users/leewilkers/vaults/claude_hub/AGENTS.md`
2. `/Users/leewilkers/vaults/claude_hub/CODEX_CONTEXT.md`
3. `/Users/leewilkers/vaults/claude_hub/00_SYSTEM/AGENT_MEMORY/ACTIVE_AGENT_LOCK.md`
4. Latest relevant handoff in `/Users/leewilkers/vaults/claude_hub/00_SYSTEM/AGENT_MEMORY/`

## Working Rules

- Claim `ACTIVE_AGENT_LOCK.md` before mutating files.
- Do not push unless Lee explicitly asks.
- Preserve existing visible copy unless Lee explicitly asks for copy changes.
- Prefer Lee's exact phrases over generated consulting/positioning prose.
- For personal-site copy, treat Lee's use of `hospitality` as the broader ethic of care, welcome, attention, and making people feel held; do not reduce it to food service or restaurants unless Lee explicitly says so.
- Do not turn Stream on in primary nav unless Lee explicitly asks.
- Do not bulk-retopic shelf/stream items or normalize taxonomy without a review report first.
- Do not rename, collapse, add, or delete Shelf topics without asking Lee first and getting explicit approval. Topic-count cleanup is not implicit permission to rename or restructure the taxonomy.
- When adding Shelf items from a mixed list or a batch of links, research and place each item individually. Do not assume every item in the batch belongs to the same topic unless Lee explicitly says so; if Lee gives a heuristic like "err toward Bullshit unless obviously not," use that heuristic while preserving obvious exceptions.
- When Lee approves a new Shelf topic because an item cluster does not yet exist, check for obvious existing items that belong in the new cluster and move them in the same lane instead of leaving them stranded in a neighboring topic.
- Do not delete shelf, stream, image, or portfolio assets without explicit approval.
- Treat `shelf_list: true` as a display/curation preference, not permission to hide a real cover. If a Shelf item has `image`, public Shelf rendering should keep the cover unless Lee explicitly asks to remove or suppress that image.
- For Shelf covers, do not use browser screenshots of article pages, paywall pages, DOI landing pages, PDF download pages, or source text pages as faux covers. Use actual book/report/issue covers when they exist; for papers, journal articles, and essays without real covers, prefer a deliberate typographic/document-card treatment or a resting text overlay over pretending a source page is cover art.
- For Shelf review/curation, treat browser-local state as fragile user work. Before reload-heavy code changes, source retopics, taxonomy renames, localStorage migrations, or browser resets, checkpoint or export the current `shelf:list-items:v1` and `shelf:topic-items:v1` state and report whether it was recoverable. Do not add guards that silently clear large localStorage states.
- Keep the public Shelf separate from internal curation tooling. The live/public `/shelf/` page must not expose review controls, compact-list controls, Stream/Removed review buckets, drag-topic controls, curation export buttons, or browser-storage curation scripts. Any curation UI must be explicitly gated, for example by `shelfCuration: true` or a separate local/admin template, never included by default in `shelf.njk`.
- Local Shelf/admin tools should still look like Lee's site, not a generic dashboard: use the site's ink/paper/Flexoki palette, serif/mono hierarchy, quiet rules, and restrained controls, with the interactive/admin layer clearly visible. Do not treat a user-provided cover/source image as a design reference unless Lee explicitly says it is one.
- Before pushing Shelf changes live, scan generated `_site/shelf/index.html` and the cache-busted live page for internal markers such as `shelf-review`, `shelf-card-controls`, `shelf-list-row`, `data-shelf-action`, `data-shelf-dest`, `data-shelf-arm-topic`, `data-curation-dest`, `copy curation`, `new topic`, `Stream</h2>`, `Removed</h2>`, and `Shelf curation controls`.

## Design Direction

- Desired feel: a blend of nature and modern.
- Avoid loud palette demos, generic SaaS styling, and AI-polished consulting copy.
- Desired color vibe is ink/paper/prose/code; evaluate Radix and OKLCH; avoid green/yellow-green defaults unless explicitly chosen.
- The default background is Flexoki paper `#FFFCF0` in light mode and Flexoki black `#100F0F` in dark mode until Lee chooses a new system.
- Current color taste signal: green can read pukey as a default; keep green/organic palettes opt-in until Lee chooses one. Oxide was interesting but orange may be too much.
- Do not respond to readability concerns by adding more decorative color. First check typography, hierarchy, contrast, proximity, and alignment.
- Use color by role: tasteful blue/cyan for links and actions, muted moss/organic tones for rabbit/rules/ornament, neutral or very quiet tones for section labels.
- Keep the homepage subtitle and primary reading text neutral unless Lee explicitly asks for a more editorial color treatment.
- Current typography lesson: EB Garamond-like body text has charm but can slow parsing on the web. For readability experiments, try `Literata` or `Source Serif 4` first; `Spectral`, `IBM Plex Serif`, and a deliberate `Source Serif 4` + `Atkinson Hyperlegible` split are also plausible.
- Avoid "similar but not same" serif pairings that create type conflict. Either use one readable serif family concordantly, or make the body/label contrast deliberate.
- If section labels feel muddy, adjust scale, weight, spacing, and neutrality before reaching for yellow-green or high-chroma accents.
- Judge imagery and ornaments at rendered size, not source size.
- Do not add an `About` subheader above the homepage intro by default; the first block already functions as About unless the page gets denser.
- Keep `Things I've worked on` collapsed on the homepage as a signal. If it becomes too text-heavy, move fuller detail to Consulting or a deeper page instead of making the homepage a wall.

## Homepage Motifs

- Rabbit/burrow trail is a site footer-ish motif, not just a divider.
- The trail should fill the viewport width and stay subtly visible in both light and dark modes.
- The default trail should stay neutral unless Lee explicitly picks a green/organic palette.
- Preserve original ornament texture. Do not hard-threshold rabbit assets into flat silhouettes.
- Do not upscale tiny ornament crops; use native-or-smaller render sizes.

## Pardon Dust Note

- Keep the full text unless Lee asks otherwise: `pardon dust. workin on it`.
- Light kaomoji: `( ノ・_・)ノ`
- Dark kaomoji: `( ノ--_ --)ノ`
- Do not reintroduce leaf/fleuron/dot/decorative marks before it unless Lee explicitly asks.
- Placement is currently fixed lower right; preserve the eye open/close effect.

## Audio / Cat Loop

- Brown-noise/drone loop layer should remain removed.
- Chromatic half-step note should remain removed unless Lee asks to revisit it.
- Manual clicks should stay responsive; loop mode may have separate timing.
- Current intent: relaxing but not glacial, quantized enough to avoid sloppy timing.

## Hover Notes

- Future homepage hover notes should not use browser-yellow `title` boxes.
- Hover/focus notes should look native to the site.
- Any phrase with a hover note should also be silently linked to a useful external reference.
- Must work with keyboard focus and have a mobile/touch fallback.

## Colophon

- Lower-left colophon should name the stack clearly.
- Include Eleventy, Sveltia CMS, and Flexoki.
- Do not include GitHub Pages in the visible colophon unless Lee asks.

## Validation

Before saying a website change is done, run:

```bash
python3 scripts/validate_items.py
git diff --check
npm run build
```

For visual/layout changes, also browser-check:

- Desktop and mobile widths.
- Light and dark modes when color/motif/header/footer changes.
- No horizontal overflow.
- Rabbit/dust/colophon do not collide at common viewport sizes.

## Shipping

- Commit intentionally with scoped paths, not broad `git add .`.
- `gh run list` may fail locally with `HTTP 401: Bad credentials`; if so, verify deployment through public GitHub API and direct public-site readback.
- After pushing, confirm the live site serves the expected HTML/CSS with a cache-busting query string.
