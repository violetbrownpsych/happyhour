var CACHE = 'pours-v1';
var ASSETS = ['/', '/index.html', '/happyhours.csv'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.open(CACHE).then(function(cache){
      return cache.match(e.request).then(function(cached){
        var fetchPromise = fetch(e.request).then(function(response){
          cache.put(e.request, response.clone());
          return response;
        });
        return cached || fetchPromise;
      });
    })
  );
});
