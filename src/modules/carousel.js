import { gsap } from 'gsap';
import { $, $$, reduced, finePointer, pad2 } from './utils.js';

/**
 * Carrusel-exposición de tote bags.
 * - Una tote grande centrada, flechas, contador 01 / N, barras de progreso.
 * - Transición: máscara horizontal + desplazamiento + leve escala (sin deformar la imagen).
 * - Teclado (← →), gestos táctiles, vista ampliada con zoom.
 * - Funciona con cualquier cantidad de imágenes.
 */
export function initCarousel(items, { lenis } = {}) {
  const root = $('[data-carousel]');
  if (!root || !items.length) return;

  const slidesEl = $('[data-carousel-slides]', root);
  const stage = $('[data-carousel-stage]', root);
  const progress = $('[data-carousel-progress]', root);
  const elCurrent = $('[data-carousel-current]', root);
  const elTotal = $('[data-carousel-total]', root);
  const elCaption = $('[data-carousel-caption]', root);
  const elBig = $('[data-carousel-bignum]', root);
  const ghostPrev = $('[data-carousel-ghost="prev"]', root);
  const ghostNext = $('[data-carousel-ghost="next"]', root);
  const N = items.length;
  let index = 0;
  let tl = null;

  elTotal.textContent = pad2(N);

  // --- construir slides y barras
  const slides = items.map((it, i) => {
    const s = document.createElement('div');
    s.className = 'slide';
    s.setAttribute('role', 'group');
    s.setAttribute('aria-roledescription', 'diapositiva');
    s.setAttribute('aria-label', `${i + 1} de ${N}`);
    s.innerHTML = `<div class="slide__inner"><img alt="${it.alt}" width="842" height="768" decoding="async" draggable="false" /></div>`;
    slidesEl.appendChild(s);
    return s;
  });
  const bars = items.map((it, i) => {
    const b = document.createElement('button');
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Ilustración ${i + 1}: ${it.caption}`);
    b.addEventListener('click', () => go(i));
    progress.appendChild(b);
    return b;
  });

  const load = (i) => {
    const img = $('img', slides[(i + N) % N]);
    if (!img.src) img.src = items[(i + N) % N].src;
  };

  function updateUI(i) {
    elCurrent.textContent = pad2(i + 1);
    elCaption.textContent = items[i].caption;
    bars.forEach((b, k) => {
      b.setAttribute('aria-selected', k === i ? 'true' : 'false');
      b.tabIndex = k === i ? 0 : -1;
      b.classList.toggle('is-done', k < i);
    });
    ghostPrev.style.backgroundImage = `url("${items[(i - 1 + N) % N].src}")`;
    ghostNext.style.backgroundImage = `url("${items[(i + 1) % N].src}")`;
    [i - 1, i + 1, i + 2].forEach(load);
  }

  function show(i) {
    slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
    load(i);
    updateUI(i);
  }

  function go(next, dir) {
    next = (next + N) % N;
    if (next === index) return;
    dir = dir ?? (next > index ? 1 : -1);
    if (tl) tl.progress(1);
    const from = slides[index];
    const to = slides[next];
    const fromInner = $('.slide__inner', from);
    const toInner = $('.slide__inner', to);
    load(next);
    index = next;
    updateUI(next);

    if (reduced) {
      from.classList.remove('is-active');
      to.classList.add('is-active');
      elBig.textContent = pad2(next + 1);
      return;
    }

    to.classList.add('is-active');
    tl = gsap.timeline({
      defaults: { duration: 0.95, ease: 'expo.inOut' },
      onComplete: () => {
        from.classList.remove('is-active');
        gsap.set([from, fromInner, to, toInner], { clearProps: 'all' });
        tl = null;
      },
    });
    tl.fromTo(from, { clipPath: 'inset(0% 0% 0% 0%)' },
      { clipPath: dir > 0 ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)' }, 0)
      .to(fromInner, { xPercent: -dir * 22, scale: 0.94 }, 0)
      .fromTo(to, { clipPath: dir > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)' }, 0.06)
      .fromTo(toInner, { xPercent: dir * 22, scale: 1.06 }, { xPercent: 0, scale: 1, duration: 1.15, ease: 'expo.out' }, 0.25)
      // número gigante: sale y entra en vertical
      .to(elBig, { yPercent: -dir * 40, autoAlpha: 0, duration: 0.4, ease: 'power2.in', onComplete: () => { elBig.textContent = pad2(next + 1); } }, 0)
      .fromTo(elBig, { yPercent: dir * 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: 'expo.out', immediateRender: false }, 0.42)
      .fromTo(elCaption, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.45);
  }

  const next = () => go(index + 1, 1);
  const prev = () => go(index - 1, -1);
  $('[data-carousel-next]', root).addEventListener('click', next);
  $('[data-carousel-prev]', root).addEventListener('click', prev);

  // teclado
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.key === 'Enter' && e.target === root) openLightbox();
  });

  // gestos táctiles / arrastre
  let sx = 0, sy = 0, down = false, moved = false;
  stage.addEventListener('pointerdown', (e) => { down = true; moved = false; sx = e.clientX; sy = e.clientY; });
  stage.addEventListener('pointermove', (e) => {
    if (down && Math.abs(e.clientX - sx) > 8) moved = true;
  });
  stage.addEventListener('pointerup', (e) => {
    if (!down) return;
    down = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? next() : prev(); return; }
    if (!moved && e.target.tagName === 'IMG') openLightbox();
  });
  stage.addEventListener('pointercancel', () => (down = false));

  // pequeño movimiento al pasar el cursor (inclinación sutil, sin deformar)
  if (finePointer && !reduced) {
    stage.addEventListener('pointermove', (e) => {
      if (tl) return;
      const r = stage.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      const inner = $('.slide.is-active .slide__inner', root);
      if (inner) inner.style.transform = `rotateY(${nx * 5}deg) rotateX(${-ny * 4}deg) translateZ(0)`;
    });
    stage.addEventListener('pointerleave', () => {
      const inner = $('.slide.is-active .slide__inner', root);
      if (inner) inner.style.transform = '';
    });
  }

  // --- lightbox
  const lb = $('[data-lightbox]');
  const lbImg = $('[data-lightbox-img]', lb);
  const lbFrame = $('[data-lightbox-frame]', lb);
  const lbCount = $('[data-lightbox-count]', lb);
  let zoomed = false;

  function setLightbox() {
    lbImg.src = items[index].src;
    lbImg.alt = items[index].alt;
    lbCount.textContent = `${pad2(index + 1)} / ${pad2(N)} — ${items[index].caption}`;
    unzoom();
  }
  function openLightbox() {
    setLightbox();
    lb.showModal();
    lenis?.stop();
  }
  function unzoom() { zoomed = false; lbFrame.classList.remove('is-zoomed'); lbImg.style.transform = ''; }
  $('[data-carousel-zoom]', root).addEventListener('click', openLightbox);
  $('[data-lightbox-close]', lb).addEventListener('click', () => lb.close());
  lb.addEventListener('close', () => lenis?.start());
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
  lbFrame.addEventListener('click', (e) => {
    zoomed = !zoomed;
    lbFrame.classList.toggle('is-zoomed', zoomed);
    if (zoomed) {
      const r = lbImg.getBoundingClientRect();
      lbImg.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
      lbImg.style.transform = 'scale(2.2)';
    } else lbImg.style.transform = '';
  });
  lbFrame.addEventListener('pointermove', (e) => {
    if (!zoomed) return;
    const r = lbFrame.getBoundingClientRect();
    lbImg.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
  });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); setLightbox(); }
    if (e.key === 'ArrowLeft') { prev(); setLightbox(); }
  });

  show(0);
  elBig.textContent = '01';
}
