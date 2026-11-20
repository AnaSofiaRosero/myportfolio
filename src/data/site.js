/**
 * CONFIGURACIÓN CENTRAL DEL PORTAFOLIO
 * ------------------------------------------------------------
 * Todo lo que falta por confirmar está marcado con `null`.
 * Los elementos con `null` no se muestran en producción
 * (en modo desarrollo aparecen como "pendiente" para no olvidarlos).
 */

export const links = {
  behance: null,        // p. ej. 'https://www.behance.net/usuario'
  adobePortfolio: null, // p. ej. 'https://usuario.myportfolio.com'
  tiktok: null,         // p. ej. 'https://www.tiktok.com/@usuario'
  instagram: null,      // p. ej. 'https://www.instagram.com/usuario'
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
export const videos = [];

/**
 * Herramientas que usas, agrupadas. La sección se muestra cuando haya al menos un grupo.
 * Ejemplo: { group: 'Diseño gráfico', items: ['Illustrator', 'Photoshop'] }
 */
export const tools = [];
