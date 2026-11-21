import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$, reduced, isDev } from './utils.js';

/** Convierte enlaces públicos en el reproductor embebido oficial de cada plataforma. */
function embedSrc(v) {
  if (v.platform === 'tiktok') {
    const id = (v.url.match(/video\/(\d+)/) || [])[1];
    return id ? `https://www.tiktok.com/player/v1/${id}?embed_from=oembed&music_info=1&description=1&rel=0` : null;
  }
  if (v.platform === 'instagram') {
    const m = v.url.match(/instagram\.com\/(p|reel|tv)\/([^/?#]+)/);
    return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed` : null;
  }
  return null;
}

export function initAudiovisual({ videos, links }) {
  const reel = $('[data-reel]');
  const list = videos.length
    ? videos
    : isDev ? [1, 2, 3].map((n) => ({ platform: 'tiktok', url: '', title: `Pendiente: enlace de TikTok o Instagram #${n}`, placeholder: true })) : [];

  // con enlace real: reproductor oficial (mismos permisos que el código de inserción de TikTok)
  // + enlace directo al video por si el navegador bloquea el reproductor
  reel.innerHTML = list.map((v, i) => embedSrc(v) ? `
    <figure class="reel__cell">
      <div class="reel__item ${v.platform === 'instagram' ? 'reel__item--ig' : ''}">
        <iframe src="${embedSrc(v)}" title="${v.title}" loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      <figcaption><a class="reel__open mono" href="${v.url}" target="_blank" rel="noopener">Ver en ${v.platform === 'instagram' ? 'Instagram' : 'TikTok'} ↗</a></figcaption>
    </figure>` : `
    <div class="reel__item ${v.platform === 'instagram' ? 'reel__item--ig' : ''}">
      <button class="reel__facade" data-reel-play="${i}" ${v.placeholder ? 'disabled' : ''} data-cursor="Play" aria-label="Reproducir: ${v.title}">
        <span class="mono">${v.platform === 'instagram' ? 'Instagram' : 'TikTok'} · ${String(i + 1).padStart(2, '0')}</span>
        <span class="reel__play" aria-hidden="true">▶</span>
        <span class="reel__title">${v.title}</span>
      </button>
    </div>`).join('');

  reel.addEventListener('click', (e) => {
    const b = e.target.closest('[data-reel-play]');
    if (!b) return;
    const v = list[+b.dataset.reelPlay];
    const src = embedSrc(v);
    if (!src) { window.open(v.url, '_blank', 'noopener'); return; }
    const f = document.createElement('iframe');
    f.src = src;
    f.title = v.title;
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    b.replaceWith(f);
  });

  // enlaces a perfiles
  const linksEl = $('[data-av-links]');
  const items = [
    ['TikTok', links.tiktok],
    ['Instagram', links.instagram],
  ].filter(([, u]) => u || isDev);
  linksEl.innerHTML = items.map(([l, u]) => u
    ? `<a class="btn btn--ghost" href="${u}" target="_blank" rel="noopener" data-magnetic>${l} <span aria-hidden="true">↗</span></a>`
    : `<span class="btn btn--ghost" style="opacity:.4">${l} — enlace pendiente</span>`).join('');

  // barras de estadística
  $$('.stat').forEach((s) => {
    if (reduced) { s.style.setProperty('--p', 1); return; }
    gsap.to(s, { '--p': 1, duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: s, start: 'top 85%', once: true } });
  });

  if (!reduced) {
    gsap.from('.reel__item', { y: 80, opacity: 0, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: reel, start: 'top 85%', once: true } });
  }
  ScrollTrigger.refresh();
}
