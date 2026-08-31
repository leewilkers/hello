(() => {
  const payload = document.getElementById('lee-template-content');
  if (!payload) return;

  const content = JSON.parse(payload.textContent);
  const root = document.documentElement;
  root.dataset.templateLab = 'personalized';
  document.title = `${content.name} — ${content.template.slug}`;

  const guard = document.createElement('style');
  guard.textContent = '[data-template-lab="personalized"] [data-lee-suppressed] { display: none !important; }';
  document.head.append(guard);

  const setContent = (element, value) => {
    if (!element) return;
    element.textContent = value;
    element.dataset.leeContent = 'true';
  };

  const suppress = (element) => {
    if (!element) return;
    element.hidden = true;
    element.dataset.leeSuppressed = 'true';
  };

  const hiddenClaimPatterns = [
    'testimonial',
    'pricing',
    'metric',
    'stats',
    'client-logo',
    'newsletter',
    'subscriber',
    'course-grid',
    'podcast-player',
    'investment-stats',
  ];

  for (const element of document.querySelectorAll('[class], [id]')) {
    const identity = `${element.className || ''} ${element.id || ''}`.toLowerCase();
    if (hiddenClaimPatterns.some((pattern) => identity.includes(pattern))) {
      suppress(element);
    }
  }

  for (const form of document.querySelectorAll('form')) suppress(form);

  const visible = (element) => element && !element.closest('[hidden], [data-lee-suppressed], nav, [role="navigation"]');
  const headings = content.sectionHeadings;
  const about = content.about ?? [];
  const background = content.background ?? [];
  const workExamples = content.workExamples ?? [];
  const projects = content.projects ?? [];
  const services = content.services ?? [];
  const links = content.links ?? [];
  const tags = content.tags ?? [];
  const paragraphs = [content.lede, ...background, ...about, ...projects.map((project) => project.description)];
  const listItems = [
    ...workExamples,
    ...content.recentWork.map((item) => `${item.role} — ${item.organization}`),
    ...services,
    ...projects.map((project) => `${project.name}. ${project.description}`),
  ];

  const h1s = [...document.querySelectorAll('h1')].filter(visible);
  h1s.forEach((heading, index) => {
    setContent(heading, index === 0 ? content.name : headings[(index - 1) % headings.length]);
  });

  const secondaryHeadings = [...document.querySelectorAll('h2, h3, h4')].filter(visible);
  secondaryHeadings.forEach((heading, index) => {
    setContent(heading, headings[index % headings.length]);
  });

  const paragraphElements = [...document.querySelectorAll('p')].filter(visible);
  paragraphElements.forEach((paragraph, index) => {
    setContent(paragraph, paragraphs[index % paragraphs.length]);
  });

  let lede = document.querySelector('.hero p:not([hidden]), main p:not([hidden]), article p:not([hidden])');
  if (!lede) {
    lede = document.createElement('p');
    (h1s[0] || document.body).insertAdjacentElement(h1s[0] ? 'afterend' : 'afterbegin', lede);
  }
  setContent(lede, content.lede);
  lede.classList.add('lee-current-lede');

  const nonNavItems = [...document.querySelectorAll('li')]
    .filter((item) => visible(item) && !item.querySelector('h1, h2, h3, h4, p, ul, ol'));
  nonNavItems.forEach((item, index) => {
    setContent(item, listItems[index % listItems.length]);
  });

  const siteLinks = new Map(links.map((link) => [link.label.toLowerCase(), link]));
  const aboutLink = siteLinks.get('about') ?? links[0];
  const stacksLink = siteLinks.get('stacks') ?? aboutLink;
  const emailLink = siteLinks.get('email lee') ?? links.at(-1) ?? aboutLink;
  const navAliases = new Map([
    ['home', aboutLink],
    ['about', aboutLink],
    ['work', aboutLink],
    ['services', aboutLink],
    ['projects', stacksLink],
    ['portfolio', stacksLink],
    ['blog', stacksLink],
    ['essays', stacksLink],
    ['writing', stacksLink],
    ['research', stacksLink],
    ['case studies', stacksLink],
    ['resume', aboutLink],
    ['now', aboutLink],
    ['speaking', aboutLink],
    ['contact', emailLink],
  ]);

  let projectLinkIndex = 0;
  let navLinkIndex = 0;
  for (const link of document.querySelectorAll('a')) {
    const original = link.textContent.trim().toLowerCase();
    const mapped = siteLinks.get(original) || navAliases.get(original);
    if (mapped) {
      setContent(link, mapped.label);
      link.href = mapped.url;
      continue;
    }
    if (link.href.startsWith('mailto:') || /email|hire|contact|book|talk|connect/.test(original)) {
      setContent(link, 'Email Lee');
      link.href = `mailto:${content.email}`;
      continue;
    }
    if (link.closest('nav, [role="navigation"]') && link.textContent.trim()) {
      const navLink = links[navLinkIndex % links.length];
      navLinkIndex += 1;
      setContent(link, navLink.label);
      link.href = navLink.url;
      continue;
    }
    if (!link.closest('nav, [role="navigation"]') && link.textContent.trim()) {
      const project = projects[projectLinkIndex % projects.length] ?? stacksLink;
      projectLinkIndex += 1;
      setContent(link, project.name ?? project.label);
      link.href = project.url;
    }
  }

  const identitySelectors = [
    '.site-title',
    '.logo',
    '[class*="author-name" i]',
    '[class*="person-name" i]',
    '[class*="profile-name" i]',
    '[class*="site-name" i]',
    '[class*="brand-name" i]',
  ].join(',');
  for (const element of document.querySelectorAll(identitySelectors)) {
    if (!element.querySelector('img, svg')) setContent(element, content.name);
  }

  for (const badge of document.querySelectorAll('[class*="badge" i]')) {
    if (/\d+\+?\s*years?|experience/i.test(badge.textContent)) setContent(badge, content.role);
  }

  for (const date of document.querySelectorAll('[class*="date" i]')) {
    if (!date.querySelector('time')) setContent(date, 'Recent');
  }

  for (const subscribe of document.querySelectorAll('.subscribe-btn, [class*="subscribe" i] button')) {
    setContent(subscribe, 'Read writing');
  }

  for (const link of document.querySelectorAll('a[href^="mailto:"]')) {
    link.href = `mailto:${content.email}`;
    if (/@/.test(link.textContent)) setContent(link, content.email);
  }

  const actionLabels = ['View work', 'Read writing', 'Email Lee'];
  [...document.querySelectorAll('button')].filter(visible).forEach((button, index) => {
    setContent(button, actionLabels[index % actionLabels.length]);
  });

  const images = [...document.querySelectorAll('img')].filter((image) => {
    const identity = `${image.className || ''} ${image.alt || ''} ${image.src || ''}`.toLowerCase();
    return !/icon|logo|favicon|\.svg(?:\?|$)/.test(identity) && !image.closest('[hidden]');
  });
  images.forEach((image, index) => {
    image.src = content.images[index % content.images.length];
    image.alt = index === 0 ? 'Lee Wilkers' : (projects[index % projects.length]?.name ?? content.name);
    image.dataset.leeContent = 'true';
  });

  const labelReplacements = new Map([
    ['email', 'Email'],
    ['location', 'Location'],
    ['follow', 'Elsewhere'],
    ['work', 'Some things I’ve worked on'],
    ['portfolio', 'Some things I’ve worked on'],
    ['services', 'Some things I’ve worked on'],
    ['about me', 'About'],
    ['contact me', 'Contact'],
  ]);
  const protectedStrings = new Set([
    content.name,
    content.email,
    content.location,
    content.role,
    content.lede,
    ...about,
    ...background,
    ...workExamples,
    ...content.sectionHeadings,
    ...tags,
    ...services,
    ...links.map((link) => link.label),
    ...projects.flatMap((project) => [project.name, project.description]),
    ...content.recentWork.flatMap((item) => [item.role, item.organization, `${item.role} — ${item.organization}`]),
    ...actionLabels,
    'Recent',
    'Email',
    'Location',
    'Elsewhere',
  ].map((value) => value.toLowerCase()));

  let leftoverLabelIndex = 0;
  let leftoverParagraphIndex = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (!parent || parent.closest('script, style, svg, [hidden], [data-lee-suppressed], [data-lee-content]')) continue;
    node.nodeValue = node.nodeValue
      .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, content.email)
      .replace(/Your Name|Strategic Advisors(?: Consulting)?/gi, content.name)
      .replace(/\b\d+\+?\s*Years? Experience\b/gi, content.role)
      .replace(/\bSubscribe\b/gi, 'Writing')
      .replace(/\b20\d{2}\s*[–—-](?:\s*20\d{2}|\s*\d{2})?/g, 'Recent')
      .replace(/closer to cattle than the Capitol/gi, 'interested in tools and how we use them');

    const value = node.nodeValue.trim();
    if (!value || !/[a-z0-9]/i.test(value) || protectedStrings.has(value.toLowerCase())) continue;

    if (/©|copyright|all rights reserved/i.test(value)) {
      node.nodeValue = content.name;
      continue;
    }

    if (/^(?:\d+[+%]?|\$[\d,.]+|\d+\s*(?:clients?|projects?|awards?|readers?|users?))$/i.test(value)) {
      suppress(parent.closest('[class*="stat" i], [class*="metric" i], [class*="counter" i]') || parent);
      continue;
    }

    const replacement = labelReplacements.get(value.toLowerCase());
    if (replacement) {
      node.nodeValue = replacement;
      continue;
    }

    if (/san francisco|new york|london|berlin|los angeles/i.test(value)) {
      node.nodeValue = content.location;
      continue;
    }

    if (value.length <= 50) {
      node.nodeValue = tags[leftoverLabelIndex % tags.length] ?? content.role;
      leftoverLabelIndex += 1;
    } else {
      node.nodeValue = paragraphs[leftoverParagraphIndex % paragraphs.length];
      leftoverParagraphIndex += 1;
    }
  }
})();
