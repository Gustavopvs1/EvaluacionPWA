const actualizarCacheDinamico = (dynamicCache, req, res) => {
    // Verificar si la respuesta es válida
    if (res.ok && !req.url.includes('chrome-extension')) {
        // Si la respuesta es válida y no es de una extensión del navegador, almacenarla en caché
        return caches.open(dynamicCache).then(cache => {
            cache.put(req, res.clone());
            return res.clone();
        });
    } else {
        // Si la respuesta no es válida o es de una extensión del navegador, retornar la respuesta original
        return res;
    }
};
