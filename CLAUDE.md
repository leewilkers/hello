# CLAUDE.md – leewilkers.com

Personal homepage with curated shelf. Live at https://leewilkers.com

## Stack

- **Eleventy** (static site generator)
- **GitHub Pages** via `leewilkers/hello` repo
- **Dual typography**: Source Serif 4 (reading) + Source Sans 3 (interface) via Google Fonts (variable, optical sizing)
- **Deploy**: push to `main` → GitHub Actions builds + deploys

## Key Files

```
index.njk            – Homepage content
shelf.njk            – Shelf page (6-column broadsheet layout)
css/style.css        – All styles (dual typography, ghost card, theme toggle)
_includes/base.njk   – HTML shell, ghost JS, Google Fonts import, theme toggle
_data/site.json      – Site metadata (title, URL)
content/items/*.md   – ~111 shelf + stream items (YAML frontmatter)
img/covers/*.jpg     – Cover images for all items
.eleventy.js         – Minimal config (passthrough CSS + img, collections)
.github/workflows/build.yml – Build + deploy (Node 22)
```

## Design

- **Typography**: Source Serif 4 (body, titles, ghost note) + Source Sans 3 (nav, metadata, column headers). CSS custom properties: `--serif`, `--sans`.
- **Shelf**: 6 lanes (making, perception, method, technology, intervention, machine), 101 items. Always 6 columns, side-scrolls on narrow screens.
- **Ghost card**: Fixed left-margin detail card (180px). On hover shows cover + author/title/dek/blurb/quote (source-voiced content). Melancholia I (Dürer) at rest as easter egg. Instant image swap (preloaded). Hidden below 900px.
- **Cursor-follow note tooltip**: Lee's pitch `note:` renders as a small cursor-following whisper, separate from the ghost card. Always on (desktop + mobile). Lets the two hover surfaces coexist: objective info in the margin, voice at the cursor.
- **Cover images**: All 101 items have unique covers (Open Library API + OG images + manual screenshots). Zero fallbacks.
- **Photo**: 76px grayscale, bottom-aligned with name
- **Layout**: max-width 520px homepage, broadsheet shelf
- **Accent**: `#c9a227` (mustard)
- **Theme**: Light/dark with smooth dimmer toggle

## Dev

```
npm start          # localhost:8080
npm run build      # _site/
```

## Frontmatter schema (per item)

Required: `author`, `title`, `type`, `image`, `dest`, `url`, `order`
Optional: `lane`, `dek`, `note`, `blurb`, `quote`, `source`, `links`, `featured`

| Field | Semantics |
|---|---|
| `dek` | Venue + year. e.g. "Oxford University Press, 1979" or "worrydream.com, March 2006". Shown inline and in ghost card. |
| `note` | **Lee's voice.** Pitch, quip, personal take. Shown as cursor-follow tooltip on hover. Never in the ghost card. |
| `blurb` | **Source-voiced description.** Publisher copy, review line, author one-liner. Shown in ghost card on hover. Styled sans roman. Optional. |
| `quote` | **Verbatim line** from or about the thing. Shown in ghost card on hover with typographic quote marks, styled serif italic. Optional. |
| `dest` | `shelf` or `stream`. Stream items render on /stream/ (currently hidden in nav). |
| `lane` | For shelf items: `making` / `perception` / `method` / `technology` / `intervention` / `machine`. |
| `type` | `book` / `essay` / `site` / `film` / `interview` / `slides`. |

### Stream authorship hybrid (P4 decision)
- Personal sites / single-author newsletters: `author` = person, `title` = site name. e.g. Mandy Brown / "A Working Library".
- Editorial-voice publications: `author` = site name, `title` can be empty. e.g. "Real Life" / "", "Asterisk Magazine" / "...".

### Paris Review interview schema (P5 decision)
- `title`: "Subject Name, The Art of Fiction No. N"
- `author`: subject
- `dek`: "Paris Review, Season Year, interviewed by {Interviewer}"

## Copy Decisions

- Tagline is Lee's own phrasing – placeholder until he writes an essay
- "Recently:" with dashed list, not inline prose
- AI cannot write the identity line – concept is right, prose always fails
- `consulting-draft.md` was AI slop – deleted, do not recreate
