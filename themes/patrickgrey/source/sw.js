var staticCacheName = 'couk-patrick-grey-2210-15-01-2018';

self.addEventListener('install', function (event) {
    var urlsToCache = [
        '/',
        '/css/patrickgrey.min.css',
        '/scripts/main.js',
        '/scripts/vendors.min.js',
        "/images/favicon/apple-icon-57x57.png",
        "/images/favicon/apple-icon-60x60.png",
        "/images/favicon/apple-icon-72x72.png",
        "/images/favicon/apple-icon-76x76.png",
        "/images/favicon/apple-icon-114x114.png",
        "/images/favicon/apple-icon-120x120.png",
        "/images/favicon/apple-icon-144x144.png",
        "/images/favicon/apple-icon-152x152.png",
        "/images/favicon/apple-icon-180x180.png",
        "/images/favicon/android-icon-192x192.png",
        "/images/favicon/favicon-32x32.png",
        "/images/favicon/favicon-96x96.png",
        "/images/favicon/favicon-16x16.png",
        "/images/favicon/favicon.ico"
    ];

    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return  cacheName.startsWith('couk-patrick-grey') &&
                        cacheName != staticCacheName;
                }).map(function  (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
})

self.addEventListener('fetch', function (event) {
    
    try {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    } catch (error) {
        console.log('Oops', error);
    }

});