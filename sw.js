/* =====================================================================
   Balkan Kaçamağı — Service Worker
   Amaç: yurt dışında internet olmadan da programın açılması.

   Sürüm artırıldığında eski cache'ler activate sırasında silinir —
   karo ve görsel cache'leri hariç, onlar bilerek sürümsüzdür (aşağıda).
   Strateji özeti:
     - HTML / gezinme  → network-first, hata olursa cache
     - App shell       → install'da ön belleğe alınır
     - Harita karoları → yalnızca cache; yoksa bir kez indir, bir daha sorma
     - Görsel & Leaflet→ cache-first + stale-while-revalidate
     - Hava durumu API → network-first, hata olursa son başarılı yanıt
   ===================================================================== */

/* index.html her değiştiğinde artırılır — yoksa siteyi ana ekrana eklemiş
   cihazlar eski sürümü görmeye devam eder. Eski cache'ler activate içinde
   silinir (BIZIM_CACHELER dışındaki her ad temizlenir).
   v6 — 4 Ağustos 2026: telefon optimizasyonu (Leaflet istendiğinde yükleniyor).
   v7 — 6 Ağustos 2026: plan revizyonu + iki kişilik tema, 19 lezzet görseli,
        katlanır "Ne yenir?". İki oturum boyunca artırılmayı atlamıştı; ana
        ekrana eklemiş cihazlar çevrimdışıyken eski kabuğu görürdü.

   ⚠ Leaflet artık index.html'in <head>'inde DEĞİL, harita bölümü yaklaşınca
   enjekte ediliyor. APP_SHELL'de kalması bilinçli: çevrimdışıyken harita
   bölümüne inildiğinde dosyalar cache'ten gelsin diye burada ön belleğe
   alınıyor — yükleme sayfayı yavaşlatmıyor, install arka planda yapıyor. */
const CACHE_VERSION = "balkan-v7";
const SHELL_CACHE = CACHE_VERSION + "-shell";
const HAVA_CACHE = CACHE_VERSION + "-hava";

/* ⚠ Bu ikisi bilerek SÜRÜMSÜZDÜR.
   Sürüme bağlansalardı her index.html güncellemesinde activate onları
   silerdi: kullanıcı evdeyken indirdiği harita karolarını ve yüklenmiş
   fotoğrafları yolda, roaming kapalıyken kaybederdi. İçerikleri adrese
   göre değişmez (karo ve Wikimedia görsel adresleri sabittir), o yüzden
   eskimeleri sorun değil.
   KARO_CACHE adı index.html içindeki KARO_CACHE ile ORTAKTIR — biri
   değişirse diğeri de değişmeli, yoksa indirilen karolar okunamaz. */
const GORSEL_CACHE = "balkan-gorsel";
const KARO_CACHE = "balkan-karo";

const BIZIM_CACHELER = [SHELL_CACHE, HAVA_CACHE, GORSEL_CACHE, KARO_CACHE];

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
const GORSEL_HOSTLAR = ["upload.wikimedia.org", "unpkg.com"];
/* Karo sunucusu: a/b/c.tile.openstreetmap.org — hepsi aynı kalıba uyar */
const KARO_HOST = /(^|\.)tile\.openstreetmap\.org$/;

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

/* Yalnızca cache; yoksa ağdan al ve sakla. Harita karoları için.
   Tazeleme yapılmaz: karo içeriği değişmez, ama yurt dışında her karo için
   arka planda atılacak bir istek doğrudan roaming faturası demek. */
async function karoCache(istek) {
  const cache = await caches.open(KARO_CACHE);
  const kayitli = await cache.match(istek);
  if (kayitli) return kayitli;
  const yanit = await fetch(istek);
  if (yanit && yanit.ok) cache.put(istek, yanit.clone());
  return yanit;
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

  /* 3) Harita karoları → yalnızca cache; yoksa bir kez indir ve sakla.
        Kullanıcı "Çevrimdışına al" dediyse tamamı burada hazır bekler. */
  if (KARO_HOST.test(url.hostname)) {
    e.respondWith(karoCache(istek).catch(() => new Response("", { status: 504 })));
    return;
  }

  /* 4) Görseller ve Leaflet → cache önce + arka planda tazele */
  const gorselMi =
    istek.destination === "image" ||
    GORSEL_HOSTLAR.includes(url.hostname) ||
    /\.(?:jpg|jpeg|png|svg|webp|gif|css|js)$/i.test(url.pathname);

  if (gorselMi) {
    e.respondWith(cacheOnceTazele(istek, url.hostname === self.location.hostname ? SHELL_CACHE : GORSEL_CACHE));
    return;
  }

  /* 5) Kalan her şey: ağ önce, çevrimdışıysa cache */
  e.respondWith(agOnce(istek, SHELL_CACHE).catch(() => caches.match(istek)));
});
