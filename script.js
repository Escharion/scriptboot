    // Ghana number in international format without + or spaces.
    const WHATSAPP_NUMBER = "233537191335";

    function showTab(tabName) {
      const docs = document.getElementById('docs');
      const request = document.getElementById('request');
      const docsButton = document.getElementById('tab-docs');
      const requestButton = document.getElementById('tab-request');
      const showRequest = tabName === 'request';
      docs.classList.toggle('active', !showRequest);
      request.classList.toggle('active', showRequest);
      docsButton.classList.toggle('active', !showRequest);
      requestButton.classList.toggle('active', showRequest);
      docsButton.setAttribute('aria-selected', String(!showRequest));
      requestButton.setAttribute('aria-selected', String(showRequest));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.getElementById('year').textContent = new Date().getFullYear();

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

    document.getElementById('requestForm').addEventListener('submit', async function (event) {
      event.preventDefault();
      const form = event.currentTarget;
      const status = document.getElementById('formStatus');
      if (!form.reportValidity()) return;
      const data = Object.fromEntries(new FormData(form).entries());
      const message = buildMessage(data);
      const number = WHATSAPP_NUMBER.replace(/\D/g, '');
      if (!number) {
        try {
          await navigator.clipboard.writeText(message);
          status.textContent = 'WhatsApp number is not configured yet. Your request message was copied. Add your number in index.html to activate WhatsApp sending.';
        } catch (error) {
          status.textContent = 'WhatsApp number is not configured. Add your number in index.html, then submit again.';
        }
        return;
      }
      const url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (!opened) {
        status.textContent = 'Your browser blocked the WhatsApp tab. Allow pop-ups for this site and try again.';
      } else {
        status.textContent = 'WhatsApp opened. Review your request and press Send to deliver it.';
      }
    });
