// Loads glyphs.json — claude-composed v0 (2026-05-14) mapping each of the 253
// patterns to one or two primitives from the frozen 31-primitive alphabet.
// Inlined into pattern-atlas/index.njk as a JSON script tag so the field render
// can read glyphs client-side without exposing a public /pattern-atlas/glyphs.json URL.
// Returns just the {n: {primary, secondary, layout, rationale}} map.

let data;
try {
  data = require("../pattern-atlas/glyphs.json");
} catch (err) {
  data = { glyphs: {} };
}
module.exports = data.glyphs || data;
