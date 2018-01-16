(function() {
    
    if (!navigator.serviceWorker) return;

    var reloadElement = document.querySelector('#pgSWDialogueReload');
    var buttonReload = document.querySelector('#pgSWDialogueButtonReload');
    var buttonDismiss = document.querySelector('#pgSWDialogueButtonDismiss');
    
    var _showDialogueReload = function () {
        reloadElement.style.display = 'block';
    };
    
    var _hideDialogueReload = function () {
        reloadElement.style.display = 'none';
    };
    
    var _initButtons = function (worker) {
        
        buttonDismiss.addEventListener('click', function (event) {
            _hideDialogueReload();
        });

        buttonReload.addEventListener('click', function (event) {
            worker.postMessage({action: 'skipWaiting'});
        });
    }
    
    // Listen to state changes of worker.
    // If state becomes "installed", show dialogue.
    var _trackInstalling = function (worker) {
        
        worker.addEventListener('statechange', function () {
            if(worker.state == 'installed') {
                _initButtons(worker);
                _showDialogueReload();
            }
        })
    }

    navigator.serviceWorker.register('/sw.js').then(function (reg) {
        
        // If there's no controller, this page wasn't loaded
        // via a service worker, so they're looking at the latest version.
        // In that case, bail early.
        if (!navigator.serviceWorker.controller) {
            return;
        }
        // If there is one already waiting, show dialogue.
        if (reg.waiting) {
            _showDialogueReload();
            return;
        }
        // If there's an updated worker installing, track its
        // progress. If it becomes "installed", show dialogue.
        if (reg.installing) {
            _trackInstalling(reg.installing);
            return;
        }
        // Otherwise, listen for new installing workers arriving.
        // If one arrives, track its progress.
        // If it becomes "installed", show dialogue.
        reg.addEventListener('updatefound', function () {
            _trackInstalling(reg.installing);
        });
        
        
        
        
        console.log('Hello service worker');
    }).catch(function () {
        console.log('Registration failed!');
    });
    
    
    // Listen for the controlling service worker changing
    // and reload the page.
    navigator.serviceWorker.addEventListener('controllerchange', function () {
        window.location.reload();
    });
    
    
    
    
    

})();

