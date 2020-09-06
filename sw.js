//Installing the service worker
self.addEventListener('install', evt => {
    console.log('installed');
})
//Activate service worker
self.addEventListener('activate', evt => {
    console.log('activated');
});
//Fetch events
self.addEventListener('fetch', evt => {
    console.log('fetch events', evt);
})