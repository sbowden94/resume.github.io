/* ═══════════════════════════════════════════════
   SPA Router + Enrichment
   Hash-based routing, partial loading, nav state
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  const contentEl = document.getElementById('content');
  const navLinks = document.querySelectorAll('.nav-links a[data-page]');

  // Page registry — maps hash to partial file
  const pages = {
    home:     'pages/home.html',
    services: 'pages/services.html',
    ai:       'pages/ai.html',
    resume:   'pages/resume.html',
    projects: 'pages/projects.html',
    contact:  'pages/contact.html'
  };

  const cache = {};

  // ── Fetch + render a page partial ──
  async function loadPage(name) {
    const file = pages[name];
    if (!file) return loadPage('home');

    // Show loading state only if not cached
    if (!cache[name]) {
      contentEl.innerHTML = '<div style="text-align:center;padding:4rem 0;color:var(--text-muted);">Loading…</div>';
    }

    try {
      if (!cache[name]) {
        const res = await fetch(file);
        if (!res.ok) throw new Error(res.status);
        cache[name] = await res.text();
      }

      contentEl.innerHTML = cache[name];
      contentEl.className = 'page-enter';

      // Reset animation on next frame
      void contentEl.offsetWidth;

      updateNav(name);
      enrichPage(name);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      contentEl.innerHTML = `
        <div style="text-align:center;padding:4rem 0;">
          <p style="color:var(--red);font-weight:600;">Failed to load page</p>
          <p style="color:var(--text-muted);font-size:.85rem;">${err.message}</p>
        </div>`;
    }
  }

  // ── Highlight active nav link ──
  function updateNav(name) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.page === name);
    });
  }

  // ── Post-load enrichments ──
  function enrichPage(name) {
    // Animate cards/items on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    contentEl.querySelectorAll('.card, .project, .job, .skill-item, .contact-item, .edu-block, .cert-block, .minor-role').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = `opacity .4s ease ${i * .04}s, transform .4s ease ${i * .04}s`;
      observer.observe(el);
    });

    // Skill count badges (enrichment)
    if (name === 'ai') {
      const count = contentEl.querySelectorAll('.skill-item').length;
      const counter = contentEl.querySelector('[data-skill-count]');
      if (counter) counter.textContent = count;
    }

    // Project tech tag parsing
    if (name === 'projects') {
      contentEl.querySelectorAll('.project .meta').forEach(meta => {
        meta.innerHTML = meta.innerHTML.replace(
          /`([^`]+)`/g,
          '<code style="background:rgba(255,255,255,.06);padding:.1rem .35rem;border-radius:4px;font-size:.78rem;font-family:var(--mono);color:var(--cyan);">$1</code>'
        );
      });
    }

    // Contact & Services: make emails/phone clickable
    if (name === 'contact' || name === 'services') {
      contentEl.querySelectorAll('[data-email]').forEach(el => {
        const email = el.textContent.trim();
        el.innerHTML = `<a href="mailto:${email}">${email}</a>`;
      });
      contentEl.querySelectorAll('[data-phone]').forEach(el => {
        const phone = el.textContent.trim();
        const digits = phone.replace(/\D/g, '');
        el.innerHTML = `<a href="tel:+1${digits}">${phone}</a>`;
      });
    }
  }

  // ── Hash-based routing ──
  function route() {
    const hash = location.hash.replace('#', '') || 'home';
    loadPage(hash);
  }

  // Nav click handlers
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.dataset.page;
      location.hash = page === 'home' ? '' : page;
    });
  });

  // Print button
  document.querySelector('.btn-print')?.addEventListener('click', () => {
    // Load resume page first, then print
    if (location.hash !== '#resume') {
      location.hash = 'resume';
      setTimeout(() => window.print(), 500);
    } else {
      window.print();
    }
  });

  // Listen for hash changes
  window.addEventListener('hashchange', route);

  // Initial load
  route();
})();
