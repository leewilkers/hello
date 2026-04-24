module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("google8f11425ab7fc438d.html");

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
