---
project: perceptionarium
status: scaffold
created: 2026-05-12
home: Projects/personal_website/perceptionarium/
shape: wandered exhibit (non-linear, room-based)
seed_session: from constellation-cutout-lab tangent on 2026-05-12
permalink: false
eleventyExcludeFromCollections: true
---

# Perceptionarium — design doc

> A wandered exhibit about **how perception constructs experience**.
> Stimulus on one side (what's actually happening in physics/biology); apparatus on the other (what your brain does with it). The piece lives in the gap.

## Through-line

The reader has a felt experience (an image, a sound, a color). The room then names — in tight prose — exactly what's happening in the world and what's happening in their nervous system to produce that feeling. Education is the prize for paying attention to your own body.

## Underlying aesthetic — creative coding, medium-specific, gesturing elsewhere

This is a guiding constraint on every room, not a side note.

- **Creative coding** as the medium. The work is *of* code: live computation, time, randomness, input response, audio synthesis, ASCII grids, CSS state, network requests. We don't pretend to be something else.
- **Medium specificity**: each room investigates what is *uniquely possible* in this medium — not what would be cooler in print, in installation, in film. The grid of monospace cells. The keypress. The fade. The Web Audio graph. The URL as state. If a room could be a PDF, it shouldn't be a room.
- **Yet gesturing to another medium**: but each room *points at* a non-code medium the topic naturally evokes. The pointing is the wink. The wink is half the meaning.
  - Voyager / pulsars → instrument panel, radio dial, NASA mission patch, telegraph
  - Biophilia → herbarium specimen, broadside, woodcut
  - Prison pink → state-issued procurement document, Pantone chip
  - Color science → printer's color bar, swatch book, paint catalogue
  - Pareidolia → 19th-century star-chart engraving (the existing constellation lab register)
  - Umwelt → species-key field guide, ethogram, taxonomy plate
  - Binaural drone → cathedral / hi-fi rack / monitor speaker
- The gesture must not become costume. ASCII that pretends to be woodcut = kitsch. ASCII that *acknowledges* code while pointing at woodcut = legible argument. The site's existing dual-typography (Source Serif 4 + Overpass) and `LABEL value` grammar already operate this way; rooms inherit that posture.

Adjacent precedents (only for posture, not to copy):
- Robin Sloan, *Fish: A Tap Essay* — tap-paced reading
- Bret Victor, "Up & Down the Ladder of Abstraction" — interactive demonstration that *teaches itself by being itself*
- Olafur Eliasson installations — the room is the argument
- Annie Murphy Paul, *The Extended Mind* — embodied/extended cognition framing

## Shape

- **Wandered exhibit**: rooms are self-contained, no required order, reader explores.
- Default landing: a small atrium with thumbnails / glyphs for each room. Reader picks.
- Each room: visuals + audio + tight prose, sized to ~30–90 seconds of attention.
- Cross-room links emerge through tag affinity ("see also") — soft, not forced.
- No linear thesis. The frame *is* the thesis: everything you feel, your apparatus made.

## Rooms — candidate list

Each room has: **topic / felt-experience / prior-notes / status**. Status = `seed` (idea only), `notes-exist` (Lee has source material to pull from), `built` (in code).

Rooms with `[CL]` reuse the constellation-cutout-lab engine; others want new visuals.

| # | Room name | Topic | Felt experience | Gesture toward | Prior notes | Status |
|---|-----------|-------|-----------------|----------------|-------------|--------|
| 1 | **Voyager** | Space physics / why eerie sounds feel eerie | Plasma-wave audio + ASCII field; reads as dread until you know what it is | NASA mission patch · radio receiver · 1979 instrument panel | `assets/nasa/audio/symphonies/` (vendored); constellation-cutout-lab.njk audio module | notes-exist · partly built [CL] |
| 2 | **Pulsars** | Time-keeping, neutron-star physics, rhythm perception | Steady ticks at 30 Hz (Crab) shift from "machine" to "biological" with framing prose | Jodrell Bank chart paper · seismograph trace · metronome | `assets/nasa/audio/pulsars/` (8 files vendored) | notes-exist |
| 3 | **Prison pink** | Baker-Miller pink color experiments (Schauss 1979); calming-effect claims that don't replicate | Solid Baker-Miller field; reader's tension changes; prose unwinds the science vs. myth | Pantone chip · state-issued procurement spec · paint sample card | — *AI-suggested topic, no prior notes found* | seed |
| 4 | **Biophilia** | Wilson, restorative environments, why plant motifs settle us | ASCII fronds / fractal foliage; rest-state physiology prose | Herbarium specimen sheet · woodcut botanical · Victorian field guide | `KNOWLEDGE_BASE/Books_Library/unknown_None_nature_by_design_the_practice_of_biophilic_design.md` | notes-exist |
| 5 | **Umwelt** | Von Uexküll; the tick's three-cue world; mantis shrimp 16-channel color | Same scene rendered through tick / mantis / bat / human channels in sequence; "what you see is a species-decision" | Ethogram · species-key plate · taxonomic comparison sheet | Adjacent: `Simple_Machines/dogs_and_designers_2026-05-05.md` (dogs/instinct seed) | notes-exist (adjacent) |
| 6 | **Descending sweeps** | Auditory threat circuitry; why pitch-falling reads as alarm | A capella whistler-mode sweeps over silence; the body recognizes "down" as bad | Spectrogram printout · oscilloscope screen · siren | — *AI-suggested, but [[memory: voyager-symphonies-feel-scary]] tangentially captures the intuition* | seed |
| 7 | **Color science** | Opponent process, chromatic adaptation, after-images | Stare at a field; look away; the brain reveals itself by what it leaves behind | Printer's color bar · swatch book · Albers plate | Adjacent: `Projects/personal_website/source_reading/notes/berger_ways-of-seeing*.md` (perception not specifically color science, but related register) | notes-exist (adjacent) |
| 8 | **Binaural / brainwaves** | The 3.4 Hz alpha-band beat from the cutout lab drone; what entrainment is and isn't | Headphones-only room with the JI drone bare; prose names the apparatus | Hi-fi monitor rack · audiologist booth · stereo manual | constellation-cutout-lab.njk audio module (JI drone code is reusable) | partly built [CL] |
| 9 | **Pareidolia / constellations** | Why we see figures in stars; pattern-completion as evolved reflex | The constellation cutout lab itself, with framing prose foregrounding "you are doing this, the sky isn't" | 19th-c star-chart engraving · planisphere · woodcut | `constellation-cutout-lab.njk` (the entire existing piece) | built [CL] |
| 10 | **Smell? / proprioception?** | Modalities that don't make it into screen-based work — and what that says | Text-only room confronting the limits of the medium | Empty exhibition wall label · vitrine card · medium-failure poster | — *meta-room, AI-suggested* | seed |

Open / not-yet-roomed: somatic markers (Damasio), interoception, time perception under stress, hedonic adaptation, aesthetic chills (Sloboda / Huron).

## Voice register (open question)

Three candidates, very different:
1. **Clinical-explanatory**: "Pitch-falling is encoded in the inferior colliculus as…" — high information density, low warmth.
2. **Lyrical-essayist**: Sloan / Sarah Perry register — perception treated as wonder, science as material for the wonder.
3. **Dialogic / Socratic**: short questions that anticipate the reader's; closer to Bret Victor's prompting style.

Lee voice memory: e.g./i.e. natural hedges, software-as-craft metaphors welcome. Lyrical-essayist probably the fit, but each room could pick its own register.

## Architecture — minimum-viable shape

```
perceptionarium/
├── DESIGN.md                    # this doc
├── index.njk                    # atrium / room picker
├── rooms/
│   ├── voyager.njk
│   ├── pulsars.njk
│   ├── prison-pink.njk
│   └── …                        # one room = one njk page; rooms can be code-heavy or text-heavy
├── _includes/
│   └── room-layout.njk          # shared chrome: title bar, "back to atrium", "see also"
└── assets/                      # room-specific media; constellation-cutout-lab assets reusable
```

Routing: `/perceptionarium/`, `/perceptionarium/voyager/`, `/perceptionarium/pulsars/`. Each room is just a page. Soft links via frontmatter `see_also: [voyager, pulsars]`.

Build incrementally — one room shippable in isolation.

## Reuse from constellation cutout lab

- Audio module (JI drone + bells + cosmic bed) — extractable as `assets/js/cutout-audio.js`
- Knob panel + presets pattern — generalizable
- ASCII field rendering — pattern-by-knob, ready for non-constellation visuals (waves, topo, rain, agc)
- The `gridForCell` + monospace measure pattern

Constellation cutout lab itself becomes one room (#9, pareidolia).

## Tensions / open questions

- **Wandered vs. seeded order.** Wandered structure but reader might not know where to start. Atrium should suggest a path without enforcing one.
- **Prose load.** Each room is ~3–10 sentences of *Lee-voice* prose. Across 10 rooms, that's a real writing commitment. Maybe ship with 3 rooms strong, 7 stubs.
- **Visual-art-first vs. content-first.** From the cutout lab session: "forget the notes / just make good art." Tension with the educational ambition. Resolved by: prose is short, optional-to-engage, and the visuals stand on their own first.
- **Citations.** Educational claims should be sourced. Tiny inline citations? Footnote panel per room? Or shelf-style hover with one source per claim?
- **Mobile.** The cutout lab is desktop-only effectively. Per leewilkers.com CLAUDE.md: "no mobile ghost bolt-on." Each room may need its own mobile take, or be desktop-only by design with a clear notice.
- **License.** Voyager audio is gitignored sandbox-only. If perceptionarium ships publicly, need to decide: replace with raw NASA-direct clips, stream from archive.org, or stay sandbox-local-only.

## Lee's prior notes — pull-from-when-writing

These are the most likely upstream sources for prose seeds. Pull from these, don't reason-from-scratch:

| Topic | Where |
|-------|-------|
| Biophilic design | `KNOWLEDGE_BASE/Books_Library/unknown_None_nature_by_design_the_practice_of_biophilic_design.md` |
| Ways of seeing / perception | `Projects/personal_website/source_reading/notes/berger_ways-of-seeing*.md` |
| Ritual / consciousness | `Projects/personal_website/source_reading/notes/perry_ritual-consciousness-monoculture*.md` |
| Umwelt-adjacent (dogs, instinct) | `KNOWLEDGE_BASE/Writing_Projects/Simple_Machines/dogs_and_designers_2026-05-05.md` |
| Brain dumps | `BRAIN/raw/brain-dumps/` (search before drafting new) |

## Next-action menu (not a queue)

- **Pick a starter room.** Voyager + Pulsars are partly built and have notes. Either is a 1–2 session start.
- **Pull from notes.** Read the biophilia book extraction. Either confirms it as a Room #4 anchor or rules it out.
- **Sketch the atrium.** Mock the index page with the 10 room thumbnails before committing to any single room's polish.
- **Voice test.** Write the first three sentences of one room in each candidate register; pick the one that doesn't make you wince.

---

*Not a plan, a substrate. The shape will move as rooms get built.*
