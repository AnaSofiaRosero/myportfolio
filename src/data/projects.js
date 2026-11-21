/**
 * PROYECTOS
 * ------------------------------------------------------------
 * `slides`: imágenes que se pasan solas en la tarjeta (la primera es la portada).
 *   Si no hay slides, se usa una portada tipográfica.
 * `fit: 'contain'`: muestra la imagen completa (para mockups verticales).
 * `href`: destino al hacer clic (Behance o una sección interna).
 * No agregar proyectos que no existan.
 */

const P = 'assets/projects';

export const categories = [
  { id: 'branding', label: 'Branding & Graphic Design' },
  { id: 'illustration', label: 'Illustration' },
  { id: 'motion', label: 'Motion & Audiovisual' },
  { id: 'digital', label: 'Digital Experiences' },
  { id: 'uxui', label: 'UX/UI' },
];

const slides = {
  garabatos: [
    { src: `${P}/garabatos/1.webp`, alt: 'Cuatro tote bags ilustradas para Garabatos colgadas sobre fondo azul' },
    { src: `${P}/garabatos/2.webp`, alt: 'Caja de empaque amarilla de Garabatos con la mascota ilustrada' },
    { src: `${P}/garabatos/mascota.webp`, alt: 'Animación de la mascota de Garabatos saludando en el taller' },
  ],
  sameBeat: [
    { src: `${P}/same-beat/1.webp`, alt: 'Same Beat en tablet: pantalla de registro', caption: 'Registro' },
    { src: `${P}/same-beat/2.webp`, alt: 'Same Beat en tablet: pantalla de bienvenida con tarjetas', caption: 'Bienvenida' },
    { src: `${P}/same-beat/3.webp`, alt: 'Same Beat en tablet: selección de géneros musicales', caption: 'Géneros musicales' },
    { src: `${P}/same-beat/4.webp`, alt: 'Same Beat en tablet: sugerencias de música y personas', caption: 'Música y sugerencias' },
    { src: `${P}/same-beat/5.webp`, alt: 'Same Beat en tablet: conciertos cercanos y en todas partes', caption: 'Conciertos' },
    { src: `${P}/same-beat/6.webp`, alt: 'Same Beat en tablet: chats, comunidades y mapa en vivo', caption: 'Chats y comunidades' },
  ],
  improvisados: [
    { src: `${P}/improvisados/1.webp`, alt: 'Tarjeta de presentación de Improvisados sobre discos de vinilo' },
    { src: `${P}/improvisados/2.webp`, alt: 'Tarjetas de presentación de Improvisados, frente y reverso' },
    { src: `${P}/improvisados/3.webp`, alt: 'Merchandising de Improvisados: camiseta, gorro, bolsa y vaso' },
  ],
  roa: [
    { src: `${P}/arroz-roa/1.webp`, alt: 'Empaque de Arroz Congrí ROA, frente y reverso, sobre una mesa de supermercado' },
    { src: `${P}/arroz-roa/2.webp`, alt: 'Mujer cocinando con el empaque de Arroz Congrí ROA' },
    { src: `${P}/arroz-roa/3.webp`, alt: 'Empaque de Arroz Congrí ROA sobre fondo de arroz congrí' },
    { src: `${P}/arroz-roa/4.webp`, alt: 'Empaque de Arroz Congrí ROA frente a una calle de La Habana' },
  ],
  icesi: [
    { src: `${P}/icesi/1.webp`, alt: 'Pieza 1 en mockup de Instagram: La IA no reemplazará al UX Researcher' },
    { src: `${P}/icesi/2.webp`, alt: 'Pieza 2 en mockup de Instagram: Dovetail ayuda a analizar entrevistas más rápido' },
    { src: `${P}/icesi/3.webp`, alt: 'Pieza 3 en mockup de Instagram: ¿Qué puedes hacer con Dovetail?' },
    { src: `${P}/icesi/4.webp`, alt: 'Pieza 4 en mockup de Instagram: La IA es una herramienta, no el reemplazo' },
  ],
};
export { slides };

export const projects = [
  {
    id: 'garabatos',
    title: 'Garabatos',
    tags: ['Ilustración', 'Cliente real', 'Motion'],
    desc: 'Ilustraciones por encargo aplicadas en tote bags, y animaciones cortas de logotipos y personajes para la marca.',
    categories: ['illustration', 'motion'],
    slides: slides.garabatos,
    href: '#garabatos',
    internal: true,
    tone: 'blush',
  },
  {
    id: 'same-beat',
    title: 'Same Beat',
    tags: ['UX/UI', 'Web app', 'Código'],
    desc: 'App web para conectar con personas que comparten tu gusto musical y descubrir conciertos.',
    categories: ['digital', 'uxui'],
    slides: slides.sameBeat,
    href: '#same-beat',
    internal: true,
    tone: 'ink',
  },
  {
    id: 'improvisados',
    title: 'Improvisados',
    tags: ['Branding', 'Naming', 'Evento'],
    desc: 'Identidad visual del naming a las aplicaciones, usada en un evento de ≈400 asistentes durante tres días.',
    categories: ['branding'],
    slides: slides.improvisados,
    href: '#caso-improvisados',
    internal: true,
    tone: 'ink',
  },
  {
    id: 'arroz-congri-roa',
    title: 'Arroz Congrí ROA',
    tags: ['Empaque', 'Branding'],
    desc: 'Diseño de empaque para Arroz Congrí ROA.',
    categories: ['branding'],
    slides: slides.roa,
    href: '#caso-roa',
    internal: true,
    tone: 'ink',
  },
  {
    id: 'icesi',
    title: 'Carrusel Icesi',
    tags: ['Académico', 'Redes sociales', 'Manual de marca'],
    desc: 'Carrusel de Instagram sobre IA y UX Research aplicando el manual de marca de la Universidad Icesi.',
    categories: ['branding', 'digital'],
    // presentación completa (llena el cuadro); el caso muestra cada pieza en el teléfono
    slides: [{ src: 'assets/icesi/icesi-carrusel-1600.webp', alt: 'Carrusel Icesi: las cuatro piezas y el mockup de Instagram' }],
    href: '#caso-icesi',
    internal: true,
    tone: 'paper',
  },
  {
    id: 'tiktok',
    title: 'Contenido para TikTok',
    tags: ['Video', 'Edición', 'Contenido'],
    desc: 'Creo, grabo y edito: 11,4K seguidores, 3,8M me gusta y un video con más de 11M de reproducciones.',
    categories: ['motion'],
    slides: [],
    href: '#audiovisual',
    internal: true,
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
    summary: 'Desarrollo de identidad visual completo: desde el naming hasta las aplicaciones de marca.',
    facts: [
      { k: 'Asistentes', v: '≈400', count: 400 },
      { k: 'Duración del evento', v: '3 días', count: 3 },
    ],
    steps: ['Naming', 'Concepto', 'Sistema visual', 'Aplicaciones'],
    images: slides.improvisados,
    href: null,
    tone: 'ink',
  },
  {
    id: 'caso-roa',
    num: '05.2',
    title: 'Arroz Congrí ROA',
    tag: 'Diseño de empaque',
    summary: 'Proyecto de diseño de empaque para Arroz Congrí ROA.',
    facts: [],
    steps: [],
    images: slides.roa,
    href: null,
    tone: 'ink',
  },
  {
    id: 'caso-icesi',
    num: '05.3',
    title: 'Carrusel Icesi',
    tag: 'Proyecto académico',
    summary:
      'Carrusel de cuatro piezas para Instagram sobre IA y UX Research, aplicando los elementos del Manual de Marca institucional de la Universidad Icesi: paleta, tipografía, mascota y sistema gráfico.',
    facts: [{ k: 'Piezas', v: '4', count: 4 }],
    steps: ['La IA no reemplazará al UX Researcher', 'Dovetail ayuda a analizar entrevistas', '¿Qué puedes hacer con Dovetail?', 'La IA es una herramienta'],
    images: slides.icesi,
    vertical: true,
    href: null,
    tone: 'icesi',
    note: 'Proyecto académico — no corresponde a un encargo institucional.',
  },
];
