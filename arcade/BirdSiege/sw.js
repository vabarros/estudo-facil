const cacheName = 'bird-siege-v1';
const assets = [

  './index.html',
  './game.js',
  './assets/player.png',
  './assets/background.png',
  './assets/catapulta.png',
  './assets/estrela.png',
  './assets/cogumelo.png',
  './assets/sound_fly.ogg',
  './assets/sound_knocking.ogg',
  './assets/sound_die.ogg',
  './assets/sound_point.ogg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});