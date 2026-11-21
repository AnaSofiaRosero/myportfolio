/**
 * CONFIGURACIÓN CENTRAL DEL PORTAFOLIO
 * ------------------------------------------------------------
 * Todo lo que falta por confirmar está marcado con `null`.
 * Los elementos con `null` no se muestran en producción
 * (en modo desarrollo aparecen como "pendiente" para no olvidarlos).
 */

export const links = {
  behance: 'https://www.behance.net/sofiarosero8',
  adobePortfolio: null, // p. ej. 'https://usuario.myportfolio.com'
  tiktok: 'https://www.tiktok.com/@anx.tz_',
  instagram: null,      // Ana prefiere no publicar su Instagram
  whatsapp: '573222619185', // +57 322 261 9185
  linkedin: null,
  email: null,          // p. ej. 'hola@dominio.com'
  sameBeat: 'https://same-beat.onrender.com/',
};

/**
 * Participación en Same Beat — redactado a partir de lo indicado por Ana.
 * Ajustar con el detalle exacto de responsabilidades.
 */
export const sameBeatRole = [
  'Diseño de interfaces',
  'Programación',
  'Colaboración interdisciplinaria',
];

/**
 * Publicaciones de TikTok / Instagram para la galería audiovisual.
 * Solo enlaces oficiales: se cargan con el reproductor embebido de cada plataforma.
 * { platform: 'tiktok' | 'instagram', url: '...', title: 'Descripción breve' }
 */
export const videos = [
  { platform: 'tiktok', url: 'https://www.tiktok.com/@anx.tz_/video/7534708009935588614', title: 'TikTok 01' },
  { platform: 'tiktok', url: 'https://www.tiktok.com/@anx.tz_/video/7528390257864199430', title: 'TikTok 02' },
  { platform: 'tiktok', url: 'https://www.tiktok.com/@anx.tz_/video/7640899202276510997', title: 'TikTok 03' },
];

/**
 * Herramientas que usas, agrupadas. La sección se muestra cuando haya al menos un grupo.
 * Ejemplo: { group: 'Diseño gráfico', items: ['Illustrator', 'Photoshop'] }
 */
export const tools = [];
