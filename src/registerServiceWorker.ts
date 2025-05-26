// Registers the service worker for the Vue app
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/src/vue/service-worker.js')
      .then(reg => {
        console.log('Service worker registered (Vue):', reg);
      })
      .catch(err => {
        console.error('Service worker registration failed (Vue):', err);
      });
  });
}
