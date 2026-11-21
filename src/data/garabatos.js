/**
 * GARABATOS — carga automática de todas las tote bags de la carpeta.
 * Para agregar más: soltar el PNG en src/assets/garabatos/ (cualquier cantidad).
 * Las imágenes se muestran tal cual (sin recortes ni cambios de color/proporción).
 */
const files = import.meta.glob('../assets/garabatos/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

export const garabatos = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src], i) => ({
    src,
    caption: '',
    alt: `Tote bag con ilustración por encargo para Garabatos, número ${i + 1}`,
  }));
