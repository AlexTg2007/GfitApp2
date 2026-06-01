const CACHE_NAME ="gfitapp-v1";

//Archivos que se guardan el el caché

const urlsToCache = [
    "/",
    "/index.html",
    "/perfil.html",
     "/reservas.html",
    "/historial.html",
    "/clases.html",
    "/styles.css",
    "/script.js",
    "/manifest.json",
    "/Gfit_app_image.png"
];

//Instalación del service worker

self.addEventListener("install", event => {
    console.log ("Service Worker instalado");
    
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache=> {
            console.log("Archivos cacheados");
            return cache.addAll(urlsToCache);
        })
    );
});

//Activación del service worker

self.addEventListener("activate", event => {
    console.log("Service Worker activado");

    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key!== CACHE_NAME){
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

//Fetch: Soporte Offline

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {

            if (response) {
                return response;
            }

            return fetch(event.request);
        })
    )
})