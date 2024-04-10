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
        cache.delete(keys[0]).then(() => limpiarCache(cacheName, numberItem));
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
  if (event.request.url.includes("/login")) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/offline.html");
      })
    );
  } else {
    const respuesta = caches.match(event.request).then((response) => {
      if (response) return response;
      
      if (!navigator.onLine) {
        return caches.match("/not-found.jpg");
      }
      
      return fetch(event.request).then((newResponse) => {
        caches.open(CACHE_DYNAMIC).then((cache) => {
          cache.put(event.request, newResponse);
          limpiarCache(CACHE_DYNAMIC, CACHE_DYNAMIC_LIMIT);
        });
        return newResponse.clone();
      });
    });
    event.respondWith(respuesta);
  }
});

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

// Almacenamiento de la sesión del usuario
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "storeUserData") {
    const userData = event.data.userData;
    localStorage.setItem("userData", JSON.stringify(userData));
  }
});
