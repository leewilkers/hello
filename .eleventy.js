const { execFileSync } = require("child_process");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const fs = require("fs");

module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("assets/consulting");
  eleventyConfig.addPassthroughCopy("assets/constellations");
  eleventyConfig.addPassthroughCopy("assets/js");
  eleventyConfig.addPassthroughCopy("assets/nasa");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("pattern-atlas/style.css");
  eleventyConfig.addPassthroughCopy("pattern-atlas/atlas.js");
  // NOTE: patterns.json is NOT passthrough-copied. It contains verbatim
  // Alexander prose extracted from the OUP epub and must stay local-only.
  // The local-only APL wiki (pattern-atlas/index/) consumes it via
  // _data/apl.js server-side. If the future art-version field-render needs
  // the data client-side, inline it into the page template rather than
  // exposing the file as a public URL.
  // Wiki style + helper JS — passthroughs are silent no-ops when the
  // gitignored wiki dir isn't present (production builds).
  eleventyConfig.addPassthroughCopy("pattern-atlas/index/style.css");
  eleventyConfig.addPassthroughCopy("pattern-atlas/index/random.js");
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

  eleventyConfig.addFilter("nonEmptyShelfTopics", function(topics, items) {
    const shelfTopics = new Set(expectCollection(items, "nonEmptyShelfTopics").flatMap((item) => {
      const data = expectData(item, "nonEmptyShelfTopics");
      return data.dest === "shelf" && data.topic ? [data.topic] : [];
    }));
    return (Array.isArray(topics) ? topics : []).filter((topic) => shelfTopics.has(topic));
  });

  eleventyConfig.addFilter("sortBy", function(arr, key) {
    return [...expectCollection(arr, "sortBy")].sort((a, b) => {
      return numericSortValue(a, key, "sortBy") - numericSortValue(b, key, "sortBy");
    });
  });

  function surname(author) {
    if (!author) return "";
    const first = String(author).split(",")[0].trim();
    const tokens = first.split(/\s+/);
    return (tokens[tokens.length - 1] || "").toLowerCase();
  }

  function compareByAuthorThenOrder(a, b, filterName) {
    const ad = expectData(a, filterName);
    const bd = expectData(b, filterName);
    const sa = surname(ad.author);
    const sb = surname(bd.author);
    if (sa < sb) return -1;
    if (sa > sb) return 1;
    return numericSortValue(a, "order", filterName) - numericSortValue(b, "order", filterName);
  }

  // Alphabetical by author's surname. "First Last" -> Last. "A, B" -> last token of A (pre-comma).
  eleventyConfig.addFilter("sortByAuthor", function(arr) {
    return [...expectCollection(arr, "sortByAuthor")].sort((a, b) => {
      const ad = expectData(a, "sortByAuthor");
      const bd = expectData(b, "sortByAuthor");
      // Pinned items float to the top of their topic, outside alphabetization.
      const pa = ad.pinned ? 0 : 1;
      const pb = bd.pinned ? 0 : 1;
      if (pa !== pb) return pa - pb;
      return compareByAuthorThenOrder(a, b, "sortByAuthor");
    });
  });

  eleventyConfig.addFilter("sortForShelf", function(arr) {
    return [...expectCollection(arr, "sortForShelf")].sort((a, b) => {
      const ad = expectData(a, "sortForShelf");
      const bd = expectData(b, "sortForShelf");
      // Pinned still float above the hand-sorted shelf order.
      const pa = ad.pinned ? 0 : 1;
      const pb = bd.pinned ? 0 : 1;
      if (pa !== pb) return pa - pb;
      const oa = numericSortValue(a, "order", "sortForShelf");
      const ob = numericSortValue(b, "order", "sortForShelf");
      if (oa !== ob) return oa - ob;
      return compareByAuthorThenOrder(a, b, "sortForShelf");
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

  // Serialize per-card data for the shelf modal as a JSON string safe to
  // embed in <script type="application/json">. Pre-escapes "</" so the
  // payload can never close its containing script tag, and U+2028/U+2029
  // (which break inline JSON parsing in some older engines).
  eleventyConfig.addFilter("shelfCardJSON", function(data) {
    if (!data || typeof data !== "object") return "{}";
    const payload = {
      title: data.title || "",
      author: data.author || "",
      type: data.type || "",
      topic: data.topic || "",
      dek: data.dek || "",
      blurb: data.blurb || "",
      description: data.description || "",
      description_source: data.description_source || "",
      description_source_url: data.description_source_url || "",
      quote: data.quote || "",
      note: data.note || "",
      image: data.image || "",
      url: data.url || "",
      source_label: data.source_label || "",
      links: Array.isArray(data.links) ? data.links : []
    };
    return JSON.stringify(payload)
      .replace(/<\//g, "<\\/")
      .replace(new RegExp("\u2028", "g"), "\\u2028")
      .replace(new RegExp("\u2029", "g"), "\\u2029");
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

  // -----------------------------------------------------------------
  // APL wiki (pattern-atlas/index/) helpers — gated by the gitignored
  // _data/apl.js. If that data file doesn't exist (production builds),
  // the wiki templates aren't present either, so these helpers just sit
  // idle. Safe to leave wired permanently.
  // -----------------------------------------------------------------

  // Zero-pad to N digits (used for /pattern-atlas/index/001-name/ slugs)
  eleventyConfig.addFilter("padN", function(value, digits) {
    return String(value).padStart(Number(digits) || 3, "0");
  });

  // Alexander's confidence marks: 2 = ★★, 1 = ★, 0 = (none)
  eleventyConfig.addFilter("aplStars", function(n) {
    const v = Number(n) || 0;
    return v >= 2 ? "★★" : v >= 1 ? "★" : "";
  });

  // Scale-band glyph for running heads + index lists
  eleventyConfig.addFilter("aplScaleGlyph", function(scale) {
    if (scale === "TOWNS") return "◯";
    if (scale === "BUILDINGS") return "▢";
    if (scale === "CONSTRUCTION") return "▷";
    return "";
  });

  // Look up a pattern by its `n` (used to render up[] / down[] cross-link
  // chips with the linked pattern's name + confidence beside the number)
  eleventyConfig.addFilter("aplLookup", function(arr, n) {
    if (!Array.isArray(arr)) return null;
    const target = Number(n);
    return arr.find((p) => Number(p.n) === target) || null;
  });

  // First sentence of a problem/solution string for hover-preview tooltips.
  // Caps at ~140 chars; trims trailing whitespace + punctuation runs.
  eleventyConfig.addFilter("aplFirstSentence", function(text) {
    if (!text) return "";
    const t = String(text).trim();
    // First period followed by space/end, fall back to first 140 chars
    const m = t.match(/^([^.!?]+[.!?])(\s|$)/);
    let s = m ? m[1] : t;
    if (s.length > 160) s = s.slice(0, 157).trimEnd() + "…";
    return s;
  });

  // Pre-warm the 252 APL hero images on build, mirroring the shelfCover
  // pre-warm. Skipped silently if _source/images doesn't exist (production).
  const aplHeroMetadataCache = new Map();
  async function generateAplHero(filename) {
    const inputPath = path.join("./pattern-atlas/_source/images", filename);
    if (!fs.existsSync(inputPath)) return null;
    return Image(inputPath, {
      widths: [320, 640, 960],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/pattern-atlas/index/_hero/",
      urlPath: "/pattern-atlas/index/_hero/",
      filenameFormat: function(id, src, width, format) {
        const name = path.basename(src, path.extname(src));
        return `${name}-${width}.${format}`;
      },
    });
  }

  eleventyConfig.on("eleventy.before", async () => {
    const imagesDir = "./pattern-atlas/_source/images";
    if (!fs.existsSync(imagesDir)) return;
    const files = fs.readdirSync(imagesDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
    await Promise.all(files.map(async (file) => {
      try {
        const metadata = await generateAplHero(file);
        if (metadata) aplHeroMetadataCache.set(file, metadata);
      } catch (e) {
        // Skip files Sharp can't parse
      }
    }));
  });

  eleventyConfig.addShortcode("aplHero", function(filename, alt) {
    if (!filename) return "";
    const metadata = aplHeroMetadataCache.get(filename);
    if (!metadata) return "";
    return Image.generateHTML(metadata, {
      alt: alt || "",
      sizes: "(max-width: 700px) 100vw, 38rem",
      loading: "lazy",
      decoding: "async",
    });
  });

  eleventyConfig.addFilter("toJson", function(value) {
    return JSON.stringify(value === undefined ? null : value)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026");
  });

  // Eleventy 3.x reads .gitignore by default; we maintain our own explicit
  // ignore list below instead, so that gitignoring the local-only APL wiki
  // doesn't hide it from local Eleventy builds. The wiki stays out of CI
  // deploys because git itself doesn't ship the files to the build runner.
  eleventyConfig.setUseGitIgnore(false);

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
  // The following used to be gitignored only; explicitly listed now that
  // setUseGitIgnore(false) is in effect (Eleventy 3 default would otherwise
  // honor .gitignore). Keep these in sync with .gitignore.
  eleventyConfig.ignores.add("walk.njk");
  eleventyConfig.ignores.add("synth-lab.njk");
  eleventyConfig.ignores.add("durer-extraction-preview.html");
  eleventyConfig.ignores.add("consulting-router-pass-*.md");
  eleventyConfig.ignores.add("consulting-trim-redline-*.md");
  eleventyConfig.ignores.add("*-draft.md");
  eleventyConfig.ignores.add("pattern-atlas/alphabet.md");
  eleventyConfig.ignores.add("POSITIONING_BRAINSTORM_*.md");
  eleventyConfig.ignores.add("_shelf_expansion_picks_*.md");

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
