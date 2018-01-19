(function () {
    'use strict';

    // TODO 2 - cache the application shell

    // TODO 3 - intercept network requests

    // TODO 7 - delete unused caches


    var staticCacheName = 'couk-patrick-grey-2320-1-01-2018';
    
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
    
    self.addEventListener('install', function (event) {
        event.waitUntil(
            caches.open(staticCacheName).then(function(cache) {
                return cache.addAll(urlsToCache);
            })
        );
    });
    
    self.addEventListener('fetch', function (event) {
        console.log('Fetch event for ', event.request.url);
        event.respondWith(
            caches.match(event.request).then(function (response) {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.log('Network request for ', event.request.url);
                return fetch(event.request)

                // TODO 4 - Add fetched files to the cache

            }).catch(function (error) {

                // TODO 6 - Respond with custom offline page

            })
        );
    });



    // Update service worker.
    // Change service worker to new version which gets new versions of files by renaming.
    // Create a new cache to put these into.
    // Delete old cache.
        // activate event - once new sw activated
            // This is time to delete old caches before new one is created for this sw.
    // SW only active when window closed or another page visited. We want to change that.
    // 
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

    self.addEventListener('message', function (event) {
        if (event.data.action == 'skipWaiting') {
            self.skipWaiting();
        }
    });


})();