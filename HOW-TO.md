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
