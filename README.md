# leewilkers.com

A personal link archive. Things I clicked on that I may or may not have read.

## Setup

### 1. Get your Raindrop API token

1. Go to [app.raindrop.io/settings/integrations](https://app.raindrop.io/settings/integrations)
2. Click "Create new app"
3. Click "Create Test Token" — copy it

### 2. Add token to GitHub

1. Repo → Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `RAINDROP_TOKEN`
4. Value: your token

### 3. Enable GitHub Pages

1. Repo → Settings → Pages
2. Source: "GitHub Actions"

### 4. Add your photo

Put your photo at `img/lee.jpeg`

## Local dev

```bash
npm install
npm start
```

## Customizing

### Channels

Edit `_data/channels.json`:

```json
{
  "name": "channel name",
  "query": "tag:foo OR tag:bar",
  "size": "w4 h-md",
  "limit": 8
}
```

### Books

Edit `_data/books.json`

### Tags

Use whatever tags you want in Raindrop. Query syntax:
- `tag:foo` — matches "foo"
- `tag:foo OR tag:bar` — matches either

## Stack

- [Eleventy](https://11ty.dev)
- [Raindrop.io](https://raindrop.io)
- GitHub Pages + Actions

---

*a handmade thing*
