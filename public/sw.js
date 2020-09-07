const dynamicCacheName = 'site-dynamic-v1';
const staticCacheName = 'site-static';
const assets = [
    '/',
    './index.html',
    './assets/js/app.js',
    './assets/js/script.js',
    './assets/css/bootstrap.css',
    './assets/css/style.css',
    './assets/img/bg-min.png',
    './assets/img/sun.jpg',
    'https://fonts.googleapis.com/css2?family=Merriweather :ital,wght@0,300;0,400;1,300;1,400&family=Open+Sans:wght@300;400&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet',
    './fallback.html'
];
// cache size limit
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size))
            }
        })
    })
}


//Installing the service worker
self.addEventListener('install', evt => {
    // caching assets
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assets);
        })
    );
})
//Activate service worker
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
});
//Fetch events
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(
                fetchRes => {
                    return caches.open(dynamicCacheName).then(cache => {
                        cache.put(evt.request.url, fetchRes.clone());
                        limitCacheSize(dynamicCacheName, 15);
                        return fetchRes;
                    })
                }
            );
        }).catch(() => {
            if(evt.request.url.indexOf('.html') > -1) {
                return caches.match('./fallback.html');
            }
        })
    );
})