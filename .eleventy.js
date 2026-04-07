module.exports = function(eleventyConfig) {
  // Pass through CSS
  eleventyConfig.addPassthroughCopy("css");
  
  // Pass through images if any
  eleventyConfig.addPassthroughCopy("img");

  // Ignore non-site files
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("HOW-TO.md");
  eleventyConfig.ignores.add("CLAUDE.md");
  eleventyConfig.ignores.add("CNAME");
  eleventyConfig.ignores.add(".claude/**");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("shelf-builder.html");

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
