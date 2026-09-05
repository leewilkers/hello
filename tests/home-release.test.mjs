import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = readFileSync(path.join(root, "_includes", "base.njk"), "utf8");
const home = readFileSync(path.join(root, "index.njk"), "utf8");
const css = readFileSync(path.join(root, "css", "home-minimal.css"), "utf8");
const sound = readFileSync(path.join(root, "assets", "js", "theme-switch.js"), "utf8");

test("the header uses the approved four destinations", () => {
  const nav = base.match(/<nav class="site-nav"[\s\S]*?<\/nav>/)?.[0] ?? "";
  assert.match(nav, />home<\/a>[\s\S]*>consulting<\/a>[\s\S]*>stacks<\/a>[\s\S]*>stream<\/a>/);
  assert.doesNotMatch(nav, />projects<\/a>|>about<\/a>/);
  assert.match(nav, /goodneighbor, llc/);
});

test("the restored About keeps the approved background copy", () => {
  assert.match(home, /I started out in biology and ecology, then moved into public health and population ethics\./);
  assert.match(home, /I’m a generalist by specialty and a social scientist by training\./);
  assert.doesNotMatch(home, /id="minimal-background"/);
});

test("Roubo is a homepage-only external link with hover and focus reveal", () => {
  assert.match(base, /class="site-art-note-link"[^>]*href="https:\/\/en\.wikipedia\.org\/wiki\/Andr%C3%A9_Jacob_Roubo"[^>]*target="_blank"/);
  assert.doesNotMatch(base.match(/<div class="site-art-note">[\s\S]*?<\/div>/)?.[0] ?? "", /button|data-art-note-toggle/);
  assert.match(css, /site-art-note:has\(\.site-art-note-link:focus-visible\)/);
});

test("the cat switch flips immediately and retains the selected two-part cue", () => {
  const action = sound.match(/function playCatThenFlip\(\) \{([\s\S]*?)\n  \}/)?.[1] ?? "";
  assert.match(action, /applyThemeFlip\(goingDark\);\s*playThemeCue\(direction\);/);
  assert.match(sound, /const INTERACTION_RESOLVE_MS = 1000;/);
  assert.match(sound, /nightToDay: \{ press: \["D4"\], hit: \["A4", "Cs5"\] \}/);
  assert.match(sound, /dayToNight: \{ press: \["Cs5"\], hit: \["Fs4", "D4"\] \}/);
  assert.match(base, /data-cat-switch/);
  assert.match(base, /cat_light\.mp4/);
});
