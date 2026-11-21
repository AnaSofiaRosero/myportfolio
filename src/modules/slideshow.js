import { $$ } from './utils.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** HTML de una presentación de fotos que se pasan solas. */
export function slideshowHTML(slides, { fit = 'cover', label = '', captions = false, interactive = true } = {}) {
  const imgs = slides.map((s, i) => `<img src="${esc(s.src)}" alt="${esc(s.alt || '')}" class="${i === 0 ? 'is-active' : ''}" ${i ? 'loading="lazy"' : ''} decoding="async" draggable="false" />`).join('');
  const dots = slides.length < 2 ? ''
    : !interactive
      ? `<div class="ss__dots" aria-hidden="true">${slides.map((x, i) => `<span aria-selected="${i === 0}"></span>`).join('')}</div>`
      : `<div class="ss__dots" role="tablist" aria-label="${esc(label)}">${slides.map((s, i) => `<button role="tab" aria-label="Imagen ${i + 1} de ${slides.length}" aria-selected="${i === 0}"></button>`).join('')}</div>`;
  const cap = captions ? `<span class="ss__caption mono" aria-live="off">${esc(slides[0]?.caption || '')}</span>` : '';
  return `<div class="ss ss--${fit}" data-slideshow data-captions="${captions}">${imgs}${cap}${dots}</div>`;
}

/**
 * Activa todas las presentaciones: avanzan solas solo cuando están en pantalla,
 * se pausan con el cursor encima y no avanzan solas con "reducir movimiento".
 */
export function initSlideshows(root = document, slidesData = new Map()) {
  $$('[data-slideshow]:not([data-ss-ready])', root).forEach((el, n) => {
    el.dataset.ssReady = '1';
    const imgs = $$('img', el);
    const dots = $$('.ss__dots > *', el);
    const cap = el.querySelector('.ss__caption');
    if (imgs.length < 2) return;
    let i = 0, timer = null, visible = false;
    const delay = 3200 + (n % 4) * 350; // desfasadas para que no cambien todas a la vez

    const show = (k) => {
      imgs[i].classList.remove('is-active');
      dots[i]?.setAttribute('aria-selected', 'false');
      i = (k + imgs.length) % imgs.length;
      imgs[i].classList.add('is-active');
      dots[i]?.setAttribute('aria-selected', 'true');
      if (cap) cap.textContent = imgs[i].dataset.caption || '';
      // precargar la siguiente
      const nx = imgs[(i + 1) % imgs.length];
      if (nx.loading === 'lazy') nx.loading = 'eager';
    };
    const stop = () => { clearInterval(timer); timer = null; };
    // siempre avanzan solas mientras estén en pantalla (con "reducir movimiento" solo cambia el fundido, sin zoom)
    const start = () => { if (!timer && visible) timer = setInterval(() => show(i + 1), delay); };

    dots.filter((d) => d.tagName === 'BUTTON').forEach((d, k) => d.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); show(k); stop(); start(); }));
    new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) imgs.forEach((im) => { im.loading = 'eager'; }); // cargar todas al aparecer
      visible ? start() : stop();
    }, { threshold: 0.15 }).observe(el);
  });
}

/** Copia los textos de cada imagen para las leyendas. */
export function attachCaptions(el, slides) {
  $$('img', el).forEach((img, k) => { if (slides[k]?.caption) img.dataset.caption = slides[k].caption; });
}
