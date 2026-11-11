gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ── Mobile Navigation Controls ── */
const mobileNavToggle = document.getElementById('mobileNavToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const toggleIcon = document.getElementById('navToggleIcon');

function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('is-open');
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add('is-open');
    if (mobileNavToggle) mobileNavToggle.setAttribute('aria-expanded', 'true');
    if (toggleIcon) {
        toggleIcon.classList.remove('ti-menu-2');
        toggleIcon.classList.add('ti-x');
    }
    document.body.classList.add('menu-open');
}

function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('is-open');
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('is-open');
    if (mobileNavToggle) mobileNavToggle.setAttribute('aria-expanded', 'false');
    if (toggleIcon) {
        toggleIcon.classList.remove('ti-x');
        toggleIcon.classList.add('ti-menu-2');
    }
    document.body.classList.remove('menu-open');
}

if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        if (mobileMenu && mobileMenu.classList.contains('is-open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}

if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
        closeMobileMenu();
    }
});

/* ── Canvas Background (green radial glow + responsive particles) ── */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let W, H, pts = [];

function resize() {
    if (!canvas) return;
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

function mkPt() {
    return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 0.7 + 0.2,
        o: Math.random() * 0.3 + 0.04,
        dx: (Math.random() - 0.5) * 0.12,
        dy: (Math.random() - 0.5) * 0.12,
        s: Math.random() * 0.3 + 0.04
    };
}

function initPts() {
    pts = [];
    const count = window.innerWidth < 768 ? 80 : 200;
    for (let i = 0; i < count; i++) pts.push(mkPt());
}

function drawBg() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);

    const g = ctx.createRadialGradient(W * 0.68, H * 0.42, 0, W * 0.68, H * 0.42, W * 0.52);
    g.addColorStop(0, 'rgba(18,80,32,.22)');
    g.addColorStop(0.6, 'rgba(10,40,18,.08)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    const g2 = ctx.createRadialGradient(0, 0, 0, 0, 0, W * 0.35);
    g2.addColorStop(0, 'rgba(10,60,22,.12)');
    g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);

    pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(61,220,110,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        p.o += p.s * 0.012;
        if (p.o > 0.38 || p.o < 0.03) p.s *= -1;
        if (p.x < -5 || p.x > W + 5 || p.y < -5 || p.y > H + 5) {
            p.x = Math.random() * W;
            p.y = Math.random() * H;
        }
    });

    requestAnimationFrame(drawBg);
}

if (canvas && ctx) {
    window.addEventListener('resize', () => {
        resize();
        initPts();
    });
    resize();
    initPts();
    drawBg();
}

/* ── HERO ENTRANCE — GSAP ── */
gsap.fromTo('#hname .n1', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 });
gsap.fromTo('#hname .n2', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.45 });
gsap.fromTo('.hero-role', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.7 });
gsap.fromTo('.hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.9 });
gsap.fromTo('.hero-btns', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.1 });
gsap.fromTo('#hsocials .hsoc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1, delay: 1.25 });

if (document.getElementById('sidenav')) {
    gsap.fromTo('#sidenav', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.35 });
}

for (let i = 0; i < 12; i++) {
    const el = document.getElementById('sk' + i);
    if (!el) continue;
    gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 0.8 + i * 0.07 });
    const yAmt = (Math.random() * 18 - 9).toFixed(1);
    gsap.to(el, { y: yAmt, duration: 2.5 + Math.random() * 2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: Math.random() * 2 });
}

/* ── SCROLL REVEAL ── */
document.querySelectorAll('.reveal').forEach(el => {
    const d = el.classList.contains('rd1') ? 0.1 : el.classList.contains('rd2') ? 0.2 : el.classList.contains('rd3') ? 0.3 : 0;
    gsap.fromTo(el, { y: 26, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: d,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
});

/* ── SKILL BARS ── */
document.querySelectorAll('.sb-fill').forEach(b => {
    ScrollTrigger.create({
        trigger: b, start: 'top 92%',
        onEnter: () => gsap.to(b, { width: b.dataset.w + '%', duration: 1.3, ease: 'power2.out' })
    });
});

/* ── ACTIVE SECTION ON SCROLL ── */
const secs = ['hero', 'about', 'skills', 'projects', 'contact'];
const desktopNavItems = document.querySelectorAll('.nav-item[data-sec]');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item[data-sec]');

function updateActiveSection() {
    let active = 'hero';
    secs.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 240) {
            active = id;
        }
    });
    desktopNavItems.forEach(n => n.classList.toggle('active', n.dataset.sec === active));
    mobileNavItems.forEach(n => n.classList.toggle('active', n.dataset.sec === active));
}

window.addEventListener('scroll', updateActiveSection, { passive: true });
updateActiveSection();

/* ── SMOOTH SCROLL FOR ANCHORS ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const targetId = a.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            closeMobileMenu();
            gsap.to(window, {
                scrollTo: { y: targetElement, offsetY: 0 },
                duration: 0.85,
                ease: 'power2.inOut'
            });
        }
    });
});

/* ── 3D CARD TILT (Desktop mouse only) ── */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.pcard, .exp-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
            const y = ((e.clientY - r.top) / r.height - 0.5) * 14;
            gsap.to(card, {
                rotateX: -y * 0.25,
                rotateY: x * 0.25,
                duration: 0.25,
                ease: 'power1.out',
                transformPerspective: 800
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.45, ease: 'power2.out' });
        });
    });
}

/* ── CONTACT FORM SIMULATION ── */
const btnSend = document.getElementById('sendBtn');
if (btnSend) {
    btnSend.addEventListener('click', () => {
        const orig = btnSend.innerHTML;
        gsap.to(btnSend, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
        btnSend.innerHTML = '<i class="ti ti-check"></i> Message Sent!';
        btnSend.style.background = '#1d9e75';
        setTimeout(() => {
            btnSend.innerHTML = orig;
            btnSend.style.background = '';
        }, 3000);
    });
}

/* ── BACK TO TOP ── */
const backBtn = document.getElementById('backToTop');
if (backBtn) {
    backBtn.addEventListener('click', () => {
        gsap.to(window, { scrollTo: 0, duration: 0.8, ease: 'power2.inOut' });
    });
}
