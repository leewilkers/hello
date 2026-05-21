#!/usr/bin/env node
/**
 * Post-build: mirror the entire _site/ tree under _site/preview-<hash>/
 *
 * Each mirrored page:
 *   - Gets the DRAFT banner injected above the nav (unless the source already
 *     has one, e.g. a draft we're substituting in).
 *   - Has all internal-page hrefs rewritten to stay inside the preview prefix.
 *   - If a draft exists for a URL via _data/drafts.js shadows mapping, the
 *     draft's HTML is served at the preview path instead of the live HTML.
 *
 * Assets (css/fonts/img/assets/admin) stay at their root paths — the mirrored
 * pages reference them unchanged.
 */

const fs = require("fs");
const path = require("path");

const SITE_DIR = path.join(__dirname, "..", "_site");
const PREVIEW_PREFIX_PATH = "/preview-7m4q";
const PREVIEW_DIR = path.join(SITE_DIR, PREVIEW_PREFIX_PATH.slice(1));

const ASSET_PREFIXES = ["/css/", "/fonts/", "/img/", "/assets/", "/admin/", "/_pagefind/", "/pattern-atlas/style.css"];
const SKIP_TOPLEVEL = new Set(["_drafts", "preview-7m4q", "admin", "sitemap.xml", "robots.txt", "shelf.xml", "stream.xml", "feed.xml", "img", "assets", "css", "fonts", "_pagefind"]);

function loadDraftsRegistry() {
  delete require.cache[require.resolve("../_data/drafts.js")];
  return require("../_data/drafts.js")();
}

function urlForFile(siteRelPath) {
  // Convert "consulting/index.html" → "/consulting/"
  // Convert "index.html" → "/"
  if (siteRelPath === "index.html") return "/";
  return "/" + siteRelPath.replace(/index\.html$/, "");
}

function isAssetPath(p) {
  return ASSET_PREFIXES.some((prefix) => p.startsWith(prefix));
}

function rewriteHref(href, drafts, draftsReverse) {
  // External, anchor, mailto, tel — leave alone
  if (!href.startsWith("/")) return href;
  // Already in preview — leave alone
  if (href.startsWith(PREVIEW_PREFIX_PATH + "/") || href === PREVIEW_PREFIX_PATH) return href;
  // Asset path — leave alone
  if (isAssetPath(href)) return href;
  // Draft URL → rewrite to preview equivalent of the live URL it shadows
  for (const draftUrl of Object.keys(draftsReverse)) {
    if (href === draftUrl || href === draftUrl.replace(/\/$/, "")) {
      return PREVIEW_PREFIX_PATH + draftsReverse[draftUrl];
    }
  }
  // Internal page path — prefix
  return PREVIEW_PREFIX_PATH + href;
}

const DRAFT_BANNER_HTML = `\n<div class="draft-banner" role="status" aria-label="Draft preview">\n  <span class="draft-banner-label">DRAFT</span>\n  <span class="draft-banner-text">private preview – not live yet</span>\n</div>\n`;

function injectDraftBanner(html) {
  // If banner already present (we're substituting in a draft), skip injection.
  if (html.includes("draft-banner")) return html;
  // Add data-draft="true" to <body> and inject banner immediately after.
  return html.replace(/<body([^>]*)>/, (m, attrs) => {
    return `<body${attrs} data-draft="true">${DRAFT_BANNER_HTML}`;
  });
}

function addNoindexMeta(html) {
  // Ensure preview pages are crawler-invisible even if robots.txt fails.
  if (html.includes('name="robots"')) return html;
  return html.replace(/<head([^>]*)>/, (m, attrs) => {
    return `<head${attrs}>\n  <meta name="robots" content="noindex, nofollow">`;
  });
}

function rewriteHrefsInHtml(html, drafts, draftsReverse) {
  // <a href="/X">, <link href="/Y">, etc. — only href attributes.
  return html.replace(/\bhref="([^"]+)"/g, (match, href) => {
    const rewritten = rewriteHref(href, drafts, draftsReverse);
    return `href="${rewritten}"`;
  });
}

function transformPage(html, drafts, draftsReverse) {
  let out = html;
  out = injectDraftBanner(out);
  out = addNoindexMeta(out);
  out = rewriteHrefsInHtml(out, drafts, draftsReverse);
  return out;
}

function walk(dir, baseDir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(baseDir, fullPath);
    if (entry.isDirectory()) {
      // Skip top-level directories we never want in the mirror
      if (relPath.split(path.sep).length === 1 && SKIP_TOPLEVEL.has(entry.name)) continue;
      walk(fullPath, baseDir, files);
    } else if (entry.isFile() && entry.name === "index.html") {
      files.push(relPath);
    }
  }
  return files;
}

function main() {
  if (!fs.existsSync(SITE_DIR)) {
    console.error(`[preview-mirror] _site/ not found at ${SITE_DIR} — did eleventy run?`);
    process.exit(1);
  }

  const drafts = loadDraftsRegistry();
  // Reverse map: /_drafts/<slug>/ → /<live-url>/
  const draftsReverse = {};
  for (const [liveUrl, draftUrl] of Object.entries(drafts)) {
    draftsReverse[draftUrl] = liveUrl;
  }

  // Clean & recreate preview directory
  fs.rmSync(PREVIEW_DIR, { recursive: true, force: true });
  fs.mkdirSync(PREVIEW_DIR, { recursive: true });

  const pages = walk(SITE_DIR, SITE_DIR);
  let mirrored = 0;
  let substituted = 0;

  for (const relPath of pages) {
    const logicalUrl = urlForFile(relPath);

    // Determine source: if a draft shadows this URL, use the draft's HTML.
    let sourcePath;
    if (drafts[logicalUrl]) {
      // drafts[logicalUrl] is like "/_drafts/consulting-7m4q/" — convert to file path
      const draftFile = path.join(SITE_DIR, drafts[logicalUrl].slice(1), "index.html");
      if (fs.existsSync(draftFile)) {
        sourcePath = draftFile;
        substituted++;
      } else {
        sourcePath = path.join(SITE_DIR, relPath);
      }
    } else {
      sourcePath = path.join(SITE_DIR, relPath);
    }

    const html = fs.readFileSync(sourcePath, "utf8");
    const transformed = transformPage(html, drafts, draftsReverse);

    const outPath = path.join(PREVIEW_DIR, relPath);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, transformed);
    mirrored++;
  }

  console.log(`[preview-mirror] Wrote ${mirrored} pages to ${PREVIEW_PREFIX_PATH}/ (${substituted} substituted with draft content)`);
}

main();
