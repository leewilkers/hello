# Zotero Tag Scheme – Website Shelf/Stream

> Tags for the `Website Shelf` collection. Designed to be filterable and consistent with Lee's existing Zotero tag conventions.

## Tag Prefixes

| Prefix | Purpose | Example |
|--------|---------|---------|
| `lane:` | Shelf lane assignment | `lane:craft`, `lane:perception`, `lane:technology`, `lane:intervention` |
| `dest:` | Page destination | `dest:shelf`, `dest:stream`, `dest:undecided` |
| `lineage:` | Intellectual lineage membership | `lineage:maintenance`, `lineage:seeing`, `lineage:making`, `lineage:dev-critique`, `lineage:web-design` |
| `tier:` | Source accessibility | `tier:T1`, `tier:T2`, `tier:T3` |
| `@` | Project marker | `@personal-website` |

## Tag Inventory

### Lane tags (shelf items only)
- `lane:craft` – How things are made
- `lane:perception` – How things are seen
- `lane:technology` – What things do to us
- `lane:intervention` – What happens when you try to help

### Destination tags (all items)
- `dest:shelf` – Fixed collection, tight DNA
- `dest:stream` – Browsable, sprawling
- `dest:undecided` – Threshold items

### Lineage tags (items in traced chains)
- `lineage:maintenance` – Illich → Winner → Franklin → Russell/Vinsel → Mattern
- `lineage:seeing` – McLuhan → Berger → Pinney; Mills → Flyvbjerg → Law
- `lineage:making` – Polanyi → Sennett → Ingold → Korn
- `lineage:dev-critique` – Ferguson → Tsing → Packard → Adams → Krause
- `lineage:web-design` – Victor → Mod → Chimero; Norman → Hendren
- `lineage:moral-imagination` – Benatar → Rindova/Martins

### Tier tags (all items)
- `tier:T1` – Full text freely available
- `tier:T2` – Partial access (borrow, preview, appendix only)
- `tier:T3` – Purchase required

### Project tag (all items)
- `@personal-website` – Marks all items as belonging to leewilkers.com

## Collection Structure

```
Website Shelf/
├── Shelf – Craft/
├── Shelf – Perception/
├── Shelf – Technology/
├── Shelf – Intervention/
├── Stream – Sites/
├── Stream – Essays/
└── Undecided/
```

## Notes Convention

Each item gets a child note with:
1. **Hover note** (if exists): Lee's shelf annotation
2. **Cross-references**: Other shelf items this connects to (by lineage)
3. **Voice note** (for T1 items): Key passage extracted for voice calibration
