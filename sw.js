/* NGINGETKEN service worker: lifecycle only.
   Deliberately no cache or fetch interception: prevents caching employee responses,
   internal Microsoft 365 pages, or outdated legal reference materials.
   This service worker does NOT promise offline capability. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
