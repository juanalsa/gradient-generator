const CACHE_NAME = "v1_cache_degradados_css_vue";
const urlsToCache = [
    "./",
    "./?utm_source=web_app_manifest",
    "./pages/fallback.html",
    "./img/favicon.png",
    "./img/icon_32.png",
    "./img/icon_64.png",
    "./img/icon_128.png",
    "./img/icon_192.png",
    "./img/icon_256.png",
    "./img/icon_512.png",
    "./img/icon_1024.png",
    "https://unpkg.com/vue@next",
    "./js/main.js",
    "./js/mountApp.js",
    "./css/style.css",
    "./manifest.json",
    "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                cache.addAll(urlsToCache)
                    .then(() => self.skipWaiting())
                    .catch(err => console.log(err))
            })
    )
});

self.addEventListener("activate", event => {
    const cacheWhiteList = [CACHE_NAME];

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhiteList.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                )
            })
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(res => {
                if (res) {
                    return res;
                }

                return fetch(event.request);
            })
            .catch(() => caches.match("./pages/fallback.html"))
    )
});