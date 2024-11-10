// Nombre del caché y lista de activos que queremos almacenar en caché
const cacheName = 'todo-cache-v1';
const assets = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './images/icon-192.png',  // Corregí la ruta de esta imagen
    './images/icon-512.png'   // Corregí la ruta de esta imagen
];

// Evento de instalación: ocurre la primera vez que el Service Worker se registra
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName)  // Abre (o crea) el caché con el nombre especificado
        .then(cache => {
            return cache.addAll(assets)
                .then(() => self.skipWaiting());  // Fuerza al SW a activarse inmediatamente después de instalarse
        })
        .catch(err => console.log('Falló registro de cache', err))  // Log de errores en caso de que falle
    );
});

// Evento de activación: se ejecuta después de que el SW se instala y toma el control
self.addEventListener('activate', e => {
    const cacheWhitelist = [cacheName];  // Corregí esta línea para usar "cacheName" en lugar de "cacheNames"
    e.waitUntil(
        caches.keys()  // Obtén todas las claves de caché
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cName => {
                    if (!cacheWhitelist.includes(cName)) {
                        return caches.delete(cName);  // Elimina cachés que no están en la lista blanca
                    }
                })
            );
        })
        .then(() => self.clients.claim())  // Toma el control de las páginas abiertas
    );
});

// Evento de búsqueda (fetch): intercepta las solicitudes de la red
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)  // Intenta encontrar la solicitud en el caché
        .then(res => {
            if (res) {
                return res;  // Si se encuentra en el caché, retorna el resultado
            }
            return fetch(e.request);  // Si no se encuentra en el caché, realiza la solicitud a la red
        })
    );
});
