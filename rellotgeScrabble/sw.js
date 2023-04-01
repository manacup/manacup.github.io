const versio = "1.0"
self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('rellotgeScrabble').then((cache) => cache.addAll([
          '/rellotgeScrabble/',
        '/rellotgeScrabble/js/script.js',
        '/rellotgeScrabble/index.html',
        '/rellotgeScrabble/css/style.css'
      ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });
