import { gsap } from 'gsap';
import { $, $$, finePointer, reduced } from './utils.js';

/** Cursor personalizado con etiquetas contextuales (data-cursor) y elementos magnéticos. */
export function initCursor() {
  if (!finePointer) return;
  const cursor = $('.cursor');
  const dot = $('.cursor__dot', cursor);
  const ring = $('.cursor__ring', cursor);
  const label = $('.cursor__label', cursor);
  document.documentElement.classList.add('has-cursor');

  const dx = gsap.quickTo(dot, 'x', { duration: 0.08 });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.08 });
  const rx = gsap.quickTo(ring, 'x', { duration: reduced ? 0.01 : 0.45, ease: 'power3' });
  const ry = gsap.quickTo(ring, 'y', { duration: reduced ? 0.01 : 0.45, ease: 'power3' });

  window.addEventListener('pointermove', () => gsap.to(cursor, { opacity: 1, duration: 0.3 }), { once: true });
  window.addEventListener('pointermove', (e) => {
    dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
  }, { passive: true });
  window.addEventListener('pointerdown', () => cursor.classList.add('is-down'));
  window.addEventListener('pointerup', () => cursor.classList.remove('is-down'));
  document.addEventListener('mouseleave', () => gsap.to(cursor, { opacity: 0, duration: 0.2 }));
  document.addEventListener('mouseenter', () => gsap.to(cursor, { opacity: 1, duration: 0.2 }));

  document.addEventListener('pointerover', (e) => {
    const t = e.target.closest('[data-cursor], a, button');
    if (!t) return;
    const text = t.dataset.cursor;
    if (text) { label.textContent = text; cursor.classList.add('is-label'); }
    else cursor.classList.add('is-hover');
  });
  document.addEventListener('pointerout', (e) => {
    const t = e.target.closest('[data-cursor], a, button');
    if (!t || t.contains(e.relatedTarget)) return;
    cursor.classList.remove('is-label', 'is-hover');
  });

  if (!reduced) initMagnetic();
}

export function initMagnetic() {
  if (!finePointer) return;
  $$('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });
}
