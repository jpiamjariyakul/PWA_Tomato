//self.importScript('//cdn.polyfill.io/v1/polyfill.min.js');

var cacheName = 'PWA_tomato';

var contentToCache = [
    // Main HTML file
    '/index.html',
    
    // JS files
    '/app.js',
    '/mainScript.js',
    '/manifest.json',
    '/sw.js',
    
    // CSS files
    '/css/styles_main.css',
    
    // Images_Vector
    '/images/vector/timer.svg',
    
    // Images_Main
    '/images/main/timer_current.png',
    '/images/main/timer_start.png',
    '/images/main/timer_stop.png',
    
    // Images_Icons
    '/images/icons/icon_128.png',
    '/images/icons/icon_144.png',
    '/images/icons/icon_152.png',
    '/images/icons/icon_192.png',
    '/images/icons/icon_512.png'
];

// Installs service worker - later caches file in list above
self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache);
        })
    );
});

// Provided offline functionality, fetches content from cache
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(r) {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
            return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    console.log('[Service Worker] Caching new resource: '+e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});