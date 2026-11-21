import { gsap } from 'gsap';
import { $, $$, reduced, isDev } from './utils.js';
import { slideshowHTML, initSlideshows } from './slideshow.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function initCases(cases) {
  const root = $('[data-cases]');
  if (!root) return;
  const head = `<header class="section-head cases__head">
      <span class="section-head__num mono">(05)</span>
      <h2 class="section-head__title"><span data-split-words>Casos</span> <em data-split-words>a fondo</em></h2>
      <p class="section-head__aside mono" data-reveal>Branding, empaque y diseño institucional académico.</p>
    </header>`;

  root.innerHTML = head + cases.map((c) => {
    const facts = c.facts.length
      ? `<dl class="case__facts">${c.facts.map((f) => `<div><dt class="mono">${esc(f.k)}</dt><dd>${f.count != null ? f.v.replace(String(f.count), `<span data-count-to="${f.count}">${f.count}</span>`) : esc(f.v)}</dd></div>`).join('')}</dl>`
      : '';
    const steps = c.steps.length ? `<ol class="case__steps">${c.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>` : '';
    const cta = c.href ? `<a class="case__cta mono" href="${esc(c.href)}" target="_blank" rel="noopener" data-cursor="Behance ↗">Ver proyecto completo en Behance ↗</a>` : '';
    const pending = isDev && !c.images.length ? '<span class="dev-pending">Imágenes de Behance pendientes</span>' : '';
    const media = c.images.length
      ? `<figure class="case__figure case__show ${c.vertical ? 'case__show--vertical' : ''} tone-${c.tone}">${slideshowHTML(c.images, { fit: c.vertical ? 'contain' : 'cover', label: 'Imágenes de ' + c.title })}</figure>`
      : `<div class="case__poster tone-${c.tone}" aria-hidden="true">
           ${pending}
           <span class="mono">${esc(c.tag)}</span>
           <span class="case__poster-word" style="--len:${Math.max(...c.title.split(' ').map((w) => w.length))}">${esc(c.title)}</span>
           <span class="case__poster-steps mono">${(c.steps.length ? c.steps : [c.tag]).map((s) => `<span>${esc(s)}</span>`).join('')}</span>
         </div>`;

    return `<article class="case" id="${c.id}" aria-labelledby="${c.id}-t">
      <div class="case__aside">
        <span class="case__num mono">(${c.num})</span>
        <h3 class="case__title" id="${c.id}-t">${esc(c.title)}</h3>
        <span class="case__tag mono">${esc(c.tag)}</span>
        <p class="case__summary">${esc(c.summary)}</p>
        ${facts}
        ${steps}
        ${c.note ? `<p class="case__note mono">${esc(c.note)}</p>` : ''}
        ${cta}
      </div>
      <div class="case__media">${media}</div>
    </article>`;
  }).join('');

  initSlideshows(root);
  if (reduced) return;
  $$('.case', root).forEach((el) => {
    const fig = $('.case__figure, .case__poster', el);
    gsap.fromTo(fig, { clipPath: 'inset(18% 10% 18% 10%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 25%', scrub: 0.6 },
    });
    const word = $('.case__poster-word', el);
    if (word) {
      gsap.fromTo(word, { fontVariationSettings: "'wdth' 75, 'wght' 300" }, {
        fontVariationSettings: "'wdth' 100, 'wght' 800", ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'center 40%', scrub: 0.6 },
      });
    }
    gsap.from($$('.case__steps li', el), {
      x: -30, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 70%', once: true },
    });
  });
}
