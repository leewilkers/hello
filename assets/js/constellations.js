/* Shared constellation data — single source of truth for base.njk, ascii-lab.njk,
 * constellation-cutout-lab.njk. Copied verbatim from base.njk's CONSTELLATIONS block
 * (lines 423–751 at extraction time). Exposes window.CONSTELLATIONS and
 * window.CONSTELLATION_CYCLE for global-script consumers.
 */
(function () {
  'use strict';

  const CONSTELLATIONS = {
    bootes: {
      id: 'bootes',
      labels: {
        one: { text: 'Rho', pointIndex: 3, dx: 4.2, dy: -5 },
        two: { text: 'Arcturus', pointIndex: 4, dx: -13.4, dy: -4.6, primary: true },
        three: { text: 'Eta', pointIndex: 5, dx: 4.4, dy: -5.8 }
      },
      note: {
        title: 'Boötes',
        id: 'The Herdsman / Arcturus',
        href: 'https://en.wikipedia.org/wiki/Arcturus#Cultural_significance',
        paragraphs: [
          'Boötes (bo-OH-teez), <span class="note-name">the Herdsman</span>, is a kite-shaped constellation visible overhead in the northern spring and summer. The name comes from a Greek verb meaning “to drive oxen.”',
          '<span class="note-star">Arcturus</span>, at the bright corner of the kite, is the brightest star in the northern hemisphere — an orange giant about 36.7 light-years away.',
          'In Hawaiian wayfinding the same star is <span class="note-star">Hōkūleʻa</span>, the zenith star directly overhead at the latitude of Hawaiʻi. The Polynesian Voyaging Society’s reconstruction canoe of that name sailed from Hawaiʻi to Tahiti in 1976, navigated by <span class="note-person">Mau Piailug</span> using stars, swells, and wildlife alone.'
        ]
      },
      points: [
        [5, 16], [10, 3], [26, 5], [30, 17], [39, 22],
        [47, 23], [50, 27], [34, 27], [22, 20], [12, 15]
      ],
      highlightIndex: 4,
      edges: [[1, 2], [1, 9], [9, 0], [9, 8], [8, 4], [2, 3], [3, 4], [3, 8], [4, 5], [5, 6], [4, 7]],
      stars: [
        [6, 3, 0.2], [14, 13, 1.3], [24, 5, 2.4], [34, 2, 1.1], [50, 7, 2.1],
        [56, 16, 0.9], [8, 21, 2.8], [27, 19, 0.5], [44, 22, 1.7]
      ],
      lineColor: '#3aa99f',
      starColor: '#cecdc3',
      pointColor: '#fffcf0',
      highlightColor: '#f6a19a',
      highlightSparkColor: '#d14d41'
    },
    lepus: {
      id: 'lepus',
      labels: {
        one: { text: 'R Leporis', pointIndex: 11, dx: -14.2, dy: -5.6, primary: true },
        two: { text: 'Nihal', pointIndex: 4, dx: 3.8, dy: -5.6 },
        three: { text: 'Arneb', pointIndex: 3, dx: -12.6, dy: -5.6 }
      },
      note: {
        title: 'Lepus',
        id: 'The Hare / Hind’s Crimson Star',
        href: 'https://en.wikipedia.org/wiki/R_Leporis',
        paragraphs: [
          'Lepus, <span class="note-name">the Hare</span>, is a small southern constellation that crouches at <span class="note-name">Orion</span>’s feet.',
          '<span class="note-star">R Leporis</span> is among the deepest visible reds in the sky, with a brightness that rises and falls on a roughly 430-day cycle.',
          '<span class="note-person">John Russell Hind</span> first observed it in October 1845 and described it as “like a drop of blood on a black field.” The star has been known as <span class="note-star">Hind’s Crimson Star</span> ever since.'
        ]
      },
      points: [
        [8, 13.3], [15, 11.2], [23, 12.1], [32, 16.2], [45, 13.3],
        [43, 9], [49, 8.3], [51, 21.7], [35, 19.8], [24.5, 22.9], [19, 20.5],
        [38, 25.6]
      ],
      highlightIndex: 11,
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [4, 7], [3, 8], [8, 7], [8, 9], [9, 10], [10, 3], [10, 0], [8, 11]],
      stars: [
        [5, 6, 0.3], [13, 18, 1.9], [25, 6, 2.2], [38, 9, 1.2], [55, 13, 0.7],
        [47, 27, 2.8], [9, 25, 1.5], [31, 24, 2.4], [52, 5, 1.1], [40, 26, 3.4]
      ],
      lineColor: '#3aa99f',
      starColor: '#cecdc3',
      pointColor: '#fffcf0',
      highlightColor: '#f6a19a',
      highlightSparkColor: '#d14d41'
    },
    polaris: {
      id: 'polaris',
      labels: {
        one: { text: 'Polaris', pointIndex: 0, dx: 5.0, dy: -6.4, primary: true },
        two: { text: 'Kochab', pointIndex: 2, dx: 3.8, dy: -5.8 },
        three: { text: 'Pherkad', pointIndex: 1, dx: 5.0, dy: -5.6 }
      },
      note: {
        title: 'Ursa Minor',
        id: 'The Little Bear / Polaris',
        href: 'https://en.wikipedia.org/wiki/Polaris#Role_as_pole_star',
        paragraphs: [
          'Ursa Minor, <span class="note-name">the Little Bear</span>, circles the north celestial pole. <span class="note-star">Polaris</span> sits at the tip of its tail, within 0.7° of the pole itself.',
          'Because it stays so close to the pole, Polaris does not noticeably move across the night sky, and has been used for orientation at least since Phoenician sailors.',
          'It has not always been the pole star, and will not always be: Earth’s axis precesses through a 26,000-year wobble that drifts the pole among the stars. The pyramid-builders steered by <span class="note-star">Thuban</span>, in <span class="note-name">Draco</span>; by approximately 13,727 CE the pole will fall near <span class="note-star">Vega</span>.'
        ]
      },
      points: [
        [30, 14], [22, 9], [38, 9], [41, 17], [30, 23],
        [19, 17], [8, 25], [14, 22]
      ],
      highlightIndex: 0,
      edges: [[1, 2], [2, 3], [3, 4], [4, 5], [5, 1], [6, 7], [7, 0], [0, 4]],
      stars: [
        [6, 7, 0.4], [12, 15, 1.2], [19, 5, 2.1], [35, 4, 0.9], [50, 10, 2.7],
        [54, 24, 1.7], [28, 27, 2.4], [44, 18, 3.1], [4, 25, 1.5]
      ],
      lineColor: '#4385be',
      starColor: '#cecdc3',
      pointColor: '#fffcf0',
      highlightColor: '#f6a19a',
      highlightSparkColor: '#d14d41'
    },
    crux: {
      id: 'crux',
      labels: {
        one: { text: 'Acrux', pointIndex: 1, dx: -9.6, dy: 4.2, primary: true },
        two: { text: 'Gacrux', pointIndex: 0, dx: -10.2, dy: -5.8 },
        three: { text: 'Mimosa', pointIndex: 2, dx: 5.0, dy: -9.0 }
      },
      note: {
        title: 'Crux',
        id: 'Southern Cross / Acrux',
        href: 'https://en.wikipedia.org/wiki/Crux#Navigation',
        paragraphs: [
          'Crux, <span class="note-name">the Southern Cross</span>, is the smallest of the eighty-eight modern constellations — a cross-shape so far south that it is invisible from most of the northern hemisphere.',
          '<span class="note-star">Acrux</span>, at the bright foot of the cross, is a system of massive blue giants about 321 light-years away. Extending the cross’s long axis points to the south celestial pole, which has no bright star to mark it.',
          'In Aboriginal Australian astronomy, Crux forms one corner of <span class="note-name">the Emu in the Sky</span>: a dark constellation traced not by stars but by the dust lanes of <span class="note-star">the Milky Way</span>, with the <span class="note-star">Coalsack nebula</span> beside Crux as the emu’s head.'
        ]
      },
      points: [
        [29, 5], [32, 22.6], [18, 14.6], [43, 13.6], [34, 27]
      ],
      highlightIndex: 1,
      edges: [[0, 1], [2, 3], [1, 4]],
      stars: [
        [8, 7, 0.4], [13, 22, 1.8], [25, 26, 2.3], [39, 6, 1.1], [52, 9, 2.7],
        [49, 24, 0.8], [4, 18, 2.2], [56, 19, 1.6], [21, 5, 3.1]
      ],
      lineColor: '#879a39',
      starColor: '#cecdc3',
      pointColor: '#fffcf0',
      highlightColor: '#f6a19a',
      highlightSparkColor: '#d14d41'
    },
    sirius: {
      id: 'sirius',
      labels: {
        one: { text: 'Sirius', pointIndex: 1, dx: 5.0, dy: -6.2, primary: true },
        two: { text: 'Mirzam', pointIndex: 0, dx: 5.0, dy: 5.0 },
        three: { text: 'Adhara', pointIndex: 3, dx: 3.8, dy: -5.4 }
      },
      note: {
        title: 'Canis Major',
        id: 'The Greater Dog / Sirius',
        href: 'https://en.wikipedia.org/wiki/Sirius#Observational_history',
        paragraphs: [
          'Canis Major, <span class="note-name">the Greater Dog</span>, follows <span class="note-name">Orion</span> across the sky. <span class="note-star">Sirius</span>, at its eye, is the brightest star in the night sky — almost twice as bright as runner-up <span class="note-star">Canopus</span>, and at 8.6 light-years away one of the closest.',
          'The Egyptians knew it as <span class="note-star">Sothis</span> and built a calendar around its first dawn rising, which heralded the annual flooding of the Nile.',
          'The Greek and Roman “dog days” of late summer come from the same rising: when Sirius rose with the <span class="note-star">Sun</span> in late July, the days were thought to be hottest because Sirius was adding its heat to the Sun’s.'
        ]
      },
      points: [
        [14, 17], [25, 15], [35, 21], [44, 13], [52, 19], [31, 7]
      ],
      highlightIndex: 1,
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5]],
      stars: [
        [6, 4, 0.3], [10, 25, 1.3], [20, 7, 2.6], [41, 5, 1.8], [56, 15, 0.9],
        [48, 27, 2.2], [31, 25, 3.2], [4, 19, 1.7], [53, 6, 2.9]
      ],
      lineColor: '#d0a215',
      starColor: '#cecdc3',
      pointColor: '#fffcf0',
      highlightColor: '#f6a19a',
      highlightSparkColor: '#d14d41'
    },
    pleiades: {
      id: 'pleiades',
      labels: {
        one: { text: 'Alcyone', pointIndex: 0, dx: 5.0, dy: 5.0, primary: true },
        two: { text: 'Atlas', pointIndex: 2, dx: 4.2, dy: -5.4 },
        three: { text: 'Merope', pointIndex: 4, dx: -9.2, dy: 4.2 }
      },
      note: {
        title: 'Pleiades',
        id: 'M45 / open cluster in Taurus',
        href: 'https://en.wikipedia.org/wiki/Pleiades#Astronomical_role_of_M45_in_antiquity',
        paragraphs: [
          'The Pleiades are not a constellation but an open cluster on the shoulder of <span class="note-name">Taurus</span>, about 444 light-years away. Six or seven stars are visible to the naked eye; <span class="note-star">Alcyone</span> is the brightest.',
          'Their first dawn rising and their evening setting marked planting and sailing seasons across many cultures.',
          'Most cultures count seven Pleiades, though only six are easy to see, and the same “lost sister” story turns up in Greek, Aboriginal Australian, and Native American traditions. One hypothesis dates the story to roughly 100,000 years ago, when one of the cluster’s stars was bright enough to be a clear seventh.'
        ]
      },
      points: [
        [28, 11], [22, 9], [33, 8], [38, 13], [25, 17],
        [32, 18], [18, 14], [41, 18], [15, 8]
      ],
      highlightIndex: 0,
      edges: [[1, 0], [0, 2], [0, 4], [2, 3], [4, 5], [3, 7], [1, 8], [6, 4]],
      stars: [
        [9, 4, 0.5], [13, 21, 1.4], [21, 5, 2.8], [36, 5, 1.3], [45, 11, 2.1],
        [52, 21, 0.8], [28, 25, 3.3], [6, 17, 2.2], [56, 7, 1.9]
      ],
      lineColor: '#4385be',
      starColor: '#cecdc3',
      pointColor: '#fffcf0',
      highlightColor: '#f6a19a',
      highlightSparkColor: '#d14d41'
    },
    mizarAlcor: {
      id: 'mizarAlcor',
      labels: {
        one: { text: 'Mizar', pointIndex: 2, dx: 5.0, dy: 5.0, primary: true },
        two: { text: 'Alcor', pointIndex: 3, dx: 3.8, dy: -6 },
        three: { text: 'Alioth', pointIndex: 1, dx: 5.0, dy: 5.0 }
      },
      note: {
        title: 'Ursa Major',
        id: 'The Great Bear / Mizar and Alcor',
        href: 'https://en.wikipedia.org/wiki/Mizar_and_Alcor#Test_of_eyesight',
        paragraphs: [
          'Ursa Major, <span class="note-name">the Great Bear</span>, is among the oldest recognised constellations. Its seven brightest stars form <span class="note-name">the Big Dipper</span>, or <span class="note-name">Plough</span>.',
          '<span class="note-star">Mizar</span> sits at the bend of the Dipper’s handle, with <span class="note-star">Alcor</span> a finger-width beside it. Persian and Arabic tradition treated the ability to split them with the naked eye as an eyesight test, used in selecting warriors and recruits.',
          'The Arabic names reflect the test itself: <em>Mizar</em> means “the apron,” and <em>Alcor</em> means “the faint one,” or “the test.”'
        ]
      },
      points: [
        [7, 17], [18, 14], [30, 12], [33, 9], [45, 15], [55, 19]
      ],
      highlightIndex: 2,
      edges: [[0, 1], [1, 2], [2, 4], [4, 5], [2, 3]],
      stars: [
        [8, 5, 0.4], [14, 24, 1.9], [24, 6, 2.4], [37, 24, 0.8], [51, 6, 1.6],
        [57, 15, 2.6], [4, 27, 2.9], [43, 10, 1.2], [30, 26, 3.1]
      ],
      lineColor: '#878580',
      starColor: '#cecdc3',
      pointColor: '#fffcf0',
      highlightColor: '#f6a19a',
      highlightSparkColor: '#d14d41'
    },
    vega: {
      id: 'vega',
      labels: {
        one: { text: 'Vega', pointIndex: 0, dx: -8.4, dy: -6.2, primary: true },
        two: { text: 'Sheliak', pointIndex: 3, dx: 3.8, dy: -5.2 },
        three: { text: 'Sulafat', pointIndex: 4, dx: -10.6, dy: 4.4 }
      },
      note: {
        title: 'Lyra',
        id: 'The Lyre / Vega',
        href: 'https://en.wikipedia.org/wiki/Vega#Photometric_calibration',
        paragraphs: [
          'Lyra, <span class="note-name">the Lyre</span>, is the harp of <span class="note-person">Orpheus</span> — a small bright parallelogram visible on summer evenings.',
          '<span class="note-star">Vega</span>, at the bright corner of the parallelogram, is the fifth-brightest star in the night sky and just twenty-five light-years away.',
          'In 1850 Vega became the first star besides the <span class="note-star">Sun</span> ever photographed, captured on a <span class="note-tool">daguerreotype</span> by <span class="note-person">William Bond</span> and <span class="note-person">John Adams Whipple</span> at Harvard. Astronomers later used it as the standard reference for stellar brightness.'
        ]
      },
      points: [
        [18, 5], [31, 12], [43, 13], [38, 24], [24, 23], [31, 18]
      ],
      highlightIndex: 0,
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 1], [4, 5], [5, 3]],
      stars: [
        [7, 9, 0.5], [12, 22, 1.2], [25, 4, 2.1], [49, 7, 1.8], [55, 24, 2.7],
        [41, 27, 0.9], [5, 26, 1.7], [35, 6, 2.8], [22, 17, 3.2]
      ],
      lineColor: '#205ea6',
      starColor: '#cecdc3',
      pointColor: '#fffcf0',
      highlightColor: '#f6a19a',
      highlightSparkColor: '#d14d41'
    },
    reticulum: {
      id: 'reticulum',
      labels: {
        one: { text: 'Alpha Ret', pointIndex: 0, dx: 5.0, dy: -5.8, primary: true },
        two: { text: 'Beta Ret', pointIndex: 1, dx: 3.8, dy: -5.8 },
        three: { text: 'Zeta', pointIndex: 8, dx: 3.8, dy: -5.2 }
      },
      note: {
        title: 'Reticulum',
        id: 'The Measuring Grid / Alpha Reticuli',
        href: 'https://en.wikipedia.org/wiki/Reticulum#History',
        paragraphs: [
          'Reticulum is one of fourteen constellations Nicolas-Louis de <span class="note-person">Lacaille</span> introduced from the Cape of Good Hope in the 1750s, naming most of them after instruments of craft and science: <span class="note-name">Telescopium</span>, <span class="note-name">Microscopium</span>, <span class="note-name">Octans</span>, <span class="note-name">Antlia</span> (<span class="note-tool">the air pump</span>).',
          'A <em class="note-tool">réticule</em> is the fine crosshair grid in a telescope eyepiece, used for measuring star positions. Where most constellations are mythological figures, this one is named for a tool. <span class="note-star">Alpha Reticuli</span>, at the bright corner, is a yellow giant about 161 light-years away.',
          'The figure’s better-known feature is <span class="note-star">Zeta Reticuli</span>, a wide pair of Sun-like stars elsewhere in it that became fixed in UFO lore after the 1961 <span class="note-person">Betty and Barney Hill</span> abduction account. <em>Alien</em>’s LV-426 lives in that system.'
        ]
      },
      points: [
        [18, 8], [44, 8], [44, 25], [18, 25], [31, 8],
        [31, 25], [18, 16.5], [44, 16.5], [31, 16.5]
      ],
      highlightIndex: 0,
      edges: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [6, 7], [0, 8], [1, 8], [2, 8], [3, 8]],
      stars: [
        [6, 5, 0.4], [12, 24, 1.4], [24, 5, 2.2], [38, 5, 0.9], [52, 13, 2.9],
        [48, 27, 1.8], [8, 16, 2.5], [56, 23, 1.3], [29, 27, 3.1]
      ],
      lineColor: '#6f6e69',
      starColor: '#cecdc3',
      pointColor: '#fffcf0',
      highlightColor: '#f6a19a',
      highlightSparkColor: '#d14d41'
    },
    epsilonEridani: {
      id: 'epsilonEridani',
      labels: {
        one: { text: 'Epsilon Eridani', pointIndex: 1, dx: 5.5, dy: -6.2, primary: true },
        two: { text: 'Acamar', pointIndex: 5, dx: 3.8, dy: -5.2 },
        three: { text: 'Zaurak', pointIndex: 4, dx: 3.8, dy: -5.4 }
      },
      note: {
        title: 'Eridanus',
        id: 'The River / Epsilon Eridani',
        href: 'https://en.wikipedia.org/wiki/Epsilon_Eridani#SETI_and_proposed_exploration',
        paragraphs: [
          'Eridanus, <span class="note-name">the River</span>, is the sixth-largest constellation by area — a long sinuous river that winds south from <span class="note-name">Orion</span>’s foot to end at <span class="note-star">Achernar</span>. In Greek myth, it is the river into which <span class="note-person">Phaeton</span> fell after losing the reins of the <span class="note-star">Sun</span>’s chariot.',
          '<span class="note-star">Epsilon Eridani</span> is a young Sun-like star, only 10.5 light-years away and among the closest visible to the naked eye. It hosts a confirmed Jupiter-mass planet and two dust rings that echo our own asteroid belt and Kuiper belt.',
          'On 8 April 1960, <span class="note-person">Frank Drake</span> aimed the 26-metre <span class="note-tool">Tatel radio telescope</span> at <span class="note-star">Tau Ceti</span> and Epsilon Eridani and listened — the first deliberate search for radio signals from another star, called Project Ozma.'
        ]
      },
      points: [
        [8, 22], [18, 18], [28, 21], [36, 15], [48, 13], [56, 8]
      ],
      highlightIndex: 1,
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
      stars: [
        [5, 6, 0.5], [13, 10, 1.5], [23, 26, 2.4], [32, 8, 0.7], [42, 24, 1.9],
        [54, 18, 2.8], [49, 5, 1.2], [7, 27, 2.3], [37, 17, 3.1]
      ],
      lineColor: '#3aa99f',
      starColor: '#cecdc3',
      pointColor: '#fffcf0',
      highlightColor: '#f6a19a',
      highlightSparkColor: '#d14d41'
    }
  };

  const CONSTELLATION_CYCLE = [
    'lepus', 'polaris', 'bootes', 'crux', 'sirius',
    'pleiades', 'mizarAlcor', 'vega', 'reticulum', 'epsilonEridani'
  ];

  // Expose globals. Kept as plain script (not ESM) so it works under file:// and
  // every existing inline <script> block.
  window.CONSTELLATIONS = CONSTELLATIONS;
  window.CONSTELLATION_CYCLE = CONSTELLATION_CYCLE;
})();
