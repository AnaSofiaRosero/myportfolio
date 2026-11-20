// Genera versiones web de imágenes grandes (sin recortar ni alterar proporción).
// Uso: npm run images
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const jobs = [
  {
    src: 'source-assets/icesi-carrusel.png',
    out: 'public/assets/icesi/icesi-carrusel',
    widths: [960, 1600, 2400],
  },
];

for (const job of jobs) {
  mkdirSync(job.out.split('/').slice(0, -1).join('/'), { recursive: true });
  for (const w of job.widths) {
    await sharp(job.src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(`${job.out}-${w}.webp`);
    console.log('✓', `${job.out}-${w}.webp`);
  }
}
