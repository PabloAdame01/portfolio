// ── THEME ──
(function(){
    const html = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    const stored = localStorage.getItem('pa-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const init = stored || (prefersDark ? 'dark' : 'light');
    html.setAttribute('data-theme', init);
    btn.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('pa-theme', next);
    });
})();

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


// ── MARQUEE ──
const items = [
    'React','PHP','Python','Laravel','FastAPI','MySQL','MongoDB',
    'Docker','AWS','Tailwind CSS','JavaScript','Django','Git','Linux'
];
const track = document.getElementById('marquee');
const full = [...items,...items,...items,...items];
track.innerHTML = full.map(t =>
    `<div class="marquee-item"><span class="marquee-dot"></span>${t}</div>`
).join('');

// ── REVEAL on SCROLL ──
const revealEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if(e.isIntersecting){ e.target.classList.add('visible'); ro.unobserve(e.target); }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => ro.observe(el));

// ── MOBILE MENU ──
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

function toggleMenu() {
    const isOpen = hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('body-no-scroll', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
}

hamburgerBtn.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// ── SKILL BARS ──
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

skillFills.forEach(fill => skillObserver.observe(fill));