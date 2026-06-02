const CACHE_NAME = "gfitapp-v2";

const urlsToCache = [
    "./",
    "./index.html",
    "./perfil.html",
    "./reservas.html",
    "./historial.html",
    "./clases.html",
    "./styles.css",
    "./script.js",
    "./manifest.json",
    "./image_Gfit_180.png",
    "./image_Gfit_192.png",
    "./image_Gfit_512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
