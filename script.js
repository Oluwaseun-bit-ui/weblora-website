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
