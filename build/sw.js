// Crear las variables de cache
const CACHE_DYNAMIC = "dynamic-v1"; // Para los archivos que se van a descargar
const CACHE_STATIC = "static-v1"; // App shell
const CACHE_INMUTABLE = "inmutable-v1"; // CDN de terceros. LIBRERIAS

const CACHE_DYNAMIC_LIMIT = 25;

// Función para limpiar el cache
const limpiarCache = (cacheName, numberItem) => {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > numberItem) {
        cache.delete(keys[0]).then(() => limpiarCache(cacheName, numberItem)); // Corrección: debe llamarse limpiarCache nuevamente después de la eliminación
      }
    });
  });
};

self.addEventListener("install", (event) => {
  const cachePromise = caches.open(CACHE_STATIC).then((cache) => {
    return cache.addAll([
      "/",
      "/index.html",
      "/js/app.js",
      "/sw.js",
      "static/js/bundle.js",
      "favicon.ico",
      "./pages/offline.html",
      "/not-found.jpg", // Agregar la imagen not-found.jpg al cache estático
    ]);
  });
  const cacheInmutable = caches.open(CACHE_INMUTABLE).then((cache) => {
    return cache.addAll([
      "https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Roboto:wght@100&display=swap",
    ]);
  });
  event.waitUntil(Promise.all([cachePromise, cacheInmutable]));
});

self.addEventListener("fetch", (event) => {
  // Cache with network fallback
  const respuesta = caches.match(event.request).then((response) => {
    if (response) return response;
    // Si no existe el archivo, verifica si hay conexión
    if (!navigator.onLine) {
      // Si no hay conexión, responde con la imagen not-found.jpg desde el cache estático
      return caches.match("/not-found.jpg");
    }
    // Si hay conexión, descarga el archivo
    return fetch(event.request).then((newResponse) => {
      caches.open(CACHE_DYNAMIC).then((cache) => {
        cache.put(event.request, newResponse);
        limpiarCache(CACHE_DYNAMIC, CACHE_DYNAMIC_LIMIT);
      });
      return newResponse.clone();
    });
  });
  event.respondWith(respuesta);
});

// Event listeners para manejar la conexión
const sendConnectionStatus = () => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: "connectionStatus",
        online: navigator.onLine,
      });
    });
  });
};

self.addEventListener("online", sendConnectionStatus);
self.addEventListener("offline", sendConnectionStatus);

// Inicializa el estado de conexión al inicio
sendConnectionStatus();
