const CACHE_NAME = 'bluetooth-remote-cache-v1';
const urlsToCache = [
    './index.html',
    './manifest.json',
    './icon192.png',
    './icon512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => caches.match('./index.html'));
        })
    );
});
