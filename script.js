gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ── Cursor ── */
const cur = document.getElementById('cur'), ring = document.getElementById('cur-ring');
let cx = 0, cy = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; gsap.to(cur, { x: cx, y: cy, duration: .05, overwrite: true }); });
(function tick() { rx += (cx - rx) * .1; ry += (cy - ry) * .1; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(tick); })();
document.querySelectorAll('a,button,.pcard,.exp-card,.cch,.sk-ic,.nav-item,.tpill,.hsoc,.nav-soc').forEach(el => {
    el.addEventListener('mouseenter', () => { gsap.to(cur, { width: 5, height: 5, duration: .15 }); gsap.to(ring, { width: 44, height: 44, duration: .15 }); });
    el.addEventListener('mouseleave', () => { gsap.to(cur, { width: 10, height: 10, duration: .15 }); gsap.to(ring, { width: 30, height: 30, duration: .15 }); });
});

/* ── Canvas Background (green radial glow + particles) ── */
const canvas = document.getElementById('bg-canvas'), ctx = canvas.getContext('2d');
let W, H, pts = [];
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
function mkPt() { return { x: Math.random() * W, y: Math.random() * H, r: Math.random() * .7 + .2, o: Math.random() * .3 + .04, dx: (Math.random() - .5) * .12, dy: (Math.random() - .5) * .12, s: Math.random() * .3 + .04 }; }
function initPts() { pts = []; for (let i = 0; i < 220; i++)pts.push(mkPt()); }
function drawBg() {
    ctx.clearRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W * .68, H * .42, 0, W * .68, H * .42, W * .52);
    g.addColorStop(0, 'rgba(18,80,32,.22)'); g.addColorStop(.6, 'rgba(10,40,18,.08)'); g.addColorStop(1, 'transparent');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const g2 = ctx.createRadialGradient(0, 0, 0, 0, 0, W * .35);
    g2.addColorStop(0, 'rgba(10,60,22,.12)'); g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
    pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(61,220,110,${p.o})`; ctx.fill();
        p.x += p.dx; p.y += p.dy; p.o += p.s * .012;
        if (p.o > .38 || p.o < .03) p.s *= -1;
        if (p.x < -5 || p.x > W + 5 || p.y < -5 || p.y > H + 5) { p.x = Math.random() * W; p.y = Math.random() * H; }
    });
    requestAnimationFrame(drawBg);
}
window.addEventListener('resize', () => { resize(); initPts(); });
resize(); initPts(); drawBg();

/* ── HERO ENTRANCE — GSAP ── */
gsap.fromTo('#hname .n1', { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: .2 });
gsap.fromTo('#hname .n2', { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: .45 });
gsap.fromTo('.hero-role', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', delay: .75 });
gsap.fromTo('.hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', delay: .95 });
gsap.fromTo('.hero-btns', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', delay: 1.15 });
gsap.fromTo('#hsocials .hsoc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: 'power3.out', stagger: .12, delay: 1.35 });

gsap.fromTo('#sidenav', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: .9, ease: 'power3.out', delay: .4 });

for (let i = 0; i < 12; i++) {
    const el = document.getElementById('sk' + i);
    if (!el) continue;
    gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .6, ease: 'back.out(1.7)', delay: .8 + i * .07 });
    const yAmt = (Math.random() * 18 - 9).toFixed(1);
    gsap.to(el, { y: yAmt, duration: 2.5 + Math.random() * 2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: Math.random() * 2 });
}

document.querySelectorAll('.reveal').forEach(el => {
    const d = el.classList.contains('rd1') ? .1 : el.classList.contains('rd2') ? .2 : el.classList.contains('rd3') ? .3 : 0;
    gsap.fromTo(el, { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: .75, ease: 'power3.out', delay: d,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
});

document.querySelectorAll('.sb-fill').forEach(b => {
    ScrollTrigger.create({
        trigger: b, start: 'top 90%',
        onEnter: () => gsap.to(b, { width: b.dataset.w + '%', duration: 1.4, ease: 'power2.out' })
    });
});

const secs = ['hero', 'about', 'skills', 'projects', 'contact'];
const navItems = document.querySelectorAll('.nav-item[data-sec]');
window.addEventListener('scroll', () => {
    let active = 'hero';
    secs.forEach(id => { const el = document.getElementById(id); if (el && window.scrollY >= el.offsetTop - 230) active = id; });
    navItems.forEach(n => n.classList.toggle('active', n.dataset.sec === active));
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); gsap.to(window, { scrollTo: { y: t, offsetY: 0 }, duration: .9, ease: 'power2.inOut' }); }
    });
});

document.querySelectorAll('.pcard,.exp-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - .5) * 16;
        const y = ((e.clientY - r.top) / r.height - .5) * 16;
        gsap.to(card, { rotateX: -y * .3, rotateY: x * .3, duration: .3, ease: 'power1.out', transformPerspective: 800 });
    });
    card.addEventListener('mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: .5, ease: 'power2.out' }));
});

const btnSend = document.getElementById('sendBtn');
if (btnSend) {
    btnSend.addEventListener('click', () => {
        const orig = btnSend.innerHTML;
        gsap.to(btnSend, { scale: .97, duration: .1, yoyo: true, repeat: 1 });
        btnSend.innerHTML = '<i class="ti ti-check"></i> Message Sent!';
        btnSend.style.background = '#1d9e75';
        setTimeout(() => { btnSend.innerHTML = orig; btnSend.style.background = ''; }, 3000);
    });
}

const backBtn = document.getElementById('backToTop');
if (backBtn) {
    backBtn.addEventListener('click', () => gsap.to(window, { scrollTo: 0, duration: .8, ease: 'power2.inOut' }));
}
