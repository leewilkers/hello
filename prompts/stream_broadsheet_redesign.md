# Stream — broadsheet redesign prompt

Paste the fenced block into Codex / ChatGPT / another Claude. Self-contained.

---

````
ROLE
You are redesigning the /stream/ page on leewilkers.com — a personal
static Eleventy site (https://leewilkers.com). Lee wants to bring back
the broadsheet feel he had in an earlier iteration: multiple vertical
columns, each independently scrollable, like a printed newspaper page
laid out in CSS. The earlier version was rolled back; this revival
must use the current site aesthetic, not the old one.

WORKING DIR
/Users/leewilkers/vaults/claude_hub/Projects/personal_website

PRIMARY FILES YOU'LL TOUCH
  stream.njk                      page template
  css/style.css                   site styles (look for `.stream-*`,
                                  `.archive-console`, `.page-stream`)
  _data/stream_sections.json      ordered section slug list
                                  (currently `[]` — see "open questions")
  _includes/base.njk              HTML shell, nav, theme toggle

REFERENCE FILES TO READ FIRST
  CLAUDE.md                       project overview, item frontmatter,
                                  visual grammar ("LABEL value" pattern)
  .claude/CLAUDE.md               local-only constraints (no mobile
                                  ghost bolt-on, no AI-slop copy)
  shelf.njk                       sister page, current aesthetic at peak
  index.njk                       homepage, same aesthetic register
  content/items/*.md              item records (filter by dest: stream)

PRIOR ART — IMPORTANT
A broadsheet column layout existed in stream.njk + style.css and was
removed. Before designing, run `git log --all --oneline -- stream.njk
css/style.css` and inspect the most recent commit that mentions
"broadsheet" / "column" / "stream column." Read what the prior version
did and what reasoning the commit message gives for removal. The new
version is a REVIVAL with updated aesthetic, not a fresh invention —
preserve any structural decisions that were good (column boundaries,
section assignment) and address whatever caused the rollback.

==============================================================
WHAT THE PAGE IS
==============================================================

Stream = link feed. Default bucket for everything Lee saves that isn't
load-bearing enough for the topical shelf. Two flavors of item:

1. EDITORIAL-VOICE PUBLICATIONS — `author` is a publication
   (Real Life, Paris Review, etc.), `title` is empty. These render in
   the auto-generated `feed` section regardless of `section` value.
   The visual treatment treats author-as-masthead.

2. NAMED LINKS — `author` + `title` + optional `source`. These are
   the linkblog entries. Each link belongs to one section, falling
   into the default `links` bucket if no section assigned.

Item frontmatter you can rely on:
  author        required
  title         optional (empty signals editorial-voice publication)
  type          enum: book | essay | site | film | interview | slides | concept
  url           required
  source        optional outlet name
  section       optional slug (must match _data/stream_sections.json)
  dek           optional one-line context (Paris Review interviews use this)
  date          optional
  order         required, sort key

==============================================================
DESIGN BRIEF — broadsheet revival
==============================================================

CORE LAYOUT
  - Multiple vertical columns laid out across the page like a print
    broadsheet front page.
  - Each column is INDEPENDENTLY SCROLLABLE — the column itself
    overflows-y, the page does not. The masthead/nav stays fixed
    above; columns fill remaining viewport height.
  - Column count adapts to viewport: 4–5 wide on a large display,
    3 on laptop, 2 on tablet, 1 on phone (graceful collapse).
  - Each column carries one section. Sections render in the order
    given by _data/stream_sections.json. The auto-generated `feed`
    section (editorial-voice publications) gets its own column,
    typically the leftmost.

VISUAL REGISTER
  Inherit, do not reinvent:
  - Source Serif 4 for body text; the site's --sans (currently
    IBM Plex Sans, declared in :root) for labels, metadata, nav.
  - Existing CSS custom properties: --bg, --ink, --ink-muted,
    --ink-light, --ink-faint, --accent, --rule. Use them; don't
    introduce new color tokens.
  - Theme toggle (light / dark via cat-light video) must keep
    working — don't break the existing themed selectors.
  - The site's load-bearing visual pattern is mono-small-caps label +
    serif body — see "LABEL value" in CLAUDE.md. Column headers,
    item type tags, section headers all use this grammar.

PRINT-BROADSHEET CUES (subtle, not pastiche)
  - Hairline column rules (1px, --rule color) between columns.
  - Generous baseline rhythm — the page should feel like reading,
    not like a card grid.
  - Section headers as column-top mastheads: small-caps label, optional
    section count, hairline below.
  - Item entries are dense but legible — author as anchor, title as
    body, source as small metadata. No cards, no borders around
    individual items, no shadows.

DON'T (anti-patterns explicitly excluded)
  - No card UI, no hover-lift, no drop shadows, no rounded
    containers per item.
  - No ghost-card / hover-reveal patterns. Editorial-voice fields
    (dek, source) render permanently when present — never gated
    behind hover/click. (House rule: shelf voice fields are
    first-class content; same applies here.)
  - No mobile bolt-on. Mobile is a real design pass with column
    count = 1 and proper touch-scroll behavior. If you need a
    different structure for mobile, design it; don't responsive-shim.
  - No new color tokens or font families. Work within --bg/--ink/
    --accent and --serif/--sans/--mono.
  - No fabricated per-item UX (sort controls, filters, keyboard
    shortcuts) unless Lee asks. Default to none.

==============================================================
INTERACTION + ACCESSIBILITY
==============================================================

  - Each column is a scrollable region. Use `overflow-y: auto;
    overscroll-behavior: contain;` so column scrolling doesn't bleed
    into the page.
  - Keyboard: focusable column regions; arrow keys scroll the
    focused column; Tab moves between items within a column. Don't
    invent global shortcuts.
  - Reduced motion: `@media (prefers-reduced-motion: reduce)` —
    disable any scroll animations, smooth-scroll behaviors.
  - Screen readers: each column = `<section aria-labelledby="...">`
    with the masthead as the labelling element. Skip-link target
    on `#main` already exists in base.njk; preserve it.
  - Focus-visible outline already styled — don't override.

==============================================================
DELIVERABLES
==============================================================

  1. Updated `stream.njk` — column-per-section structure, masthead
     headers, dense item rows.
  2. Updated CSS in `css/style.css` — scoped under `.page-stream`
     and `.stream-*` classes. Don't bleed styles to other pages.
  3. If `_data/stream_sections.json` is `[]`, leave it alone but
     add a top-of-file note in stream.njk explaining the column
     layout assumes one column per section + the auto `feed`
     column. Lee will populate the sections list separately.
  4. Validate locally:
       npm install
       npm start                 # dev server
       npm run build             # static build
       python3 scripts/validate_items.py
     Confirm zero build errors and the page renders in light + dark.

==============================================================
OPEN QUESTIONS — ASK LEE BEFORE BUILDING
==============================================================

  a) Section taxonomy: _data/stream_sections.json is `[]`. Three
     options:
       (i)   Build with placeholder columns ["essays", "newsletters",
             "interviews", "tools"] so the layout can be seen, with
             a note that Lee should finalize the slug list.
       (ii)  Build the layout but render only the auto `feed` column
             plus the default `links` bucket until Lee defines
             sections.
       (iii) Wait for Lee to define sections before any build.

  b) Column count strategy: should column count be (i) fixed by
     section count (one column per section, page width adapts), or
     (ii) fixed by viewport breakpoint (sections wrap into columns,
     long sections overflow within a column)?

  c) Feed column placement: leftmost (newspaper convention,
     editorial-voice publications anchor the page) or rightmost
     (sidebar treatment)?

  d) Date / chronology: stream items have optional `date` — surface
     in the design (small metadata next to item) or omit?

==============================================================
DEFINITION OF DONE
==============================================================

  [ ] Open questions answered before any code written.
  [ ] Prior broadsheet commit reviewed and acknowledged in your
      design rationale (what you kept, what you changed, why).
  [ ] stream.njk + css/style.css updated; no styles bleed to
      shelf or homepage.
  [ ] `npm run build` succeeds; validate_items.py passes.
  [ ] Page renders correctly in light and dark theme.
  [ ] Mobile (single column) is intentionally designed, not a
      responsive shim.
  [ ] No ghost-card / hover-reveal patterns. Voice fields visible.
  [ ] One-paragraph design rationale handed back to Lee summarizing
      the column model, the section ordering choice, and any
      prior-art decisions you made.
````
