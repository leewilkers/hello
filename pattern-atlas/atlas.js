// pattern-atlas / atlas.js
// Phase 1 field render — 253 Christopher Alexander patterns laid out in 3 scale
// bands (TOWNS / BUILDINGS / CONSTRUCTION), each rendered as an ASCII glyph
// composed from a frozen 31-primitive alphabet.
//
// Design north-star: Kat Zhang ("the poet engineer"). Translation moves:
//   gesture → ambient mouse parallax + keyboard graph navigation
//   latent-space → band-hue confidence pips
//   data-as-landscape → field IS the landscape, no UI chrome
//   ephemeral → prose cards type in and dissolve out
//   unicode/braille → footer ornament rotates ⊷ ⠐ ⢾

'use strict';

/* ───── frozen alphabet (31 primitives, 3×4 max bounding box) ───── */

const P = {
  'wall':       ['    ', '─── ', '    '],
  'membrane':   ['    ', '─ ─ ', '    '],
  'enclosure':  ['┌─┐ ', '│ │ ', '└─┘ '],
  'gap':        ['    ', '─┘└─', '    '],
  'point':      ['    ', ' ●  ', '    '],
  'ringed':     ['    ', '(●) ', '    '],
  'pivot':      ['    ', '─●─ ', '    '],
  'cluster':    ['    ', '●●● ', ' ●  '],
  'scatter':    ['● ● ', '  ● ', '●   '],
  'fade-v':     [' █  ', ' ▓  ', ' ░  '],
  'fade-h':     ['    ', '█▓▒░', '    '],
  'step':       ['███ ', '██  ', '█   '],
  'threshold':  ['    ', '██│ ', '    '],
  'taper':      ['████', '██  ', '█   '],
  'spine':      [' │  ', ' │  ', ' │  '],
  'cross':      [' │  ', '─┼─ ', ' │  '],
  'path':       ['    ', '●●● ', '    '],
  'flow':       ['    ', '~~~~', '    '],
  'alternation':['    ', '█░█░', '    '],
  'ladder':     ['├─┤ ', '├─┤ ', '├─┤ '],
  'comb':       ['    ', '│ │ ', '    '],
  'weave':      ['╱╲╱ ', '╲╱╲ ', '    '],
  'nested':     ['┌──┐', '│┌┐│', '└──┘'],
  'branching':  ['┬   ', '├┬  ', '├┴  '],
  'layered':    ['─── ', '─── ', '─── '],
  'overlap':    ['██▓ ', '▓██ ', '    '],
  'tangent':    ['    ', '○○  ', '    '],
  'embed':      ['██  ', '█▓  ', '    '],
  'pair':       ['    ', '(  )', '    '],
  'away':       ['    ', ')  (', '    '],
  'parallel':   ['──  ', '──  ', '    '],
  'oblique':    ['╲   ', ' ╲  ', '    '],
};

const EMPTY = ['    ', ' ·  ', '    '];
const ORNAMENTS = ['⊷', '⠐', '⢾'];
const SCALE_ORDER = ['TOWNS', 'BUILDINGS', 'CONSTRUCTION'];

/* ───── state ───── */

let patterns = [];
let patternByN = new Map();
let clusters = [];
let glyphs = {};
const cellByN = new Map();
let activeN = null;
let aphorismTimer = null;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ───── boot ───── */

function boot() {
  const pTag = document.getElementById('atlas-patterns');
  const cTag = document.getElementById('atlas-clusters');
  const gTag = document.getElementById('atlas-glyphs');
  try {
    const pData = pTag ? JSON.parse(pTag.textContent || '[]') : [];
    const cData = cTag ? JSON.parse(cTag.textContent || '[]') : [];
    const gData = gTag ? JSON.parse(gTag.textContent || '{}') : {};
    patterns = Array.isArray(pData) ? pData : (pData.patterns || []);
    clusters = Array.isArray(cData) ? cData : (cData.clusters || []);
    glyphs = gData && (gData.glyphs || gData);
  } catch (err) {
    console.error('atlas: data parse failed', err);
    document.body.classList.add('atlas-load-failed');
    return;
  }
  if (!patterns.length) {
    document.body.classList.add('atlas-load-failed');
    return;
  }
  patternByN = new Map(patterns.map(p => [p.n, p]));
  buildField();
  bindEvents();
  startAphorism();
  if (!reducedMotion) startDriftHeartbeat();
}

/* ───── DOM helpers ───── */

function el(tag, attrs, text) {
  const e = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v === false || v === null || v === undefined) continue;
      if (v === true) e.setAttribute(k, '');
      else e.setAttribute(k, v);
    }
  }
  if (text !== undefined && text !== null) e.textContent = text;
  return e;
}

function svgEl(tag, attrs) {
  const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  return e;
}

function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

/* ───── field construction ───── */

function buildField() {
  const root = document.getElementById('atlas-root');
  const existingOverlay = document.getElementById('atlas-overlay');
  const existingFooter = document.getElementById('atlas-footer');
  const existingAudio = document.getElementById('atlas-audio-toggle');
  const canvas = document.getElementById('atlas-canvas');
  if (canvas) canvas.remove();

  // Banner
  const banner = el('header', { id: 'atlas-banner' });
  banner.appendChild(el('span', { class: 'atlas-titleline' }, 'pattern atlas'));
  banner.appendChild(el('span', { class: 'atlas-subline' },
    'after Christopher Alexander · 253 patterns · 3 scales'));
  root.insertBefore(banner, existingOverlay);

  // Field
  const field = el('div', { id: 'atlas-field' });
  for (const scale of SCALE_ORDER) field.appendChild(buildBand(scale));
  root.insertBefore(field, existingOverlay);

  // Edge layer
  const edgeLayer = svgEl('svg', { id: 'atlas-edges', 'aria-hidden': 'true' });
  root.insertBefore(edgeLayer, existingOverlay);

  // Prose card
  root.insertBefore(buildCard(), existingOverlay);

  // Footer
  if (existingFooter) rewireFooter(existingFooter);

  // Audio toggle — band-aware drone
  if (existingAudio) {
    existingAudio.classList.add('atlas-audio-btn');
    existingAudio.addEventListener('click', audioToggle);
  }
}

function buildBand(scale) {
  const ps = patterns.filter(p => p.scale === scale);
  const band = el('section', { class: 'band', 'data-scale': scale });
  const head = el('header', { class: 'band-head' });
  head.appendChild(el('span', { class: 'band-label' }, scale.toLowerCase()));
  head.appendChild(el('span', { class: 'band-count' },
    `${ps.length} patterns · ${ps[0].n}–${ps[ps.length - 1].n}`));
  band.appendChild(head);

  const grid = el('div', { class: 'band-grid' });
  for (const p of ps) grid.appendChild(buildCell(p));
  band.appendChild(grid);
  return band;
}

function buildCell(p) {
  const g = glyphs[p.n] || glyphs[String(p.n)] || {};
  const rows = renderGlyphRows(g);
  const conf = p.confidence || 0;
  const pipChar = conf === 0 ? '' : conf === 1 ? '·' : ':';
  const cell = el('button', {
    class: 'cell',
    'data-n': p.n,
    'data-scale': p.scale,
    'data-conf': conf,
    'data-primary': g.primary || 'empty',
    tabindex: '-1',
    type: 'button',
    'aria-label': `Pattern ${p.n}, ${p.name.toLowerCase()}, ${p.scale.toLowerCase()} scale, confidence ${conf}`,
  });
  cell.appendChild(el('pre', { class: 'cell-glyph', 'aria-hidden': 'true' }, rows.join('\n')));
  cell.appendChild(el('span', { class: 'cell-n', 'aria-hidden': 'true' }, String(p.n).padStart(3, '0')));
  if (pipChar) cell.appendChild(el('span', { class: 'cell-pip', 'aria-hidden': 'true' }, pipChar));
  cellByN.set(p.n, cell);
  return cell;
}

function renderGlyphRows(g) {
  if (!g || !g.primary || !P[g.primary]) return EMPTY;
  return P[g.primary];
}

function composeRows(g) {
  // Render the composition: primary alone if no secondary; layered or inline otherwise.
  if (!g || !g.primary || !P[g.primary]) return EMPTY;
  const prim = P[g.primary];
  if (!g.secondary || !P[g.secondary]) return prim;
  const sec = P[g.secondary];
  if (g.layout === 'inline') {
    // Side by side: primary | secondary, joined per row with a single space
    return [0, 1, 2].map(r => `${prim[r]} ${sec[r]}`);
  }
  // Default to layered: where primary has a space, fill with secondary's char
  return [0, 1, 2].map(r => {
    const a = prim[r];
    const b = sec[r] || '    ';
    let out = '';
    for (let c = 0; c < 4; c++) {
      const ac = a[c] || ' ';
      const bc = b[c] || ' ';
      out += (ac === ' ' && bc !== ' ') ? bc : ac;
    }
    return out;
  });
}

function clusterFor(n) {
  return clusters.find(c => (c.patterns || []).includes(n));
}

function buildCard() {
  const card = el('aside', { id: 'atlas-card', role: 'dialog', 'aria-live': 'polite', hidden: '' });

  const head = el('header', { class: 'card-head' });
  head.appendChild(el('span', { class: 'card-n' }));
  head.appendChild(el('span', { class: 'card-sep' }, '·'));
  head.appendChild(el('span', { class: 'card-name' }));
  head.appendChild(el('span', { class: 'card-meta' }));
  card.appendChild(head);

  card.appendChild(el('p', { class: 'card-cluster' }));

  const body = el('div', { class: 'card-body' });
  body.appendChild(el('p', { class: 'card-problem' }));
  body.appendChild(el('p', { class: 'card-solution' }));
  card.appendChild(body);

  const links = el('nav', { class: 'card-links' });
  const upDiv = el('div', { class: 'card-up' });
  upDiv.appendChild(el('span', { class: 'card-links-label' }, '↑ context'));
  upDiv.appendChild(el('ul'));
  const downDiv = el('div', { class: 'card-down' });
  downDiv.appendChild(el('span', { class: 'card-links-label' }, '↓ refines into'));
  downDiv.appendChild(el('ul'));
  links.appendChild(upDiv);
  links.appendChild(downDiv);
  card.appendChild(links);

  const foot = el('footer', { class: 'card-foot' });
  foot.appendChild(el('div', { class: 'card-glyph-row' })); // primary [+] secondary [=] composed
  foot.appendChild(el('span', { class: 'card-glyph-spec' }));
  card.appendChild(foot);
  return card;
}

function renderCardGlyphRow(container, g) {
  clear(container);
  const addGlyph = (rows, label, klass) => {
    const wrap = el('div', { class: `card-g ${klass || ''}` });
    if (rows) wrap.appendChild(el('pre', { class: 'card-g-glyph', 'aria-hidden': 'true' }, rows.join('\n')));
    else wrap.appendChild(el('pre', { class: 'card-g-glyph card-g-empty', 'aria-hidden': 'true' }, EMPTY.join('\n')));
    if (label) wrap.appendChild(el('span', { class: 'card-g-label' }, label));
    return wrap;
  };
  const addOp = (sym) => {
    const op = el('span', { class: 'card-g-op', 'aria-hidden': 'true' }, sym);
    return op;
  };
  if (!g || !g.primary) {
    container.appendChild(addGlyph(EMPTY, '·', 'is-empty'));
    return;
  }
  const prim = P[g.primary] || EMPTY;
  container.appendChild(addGlyph(prim, g.primary));
  if (g.secondary && P[g.secondary]) {
    container.appendChild(addOp('+'));
    container.appendChild(addGlyph(P[g.secondary], g.secondary));
    container.appendChild(addOp('='));
    container.appendChild(addGlyph(composeRows(g), g.layout || 'layered'));
  }
}

function rewireFooter(footer) {
  clear(footer);
  footer.classList.add('with-aphorism');

  const credit = el('span', { class: 'atlas-credit' });
  credit.appendChild(document.createTextNode('after Alexander, '));
  const link = el('a', { href: 'https://openlibrary.org/works/OL3954402W', rel: 'noopener' });
  link.appendChild(el('cite', null, 'A Pattern Language'));
  credit.appendChild(link);
  credit.appendChild(document.createTextNode(' (Oxford, 1977)'));
  footer.appendChild(credit);

  footer.appendChild(el('span', { class: 'atlas-orn' }));
  footer.appendChild(el('span', { class: 'atlas-aphorism', 'aria-hidden': 'true' }));
}

/* ───── activation ───── */

function activate(n) {
  if (n === activeN) return;
  activeN = n;
  const root = document.getElementById('atlas-root');
  root.classList.add('has-active');
  for (const [cn, cell] of cellByN) {
    cell.classList.toggle('is-active', cn === n);
    cell.classList.remove('is-related');
  }
  const p = patternByN.get(n);
  if (p) {
    [...(p.up || []), ...(p.down || [])].forEach(rn => {
      const c = cellByN.get(rn);
      if (c) c.classList.add('is-related');
    });
  }
  drawEdges(n);
  renderCard(n);
  if (p) audioActivate(p.scale);
}

function deactivate() {
  if (activeN === null) return;
  activeN = null;
  const root = document.getElementById('atlas-root');
  root.classList.remove('has-active');
  for (const cell of cellByN.values()) {
    cell.classList.remove('is-active');
    cell.classList.remove('is-related');
  }
  clearEdges();
  hideCard();
  audioDeactivate();
}

/* ───── edges ───── */

function drawEdges(n) {
  const svg = document.getElementById('atlas-edges');
  if (!svg) return;
  clear(svg);
  const src = cellByN.get(n);
  const p = patternByN.get(n);
  if (!src || !p) return;
  const rootRect = document.getElementById('atlas-root').getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${rootRect.width} ${rootRect.height}`);
  svg.setAttribute('width', String(rootRect.width));
  svg.setAttribute('height', String(rootRect.height));

  const srcRect = src.getBoundingClientRect();
  const sx = srcRect.left + srcRect.width / 2 - rootRect.left;
  const sy = srcRect.top + srcRect.height / 2 - rootRect.top;

  const drawTo = (targetN, dir) => {
    const t = cellByN.get(targetN);
    if (!t) return;
    const tr = t.getBoundingClientRect();
    const tx = tr.left + tr.width / 2 - rootRect.left;
    const ty = tr.top + tr.height / 2 - rootRect.top;
    const midX = (sx + tx) / 2;
    const midY = (sy + ty) / 2;
    const cy = midY + (dir === 'up' ? -50 : 50);
    const path = svgEl('path', {
      d: `M ${sx} ${sy} Q ${midX} ${cy} ${tx} ${ty}`,
      class: `edge edge-${dir}`,
    });
    svg.appendChild(path);
  };
  (p.up || []).forEach(u => drawTo(u, 'up'));
  (p.down || []).forEach(d => drawTo(d, 'down'));
}

function clearEdges() {
  const svg = document.getElementById('atlas-edges');
  if (svg) clear(svg);
}

/* ───── prose card ───── */

let typewriterFrame = null;

function renderCard(n) {
  const card = document.getElementById('atlas-card');
  const p = patternByN.get(n);
  if (!p || !card) return;
  const g = glyphs[n] || glyphs[String(n)] || {};

  card.querySelector('.card-n').textContent = String(p.n).padStart(3, '0');
  card.querySelector('.card-name').textContent = p.name.toLowerCase();
  const confLabel = p.confidence === 2 ? '··' : p.confidence === 1 ? '·' : '—';
  card.querySelector('.card-meta').textContent = `${p.scale.toLowerCase()} · ${confLabel}`;

  const probEl = card.querySelector('.card-problem');
  const solEl = card.querySelector('.card-solution');
  probEl.textContent = p.problem || '';
  solEl.textContent = p.solution || '';
  probEl.classList.remove('done');
  solEl.classList.remove('done');

  fillLinks(card.querySelector('.card-up ul'), p.up || []);
  fillLinks(card.querySelector('.card-down ul'), p.down || []);

  renderCardGlyphRow(card.querySelector('.card-glyph-row'), g);
  card.querySelector('.card-glyph-spec').textContent = g.rationale ? `“${g.rationale}”` : '';

  // cluster context
  const cl = clusterFor(p.n);
  const clusterEl = card.querySelector('.card-cluster');
  if (cl) {
    const first = patternByN.get(cl.first_n);
    const last = patternByN.get(cl.last_n);
    const range = (cl.first_n === cl.last_n)
      ? `pattern ${cl.first_n}`
      : `patterns ${cl.first_n}${first ? '–' : ''}${cl.last_n}`;
    const lead = first && cl.first_n !== p.n ? `${first.name.toLowerCase()} → ${last ? last.name.toLowerCase() : ''}` : '';
    clusterEl.textContent = `cluster · ${range}${lead ? ' · ' + lead : ''}`;
    clusterEl.hidden = false;
  } else {
    clusterEl.hidden = true;
  }

  const cell = cellByN.get(n);
  if (cell) {
    const cellRect = cell.getBoundingClientRect();
    const vh = window.innerHeight;
    card.classList.toggle('top-anchored', cellRect.top > vh * 0.55);
  }

  card.hidden = false;
  void card.offsetWidth;
  card.classList.add('is-visible');
  if (!reducedMotion) startTypewriter(probEl, solEl);
  else { probEl.classList.add('done'); solEl.classList.add('done'); }
}

function fillLinks(ul, ns) {
  if (!ul) return;
  clear(ul);
  ns.slice(0, 6).forEach(n => {
    const p = patternByN.get(n);
    if (!p) return;
    const li = el('li');
    const a = el('button', { type: 'button', class: 'card-link', 'data-n': n },
      `${String(n).padStart(3, '0')} · ${p.name.toLowerCase()}`);
    a.addEventListener('click', e => { e.preventDefault(); focusCell(n); });
    li.appendChild(a);
    ul.appendChild(li);
  });
}

function startTypewriter(probEl, solEl) {
  cancelAnimationFrame(typewriterFrame);
  const targets = [probEl, solEl];
  let idx = 0;
  let i = 0;
  const speed = 4;
  targets.forEach(t => { t.dataset.full = t.textContent; t.textContent = ''; });
  const step = () => {
    const t = targets[idx];
    if (!t) return;
    const card = document.getElementById('atlas-card');
    if (!card.classList.contains('is-visible')) return;
    const full = t.dataset.full || '';
    i += speed;
    t.textContent = full.slice(0, i);
    if (i >= full.length) {
      t.textContent = full;
      t.classList.add('done');
      idx++;
      i = 0;
    }
    if (idx < targets.length) typewriterFrame = requestAnimationFrame(step);
  };
  typewriterFrame = requestAnimationFrame(step);
}

function hideCard() {
  const card = document.getElementById('atlas-card');
  if (!card) return;
  card.classList.remove('is-visible');
  cancelAnimationFrame(typewriterFrame);
  setTimeout(() => { if (!card.classList.contains('is-visible')) card.hidden = true; }, 400);
}

/* ───── interaction binding ───── */

function bindEvents() {
  const root = document.getElementById('atlas-root');
  root.addEventListener('mouseover', e => {
    const cell = e.target.closest('.cell');
    if (cell) activate(+cell.dataset.n);
  });
  root.addEventListener('mouseleave', () => deactivate());
  root.addEventListener('focusin', e => {
    const cell = e.target.closest('.cell');
    if (cell) activate(+cell.dataset.n);
  });
  root.addEventListener('click', e => {
    const cell = e.target.closest('.cell');
    if (cell) focusCell(+cell.dataset.n);
  });

  if (!reducedMotion) {
    let pending = null;
    document.addEventListener('mousemove', e => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        applyAmbient(e.clientX, e.clientY);
        pending = null;
      });
    });
  }

  document.addEventListener('keydown', onKey);
  window.addEventListener('resize', () => { if (activeN) drawEdges(activeN); });
}

function focusCell(n) {
  const cell = cellByN.get(n);
  if (!cell) return;
  for (const c of cellByN.values()) c.setAttribute('tabindex', '-1');
  cell.setAttribute('tabindex', '0');
  cell.focus({ preventScroll: true });
  cell.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center', inline: 'nearest' });
  activate(n);
}

function onKey(e) {
  if (e.target && e.target.tagName === 'INPUT') return;
  if (e.key === 'Escape') { closeSearch(); deactivate(); return; }
  if (e.key === '/') { e.preventDefault(); openSearch(); return; }
  if (e.key === '?') { e.preventDefault(); flashHelp(); return; }
  if (activeN === null) {
    if (e.key === 'Tab' && !e.shiftKey && patterns.length) focusCell(patterns[0].n);
    return;
  }
  const p = patternByN.get(activeN);
  if (!p) return;
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    const ups = p.up || [];
    if (ups.length) focusCell(ups[Math.floor(Math.random() * ups.length)]);
    else pulseActive();
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    const downs = p.down || [];
    if (downs.length) focusCell(downs[Math.floor(Math.random() * downs.length)]);
    else pulseActive();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    const ix = patterns.findIndex(pp => pp.n === activeN);
    const prev = patterns[(ix - 1 + patterns.length) % patterns.length];
    focusCell(prev.n);
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    const ix = patterns.findIndex(pp => pp.n === activeN);
    const next = patterns[(ix + 1) % patterns.length];
    focusCell(next.n);
  }
}

function pulseActive() {
  const cell = cellByN.get(activeN);
  if (!cell) return;
  cell.classList.remove('pulse');
  void cell.offsetWidth;
  cell.classList.add('pulse');
}

/* ───── search ───── */

function openSearch() {
  let panel = document.getElementById('atlas-search');
  if (!panel) {
    panel = el('div', { id: 'atlas-search', role: 'search' });
    const input = el('input', { type: 'text', placeholder: 'pattern name or number…', autocomplete: 'off' });
    const results = el('ul', { class: 'atlas-search-results' });
    panel.appendChild(input);
    panel.appendChild(results);
    document.getElementById('atlas-root').appendChild(panel);
    const update = () => {
      const q = input.value.trim().toLowerCase();
      clear(results);
      if (!q) return;
      const numQ = parseInt(q, 10);
      const matches = patterns.filter(p =>
        (!isNaN(numQ) && p.n === numQ) || p.name.toLowerCase().includes(q)
      ).slice(0, 12);
      for (const p of matches) {
        const li = el('li');
        const b = el('button', { type: 'button', 'data-n': p.n },
          `${String(p.n).padStart(3, '0')} · ${p.name.toLowerCase()} · ${p.scale.toLowerCase()}`);
        b.addEventListener('click', () => { closeSearch(); focusCell(p.n); });
        li.appendChild(b);
        results.appendChild(li);
      }
    };
    input.addEventListener('input', update);
    input.addEventListener('keydown', ev => {
      if (ev.key === 'Enter') {
        const first = results.querySelector('button');
        if (first) first.click();
      } else if (ev.key === 'Escape') closeSearch();
    });
  }
  panel.classList.add('is-open');
  panel.querySelector('input').focus();
}

function closeSearch() {
  const panel = document.getElementById('atlas-search');
  if (!panel) return;
  panel.classList.remove('is-open');
  const input = panel.querySelector('input');
  if (input) input.value = '';
  const results = panel.querySelector('ul');
  if (results) clear(results);
}

function flashHelp() {
  let h = document.getElementById('atlas-help');
  if (!h) {
    h = el('div', { id: 'atlas-help' });
    h.appendChild(el('span', null, '↑↓ traverse up/down edges  ·  ←→ prev/next  ·  / search  ·  esc clear'));
    document.getElementById('atlas-root').appendChild(h);
  }
  h.classList.add('is-visible');
  setTimeout(() => h.classList.remove('is-visible'), 2400);
}

/* ───── ambient ───── */

function applyAmbient(mx, my) {
  const root = document.getElementById('atlas-root');
  const r = root.getBoundingClientRect();
  const tx = (mx - r.width / 2) / r.width;
  const ty = (my - r.height / 2) / r.height;
  root.style.setProperty('--tilt-x', `${-ty * 0.6}deg`);
  root.style.setProperty('--tilt-y', `${tx * 0.6}deg`);
  const radius = 180;
  for (const cell of cellByN.values()) {
    const cr = cell.getBoundingClientRect();
    const cx = cr.left + cr.width / 2;
    const cy = cr.top + cr.height / 2;
    const dx = cx - mx;
    const dy = cy - my;
    const d2 = dx * dx + dy * dy;
    const r2 = radius * radius;
    if (d2 > r2) { cell.style.removeProperty('--prox'); continue; }
    cell.style.setProperty('--prox', (1 - d2 / r2).toFixed(3));
  }
  resetDrift();
}

/* ───── drift ───── */

let driftIdleSince = Date.now();
let driftRunning = false;
let driftRaf = null;

function startDriftHeartbeat() {
  setInterval(() => {
    if (Date.now() - driftIdleSince > 5000 && !driftRunning) startDrift();
  }, 1000);
}

function resetDrift() {
  driftIdleSince = Date.now();
  if (driftRunning) stopDrift();
}

function startDrift() {
  driftRunning = true;
  const start = performance.now();
  const cells = [...cellByN.values()];
  const tick = (t) => {
    if (!driftRunning) return;
    const elapsed = (t - start) / 1000;
    for (let i = 0; i < cells.length; i++) {
      const phase = i * 0.13;
      const x = Math.sin(elapsed * 0.35 + phase) * 1.2;
      const y = Math.cos(elapsed * 0.27 + phase * 1.1) * 0.8;
      cells[i].style.setProperty('--drift-x', `${x.toFixed(2)}px`);
      cells[i].style.setProperty('--drift-y', `${y.toFixed(2)}px`);
    }
    driftRaf = requestAnimationFrame(tick);
  };
  driftRaf = requestAnimationFrame(tick);
}

function stopDrift() {
  driftRunning = false;
  cancelAnimationFrame(driftRaf);
  for (const cell of cellByN.values()) {
    cell.style.removeProperty('--drift-x');
    cell.style.removeProperty('--drift-y');
  }
}

/* ───── audio (band-aware ambient drone) ─────
 * 3-voice just-intonation major triad — 4:5:6 ratio.
 * TOWNS = root (A2 110Hz), BUILDINGS = major-3rd (C#3 137.5Hz), CONSTRUCTION = perfect-5th (E3 165Hz).
 * Each voice: 2 detuned sawtooths through LPF with slow LFO breathing.
 * Active band's voice swells; others quiet. Toggle ramps master gain 0 ↔ 0.06 over ~0.9s.
 */

const audio = { ctx: null, master: null, voices: null, on: false };

function audioInit() {
  if (audio.ctx) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  audio.ctx = new AC();
  audio.master = audio.ctx.createGain();
  audio.master.gain.value = 0;
  audio.master.connect(audio.ctx.destination);

  const fundamentals = { TOWNS: 110, BUILDINGS: 137.5, CONSTRUCTION: 165 };
  const pans = { TOWNS: -0.35, BUILDINGS: 0, CONSTRUCTION: 0.35 };
  audio.voices = {};
  for (const [band, freq] of Object.entries(fundamentals)) {
    audio.voices[band] = audioCreateVoice(freq, pans[band]);
  }
}

function audioCreateVoice(freq, panVal) {
  const c = audio.ctx;
  const gain = c.createGain();
  gain.gain.value = 0.6;
  gain.connect(audio.master);

  let panNode = null;
  if (c.createStereoPanner) {
    panNode = c.createStereoPanner();
    panNode.pan.value = panVal;
    panNode.connect(gain);
  }

  const lp = c.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = freq * 6;
  lp.Q.value = 0.6;
  lp.connect(panNode || gain);

  const osc1 = c.createOscillator();
  osc1.type = 'sawtooth';
  osc1.frequency.value = freq;
  osc1.detune.value = -3.5;
  osc1.connect(lp);
  osc1.start();

  const osc2 = c.createOscillator();
  osc2.type = 'sawtooth';
  osc2.frequency.value = freq;
  osc2.detune.value = 3.5;
  osc2.connect(lp);
  osc2.start();

  // sub-octave sine for body
  const sub = c.createOscillator();
  sub.type = 'sine';
  sub.frequency.value = freq / 2;
  const subGain = c.createGain();
  subGain.gain.value = 0.25;
  sub.connect(subGain);
  subGain.connect(panNode || gain);
  sub.start();

  // slow LFO on filter cutoff for breathing
  const lfo = c.createOscillator();
  const lfoGain = c.createGain();
  lfo.frequency.value = 0.06 + Math.random() * 0.04;
  lfoGain.gain.value = freq * 1.5;
  lfo.connect(lfoGain);
  lfoGain.connect(lp.frequency);
  lfo.start();

  return { gain };
}

function audioToggle() {
  audioInit();
  if (!audio.ctx) return;
  if (audio.ctx.state === 'suspended') audio.ctx.resume();
  audio.on = !audio.on;
  const t = audio.ctx.currentTime;
  audio.master.gain.cancelScheduledValues(t);
  audio.master.gain.linearRampToValueAtTime(audio.on ? 0.055 : 0, t + 0.9);
  const btn = document.getElementById('atlas-audio-toggle');
  if (btn) btn.classList.toggle('is-on', audio.on);
}

function audioActivate(scale) {
  if (!audio.on || !audio.voices) return;
  const t = audio.ctx.currentTime;
  for (const [band, voice] of Object.entries(audio.voices)) {
    const target = (band === scale) ? 1.0 : 0.32;
    voice.gain.gain.cancelScheduledValues(t);
    voice.gain.gain.linearRampToValueAtTime(target, t + 0.55);
  }
}

function audioDeactivate() {
  if (!audio.on || !audio.voices) return;
  const t = audio.ctx.currentTime;
  for (const voice of Object.values(audio.voices)) {
    voice.gain.gain.cancelScheduledValues(t);
    voice.gain.gain.linearRampToValueAtTime(0.6, t + 0.7);
  }
}

/* ───── footer aphorism ───── */

function startAphorism() {
  const orn = document.querySelector('#atlas-footer .atlas-orn');
  const aph = document.querySelector('#atlas-footer .atlas-aphorism');
  if (!orn || !aph) return;
  orn.textContent = ORNAMENTS[Math.floor(Math.random() * ORNAMENTS.length)];

  const cycle = () => {
    const p = pickAphorismPattern();
    if (!p) return;
    const line = truncate(p.solution || p.problem || '', 70);
    aph.textContent = `“${line}”  · pattern ${p.n}, ${p.name.toLowerCase()}`;
    aph.classList.remove('is-fading');
    void aph.offsetWidth;
    aph.classList.add('is-fading-in');
  };
  cycle();
  if (!reducedMotion) {
    aphorismTimer = setInterval(() => {
      aph.classList.add('is-fading');
      setTimeout(cycle, 1200);
    }, 14000);
  }
}

function pickAphorismPattern() {
  const candidates = patterns.filter(p => (p.solution || '').length > 40 && (p.confidence || 0) >= 1);
  const pool = candidates.length ? candidates : patterns;
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function truncate(s, max) {
  if (!s) return '';
  s = s.replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut) + '…';
}

/* ───── go ───── */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
