(function() {
    
    if (!navigator.serviceWorker) return;

    navigator.serviceWorker.register('/sw.js').then(function () {
        console.log('Hello service worker 6!');
    }).catch(function () {
        console.log('Registration failed!');
    });

})();

