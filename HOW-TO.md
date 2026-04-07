# How This Works

## Layout

```
┌────────────────────────────────┬──────────────────┐
│  currently                     │     stream       │
├────────┬────────┬──────────────┴┬─────────────────┤
│ global │        │  design &     │ lists &         │
│ health │ writing│  collaboration│ guides          │
└────────┴────────┴───────────────┴─────────────────┘
```

## Tag Bar

All tags appear at top, sorted by frequency. Click to filter.

- **Click tag** → filter to that tag
- **Click another** → AND filter (shows items with BOTH tags)
- **Click active tag** → deselect
- **Click "all"** → clear filters
- **URL updates** → `?tags=amr,ethics` (shareable)

## Tags → Channels

| Channel | Tags |
|---------|------|
| **currently** | `currently`, `pinned`, `thinking` |
| **global health** | `globalhealth`, `amr`, `ethics`, `ntd`, `policy` |
| **writing** | `writing`, `essay`, `blog`, `article`, `longform` |
| **design & collaboration** | `design`, `collaboration`, `facilitation`, `process`, `hcd` |
| **lists & guides** | `list`, `guide`, `howto`, `reference`, `resource` |

## Daily Use

1. Save link in Raindrop
2. Add 1-2 tags
3. Optionally add note
4. Site rebuilds daily → link appears

## Updating Old Links

Edit tags in Raindrop → next rebuild picks them up.

With Raindrop MCP:
> "Add tag 'ethics' to all my bookmarks about moral philosophy"

## To Change Channels

Edit `_data/channels.json`:

```json
{
  "subcategories": [
    {
      "name": "new channel",
      "query": "tag:newtag OR tag:othertag",
      "limit": 10
    }
  ]
}
```

## Tag Bar Growth

Tags auto-populate from all links. Use a new tag → appears in bar after rebuild.
