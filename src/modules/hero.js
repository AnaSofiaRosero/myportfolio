import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$, reduced, finePointer, splitChars, lerp, pad2 } from './utils.js';

/**
 * Tipografía cinética: cada letra del nombre cambia de peso y ancho
 * según la distancia al cursor (ejes variables de Bricolage Grotesque).
 */
function kinetic(root) {
  const chars = $$('[data-kinetic]', root).flatMap((el) => splitChars(el, 'k-char'));
  if (reduced || !finePointer) return chars;
  const state = chars.map(() => ({ w: 800, wd: 100 }));
  let mx = -9999, my = -9999, running = false, visible = true;

  window.addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; if (!running && visible) tick(); }, { passive: true });
  ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onToggle: (s) => (visible = s.isActive) });

  function tick() {
    running = true;
    let moving = false;
    chars.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
      const f = Math.max(0, 1 - d / 380); // 0 lejos → 1 cerca
      const tw = 800 - f * 580;
      const twd = 100 - f * 25;
      const s = state[i];
      s.w = lerp(s.w, tw, 0.14);
      s.wd = lerp(s.wd, twd, 0.14);
      if (Math.abs(s.w - tw) > 0.5) moving = true;
      c.style.setProperty('--w', s.w.toFixed(1));
      c.style.setProperty('--wd', s.wd.toFixed(1));
    });
    if (moving) requestAnimationFrame(tick); else running = false;
  }
  return chars;
}

export function initHero() {
  const hero = $('.hero');
  const lines = $$('[data-hero-line]', hero);
  const kChars = kinetic($('.hero__title', hero));
  const serifChars = splitChars($('.hero__line--serif [data-split]', hero));
  const scribble = $('.hero__scribble path', hero);

  // coordenadas del cursor + timecode estilo cámara: el estudio "graba"
  const cx = $('[data-coord-x]'), cy = $('[data-coord-y]'), tc = $('[data-timecode]');
  window.addEventListener('pointermove', (e) => {
    cx.textContent = String(Math.round(e.clientX)).padStart(4, '0');
    cy.textContent = String(Math.round(e.clientY)).padStart(4, '0');
  }, { passive: true });
  const t0 = performance.now();
  const tcLoop = () => {
    const ms = performance.now() - t0;
    const s = Math.floor(ms / 1000);
    tc.textContent = `${pad2(Math.floor(s / 3600))}:${pad2(Math.floor(s / 60) % 60)}:${pad2(s % 60)}:${pad2(Math.floor((ms % 1000) / 41.67))}`;
    requestAnimationFrame(tcLoop);
  };
  if (!reduced) tcLoop();

  // parallax de stickers con el cursor
  if (!reduced && finePointer) {
    const items = $$('[data-parallax]', hero).map((el) => ({
      el, k: parseFloat(el.dataset.parallax),
      x: gsap.quickTo(el, 'x', { duration: 1, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: 1, ease: 'power3' }),
    }));
    hero.addEventListener('pointermove', (e) => {
      const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
      items.forEach((i) => { i.x(nx * 40 * i.k); i.y(ny * 40 * i.k); });
    });
  }

  if (reduced) return () => {};

  // salida con scroll: el nombre se separa y escala
  const out = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 } });
  out.to(lines[0], { xPercent: -12, ease: 'none' }, 0)
    .to(lines[1], { xPercent: 10, ease: 'none' }, 0)
    .to(lines[2], { xPercent: -6, ease: 'none' }, 0)
    .to('.hero__scribble', { yPercent: -60, rotate: -8, ease: 'none' }, 0)
    .to('.hero__badge', { yPercent: 120, rotate: 90, ease: 'none' }, 0)
    .to('.hero__stickers', { yPercent: -40, ease: 'none' }, 0);

  // intro (devuelve función para ejecutar después del loader)
  gsap.set([...kChars, ...serifChars], { yPercent: 115 });
  gsap.set('.hero__meta, .hero__bottom > *, .hero__badge, .sticker', { autoAlpha: 0 });
  return () => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.to(kChars, { yPercent: 0, duration: 1.4, stagger: 0.035 }, 0)
      .to(serifChars, { yPercent: 0, duration: 1.4, stagger: 0.05 }, 0.25)
      .to(scribble, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0.7)
      .to('.hero__meta', { autoAlpha: 1, duration: 1 }, 0.6)
      .fromTo('.hero__bottom > *', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.8)
      .fromTo('.hero__badge', { autoAlpha: 0, scale: 0.6, rotate: -90 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 1.4 }, 0.9)
      .fromTo('.sticker', { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: 'back.out(2)' }, 1.1);
  };
}
