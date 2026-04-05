var CACHE = 'pours-v2';
var ASSETS = ['/', '/index.html', '/happyhours.csv'];

// These files always fetch fresh from network first
var NETWORK_FIRST = ['/happyhours.csv'];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  // Delete old caches from previous versions
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE; })
            .map(function(key) { return caches.delete(key); })
      );
    }).then(function() { return clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  var url = new URL(e.request.url);

  // Network-first for CSV: always try to get fresh data, fall back to cache if offline
  if (NETWORK_FIRST.some(function(path) { return url.pathname === path; })) {
    e.respondWith(
      fetch(e.request).then(function(response) {
        var copy = response.clone();
        caches.open(CACHE).then(function(cache) { cache.put(e.request, copy); });
        return response;
      }).catch(function() {
        return caches.match(e.request);
      })
    );
    return;
  }

  // Cache-first for everything else (HTML, icons, etc.)
  e.respondWith(
    caches.open(CACHE).then(function(cache) {
      return cache.match(e.request).then(function(cached) {
        var fetchPromise = fetch(e.request).then(function(response) {
          cache.put(e.request, response.clone());
          return response;
        });
        return cached || fetchPromise;
      });
    })
  );
});
