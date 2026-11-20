/**
 * GARABATOS — carga automática de todas las tote bags de la carpeta.
 * Para agregar más: soltar el PNG en src/assets/garabatos/ (cualquier cantidad).
 * Las imágenes se muestran tal cual (sin recortes ni cambios de color/proporción).
 */
const files = import.meta.glob('../assets/garabatos/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

// Descripciones (texto alternativo) por número de archivo.
const descriptions = {
  '02': 'banda de cuatro músicos: bajo, voz, batería y banjo',
  '03': 'personaje corazón comiendo una bandeja paisa',
  '04': 'conejo rosado de traje y gafas',
  '05': 'personaje con gafas de sol rodeado de personajes coloridos',
  '06': 'personajes compartiendo un plato de salchipapas alrededor de una mesa',
  '07': 'guacamaya con camiseta “ara” abrazando a un personaje azul',
  '08': 'koala azul desayunando pandebonos con café',
  '09': 'conejo rosado comiendo una empanada con salsas',
  '10': 'personaje de gafas rojas, cabello largo y vestido café',
  '11': 'conejo de traje abrazando a un personaje de gafas rojas',
  '12': 'personaje corazón con peinado bob y traje ejecutivo',
  '13': 'personaje de cabello rojo sentado junto a un micrófono',
  '14': 'personaje galleta comiendo cereal en una banca',
  '15': 'personaje esponjoso blanco durmiendo en una hamaca',
};

export const garabatos = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src], i) => {
    const key = (path.match(/(\d+)\.\w+$/) || [])[1];
    const desc = descriptions[key];
    return {
      src,
      caption: desc ? desc.charAt(0).toUpperCase() + desc.slice(1) : `Ilustración ${i + 1}`,
      alt: `Tote bag ilustrada para Garabatos: ${desc || `ilustración ${i + 1}`}`,
    };
  });
