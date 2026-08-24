const CACHE = 'coachlog-v64';
const ASSETS = [
    './',
    './index.html',
    './klant.html',
    './sporter.html',
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
            await Promise.all(keys.filter((key) => key !== CACHE).map(async (key) => caches.delete(key)));
            await self.clients.claim();
        })(),
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    const isPage = event.request.mode === 'navigate' || new URL(event.request.url).pathname.endsWith('/index.html');
    event.respondWith(
        (async () => {
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

// pushmeldingen voor de sporter-app (zie SUPABASE.md stap 7)
self.addEventListener('push', (event) => {
    let data = {};
    try {
        data = event.data ? event.data.json() : {};
    } catch {
        data = { body: event.data && event.data.text() };
    }
    event.waitUntil(
        self.registration.showNotification(data.title || 'Coachlog', {
            body: data.body || '',
            icon: './icon-180.png',
            badge: './icon-180.png',
            data: { url: data.url || './sporter.html' },
        }),
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = (event.notification.data && event.notification.data.url) || './sporter.html';
    event.waitUntil(
        (async () => {
            const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
            const open = wins.find((w) => w.url.includes('sporter.html'));
            if (open) return open.focus();
            return self.clients.openWindow(url);
        })(),
    );
});
