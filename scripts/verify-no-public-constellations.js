#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const siteDir = path.join(__dirname, "..", "_site");

const forbiddenPaths = [
  "ascii-lab",
  "lepus-lab",
  "constellation-cutout-lab",
  "notes-lab",
  "_drafts/lindy-trees-w8q3",
  "preview-7m4q/ascii-lab",
  "preview-7m4q/lepus-lab",
  "preview-7m4q/constellation-cutout-lab",
  "preview-7m4q/notes-lab",
  "assets/constellations",
  "assets/nasa",
  "assets/js/champion-trees-explorer.js",
  "assets/js/constellations.js",
  "assets/js/narrative-v2.js",
  "assets/js/perception-media-bus.js",
];

const forbiddenMarkers = [
  "constellation-intro",
  "pretty-constellation-field",
  "data-constellation-art",
  "constellation-mode-toggle",
  "CONSTELLATION_CYCLE",
  "ASCII constellation lab",
  "Lepus constellation lab",
  "Constellation cutout lab",
  "Edit constellation note text",
  "Lindy Trees",
  "/ascii-lab/",
  "/lepus-lab/",
  "/constellation-cutout-lab/",
  "/notes-lab/",
  "/_drafts/lindy-trees-w8q3/",
  "/_drafts/projects-q8w2/",
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else if (/\.(?:html|js|xml)$/i.test(entry.name)) files.push(fullPath);
  }
  return files;
}

if (!fs.existsSync(siteDir)) {
  console.error("[public-constellation-check] _site does not exist; run the build first.");
  process.exit(1);
}

const failures = [];

for (const relativePath of forbiddenPaths) {
  if (fs.existsSync(path.join(siteDir, relativePath))) {
    failures.push(`forbidden public path exists: ${relativePath}`);
  }
}

for (const file of walk(siteDir)) {
  const text = fs.readFileSync(file, "utf8");
  for (const marker of forbiddenMarkers) {
    if (text.includes(marker)) {
      failures.push(`${path.relative(siteDir, file)} contains ${JSON.stringify(marker)}`);
    }
  }
}

if (failures.length) {
  console.error("[public-constellation-check] FAILED");
  failures.slice(0, 50).forEach((failure) => console.error(`- ${failure}`));
  if (failures.length > 50) console.error(`- ...and ${failures.length - 50} more`);
  process.exit(1);
}

console.log("[public-constellation-check] PASS: no public constellation or Lindy Trees surfaces found.");
