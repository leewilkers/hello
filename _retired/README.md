---
permalink: false
eleventyExcludeFromCollections: true
---

# Retired pages

Pages pulled off the live site during the 2026-06 simplification (single About page, "keep it simple"). **Preserved here as real source files** — version-controlled and pushed to origin, just not built (`permalink: false` on each). Restore any by setting a real `permalink:` and re-adding its nav link in `_includes/base.njk`.

| File | Was at | Retired | Why |
|------|--------|---------|-----|
| `consulting.njk` | `/consulting/` | 2026-06-07 | Folded into single About page. **Holds the full "Knots" framework** (Sense / Design / Build, six knots in Lee's voice) — high-value writing, not dead. |
| `site-tree.njk` | `/` (old homepage) | 2026-06-07 | About became home. The V5 animated tree homepage. |
| `writing.njk` | `/writing/` | 2026-06-07 | Empty "drafting, back soon" placeholder. |

The "knots / reading the grain" opener prose is also salvaged into `ETHOS_ALEXANDER_PUBLIC_HEALTH_2026-06-07.md` (thematically tied to the Alexander × public-health design ethos).

Earlier deletions are also in git history (commit `fc2bdab`): `git show fc2bdab~1:site-tree.njk`.
