# Shelf content audit - 2026-04-26

Read-only audit of `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/*.md`, `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/img/covers/`, and `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/_data/topics.json`.

## Summary

- Items parsed: 253 total; 239 shelf, 14 stream.
- Required image paths: 0 missing.
- Unused files in `img/covers/`: 0.
- Duplicate cover references: 1 pair, likely intentional but worth deciding.
- Topic distribution is lopsided: one singleton topic, three 3-item topics, and four very large buckets.
- This report does not retopic or swap covers. It marks candidates for Lee review.

## Image/path findings

| Issue | Path(s) | Evidence | Confidence |
|---|---|---|---|
| No broken cover paths found | all `content/items/*.md` image fields | Every referenced `/img/covers/...` file exists. | High |
| No unused cover files found | `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/img/covers/` | Every file under `img/covers/` is referenced by at least one item. | High |
| Duplicate cover reference | `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/asterisk-magazine.md`; `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/asterisk.md` | Both use `/img/covers/asterisk-magazine.jpg`; one is shelf, one is stream. This may be acceptable, but it is the only duplicate image use. | Medium |
| No filename/title mechanical mismatches found | all shelf item image fields | Cover stems generally match item filenames/titles/authors. This does not catch visually wrong OpenGraph screenshots or bad edition covers. | Medium |

## Topic counts

| Topic | Shelf items | Audit note |
|---|---:|---|
| Education | 1 | Singleton; likely not enough to justify a top-level topic unless it is intentionally a seed. |
| Bureaucracy & Institutions | 3 | Low count; has strong candidates elsewhere that may belong here. |
| Ecology & Environment | 3 | Low count. |
| Science & Technology Studies | 3 | Low count; several Computing/Tech Criticism/Philosophy of Science items could plausibly live here. |
| Ethnography | 5 | Small but coherent. |
| Language & Writing | 5 | Small; contains at least one knowledge-utilization item that looks out of place. |
| Tech Criticism | 5 | Small; may be underfilled relative to obvious candidates elsewhere. |
| Architecture | 6 | Coherent and reasonable. |
| Ethics & Moral Philosophy | 8 | Reasonable. |
| Interfaces & Interaction | 16 | Reasonable. |
| Computing | 17 | Large but coherent enough. |
| Classification & Taxonomy | 22 | Large; check for overuse as a catch-all. |
| Global Health & Policy | 25 | Large; several organizational/design/general-policy items may be inflating it. |
| Design & Craft | 27 | Large; coherent but overloaded. |
| Infrastructure | 27 | Large; likely acting as a catch-all for maintenance, technology, media, and institutions. |
| Philosophy of Science | 30 | Overloaded; includes several craft/writing/social-theory items. |
| Perception & Visualization | 36 | Most overloaded; likely mixing photography, media theory, perception, visual culture, and interactive visualization. |

## Semantically suspicious topic placements

These are review candidates, not proposed automatic moves.

| Path | Current topic | Why it looks suspect | Possible review direction | Confidence |
|---|---|---|---|---|
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/alan-jacobs-from-tech-critique-to-ways-of-living.md` | Infrastructure | Title explicitly points to tech critique / ways of living; Infrastructure may be too broad. | Tech Criticism or Philosophy of Science. | Medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/caplan-two-communities-theory.md` | Language & Writing | Knowledge utilization / two-communities theory is not mainly a writing item. | Bureaucracy & Institutions, Philosophy of Science, or Global Health & Policy depending on Lee's intended cluster. | High |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/donald-sull-why-good-companies-go-bad.md` | Global Health & Policy | Business/organizational failure item; global health link is indirect. | Bureaucracy & Institutions or Infrastructure. | Medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/stewart-the-management-myth.md` | Global Health & Policy | Management myth feels broader than global health/policy. | Bureaucracy & Institutions. | Medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/postrel-the-fabric-of-civilization.md` | Global Health & Policy | Material culture/history of textiles is not primarily global health. | Infrastructure or Design & Craft. | Medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/arturo-escobar-designs-for-the-pluriverse-radical.md` | Global Health & Policy | Development/policy fit exists, but title and author point strongly to design/worldmaking. | Design & Craft or Ethnography. | Low-medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/michael-quinn-patton-developmental-evaluation-applying.md` | Global Health & Policy | Evaluation/complexity method may be broader than global health. | Philosophy of Science or Bureaucracy & Institutions. | Medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/victor-humane-representation-of-thought.md` | Computing | Bret Victor representation work may fit interaction/visualization better than Computing. | Interfaces & Interaction or Perception & Visualization. | Low-medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/stafford-beer-designing-freedom.md` | Computing | Cybernetics fit exists, but the title/topic points to governance and organization. | Bureaucracy & Institutions or Infrastructure. | Medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/sidney-dekker-drift-into-failure.md` | Classification & Taxonomy | Safety/failure/organizational drift is not obviously classification. | Bureaucracy & Institutions or Infrastructure. | Medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/azoulay-civil-imagination.md` | Classification & Taxonomy | Civil imagination reads more political/visual than taxonomic. | Perception & Visualization, Ethics & Moral Philosophy, or Global Health & Policy. | Low-medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/kevin-slavin-design-as-participation.md` | Classification & Taxonomy | Design/participation signal is stronger than classification signal. | Design & Craft or Interfaces & Interaction. | Medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/bhaskar-critical-realism.md` | Classification & Taxonomy | Critical realism is more philosophy/method than classification. | Philosophy of Science. | Medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/janet-malcolm-the-journalist-and-the-murderer.md` | Philosophy of Science | Journalism/ethics/language item, not a science-philosophy anchor. | Language & Writing or Ethics & Moral Philosophy. | Medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/harrington-the-faithful-executioner.md` | Philosophy of Science | Historical/moral psychology item; science-philosophy fit is unclear. | Ethics & Moral Philosophy. | Medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/johan-huizinga-homo-ludens.md` | Philosophy of Science | Play/culture is not primarily philosophy of science. | Design & Craft, Interfaces & Interaction, or Ethnography. | Low-medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/studs-terkel-working.md` | Philosophy of Science | Oral history/work item; method fit exists but topic label may mislead. | Ethnography or Bureaucracy & Institutions. | Medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/sen-the-argumentative-indian.md` | Philosophy of Science | Could fit public reasoning/political culture more than science-philosophy. | Language & Writing or Ethics & Moral Philosophy. | Low-medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/benjam-n-labatut-when-we-cease-to-understand-the-world.md` | Perception & Visualization | Literary science-history item; visual/perception signal is weak. | Philosophy of Science or Language & Writing. | Medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/fanon-black-skin-white-masks.md` | Perception & Visualization | Perception is relevant, but the dominant shelf signal may be race/coloniality/ethics. | Ethics & Moral Philosophy or Global Health & Policy. | Low-medium |
| `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/content/items/taylor-modern-social-imaginaries.md` | Perception & Visualization | Social imaginaries are not mainly visualization. | Philosophy of Science or Ethics & Moral Philosophy. | Medium |

## Recommended next review move

Open `/Users/leewilkers/vaults/claude_hub/Projects/personal_website/scripts/cover-contact-sheet.html` in a browser and visually flag bad covers first. Mechanical checks show no missing/mismatched filenames, so the remaining cover problems are probably visual: wrong edition, generic OpenGraph image, cropped screenshot, or just bad taste-fit.
