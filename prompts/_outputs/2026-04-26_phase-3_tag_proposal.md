# Phase 3 – Tag improvement proposal

## Renames
| old | new | count | rationale |
|-----|-----|-------|-----------|
| `PDF` | `pdf` | 1 | Normalize spelling or separator. |
| `atlantic` | `the-atlantic` | 2 | Normalize spelling or separator. |
| `chatbotinteractions` | `chatbot` | 2 | Normalize spelling or separator. |
| `collections` | `archive` | 4 | Normalize spelling or separator. |
| `contentstrategy` | `content-strategy` | 2 | Normalize spelling or separator. |
| `deathrecords` | `mortality` | 1 | Normalize spelling or separator. |
| `dialogues` | `dialogue` | 1 | Normalize spelling or separator. |
| `digitalage` | `digital-age` | 2 | Normalize spelling or separator. |
| `employeewellbeing` | `employee-wellbeing` | 1 | Normalize spelling or separator. |
| `engagements` | `engagement` | 3 | Normalize spelling or separator. |
| `films` | `film` | 3 | Normalize spelling or separator. |
| `frameworks` | `framework` | 4 | Normalize spelling or separator. |
| `gradstudents` | `graduate-students` | 1 | Normalize spelling or separator. |
| `hewlett-packard` | `silicon-valley` | 4 | Normalize spelling or separator. |
| `infrasstructure` | `infrastructure` | 2 | Normalize spelling or separator. |
| `innovations` | `innovation` | 1 | Normalize spelling or separator. |
| `interactivecontent` | `interactive-content` | 2 | Normalize spelling or separator. |
| `interfaces` | `interface` | 2 | Normalize spelling or separator. |
| `literature_review` | `literature-review` | 4 | Normalize spelling or separator. |
| `newyorker` | `new-yorker` | 4 | Normalize spelling or separator. |
| `onlinearchive` | `archive` | 7 | Normalize spelling or separator. |
| `privacyprotection` | `privacy` | 1 | Normalize spelling or separator. |
| `repositories` | `archive` | 5 | Normalize spelling or separator. |
| `scholarlywork` | `scholarship` | 3 | Normalize spelling or separator. |
| `selfdiscovery` | `self-discovery` | 3 | Normalize spelling or separator. |
| `socialmedia` | `social-media` | 1 | Normalize spelling or separator. |
| `techcompanies` | `tech-company` | 1 | Normalize spelling or separator. |
| `timemanagement` | `time-management` | 3 | Normalize spelling or separator. |
| `userexperience` | `user-experience` | 4 | Normalize spelling or separator. |
| `visualisation` | `visualization` | 1 | Normalize spelling or separator. |

## Merges
| tags | kept | count | rationale |
|------|------|-------|-----------|
| `archive, archives, catalogue, collections, onlinearchive, repositories` | `archive` | 30 | Same axis; keep one specific label. |
| `interface, interfaces, userexperience` | `interface` | 18 | Same axis; keep one specific label. |
| `writing, prose, style` | `writing` | 17 | Same axis; keep one specific label. |
| `literature, reading, literacy, hyperliteracy` | `reading` | 19 | Same axis; keep one specific label. |
| `collaboration, cooperation, partnership, networking` | `collaboration` | 21 | Same axis; keep one specific label. |
| `dialogue, conversation, discussion` | `conversation` | 22 | Same axis; keep one specific label. |
| `maintenance` | `maintenance-repair` | 2 | Same axis; keep one specific label. |
| `resilience, adaptation, adaptability, agility, flexibility` | `adaptation` | 28 | Same axis; keep one specific label. |
| `internet, website, browsing` | `personal-web` | 49 | Same axis; keep one specific label. |
| `visualization, diagram, map, mapping` | `visualization` | 13 | Same axis; keep one specific label. |
| `ai, automation` | `ai` | 28 | Same axis; keep one specific label. |
| `academic, academia, scholarship, scholarlywork` | `scholarship` | 18 | Same axis; keep one specific label. |
| `craft, craftsmanship, artisanality` | `craft` | 11 | Same axis; keep one specific label. |
| `community, scenius` | `community` | 16 | Same axis; keep one specific label. |
| `facilitation, hosting, artofhosting, hostingconversations, aoh` | `facilitation` | 14 | Same axis; keep one specific label. |

## Retirements
| tag | count | where bookmarks should redirect |
|-----|-------|---------------------------------|
| `collectiveintelligence` | 1 | nearest subject tag or `archive-candidate` if accidental |
| `deep` | 1 | nearest subject tag or `archive-candidate` if accidental |
| `durer` | 1 | nearest subject tag or `archive-candidate` if accidental |
| `farts` | 1 | nearest subject tag or `archive-candidate` if accidental |
| `hostingconversations` | 1 | nearest subject tag or `archive-candidate` if accidental |
| `lists` | 1 | nearest subject tag or `archive-candidate` if accidental |
| `organizational learning` | 1 | nearest subject tag or `archive-candidate` if accidental |
| `pages` | 1 | nearest subject tag or `archive-candidate` if accidental |
| `rus` | 1 | nearest subject tag or `archive-candidate` if accidental |
| `set` | 1 | nearest subject tag or `archive-candidate` if accidental |
| `test` | 1 | nearest subject tag or `archive-candidate` if accidental |

## New tags
| tag | axis | candidate bookmarks |
|-----|------|---------------------|
| `maintenance-repair-care` | subject | 1696499866, 1677104896, 1677104832, 1676241049, 1676241313 |
| `personal-web-and-publishing` | subject | 1696528663, 1696510825, 1685555913, 1684365219, 1684075133 |
| `community-practice` | subject | 1680298926, 1675381793, 1537871311, 1537868929, 1537866400 |
| `ai-cognitive-labor` | subject | 1696528794, 1696505515, 1696499926, 1696499866, 1694973169 |
| `craft-material-culture` | subject | 1693519359, 1682304788, 1680296525, 1675381986 |
| `global-health-ethics` | subject | 1696510864, 1681657061, 1680298203, 1676238316, 1675989847 |
| `archive-candidate` | status | 1694973169, 1694973097, 1676246973, 1676246782, 1676246485 |

## Final canonical set
### subject
`adaptation`, `ai`, `ai-cognitive-labor`, `archive`, `bureaucracy`, `care`, `community`, `community-practice`, `consent`, `craft`, `craft-material-culture`, `design`, `ethics`, `expertise`, `facilitation`, `global-health-ethics`, `infrastructure`, `interface`, `knowledge`, `maintenance-repair`, `maintenance-repair-care`, `personal-web`, `personal-web-and-publishing`, `photography`, `policy`, `research`, `scholarship`, `science`, `software`, `technology-criticism`, `visualization`, `writing`, `reading`

### channel
`channel:substack`, `channel:publication`, `channel:archive`

### format
`article`, `book`, `essay`, `film`, `interview`, `pdf`, `site`, `slides`, `tool`, `video`, `zine`

### status
`archive-candidate`, `low-confidence`, `to-read`, `reviewed`

## LOW_CONFIDENCE proposals
- Topic-adjacent subject tags should wait until Lee accepts emergent shelf clusters.
- One-count retirements should be reviewed before apply; some may be intentional idiosyncratic tags.
- `channel:*` tags need a separate routing decision before renaming or deletion.

## Apply plan (JSON – DO NOT EXECUTE)
```json
{
  "renames": {
    "infrasstructure": "infrastructure",
    "visualisation": "visualization",
    "films": "film",
    "innovations": "innovation",
    "interfaces": "interface",
    "frameworks": "framework",
    "dialogues": "dialogue",
    "engagements": "engagement",
    "repositories": "archive",
    "collections": "archive",
    "onlinearchive": "archive",
    "literature_review": "literature-review",
    "digitalage": "digital-age",
    "socialmedia": "social-media",
    "techcompanies": "tech-company",
    "scholarlywork": "scholarship",
    "selfdiscovery": "self-discovery",
    "timemanagement": "time-management",
    "userexperience": "user-experience",
    "contentstrategy": "content-strategy",
    "interactivecontent": "interactive-content",
    "privacyprotection": "privacy",
    "chatbotinteractions": "chatbot",
    "deathrecords": "mortality",
    "gradstudents": "graduate-students",
    "employeewellbeing": "employee-wellbeing",
    "hewlett-packard": "silicon-valley",
    "atlantic": "the-atlantic",
    "newyorker": "new-yorker",
    "PDF": "pdf"
  },
  "merges": {
    "archive,archives,catalogue,collections,onlinearchive,repositories": "archive",
    "interface,interfaces,userexperience,user-experience": "interface",
    "writing,prose,style": "writing",
    "literature,reading,literacy,hyperliteracy": "reading",
    "collaboration,cooperation,partnership,networking": "collaboration",
    "dialogue,conversation,discussion": "conversation",
    "maintenance,repair,care": "maintenance-repair",
    "resilience,adaptation,adaptability,agility,flexibility": "adaptation",
    "internet,web,website,browsing": "personal-web",
    "visualization,diagram,map,mapping": "visualization",
    "ai,automation,chatbot": "ai",
    "academic,academia,scholarship,scholarlywork": "scholarship",
    "craft,craftsmanship,artisanality": "craft",
    "community,scenius,microsolidarity": "community",
    "facilitation,hosting,artofhosting,hostingconversations,aoh": "facilitation"
  },
  "retire": [
    "collectiveintelligence",
    "deep",
    "durer",
    "farts",
    "hostingconversations",
    "lists",
    "organizational learning",
    "pages",
    "rus",
    "set",
    "test"
  ],
  "add": [
    {
      "tag": "maintenance-repair-care",
      "applies_to": [
        1696499866,
        1677104896,
        1677104832,
        1676241049,
        1676241313
      ]
    },
    {
      "tag": "personal-web-and-publishing",
      "applies_to": [
        1696528663,
        1696510825,
        1685555913,
        1684365219,
        1684075133
      ]
    },
    {
      "tag": "community-practice",
      "applies_to": [
        1680298926,
        1675381793,
        1537871311,
        1537868929,
        1537866400
      ]
    },
    {
      "tag": "ai-cognitive-labor",
      "applies_to": [
        1696528794,
        1696505515,
        1696499926,
        1696499866,
        1694973169
      ]
    },
    {
      "tag": "craft-material-culture",
      "applies_to": [
        1693519359,
        1682304788,
        1680296525,
        1675381986
      ]
    },
    {
      "tag": "global-health-ethics",
      "applies_to": [
        1696510864,
        1681657061,
        1680298203,
        1676238316,
        1675989847
      ]
    },
    {
      "tag": "archive-candidate",
      "applies_to": [
        1694973169,
        1694973097,
        1676246973,
        1676246782,
        1676246485
      ]
    }
  ]
}
```
