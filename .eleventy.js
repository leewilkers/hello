module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("admin");

  // Collection filters
  eleventyConfig.addFilter("where", function(arr, key, value) {
    return (arr || []).filter(item => item.data[key] === value);
  });

  eleventyConfig.addFilter("findImage", function(arr) {
    return (arr || []).find(item => item.data.image);
  });

  eleventyConfig.addFilter("sortBy", function(arr, key) {
    return [...(arr || [])].sort((a, b) => (a.data[key] || 999) - (b.data[key] || 999));
  });

  eleventyConfig.addFilter("sortByDateDesc", function(arr) {
    return [...(arr || [])].sort((a, b) => {
      const da = a.data.date ? new Date(a.data.date).getTime() : 0;
      const db = b.data.date ? new Date(b.data.date).getTime() : 0;
      return db - da;
    });
  });

  // Date filter for stream month headers (handles Date objects and strings)
  eleventyConfig.addFilter("monthYear", function(val) {
    if (!val) return "";
    const d = val instanceof Date ? val : new Date(val);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase();
  });

  // Ignore non-site files
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("HOW-TO.md");
  eleventyConfig.ignores.add("CLAUDE.md");
  eleventyConfig.ignores.add("CNAME");
  eleventyConfig.ignores.add(".claude/**");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("migrate-items.js");

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
