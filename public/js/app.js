if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
}
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
}

window.addEventListener('load', () => {
    navigator.serviceWorker.addEventListener('message', event => {
        const { type } = event.data;
        if (type === 'online') {
            alert('Conectado a internet.');
        } else if (type === 'offline') {
            alert('No hay conexión a internet, inténtalo de nuevo más tarde.');
        }
    });
});

function isOnline() {
    if (navigator.onLine) {
        alert('Conectado a internet.');
    } else {
        alert('No hay conexión a internet, inténtalo de nuevo más tarde.');
    }
}

window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);

isOnline();
