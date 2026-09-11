# Las Merindades en Familia 🌿

Guía PWA del fin de semana familiar por **Las Merindades (Burgos)**,
**12-13 de septiembre de 2026**. Dos parejas y tres niñas (9, 7 y 3 años).

👉 **App publicada: https://yosulin.github.io/Burgos/**

Base del viaje: **Hotel Rural La Torre de Bisjueces** (C. San Juan 58, Bisjueces).

- **Sábado 12** — encuentro en Tobalina · cascada de Pedrosa · comida en Frías ·
  tarde en Frías y Tobera · noche en Bisjueces
- **Domingo 13** — cueva-ermita de San Bernabé (pase reservado 11:30, 34 €) ·
  comida en Puentedey · puente natural del Nela · despedida

## Qué hace

- **Portada** con el viaje de un vistazo y accesos a ruta, tiempo y hotel.
- **Tarjeta grande por destino:** ilustración, duración, horario orientativo,
  qué ver y botón a Maps. Lo secundario se despliega con *Ver detalles*.
- **Comer** en tarjeta propia, con botones de llamar y Maps por restaurante.
- **Tiempo** de Open-Meteo (sin API key ni servidor), integrado en cada día.
- **Rutas completas** del sábado y del domingo en un solo enlace de Maps,
  y rutas de regreso a Donostia y a Valladolid.
- **Offline:** una vez abierta con conexión funciona sin cobertura.
- **Instalable** en el móvil, con checklist de visitas y de equipaje guardados
  en el propio dispositivo.

## Estructura

```
index.html          Shell: portada, pestañas, barra inferior
app.js              Render de días, tarjetas, info y PWA
data.js             ⬅️ Todo el contenido del viaje (editar aquí)
weather.js          Previsión Open-Meteo + caché offline
styles.css          Sistema visual (tokens propios, sin framework)
sw.js               Service Worker
manifest.json       Manifiesto PWA
assets/images/      Ilustraciones de los destinos
assets/icons/       Iconos de la app
```

Sin dependencias ni paso de compilación: se edita y se sube.

## Imágenes

`assets/images/` contiene **ilustraciones propias en SVG** hechas para esta guía
(Tobalina, Frías, Tobera, Puentedey, Ojo Guareña y la portada). Son placeholders de calidad,
pensados para sustituirse por fotos reales cuando las tengáis:

1. Deja la foto en `assets/images/` (por ejemplo `frias.jpg`, apaisada 16:9).
2. Cambia la ruta en `data.js` (`"image": "assets/images/frias.jpg"`).
3. Añádela a la lista `CORE` de `sw.js` para que también funcione sin conexión.

No se enlazan imágenes externas: todo se sirve desde el propio repositorio.

## Editar el viaje

Todo está en **`data.js`**: horarios, textos, qué ver, restaurantes, teléfonos
y coordenadas. Los horarios son deliberadamente orientativos
(`10:30 aprox.`, `Después de comer`, `Según reserva`).

Al publicar cambios, **sube la versión de caché** en `sw.js`
(`merindades-v5` → `v6`) y el `?v=5` de `index.html`, para que los móviles
que ya tengan la app instalada recojan la versión nueva.

## Publicar

Ya está activo en **https://yosulin.github.io/Burgos/**, sirviendo la raíz de la
rama `claude/pwa-merindades-familia-kumae5` (*Settings → Pages → Deploy from a
branch*). Cada push a esa rama se republica en 1-2 minutos.

## En local

```bash
npm start     # http://localhost:8080
```

El Service Worker necesita `http://` o `https://`: no funciona abriendo el
archivo directamente.
