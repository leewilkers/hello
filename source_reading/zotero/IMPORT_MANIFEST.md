# Zotero Import Manifest

> Maps each website item to Zotero's `create_item` schema. Ready for batch import via MCP.
>
> Field mapping: author → creators, title → title, type → itemType, url → url, dek → publisher + date, note → abstractNote.

---

## Shelf – Craft

### 1. Ivan Illich – Tools for Conviviality
```json
{
  "itemType": "book",
  "title": "Tools for Conviviality",
  "creators": [{"creatorType": "author", "firstName": "Ivan", "lastName": "Illich"}],
  "date": "1973",
  "publisher": "Harper & Row",
  "url": "https://archive.org/details/illich-conviviality",
  "tags": ["lane:craft", "dest:shelf", "tier:T1", "lineage:maintenance", "@personal-website"]
}
```

### 2. Bret Victor – Magic Ink
```json
{
  "itemType": "blogPost",
  "title": "Magic Ink: Information Software and the Graphical Interface",
  "creators": [{"creatorType": "author", "firstName": "Bret", "lastName": "Victor"}],
  "date": "2006",
  "blogTitle": "worrydream.com",
  "url": "https://worrydream.com/MagicInk/",
  "tags": ["lane:craft", "dest:shelf", "tier:T1", "lineage:web-design", "@personal-website"]
}
```

### 3. Bret Victor – Up and Down the Ladder of Abstraction
```json
{
  "itemType": "blogPost",
  "title": "Up and Down the Ladder of Abstraction",
  "creators": [{"creatorType": "author", "firstName": "Bret", "lastName": "Victor"}],
  "date": "2011",
  "blogTitle": "worrydream.com",
  "url": "https://worrydream.com/LadderOfAbstraction/",
  "tags": ["lane:craft", "dest:shelf", "tier:T1", "lineage:web-design", "@personal-website"]
}
```

### 4. Christopher Alexander – The Timeless Way of Building
```json
{
  "itemType": "book",
  "title": "The Timeless Way of Building",
  "creators": [{"creatorType": "author", "firstName": "Christopher", "lastName": "Alexander"}],
  "date": "1979",
  "publisher": "Oxford University Press",
  "url": "https://www.patternlanguage.com/bookstore/timeless-way-of-building.html",
  "abstractNote": "the quality without a name",
  "tags": ["lane:craft", "dest:shelf", "tier:T3", "lineage:making", "@personal-website"]
}
```

### 5. Marshall McLuhan & Quentin Fiore – The Medium Is the Massage
```json
{
  "itemType": "book",
  "title": "The Medium Is the Massage: An Inventory of Effects",
  "creators": [
    {"creatorType": "author", "firstName": "Marshall", "lastName": "McLuhan"},
    {"creatorType": "author", "firstName": "Quentin", "lastName": "Fiore"}
  ],
  "date": "1967",
  "publisher": "Bantam Books",
  "url": "https://archive.org/details/pdfy-vNiFct6b-L5ucJEa",
  "abstractNote": "not a typo",
  "tags": ["lane:craft", "dest:shelf", "tier:T1", "lineage:seeing", "@personal-website"]
}
```

### 6. Chase McCoy – We Could All Be Archivists
```json
{
  "itemType": "blogPost",
  "title": "We Could All Be Archivists",
  "creators": [{"creatorType": "author", "firstName": "Chase", "lastName": "McCoy"}],
  "date": "2025",
  "blogTitle": "chsmc.org",
  "url": "https://chsmc.org/2025/01/archivists/",
  "abstractNote": "the internet isn't written in ink",
  "tags": ["lane:craft", "dest:shelf", "tier:T1", "@personal-website"]
}
```

### 7. Richard Sennett – The Craftsman
```json
{
  "itemType": "book",
  "title": "The Craftsman",
  "creators": [{"creatorType": "author", "firstName": "Richard", "lastName": "Sennett"}],
  "date": "2008",
  "publisher": "Yale University Press",
  "url": "https://yalebooks.yale.edu/book/9780300151190/the-craftsman/",
  "abstractNote": "the hand knows",
  "tags": ["lane:craft", "dest:shelf", "tier:T3", "lineage:making", "@personal-website"]
}
```

### 8. Christopher Schwarz – The Anarchist's Tool Chest
```json
{
  "itemType": "book",
  "title": "The Anarchist's Tool Chest",
  "creators": [{"creatorType": "author", "firstName": "Christopher", "lastName": "Schwarz"}],
  "date": "2011",
  "publisher": "Lost Art Press",
  "url": "https://lostartpress.com/products/the-anarchists-tool-chest",
  "abstractNote": "build the chest first",
  "tags": ["lane:craft", "dest:shelf", "tier:T3", "lineage:making", "@personal-website"]
}
```

### 9. Craig Mod – Fast Software, the Best Software
```json
{
  "itemType": "blogPost",
  "title": "Fast Software, the Best Software",
  "creators": [{"creatorType": "author", "firstName": "Craig", "lastName": "Mod"}],
  "blogTitle": "craigmod.com",
  "url": "https://craigmod.com/essays/fast_software/",
  "abstractNote": "the most valuable, least valued asset",
  "tags": ["lane:craft", "dest:shelf", "tier:T1", "lineage:web-design", "@personal-website"]
}
```

### 10. Peter Korn – Why We Make Things and Why It Matters
```json
{
  "itemType": "book",
  "title": "Why We Make Things and Why It Matters: The Education of a Craftsman",
  "creators": [{"creatorType": "author", "firstName": "Peter", "lastName": "Korn"}],
  "date": "2013",
  "publisher": "David R. Godine",
  "url": "https://godine.com/products/why-we-make-things-and-why-it-matters",
  "abstractNote": "in the workshop, wishing won't make it so",
  "tags": ["lane:craft", "dest:shelf", "tier:T3", "lineage:making", "@personal-website"]
}
```

### 11. Don Norman – The Design of Everyday Things
```json
{
  "itemType": "book",
  "title": "The Design of Everyday Things",
  "creators": [{"creatorType": "author", "firstName": "Don", "lastName": "Norman"}],
  "date": "1988",
  "publisher": "Basic Books",
  "url": "https://jnd.org/books/the-design-of-everyday-things-revised-and-expanded-edition/",
  "abstractNote": "why doors need pull/push signs",
  "tags": ["lane:craft", "dest:shelf", "tier:T3", "lineage:web-design", "@personal-website"]
}
```

### 12. Frank Chimero – The Web's Grain
```json
{
  "itemType": "blogPost",
  "title": "The Web's Grain",
  "creators": [{"creatorType": "author", "firstName": "Frank", "lastName": "Chimero"}],
  "date": "2015",
  "blogTitle": "frankchimero.com",
  "url": "https://frankchimero.com/blog/2015/the-webs-grain/",
  "tags": ["lane:craft", "dest:shelf", "tier:T1", "lineage:web-design", "@personal-website"]
}
```

### 13. Michael Polanyi – The Tacit Dimension
```json
{
  "itemType": "book",
  "title": "The Tacit Dimension",
  "creators": [{"creatorType": "author", "firstName": "Michael", "lastName": "Polanyi"}],
  "date": "1966",
  "publisher": "Doubleday",
  "url": "https://monoskop.org/images/1/11/Polanyi_Michael_The_Tacit_Dimension.pdf",
  "abstractNote": "we know more than we can tell",
  "tags": ["lane:craft", "dest:shelf", "tier:T1", "lineage:making", "@personal-website"]
}
```

### 14. Robin Sloan – Fish
```json
{
  "itemType": "webpage",
  "title": "Fish",
  "creators": [{"creatorType": "author", "firstName": "Robin", "lastName": "Sloan"}],
  "websiteTitle": "robinsloan.com",
  "url": "https://www.robinsloan.com/fish/",
  "abstractNote": "you read it by tapping",
  "tags": ["lane:craft", "dest:shelf", "tier:T1", "@personal-website"]
}
```

### 15. Tim Ingold – Making
```json
{
  "itemType": "book",
  "title": "Making: Anthropology, Archaeology, Art and Architecture",
  "creators": [{"creatorType": "author", "firstName": "Tim", "lastName": "Ingold"}],
  "date": "2013",
  "publisher": "Routledge",
  "url": "https://www.routledge.com/Making-Anthropology-Archaeology-Art-and-Architecture/Ingold/p/book/9780415567237",
  "abstractNote": "finding the grain",
  "tags": ["lane:craft", "dest:shelf", "tier:T3", "lineage:making", "@personal-website"]
}
```

### 16. Stewart Brand – How Buildings Learn
```json
{
  "itemType": "book",
  "title": "How Buildings Learn: What Happens After They're Built",
  "creators": [{"creatorType": "author", "firstName": "Stewart", "lastName": "Brand"}],
  "date": "1994",
  "publisher": "Viking",
  "url": "https://www.youtube.com/watch?v=maTkAcDbrEY",
  "abstractNote": "shearing layers",
  "tags": ["lane:craft", "dest:shelf", "tier:T2", "@personal-website"]
}
```

### 17. Sara Hendren – What Can a Body Do?
```json
{
  "itemType": "book",
  "title": "What Can a Body Do? How We Meet the Built World",
  "creators": [{"creatorType": "author", "firstName": "Sara", "lastName": "Hendren"}],
  "date": "2020",
  "publisher": "Riverhead Books",
  "url": "https://www.penguinrandomhouse.com/books/561049/what-can-a-body-do-by-sara-hendren/",
  "abstractNote": "all technology is assistive technology",
  "tags": ["lane:craft", "dest:shelf", "tier:T3", "lineage:web-design", "@personal-website"]
}
```

### 18. Daniel Shiffman – The Nature of Code
```json
{
  "itemType": "book",
  "title": "The Nature of Code: Simulating Natural Systems",
  "creators": [{"creatorType": "author", "firstName": "Daniel", "lastName": "Shiffman"}],
  "date": "2024",
  "publisher": "No Starch Press",
  "url": "https://natureofcode.com",
  "abstractNote": "flocking, forces, fractals",
  "tags": ["lane:craft", "dest:shelf", "tier:T1", "@personal-website"]
}
```

---

## Shelf – Perception

### 19. Marshall McLuhan – Understanding Media
```json
{
  "itemType": "book",
  "title": "Understanding Media: The Extensions of Man",
  "creators": [{"creatorType": "author", "firstName": "Marshall", "lastName": "McLuhan"}],
  "date": "1964",
  "publisher": "McGraw-Hill",
  "url": "https://archive.org/details/understandingmed0000mclu",
  "tags": ["lane:perception", "dest:shelf", "tier:T2", "lineage:seeing", "@personal-website"]
}
```

### 20. Venkat Rao – A Big Little Idea Called Legibility
```json
{
  "itemType": "blogPost",
  "title": "A Big Little Idea Called Legibility",
  "creators": [{"creatorType": "author", "firstName": "Venkat", "lastName": "Rao"}],
  "date": "2010",
  "blogTitle": "Ribbonfarm",
  "url": "https://www.ribbonfarm.com/2010/07/26/a-big-little-idea-called-legibility/",
  "abstractNote": "blogosphere-era take on Seeing Like a State",
  "tags": ["lane:perception", "dest:shelf", "tier:T1", "@personal-website"]
}
```

### 21. Venkat Rao – How to Draw and Judge Quadrant Diagrams
```json
{
  "itemType": "blogPost",
  "title": "How to Draw and Judge Quadrant Diagrams",
  "creators": [{"creatorType": "author", "firstName": "Venkat", "lastName": "Rao"}],
  "date": "2009",
  "blogTitle": "Ribbonfarm",
  "url": "https://www.ribbonfarm.com/2009/04/20/how-to-draw-and-judge-quadrant-diagrams/",
  "abstractNote": "2x2s – loved by postrats & epidemiologists alike",
  "tags": ["lane:perception", "dest:shelf", "tier:T1", "@personal-website"]
}
```

### 22. Bent Flyvbjerg – Making Social Science Matter
```json
{
  "itemType": "book",
  "title": "Making Social Science Matter: Why Social Inquiry Fails and How It Can Succeed Again",
  "creators": [{"creatorType": "author", "firstName": "Bent", "lastName": "Flyvbjerg"}],
  "date": "2001",
  "publisher": "Cambridge University Press",
  "url": "https://en.wikipedia.org/wiki/Making_Social_Science_Matter",
  "abstractNote": "the case against physics envy",
  "tags": ["lane:perception", "dest:shelf", "tier:T3", "lineage:seeing", "@personal-website"]
}
```

### 23. C. Wright Mills – The Sociological Imagination
```json
{
  "itemType": "book",
  "title": "The Sociological Imagination",
  "creators": [{"creatorType": "author", "firstName": "C. Wright", "lastName": "Mills"}],
  "date": "1959",
  "publisher": "Oxford University Press",
  "url": "https://www.miguelangelmartinez.net/IMG/pdf/1959_Mills_on_intellctual_craftmanship.pdf",
  "abstractNote": "personal troubles as public issues",
  "tags": ["lane:perception", "dest:shelf", "tier:T2", "lineage:seeing", "@personal-website"]
}
```

### 24. John Berger – Ways of Seeing
```json
{
  "itemType": "book",
  "title": "Ways of Seeing",
  "creators": [{"creatorType": "author", "firstName": "John", "lastName": "Berger"}],
  "date": "1972",
  "publisher": "Penguin Books",
  "url": "https://archive.org/details/WaysofSeeing",
  "abstractNote": "seeing comes before words",
  "tags": ["lane:perception", "dest:shelf", "tier:T1", "lineage:seeing", "@personal-website"]
}
```

### 25. John Law – After Method
```json
{
  "itemType": "book",
  "title": "After Method: Mess in Social Science Research",
  "creators": [{"creatorType": "author", "firstName": "John", "lastName": "Law"}],
  "date": "2004",
  "publisher": "Routledge",
  "url": "https://www.routledge.com/After-Method-Mess-in-Social-Science-Research/Law/p/book/9780415341752",
  "tags": ["lane:perception", "dest:shelf", "tier:T3", "lineage:seeing", "@personal-website"]
}
```

### 26. Frans de Waal – Primates and Philosophers
```json
{
  "itemType": "book",
  "title": "Primates and Philosophers: How Morality Evolved",
  "creators": [{"creatorType": "author", "firstName": "Frans", "lastName": "de Waal"}],
  "date": "2006",
  "publisher": "Princeton University Press",
  "url": "https://press.princeton.edu/books/paperback/9780691169163/primates-and-philosophers",
  "abstractNote": "against veneer theory",
  "tags": ["lane:perception", "dest:shelf", "tier:T3", "@personal-website"]
}
```

### 27. Christopher Pinney & Nicolas Peterson – Photography's Other Histories
```json
{
  "itemType": "book",
  "title": "Photography's Other Histories",
  "creators": [
    {"creatorType": "editor", "firstName": "Christopher", "lastName": "Pinney"},
    {"creatorType": "editor", "firstName": "Nicolas", "lastName": "Peterson"}
  ],
  "date": "2003",
  "publisher": "Duke University Press",
  "url": "https://dukeupress.edu/photographys-other-histories",
  "abstractNote": "photography's \"disavowed\" history",
  "tags": ["lane:perception", "dest:shelf", "tier:T3", "lineage:seeing", "@personal-website"]
}
```

### 28. Benjamín Labatut – When We Cease to Understand the World
```json
{
  "itemType": "book",
  "title": "When We Cease to Understand the World",
  "creators": [{"creatorType": "author", "firstName": "Benjamín", "lastName": "Labatut"}],
  "date": "2020",
  "publisher": "Pushkin Press",
  "url": "https://en.wikipedia.org/wiki/When_We_Cease_to_Understand_the_World",
  "abstractNote": "not a soul who gets it",
  "tags": ["lane:perception", "dest:shelf", "tier:T3", "@personal-website"]
}
```

---

## Shelf – Technology

### 29. Ursula Franklin – The Real World of Technology
```json
{
  "itemType": "book",
  "title": "The Real World of Technology",
  "creators": [{"creatorType": "author", "firstName": "Ursula", "lastName": "Franklin"}],
  "date": "1989",
  "publisher": "CBC Massey Lectures / Anansi",
  "url": "https://monoskop.org/images/5/58/Franklin_Ursula_The_Real_World_of_Technology_1990.pdf",
  "abstractNote": "holistic vs prescriptive technologies",
  "tags": ["lane:technology", "dest:shelf", "tier:T1", "lineage:maintenance", "@personal-website"]
}
```

### 30. Lewis Mumford – Technics and Civilization
```json
{
  "itemType": "book",
  "title": "Technics and Civilization",
  "creators": [{"creatorType": "author", "firstName": "Lewis", "lastName": "Mumford"}],
  "date": "1934",
  "publisher": "Harcourt, Brace and Company",
  "url": "https://archive.org/details/in.ernet.dli.2015.49974",
  "abstractNote": "the clock, not the steam engine",
  "tags": ["lane:technology", "dest:shelf", "tier:T1", "@personal-website"]
}
```

### 31. Russell & Vinsel – Hail the Maintainers
```json
{
  "itemType": "blogPost",
  "title": "Hail the Maintainers",
  "creators": [
    {"creatorType": "author", "firstName": "Andrew", "lastName": "Russell"},
    {"creatorType": "author", "firstName": "Lee", "lastName": "Vinsel"}
  ],
  "date": "2016",
  "blogTitle": "Aeon",
  "url": "https://aeon.co/essays/innovation-is-overvalued-maintenance-often-matters-more",
  "abstractNote": "maintainers > innovators",
  "tags": ["lane:technology", "dest:shelf", "tier:T1", "lineage:maintenance", "@personal-website"]
}
```

### 32. Shannon Mattern – Maintenance and Care
```json
{
  "itemType": "journalArticle",
  "title": "Maintenance and Care",
  "creators": [{"creatorType": "author", "firstName": "Shannon", "lastName": "Mattern"}],
  "date": "2018",
  "publicationTitle": "Places Journal",
  "url": "https://placesjournal.org/article/maintenance-and-care/",
  "abstractNote": "not every road should be repaired",
  "tags": ["lane:technology", "dest:shelf", "tier:T1", "lineage:maintenance", "@personal-website"]
}
```

### 33. Shannon Mattern – Step by Step
```json
{
  "itemType": "journalArticle",
  "title": "Step by Step",
  "creators": [{"creatorType": "author", "firstName": "Shannon", "lastName": "Mattern"}],
  "date": "2024",
  "publicationTitle": "Places Journal",
  "url": "https://placesjournal.org/article/step-by-step-repair-manuals-political-ecology/",
  "abstractNote": "who gets to fix what",
  "tags": ["lane:technology", "dest:shelf", "tier:T1", "lineage:maintenance", "@personal-website"]
}
```

### 34. Alan Jacobs – From Tech Critique to Ways of Living
```json
{
  "itemType": "journalArticle",
  "title": "From Tech Critique to Ways of Living",
  "creators": [{"creatorType": "author", "firstName": "Alan", "lastName": "Jacobs"}],
  "date": "2021",
  "publicationTitle": "The New Atlantis",
  "url": "https://www.thenewatlantis.com/publications/from-tech-critique-to-ways-of-living",
  "abstractNote": "Neil Postman was right. So what?",
  "tags": ["lane:technology", "dest:shelf", "tier:T1", "@personal-website"]
}
```

### 35. Wendell Berry – Why I Am Not Going to Buy a Computer
```json
{
  "itemType": "magazineArticle",
  "title": "Why I Am Not Going to Buy a Computer",
  "creators": [{"creatorType": "author", "firstName": "Wendell", "lastName": "Berry"}],
  "date": "1987",
  "publicationTitle": "Harper's Magazine",
  "url": "https://classes.matthewjbrown.net/teaching-files/philtech/berry-computer.pdf",
  "abstractNote": "exactly what it sounds like",
  "tags": ["lane:technology", "dest:shelf", "tier:T1", "@personal-website"]
}
```

### 36. Lee Vinsel & Andrew Russell – The Innovation Delusion
```json
{
  "itemType": "book",
  "title": "The Innovation Delusion: How Our Obsession with the New Has Disrupted the Work That Matters Most",
  "creators": [
    {"creatorType": "author", "firstName": "Lee", "lastName": "Vinsel"},
    {"creatorType": "author", "firstName": "Andrew", "lastName": "Russell"}
  ],
  "date": "2020",
  "publisher": "Currency",
  "url": "https://www.penguinrandomhouse.com/books/576816/the-innovation-delusion-by-lee-vinsel-and-andrew-l-russell/",
  "abstractNote": "book-length Hail the Maintainers",
  "tags": ["lane:technology", "dest:shelf", "tier:T3", "lineage:maintenance", "@personal-website"]
}
```

### 37. Stafford Beer – Designing Freedom
```json
{
  "itemType": "book",
  "title": "Designing Freedom",
  "creators": [{"creatorType": "author", "firstName": "Stafford", "lastName": "Beer"}],
  "date": "1973",
  "publisher": "CBC Massey Lectures / Anansi",
  "url": "https://monoskop.org/images/e/e3/Beer_Stafford_Designing_Freedom.pdf",
  "tags": ["lane:technology", "dest:shelf", "tier:T1", "@personal-website"]
}
```

### 38. Wendell Berry – The Unsettling of America
```json
{
  "itemType": "book",
  "title": "The Unsettling of America: Culture and Agriculture",
  "creators": [{"creatorType": "author", "firstName": "Wendell", "lastName": "Berry"}],
  "date": "1977",
  "publisher": "Sierra Club Books",
  "url": "https://archive.org/details/wendell-berry-america-culture-agriculture",
  "abstractNote": "exploiter vs. nurturer",
  "tags": ["lane:technology", "dest:shelf", "tier:T1", "@personal-website"]
}
```

---

## Shelf – Intervention

### 39. Robert McLean & John Gargani – Scaling Impact
```json
{
  "itemType": "book",
  "title": "Scaling Impact: Innovation for the Public Good",
  "creators": [
    {"creatorType": "author", "firstName": "Robert", "lastName": "McLean"},
    {"creatorType": "author", "firstName": "John", "lastName": "Gargani"}
  ],
  "date": "2019",
  "publisher": "Routledge/IDRC",
  "url": "https://idl-bnc-idrc.dspacedirect.org/bitstream/handle/10625/57605/Scaling%20impact.pdf?sequence=2",
  "abstractNote": "the \"science\" of scaling",
  "tags": ["lane:intervention", "dest:shelf", "tier:T1", "@personal-website"]
}
```

### 40. Donald Sull – Why Good Companies Go Bad
```json
{
  "itemType": "journalArticle",
  "title": "Why Good Companies Go Bad",
  "creators": [{"creatorType": "author", "firstName": "Donald", "lastName": "Sull"}],
  "date": "1999",
  "publicationTitle": "Harvard Business Review",
  "url": "https://hbr.org/1999/07/why-good-companies-go-bad",
  "abstractNote": "active inertia",
  "tags": ["lane:intervention", "dest:shelf", "tier:T2", "@personal-website"]
}
```

### 41. Solomon Benatar – Moral Imagination
```json
{
  "itemType": "journalArticle",
  "title": "Moral Imagination: The Missing Component in Global Health",
  "creators": [{"creatorType": "author", "firstName": "Solomon", "lastName": "Benatar"}],
  "date": "2005",
  "publicationTitle": "PLoS Medicine",
  "url": "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0020400",
  "abstractNote": "our moral imagination is dulled",
  "tags": ["lane:intervention", "dest:shelf", "tier:T1", "lineage:moral-imagination", "@personal-website"]
}
```

### 42. Violina P. Rindova & Luis L. Martins – Moral Imagination
```json
{
  "itemType": "journalArticle",
  "title": "Moral Imagination, the Collective Desirable, and Strategic Purpose",
  "creators": [
    {"creatorType": "author", "firstName": "Violina P.", "lastName": "Rindova"},
    {"creatorType": "author", "firstName": "Luis L.", "lastName": "Martins"}
  ],
  "date": "2023",
  "publicationTitle": "Strategy Science",
  "url": "https://pubsonline.informs.org/doi/10.1287/stsc.2023.0190",
  "abstractNote": "the collective desirable",
  "tags": ["lane:intervention", "dest:shelf", "tier:T2", "lineage:moral-imagination", "@personal-website"]
}
```

### 43. Monika Krause – The Good Project
```json
{
  "itemType": "book",
  "title": "The Good Project: Humanitarian Relief NGOs and the Fragmentation of Reason",
  "creators": [{"creatorType": "author", "firstName": "Monika", "lastName": "Krause"}],
  "date": "2014",
  "publisher": "University of Chicago Press",
  "url": "https://press.uchicago.edu/ucp/books/book/chicago/G/bo17888868.html",
  "abstractNote": "all NGOs are media companies",
  "tags": ["lane:intervention", "dest:shelf", "tier:T3", "lineage:dev-critique", "@personal-website"]
}
```

### 44. Randall Packard – A History of Global Health
```json
{
  "itemType": "book",
  "title": "A History of Global Health: Interventions into the Lives of Other Peoples",
  "creators": [{"creatorType": "author", "firstName": "Randall", "lastName": "Packard"}],
  "date": "2016",
  "publisher": "Johns Hopkins University Press",
  "url": "https://www.press.jhu.edu/books/title/10791/history-global-health",
  "abstractNote": "magic bullets, every time",
  "tags": ["lane:intervention", "dest:shelf", "tier:T3", "lineage:dev-critique", "@personal-website"]
}
```

### 45. James Ferguson – The Anti-Politics Machine
```json
{
  "itemType": "book",
  "title": "The Anti-Politics Machine: Development, Depoliticization, and Bureaucratic Power in Lesotho",
  "creators": [{"creatorType": "author", "firstName": "James", "lastName": "Ferguson"}],
  "date": "1990",
  "publisher": "Cambridge University Press",
  "url": "https://www.astralcodexten.com/p/your-book-review-the-anti-politics",
  "abstractNote": "development as depoliticization",
  "tags": ["lane:intervention", "dest:shelf", "tier:T2", "lineage:dev-critique", "@personal-website"]
}
```

### 46. Vincanne Adams – Metrics
```json
{
  "itemType": "book",
  "title": "Metrics: What Counts in Global Health",
  "creators": [{"creatorType": "editor", "firstName": "Vincanne", "lastName": "Adams"}],
  "date": "2016",
  "publisher": "Duke University Press",
  "url": "https://www.dukeupress.edu/metrics",
  "abstractNote": "what counting does to health",
  "tags": ["lane:intervention", "dest:shelf", "tier:T3", "lineage:dev-critique", "@personal-website"]
}
```

### 47. Didier Fassin – Humanitarian Reason
```json
{
  "itemType": "book",
  "title": "Humanitarian Reason: A Moral History of the Present",
  "creators": [{"creatorType": "author", "firstName": "Didier", "lastName": "Fassin"}],
  "date": "2011",
  "publisher": "University of California Press",
  "url": "https://www.ucpress.edu/books/humanitarian-reason/paper",
  "abstractNote": "the politics of pity",
  "tags": ["lane:intervention", "dest:shelf", "tier:T3", "lineage:dev-critique", "@personal-website"]
}
```

### 48. Otto von Busch & Karl Palmås – The Corruption of Co-Design
```json
{
  "itemType": "book",
  "title": "The Corruption of Co-Design: Political and Social Conflicts in Participatory Design Thinking",
  "creators": [
    {"creatorType": "author", "firstName": "Otto", "lastName": "von Busch"},
    {"creatorType": "author", "firstName": "Karl", "lastName": "Palmås"}
  ],
  "date": "2023",
  "publisher": "Routledge",
  "url": "https://www.routledge.com/The-Corruption-of-Co-Design-Political-and-Social-Conflicts-in-Participatory-Design-Thinking/vonBusch-Palmas/p/book/9781032250014",
  "abstractNote": "Realpolitik for designers",
  "tags": ["lane:intervention", "dest:shelf", "tier:T3", "@personal-website"]
}
```

### 49. Anna Tsing – Friction
```json
{
  "itemType": "book",
  "title": "Friction: An Ethnography of Global Connection",
  "creators": [{"creatorType": "author", "firstName": "Anna", "lastName": "Tsing"}],
  "date": "2004",
  "publisher": "Princeton University Press",
  "url": "https://press.princeton.edu/books/paperback/9780691120652/friction",
  "abstractNote": "zones of awkward engagement",
  "tags": ["lane:intervention", "dest:shelf", "tier:T3", "lineage:dev-critique", "@personal-website"]
}
```

---

## Stream – Sites (18 items)

*All sites use `itemType: webpage` with `dest:stream` tag.*

```json
[
  {"itemType":"webpage","title":"The Maintainers","url":"https://themaintainers.org","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"Places Journal","url":"https://placesjournal.org","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"Logic(s) Magazine","url":"https://logicmag.io","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"The New Atlantis","url":"https://www.thenewatlantis.com","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"Robin Sloan","url":"https://www.robinsloan.com","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"Craig Mod","url":"https://craigmod.com","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"A Working Library","url":"https://aworkinglibrary.com","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"Frank Chimero","url":"https://frankchimero.com","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"The Convivial Society","url":"https://theconvivialsociety.substack.com","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"Hundred Rabbits","url":"https://100r.co","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"Ink & Switch","url":"https://www.inkandswitch.com","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"worrydream.com","url":"https://worrydream.com","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"Asterisk","url":"https://asteriskmag.com","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"Gordon Brander","url":"https://gordonbrander.com/pattern/","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"Henrik Karlsson","url":"https://www.henrikkarlsson.xyz","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"Maggie Appleton","url":"https://maggieappleton.com","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"Real Life Magazine","url":"https://reallifemag.com","tags":["dest:stream","@personal-website"]},
  {"itemType":"webpage","title":"Simon Sarris","url":"https://map.simonsarris.com","tags":["dest:stream","@personal-website"]}
]
```

## Stream – Essays (13 items)

```json
[
  {"itemType":"blogPost","title":"Tendrils of Mess in our Brains","creators":[{"creatorType":"author","firstName":"Sarah","lastName":"Perry"}],"date":"2017","blogTitle":"Ribbonfarm","url":"https://www.ribbonfarm.com/2017/01/05/tendrils-of-mess-in-our-brains/","tags":["dest:stream","@personal-website"]},
  {"itemType":"blogPost","title":"Design as Participation","creators":[{"creatorType":"author","firstName":"Kevin","lastName":"Slavin"}],"blogTitle":"Journal of Design and Science","url":"https://jods.mitpress.mit.edu/pub/design-as-participation","tags":["dest:stream","@personal-website"]},
  {"itemType":"blogPost","title":"Tools for Thought as Cultural Practices, not Computational Objects","creators":[{"creatorType":"author","firstName":"Maggie","lastName":"Appleton"}],"blogTitle":"maggieappleton.com","url":"https://maggieappleton.com/tools-for-thought","tags":["dest:stream","@personal-website"]},
  {"itemType":"blogPost","title":"Ritual and the Consciousness Monoculture","creators":[{"creatorType":"author","firstName":"Sarah","lastName":"Perry"}],"date":"2015","blogTitle":"Ribbonfarm","url":"https://www.ribbonfarm.com/2015/01/08/ritual-and-the-consciousness-monoculture/","tags":["dest:stream","@personal-website"]},
  {"itemType":"blogPost","title":"Notes Against Note-Taking Systems","creators":[{"creatorType":"author","firstName":"Sasha","lastName":"Chapin"}],"blogTitle":"sashachapin.substack.com","url":"https://sashachapin.substack.com/p/notes-against-note-taking-systems","tags":["dest:stream","@personal-website"]},
  {"itemType":"blogPost","title":"The Questions Concerning Technology","creators":[{"creatorType":"author","firstName":"L.M.","lastName":"Sacasas"}],"blogTitle":"The Convivial Society","url":"https://theconvivialsociety.substack.com/p/the-questions-concerning-technology","tags":["dest:stream","@personal-website"]},
  {"itemType":"blogPost","title":"Deep Laziness","creators":[{"creatorType":"author","firstName":"Sarah","lastName":"Perry"}],"date":"2018","blogTitle":"Ribbonfarm","url":"https://www.ribbonfarm.com/2018/04/06/deep-laziness/","tags":["dest:stream","@personal-website"]},
  {"itemType":"blogPost","title":"Rational Magic","creators":[{"creatorType":"author","firstName":"Tara Isabella","lastName":"Burton"}],"blogTitle":"The New Atlantis","url":"https://www.thenewatlantis.com/publications/rational-magic","tags":["dest:stream","@personal-website"]},
  {"itemType":"blogPost","title":"In Defense of the Poor Image","creators":[{"creatorType":"author","firstName":"Hito","lastName":"Steyerl"}],"blogTitle":"e-flux journal","url":"https://www.e-flux.com/journal/10/61362/in-defense-of-the-poor-image/","tags":["dest:stream","@personal-website"]},
  {"itemType":"blogPost","title":"The Cathedral of Computation","creators":[{"creatorType":"author","firstName":"Ian","lastName":"Bogost"}],"blogTitle":"The Atlantic","url":"https://www.theatlantic.com/technology/archive/2015/01/the-cathedral-of-computation/384300/","tags":["dest:stream","@personal-website"]},
  {"itemType":"blogPost","title":"A Rant About 'Technology'","creators":[{"creatorType":"author","firstName":"Ursula K.","lastName":"Le Guin"}],"blogTitle":"ursulakleguin.com","url":"https://www.ursulakleguin.com/a-rant-about-technology","tags":["dest:stream","@personal-website"]},
  {"itemType":"book","title":"The Whale and the Reactor","creators":[{"creatorType":"author","firstName":"Langdon","lastName":"Winner"}],"date":"1986","publisher":"University of Chicago Press","url":"https://sciencepolicy.colorado.edu/students/envs_5110/whale_reactor.pdf","tags":["dest:stream","tier:T1","lineage:maintenance","@personal-website"]}
]
```

## Undecided (3 items)

```json
[
  {"itemType":"book","title":"Teaching Machines","creators":[{"creatorType":"author","firstName":"Audrey","lastName":"Watters"}],"publisher":"MIT Press","url":"https://mitpress.mit.edu/9780262546065/teaching-machines/","tags":["dest:undecided","@personal-website"]},
  {"itemType":"book","title":"New Dark Age","creators":[{"creatorType":"author","firstName":"James","lastName":"Bridle"}],"publisher":"Verso","url":"https://www.versobooks.com/products/588-new-dark-age","tags":["dest:undecided","@personal-website"]},
  {"itemType":"book","title":"Updating to Remain the Same","creators":[{"creatorType":"author","firstName":"Wendy","lastName":"Chun"}],"publisher":"MIT Press","url":"https://mitpress.mit.edu/9780262533515/updating-to-remain-the-same/","tags":["dest:undecided","@personal-website"]}
]
```
