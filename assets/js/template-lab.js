(() => {
  const grid = document.getElementById('template-lab-grid');
  const search = document.getElementById('template-lab-search');
  const count = document.getElementById('template-lab-count');
  const empty = document.getElementById('template-lab-empty');
  const shortlistReview = document.querySelector('[data-shortlist-review]');
  const shortlistGroups = document.querySelector('[data-shortlist-groups]');
  const allTemplates = document.querySelector('[data-all-templates]');
  const title = document.querySelector('[data-template-lab-title]');
  const summary = document.querySelector('[data-template-lab-summary]');
  const focusLink = document.querySelector('[data-template-lab-focus-link]');
  if (!grid || !search || !count || !empty || !shortlistReview || !shortlistGroups || !allTemplates) return;

  let templates = [];
  const shortlistMode = new URLSearchParams(window.location.search).get('view') === 'shortlist';
  const familyNames = {
    '04': 'Minimal Clean',
    '18': 'Brutalist',
    '52': 'Now Page Focus',
  };
  const familyOrder = ['04', '18', '52'];

  shortlistReview.hidden = !shortlistMode;
  allTemplates.hidden = shortlistMode;
  if (shortlistMode) {
    document.documentElement.classList.add('template-shortlist-mode');
    if (title) title.textContent = 'Three ways forward';
    if (summary) summary.textContent = 'Nine focused variations of 04, 18, and 52, using the same current content and the same visibility rules.';
    if (focusLink) focusLink.hidden = true;
  }

  function createCard(template) {
    const card = document.createElement('article');
    card.className = 'template-card';
    card.dataset.templateCard = template.slug;
    card.dataset.search = `${template.id} ${template.name} ${template.description}`.toLowerCase();

    const preview = document.createElement('a');
    preview.className = 'template-card-preview';
    preview.href = template.previewUrl;
    preview.target = '_blank';
    preview.rel = 'noopener';
    preview.setAttribute('aria-label', `Open full preview of ${template.name}`);

    const image = document.createElement('img');
    image.src = template.thumbnailUrl;
    image.alt = `${template.name} personalized for Lee Wilkers`;
    image.loading = 'lazy';
    image.width = 720;
    image.height = 540;
    preview.append(image);

    const meta = document.createElement('div');
    meta.className = 'template-card-meta';
    const number = document.createElement('p');
    number.className = 'template-card-number';
    number.textContent = template.id;
    const details = document.createElement('div');
    const heading = document.createElement('h2');
    heading.textContent = template.name;
    const description = document.createElement('p');
    description.className = 'template-card-description';
    description.textContent = template.description;
    const link = document.createElement('a');
    link.className = 'template-card-link';
    link.href = template.previewUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Full preview';

    details.append(heading, description, link);
    meta.append(number, details);
    card.append(preview, meta);
    return card;
  }

  function filterTemplates() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    for (const card of grid.querySelectorAll('[data-template-card]')) {
      card.hidden = query !== '' && !card.dataset.search.includes(query);
      if (!card.hidden) visible += 1;
    }
    count.textContent = `${visible} of ${templates.length} templates`;
    empty.hidden = visible !== 0;
  }

  async function loadTemplates() {
    try {
      const response = await fetch('/assets/template-lab/manifest.json');
      if (!response.ok) throw new Error(`Manifest returned ${response.status}`);
      templates = await response.json();
      grid.replaceChildren(...templates.map(createCard));
      grid.setAttribute('aria-busy', 'false');
      filterTemplates();
    } catch (error) {
      grid.setAttribute('aria-busy', 'false');
      count.textContent = 'Templates could not be loaded.';
      console.error(error);
    }
  }

  function createSpec(label, value) {
    const term = document.createElement('dt');
    term.textContent = label;
    const description = document.createElement('dd');
    description.textContent = value;
    return [term, description];
  }

  function createShortlistCard(variation) {
    const card = document.createElement('article');
    card.className = 'shortlist-card';
    card.dataset.shortlistCard = variation.id;

    const preview = document.createElement('a');
    preview.className = 'shortlist-card-preview';
    preview.href = variation.previewUrl;
    preview.target = '_blank';
    preview.rel = 'noopener';
    preview.setAttribute('aria-label', `Open full preview of ${variation.id} ${variation.name}`);

    const image = document.createElement('img');
    image.src = variation.thumbnailUrl;
    image.alt = `${variation.id} ${variation.name} personalized for Lee Wilkers`;
    image.loading = 'eager';
    image.width = 960;
    image.height = 720;
    preview.append(image);

    const heading = document.createElement('h3');
    heading.innerHTML = `<span>${variation.id}</span>${variation.name}`;

    const spec = document.createElement('dl');
    spec.className = 'shortlist-spec';
    spec.append(
      ...createSpec('Typeface', variation.font),
      ...createSpec('Structure', variation.structure),
      ...createSpec('Section order', variation.order),
      ...createSpec('Palette', variation.palette),
    );

    const link = document.createElement('a');
    link.className = 'template-card-link';
    link.href = variation.previewUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Full preview';

    card.append(preview, heading, spec, link);
    return card;
  }

  async function loadShortlist() {
    try {
      const response = await fetch('/assets/template-lab/shortlist-manifest.json');
      if (!response.ok) throw new Error(`Shortlist manifest returned ${response.status}`);
      const shortlist = await response.json();
      const groups = familyOrder.map((family) => {
        const section = document.createElement('section');
        section.className = 'shortlist-family';
        section.dataset.shortlistFamily = family;
        const heading = document.createElement('h2');
        heading.innerHTML = `<span>${family}</span>${familyNames[family]}`;
        const cards = document.createElement('div');
        cards.className = 'shortlist-grid';
        cards.append(...shortlist.filter((variation) => variation.family === family).map(createShortlistCard));
        section.append(heading, cards);
        return section;
      });
      shortlistGroups.replaceChildren(...groups);
      shortlistGroups.setAttribute('aria-busy', 'false');
    } catch (error) {
      shortlistGroups.setAttribute('aria-busy', 'false');
      shortlistGroups.textContent = 'Shortlist previews could not be loaded.';
      console.error(error);
    }
  }

  search.addEventListener('input', filterTemplates);
  if (shortlistMode) loadShortlist();
  else loadTemplates();
})();
