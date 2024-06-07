// staticCacheName value must be change if the content of [staticAssets] file had made been change
// Hal ini dilakukan agar menghidari penumpukan cache static jika file di cache asset tersebut terdapat pemversian nama file
const staticCacheName = 'shell-cache-v7';
const dynamicCache = 'dynamic-cache';
const staticAssets = [
        '/default/core/fonts/LineIcons.woff2',
        '/default/core/fonts/LineIcons.woff',
        '/default/core/fonts/LineIcons.ttf',
        '/default/core/css/LineIcons.3.0.css',
        '/default/core/css/animate.css',
        'https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofINeaB.woff2',
        'https://fonts.gstatic.com/s/nunito/v26/XRXX3I6Li01BKofIMNaDRs4.woff2',
        'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,300;1,400;1,600;1,700;1,800;1,900&display=swap',
        '/pojok-berbagi-style.css',
        '/pojok-berbagi-script.js',
        '/default/home.html',
        '/default/core/js/script.js',
        '/default/default-offline.html',
        '/default/manifest.json',
        '/default/icon/icon-144x144.png',
        '/img/pwa/wide.png',
        '/default/core/css/main.css',
        '/default/core/css/default.css',
        '/pojok-berbagi-transparent.png',
        '/favicon-pojok-icon.ico',
        '/default/pages/css/home.css',
        '/default/core/css/bootstrap.min.css',
        '/default/core/js/bootstrap.min.js',
        'https://lottie.host/994d72ff-5477-41a0-8efa-a126f1ba34e9/xsTdPGGTsY.lottie',
        'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/chunk-ODPU3M3Z.mjs',
        'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/chunk-TRZ6EGBZ.mjs',
        'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/chunk-HDDX7F4A.mjs',
        'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/chunk-ZWH2ESXT.mjs',
        'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs',
        'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/lottie_svg-MJGYILXD-NRTSROOT.mjs',
        '/default/core/js/wow.min.js',
        '/default/core/js/main.js',
        '/default/core/js/default.js'
    ];

let shellCache = staticCacheName;

const zeroPad = (num, places) => String(num).padStart(places, '0')

async function fetchLastModified(url) {
    return await fetch(url, { 
        method: "HEAD" 
    })
    .then(r => { 
        const data = new Date(r.headers.get('Last-Modified'))
        date = url+'?v='+zeroPad(data.getDate(),2)+''+zeroPad(data.getMonth()+1,2)+''+zeroPad(data.getFullYear().toString().substring(2),2);
        return date;
    })
}

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
};

// install service worker
self.addEventListener('install', e => {
    console.log('ServiceWorker install successful');

    // PR Dynamic
    let promises = staticAssets.map(function(asset){
        let splitRequest = asset.split('/');
        if (splitRequest[1] === 'assets') {
            const splitVersion = splitRequest.pop().split('?v=');
            if (splitVersion.length === 1) {
                if (splitVersion[0].split('?nw=1').length > 1) {
                    return asset.replace('?nw=1','');
                }

                if (shellCache === staticCacheName) {
                    const cur_date = new Date();
                    shellCache += '-v-'+zeroPad(cur_date.getDate(),2)+''+zeroPad(cur_date.getMonth()+1,2)+''+zeroPad(cur_date.getFullYear().toString().substring(2),2); 
                    // console.log(shellCache);
                }

                return fetchLastModified(asset).then(function(r) {
                    return r
                });
            }
        }

        return asset;
    })

    e.waitUntil(
        // caches.open(shellCache).then(cache => {
        //     // console.log(staticAssets);
        //     console.log('catch shell assets/the static assets');
        //     cache.addAll(staticAssets);
        // })

        // Via PR Dynamic
        caches.open(shellCache).then(cache => {
            console.log('catch shell assets/the static assets');

            return Promise.all(promises).then(function(results) {
                cache.addAll(results);
            })
        })
    );
});

// activate event
self.addEventListener('activate', e => {
    console.log('ServiceWorker activate successful');
    e.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys);
            return Promise.all(keys
                .filter(key => key !== shellCache && key !== dynamicCache)
                .map(key => caches.delete(key))
            )
        })
    )
});

// fetch event
self.addEventListener('fetch', e => {
    console.log('fetch event: ', e.request.url);
    // e.respondWith(
    //     caches.match(e.request.url).then(cachesResponse => {
    //         return cachesResponse || fetch(e.request).then(fetchRes => {
    //             return caches.open(dynamicCache).then(cache => {
    //                 cache.put(e.request.url, fetchRes.clone())
    //                 limitCacheSize(dynamicCache, 15);
    //                 return fetchRes;
    //             })
    //         });
    //     })
    //     // .catch(() => caches.match('/default/default-offline.html'))
    //     .catch(() => {
    //         let htmlOrUriPass = ((e.request.url.split(self.location.origin)[1].indexOf('.') === -1) || (e.request.url.indexOf('.html') > -1));
    //         if (!htmlOrUriPass) {
    //             // return caches.match('/fallback/offline')
    //             return caches.match('/default/default-offline.html')
    //         }
    //     })
    // );
});