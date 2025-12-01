// Nama cache. Tambahkan nomor versi (v1, v2, dll.) setiap kali Anda mengubah file.
const CACHE_NAME = 'pantryflow-v1'; 

// Daftar aset yang akan di-cache saat instalasi
const urlsToCache = [
  '/PantryFlow/', // atau '/PantryFlow/index.html' tergantung konfigurasi start_url Anda
  '/PantryFlow/index.html', 
  '/PantryFlow/style.css',
  '/PantryFlow/script.js',
  // Tambahkan path ke ikon, logo, dan font penting lainnya di sini
  // Contoh:
  // '/PantryFlow/images/icon-192x192.png',
  // '/PantryFlow/images/icon-512x512.png', 
];


// --- Event: INSTALL (Menginstal Service Worker dan melakukan Caching) ---
self.addEventListener('install', event => {
  console.log('[Service Worker] Menginstal...');
  
  // Tunggu sampai semua aset penting berhasil di-cache
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Pre-caching aset statis');
        return cache.addAll(urlsToCache);
      })
  );
});


// --- Event: ACTIVATE (Membersihkan cache lama) ---
self.addEventListener('activate', event => {
  console.log('[Service Worker] Mengaktifkan...');

  // Hapus semua cache lama yang berbeda dengan CACHE_NAME saat ini
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Ambil kendali atas semua klien/halaman yang sudah ada
  return self.clients.claim();
});


// --- Event: FETCH (Strategi Caching: Cache-First, kemudian Network) ---
self.addEventListener('fetch', event => {
  // Hanya tangani permintaan HTTP/HTTPS, abaikan permintaan non-HTTP (misalnya chrome-extension://)
  if (event.request.url.startsWith(self.location.origin)) {
      
      event.respondWith(
          // 1. Coba cari di Cache terlebih dahulu
          caches.match(event.request)
              .then(response => {
                  // Jika ditemukan di cache, kembalikan respons dari cache
                  if (response) {
                      console.log('[Service Worker] Melayani dari cache:', event.request.url);
                      return response;
                  }

                  // 2. Jika tidak ditemukan di cache, coba ambil dari Network
                  console.log('[Service Worker] Melayani dari network:', event.request.url);
                  return fetch(event.request);
              })
              // Tangani jika koneksi gagal (terutama saat offline)
              .catch(error => {
                  console.error('[Service Worker] Permintaan gagal:', error);
                  // Di sini Anda bisa mengembalikan halaman "offline.html" jika Anda membuatnya
              })
      );
  }
});
