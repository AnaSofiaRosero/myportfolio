// Genera versiones web de las imágenes (sin recortar ni deformar).
// Uso: npm run images
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';

const SRC = 'source-assets/projects';
const OUT = 'public/assets/projects';

// 1) Carrusel Icesi original (versiones responsive)
for (const w of [960, 1600, 2400]) {
  mkdirSync('public/assets/icesi', { recursive: true });
  await sharp('source-assets/icesi-carrusel.png').resize({ width: w, withoutEnlargement: true })
    .webp({ quality: 90 }).toFile(`public/assets/icesi/icesi-carrusel-${w}.webp`);
}

if (!existsSync(SRC)) process.exit(0);

// 2) Fotos de proyectos → webp de máx. 1600 px de ancho
const photos = {
  garabatos: ['Todas-04 1.png', 'Slide 16_9 - 21.png'],
  improvisados: ['improvisados-05 esta.png', 'improvisados-17 esta.png', 'improvisados-19 esta.png'],
  'arroz roa': ['arroz roa 1.png', 'arroz roa 2.png', 'arroz roa 3.png', 'arroz roa 4.png'],
  // 7.png es idéntica a 5.png → se omite
  'same beat': ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
};
const slug = (s) => s.replace(/\s+/g, '-');

for (const [dir, files] of Object.entries(photos)) {
  mkdirSync(`${OUT}/${slug(dir)}`, { recursive: true });
  for (const [i, f] of files.entries()) {
    const out = `${OUT}/${slug(dir)}/${i + 1}.webp`;
    await sharp(`${SRC}/${dir}/${f}`).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 86 }).toFile(out);
    console.log('✓', out);
  }
}

// 3) GIF de la mascota de Garabatos → WebP animado (mucho más liviano)
await sharp(`${SRC}/garabatos/mascota de garabatos saludando.gif`, { animated: true })
  .resize({ width: 800 })
  .webp({ quality: 72, effort: 5 })
  .toFile(`${OUT}/garabatos/mascota.webp`);
console.log('✓ mascota.webp');

// 4) Publicación Icesi: cada pieza dentro del mockup de Instagram
// El espacio vacío del mockup va de y=392 a y=1746 (1355 px) y mide 1254 px de ancho.
mkdirSync(`${OUT}/icesi`, { recursive: true });
const frames = ['Frame 1.png', 'Frame 3.png', 'Frame 5.png', 'Frame 7.png'];
for (const [i, f] of frames.entries()) {
  const post = await sharp(`${SRC}/publicacion icesi/${f}`).resize(1254, 1254, { fit: 'contain' }).toBuffer();
  const full = await sharp(`${SRC}/publicacion icesi/Mockup para poner cada una.png`)
    .composite([{ input: post, left: 0, top: 392 + Math.round((1355 - 1254) / 2) }])
    .png().toBuffer();
  await sharp(full).resize({ width: 900 })
    .webp({ quality: 88 })
    .toFile(`${OUT}/icesi/${i + 1}.webp`);
  console.log('✓ icesi', i + 1);
}
