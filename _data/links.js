const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
  const token = process.env.RAINDROP_TOKEN;
  
  if (!token) {
    console.warn("⚠️  No RAINDROP_TOKEN found. Using sample data.");
    return getSampleData();
  }

  try {
    const url = "https://api.raindrop.io/rest/v1/raindrops/0?perpage=200";
    
    const data = await EleventyFetch(url, {
      duration: "1h",
      type: "json",
      fetchOptions: {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    });

    // TODO: re-enable shelf gate when ready
    // const published = data.items.filter(item =>
    //   item.tags && item.tags.includes("shelf")
    // );

    return data.items.map(item => ({
      id: item._id,
      title: item.title,
      url: item.link,
      source: item.domain,
      note: item.note || null,
      excerpt: item.excerpt || null,
      tags: (item.tags || []).filter(t => !["shelf"].includes(t)),
      created: item.created,
      cover: item.cover || null
    }));

  } catch (error) {
    console.error("Error fetching from Raindrop:", error.message);
    return getSampleData();
  }
};

function getSampleData() {
  const now = Date.now();
  const day = 86400000;
  
  return [
    // CURRENTLY / PINNED (hero section)
    {
      id: 1,
      title: "We Could All Be Archivists",
      url: "https://chasemccoy.com/posts/archivists",
      source: "chasemccoy.com",
      note: '"Our computers should be databases." Why I\'m building this.',
      tags: ["currently", "essay"],
      created: new Date(now).toISOString()
    },
    {
      id: 2,
      title: "The garden and the stream",
      url: "https://hapgood.us/2015/10/17/the-garden-and-the-stream-a-technopastoral/",
      source: "hapgood.us",
      note: "Two ways of organizing knowledge. Foundational.",
      tags: ["pinned", "essay"],
      created: new Date(now - day).toISOString()
    },
    {
      id: 3,
      title: "Incommensurability in global health priority-setting",
      url: "#",
      source: "working paper",
      note: "The thing I keep coming back to.",
      tags: ["currently", "globalhealth", "ethics"],
      created: new Date(now - day).toISOString()
    },

    // GLOBAL HEALTH
    {
      id: 10,
      title: "Global burden of bacterial AMR in 2019",
      url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(21)02724-0/fulltext",
      source: "The Lancet",
      note: "39 million deaths. The numbers.",
      tags: ["globalhealth", "amr"],
      created: new Date(now - day).toISOString()
    },
    {
      id: 11,
      title: "Ethics of mass drug administration",
      url: "https://gh.bmj.com/content/5/6/e002312",
      source: "BMJ Global Health",
      note: "For the Gates deck.",
      tags: ["globalhealth", "ethics"],
      created: new Date(now - day * 2).toISOString()
    },
    {
      id: 12,
      title: "Deliberative engagement in health priority-setting",
      url: "#",
      source: "Health Policy & Planning",
      tags: ["globalhealth", "ethics"],
      created: new Date(now - day * 3).toISOString()
    },
    {
      id: 13,
      title: "NTD roadmap 2030",
      url: "#",
      source: "WHO",
      tags: ["globalhealth", "ntd", "policy"],
      created: new Date(now - day * 4).toISOString()
    },
    {
      id: 14,
      title: "Pluralism and incommensurability",
      url: "#",
      source: "Philosophy & Public Affairs",
      tags: ["globalhealth", "ethics"],
      created: new Date(now - day * 5).toISOString()
    },

    // WRITING
    {
      id: 20,
      title: "On bullshit",
      url: "#",
      source: "Princeton",
      note: "Frankfurt. The classic.",
      tags: ["writing", "essay"],
      created: new Date(now - day * 2).toISOString()
    },
    {
      id: 21,
      title: "Ambient Internet",
      url: "https://chasemccoy.com/posts/ambient-internet",
      source: "chasemccoy.com",
      tags: ["writing", "essay"],
      created: new Date(now - day * 3).toISOString()
    },
    {
      id: 22,
      title: "How blogs shaped the web",
      url: "https://chasemccoy.com/posts/how-blogs-shaped-the-web",
      source: "chasemccoy.com",
      tags: ["writing", "essay"],
      created: new Date(now - day * 4).toISOString()
    },
    {
      id: 23,
      title: "A Big Little Idea Called Legibility",
      url: "https://www.ribbonfarm.com/2010/07/26/a-big-little-idea-called-legibility/",
      source: "ribbonfarm.com",
      note: "Venkat on Seeing Like a State.",
      tags: ["writing", "essay", "longform"],
      created: new Date(now - day * 5).toISOString()
    },
    {
      id: 24,
      title: "The Tyranny of Structurelessness",
      url: "#",
      source: "Jo Freeman",
      tags: ["writing", "essay"],
      created: new Date(now - day * 6).toISOString()
    },

    // LISTS & GUIDES
    {
      id: 30,
      title: "Awesome indie web",
      url: "#",
      source: "github.com",
      note: "Curated list of indieweb resources.",
      tags: ["list", "guide"],
      created: new Date(now - day).toISOString()
    },
    {
      id: 31,
      title: "href.cool",
      url: "https://href.cool",
      source: "kickscondor.com",
      note: "Hand-curated web directory.",
      tags: ["list", "reference"],
      created: new Date(now - day * 2).toISOString()
    },
    {
      id: 32,
      title: "Research quality checklist",
      url: "#",
      source: "internal doc",
      tags: ["guide", "howto"],
      created: new Date(now - day * 3).toISOString()
    },
    {
      id: 33,
      title: "Grounded theory in practice",
      url: "#",
      source: "SAGE",
      tags: ["guide", "reference"],
      created: new Date(now - day * 4).toISOString()
    },

    // DESIGN & COLLABORATION
    {
      id: 40,
      title: "XXIIVV",
      url: "https://wiki.xxiivv.com",
      source: "wiki.xxiivv.com",
      note: "Devine's lifetime wiki. Art object as archive.",
      tags: ["design"],
      created: new Date(now - day).toISOString()
    },
    {
      id: 41,
      title: "Liberating Structures",
      url: "https://www.liberatingstructures.com/",
      source: "liberatingstructures.com",
      note: "Microstructures for collaboration.",
      tags: ["collaboration", "facilitation"],
      created: new Date(now - day * 2).toISOString()
    },
    {
      id: 42,
      title: "Human-centered design toolkit",
      url: "#",
      source: "IDEO",
      tags: ["design", "hcd"],
      created: new Date(now - day * 3).toISOString()
    },
    {
      id: 43,
      title: "Diagram Website",
      url: "https://diagram.website",
      source: "diagram.website",
      note: "What even is this? I love it.",
      tags: ["design"],
      created: new Date(now).toISOString()
    },

    // MORE MISC (for stream)
    {
      id: 50,
      title: "Miso Tahini Dressing",
      url: "https://smittenkitchen.com/2021/01/miso-tahini-dressing/",
      source: "smittenkitchen.com",
      note: "Weeknight easy.",
      tags: ["recipe"],
      created: new Date(now).toISOString()
    },
    {
      id: 51,
      title: "Eleventy",
      url: "https://www.11ty.dev",
      source: "11ty.dev",
      tags: ["tool"],
      created: new Date(now - day).toISOString()
    },
    {
      id: 52,
      title: "Marginalia Search",
      url: "https://search.marginalia.nu",
      source: "marginalia.nu",
      tags: ["tool"],
      created: new Date(now - day * 2).toISOString()
    },
    {
      id: 53,
      title: "Same Energy",
      url: "https://same.energy",
      source: "same.energy",
      tags: ["tool"],
      created: new Date(now - day * 3).toISOString()
    }
  ];
}
