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
content/items/*.md   – 101 shelf items (YAML frontmatter + content)
img/covers/*.jpg     – Cover images for all items
.eleventy.js         – Minimal config (passthrough CSS + img, collections)
.github/workflows/build.yml – Build + deploy (Node 22)
```

## Design

- **Typography**: Source Serif 4 (body, titles, ghost note) + Source Sans 3 (nav, metadata, column headers). CSS custom properties: `--serif`, `--sans`.
- **Shelf**: 6 lanes (making, perception, method, technology, intervention, machine), 101 items. Always 6 columns, side-scrolls on narrow screens.
- **Ghost card**: Fixed left-margin detail card (180px). Shows cover image + author/title/dek/note on hover. Melancholia I (Dürer) at rest as easter egg. Instant image swap (preloaded). Hidden below 900px.
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

## Copy Decisions

- Tagline is Lee's own phrasing – placeholder until he writes an essay
- "Recently:" with dashed list, not inline prose
- AI cannot write the identity line – concept is right, prose always fails
- `consulting-draft.md` was AI slop – deleted, do not recreate
