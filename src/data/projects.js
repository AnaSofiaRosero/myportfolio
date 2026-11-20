/**
 * PROYECTOS
 * ------------------------------------------------------------
 * `cover`: portada original (Behance). Si es null, se usa una portada tipográfica.
 * `href`: destino al hacer clic (Behance o una sección interna).
 * `size`: composición en la galería asimétrica: 'xl' | 'l' | 'm' | 's' | 'tall'
 * No agregar proyectos que no existan.
 */

export const categories = [
  { id: 'branding', label: 'Branding & Graphic Design' },
  { id: 'illustration', label: 'Illustration' },
  { id: 'motion', label: 'Motion & Audiovisual' },
  { id: 'digital', label: 'Digital Experiences' },
  { id: 'uxui', label: 'UX/UI' },
];

export const projects = [
  {
    id: 'garabatos',
    tags: ['Ilustración', 'Cliente real', 'Motion'],
    desc: 'Ilustraciones por encargo aplicadas en tote bags, y animaciones cortas de logotipos y personajes para la marca.',
    title: 'Garabatos',
    kind: 'Ilustración por encargo · Cliente real',
    categories: ['illustration', 'motion'],
    cover: '/__garabatos__', // se reemplaza por la primera tote bag
    href: '#garabatos',
    internal: true,
    size: 'xl',
    tone: 'blush',
  },
  {
    id: 'same-beat',
    tags: ['UX/UI', 'Web app', 'Código'],
    desc: 'App web para conectar con personas que comparten tu gusto musical y descubrir conciertos.',
    title: 'Same Beat',
    kind: 'Aplicación web · Interfaces y programación',
    categories: ['digital', 'uxui'],
    cover: 'assets/samebeat/welcome-desktop.jpg',
    href: '#same-beat',
    internal: true,
    size: 'l',
    tone: 'ink',
  },
  {
    id: 'improvisados',
    tags: ['Branding', 'Naming', 'Evento'],
    desc: 'Identidad visual del naming a las aplicaciones, usada en un evento de ≈400 asistentes durante tres días.',
    title: 'Improvisados',
    kind: 'Identidad visual · Del naming a las aplicaciones',
    categories: ['branding'],
    cover: null, // portada de Behance pendiente
    href: null,  // enlace de Behance pendiente
    size: 'tall',
    tone: 'rose',
  },
  {
    id: 'arroz-congri-roa',
    tags: ['Empaque', 'Branding'],
    desc: 'Diseño de empaque para Arroz Congrí ROA.',
    title: 'Arroz Congrí ROA',
    kind: 'Diseño de empaque',
    categories: ['branding'],
    cover: null,
    href: null,
    size: 'm',
    tone: 'kraft',
  },
  {
    id: 'icesi',
    tags: ['Académico', 'Redes sociales', 'Manual de marca'],
    desc: 'Carrusel de Instagram sobre IA y UX Research aplicando el manual de marca de la Universidad Icesi.',
    title: 'Carrusel Icesi',
    kind: 'Proyecto académico · Manual de marca institucional',
    categories: ['branding', 'digital'],
    cover: 'assets/icesi/icesi-carrusel-960.webp',
    fit: 'contain', // conserva la imagen completa
    href: '#caso-icesi',
    internal: true,
    size: 'l',
    tone: 'paper',
  },
  {
    id: 'tiktok',
    tags: ['Video', 'Edición', 'Contenido'],
    desc: 'Creo, grabo y edito: 11,4K seguidores, 3,8M me gusta y un video con más de 11M de reproducciones.',
    title: 'Contenido para TikTok',
    kind: 'Creación, grabación y edición',
    categories: ['motion'],
    cover: null,
    href: '#audiovisual',
    internal: true,
    size: 's',
    tone: 'ink',
  },
];

/**
 * CASOS DESTACADOS (sección editorial)
 */
export const cases = [
  {
    id: 'caso-improvisados',
    num: '05.1',
    title: 'Improvisados',
    tag: 'Identidad visual',
    summary:
      'Desarrollo de identidad visual completo: desde el naming hasta las aplicaciones de marca.',
    facts: [
      { k: 'Asistentes', v: '≈400', count: 400 },
      { k: 'Duración del evento', v: '3 días', count: 3 },
    ],
    steps: ['Naming', 'Concepto', 'Sistema visual', 'Aplicaciones'],
    images: [], // portadas / láminas de Behance pendientes
    href: null,
    tone: 'rose',
  },
  {
    id: 'caso-roa',
    num: '05.2',
    title: 'Arroz Congrí ROA',
    tag: 'Diseño de empaque',
    summary: 'Proyecto de diseño de empaque para Arroz Congrí ROA.',
    facts: [],
    steps: [],
    images: [],
    href: null,
    tone: 'kraft',
  },
  {
    id: 'caso-icesi',
    num: '05.3',
    title: 'Carrusel Icesi',
    tag: 'Proyecto académico',
    summary:
      'Carrusel de cuatro piezas para Instagram sobre IA y UX Research, aplicando los elementos del Manual de Marca institucional de la Universidad Icesi: paleta, tipografía, mascota y sistema gráfico.',
    facts: [
      { k: 'Piezas', v: '4', count: 4 },
    ],
    steps: ['La IA no reemplazará al UX Researcher', 'Dovetail ayuda a analizar entrevistas', '¿Qué puedes hacer con Dovetail?', 'La IA es una herramienta'],
    images: [
      {
        src: 'assets/icesi/icesi-carrusel-1600.webp',
        srcset: 'assets/icesi/icesi-carrusel-960.webp 960w, assets/icesi/icesi-carrusel-1600.webp 1600w, assets/icesi/icesi-carrusel-2400.webp 2400w',
        alt: 'Carrusel académico de cuatro piezas para Instagram con la identidad de la Universidad Icesi: la IA no reemplazará al UX Researcher, Dovetail ayuda a analizar entrevistas, qué puedes hacer con Dovetail, y la IA es una herramienta, no el reemplazo.',
        ratio: 7793 / 4712,
      },
    ],
    href: null,
    tone: 'paper',
    note: 'Proyecto académico — no corresponde a un encargo institucional.',
  },
];
