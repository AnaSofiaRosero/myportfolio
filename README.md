# Portafolio — Ana Sofía Rosero

Sitio estático hecho con **Vite + GSAP (ScrollTrigger, Flip) + Lenis**.

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # genera /dist listo para publicar (Netlify, Vercel, GitHub Pages…)
```

## Dónde se edita el contenido
| Qué | Archivo |
|---|---|
| Enlaces (Behance, TikTok, Instagram, correo…) y participación en Same Beat | `src/data/site.js` |
| Videos de TikTok / Instagram (enlaces oficiales) | `src/data/site.js` → `videos` |
| Proyectos de la galería y casos (portadas de Behance) | `src/data/projects.js` |
| Tote bags de Garabatos | soltar los PNG en `src/assets/garabatos/` (se cargan todos automáticamente) |
| Fotografía personal | `index.html`, bloque `.about__photo` (reemplazar el espacio reservado por `<img>`) |

En modo desarrollo, lo que falta aparece con etiquetas amarillas "pendiente". En la build de producción esos elementos no se muestran.

Las capturas de Same Beat (`public/assets/samebeat/`) se tomaron de las pantallas públicas de https://same-beat.onrender.com/ (bienvenida, registro e inicio de sesión).
