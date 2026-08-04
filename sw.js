/* =====================================================================
   Balkan Kaçamağı — Service Worker
   Amaç: yurt dışında internet olmadan da programın açılması.

   Sürüm artırıldığında eski cache'ler activate sırasında silinir.
   Strateji özeti:
     - HTML / gezinme  → network-first, hata olursa cache
     - App shell       → install'da ön belleğe alınır
     - Görsel & karo   → cache-first + stale-while-revalidate
     - Leaflet (CDN)   → cache-first + stale-while-revalidate
     - Hava durumu API → network-first, hata olursa son başarılı yanıt
   ===================================================================== */

/* index.html her değiştiğinde artırılır — yoksa siteyi ana ekrana eklemiş
   cihazlar eski sürümü görmeye devam eder. Eski cache'ler activate içinde
   silinir (BIZIM_CACHELER dışındaki her ad temizlenir).
   v3 — 4 Ağustos 2026: konaklama kartı sadeleştirildi, hava durumu null düzeltmesi. */
const CACHE_VERSION = "balkan-v3";
const SHELL_CACHE = CACHE_VERSION + "-shell";
const GORSEL_CACHE = CACHE_VERSION + "-gorsel";
const HAVA_CACHE = CACHE_VERSION + "-hava";
const BIZIM_CACHELER = [SHELL_CACHE, GORSEL_CACHE, HAVA_CACHE];

/* Çevrimdışı açılış için gereken en küçük set */
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "./docs/img/kapak-pristine.jpg",
  "./docs/img/kapak-uskup.jpg",
  "./docs/img/kapak-ohrid.jpg",
  "./docs/img/kapak-dirac.jpg",
  "./docs/img/kapak-tiran.jpg",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
];

const HAVA_HOST = "api.open-meteo.com";
const GORSEL_HOSTLAR = ["upload.wikimedia.org", "tile.openstreetmap.org", "unpkg.com"];

/* ---------- install: app shell'i ön belleğe al ---------- */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(SHELL_CACHE).then((c) =>
      /* Tek tek ekle: CDN'den biri düşerse kurulumun tamamı çökmesin */
      Promise.all(
        APP_SHELL.map((u) =>
          c.add(new Request(u, { cache: "reload" })).catch(() => null)
        )
      )
    )
  );
});

/* ---------- activate: eski sürümlerin cache'ini temizle ---------- */
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((adlar) =>
        Promise.all(adlar.map((a) => (BIZIM_CACHELER.includes(a) ? null : caches.delete(a))))
      )
      .then(() => self.clients.claim())
  );
});

/* Sayfadan "yenile" denince beklemeden devral */
self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

/* ---------- yardımcı stratejiler ---------- */

/* Ağ önce; başarısızsa cache. HTML ve hava durumu için. */
async function agOnce(istek, cacheAdi) {
  const cache = await caches.open(cacheAdi);
  try {
    const yanit = await fetch(istek);
    if (yanit && yanit.ok) cache.put(istek, yanit.clone());
    return yanit;
  } catch (err) {
    const kayitli = await cache.match(istek);
    if (kayitli) return kayitli;
    throw err;
  }
}

/* Cache önce; arka planda tazele (stale-while-revalidate). Görseller için. */
async function cacheOnceTazele(istek, cacheAdi) {
  const cache = await caches.open(cacheAdi);
  const kayitli = await cache.match(istek);
  const agdan = fetch(istek)
    .then((yanit) => {
      if (yanit && (yanit.ok || yanit.type === "opaque")) cache.put(istek, yanit.clone());
      return yanit;
    })
    .catch(() => null);
  return kayitli || agdan || Response.error();
}

/* ---------- fetch ---------- */
self.addEventListener("fetch", (e) => {
  const istek = e.request;
  if (istek.method !== "GET") return;

  let url;
  try { url = new URL(istek.url); } catch (err) { return; }
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  /* 1) Gezinme / HTML → ağ önce, çevrimdışıysa kayıtlı sayfa */
  if (istek.mode === "navigate" || (istek.headers.get("accept") || "").includes("text/html")) {
    e.respondWith(
      agOnce(istek, SHELL_CACHE).catch(() =>
        caches.match("./index.html").then((r) => r || caches.match("./"))
      )
    );
    return;
  }

  /* 2) Hava durumu → ağ önce; ağ yoksa son başarılı yanıt
        (sayfa "son güncelleme" bilgisini localStorage'daki damgadan gösteriyor) */
  if (url.hostname === HAVA_HOST) {
    e.respondWith(agOnce(istek, HAVA_CACHE).catch(() => new Response("", { status: 504 })));
    return;
  }

  /* 3) Görseller, harita karoları ve Leaflet → cache önce + arka planda tazele */
  const gorselMi =
    istek.destination === "image" ||
    GORSEL_HOSTLAR.includes(url.hostname) ||
    /\.(?:jpg|jpeg|png|svg|webp|gif|css|js)$/i.test(url.pathname);

  if (gorselMi) {
    e.respondWith(cacheOnceTazele(istek, url.hostname === self.location.hostname ? SHELL_CACHE : GORSEL_CACHE));
    return;
  }

  /* 4) Kalan her şey: ağ önce, çevrimdışıysa cache */
  e.respondWith(agOnce(istek, SHELL_CACHE).catch(() => caches.match(istek)));
});
