import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $$, reduced, splitChars, splitWord, formatNumber } from './utils.js';

/** Revelados genéricos: títulos por letra/palabra, bloques, contadores y marquesina. */
export function initReveals() {
  const outsideHero = (el) => !el.closest('.hero');

  // títulos por letra
  $$('[data-split]').filter(outsideHero).forEach((el) => {
    const chars = splitChars(el);
    if (reduced) return;
    gsap.from(chars, {
      yPercent: 110, rotate: 6, duration: 1.2, stagger: 0.03, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // títulos por palabra (se agrupan por título padre)
  const groups = new Map();
  $$('[data-split-words]').forEach((el) => {
    const w = splitWord(el);
    const parent = el.closest('h2, h3') || el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(w);
  });
  if (!reduced) {
    groups.forEach((words, parent) => {
      gsap.from(words, {
        yPercent: 110, duration: 1.1, stagger: 0.06, ease: 'expo.out',
        scrollTrigger: { trigger: parent, start: 'top 88%', once: true },
      });
    });
  }

  // bloques
  if (!reduced) {
    ScrollTrigger.batch($$('[data-reveal]').filter(outsideHero), {
      start: 'top 90%', once: true,
      onEnter: (els) => gsap.fromTo(els, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.08, ease: 'expo.out' }),
    });
    gsap.set($$('[data-reveal]').filter(outsideHero), { autoAlpha: 0 });
  }

  // contadores
  $$('[data-count-to]').forEach((el) => {
    const to = parseFloat(el.dataset.countTo);
    const dec = parseInt(el.dataset.decimals || '0', 10);
    el.textContent = formatNumber(reduced ? to : 0, dec);
    if (reduced) return;
    const o = { v: 0 };
    gsap.to(o, {
      v: to, duration: 2.2, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = formatNumber(o.v, dec)),
    });
  });

  // marquesina: velocidad + dirección según el scroll
  const track = document.querySelector('[data-marquee]');
  if (track && !reduced) {
    track.innerHTML += track.innerHTML; // duplicar para bucle continuo
    track.setAttribute('aria-hidden', 'true');
    const tween = gsap.to(track, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
    ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity() / 300;
        gsap.to(tween, { timeScale: (self.direction > 0 ? 1 : -1) * Math.min(6, 1 + Math.abs(v)), duration: 0.3, overwrite: true });
        gsap.to(track, { skewX: gsap.utils.clamp(-8, 8, -v * 0.6), duration: 0.4, overwrite: 'auto' });
      },
    });
  }
}
