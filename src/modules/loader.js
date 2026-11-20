import { gsap } from 'gsap';
import { $, reduced, pad2 } from './utils.js';

/** Pantalla de entrada: contador + barra, y cortina que se abre hacia arriba. */
export function runLoader() {
  const el = $('.loader');
  document.body.classList.remove('is-loading');
  if (!el || reduced) {
    el?.remove();
    return Promise.resolve();
  }
  document.body.classList.add('is-loading');
  const count = $('[data-loader-count]', el);
  const bar = $('.loader__bar span', el);
  const mark = $('.loader__mark', el);
  const state = { p: 0 };

  return new Promise((resolve) => {
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    const tl = gsap.timeline({ paused: true });
    tl.from(mark, { yPercent: 40, opacity: 0, duration: 0.8, ease: 'expo.out' }, 0)
      .to(state, {
        p: 100, duration: 1.3, ease: 'power2.inOut',
        onUpdate: () => {
          count.textContent = pad2(Math.round(state.p));
          bar.style.transform = `scaleX(${state.p / 100})`;
        },
      }, 0)
      .to(mark, { letterSpacing: '0.1em', duration: 1.3, ease: 'power2.inOut' }, 0);

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      document.body.classList.remove('is-loading');
      resolve();
      gsap.to(el, {
        clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut',
        onComplete: () => el.remove(),
      });
      setTimeout(() => el.isConnected && el.remove(), 1600); // seguro si la pestaña está en segundo plano
    };
    fontsReady.then(() => tl.play().then(finish));
    setTimeout(finish, 3500); // nunca bloquear el contenido
  });
}
