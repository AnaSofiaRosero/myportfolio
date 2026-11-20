import { gsap } from 'gsap';
import { $, $$, reduced } from './utils.js';

export function initSameBeat({ role, url }) {
  const root = $('#same-beat');
  if (!root) return;

  $('[data-samebeat-role]', root).innerHTML = role.map((r) => `<li>${r}</li>`).join('');

  // pantallas del teléfono en ciclo (capturas reales de la app)
  const screen = $('[data-phone-screen]', root);
  const shots = $$('img', screen);
  let k = 0, timer = null;
  const cycle = () => {
    shots[k].classList.remove('is-active');
    k = (k + 1) % shots.length;
    shots[k].classList.add('is-active');
  };
  if (!reduced) timer = setInterval(cycle, 3200);

  // vista en vivo dentro del teléfono (iframe de la app desplegada)
  const btn = $('[data-samebeat-live]', root);
  btn.setAttribute('aria-pressed', 'false');
  btn.addEventListener('click', () => {
    const live = btn.getAttribute('aria-pressed') === 'true';
    if (live) {
      $('iframe', screen)?.remove();
      $('.phone__loading', screen)?.remove();
      btn.setAttribute('aria-pressed', 'false');
      btn.textContent = 'Probar aquí en vivo';
      if (!reduced) timer = setInterval(cycle, 3200);
      return;
    }
    clearInterval(timer);
    const loading = document.createElement('div');
    loading.className = 'phone__loading mono';
    loading.textContent = 'Cargando app…';
    const frame = document.createElement('iframe');
    frame.src = url;
    frame.title = 'Same Beat — aplicación en vivo';
    frame.loading = 'lazy';
    frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
    frame.addEventListener('load', () => loading.remove());
    screen.append(loading, frame);
    btn.setAttribute('aria-pressed', 'true');
    btn.textContent = 'Volver a las capturas';
  });

  if (reduced) return;

  // teléfono: entra girando en 3D con el scroll
  gsap.fromTo($('.phone', root), { rotateY: -28, rotateX: 8, yPercent: 12 }, {
    rotateY: 0, rotateX: 0, yPercent: 0, ease: 'none',
    scrollTrigger: { trigger: $('.samebeat__grid', root), start: 'top 90%', end: 'center 50%', scrub: 0.8 },
  });

  // tira horizontal de pantallas, fijada durante el scroll (escritorio)
  const mm = gsap.matchMedia();
  mm.add('(min-width: 861px)', () => {
    const wrap = $('[data-screens]', root);
    const track = $('[data-screens-track]', root);
    const dist = () => track.scrollWidth - window.innerWidth;
    gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'center center', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
    });
    $$('.screen', track).forEach((s) => {
      gsap.fromTo($('img', s), { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top bottom', end: () => `+=${dist() + innerHeight}`, scrub: true } });
    });
  });
}
