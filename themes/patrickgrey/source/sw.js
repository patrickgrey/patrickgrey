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
        caches.open('couk-patrick-grey-2035-15-01-2018').then(function (cache) {
            return cache.addAll([
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
            ]);
        })
    );
})

self.addEventListener('fetch', function (event) {
    
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
    
    
    // event.respondWith(
    //     fetch(event.request).then(function (response) {
    //         if (response.status == 404) {
    //             return new Response("Whoops! Not found.");
    //         }
    //         return response;
    //     }).catch(function () {
    //         return new Response("Uh oh, summit when horribly wrong!")
    //     })
    //     //     // fetch('/images/favicon/android-icon-192x192.png')
    //     //     // new Response('Hello <b class="a-winner-is-me">world</b>', {
    //     //     //     headers: {'content-type': 'text/html'}
    //     // })
    // );
});