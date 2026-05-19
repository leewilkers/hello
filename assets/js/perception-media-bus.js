// perception-media-bus.js
//
// Parallel-bus media playback for rooms that ship vendored audio.
//
// The bus routes to AudioContext.destination *alongside* any other audio
// graph on the page — never *into* the same chain. Practical consequence:
// muting the page's master gain does not mute this bus, and muting this
// bus does not affect the master. Each room can isolate the cosmic /
// recorded layer from any synth layer for an A/B comparison without
// rebuilding its graph.
//
// Extracted 2026-05-15 from constellation-cutout-lab.njk (parallel-bus
// pattern established 2026-05-12 in the cosmic-bed work).
//
// Usage:
//
//   import { createMediaBus } from '/assets/js/perception-media-bus.js';
//
//   const ctx = new (window.AudioContext || window.webkitAudioContext)();
//   const bus = createMediaBus(ctx, {
//     tracks: ['/assets/nasa/audio/symphonies/symphonies_1.mp3', ...],
//     fadeSec: 4.5,
//     loop: true,
//     preload: 'none',          // 'none' | 'metadata' | 'auto'
//   });
//
//   // Caller is responsible for unlocking the AudioContext from a user
//   // gesture (browsers block ctx.resume() until then). After unlock:
//   bus.play();
//   bus.crossfadeTo(2);          // ramp track 0 -> 1 -> 2 over the fade
//   bus.setLevel(0.6);           // 0..1
//   bus.pause();
//
// Notes:
//
// - Tracks load lazily. With preload: 'none' (the default), audio bytes
//   don't fetch until the first play() of a track. Important when shipping
//   ~20MB media files behind an off-by-default toggle.
//
// - crossfadeTo() linearly ramps the outgoing voice to 0 and the incoming
//   voice to 1 over the fade. Other voices stay at 0. The previous voice
//   pauses ~200ms after the ramp completes so its decoder can stop.
//
// - play() / pause() act on the bus gain, not on individual <audio>
//   elements. The individual <audio> elements continue playing through a
//   silenced bus during pause, then naturally idle out. (This is by
//   design: it lets the underlying decoder warm-start on next play.)
//
// - destroy() disconnects the graph and pauses all underlying audio
//   elements. Use when unmounting a room dynamically; for full-page
//   navigation, the browser cleans up.

/**
 * @typedef {Object} MediaBusOptions
 * @property {string[]} tracks               URLs to load as crossfade-able voices.
 * @property {number}   [fadeSec=3.5]        Default crossfade duration (seconds).
 * @property {boolean}  [loop=true]          Whether each voice loops.
 * @property {'none'|'metadata'|'auto'} [preload='none'] HTMLAudioElement preload mode.
 * @property {string}   [crossOrigin='anonymous']        Cross-origin policy on each audio element.
 */

/**
 * @typedef {Object} MediaBus
 * @property {() => void}                    play         Start the bus (ramps level up; resumes the active voice).
 * @property {() => void}                    pause        Stop the bus (ramps level down; pauses voices ~200ms later).
 * @property {(idx: number, fadeSec?: number) => void} crossfadeTo  Switch to track idx (wraps modulo trackCount).
 * @property {(value: number) => void}       setLevel     Set bus output gain (0..1).
 * @property {() => boolean}                 isPlaying    True between play() and pause().
 * @property {() => number}                  activeIndex  Current target track index (-1 before first crossfade).
 * @property {() => number}                  trackCount   Number of loaded tracks.
 * @property {() => void}                    destroy      Disconnect graph and pause underlying audio elements.
 */

/**
 * Create a parallel-bus media player.
 *
 * @param {AudioContext} ctx                 The page's AudioContext.
 * @param {MediaBusOptions} [options]
 * @returns {MediaBus}
 */
export function createMediaBus (ctx, options = {}) {
  const tracks      = Array.isArray(options.tracks) ? options.tracks.slice() : [];
  const defaultFade = (typeof options.fadeSec === 'number') ? options.fadeSec : 3.5;
  const loop        = (options.loop !== false);
  const preload     = options.preload || 'none';
  const crossOrigin = options.crossOrigin || 'anonymous';

  let busGain  = null;     // ctx.GainNode — parallel-bus output; connects directly to ctx.destination
  let voices   = [];       // [{ el, src, gain }] — one per track
  let active   = -1;       // current target track index (post-crossfade)
  let level    = 1.0;      // bus output gain when playing (0..1)
  let playing  = false;    // between play() and pause()

  function ensureGraph () {
    if (busGain) return;
    busGain = ctx.createGain();
    busGain.gain.value = 0;
    busGain.connect(ctx.destination);   // parallel to any master — load-bearing
    voices = tracks.map((url) => {
      const el = new Audio();
      el.crossOrigin = crossOrigin;
      el.preload = preload;
      el.loop = loop;
      el.src = url;
      const src = ctx.createMediaElementSource(el);
      const g = ctx.createGain();
      g.gain.value = 0;
      src.connect(g).connect(busGain);
      return { el, src, gain: g };
    });
  }

  function crossfadeTo (idx, fadeSec) {
    if (!playing) { active = idx; return; }   // park the target; act on next play()
    ensureGraph();
    if (!voices.length) return;
    const len = voices.length;
    const target = ((idx % len) + len) % len; // modulo-with-negative safe
    active = target;
    const fade = (typeof fadeSec === 'number') ? fadeSec : defaultFade;
    const now = ctx.currentTime;
    voices.forEach((v, i) => {
      const want = (i === target) ? 1.0 : 0.0;
      v.gain.gain.cancelScheduledValues(now);
      v.gain.gain.setValueAtTime(v.gain.gain.value, now);
      v.gain.gain.linearRampToValueAtTime(want, now + fade);
      if (want > 0) {
        if (v.el.paused) {
          const p = v.el.play();
          if (p && p.catch) p.catch(() => {});  // swallow autoplay-rejection
        }
      } else {
        // Pause shortly after the gain ramp completes so the decoder idles.
        setTimeout(() => {
          if (v.gain.gain.value < 0.001 && !v.el.paused) v.el.pause();
        }, fade * 1000 + 200);
      }
    });
  }

  function play () {
    ensureGraph();
    if (!busGain) return;
    playing = true;
    const now = ctx.currentTime;
    busGain.gain.cancelScheduledValues(now);
    busGain.gain.setValueAtTime(busGain.gain.value, now);
    busGain.gain.linearRampToValueAtTime(level, now + 2.5);
    if (active < 0) active = 0;
    crossfadeTo(active, 4.0);
  }

  function pause () {
    if (!busGain) return;
    playing = false;
    const now = ctx.currentTime;
    busGain.gain.cancelScheduledValues(now);
    busGain.gain.setValueAtTime(busGain.gain.value, now);
    busGain.gain.linearRampToValueAtTime(0, now + 2.0);
    setTimeout(() => {
      voices.forEach((v) => { if (!v.el.paused) v.el.pause(); });
    }, 2200);
  }

  function setLevel (value) {
    level = Math.max(0, Math.min(1, value));
    if (playing && busGain) {
      const now = ctx.currentTime;
      busGain.gain.cancelScheduledValues(now);
      busGain.gain.setValueAtTime(busGain.gain.value, now);
      busGain.gain.linearRampToValueAtTime(level, now + 0.4);
    }
  }

  function destroy () {
    if (!busGain) return;
    voices.forEach((v) => {
      if (!v.el.paused) v.el.pause();
      try { v.src.disconnect(); } catch (_e) {}
      try { v.gain.disconnect(); } catch (_e) {}
    });
    try { busGain.disconnect(); } catch (_e) {}
    busGain = null;
    voices = [];
    active = -1;
    playing = false;
  }

  return {
    play,
    pause,
    crossfadeTo,
    setLevel,
    isPlaying: () => playing,
    activeIndex: () => active,
    trackCount: () => tracks.length,
    destroy,
  };
}
