# CLAUDE.md – leewilkers.com

Personal homepage and curated shelf. Live at https://leewilkers.com.

## Stack

- Eleventy static site
- GitHub Pages via the `leewilkers/hello` repo
- GitHub Actions build/deploy on push to `main`
- Typography: Source Serif 4 for reading, IBM Plex Sans for interface text

## Key Files

```
index.njk             Homepage
shelf.njk             Topic-index shelf
stream.njk            Stream page; intentionally hidden from primary nav
_includes/base.njk    HTML shell, nav, theme toggle, shelf sidebar behavior
css/style.css         Site styles
_data/site.json       Site metadata
_data/topics.json     Canonical shelf topic list
content/items/*.md    Shelf and stream records
admin/config.yml      Sveltia CMS config
scripts/README.md     Local bulk-edit workflow
```

Working notes under `qa/`, `source_reading/`, and `claude_design/` are not public site content and must stay ignored by Eleventy.

## Design

- Homepage is a compact personal instrument: identity, recent work, contact, and build notes.
- Shelf renders as a topical index from `_data/topics.json`; each item is one `content/items/*.md` record with `dest: shelf`.
- Shelf metadata (`dek`, `blurb`, `quote`, `note`) renders permanently in the item cell when present.
- Stream renders records with `dest: stream`, but is not in the main nav while content is being edited.
- Theme toggle uses the cat-light video; keep browser/reduced-motion fallbacks.

## Dev

```bash
npm install
npm start
npm run build
python3 scripts/validate_items.py
```

## Item Frontmatter

Required for all items: `author`, `type`, `dest`, `url`, `order`, `image`.

Shelf items also require `topic`. Stream items may omit `topic`.

`title` is usually required, but editorial-voice stream publications may intentionally leave it empty, for example `author: "Real Life"` and `title: ""`.

Optional fields: `title`, `topic`, `dek`, `note`, `blurb`, `quote`, `source`, `links`, `featured`, `date`.

Valid `type` values: `book`, `essay`, `site`, `film`, `interview`, `slides`, `concept`.

Valid `dest` values: `shelf`, `stream`.

`links` is a list of `{label, url}` objects. The spreadsheet workflow preserves it but does not edit it.

`lane` is retired. Do not reintroduce it; use `topic`.

## Stream Authorship

- Personal sites / single-author newsletters: `author` is the person and `title` is the site name.
- Editorial-voice publications: `author` is the publication and `title` may be empty.
- Paris Review interviews: `author` is the subject, `title` is the interview title, and `dek` carries interview/date context.
