importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  // cache first (serve from cache by default) strategy for service workers
  workbox.precaching.precacheAndRoute([
  {
    "url": "images/articles/buildings.jpg",
    "revision": "71dceaabcd85c771e9fa5d9fd55611f3"
  },
  {
    "url": "images/articles/doctors.jpg",
    "revision": "488ee4eabb8e08080eb544f2b7950235"
  },
  {
    "url": "images/articles/food.jpg",
    "revision": "5d77777f05adeb3be0912d5804819ea0"
  },
  {
    "url": "images/articles/plane.jpg",
    "revision": "5deadedc1a7ab71b00877fbd50621c33"
  },
  {
    "url": "images/articles/solar.jpg",
    "revision": "de07a1e6e7e7bd64eedbc0a04b0e9aae"
  },
  {
    "url": "images/articles/space.jpg",
    "revision": "e5133211f752c4fe82bf7951cc3093c7"
  },
  {
    "url": "images/articles/weather.jpg",
    "revision": "bfddd29233472e231453b16c3a80c125"
  },
  {
    "url": "images/home/business.jpg",
    "revision": "9c3ec8d2a8a188bab9ddc212a64a0c1e"
  },
  {
    "url": "images/icon.svg",
    "revision": "0d077eac3b5028d3543f7e35908d6ecb"
  },
  {
    "url": "index.html",
    "revision": "a193e4f48ea671d91b70f5d6cdc6350a"
  },
  {
    "url": "js/animation.js",
    "revision": "9e38e7de2b8827b0071844d3e9510507"
  },
  {
    "url": "style/main.css",
    "revision": "a971e94e19483e70a626d9aec9b34c1e"
  }
]);

  workbox.routing.registerRoute(
    /(.*)articles(.*)\.(?:png|gif|jpg)/,
    workbox.strategies.cacheFirst({
        cacheName: 'images-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, 
            })
        ]
    })
  );
  
  } else {
  console.log(`Boo! Workbox didn't load 😬`);
}