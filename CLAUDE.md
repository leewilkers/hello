# CLAUDE.md – leewilkers.com

Personal homepage. Minimal, static, one page.

## Stack

- **Eleventy** (static site generator)
- **GitHub Pages** via `leewilkers/hello` repo
- **Google Fonts** (Inter 400/500/600)
- **Deploy**: push to `main` → GitHub Actions builds + deploys

## Key Files

```
index.njk            – Homepage content
css/style.css        – All styles (Inter, single font)
_includes/base.njk   – HTML shell + Google Fonts import
_data/site.json      – Site metadata (title, URL)
.eleventy.js         – Minimal config (passthrough CSS + img)
.github/workflows/build.yml – Build + deploy (Node 22)
```

## Design

- **Font**: Inter (Google Fonts) – one family for everything
- **Photo**: 76px grayscale, bottom-aligned with name
- **Layout**: max-width 520px, generous top padding
- **Accent**: `#c9a227` (mustard) on email link only
- **List markers**: en-dashes, absolute positioned, `#ccc`

## Dev

```
npm start          # localhost:8080
npm run build      # _site/
```

## Copy Decisions (Session 3, 2026-04-06)

- Tagline is Lee's own phrasing – placeholder until he writes an essay
- "Recently:" with dashed list, not inline prose
- AI cannot write the identity line – concept is right, prose always fails
- `consulting-draft.md` was AI slop – deleted, do not recreate
