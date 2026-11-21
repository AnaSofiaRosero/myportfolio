import './styles/main.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { $, $$, reduced, isDev } from './modules/utils.js';
import { runLoader } from './modules/loader.js';
import { initCursor } from './modules/cursor.js';
import { initHero } from './modules/hero.js';
import { initReveals } from './modules/reveal.js';
import { initGallery } from './modules/gallery.js';
import { initCarousel } from './modules/carousel.js';
import { initSameBeat } from './modules/samebeat.js';
import { initAudiovisual } from './modules/audiovisual.js';
import { initCases } from './modules/cases.js';

import { links, sameBeatRole, videos, tools } from './data/site.js';
import { projects, categories, cases } from './data/projects.js';
import { garabatos } from './data/garabatos.js';

gsap.registerPlugin(ScrollTrigger);
if (reduced) document.documentElement.classList.add('reduced');

// ---------- scroll suave (desactivado con movimiento reducido)
let lenis = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

// ---------- navegación
const menu = $('#menu');
const toggle = $('[data-menu-toggle]');
function setMenu(open) {
  toggle.setAttribute('aria-expanded', open);
  $('.sr-only', toggle).textContent = open ? 'Cerrar menú' : 'Abrir menú';
  if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add('is-open')); lenis?.stop(); }
  else { menu.classList.remove('is-open'); lenis?.start(); setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 700); }
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  const target = id === '#top' ? document.body : $(id);
  if (!target) return;
  e.preventDefault();
  if (menu.classList.contains('is-open')) setMenu(false);
  if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else target.scrollIntoView();
  history.replaceState(null, '', id);
  if (target !== document.body) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
});

// ---------- contenido dinámico
initGallery({ projects, categories });
initCases(cases);
initCarousel(garabatos, { lenis });
initSameBeat({ role: sameBeatRole, url: links.sameBeat });
initAudiovisual({ videos, links });

// herramientas
const toolsEl = $('[data-tools]');
if (tools.length || isDev) {
  toolsEl.hidden = false;
  $('[data-tools-groups]').innerHTML = tools.length
    ? tools.map((t) => `<div class="tools__group"><h3 class="mono">${t.group}</h3><ul>${t.items.map((i) => `<li>${i}</li>`).join('')}</ul></div>`).join('')
    : '<p class="mono"><span class="dev-pending" style="position:static">Pendiente: lista de herramientas (src/data/site.js → tools)</span></p>';
} else toolsEl.remove();

// contacto
const contactItems = [
  ['Correo', links.email && `mailto:${links.email}`, links.email],
  ['Behance', links.behance],
  ['Instagram', links.instagram],
  ['TikTok', links.tiktok],
  ['LinkedIn', links.linkedin],
  ['Adobe Portfolio', links.adobePortfolio],
].filter(([, u]) => u || isDev);
$('[data-contact-links]').innerHTML = contactItems.map(([label, url, text]) => url
  ? `<li><a href="${url}" ${url.startsWith('mailto') ? '' : 'target="_blank" rel="noopener"'} data-cursor="Abrir"><span>${text || label}</span><span aria-hidden="true">↗</span></a></li>`
  : `<li><span class="is-pending"><span>${label}</span><span class="mono">enlace pendiente</span></span></li>`).join('');

// reloj local del visitante
const clock = $('[data-clock]');
const tickClock = () => (clock.textContent = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }));
tickClock(); setInterval(tickClock, 30000);

// ---------- movimiento
initCursor();
const playHeroIntro = initHero();
initReveals();

// enlace activo en la navegación
$$('main > section[id]').forEach((sec) => {
  const link = $(`.nav__links a[href="#${sec.id}"]`);
  if (!link) return;
  ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%', onToggle: (s) => link.classList.toggle('is-active', s.isActive) });
});

// título "kinetic" del contacto: ondulación de peso al entrar
$$('.contact [data-kinetic]').forEach((el) => {
  const text = el.textContent; el.setAttribute('aria-label', text); el.textContent = '';
  const chars = [...text].map((ch) => { const s = document.createElement('span'); s.className = 'k-char'; s.setAttribute('aria-hidden', 'true'); s.textContent = ch; el.appendChild(s); return s; });
  if (reduced) return;
  gsap.fromTo(chars, { '--w': 200, '--wd': 75 }, {
    '--w': 800, '--wd': 100, stagger: { each: 0.05, from: 'center' }, ease: 'none',
    scrollTrigger: { trigger: '.contact', start: 'top 85%', end: 'top 25%', scrub: 0.8 },
  });
});

runLoader().then(() => {
  playHeroIntro();
  ScrollTrigger.refresh();
});

window.addEventListener('load', () => ScrollTrigger.refresh());
