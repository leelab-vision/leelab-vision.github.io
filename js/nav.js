// Shared navigation — injected into every page
// Usage: <div id="nav-placeholder"></div> in <body>, then include this script.
// Set window.NAV_ACTIVE to the page key before including, e.g.:
//   <script>window.NAV_ACTIVE = 'research';</script>

(function () {
  const pages = [
    { key: 'research',     label: 'Research',     href: 'index.html' },
    { key: 'people',       label: 'People',       href: 'people.html' },
    { key: 'position',     label: 'Position',     href: 'position.html' },
    { key: 'publications', label: 'Publications', href: 'publications.html' },
    { key: 'resources',    label: 'Resources',    href: 'resources.html' },
    { key: 'contact',      label: 'Contact',      href: 'contact.html' },
  ];

  const active = window.NAV_ACTIVE || 'home';

  const linksHTML = pages.map(p => {
    const cls = p.key === active ? ' class="active"' : '';
    return `<li><a href="${p.href}"${cls}>${p.label}</a></li>`;
  }).join('');

  const navHTML = `
    <nav id="site-nav">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">Lee Lab</a>

        <ul class="nav-links" id="navLinks">${linksHTML}</ul>
        <div class="hamburger" id="hamburger" role="button" tabindex="0" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>
  `;

  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) placeholder.outerHTML = navHTML;

  // Hamburger toggle (runs after nav is injected)
  document.addEventListener('DOMContentLoaded', function () {
    const ham  = document.getElementById('hamburger');
    const links = document.getElementById('navLinks');
    if (!ham || !links) return;
    ham.addEventListener('click', () => links.classList.toggle('open'));
    ham.addEventListener('keydown', e => { if (e.key === 'Enter') links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  });
})();
