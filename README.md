# Ruta Merindades en Familia 🥾

PWA (offline-first, mobile-first) para el fin de semana familiar por **Las Merindades (Burgos)**,
del **12 al 13 de septiembre de 2026**, con niñas de 9, 7 y 2 años.

## Qué incluye

- **Pestañas fijas:** Sábado 12 · Domingo 13 · Info útil.
- **Timeline por hitos:** hora, categoría (Cultura, Naturaleza, Comida, Logística, Relax),
  título, descripción y consejo logístico.
- **Badges de logística infantil:** apto carrito / sin carrito, mochila de porteo y tipo de terreno.
- **Botón "Cómo llegar":** abre la navegación en Google Maps
  (`https://www.google.com/maps/dir/?api=1&destination={lat},{lng}`).
- **Checklist persistente:** marca hitos completados; se guarda en `localStorage`
  junto con la última pestaña abierta. Barra de progreso en la cabecera.
- **Offline real:** Service Worker con caché de todos los recursos (incluido el CSS,
  compilado localmente — no depende de ningún CDN). Indicador `OFFLINE` en cabecera.
- **Instalable:** `manifest.json` con iconos (incluido *maskable*) y botón de instalación
  en la pestaña *Info útil*.

## Estructura

```
index.html          Shell de la app (cabecera, pestañas, contenedores)
app.js              Render del timeline, checklist, pestañas, PWA
data.js             ⬅️ Todos los datos del viaje (editar aquí)
styles.css          Estilos propios (categorías, timeline, animaciones)
src.css             Entrada de Tailwind
assets/tailwind.css CSS compilado y versionado (para funcionar sin red)
manifest.json       Manifiesto PWA
sw.js               Service Worker (caché estática)
assets/icons/       Iconos SVG y PNG
```

## Uso en local

El Service Worker necesita `http://` o `https://` (no funciona con `file://`):

```bash
npm start            # sirve en http://localhost:8080
```

## Editar el viaje

Toda la información está en **`data.js`**. Para añadir un hito, copia un objeto de
`activities` dentro del día correspondiente:

```js
{
  "time": "18:00",
  "title": "Nuevo plan",
  "location": "Dónde",
  "category": "naturaleza",     // cultura | naturaleza | comida | logistica | relax
  "lat": 42.9, "lng": -3.6,
  "babyStroller": true,         // ¿pasa el carrito?
  "carrier": false,             // ¿hace falta mochila de porteo?
  "terrain": "llano",           // llano | mixto | empinado | asfalto
  "logisticsTip": "Nota práctica con las niñas.",
  "description": "Descripción breve."
}
```

Tras cambiar clases de Tailwind en `index.html` o `app.js`, recompila el CSS:

```bash
npm install
npm run build:css
```

Al publicar cambios, sube la versión de caché en `sw.js` (`merindades-v1` → `v2`)
para que los dispositivos ya instalados recojan la actualización.
