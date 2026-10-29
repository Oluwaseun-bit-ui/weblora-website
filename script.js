// header scroll state
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const menuIcon = document.getElementById('menuIcon');
const closeIconPath = '<line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/>';
const openIconPath = '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';

function toggleMenu(open){
  const isOpen = open !== undefined ? open : !navLinks.classList.contains('open');
  navLinks.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuIcon.innerHTML = isOpen ? closeIconPath : openIconPath;
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
menuToggle.addEventListener('click', () => toggleMenu());
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

// highlight the current page in the nav
const currentPage = location.pathname.split('/').pop() || 'index.html';
navLinks.querySelectorAll('a').forEach(a => {
  if (a.getAttribute('href') === currentPage) {
    a.classList.add('active');
    a.setAttribute('aria-current', 'page');
  }
});

// FAQ accordion (faq.html)
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  const answer = item.querySelector('.faq-a');
  const setState = (open) => {
    item.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    answer.style.maxHeight = open ? answer.scrollHeight + 'px' : '0px';
  };
  setState(item.classList.contains('open'));
  btn.addEventListener('click', () => setState(!item.classList.contains('open')));
  window.addEventListener('resize', () => { if(item.classList.contains('open')) answer.style.maxHeight = answer.scrollHeight + 'px'; });
});

// contact form -> FormSubmit (contact.html)
const projectForm = document.getElementById('projectForm');
if (projectForm) {
  // FormSubmit needs a full URL to redirect to after sending, so build it from wherever the site is hosted
  document.getElementById('formNext').value = new URL('thank-you.html', location.href).href;

  // stop double submissions while the enquiry is sending
  projectForm.addEventListener('submit', function(){
    const btn = this.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
  });
}

// floating WhatsApp button (every page)
const waButton = document.createElement('a');
waButton.className = 'wa-float';
waButton.href = 'https://wa.me/2349034850696';
waButton.target = '_blank';
waButton.rel = 'noopener';
waButton.setAttribute('aria-label', 'Chat with us on WhatsApp');
waButton.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.34 5L2 22l5.14-1.35A9.96 9.96 0 0 0 12.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.2c-1.62 0-3.2-.44-4.58-1.27l-.33-.2-3.05.8.82-2.97-.21-.34a8.18 8.18 0 0 1-1.25-4.42c0-4.54 3.7-8.23 8.24-8.23 4.53 0 8.23 3.69 8.23 8.23 0 4.54-3.7 8.23-8.24 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.56.12-.17.25-.65.8-.8.96-.15.17-.3.19-.55.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.38.11-.5.11-.11.25-.3.37-.44.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.9 2.41 1.02 2.58c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.17-.48-.29z"/></svg>';
document.body.appendChild(waButton);

// count every WhatsApp click in Google Analytics (can be imported to Google Ads as a conversion)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href*="wa.me/"]');
  if (link && typeof gtag === 'function') {
    gtag('event', 'whatsapp_click', { link_location: link.classList.contains('wa-float') ? 'floating_button' : location.pathname });
  }
});
