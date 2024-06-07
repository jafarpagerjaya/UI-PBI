window.addEventListener('load', () => {
    if (!('serviceWorker' in navigator)) {
        console.log('service workers not supported 😣');
        return
    }
  
    // navigator.serviceWorker.register(window.location.origin + '/service-worker.js').then(
    //   (registration) => {
    //     console.log('ServiceWorker registration successful with scope: ', registration.scope, ' 👍🏼');
    //   },
    //   err => {
    //     console.error('SW registration failed! 😱', err)
    //   }
    // )
});