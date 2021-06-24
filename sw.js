
var cacheName = 'app-shell-cache-v1';
var filesToCache = ['/', '/index.html'];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        }).then(function () {
            return self.skipWaiting();
        })
    );
});

self.addEventListener('active', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName){
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.ClientRectList.claim();
});

self.addEventListener('fetch',function(e){
    e.respondWith(
        caches.match(e.request).then(function(response){
            return response || fetch(e.request);
        })
    );
});