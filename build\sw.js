importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  // cache first (serve from cache by default) strategy for service workers
  workbox.precaching.precacheAndRoute([
  {
    "url": "build/sw.js",
    "revision": "4b11cfec26f1b08ffbfea9fcc50af263"
  },
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
    "revision": "1d69855052f49e9acedd3886c73d41c4"
  },
  {
    "url": "js/animation.js",
    "revision": "9e38e7de2b8827b0071844d3e9510507"
  },
  {
    "url": "js/enablePush.js",
    "revision": "3e723f42dc5a7ea58d17f1bcef7fb2ee"
  },
  {
    "url": "js/main.js",
    "revision": "8f636f7321181186b87e302bd46ebd9c"
  },
  {
    "url": "js/updateBtn.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "manifest.json",
    "revision": "47f8ebc878764f626e528e4459b7445d"
  },
  {
    "url": "pages/404.html",
    "revision": "156aaff00a5157e7c02cafe01071a295"
  },
  {
    "url": "pages/article1.html",
    "revision": "cf3a00024271ec6ac26b8580ddc73538"
  },
  {
    "url": "pages/article2.html",
    "revision": "1b0e01f332656aada7269627389deb4f"
  },
  {
    "url": "pages/article3.html",
    "revision": "4982584d321af15483dd339892348933"
  },
  {
    "url": "pages/article4.html",
    "revision": "45fe8f1d30649bbcc92b2a5bcc4e656f"
  },
  {
    "url": "pages/offline.html",
    "revision": "c4a742ab3120d2c7331f68dcb38a191d"
  },
  {
    "url": "pages/policies/PrivacyPolicy.html",
    "revision": "4558d088cf539b14180d45ceec4b2ca2"
  },
  {
    "url": "pages/policies/TermsOfUse.html",
    "revision": "9f8057ed563b70e2a2350ae1ff7dcce7"
  },
  {
    "url": "pages/post1.html",
    "revision": "72d1c2a355cee87a47b3ded558d2bc34"
  },
  {
    "url": "pages/post2.html",
    "revision": "c1aad4cfe72cca93c74d481d6ccfc253"
  },
  {
    "url": "pages/post3.html",
    "revision": "60ef0d7ef2fd6f0b354a1152e695c58f"
  },
  {
    "url": "style/main.css",
    "revision": "bf91760b5039bc23e7844a3d113a9533"
  },
  {
    "url": "sw.js",
    "revision": "4b11cfec26f1b08ffbfea9fcc50af263"
  }
]);

  workbox.routing.registerRoute(
    /(.*)articles(.*)\.(?:png|gif|jpg)/,
    workbox.strategies.cacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        })
      ]
    })
  );

  // network first cache
  const articleHandler = workbox.strategies.networkFirst({
    cacheName: 'articles-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
      })
    ]
  });
  
  workbox.routing.registerRoute(/(.*)article(.*)\.html/, args => {
    return articleHandler.handle(args).then(response => {
        if (!response) {
            return caches.match('pages/offline.html');
        } else if (resonse.status === 404) {
          return caches.match('pages/404.html');
        }
        return response;
    });
  });

    // cache first 
    const postHandler = workbox.strategies.cacheFirst({
        cacheName: 'posts-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 50,
          })
        ]
      });

  workbox.routing.registerRoute(/(.*)pages\/post(.*)\.html/, args => {
    return postHandler.handle(args).then(response => {
        if (!response) {
            return caches.match('pages/offline.html');
        } else if (resonse.status === 404) {
          return caches.match('pages/404.html');
        }
        return response;
    });
  });
  
  } else {
  console.log(`Boo! Workbox didn't load 😬`);
}