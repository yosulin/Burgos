/* Service Worker — caché estática para uso sin cobertura */
const CACHE = 'merindades-v1';

const CORE = [
  './',
  './index.html',
  './styles.css',
  './assets/tailwind.css',
  './data.js',
  './app.js',
  './manifest.json',
  './assets/icons/icon.svg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png'
];

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

  // Nunca interceptamos la navegación hacia Google Maps u otros destinos externos.
  if (req.mode === 'navigate' && url.origin !== self.location.origin) return;

  // Navegación: red primero, caché como respaldo (app shell).
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        return (await caches.match(req)) || (await caches.match('./index.html'));
      }
    })());
    return;
  }

  // Resto de recursos: caché primero, con revalidación en segundo plano.
  event.respondWith((async () => {
    const cached = await caches.match(req);
    const network = fetch(req).then((res) => {
      if (res && (res.ok || res.type === 'opaque')) {
        caches.open(CACHE).then((c) => c.put(req, res.clone()));
      }
      return res;
    }).catch(() => cached);
    return cached || network;
  })());
});
