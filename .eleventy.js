const { execFileSync } = require("child_process");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const fs = require("fs");

module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("fonts");
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
      // Pinned items float to the top of their topic, outside alphabetization.
      const pa = ad.pinned ? 0 : 1;
      const pb = bd.pinned ? 0 : 1;
      if (pa !== pb) return pa - pb;
      const sa = surname(ad.author);
      const sb = surname(bd.author);
      if (sa < sb) return -1;
      if (sa > sb) return 1;
      return numericSortValue(a, "order", "sortByAuthor") - numericSortValue(b, "order", "sortByAuthor");
    });
  });

  function normalizeShelfText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function stripShelfBlurbBoilerplate(text, data) {
    let result = normalizeShelfText(text);
    const author = normalizeShelfText(data && data.author);
    if (author) {
      const authorForms = new Set([author]);
      const beforeComma = author.split(",")[0].trim();
      if (beforeComma) authorForms.add(beforeComma);
      const tokens = beforeComma.split(/\s+/).filter(Boolean);
      if (tokens.length) authorForms.add(tokens[tokens.length - 1]);
      authorForms.forEach((name) => {
        result = result.replace(new RegExp(`^${escapeRegExp(name)}(?:'s|')\\s+`, "i"), "");
      });
    }
    result = result.replace(/^\d{4}\s+/, "");
    result = result.replace(/^(?:[a-z&.\s-]{2,35}\s+)?(?:book|essay|article|paper|study|ethnography|account|argument|collection|chapter|website|keynote|novel|survey|biography|monograph)\s+(?:on|about|of|using|showing that|arguing that|examining|tracing|defining|introducing|presenting)\s+/i, "");
    return normalizeShelfText(result);
  }

  function shelfWords(value) {
    const stop = new Set(["the", "and", "for", "with", "that", "this", "from", "into", "about", "after", "what", "when", "where", "while", "whose", "your", "our", "how"]);
    return normalizeShelfText(value).toLowerCase()
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .map((word) => word.replace(/s$/, ""))
      .filter((word) => word.length > 2 && !stop.has(word));
  }

  function repeatsTitle(text, title) {
    const textWords = shelfWords(text);
    if (!textWords.length) return false;
    const titleWords = new Set(shelfWords(title));
    if (!titleWords.size) return false;
    const shared = textWords.filter((word) => titleWords.has(word)).length;
    return shared / textWords.length >= 0.48;
  }

  eleventyConfig.addFilter("shelfHoverVoice", function(data) {
    if (!data || typeof data !== "object") return null;
    const note = normalizeShelfText(data.note);
    if (note && note.length <= 90 && !repeatsTitle(note, data.title)) return { kind: "note", text: note };
    const quote = normalizeShelfText(data.quote);
    if (quote && quote.length <= 90 && !repeatsTitle(quote, data.title)) return { kind: "quote", text: quote };
    const blurb = stripShelfBlurbBoilerplate(data.blurb, data);
    if (!blurb || blurb.length > 72 || repeatsTitle(blurb, data.title)) return null;
    return { kind: "blurb", text: blurb };
  });

  eleventyConfig.addFilter("shelfIdentityYear", function(data) {
    if (!data || typeof data !== "object") return "";
    const candidates = [data.year, data.date, data.published, data.dek];
    for (const value of candidates) {
      const text = normalizeShelfText(value);
      const match = text.match(/\b(1[5-9]\d{2}|20\d{2})\b/);
      if (match) return match[1];
    }
    return "";
  });

  // Map a URL to a representative link label.
  // - If `override` is truthy, use it verbatim (hand-curated wins).
  // - Otherwise infer from host: ".pdf" / monoskop / archive.org → "full source",
  //   publisher domains → publisher name, publication domains → publication name.
  // - Falls back to the bare host minus "www." for unknown hosts.
  // Hosts are stored without leading "www."; lookup strips it before matching.
  const LINK_LABEL_MAP = {
    // Full-source / archives — display by site name, "(PDF)" appended if URL is a PDF
    "monoskop.org": "monoskop",
    "archive.org": "archive.org",
    "web.archive.org": "archive.org",
    "libgen.is": "libgen",
    "libgen.rs": "libgen",
    "arxiv.org": "arxiv",
    "escholarship.org": "escholarship",
    // DOIs and library catalogs
    "doi.org": "DOI",
    "openlibrary.org": "Open Library",
    "en.wikipedia.org": "Wikipedia",
    "wikipedia.org": "Wikipedia",
    // Video
    "youtube.com": "video",
    "youtu.be": "video",
    "vimeo.com": "Vimeo",
    // University presses
    "mitpress.mit.edu": "MIT Press",
    "press.princeton.edu": "Princeton University Press",
    "global.oup.com": "Oxford University Press",
    "academic.oup.com": "Oxford University Press",
    "dukeupress.edu": "Duke University Press",
    "yalebooks.yale.edu": "Yale University Press",
    "ucpress.edu": "UC Press",
    "sup.org": "Stanford University Press",
    "press.jhu.edu": "Johns Hopkins University Press",
    "press.indiana.edu": "Indiana University Press",
    "rutgersuniversitypress.org": "Rutgers University Press",
    "press.uchicago.edu": "University of Chicago Press",
    "hup.harvard.edu": "Harvard University Press",
    "upress.umn.edu": "University of Minnesota Press",
    "cambridge.org": "Cambridge University Press",
    "cup.columbia.edu": "Columbia University Press",
    "uncpress.org": "UNC Press",
    "openhumanitiespress.org": "Open Humanities Press",
    // Trade / commercial publishers
    "routledge.com": "Routledge",
    "penguinrandomhouse.com": "Penguin Random House",
    "hachettebookgroup.com": "Hachette",
    "versobooks.com": "Verso",
    "plutobooks.com": "Pluto Press",
    "urbanomic.com": "Urbanomic",
    "lostartpress.com": "Lost Art Press",
    "us.macmillan.com": "Macmillan",
    "harpercollins.com": "HarperCollins",
    "bloomsbury.com": "Bloomsbury",
    "groveatlantic.com": "Grove Atlantic",
    "simonandschuster.com": "Simon & Schuster",
    "wwnorton.com": "W. W. Norton",
    "pushkinpress.com": "Pushkin Press",
    "godine.com": "Godine",
    "hackettpublishing.com": "Hackett",
    "e-elgar.com": "Edward Elgar",
    "press.stripe.com": "Stripe Press",
    "practicalactionpublishing.com": "Practical Action",
    "africanminds.co.za": "African Minds",
    // Journals / journal aggregators
    "wiley.com": "Wiley",
    "onlinelibrary.wiley.com": "Wiley",
    "link.springer.com": "Springer",
    "sciencedirect.com": "ScienceDirect",
    "nature.com": "Nature",
    "sk.sagepub.com": "Sage Knowledge",
    "journals.plos.org": "PLOS",
    "hbr.org": "HBR",
    // Magazines / publications
    "theparisreview.org": "Paris Review",
    "placesjournal.org": "Places Journal",
    "aeon.co": "Aeon",
    "asteriskmag.com": "Asterisk",
    "theatlantic.com": "The Atlantic",
    "thenewatlantis.com": "The New Atlantis",
    "nybooks.com": "NYRB",
    "nplusonemag.com": "n+1",
    "lrb.co.uk": "LRB",
    "popularmechanics.com": "Popular Mechanics",
    "theguardian.com": "The Guardian",
    "vox.com": "Vox",
    "artforum.com": "Artforum",
    "variety.com": "Variety",
    "quillette.com": "Quillette",
    "astralcodexten.com": "Astral Codex Ten",
    "engelsbergideas.com": "Engelsberg Ideas",
    "e-flux.com": "e-flux",
    "aperture.org": "Aperture",
    "store.aperture.org": "Aperture",
    "letterboxd.com": "Letterboxd",
    // Personal / blog sites where the name is more useful than the host
    "worrydream.com": "Bret Victor",
    "ribbonfarm.com": "Ribbonfarm",
    "robinsloan.com": "Robin Sloan",
    "themarginalian.org": "The Marginalian",
    "theconvivialsociety.substack.com": "The Convivial Society",
    "patternlanguage.com": "patternlanguage.com",
  };

  function linkLabelFromUrl(url) {
    if (!url) return "link";
    let host, pathname;
    try {
      const parsed = new URL(url);
      host = parsed.host.toLowerCase();
      pathname = parsed.pathname || "";
    } catch (e) {
      return "link";
    }
    const stripped = host.replace(/^www\./, "");
    let base = LINK_LABEL_MAP[host] || LINK_LABEL_MAP[stripped];
    if (!base) {
      if (host.endsWith(".substack.com")) {
        const name = stripped.replace(/\.substack\.com$/, "");
        base = name ? name.replace(/-/g, " ") : "Substack";
      } else {
        base = stripped;
      }
    }
    // Append "(PDF)" if the URL points to a PDF.
    if (/\.pdf$/i.test(pathname)) return `${base} (PDF)`;
    return base;
  }

  eleventyConfig.addFilter("linkLabel", function(url, override) {
    if (override && String(override).trim()) return String(override).trim();
    return linkLabelFromUrl(url);
  });

  eleventyConfig.addFilter("toJson", function(value) {
    return JSON.stringify(value)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026");
  });

  // Ignore non-site files
  eleventyConfig.ignores.add("AGENTS.md");
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
