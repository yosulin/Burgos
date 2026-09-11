/* Service Worker de la guía.
   Los recursos se piden con ?v=N desde index.html: así, cuando se publica
   una versión nueva, el Service Worker antiguo ya instalado en un móvil no
   puede servir el script viejo desde su caché y se descarga el nuevo. Las
   comparaciones de caché ignoran esa query (ignoreSearch).
   - Datos y código (data.js, app.js, index.html): RED PRIMERO,
     para que una actualización se vea en cuanto haya cobertura, con la
     copia en caché como respaldo inmediato si no hay red.
   - Estilos, imágenes e iconos: CACHÉ PRIMERO, revalidando en segundo plano.
   - Todo lo externo (Google Maps) va directo a la red y nunca se cachea. */

const CACHE = 'merindades-v13';

const CORE = [
  './',
  './index.html',
  './styles.css',
  './data.js',
  './app.js',
  './manifest.json',
  './assets/images/hero.svg',
  './assets/images/mapa.svg',
  './assets/images/frias.jpg',
  './assets/images/tobera.jpg',
  './assets/images/tobalina.webp',
  './assets/images/ojoguarena.jpg',
  './assets/images/puentedey.jpg',
  './assets/icons/icon.svg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png'
];

/* Ficheros que deben actualizarse en cuanto haya conexión. */
const FRESH = ['/data.js', '/app.js', '/index.html', '/styles.css'];

const esCritico = (url) =>
  url.pathname === '/' || FRESH.some((f) => url.pathname.endsWith(f));

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // Open-Meteo, Maps, tel:

  /* Red primero para navegación y ficheros críticos. */
  if (req.mode === 'navigate' || esCritico(url)) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE);
          cache.put(req, fresh.clone());
        }
        return fresh;
      } catch (e) {
        const hit = await caches.match(req, { ignoreSearch: true });
        return hit || (await caches.match('./index.html'));
      }
    })());
    return;
  }

  /* Resto (imágenes, iconos): caché primero con revalidación. */
  event.respondWith((async () => {
    const hit = await caches.match(req, { ignoreSearch: true });
    const red = fetch(req).then((res) => {
      if (res && res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone()));
      return res;
    }).catch(() => hit);
    return hit || red;
  })());
});
