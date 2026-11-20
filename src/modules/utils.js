export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
export const isDev = import.meta.env.DEV;

export const $ = (s, c = document) => c.querySelector(s);
export const $$ = (s, c = document) => [...c.querySelectorAll(s)];
export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const pad2 = (n) => String(n).padStart(2, '0');

/** Divide un elemento en caracteres envueltos en máscaras. Mantiene accesible el texto. */
export function splitChars(el, charClass = 'split-char') {
  if (el.dataset.splitDone) return $$('.' + charClass, el);
  const text = el.textContent;
  el.setAttribute('aria-label', text.trim());
  el.textContent = '';
  const line = document.createElement('span');
  line.className = 'split-line';
  line.setAttribute('aria-hidden', 'true');
  for (const ch of text) {
    const s = document.createElement('span');
    s.className = charClass;
    s.textContent = ch === ' ' ? ' ' : ch;
    line.appendChild(s);
  }
  el.appendChild(line);
  el.dataset.splitDone = '1';
  return $$('.' + charClass, el);
}

/** Envuelve una palabra (o grupo corto) en máscara para revelado vertical. */
export function splitWord(el) {
  if (el.dataset.splitDone) return el.querySelector('.split-word');
  const inner = document.createElement('span');
  inner.className = 'split-word';
  while (el.firstChild) inner.appendChild(el.firstChild);
  el.classList.add('split-line');
  el.appendChild(inner);
  el.dataset.splitDone = '1';
  return inner;
}

export function formatNumber(n, decimals = 0) {
  return n.toFixed(decimals).replace('.', ',');
}
