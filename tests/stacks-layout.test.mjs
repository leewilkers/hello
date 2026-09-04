import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const template = readFileSync(path.join(root, "shelf.njk"), "utf8");
const css = readFileSync(path.join(root, "css", "style.css"), "utf8");
const homeCss = readFileSync(path.join(root, "css", "home-minimal.css"), "utf8");

test("Roubo artwork belongs to the homepage rather than Stacks", () => {
  assert.doesNotMatch(template, /stacks-roubo|roubo-plate-278-full/);
  assert.match(
    css,
    /\.page-shelf-ornaments \.site-sawyer-motif\s*\{[\s\S]*?display:\s*none/,
  );
  assert.match(
    homeCss,
    /body:has\(\.page-minimal-home\) \.site-page-ornaments\s*\{[\s\S]*?display:\s*block/,
  );
  assert.match(
    homeCss,
    /body:has\(\.page-minimal-home\) \.site-sawyer-motif\s*\{[\s\S]*?right:\s*0/,
  );
  assert.equal(
    existsSync(path.join(root, "img", "ornaments", "two-man-saw-motif-detail-clean.png")),
    true,
  );
});

test("the Stacks intro uses the homepage sans without an art column", () => {
  assert.match(css, /--shelf-intro-sans:\s*-apple-system/);
  assert.doesNotMatch(css, /\.page-shelf \.stacks-roubo\s*\{/);
  assert.ok(
    template.indexOf('class="stacks-headword"') < template.indexOf('class="stacks-meta"'),
    "Stacks heading should precede dictionary metadata in the mobile reading order",
  );
});
