const CACHE_DYNAMIC = 'dynamic-v1';
const CACHE_STATIC = 'static-v1';
const CACHE_INMUTABLE = 'inmutable-v1';
const CACHE_DYNAMIC_LIMIT = 50;

const limpiarCache = (cacheName, numberItem) => {
    caches.open(cacheName)
        .then(cache => {
            cache.keys()
                .then(keys => {
                    if (keys.length > numberItem) {
                        cache.delete(keys[0])
                            .then(() => limpiarCache(cacheName, numberItem));
                    }
                });
        });
};

self.addEventListener('install', event => {
    const cachePromise = caches.open(CACHE_STATIC).then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/perfil.html', // Agregar la página de perfil al caché estático
            '/editarperfil.html', // Agregar la página de edición de perfil al caché estático
            '/js/app.js',
            '/sw.js',
            '/static/js/bundle.js',
            '/favicon.ico',
            '/pages/offline.html',
            '/not-found.jpg'
        ]);
    });
    const cacheInmutable = caches.open(CACHE_INMUTABLE).then(cache => {
        return cache.addAll([
            'https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Roboto:wght@100&display=swap',
        ]);
    });
    event.waitUntil(Promise.all([cachePromise, cacheInmutable]));
});

self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);

    // Si la solicitud es para la página de perfil o editar perfil, intenta servirla desde la caché
    if (url.pathname === '/perfil.html' || url.pathname === '/editarperfil.html') {
        event.respondWith(
            caches.match(request).then(response => {
                return response || fetch(request);
            }).catch(() => {
                return caches.match('/offline.html');
            })
        );
        return;
    }

    // Para otras solicitudes, intenta servirlas desde la caché, y si no está en caché, intenta obtenerlas de la red
    event.respondWith(
        caches.match(request).then(response => {
            return response || fetch(request).catch(() => {
                return caches.match('/not-found.jpg'); // Si la solicitud falla, servir la imagen not-found.jpg
            });
        })
    );
});

// Manejar los mensajes del cliente
self.addEventListener('message', (event) => {
    if (event.data.action === 'saveUserData') {
        // Almacenar los datos del usuario en el almacenamiento local (local storage)
        localStorage.setItem('userData', JSON.stringify(event.data.userData));
    } else if (event.data.action === 'getUserData') {
        // Obtener los datos del usuario del almacenamiento local (local storage)
        const userData = JSON.parse(localStorage.getItem('userData'));
        // Enviar los datos del usuario al cliente
        event.source.postMessage({ action: 'userData', userData });
    }
});

// Event listeners para manejar la conexión
const sendConnectionStatus = () => {
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({ type: 'connectionStatus', online: navigator.onLine });
        });
    });
};

self.addEventListener('online', sendConnectionStatus);
self.addEventListener('offline', sendConnectionStatus);

// Inicializa el estado de conexión al inicio
sendConnectionStatus();
