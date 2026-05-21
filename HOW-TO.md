# How This Site Works

## Pages

- `/` comes from `index.njk`.
- `/shelf/` comes from `shelf.njk`.
- `/stream/` comes from `stream.njk`, but is hidden from the primary nav while content is being edited.
- `/admin/` is the Sveltia CMS interface.

## Shelf

The shelf is a topical index.

1. Topics are listed in `_data/topics.json`.
2. Shelf records live in `content/items/*.md`.
3. A shelf record uses `dest: shelf` and a `topic` matching `_data/topics.json`.
4. `shelf.njk` groups records by topic and sorts them by `order`.

The retired `lane` field should not be used.

## Stream

Stream records also live in `content/items/*.md`.

Use `dest: stream`. Stream records may omit `topic`; they can use `source`, `date`, `dek`, `note`, `blurb`, or `quote` when useful.

## Drafts (private review)

Put files in `drafts/`. They build and deploy on `main` like any other page, but:

- Permalink is forced to `/_drafts/<filename>/`, so the slug *is* the filename.
- Excluded from `collections.all` (no nav, no shelf, no sitemap.xml).
- Served with `<meta name="robots" content="noindex, nofollow">` and `Disallow: /_drafts/` in robots.txt.

The gate is the URL: unguessable filename + not crawled + not linked. Share the URL with one reviewer; don't paste it anywhere public.

Name drafts with a random suffix, e.g. `drafts/tree-essay-9xk2f.njk` → lives at `https://leewilkers.com/_drafts/tree-essay-9xk2f/`. To promote, move the file out of `drafts/`, give it a real `permalink:` in frontmatter, and rebuild.

All gating defaults live in `drafts/drafts.json`. Don't override `permalink` per-file unless you want a custom slug.

## Bulk Editing

Use the local spreadsheet tools:

```bash
python3 scripts/items_to_sheet.py
python3 scripts/sheet_to_items.py --dry
python3 scripts/sheet_to_items.py
```

Then rebuild and validate:

```bash
npm run build
python3 scripts/validate_items.py
```

## Non-Public Working Material

`qa/`, `source_reading/`, and `claude_design/` are working/research folders. They are ignored by Eleventy and should not be treated as public site content.
