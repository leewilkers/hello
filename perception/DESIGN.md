---
project: notes-on-perception
status: scaffold
created: 2026-05-12
renamed: "2026-05-14 (was: perceptionarium)"
home: Projects/personal_website/perception/
shape: wandered exhibit (non-linear, room-based)
seed_session: from constellation-cutout-lab tangent on 2026-05-12
permalink: false
eleventyExcludeFromCollections: true
---

# Notes on Perception — design doc

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

> **Scope-expansion 2026-05-15.** The unifying frame ("an apparatus you didn't choose, running on you now, made legible by being staged") doesn't only apply to biological perception. It applies to direct cognition, design, organizations, public-health / statistical reasoning, and the project's own move. Six domains. ~44 candidates below.

### Rubric — what earns a room

A candidate is worth building when it meets all four:

1. **Produces a felt change in 90 seconds or less.** Physiological, perceptual, or cognitive — a datum the reader produces on themselves.
2. **Names the apparatus immediately after.** Tight prose. Hering / Schauss / Goodhart / Wald — whoever's name the move belongs to.
3. **Generalizes.** The reader leaves seeing the same apparatus elsewhere (in their own design choices, meetings, statistics, perception).
4. **Has citeable literature.** Not folk wisdom. Cite-don't-bluff applies to every room.

A candidate also picks one of two **modes**:
- **Direct.** The room IS the apparatus — the reader experiences it firsthand (Prison Pink, Stroop, Müller-Lyer, defaults-organ-donation graph).
- **Analogic.** The room STAGES the apparatus through another medium (Goodhart shown via a school test-score example; survivorship bias shown via Wald's airplane diagram).

Direct rooms have higher bang-for-buck — they bypass argument by producing the datum in the reader's body. Analogic rooms are higher-skill staging and tend to take more prose.

Each room has: **topic / felt-experience / prior-notes / status**. Status = `seed` (idea only), `notes-exist` (Lee has source material), `partly built`, or `built`. Rooms with `[CL]` reuse the constellation-cutout-lab engine.

---

### Domain A · Direct biological perception (the eye, the ear, the body)

The original 10 candidates. Plus four classic perceptual illusions worth adding for bang-per-room.

| # | Room name | Topic | Felt experience | Gesture toward | Prior notes | Status |
|---|-----------|-------|-----------------|----------------|-------------|--------|
| A1 | **Voyager** | Space physics / why eerie sounds feel eerie | Plasma-wave audio + ASCII field; reads as dread until you know what it is | NASA mission patch · radio receiver · 1979 instrument panel | `assets/nasa/audio/symphonies/` (vendored); constellation-cutout-lab.njk audio module | notes-exist · partly built [CL] |
| A2 | **Pulsars** | Time-keeping, neutron-star physics, rhythm perception | Steady ticks at 30 Hz (Crab) shift from "machine" to "biological" with framing prose | Jodrell Bank chart paper · seismograph trace · metronome | `assets/nasa/audio/pulsars/` (8 files vendored) | notes-exist |
| A3 | **Prison pink** | Baker-Miller pink color experiments (Schauss 1979); calming-effect claims that don't replicate | Solid Baker-Miller field; reveal flips to neutral gray; reader's own retinal afterimage delivers the punchline | Pantone chip · state-issued procurement spec · paint sample card · clinical dosimeter (live exposure timer) | `perception/prison-pink.njk` (built); cites verified 2026-05-15 | **built** (public-bar pass 2026-05-13, citations verified 2026-05-15) |
| A4 | **Biophilia** | Wilson, restorative environments, why plant motifs settle us | ASCII fronds / fractal foliage; rest-state physiology prose | Herbarium specimen sheet · woodcut botanical · Victorian field guide | `KNOWLEDGE_BASE/Books_Library/unknown_None_nature_by_design_the_practice_of_biophilic_design.md` | notes-exist |
| A5 | **Umwelt** | Von Uexküll; the tick's three-cue world; mantis shrimp 16-channel color | Same scene rendered through tick / mantis / bat / human channels in sequence; "what you see is a species-decision" | Ethogram · species-key plate · taxonomic comparison sheet | Adjacent: `Simple_Machines/dogs_and_designers_2026-05-05.md` (dogs/instinct seed) | notes-exist (adjacent) |
| A6 | **Descending sweeps** | Auditory threat circuitry; why pitch-falling reads as alarm | A capella whistler-mode sweeps over silence; the body recognizes "down" as bad | Spectrogram printout · oscilloscope screen · siren | — *AI-suggested, but [[memory: voyager-symphonies-feel-scary]] tangentially captures the intuition* | seed |
| A7 | **Color science** | Opponent process, chromatic adaptation, after-images (broader than Prison Pink) | Stare at a field; look away; the brain reveals itself by what it leaves behind. Two patches of same gray on different backgrounds (simultaneous contrast). | Printer's color bar · swatch book · Albers plate | Adjacent: `Projects/personal_website/source_reading/notes/berger_ways-of-seeing*.md` | notes-exist (adjacent) |
| A8 | **Binaural / brainwaves** | The 3.4 Hz alpha-band beat from the cutout lab drone; what entrainment is and isn't | Headphones-only room with the JI drone bare; prose names the apparatus and the YouTube-myth | Hi-fi monitor rack · audiologist booth · stereo manual | constellation-cutout-lab.njk audio module (JI drone code is reusable) | partly built [CL] |
| A9 | **Pareidolia / constellations** | Why we see figures in stars; pattern-completion as evolved reflex | The constellation cutout lab itself, with framing prose foregrounding "you are doing this, the sky isn't" | 19th-c star-chart engraving · planisphere · woodcut | `constellation-cutout-lab.njk` (the entire existing piece) | built [CL] |
| A10 | **Smell? / proprioception?** | Modalities that don't make it into screen-based work — and what that says | Text-only room confronting the limits of the medium | Empty exhibition wall label · vitrine card · medium-failure poster | — *meta-room* | seed |
| A11 | **Müller-Lyer / Ebbinghaus illusions** | Classic length & size illusions that survive knowing they're illusions | Two arrows with fins; ruler appears; you still see them as different lengths | Optometrist's eye chart · field-guide plate | — | seed (direct mode) |
| A12 | **Cutaneous rabbit** | Tactile illusion of jumps across skin when only two points are tapped | Description + audio cue + ASCII visualization (true demo requires haptic) | Medical anatomy plate · neurology textbook | — *desktop limitation: real cutaneous rabbit needs touch* | seed (analogic — full direct needs hardware) |
| A13 | **Flash-lag effect** | Moving object + flashed reference; brain "predicts forward" producing offset | Browser-rendered moving cursor with flashed marker | Stroboscope · motion-study photograph (Marey/Muybridge) | — | seed (direct) |
| A14 | **Ventriloquist effect** | Sound localization captured by visual cue | Click-source moves while only the visual cue shifts; you hear it follow the visual | Stereo VU meter · mixing board | — | seed (direct, needs A/V sync) |

### Domain B · Direct cognition (the mind producing artifacts the reader can feel themselves making)

The reader walks in, performs a small task, fails or succeeds in a predictable way, then is shown the system that made the failure inevitable.

- **B1 · Stroop effect.** *Direct.* Name the color, not the word. You will watch yourself slow down on RED in green ink. Cite: Stroop 1935. Gesture: classroom poster · psychology textbook plate.
- **B2 · McGurk effect.** *Direct.* A 10-second video of /ba/ overdubbed onto /ga/ lip movements — you hear /da/. Cross-modal binding made undeniable. Cite: McGurk & MacDonald 1976. Gesture: phonetics-textbook diagram · audiologist's display.
- **B3 · Anchoring.** *Direct.* Two screens, two questions. The first one's irrelevant number changes your answer to the second. Cite: Tversky & Kahneman 1974. Gesture: auctioneer's gavel · price-tag · negotiator's clipboard.
- **B4 · Selective attention (the gorilla).** *Direct.* Simons & Chabris 1999 — 90-second video, ~half of viewers miss the gorilla. Cite verified, video available CC-licensed (verify before ship). Gesture: basketball scoreboard · video monitor.
- **B5 · Inattentional / change blindness.** *Direct.* Door swap (Simons & Levin 1998); the gradual-fade landscape change. Cite: Simons & Levin 1998. Gesture: surveillance footage · spot-the-difference puzzle.
- **B6 · Illusion of explanatory depth.** *Direct.* Rate your understanding of 5 things (zipper, democracy, immune system, refrigerator, flush toilet) on 1–10. Then try to *explain* one of them. The rating drops. Cite: Rozenblit & Keil 2002. Gesture: technical exploded-diagram · patent illustration.
- **B7 · Working memory load.** *Direct.* Remember 3 digits. Pass. Remember 5. Stumble. Remember 7. Fail. The Miller 7±2 demonstrated on yourself. Cite: Miller 1956; Cowan 2001. Gesture: typewriter ribbon · spy-novel cipher card.

### Domain C · Design as applied perception (the grid, the type, the default — apparatus dressed as taste)

Rooms that show design choices as perceptual apparatus, not preferences.

- **C1 · Optical adjustments.** *Direct.* Circle, square, triangle — geometrically the same height, perceptually unequal. Apple's logo isn't a circle. Adrian Frutiger spent fifty years on this. Cite: Frutiger; Spiekermann. Gesture: type-foundry specimen book.
- **C2 · The font changes the argument.** *Direct.* Same paragraph rendered in Comic Sans, Times, and Helvetica. You will judge the trustworthiness differently. Cite: Morris (NYT) 2012 — "Are you an optimist or a pessimist?"; Mackiewicz & Moeller 2005. Gesture: courtroom exhibit · resume mock-up.
- **C3 · Defaults are designed.** *Direct.* Johnson & Goldstein 2003 organ-donation graph — same population, different default, dramatic difference. Slider lets reader feel the policy lever. Cite: Johnson & Goldstein 2003; Sunstein & Thaler. Gesture: government form · clipboard checklist.
- **C4 · Hick's law / Fitts's law.** *Direct.* Two test rigs side by side — fewer choices → faster decisions; bigger targets → faster hits. The reader will time themselves. Cite: Hick 1952; Fitts 1954. Gesture: control panel · ergonomics manual.
- **C5 · Grid reveal.** *Direct.* Same layout, with and without underlying grid visible. Toggle. The grid was always there. Cite: Müller-Brockmann *Grid Systems*. Gesture: drafting paper · architectural blueprint.
- **C6 · Optical kerning.** *Direct.* "AVA" with metric vs optical kerning — same characters, different rhythm. Cite: Bringhurst *Elements of Typographic Style*. Gesture: hot-metal type drawer.
- **C7 · WCAG contrast.** *Direct + analogic.* "Looks fine to me" + the math + a simulator of low-vision and color-blindness rendering. Cite: WCAG 2.2 guidelines; Spillers. Gesture: vision-test card · accessibility audit form.

### Domain D · Organizational perception (the frames, games, structures inside which work happens)

Rooms that make the invisible scaffolding of organizational life legible. Most are analogic — they stage the apparatus rather than producing it on the reader directly (since you can't put a meeting in a browser).

- **D1 · Goodhart's law.** *Analogic.* Three real-world measurement-becomes-target failures: school test scores, NPS, OKR theatre. The reader names a measure → the measure shifts. Cite: Goodhart 1975; Strathern 1997. Gesture: annual report cover · KPI dashboard.
- **D2 · Chesterton's fence.** *Analogic.* A literal photograph of a broken-looking fence. Rotate cards showing reasons it might be there. The lesson lands at the third or fourth card. Cite: Chesterton, *The Thing*, 1929. Gesture: rural roadside photograph · surveyor's map.
- **D3 · The iceberg.** *Direct.* Visual split — what proportion of "the org" is visible to an outsider vs visible to a participant vs actually there. Slider. Cite: Schein *Organizational Culture and Leadership*. Gesture: oceanographic cross-section · cutaway diagram.
- **D4 · The reframe.** *Direct.* Same paragraph reframed three ways (problem / opportunity / threat). Identical data, different decisions implied. Cite: Lakoff *Don't Think of an Elephant*; Tversky-Kahneman framing studies. Gesture: news-clipping collage.
- **D5 · Status as protocol.** *Analogic.* A meeting transcript with annotations for status moves the reader didn't notice on first read. Cite: Goffman *Strategic Interaction*; Keith Johnstone *Impro*. Gesture: theatre script · annotated transcript.
- **D6 · Common knowledge.** *Analogic.* "Everyone knows" vs "everyone knows that everyone knows." Show the difference via the coordination problem (and the coup d'état logic). Cite: Chwe *Rational Ritual* 2001. Gesture: town-square diagram · public-address poster.
- **D7 · Loss aversion in change.** *Direct.* Endowment-effect demo (you keep the mug; the equivalent cash offer feels worse than the mug feels good). Then framed for change management. Cite: Kahneman, Knetsch, Thaler 1990. Gesture: balance-scale · negotiation diagram.

### Domain E · Global health & statistical perception (the denominator, the framing, the base rate)

The room family Lee can write better than anyone alive — direct echo of the IC manuscripts and the WHO companion piece.

- **E1 · Denominators.** *Direct.* Same case count, two denominator choices, opposite story (per capita / per 100k / per region / per behavior). Slider lets reader flip. Cite: Rosling *Factfulness*; Best *Damned Lies and Statistics*. Gesture: government statistical bulletin.
- **E2 · Base rate fallacy.** *Direct.* The classic cancer-screening problem: 1% prevalence, 90% sensitive test → if you test positive, what's your probability? Most readers say 90%; the answer is ~8%. Cite: Gigerenzer & Hoffrage 1995. Gesture: clinical-decision flowchart.
- **E3 · Identifiable victim.** *Direct.* One named child's photo above an outcome graph vs anonymous-deaths bar graph. Reader's willingness-to-act flips. Cite: Slovic 2007; Small, Loewenstein, Slovic 2007; Heath brothers *Made to Stick*. Gesture: charity-appeal mailer · UN poster.
- **E4 · Counterfactual reasoning.** *Analogic.* The hardest concept in public health — "vaccine-prevented vs vaccine-attributed." Visualization of disease-rate-as-actually-happened vs disease-rate-if-no-program. Cite: Hernan & Robins; Pearl. Gesture: weather-forecast probability cone.
- **E5 · Frequency vs probability framing.** *Direct.* "1 in 100" vs "1%" vs "90% survival" vs "10% mortality" — same numbers, different behavioral effects on the reader's own choices. Cite: Gigerenzer; Slovic. Gesture: medical-leaflet sidebar.
- **E6 · Survivorship bias.** *Direct.* Wald's airplane diagram (where to add armor). Reader is shown the surviving planes' bullet-hole pattern and asked to recommend; the right answer is the opposite. Cite: Wald 1943; Mangel & Samaniego 1984. Gesture: military memo · damage-survey form.
- **E7 · The replication apparatus.** *Analogic.* Direct echo of Lee's IC work. Research ethics as invisible scaffold; what determines whether a study survives. Could literally cite the WHO companion manuscript when it ships. Cite: WHO ethics documents (the IC corpus); Ioannidis 2005. Gesture: ethics-committee form · scientific-method classroom diagram.
- **E8 · The hot-zone illusion.** *Direct.* Geographic clusters that look meaningful are usually just Poisson. Reader sees a map "outbreak," then sees the same map with random points, and can't distinguish. Cite: Gilovich, Vallone, Tversky 1985 (hot hand origin); Hand *The Improbability Principle*. Gesture: epidemiological map · census tract grid.

### Domain F · Meta / apparatus of apparatus (rooms about the project's own move)

These belong at the end of the wandered exhibit — they only make sense once the reader has experienced a few of A–E.

- **F1 · Map and territory.** *Direct.* Borges + actual map-zoom levels with the same query at each. The map's claims about the territory degrade as you zoom out. Cite: Korzybski 1933; Borges "On Exactitude in Science." Gesture: cartographer's bench · OS map fragment.
- **F2 · The streetlight effect.** *Analogic.* A literal field with a literal streetlight at night, and the parable. Then named: where do you look for what you can't find? Cite: Kaplan *The Conduct of Inquiry* 1964 (originator); often attributed to Nasreddin. Gesture: stage-lighting diagram · police search photo.
- **F3 · Frames.** *Direct.* The "estate tax" vs "death tax" demonstration — identical policy, opposite polling. Lakoff's classic. Cite: Lakoff *Don't Think of an Elephant* 2004; Hayakawa *Language in Thought and Action*. Gesture: newspaper above-the-fold.
- **F4 · Hindsight bias.** *Direct.* Show historical event, ask reader to estimate prior probability "given what was known then." Show what people actually predicted at the time. Cite: Fischhoff 1975. Gesture: history-textbook plate · prediction-market screenshot.
- **F5 · The room you're in.** *Direct + meta.* The closing room of the exhibit. Names what these rooms do. Refers back to specific earlier rooms by way of pointing at the unifying move. Cite: this DESIGN.md; the STRATEGY.md unifying frame. Gesture: exhibition catalogue closing essay · floor plan.

---

### Open / not-yet-roomed (bench)

Items considered but not yet enough to be a candidate. Re-evaluate when next adding rooms.

- **Somatic markers** (Damasio) — interoceptive evidence in decision-making.
- **Hedonic adaptation** — set-point return; the lottery vs paraplegic Brickman study.
- **Aesthetic chills** (Sloboda; Huron's *Sweet Anticipation*) — could be a sub-room of A8 binaural.
- **Time perception under stress** — the "everything slowed down" effect; Stetson, Eagleman.
- **The thatcher effect** — inverted-face anomaly invisibility.
- **The bouba/kiki effect** — cross-modal sound-shape mapping.
- **Conformity (Asch)** — direct-mode line judgment; high social risk to land.
- **The illusion of free will** (Wegner; Libet) — ambitious, hard to ship without philosophical scaffolding.
- **Self-fulfilling prophecy / placebo / nocebo** — straddles A and E.
- **Misinformation effect / false memory** (Loftus) — direct-mode demo; ethics question about doing it to a stranger.

## Voice register (open question)

Three candidates, very different:
1. **Clinical-explanatory**: "Pitch-falling is encoded in the inferior colliculus as…" — high information density, low warmth.
2. **Lyrical-essayist**: Sloan / Sarah Perry register — perception treated as wonder, science as material for the wonder.
3. **Dialogic / Socratic**: short questions that anticipate the reader's; closer to Bret Victor's prompting style.

Lee voice memory: e.g./i.e. natural hedges, software-as-craft metaphors welcome. Lyrical-essayist probably the fit, but each room could pick its own register.

## Architecture — minimum-viable shape

```
perception/
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

Routing: `/perception/`, `/perception/voyager/`, `/perception/pulsars/`. Each room is just a page. Soft links via frontmatter `see_also: [voyager, pulsars]`.

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
- **License.** Voyager audio is gitignored sandbox-only. If the exhibit ships publicly, need to decide: replace with raw NASA-direct clips, stream from archive.org, or stay sandbox-local-only.

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
