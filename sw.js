const versio = "2023-24.0"
/* self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('manacup24').then((cache) => cache.addAll([
         
      ])),
    );
  }); 

  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });*/
if ('serviceWorker' in navigator) {
  caches.keys().then(function(cacheNames) {
    cacheNames.forEach(function(cacheName) {
      caches.delete(cacheName);
    });
  });
}
