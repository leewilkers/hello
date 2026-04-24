# leewilkers.com

Personal homepage and curated shelf for Lee Wilkers.

## Local Development

```bash
npm install
npm start
```

Build locally:

```bash
npm run build
```

Validate content records:

```bash
python3 scripts/validate_items.py
```

## Content Model

- Pages live at the repo root as Eleventy templates.
- Shelf and stream records live in `content/items/*.md`.
- `_data/topics.json` is the canonical shelf topic list.
- `dest: shelf` records appear on `/shelf/`.
- `dest: stream` records appear on `/stream/`; stream is intentionally hidden from the primary nav while content is being edited.

The old lane taxonomy is retired. Use `topic`.

## Editing Content

For single records, edit the Markdown frontmatter in `content/items/*.md` or use `/admin/`.

For bulk edits, use the spreadsheet workflow in `scripts/README.md`:

```bash
python3 scripts/items_to_sheet.py
python3 scripts/sheet_to_items.py --dry
python3 scripts/sheet_to_items.py
```

## Deploy

Push to `main`. GitHub Actions builds the Eleventy site and deploys to GitHub Pages.
