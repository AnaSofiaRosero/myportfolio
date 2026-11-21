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

  initScreens(root);

  if (reduced) return;

  // teléfono: entra girando en 3D con el scroll
  gsap.fromTo($('.phone', root), { rotateY: -28, rotateX: 8, yPercent: 12 }, {
    rotateY: 0, rotateX: 0, yPercent: 0, ease: 'none',
    scrollTrigger: { trigger: $('.samebeat__grid', root), start: 'top 90%', end: 'center 50%', scrub: 0.8 },
  });
}

/**
 * Pantallas en tablet: carrusel con flechas. La pantalla activa va al centro
 * y las vecinas se asoman a los lados. No bloquea el scroll de la página.
 */
function initScreens(root) {
  const wrap = $('[data-screens]', root);
  const track = $('[data-screens-track]', root);
  const slides = $$('.screen', track);
  const counter = $('[data-screens-count]', root);
  if (!slides.length) return;
  let i = 0;

  const go = (k, instant = false) => {
    i = Math.max(0, Math.min(slides.length - 1, k));
    const s = slides[i];
    const x = wrap.clientWidth / 2 - (s.offsetLeft + s.offsetWidth / 2);
    gsap.to(track, { x, duration: instant || reduced ? 0 : 0.9, ease: 'expo.out' });
    slides.forEach((el, n) => {
      el.classList.toggle('is-active', n === i);
      el.setAttribute('aria-hidden', n === i ? 'false' : 'true');
    });
    counter.textContent = `${String(i + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    $('[data-screens-prev]', root).disabled = i === 0;
    $('[data-screens-next]', root).disabled = i === slides.length - 1;
  };

  $('[data-screens-prev]', root).addEventListener('click', () => go(i - 1));
  $('[data-screens-next]', root).addEventListener('click', () => go(i + 1));
  slides.forEach((s, n) => s.addEventListener('click', () => n !== i && go(n)));
  wrap.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
  });

  // deslizar en celular
  let sx = 0, sy = 0;
  wrap.addEventListener('pointerdown', (e) => { sx = e.clientX; sy = e.clientY; });
  wrap.addEventListener('pointerup', (e) => {
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(i + (dx < 0 ? 1 : -1));
  });

  go(0, true);
  window.addEventListener('resize', () => go(i, true));
  window.addEventListener('load', () => go(i, true));
}
