'use strict';
/* Optional PWA lifecycle. Icon and Add to Home Screen work without offline caching. */
(() => {
  if (!('serviceWorker' in navigator)) return;
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ngingetken/sw.js', {
      scope: '/ngingetken/'
    }).catch(err => {
      console.info('NGINGETKEN: registrasi service worker tidak tersedia', err);
    });
  }, { once: true });
})();
