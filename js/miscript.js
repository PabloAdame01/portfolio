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

// ── CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = -100, my = -100, rx = -100, ry = -100;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animCursor(){
    cursor.style.transform = `translate(${mx-6}px,${my-6}px)`;
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx-18}px,${ry-18}px)`;
    requestAnimationFrame(animCursor);
})();
document.querySelectorAll('a,button,.project-card,.stack-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
        ring.style.width = '60px'; ring.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
        ring.style.width = '36px'; ring.style.height = '36px';
    });
});

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

// ── SKILL BARS ──
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    const fill = item.querySelector('.skill-fill');
    const pct = fill.getAttribute('data-pct') || 1;

    item.addEventListener('mouseenter', () => {
        fill.style.transform = `scaleX(${pct})`;
    });

    item.addEventListener('mouseleave', () => {
        fill.style.transform = `scaleX(0)`;
    });
});