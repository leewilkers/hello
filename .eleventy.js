const { execFileSync } = require("child_process");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const fs = require("fs");

module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("google8f11425ab7fc438d.html");

  // First-commit date per file, for RSS pubDate / feed <updated>.
  // Uses execFileSync (no shell) so filenames never get shell-expanded.
  const gitCreatedCache = new Map();
  eleventyConfig.addFilter("gitCreated", function(inputPath) {
    if (!inputPath) return new Date().toISOString();
    if (gitCreatedCache.has(inputPath)) return gitCreatedCache.get(inputPath);
    try {
      const iso = execFileSync(
        "git",
        ["log", "--diff-filter=A", "--follow", "--format=%aI", "-1", "--", inputPath],
        { encoding: "utf8" }
      ).trim();
      const result = iso || new Date().toISOString();
      gitCreatedCache.set(inputPath, result);
      return result;
    } catch (e) {
      return new Date().toISOString();
    }
  });

  eleventyConfig.addFilter("rssDate", function(iso) {
    const d = (!iso || iso === "now") ? new Date() : new Date(iso);
    return d.toUTCString();
  });

  // Nunjucks `slice` splits arrays into N groups, not Array.prototype.slice.
  // `take(n)` gives the first n items, matching intuition.
  eleventyConfig.addFilter("take", function(arr, n) {
    return (Array.isArray(arr) ? arr : []).slice(0, n);
  });

  // Shelf covers: pre-generate WebP + JPEG at 320/480/640 widths before the
  // build starts, stash metadata in a cache, then a sync shortcode reads
  // from the cache. Async shortcodes don't resolve inside Nunjucks macros,
  // which is why we take this two-step approach.
  const coverMetadataCache = new Map();

  async function generateCover(src) {
    const inputPath = src.startsWith("/") ? `.${src}` : src;
    if (!fs.existsSync(inputPath)) return null;
    return Image(inputPath, {
      widths: [320, 480, 640],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/img/covers-gen/",
      urlPath: "/img/covers-gen/",
      filenameFormat: function(id, src, width, format) {
        const name = path.basename(src, path.extname(src));
        return `${name}-${width}.${format}`;
      },
    });
  }

  eleventyConfig.on("eleventy.before", async () => {
    const coversDir = "./img/covers";
    if (!fs.existsSync(coversDir)) return;
    const files = fs.readdirSync(coversDir);
    await Promise.all(files.map(async (file) => {
      const src = `/img/covers/${file}`;
      try {
        const metadata = await generateCover(src);
        if (metadata) coverMetadataCache.set(src, metadata);
      } catch (e) {
        // Skip files Sharp can't parse (e.g., stray non-image files)
      }
    }));
  });

  eleventyConfig.addShortcode("shelfCover", function(src, alt) {
    if (!src) return "";
    const metadata = coverMetadataCache.get(src);
    if (!metadata) return "";
    return Image.generateHTML(metadata, {
      alt: alt || "",
      sizes: "(max-width: 500px) 50vw, (max-width: 980px) 30vw, 16vw",
      loading: "lazy",
      decoding: "async",
    });
  });

  function expectCollection(arr, filterName) {
    if (!Array.isArray(arr)) {
      throw new TypeError(`${filterName} expected an Eleventy collection array`);
    }
    return arr;
  }

  function expectData(item, filterName) {
    if (!item || !item.data) {
      throw new TypeError(`${filterName} expected collection items with a data object`);
    }
    return item.data;
  }

  function numericSortValue(item, key, filterName) {
    const value = expectData(item, filterName)[key];
    if (value === undefined || value === null || value === "") return 999;
    const n = Number(value);
    if (!Number.isFinite(n)) {
      throw new TypeError(`${filterName} expected numeric ${key}; got ${JSON.stringify(value)}`);
    }
    return n;
  }

  // Collection filters
  eleventyConfig.addFilter("where", function(arr, key, value) {
    return expectCollection(arr, "where").filter(item => expectData(item, "where")[key] === value);
  });

  eleventyConfig.addFilter("sortBy", function(arr, key) {
    return [...expectCollection(arr, "sortBy")].sort((a, b) => {
      return numericSortValue(a, key, "sortBy") - numericSortValue(b, key, "sortBy");
    });
  });

  // Alphabetical by author's surname. "First Last" → Last. "A, B" → last token of A (pre-comma).
  eleventyConfig.addFilter("sortByAuthor", function(arr) {
    function surname(author) {
      if (!author) return "";
      const first = String(author).split(",")[0].trim();
      const tokens = first.split(/\s+/);
      return (tokens[tokens.length - 1] || "").toLowerCase();
    }
    return [...expectCollection(arr, "sortByAuthor")].sort((a, b) => {
      const ad = expectData(a, "sortByAuthor");
      const bd = expectData(b, "sortByAuthor");
      const sa = surname(ad.author);
      const sb = surname(bd.author);
      if (sa < sb) return -1;
      if (sa > sb) return 1;
      return numericSortValue(a, "order", "sortByAuthor") - numericSortValue(b, "order", "sortByAuthor");
    });
  });

  // Ignore non-site files
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("HOW-TO.md");
  eleventyConfig.ignores.add("CLAUDE.md");
  eleventyConfig.ignores.add("CNAME");
  eleventyConfig.ignores.add(".claude/**");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("migrate-items.js");
  eleventyConfig.ignores.add("google8f11425ab7fc438d.html");
  eleventyConfig.ignores.add("_og-card.html");
  eleventyConfig.ignores.add("_shelf_expansion_picks_2026-04-12.md");
  eleventyConfig.ignores.add("qa/**");
  eleventyConfig.ignores.add("source_reading/**");
  eleventyConfig.ignores.add("claude_design/**");
  eleventyConfig.ignores.add("scripts/**");
  // Internal handoffs / dry-run reports / agent kickoff prompts — committed for
  // workflow history, but never published. Folder is project-local design process.
  eleventyConfig.ignores.add("prompts/**");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk"
  };
};
