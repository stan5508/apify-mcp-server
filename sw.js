const CACHE = 'coachlog-v40';
const PHOTOS = 'coachlog-photos';
const PHOTO_HOSTS = ['cdn.jsdelivr.net', 'raw.githubusercontent.com'];
const ASSETS = [
    './',
    './index.html',
    './klant.html',
    './sporter.html',
    './oefeningen.json',
    './manifest.webmanifest',
    './icon-512.png',
    './icon-180.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE);
            await cache.addAll(ASSETS);
            await self.skipWaiting();
        })(),
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            await Promise.all(
                keys.filter((key) => key !== CACHE && key !== PHOTOS).map(async (key) => caches.delete(key)),
            );
            await self.clients.claim();
        })(),
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);
    const isPage = event.request.mode === 'navigate' || url.pathname.endsWith('/index.html');
    event.respondWith(
        (async () => {
            // exercise photos live on another host: keep every one we have shown, so they work offline
            if (PHOTO_HOSTS.includes(url.hostname)) {
                const cache = await caches.open(PHOTOS);
                const hit = await cache.match(event.request);
                if (hit) return hit;
                const fresh = await fetch(event.request);
                if (fresh.ok) await cache.put(event.request, fresh.clone());
                return fresh;
            }
            // page: network first so updates arrive on the first online open; cache when offline
            if (isPage) {
                try {
                    const fresh = await fetch(event.request);
                    const cache = await caches.open(CACHE);
                    await cache.put(event.request, fresh.clone());
                    return fresh;
                } catch {
                    const hit = await caches.match(event.request, { ignoreSearch: true });
                    if (hit) return hit;
                    return caches.match('./index.html');
                }
            }
            const hit = await caches.match(event.request, { ignoreSearch: true });
            return hit || fetch(event.request);
        })(),
    );
});
