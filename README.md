# Balkan Kaçamağı 🏖

Barış Kaya & Derin Beyza Günal'ın **12 – 20 Ağustos 2026** Balkan turu için hazırlanmış
tek sayfalık tur programı sitesi.

**Rota:** İstanbul → Priştine → Üsküp → Ohrid → Dıraç → Tiran → İstanbul
**Süre:** 8 gün / 7 gece · 3 ülke (Kosova, Kuzey Makedonya, Arnavutluk)

---

## Nasıl açılır

`index.html`'e çift tıkla. Hepsi bu.

Site tek dosyadır: CSS ve JS inline, build adımı yok. Modern tarayıcıların hepsinde çalışır,
mobile-first yazılmıştır (temel stiller mobil için, `min-width` sorgularıyla masaüstüne genişler).

> **İnternete bağlı iki parça var**, ikisi de bozulmaya karşı korumalı:
> - **Fotoğraflar** Wikimedia Commons'tan yükleniyor; erişilemezse yerine degrade renkli
>   yer tutucu ve mekân adı çıkar.
> - **Rota haritası** Leaflet 1.9.4 kullanıyor (unpkg, SRI hash'li) — projedeki
>   "harici bağımlılık yok" kuralına tek ve bilinçli istisna. Yüklenemezse harita bölümü
>   gizlenir, yerine rotayı yazan sade bir kutu çıkar.
>
> Her iki durumda da sayfanın geri kalanı çevrimdışı sorunsuz çalışır.

Yerel sunucu tercih edersen:

```bash
python -m http.server 8000
# http://localhost:8000
```

---

## Dosya düzeni

| Dosya | Ne işe yarar |
|---|---|
| `index.html` | Sitenin tamamı — içerik, tasarım ve davranış tek dosyada |
| `manifest.json` | PWA tanımı: ad, ikon, tema rengi, standalone görünüm |
| `sw.js` | Service worker — çevrimdışı çalışma ve önbellek stratejileri |
| `icon.svg` | Uygulama ikonu (maskable) |
| `docs/img/` | Yerele indirilmiş şehir kapak görselleri + `KAYNAKLAR.md` lisans listesi |
| `PLAN.md` | **Planın tek doğruluk kaynağı.** Uçuşlar, konaklama, gün gün program, yapılanlar ve bekleyenler |
| `README.md` | Bu dosya |
| `docs/` | Bilet PDF'leri, ekran görüntüleri, rezervasyon çıktıları |
| `.gitignore` | Standart yoksayma listesi |

---

## İçerik nasıl güncellenir

Sitenin bütün metinleri `index.html` dosyasının **en başındaki tek bir `const TUR = {...}`
objesinde** toplanmıştır. HTML gövdesi boş kabuklardan oluşur; sayfa bu objeden JS ile
render edilir. Yani içerik ile sunum ayrıdır — **metin değiştirmek için CSS'e veya HTML'e
dokunmak gerekmez.**

`TUR` objesinin bölümleri:

| Alan | İçerik |
|---|---|
| `meta` | Başlık, yolcular, tarih aralığı, süre, giriş cümlesi, sayaç hedefleri (`kalkisISO`, `donusISO`) |
| `ucuslar` | Gidiş ve dönüş: havayolu, sefer, PNR, saat/havalimanı, bagaj, gece uçuşu uyarısı |
| `rota` | Rota şeridindeki duraklar: ad, gece notu |
| `konaklama` | Hangi gece hangi şehir, kaç gece, tesis adı |
| `sehirler` | Şehir kartları: tema, rehber tanıtımı, "Öne çıkanlar", `kapak` görseli, `galeri` dizisi |
| `gunler` | 9 günlük program: tarih, başlık, özet, akış, rehber notları, `risk`, gece bilgisi |
| `ulasim` | Ulaşım özeti tablosu: bacak, süre, yöntem, durum |
| `harita` | Harita ayarları: karo kaynağı ve atıf, zoom sınırları, havalimanları, yedek metin |
| `dikkatEdilecekler` | "Nelere dikkat etmeli" kartları: ikon, başlık, `seviye`, maddeler |
| `cepte` | Cepte bölümü: uçuş kodları, konaklama, acil numaralar, temel kelimeler |
| `havaDurumu` | Open-Meteo ayarları, gün→şehir eşlemesi, mevsim normalleri, uyarı eşikleri |
| `yemeIcmeNotlari` | Şehir kartlarının altındaki yeme-içme notları kutusu |
| `pratik` | Pratik bilgi kartları: para, bütçe, elektrik, sağlık, adap, kelimeler |
| `kontrolListesi` | Hazırlık listesi maddeleri |
| `belirlenecek` | Sayfa sonundaki açık işler listesi |

### Pratik notlar

- **Geri sayım üç durumlu:** `meta.kalkisISO` ve `meta.donusISO` alanlarına bağlı.
  Kalkıştan önce "Yola çıkmaya kalan", 12-19 Ağustos arasında "Dönüşe kalan" + "Turun N. günü / 8",
  dönüş uçuşundan sonra "Tur tamamlandı". Uçuş saatleri değişirse bu iki alanı güncelle.
- **Bugünü vurgulama:** her günün `tarihISO` alanı sistem tarihiyle karşılaştırılır.
  Tarih aralık içindeyse o gün kartı vurgulanır ve otomatik açılır.
- **Görseller:** `kapak` ve `galeri` alanlarında `{ gorsel, alt, kaynak }` şeklinde durur.
  Kaynak olarak Wikimedia Commons'ın `upload.wikimedia.org/.../960px-...` thumb URL'leri
  kullanılıyor — Wikimedia yalnızca belirli genişliklere izin veriyor, rastgele bir sayı
  (ör. 800) `400` döndürür. **Yeni görsel eklerken URL'i ezberden yazma:** Commons'ta ara,
  `curl -I` ile 200 döndüğünü doğrula, sonra ekle. `kaynak` alanına fotoğrafçı + lisans yaz.
  Yüklenemeyen görsel `onerror` ile degrade yer tutucuya düşer, sayfa bozulmaz.
- **Lightbox:** `.gorsel-kutu` sınıfı olan her görsel tıklanabilir; Escape ya da boşluğa
  tıklamak kapatır. Harici kütüphane yok, kod render bloğunun içinde.
- **Risk satırı:** `gunler[].risk` doldurulursa gün kartında "Bu günün riski" uyarısı çıkar,
  boş bırakılırsa satır hiç render edilmez.
- **Dikkat kartı seviyeleri:** `seviye` alanı `kritik`, `yuksek` ya da `normal` olabilir;
  sırasıyla "kritik / önemli / bilgi" etiketi ve farklı kenar rengi verir.
- **Harita durakları:** bir şehri haritada göstermek için `sehirler[]` kaydına
  `konum: [enlem, boylam]`, `haritaSira`, `haritaGece`, `haritaTarih` ve `haritaGun`
  (gün kartının id'si, ör. `gun-3`) alanlarını ekle. `haritaSira` yoksa şehir haritaya
  çizilmez. **Koordinatı ezberden yazma** — Wikidata'daki `P625` değerini kullan;
  mevcutların listesi `PLAN.md` bölüm 8'de.
- **Leaflet sürümü değişirse** SRI hash'i de değişmeli: dosyayı indirip SHA-384'ünü
  hesapla, base64'e çevir, `integrity` değerini güncelle. Hash tutmazsa tarayıcı
  script'i çalıştırmaz ve harita sessizce yedek kutuya düşer.
- **Lezzetler:** `sehirler[].lezzetler` dizisine `{ ad, yerel, aciklama, ipucu, gorsel?, kaynak? }`
  ekle. `gorsel` yoksa madde ikonla gösterilir — uydurma URL yazmaktansa boş bırak.
  Görsel kartın tam genişliğinde 16:9 bant olarak basılır; yatay (manzara) görseller
  daha iyi durur.
- **Favoriler:** kalp düğmeleri `sehirAdı::maddeMetni` biçiminde kimlik kullanır. Bir
  maddenin metnini değiştirirsen o maddeye daha önce verilmiş kalp kaybolur — metin
  düzenlerken bunu bil.
- **Anı notları:** her gün kartında `textarea[data-ani="YYYY-MM-DD"]` var, tarih anahtar
  olarak kullanılıyor. `gunler[].tarihISO` değişirse eski not erişilemez hâle gelir.
- **Bugün kartı:** `?tarih=2026-08-15` parametresiyle istediğin günü simüle edip
  görünümü test edebilirsin. Kart yalnızca tarih 12-20 Ağustos 2026 aralığındayken çıkar.
- **Hava durumu:** `havaDurumu.gunSehir` hangi gün hangi şehrin tahmininin çekileceğini
  belirler. İstek `forecast_days=16` ile atılır — **bu parametre şart**, Open-Meteo'nun
  varsayılanı 7 gündür ve o hâlde tur tarihleri pencerede olsa bile boş döner.
  Tur tarihi Open-Meteo'nun ~16 günlük penceresinin dışındaysa
  `havaDurumu.mevsimNormali` gösterilir — bu normaller elle girilmiş yer tutuculardır.
  Yanıt `localStorage`'da `balkan2026.hava` anahtarında 3 saat önbelleklenir.
- **Acil numaralar:** `cepte.acil` içinde değeri "kontrol edilecek" olan maddeler
  `tel:` bağlantısı almaz, vurgulu "belirlenecek" olarak görünür. **Doğrulamadığın bir
  telefon numarasını asla yazma.** Büyükelçilik numaraları `mfa.gov.tr` üzerindeki resmî
  "İletişim" sayfalarından alındı; güncellerken arama sonucu özetine değil, sayfanın
  kendisine bak. İsteğe bağlı alanlar: `nobetci` (mesai dışı hat) ve `adres`.
- **Güvenli alan (çentik / Dynamic Island):** sayfanın en üstündeki `.ust-alan` bandı
  `env(safe-area-inset-top)` kadar yer ayırır; üste yeni bir şey eklerken bu bandın
  **içine ya da altına** koy, öncesine değil — yoksa iPhone'da adanın altında kalır ve
  dokunulamaz. Footer'da da `env(safe-area-inset-bottom)` payı var.
- **Görsel künyeleri kırpma:** fotoğrafçı + lisans metni atıf yükümlülüğüdür.
  `text-overflow:ellipsis` ile kesme; yer dardır diye kısaltmak yerine satır ayır.
- **Mobil:** yeni bir ızgara eklerken `1fr` yerine **`minmax(0,1fr)`** kullan — `1fr`'nin
  alt sınırı `auto` olduğu için uzun içerik sütunu şişirip kartı taşırıyor. Yeni tablo
  eklersen hücrelere `data-label` ver; 700 px altında başlık olarak basılıyor.
- **"Belirlenecek" işaretleri:** metinde geçen _belirlenecek_, _kontrol edilecek_,
  _alınacak_ ifadeleri otomatik olarak vurgulu gösterilir. Emin olunmayan bir bilgiyi
  uydurmak yerine bu ifadelerden birini yaz.
- **Tarayıcıda saklanan veriler** (hepsi `localStorage`, sunucuya hiçbir şey gitmez):

  | Anahtar | İçerik |
  |---|---|
  | `balkan2026.hazirlik` | Hazırlık listesi işaretleri |
  | `balkan2026.favoriler` | ♥ İkimizin listesi — beğenilen mekân ve lezzetler |
  | `balkan2026.anilar` | Gün kartlarındaki anı notları |
  | `balkan2026.hava` | Hava durumu yanıtı + zaman damgası (3 saat) |
  | `balkan2026.tema` | Koyu / açık tema tercihi (yoksa sistem tercihi geçerli) |

  Bunlar cihaza özeldir; telefonda işaretlenen bir şey bilgisayarda görünmez —
  taşımak için aşağıdaki yedekleme kutusu var.
- **Yedekleme / taşıma:** Hazırlık bölümünün altındaki kutu ilk üç anahtarı tek bir
  `.json` dosyasına yazar (indir ya da panoya kopyala). Geri yükleme **ezmez, birleştirir**:
  işaret ve kalplerde "seçili" olan kazanır, aynı güne iki farklı anı notu yazılmışsa
  ikisi de `———` çizgisiyle alt alta korunur. Böylece iki telefonun kaydı birbirini
  silmeden birleşir. Dosya `uygulama: "balkan-kacamagi"` alanıyla doğrulanır, yabancı
  dosya reddedilir. Birleştirmeden sonra sayfa kendini yeniler.
- **Karanlık tema:** Renkler `:root` token'larında olduğu için koyu tema
  `html[data-tema="koyu"]` altında token'ları ezerek çözülür; yalnızca birkaç sabit renk
  (uyarı rozetleri, kalpler, harita karoları) tek tek dengelenir. **Yeni bir kart eklerken
  sabit renk yazma, token kullan** — o zaman koyu tema kendiliğinden doğru çalışır.
  Tema seçimi `<head>` içindeki küçük script ile ilk boyamadan önce uygulanır (aksi hâlde
  açılışta beyaz parlama olur). Kullanıcı düğmeye basmadıysa sistem tercihi izlenir.
- **Üst çubuk:** bölüm bağlantıları DOM'daki görünür `section[id]`'lerden üretilir, adlar
  `NAV_ADLARI` eşlemesinde durur; yeni bölüm eklersen oraya bir satır ekle, yoksa çubukta
  çıkmaz. Çubuk `position:sticky` — bu yüzden `html`/`body` üzerinde `overflow-x` **`clip`**
  kullanılıyor, `hidden` bırakılırsa yapışkanlık sessizce çalışmaz.
- **Yazdırma:** 🖨 düğmesi ya da Ctrl+P. Yazdırma stilinde bütün renk token'ları beyaz
  kâğıda uygun bir sete indirgenir (koyu tema açıkken bile), etkileşimli parçalar
  (harita, sayaç, galeri, düğmeler, notlar) gizlenir ve **katlanmış gün kartları açılır**.
  Sınırda ya da internetsiz resepsiyonda kâğıt yedeği için.
- **Kontrol listesi:** işaretler tarayıcının `localStorage`'ında `balkan2026.hazirlik`
  anahtarıyla saklanır. Liste 10/10 olunca konfeti ve kutlama kutusu çıkar — yalnızca
  tamamlanma anında, her açılışta değil. Yeni madde eklerken `id` alanının benzersiz olmasına dikkat et;
  mevcut bir `id`'yi değiştirmek o maddenin kaydını sıfırlar.
- **Rehber notu etiketleri:** `notlar` dizisindeki `tip` alanı "En iyi saat", "Dikkat" veya
  "İpucu" olabilir. "Dikkat" ve "İpucu" ayrı renkle gösterilir.
- **Tasarım:** renk, boşluk, radius ve gölge değerleri CSS'te `:root` altındaki
  token'larda tanımlıdır. Tema değişikliği için oradan başla.

---

## Çalışma kuralı

Her değişiklikte, ne kadar küçük olursa olsun:

1. Değişikliği yap.
2. **`PLAN.md`**'yi güncelle: plan bölümleri `TUR` objesiyle birebir tutarlı kalsın,
   "Yapılanlar" bölümüne tarihli madde ekle, "Bekleyenler" listesini tazele.
3. Açıklayıcı bir Türkçe commit mesajıyla commit'le.
4. `git push` yap.

`PLAN.md` ile `index.html` içindeki `TUR` objesi asla ayrışmamalıdır.

---

## PWA — çevrimdışı çalışma ve telefona kurma

Site bir **progressive web app**: telefona uygulama gibi eklenebiliyor ve yurt dışında
internet olmadan da açılıyor. Bunu `manifest.json` + `sw.js` sağlıyor — projedeki
"tek dosya" kuralına ikinci bilinçli istisna, çünkü service worker tarayıcı gereği
ayrı bir dosya olmak zorunda.

### Test etmek

**Service worker yalnızca `https://` ya da `localhost` üzerinde çalışır.** Dosyayı
çift tıklayıp `file://` ile açarsan site normal çalışır ama çevrimdışı desteği devreye girmez.

```bash
python -m http.server 8000
# http://localhost:8000 — 127.0.0.1 de kabul edilir
```

Çevrimdışı davranışı denemek için: sayfayı bir kez aç (önbellek dolsun), sonra sunucuyu
durdur ve sayfayı yenile. Site açılmaya devam etmeli.

DevTools → Application sekmesinden `Service Workers` ve `Cache Storage` bölümlerini
izleyebilirsin. Üç cache olur: `balkan-v1-shell`, `balkan-v1-gorsel`, `balkan-v1-hava`.

### Telefona ekleme

- **Android / Chrome:** menü → "Ana ekrana ekle"
- **iOS / Safari:** paylaş → "Ana Ekrana Ekle"

### Service worker güncellemesi

`index.html`, CSS ya da JS değiştirdiğinde tarayıcı yeni service worker'ı arka planda kurar
ve sayfada **"✨ Yeni sürüm hazır / Yenile"** çubuğu çıkar. Yenile'ye basmak yeni sürümü
devralır.

Önbelleklenen dosya listesi değiştiyse (`sw.js` içindeki `APP_SHELL`) ya da eski önbelleğin
tamamen atılması gerekiyorsa **`CACHE_VERSION` sabitini artır** (`balkan-v1` → `balkan-v2`).
Eski cache'ler `activate` sırasında otomatik silinir.

Takılırsan: DevTools → Application → Service Workers → *Unregister*, sonra sert yenileme.

### Çevrimdışı neler çalışır

| Çalışır | Çalışmaz |
|---|---|
| Tüm program, Cepte, gün kartları, kontrol listesi | Galeri ve lezzet görselleri (Wikimedia'dan hotlink) |
| 5 şehir kapak görseli (yerelden servis ediliyor) | Yeni hava durumu verisi (son kayıtlı veri gösterilir) |
| Harita — Leaflet önbellekten, daha önce görülen karolar | Daha önce hiç açılmamış harita bölgeleri |

Gelmeyen görsellerin yerine degrade renkli yer tutucu + mekân adı çıkar; sayfa bozulmaz.

---

## Deploy

Statik tek dosya olduğu için herhangi bir statik barındırma çalışır.
En kolayı GitHub Pages:

1. Repo → **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` / `root` → Save

Birkaç dakika içinde site `https://kayalarbk.github.io/Balkanturu/` adresinde yayına girer.
Build adımı yoktur; `main`'e her push yayını günceller.

Alternatif: Netlify veya Vercel'e klasörü sürükle-bırak — yapılandırma gerekmez.
