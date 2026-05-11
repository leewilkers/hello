/* v2 throughline — Constellation Cutout Lab demo content.
 * Found-text only. Every entry is public domain or a documentary citation.
 * Each beat can be swapped, reordered, deleted, or rewritten freely; the lab
 * walks NARRATIVE_V2 linearly and applies per-page constellation/palette/
 * speed/bed overrides.
 *
 * Shape:
 *   { text, attribution?, constellation, palette, speed, bed, dwell, hold,
 *     isTitle, isListen, isClose }
 *
 * `attribution` is rendered in the kicker line (small caps above the body).
 * `constellation` must be a valid id in window.CONSTELLATIONS.
 * `palette`/`speed` override knobs on this page; tween in over ~600ms.
 * `bed` ∈ {voyager, apollo, pulsar, none}; crossfades when the bed changes.
 * `dwell` (seconds) overrides knobs.dwell during autoplay for this beat.
 * `hold: true` blocks autoplay from advancing — user must tap.
 */
(function () {
  'use strict';

  window.NARRATIVE_V2 = [
    {
      text: 'By what we look up at.',
      isTitle: true,
      constellation: 'lepus',
      palette: 'cool',
      speed: 6,
      bed: 'voyager',
      dwell: 9
    },
    {
      text: 'And the LORD set them in the firmament of the heaven to give light upon the earth, and to rule over the day and over the night.',
      attribution: 'Genesis 1:17 · King James Version, 1611',
      constellation: 'lepus',
      palette: 'cool',
      speed: 6,
      bed: 'voyager',
      dwell: 12
    },
    {
      text: 'Sirius is the brightest star in the night sky. The Egyptians knew it as Sothis, and built a calendar around its first dawn rising — which heralded the annual flooding of the Nile.',
      attribution: 'Astronomical record',
      constellation: 'sirius',
      palette: 'ember',
      speed: 8,
      bed: 'voyager',
      dwell: 13
    },
    {
      text: 'Hōkūleʻa is the zenith star, directly overhead at the latitude of Hawaiʻi. Mau Piailug sailed the canoe of that name from Hawaiʻi to Tahiti in 1976 by stars, swells, and wildlife alone.',
      attribution: 'Polynesian Voyaging Society record',
      constellation: 'bootes',
      palette: 'cool',
      speed: 6,
      bed: 'voyager',
      dwell: 13
    },
    {
      text: 'OFF TO SEE THE WIZARD…',
      attribution: 'Apollo Guidance Computer · THE_LUNAR_LANDING.agc, line 254',
      constellation: 'sirius',
      palette: 'ember',
      speed: 10,
      bed: 'apollo',
      dwell: 11
    },
    {
      text: '(listen)',
      attribution: 'Vela pulsar · 11.2 Hz',
      isListen: true,
      hold: true,
      constellation: 'pleiades',
      palette: 'mono',
      speed: 4,
      bed: 'pulsar',
      dwell: 18
    },
    {
      text: 'Vega became the first star besides the Sun ever photographed, in 1850, on a daguerreotype by William Bond and John Adams Whipple at Harvard.',
      attribution: 'Astronomical record',
      constellation: 'vega',
      palette: 'dusk',
      speed: 6,
      bed: 'voyager',
      dwell: 12
    },
    {
      text: 'By approximately 13,727 CE the pole star will be Vega again. The pyramid-builders steered by Thuban, in Draco.',
      attribution: 'Earth’s axial precession · ~26,000-year cycle',
      constellation: 'polaris',
      palette: 'dusk',
      speed: 7,
      bed: 'voyager',
      dwell: 12
    },
    {
      text: 'In Aboriginal Australian astronomy, Crux is one corner of the Emu in the Sky — a dark constellation traced not by stars but by the dust lanes of the Milky Way, with the Coalsack nebula beside Crux as the emu’s head.',
      attribution: 'Aboriginal sky-lore record',
      constellation: 'crux',
      palette: 'terraforms',
      speed: 6,
      bed: 'voyager',
      dwell: 13
    },
    {
      text: 'BURN, BABY, BURN — MASTER IGNITION ROUTINE.',
      attribution: 'Apollo Guidance Computer · BURN_BABY_BURN--MASTER_IGNITION_ROUTINE.agc, line 45',
      constellation: 'sirius',
      palette: 'ember',
      speed: 12,
      bed: 'apollo',
      dwell: 11
    },
    {
      text: 'Mizar means the apron. Alcor means the test. Persian and Arabic tradition treated the ability to split them with the naked eye as an eyesight test, used in selecting warriors and recruits.',
      attribution: 'Arabic naming tradition',
      constellation: 'mizarAlcor',
      palette: 'lagoon',
      speed: 6,
      bed: 'voyager',
      dwell: 12
    },
    {
      text: '—',
      isClose: true,
      hold: true,
      constellation: 'polaris',
      palette: 'cool',
      speed: 4,
      bed: 'voyager',
      dwell: 30
    }
  ];
})();
