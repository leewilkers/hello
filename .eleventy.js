module.exports = function(eleventyConfig) {
  // Pass through CSS
  eleventyConfig.addPassthroughCopy("css");
  
  // Pass through images if any
  eleventyConfig.addPassthroughCopy("img");

  // Pass through fonts
  eleventyConfig.addPassthroughCopy("fonts");

  // Ignore non-site files
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("HOW-TO.md");
  eleventyConfig.ignores.add("CLAUDE.md");
  eleventyConfig.ignores.add("CNAME");
  eleventyConfig.ignores.add(".claude/**");
  eleventyConfig.ignores.add("consulting-draft.md");
  eleventyConfig.ignores.add("node_modules/**");

  // Custom filter to match links against channel queries
  eleventyConfig.addFilter("matchQuery", function(links, query) {
    if (!query || !links) return [];
    
    // Parse simple query syntax: "tag:foo" or "tag:foo OR tag:bar"
    const conditions = query.split(/\s+OR\s+/i).map(c => c.trim());
    
    return links.filter(link => {
      return conditions.some(condition => {
        if (condition.startsWith('tag:')) {
          const tag = condition.replace('tag:', '').toLowerCase();
          return link.tags && link.tags.some(t => t.toLowerCase() === tag);
        }
        return false;
      });
    });
  });
  
  // Date formatting filter
  eleventyConfig.addFilter("formatDate", function(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  });
  
  // Group links by date
  eleventyConfig.addFilter("groupByDate", function(links) {
    const groups = {};
    const now = new Date();
    const today = now.toDateString();
    const yesterday = new Date(now - 86400000).toDateString();
    
    links.forEach(link => {
      const linkDate = new Date(link.created);
      const dateStr = linkDate.toDateString();
      
      let label;
      if (dateStr === today) {
        label = 'Today';
      } else if (dateStr === yesterday) {
        label = 'Yesterday';
      } else {
        label = linkDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
      
      if (!groups[label]) groups[label] = [];
      groups[label].push(link);
    });
    
    return groups;
  });

  // Extract domain from URL
  eleventyConfig.addFilter("domain", function(url) {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  });

  // Limit array
  eleventyConfig.addFilter("limit", function(arr, limit) {
    return arr.slice(0, limit);
  });

  // Get all unique tags from links, sorted by frequency then alpha
  // Filters out boring filing-cabinet tags
  eleventyConfig.addFilter("getAllTags", function(links) {
    const counts = {};
    links.forEach(link => {
      if (link.tags) {
        link.tags.forEach(tag => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
      }
    });

    // Hide these from the tag bar – too generic or internal
    const hidden = new Set([
      'resource', 'guide', 'tool', 'reference', 'list',
      'website', 'pinned', 'currently'
    ]);

    return Object.keys(counts)
      .filter(t => !hidden.has(t))
      .sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));
  });

  // Filter out pinned/currently links (for the chronological stream)
  eleventyConfig.addFilter("rejectPinned", function(links) {
    return links.filter(link => {
      if (!link.tags) return true;
      return !link.tags.includes('pinned') && !link.tags.includes('currently');
    });
  });

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
