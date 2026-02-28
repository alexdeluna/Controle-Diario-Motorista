const CACHE_NAME = 'Controle-Diario-Motorista';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './visual.css',
  './app.js',
  './manifest.json'
];

// Instala
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './app.js',
        './manifest.json'
      ]);
    })
  );
});

// Ativa
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) { // Limpa caches de versões anteriores
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
