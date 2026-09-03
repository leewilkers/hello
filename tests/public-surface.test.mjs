import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = path.join(root, "_site");

function readBuilt(relativePath) {
  return readFileSync(path.join(site, relativePath), "utf8");
}

test("the retired tree essay and its private draft are not published", () => {
  assert.equal(existsSync(path.join(site, "consider-the-tree", "index.html")), false);
  assert.equal(existsSync(path.join(site, "_drafts", "consider-the-tree-8k3p", "index.html")), false);
  assert.equal(existsSync(path.join(site, "img", "essay", "consider-the-tree")), false);
});

test("the primary shell does not expose unfinished Stream or cat-light media", () => {
  const home = readBuilt("index.html");
  const primaryNav = home.match(/<nav class="site-nav"[\s\S]*?<\/nav>/)?.[0] ?? "";

  assert.doesNotMatch(primaryNav, /href="\/stream\/?"/i);
  assert.doesNotMatch(home, /Cat-light video source|cat_light(?:_rev)?\.mp4/i);
});

test("the unpublished Stream route is excluded from discovery", () => {
  const stream = readBuilt(path.join("stream", "index.html"));
  const sitemap = readBuilt("sitemap.xml");

  assert.match(stream, /<meta name="robots" content="noindex, nofollow">/i);
  assert.doesNotMatch(sitemap, /\/stream\//i);
  assert.equal(existsSync(path.join(site, "stream.xml")), false);
});

test("Projects is a substantive public page rather than a dust placeholder", () => {
  const projects = readBuilt(path.join("projects", "index.html"));
  const main = projects.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? "";
  const externalLinks = new Set(
    [...main.matchAll(/href="(https?:\/\/[^"#]+)[^"]*"/g)].map((match) => match[1]),
  );

  assert.doesNotMatch(main, /dust-page|PARDON DUST/i);
  assert.match(main, /<h1[^>]*>Selected work<\/h1>/i);
  assert.ok(externalLinks.size >= 6, `expected at least 6 public evidence links, found ${externalLinks.size}`);
});
