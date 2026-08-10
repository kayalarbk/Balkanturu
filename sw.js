/* =====================================================================
   Balkanlar'da Aşk — Service Worker
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
   v8 — 7 Ağustos 2026: site adı "Balkanlar'da Aşk", dört bölüm kaldırıldı
        (Rota · Ulaşım · Pratik · Cepte'deki uçuş kartı), rota şeridi girişe alındı.
   v9 — 7 Ağustos 2026: yandan açılan gezinme çekmecesi, acil cümleler,
        sağlık kartı, "ne yapmalı" akışları, hastaneler, buluşma planı,
        kur defteri, yol koridoru karoları (236 → 316).
   v10 — 8 Ağustos 2026: saat farkı kartı, Cepte sekmelere bölündü, kur defteri
        kaldırıldı.
   v11 — 8 Ağustos 2026: beş otogar (Priştine · Üsküp · Ohrid · Dıraç · Tiran)
        — Cepte kartı, harita pini, Günün Kartı'nda kalkış otogarı ve
        otogar karoları (316 → 390).
   v12 — 8 Ağustos 2026: indirilebilir .ics takvim dosyası (11 etkinlik, UTC
        damgalı, alarmlı) ve Cepte'nin yatay sekme şeridi alt alta akordeona
        çevrildi.
   v13 — 8 Ağustos 2026: ?yazdir=acil — tek A4'e sığan acil çıktı kâğıdı
        (adresler, PNR'lar, acil numaralar, sağlık kartı, buluşma noktaları,
        acil cümleler). Sayfanın geri kalanı bu modda hiç kurulmuyor.
   v14 — 8 Ağustos 2026: ?kontrol=1 — TUR objesini gezip 8 grupta rapor basan
        veri tutarlılık denetimi (gün dizisi, koordinatlar, kimlikler, gün ↔
        ulaşım, hava eşlemesi, yer tutucular, görseller, şehir ↔ harita).
   v15 — 8 Ağustos 2026: Günün Kartı'nda "⬇ Görsel" — kart 1080 × 1920 PNG
        olarak canvas'a elle çizilip indiriliyor (kütüphane yok). Kilit
        ekranına konsun diye renkler temaya bağlı DEĞİL.
   v16 — 9 Ağustos 2026: yolda verim paketi. Program maddeleri saatli veriye
        çevrildi ({saat, dilim, metin, yer}); Bugün ekranında geri sayımlı
        "Şu an / Sıradaki" kutusu, akış tikleri, eylem şeridi, uçuş günü
        bloğu ve her sabah sıfırlanan çıkış listesi; gün kartlarında geçmiş
        maddeler soluk, o anki madde vurgulu, satırlarda yol tarifi;
        üst çubukta çift saat (cihaz + TR) ve site içi arama (🔍 / Ctrl+K);
        haritada "yalnızca indirilmiş karo" veri kilidi ve konum rozetinde
        Yakınımdakiler; Cepte'ye "Günlük cümleler" + rakamlar sekmesi;
        Günün Kartı ve tam ekran haritada ekran uyanık tutuluyor (Wake Lock).
   v17 — 10 Ağustos 2026: bildirim. Takvim dosyası artık program verisinden
        üretiliyor: 11 → 29 etkinlik. Her saatli madde bir VEVENT, alarm
        politikası veriden (`hatirlatma`: sert → 60+15 dk, orta → 30 dk,
        yok → alarmsız); her sabah 08:00'de "Bugünün programı" özeti.
        Başka etkinliğin kapsadığı maddeler `takvimDisi` ile eleniyor.
        Ayrıca site AÇIKKEN çalışan isteğe bağlı hatırlatma (10 dk kala).
   v18 — 10 Ağustos 2026: "Nelere dikkat etmeli" 15 kartı akordeona çevrildi
        (Cepte'nin kalıbı: başlıklar alt alta, tek kart açık, seviye rozeti
        kapalıyken de görünür) ve gün kartlarına o günün YAPILACAKLAR listesi
        eklendi (`gunler[].yapilacaklar`, tikler cihazda, Bugün ekranında
        yalnızca kalanlar özetleniyor).
   v19 — 10 Ağustos 2026: çevrimdışı boşlukları kapatıldı. (1) karoCache
        artık OPAK yanıtı da önbelleğe yazıyor — Leaflet karoları <img> ile
        isteniyor, yanıt opak ve `ok` false geldiği için gezerken görülen
        hiçbir karo cache'e girmiyordu. (2) Galeri ve lezzet fotoğrafları
        için "Fotoğrafları çevrimdışına al" düğmesi. Ayrıca dört yerde
        tekrarlanan bagaj dolabı metni sadeleştirildi ve arayüze
        prefers-reduced-motion'a saygılı küçük animasyonlar eklendi.

   ⚠ Leaflet artık index.html'in <head>'inde DEĞİL, harita bölümü yaklaşınca
   enjekte ediliyor. APP_SHELL'de kalması bilinçli: çevrimdışıyken harita
   bölümüne inildiğinde dosyalar cache'ten gelsin diye burada ön belleğe
   alınıyor — yükleme sayfayı yavaşlatmıyor, install arka planda yapıyor. */
const CACHE_VERSION = "balkan-v19";
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
  /* ⚠ `yanit.ok` TEK BAŞINA YETMEZ. Leaflet karoları <img src> ile isteniyor,
     yani istek no-cors; dönen yanıt OPAK ve opak yanıtta status 0'dır, `ok`
     false gelir. Eskiden burada yalnızca `yanit.ok` kontrol ediliyordu ve
     sonuç şuydu: haritada gezerken görülen hiçbir karo cache'e YAZILMIYORDU.
     Çevrimdışı harita yalnızca "Çevrimdışına al" ile inen 390 karodan
     ibaret kalıyordu; elle gezilen her yer yolda griye dönüyordu.
     Opak yanıtı da kabul etmek boşluğu kapatıyor: artık evde bakılan her
     bölge yolda da açılıyor. */
  if (yanit && (yanit.ok || yanit.type === "opaque")) cache.put(istek, yanit.clone());
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
