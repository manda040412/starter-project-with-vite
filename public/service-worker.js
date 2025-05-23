const CACHE_NAME = "life-story-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  // Tambahkan file statis lain yang ingin di-cache
];

// Install SW dan cache file statis
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch: cache first, fallback ke network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Activate: hapus cache lama
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

self.addEventListener("push", event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Notifikasi Baru!";
  const options = {
    body: data.body || "Ada update baru di Daily Life Story.",
    icon: "/icons/icon-192x192.png"
  };
  event.waitUntil(self.registration.showNotification(title, options));
});