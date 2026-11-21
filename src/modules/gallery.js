import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { $, $$, reduced, isDev, pad2 } from './utils.js';
import { slideshowHTML, initSlideshows } from './slideshow.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function cardHTML(p, i, categories) {
  const cover = p.slides?.length > 0;
  const catLabels = p.categories.map((c) => categories.find((x) => x.id === c)?.label).filter(Boolean).join(' · ');
  const tag = p.href ? 'a' : 'div';
  const external = p.href && !p.internal;
  const attrs = p.href
    ? `href="${esc(p.href)}" ${external ? 'target="_blank" rel="noopener"' : ''} data-cursor="${external ? 'Behance ↗' : 'Ver'}"`
    : 'aria-disabled="true"';

  const media = cover
    ? slideshowHTML(p.slides, { fit: p.fit || 'cover', interactive: false })
    : `<div class="typo-cover tone-${p.tone}">
         <span class="typo-cover__word" style="--len:${Math.max(...p.title.split(' ').map((w) => w.length))}">${esc(p.title)}</span>
       </div>`;
  const pending = isDev && !p.internal && (!p.href || !cover) ? `<span class="dev-pending">${!cover ? 'Portada Behance pendiente' : 'Enlace pendiente'}</span>` : '';

  const chips = (p.tags || []).map((t) => `<li>${esc(t)}</li>`).join('');

  return `<${tag} class="card" data-cats="${p.categories.join(' ')}" ${attrs}>
    <div class="card__media tone-${p.tone}">
      ${media}
      ${pending}
      <span class="card__num mono" aria-hidden="true">${pad2(i + 1)}</span>
      <span class="card__mask" aria-hidden="true"></span>
    </div>
    <div class="card__body">
      <ul class="card__tags mono" aria-label="Categorías">${chips}</ul>
      <h3 class="card__title">${esc(p.title)}</h3>
      <p class="card__desc">${esc(p.desc || p.kind)}</p>
      <span class="card__go" aria-hidden="true">${external ? '↗' : '→'}</span>
    </div>
  </${tag}>`;
}

export function initGallery({ projects, categories }) {
  gsap.registerPlugin(Flip);
  const gallery = $('[data-gallery]');
  const filters = $('[data-filters]');
  const empty = $('[data-gallery-empty]');

  gallery.innerHTML = projects.map((p, i) => cardHTML(p, i, categories)).join('');

  const all = [{ id: 'all', label: 'Todo' }, ...categories];
  filters.innerHTML = all.map((c) => {
    const n = c.id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(c.id)).length;
    return `<button class="filter" aria-pressed="${c.id === 'all'}" data-filter="${c.id}">${esc(c.label)}<sup>${n}</sup></button>`;
  }).join('');

  const cards = $$('.card', gallery);
  initSlideshows(gallery);

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const f = btn.dataset.filter;
    $$('[data-filter]', filters).forEach((b) => b.setAttribute('aria-pressed', b === btn));
    const state = Flip.getState(cards);
    let visible = 0;
    cards.forEach((c) => {
      const show = f === 'all' || c.dataset.cats.split(' ').includes(f);
      c.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    empty.hidden = visible > 0;
    if (reduced) return;
    Flip.from(state, {
      duration: 0.8, ease: 'expo.inOut', absolute: true, scale: false,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.25 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.4 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  });

  // revelado por máscara al entrar en pantalla
  if (reduced) {
    $$('.card__mask', gallery).forEach((m) => m.remove());
    return;
  }
  cards.forEach((card) => {
    const mask = $('.card__mask', card);
    const img = $('.card__media .ss, .typo-cover__word', card);
    const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
    tl.to(mask, { scaleY: 0, duration: 1.2, ease: 'expo.inOut' })
      .from(img, { scale: 1.35, duration: 1.6, ease: 'expo.out', clearProps: 'transform' }, 0.2)
      .from($('.card__body', card), { y: 30, opacity: 0, duration: 0.9, ease: 'expo.out' }, 0.4);
  });
}
