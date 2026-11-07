    const REQUEST_EMAIL = "yuniqma7@gmail.com";

    // Add or remove project entries here, then redeploy the site to publish the changes.
    const PORTFOLIO_PROJECTS = [
      {
        title: 'Live digital clock',
        description: 'A small Python terminal clock that refreshes every second.',
        href: 'projects/live_clock.py',
        type: 'Python demo'
      },
      {
        title: 'Folder activity monitor',
        description: 'Watches a folder and reports files that are added, changed or removed.',
        href: 'projects/folder_activity_monitor.py',
        type: 'Python demo'
      },
      {
        title: 'Live file size monitor',
        description: 'Tracks a file size over time and reports updates in the terminal.',
        href: 'projects/file_size_monitor.py',
        type: 'Python demo'
      },
      {
        title: 'Inventory and price catalog',
        description: 'A browser preview of a searchable item database with sample Ghana cedi prices.',
        href: 'projects/inventory_price_catalog.html',
        type: 'Interactive browser preview',
        linkText: 'Preview in browser ↗'
      }
    ];

    function showTab(tabName) {
      ['docs', 'portfolio', 'request'].forEach(function (name) {
        const active = name === tabName;
        document.getElementById(name).classList.toggle('active', active);
        document.getElementById('tab-' + name).classList.toggle('active', active);
        document.getElementById('tab-' + name).setAttribute('aria-selected', String(active));
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.getElementById('year').textContent = new Date().getFullYear();

    function renderPortfolio() {
      const grid = document.getElementById('portfolioGrid');
      PORTFOLIO_PROJECTS.forEach(function (project) {
        let projectUrl;
        try {
          projectUrl = new URL(project.href, window.location.href);
        } catch (error) {
          console.error('Skipping portfolio project with an invalid link:', project.href, error);
          return;
        }
        const hasScheme = /^[a-z][a-z\d+.-]*:/i.test(project.href);
        if (hasScheme && !['http:', 'https:'].includes(projectUrl.protocol)) {
          console.error('Skipping portfolio project link with an unsupported protocol:', project.href);
          return;
        }

        const card = document.createElement('article');
        card.className = 'portfolio-card';

        const type = document.createElement('span');
        type.className = 'portfolio-type';
        type.textContent = project.type || 'Project';

        const title = document.createElement('h2');
        title.textContent = project.title;

        const description = document.createElement('p');
        description.textContent = project.description;

        const link = document.createElement('a');
        link.className = 'portfolio-link';
        link.href = projectUrl.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = project.linkText || 'Inspect project ↗';

        card.append(type, title, description, link);
        grid.append(card);
      });
    }

    renderPortfolio();

    function buildMessage(data) {
      return [
        '#scriptboot.r',
        '*NEW TOOL REQUEST — YUNIQMA SCRIPTBOOT*',
        '',
        '*Category:* ' + data.category,
        '*Preferred platform:* ' + data.platform,
        '',
        '*Situation / problem:*', data.problem,
        '',
        '*Desired outcome:*', data.outcome || 'Not specified',
        '',
        '*Estimated budget:* ' + data.budget,
        '*Timing:* ' + data.timing,
        '*Additional information:* ' + (data.extra || 'None'),
        '',
        'Please contact me to discuss the requirements.'
      ].join('\n');
    }

    document.getElementById('requestForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const form = event.currentTarget;
      const status = document.getElementById('formStatus');
      if (!form.reportValidity()) return;
      const data = Object.fromEntries(new FormData(form).entries());
      const subject = '#scriptboot.r Tool request — YUNIQMA SCRIPTBOOT';
      const body = buildMessage(data);
      window.location.href = 'mailto:' + REQUEST_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      status.textContent = 'Your email app should open with the request prepared. Press Send to deliver it.';
    });
