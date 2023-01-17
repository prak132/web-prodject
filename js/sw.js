const CACHE_NAME = 'nebulus-offline';
const urlsToCache = [
    '/',
    '/static/tailwind.css',
    '/static/fonts.css',
    '/static/lms.css',
    '/static/lms.js',
    '/static/main.js',
    '/static/dashboard.js',
    '/static/profile.js',
    '/static/signin.js',
    '/static/signup.js',
    '/signin',
    '/signup',
    '/lms',
    '/dashboard',
    '/settings',
    '/profile',
    'login',
    'logout',
    'signup',

    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'
];
self.addEventListener('install', function (event) {
    // install files needed offline

    event.waitUntil(
        Promise.all[(caches.open(CACHE_NAME), self.skipWaiting())].then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    // every request from our site, passes through the fetch handler
    console.log('I am a request with url:', event.request.clone().url);
    event.respondWith(
        // check all the caches in the browser and find
        // out whether our request is in any of them

        caches.match(event.request).then(function (response) {
            if (response) {
                if (!response.redirected) {
                    return response;
                }
                // if we are here, that means there's a match
                //return the response stored in browser
            }

            // no match in cache, use the network instead
            return fetch(event.request);
        })
    );
});
