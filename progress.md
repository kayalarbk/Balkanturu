# Balkanlar'da Aşk — Proje Durumu (progress.md)

> **Bu dosya nedir?** Sitenin teknik ve içerik durumunun tek bakışta özeti: ne var, nasıl
> çalışıyor, ne kadar tamam, sırada ne var ve çalışırken hangi kurallara uyuluyor.
>
> **İlgili dosyalar:** planın tek doğruluk kaynağı `PLAN.md`, kullanım ve geliştirme
> kılavuzu `README.md`. Bu dosya onların yerine geçmez; ikisinin üstünde bir *durum panosu*.

**Son güncelleme:** 8 Ağustos 2026
**Depo:** https://github.com/kayalarbk/Balkanturu (`main`)
**Yayın:** https://kayalarbk.github.io/Balkanturu/ (GitHub Pages, `main` / root — build adımı yok)
**Son commit:** `a3b1966` + otogar oturumu
**Çalışma ağacı:** temiz · **Toplam commit:** 28 · **Oturum sayısı:** 19

---

## 0. Çalışma kuralları (bunlar bağlayıcıdır)

1. **Değişiklik push'lanmadan görev bitmez.** Kod değişti ama `git push` yapılmadıysa iş
   yarım sayılır. Sıra her zaman: değişikliği yap → `PLAN.md` + `progress.md` güncelle →
   açıklayıcı **Türkçe** commit mesajı → `git push`. Push başarısız olursa sebebi çözülür,
   görev "bitti" diye kapatılmaz.
2. **`PLAN.md` ile `index.html` içindeki `TUR` objesi asla ayrışmaz.** Biri değişirse
   diğeri **aynı commit'te** güncellenir (uçuş, konaklama, gün programı, ulaşım, koordinat).
3. **Uydurma bilgi yasak.** Doğrulanmamış telefon numarası, saat, ücret, koordinat veya
   görsel URL'i yazılmaz. Emin olunmayan yere _belirlenecek_ / _kontrol edilecek_ /
   _alınacak_ yazılır — bu ifadeler sitede otomatik vurgulanır.
4. **Harici bağımlılık eklenmez.** Tek bilinçli istisna Leaflet 1.9.4'tür (aşağıda).
   Yeni bir CDN, framework veya paket getirmek yerine kod elle yazılır.
5. **Mobile-first.** Temel stiller mobil içindir, masaüstü `min-width` sorgularıyla
   genişletilir. Yeni ızgarada `1fr` değil **`minmax(0,1fr)`** kullanılır.
6. **Renk sabiti yazılmaz, token kullanılır.** Aksi hâlde karanlık tema ve yazdırma çıktısı
   sessizce bozulur.
7. **Her oturum `PLAN.md` → "Yapılanlar" altına tarihli madde bırakır** ve "Bekleyenler"
   listesini tazeler.

---

## 1. Gezinin künyesi

| | |
|---|---|
| Yolcular | Barış Kaya & Derin Beyza Günal |
| Tarih | **12 – 20 Ağustos 2026** · 8 gün / 7 gece |
| Rota | İstanbul → Priştine → Üsküp → Ohrid → Dıraç → Tiran → İstanbul |
| Ülkeler | Kosova · Kuzey Makedonya · Arnavutluk (3 ülke) |
| Gidiş | 12 Ağustos, AJet **VF101**, PNR `4FQPAT`, 09:50 SAW → 10:30 PRN |
| Dönüş | 20 Ağustos, Pegasus **PC284**, PNR `29BHAE`, 02:15 TIA → 04:50 SAW |
| Kritik nokta | Dönüş **gece uçuşu** — 19 Ağustos gecesi konaklama yok, ~23:30 havalimanına hareket |

**Konaklama (kesin, 4 Ağustos 2026):** üçü de Airbnb, adres ve koordinatlar dâhil işlendi.

| Gece | Şehir | Tesis | Giriş / çıkış |
|---|---|---|---|
| 12 Ağu | Üsküp | Universe Hostel & Apartments (özel oda) | 14:00 – 02:00 · çıkış 10:00 |
| 13-15 Ağu | Ohrid | AGH Elite Studio No. 10 (özel oda) | **13:00 – 19:00** · çıkış 10:00 |
| 16-18 Ağu | Dıraç | Red Crab deniz kenarında daire (tüm daire) | en erken 15:00 · çıkış 11:00 |
| 19 Ağu | — | konaklama yok, gece uçuşu | — |

Üçünde de **kendi kendine giriş** var (tuş takımı / kilitli kutu). 🔑 Ohrid'in anahtar kutusu
13:00 – 19:00 arası çalışıyor; **6 Ağustos'ta sabah otobüsüne geçilerek** varış ~13:00'e alındı,
altı saat pay doğdu — kısıt kritikten önemliye indi. Ev sahibi telefonları ve rezervasyon kodları
hâlâ _belirlenecek_; kapı ve wifi şifreleri bilinçli olarak depoda değil, yalnızca cihazda.

---

## 2. Teknik yapı

### Dosyalar

| Dosya | Satır / boyut | Ne işe yarar |
|---|---|---|
| `index.html` | **6.441 satır** (~305 KB) | Sitenin tamamı: içerik + CSS + JS tek dosyada |
| `sw.js` | 186 satır | Service worker — çevrimdışı çalışma, dört cache (ikisi sürümsüz, aşağıda). Sürüm **v9** |
| `manifest.json` | — | PWA künyesi: ad **Balkanlar'da Aşk**, standalone, portrait, tema `#0b2a45`, 2 kısayol (Bugün · Cepte). ⚠ `theme_color` iki temaya bölünmeden önceki laciverdi taşıyor; tarayıcı çubuğunun rengini zaten `<meta name=theme-color>` temaya göre canlı ayarlıyor |
| `icon.svg` | — | Uygulama ikonu (`any` + `maskable`) |
| `docs/img/` | 5 kapak + `KAYNAKLAR.md` | Yerele indirilmiş şehir kapakları ve lisans listesi |
| `PLAN.md` | ~78 KB (1.422 satır) | Planın tek doğruluk kaynağı + oturum günlüğü |
| `README.md` | ~15 KB | Kurulum, içerik güncelleme, tuzaklar, deploy |
| `progress.md` | bu dosya | Durum panosu |

### Mimari

- **Tek dosya, build yok.** `index.html`'e çift tıklamak yeterli; `python -m http.server 8000`
  ile yerel sunucu da çalışır (service worker testi için gerekir).
- **İçerik ile sunum ayrı.** Bütün metinler dosyanın başındaki tek bir **`const TUR = {...}`**
  objesinde (satır ~85–1278). HTML gövdesi boş kabuklardan oluşur, sayfa bu objeden JS ile
  render edilir. **Metin değiştirmek için CSS'e veya HTML'e dokunmak gerekmez.**
- Yerleşim: `TUR` objesi → `<style>` (satır 1281–2572) → boş `<section>` kabukları
  (2604–2810) → render + davranış JS'i (2845'ten sona).
- **Tasarım token'ları** CSS'te `:root` altında (renk, boşluk `--s-*`, radius, gölge).
  Site iki temaya bölündü: Derin'in şeker pembesi `:root`'ta, Barış'ın koyu laciverdi
  `html[data-tema="baris"]` altında onu ezerek duruyor.
- **Ayrım ilkesi:** site *yolda işe yarayan* alt kümeyi gösterir, `PLAN.md` tam kaydı tutar.
  Rezervasyon kararı verirken önemli olan (puan, olanak listesi, ev sahibi kıdemi) siteye
  konmaz — kart kalabalıklaşır ve asıl iş (adres, saat, kod) görünmez olur.

### `TUR` objesinin bölümleri

| Alan | İçerik | Durum |
|---|---|---|
| `meta` | Başlık, yolcular, tarih, süre, giriş cümlesi, `kalkisISO` / `donusISO` | ✅ kesin |
| `ucuslar` | Gidiş/dönüş: havayolu, sefer, PNR, saat, bagaj, gece uçuşu uyarısı | ✅ bilet üzerinden |
| `rota` | Rota şeridi durakları — artık girişte (hero) çiziliyor | ✅ |
| `konaklama` | Hangi gece hangi şehir, kaç gece, tesis | ✅ üç tesis girildi |
| `sehirler` | 5 şehir kartı: tema, rehber tanıtımı, öne çıkanlar, `kapak`, `galeri`, `lezzetler`, `konum` | ✅ (5 şehir haritada) |
| `gunler` | **9 günlük program**: tarih, başlık, akış, notlar, `risk`, `uyari`, `giris`, **`ozel`**, gece | ✅ (6 Ağustos'ta yedi gün baştan yazıldı) |
| `ulasim` | Bacak / süre / yöntem / durum. **Ayrı bölüm olarak basılmıyor**; Bugün ekranı ve Günün Kartı GUN_BACAK üzerinden buradan okuyor | ✅ tek "önceden alınacak" bacak Ohrid → Dıraç |
| `harita` | Karo kaynağı, atıf, zoom (6–18, karo z16'ya kadar), havalimanları, yedek metin, **`odak`** şeridi metinleri, **`cevrimdisi`** karo tarifi | ✅ |
| `dikkatEdilecekler` | **15 kart**, `seviye`: kritik / önemli / bilgi | ✅ (8 Ağustos'ta 🕐 saat farkı kartı en başa eklendi) |
| `cepte` | Uçuş kodları, üç konaklama, **`bagajDolabi`**, **`rezervasyon`**, **`hastaneler`** (5 doğrulanmış koordinat), **`otogarlar`** (5 doğrulanmış koordinat), **`saglik`**, **`acilCumleler`** (12), **`bulusma`**, acil numaralar, kelimeler — **sekiz sekme** | ⚠️ ev sahibi telefonları, rezervasyon kodları, 15 Ağustos mekânı ve sigorta hattı boş<br>ℹ️ `kur` 8 Ağustos'ta kaldırıldı |
| `havaDurumu` | Open-Meteo ayarı, gün→şehir eşlemesi, mevsim normalleri, uyarı eşikleri | ✅ çalışıyor |
| `yemeIcmeNotlari` | Şehir kartı altındaki yeme-içme kutusu | ✅ |
| `pratik` | Para, bütçe, elektrik, sağlık, adap, kelimeler | ⚠️ bütçe boş |
| `kontrolListesi` | **10 maddelik** hazırlık listesi | ✅ (işaretler kullanıcıda) |
| `neYapmali` | **6 katlanır karar kartı** — otobüs kaçtı, sınır, kutu açılmıyor, telefon bitti, pasaport, nakit | ✅ |
| `belirlenecek` | Sayfa sonundaki açık işler listesi | 7 madde (ilk üçü öncelikli) |

### Telefon optimizasyonu (ölçüldü, 390 px)

Telefonda siteyi açan kişi çoğu zaman tek bir şey istiyor: bugünün adresi. Sayfanın geri
kalanını indirtmemek gerekiyor.

| | Önce | Sonra |
|---|---|---|
| Haritaya inilmeyen açılışta alt kaynak isteği | Leaflet CSS (render'ı bloke eden) + JS + **13 karo** | **0** |
| Başarısız istek (her şehir kaydırmasında) | 9 (kırık lezzet görselleri) | **0** |
| Tam yerleşim süresi (masaüstü, ~20.000 px sayfa) | 33 ms | **12 ms** |

**1. Leaflet istendiğinde yükleniyor.** Harita 12 bölümün 8'incisi. `<head>`'deki
`<link rel=stylesheet>` render'ı bloke ediyor, `<script defer>` her açılışta iniyor, harita
kurulur kurulmaz ~250 KB karo isteniyordu. Artık bölüm yaklaşınca (IntersectionObserver,
`rootMargin:600px`) enjekte ediliyor. Adresler ve SRI hash'leri `LEAFLET` sabitinde.
Gözcü sessiz kalırsa diye iki yedek tetikleyici var: `hashchange` (nav bağlantısı) ve harita
bölümüne `pointerdown`. `sw.js` hâlâ ikisini de app shell'de tutuyor — çevrimdışı bozulmadı.

**2. `content-visibility:auto`** — `.city`, `.cep-kart`, `.dikkat`, `.info` kartlarında.
Ekran dışındaki kartın stil/yerleşim/boyama işi hiç yapılmıyor. `contain-intrinsic-size`
değerleri 390 px'te ölçülmüş gerçek ortanca yükseklikler; `auto` anahtar sözcüğü ilk
render'dan sonra gerçek boyu hatırlatıyor. Yazdırmada kapatılıyor, yoksa ekran dışı kartlar
kâğıda basılmazdı. `.day` bilerek dışarıda — çapa hedefi onlar.

**Ölçülüp vazgeçilenler** (ikisi de kârlı çıkmadı):
- *Kapakları yeniden kodlamak:* 987 KB → 750 KB (%24) ama kazancın neredeyse tamamı tek
  dosyadan (Ohrid 341→156 KB); kalan dördü %3-19 kazanırken hepsi kalite kaybediyor
  (PSNR 32-46 dB). Kapaklar zaten tembel yükleniyor ve bir kez ön belleğe alınıyor.
- *Wikimedia görsellerini küçültmek (srcset):* 960 px kaynak, telefonda 310 CSS px'te
  gösteriliyor — yani ~3x DPR için zaten doğru boy. Üstelik Wikimedia artık yalnızca belirli
  genişliklere izin veriyor (bu dosyalarda 500 ve 1280 geçti; 320/512/640/800/1024 **400**
  döndü).

### Harici bağlantılar (ikisi de bozulmaya karşı korumalı)

| Bağımlılık | Ne için | Yedek davranış |
|---|---|---|
| **Wikimedia Commons** görselleri | Kapak ve galeri fotoğrafları | `onerror` → degrade renkli yer tutucu + mekân adı |
| **Leaflet 1.9.4** (unpkg, SRI hash'li) | Rota haritası — *tek bilinçli istisna*. **`<head>`'de değil**, harita bölümü yaklaşınca enjekte edilir | Yüklenmezse harita bölümü gizlenir, rotayı yazan sade kutu çıkar |
| **OpenStreetMap karoları** | Harita zemini | **Önceden indirilebilir** (aşağıda); indirilmemişse ağa muhtaç |
| **Open-Meteo API** | 16 günlük hava tahmini | Pencere dışıysa mevsim normali; yanıt 3 saat `localStorage`'da |

> Hepsi kopsa sayfanın geri kalanı çevrimdışı sorunsuz çalışır.
> **Leaflet sürümü değişirse SRI hash'i de değişmeli** — tutmazsa harita sessizce yedeğe düşer.

### Çevrimdışı harita karoları

Karolar sitenin internete muhtaç tek parçasıydı: roaming kapalıyken sayfa açılıyor ama harita
boş gri kutu kalıyordu. Harita bölümündeki **"Haritayı çevrimdışına al"** kutusu gerekli
karoları evdeyken indirip tarayıcının Cache Storage'ına yazar.

| | |
|---|---|
| Kapsam | Rota geneli z7–8 · yol koridoru z11 · 5 şehir z12–14 · 3 ev z15–16 · **5 otogar z15–16** · 2 havalimanı z13 |
| Zoom sınırı | Harita z18'e kadar yakınlaşır ama **z16'nın ötesinde karo istemez** (`maxNativeZoom`): Leaflet z16'yı büyütür. Bulanık, konum doğru, veri sıfır |
| Toplam | **390 karo, ~7,8 MB** (`karoListesi()` gerçek koduyla ölçüldü; 7 Ağustos'ta z11 yol koridoruyla 236 → 316, 8 Ağustos'ta beş otogarla 316 → 390) |
| Süre | ~1 dakika — 2 eşzamanlı istek, her istekten sonra 200 ms ara |
| Cache adı | `balkan-karo` — **`index.html` ve `sw.js` arasında ortak, sürümsüz** |
| Yazan taraf | **Sayfa** (service worker değil): eski bir sw sürümü devredeyse bile doğru cache'e düşer |
| Okuyan taraf | `sw.js` → yalnızca cache; yoksa bir kez indirip saklar, arka planda tazelemez (roaming faturası) |

**Neden sürümsüz:** cache adı `CACHE_VERSION`'a bağlansaydı her `index.html` güncellemesinde
`activate` onu silerdi — evde indirilen harita yolda kaybolurdu. Aynı gerekçeyle görsel
cache'i de sürümsüzleştirildi (`balkan-gorsel`).

**Bilinen boşluk:** z9–z11 kapsanmıyor. Ülke ölçeğinden şehir ölçeğine pinch yapılırken kısa
süre gri görünebilir; aradaki üç seviyeyi bölge geneli için indirmek karo sayısını üç katına
çıkarırdı. Kutu, rotanın kendisinden bilerek geniş tutuldu — Leaflet görüş alanının dışından
da karo ister, dar kutu kenarlarda gri bırakıyordu.

**OSM nezaketi:** karo sunucusu gönüllü bağışla dönüyor ve hızlı toplu çekimi kısıyor. İlk
ölçümde (3 eşzamanlı, 90 ms ara) son ~15 karo reddedildi; hız düşürüldü ve reddedilenler için
tek sıralı, 800 ms aralıklı ikinci tur eklendi. Toplam 236/236 alındı.

### Karo tüketimi (ölçüldü, 390 px)

Karo indirmesi *ilk* açılışı çözüyor; asıl tasarruf haritanın günlük kullanımında.

| Adım | Kümülatif benzersiz karo |
|---|---|
| Açılış (bugünün evi, z16) | **6** |
| + Dıraç'a atla | 10 |
| + Priştine'ye atla | 14 |
| + Tüm rota | 20 |
| + Bugün'e dön | 20 (yeni istek yok) |

Bunu sağlayan dört karar: açılışta tüm rota yerine **bugünün evi** (kuşbakışı 15 karo isterken
6); şerit atlamaları **ani** — `flyTo` aradaki bütün zoom seviyelerinden karo isterdi;
`updateWhenIdle` telefonda kaydırma boyunca değil parmak kalkınca ister; `keepBuffer:1` görüş
alanı dışındaki karo halkasını yarıya indirir.

---

## 3. Sitenin bölümleri (8 bölüm)

Üst çubuktaki bağlantılar DOM'daki **görünür** `section[id]`'lerden üretilir; adlar
`NAV_ADLARI` eşlemesinde. Yeni bölüm eklenirse oraya bir satır eklenmeli.
Çubuğun sağ ucundaki araçlar: **Kart** (günün kartı) · 🌙 tema · 🖨 yazdır.

| # | id | Nav | Not |
|---|---|---|---|
| 1 | `bugun` | 📌 Bugün | Yalnızca tarih 12–20 Ağustos 2026 aralığındayken görünür (`hidden`) |
| 2 | `ucuslar` | ✈ Uçuş | PNR, saat, bagaj, gece uçuşu uyarısı |
| 3 | `cepte` | 📱 Cepte | **Yedi sekme** (8 Ağustos): konaklama, acil numaralar, hastaneler, sağlık, ayrı düşersek, acil cümleler, kelimeler. Uçuş kartı 7 Ağustos'ta, kur defteri 8 Ağustos'ta çıkarıldı |
| 4 | `hava-bolumu` | 🌤 Hava | Veri gelmezse gizli kalır (`hidden`), gelince nav yeniden kurulur |
| 5 | `sehirler` | 🏙 Şehirler | 5 kart + galeri + katlanır lezzetler + favori kalpleri |
| 6 | `program` | 🗓 Program | 9 günlük accordion, bugün olan gün vurgulanıp açılır |
| 7 | `harita-bolumu` | 🗺 Harita | Leaflet; odak şeridi + 📍konum + ⛶tam ekran; `data-durum` ile bekliyor/tamam/yedek; altında çevrimdışı karo kutusu |
| 8 | `dikkat` | ⚠ Dikkat | 15 kart, seviyeye göre kenar rengi ve etiket; ilki 🕐 saat farkı (kritik) |
| 9 | `hazirlik` | ✔ Hazırlık | 10 maddelik liste + yedekleme kutusu + konfeti |

**Gezinme artık çekmecede.** 7 Ağustos'ta yatay kaydırmalı şerit kaldırıldı: çubukta
içinde bulunulan bölümün adı yazıyor, dokununca yandan çekmece açılıyor (`#cekmece-perde`,
odak tuzağı + Esc + karartı). Bağlantılar hâlâ `NAV_ADLARI`'ndan üretiliyor.

**Sekmesi olmayan parça:** rota şeridi. Eskiden `rota` bölümüydü; 7 Ağustos'ta hero'nun
içine, tek satır akan sık bir şerit olarak alındı (`#hero-rota`, `TUR.rota`'dan çizilir).

**7 Ağustos'ta kaldırılan bölümler:** `rota` (şerit girişe taşındı, konaklama tablosu
Cepte'de zaten vardı) · `ulasim` (bacaklar gün programında ve otobüs kartında) ·
`pratik` (para/su/sağlık/kelimeler Dikkat ve Cepte'de; priz ve bahşiş maddeleri Dikkat'e
yeni kart olarak taşındı). Şehir kartlarının altındaki yeme-içme kutusu da kaldırıldı,
tekrarlanmayan maddeleri "🍽 Sofrada" kartına girdi.

---

## 4. Özellik durumu

### ✅ Tamamlanan

| Özellik | Kısa açıklama |
|---|---|
| Tek dosya içerik mimarisi | `TUR` objesi + JS render; metin/tasarım ayrımı |
| 9 günlük program | Akış, rehber notları (En iyi saat / Dikkat / İpucu), günlük risk satırı, kaçırılamaz kısıt kutusu (`uyari`), günün tonunu veren giriş cümlesi (`giris`) |
| **`gunler[].ozel` — günün kendi anlamı** | Opsiyonel `{ikon, metin}`. Gün kartı başlığında rozet, Bugün ekranında ve tam ekran Kart'ta tam satır; alan yoksa hiçbir yerde iz bırakmaz. Kum zemin + `--c-teal` çerçeve/yazı — koyu temada çerçeve ayırıyor, yazdırmada basılır. Şu an tek kullanıcı: 15 Ağustos 🤍 2. yıl dönümü |
| 5 şehir kartı | Tema, rehber tanıtımı, öne çıkanlar, kapak + galeri, yerel lezzetler |
| Yerel lezzetler | **Katlanır "Ne yenir?"** — kapalı gelir, düğmede kaç tat olduğu yazar. Görsel **16:9 tam genişlik bant** (oran 1.78); 23 lezzetin 19'unda doğrulanmış Commons fotoğrafı, kalan dördü 🍽 yer tutucu |
| Geri sayım (3 durumlu) | Kalkış öncesi "Yola çıkmaya kalan" → tur içinde "Dönüşe kalan + N. gün / 8" → sonra "Tur tamamlandı" |
| Bugün ekranı | `tarihISO` eşleşince kart + o günün vurgusu; **o geceki konaklama bloğu** (ya da 19 Ağustos'un "konaklama yok" bloğu); `?tarih=2026-08-15` ile test edilebilir |
| Rota haritası | Leaflet, 5 şehir + 2 havalimanı + **3 konaklama** işaretçisi (ayrı renk/ikon), gün kartlarına bağlı; yedek kutusu var |
| **Harita odak şeridi** | Tüm rota · Bugün · 5 şehir çipi. Şehrin evi varsa doğrudan kapısına gider (z16), yoksa merkeze (z14). Tur sürerken harita **bugünün evinde** açılır, o pin kırmızı |
| **📍 Konumum** | `watchPosition` + nabızlı nokta + doğruluk çemberi; rozet **"Bu geceki ev: 420 m · ±12 m"** yazar ve yürüdükçe güncellenir. GPS internetsiz çalışır. İzin reddi / zaman aşımı / destek yok için ayrı metinler; sekme arkaya atılınca GPS bırakılır |
| **⛶ Tam ekran** | Harita sayfa akışından çıkıp ekranı kaplar; Esc kapatır, güvenli alan Leaflet denetimlerine uygulanır |
| Ev popup'ı | Kartın küçük hâli: adres yerel alfabede büyük punto, latin karşılığı, giriş/çıkış, adres kopyala + yol tarifi. Genişlik kabın enine göre hesaplanır. **Kodlar popup'a konmaz** |
| **Çevrimdışı harita** | **390 karo (~7,8 MB)** tek dokunuşla indirilir — rota boyunca z11 koridoru dâhil; durdurulabilir, eksikler tamamlanabilir, silinebilir; reddedilen karolar için ikinci tur |
| **Günün kartı** | Üst çubuktaki "Kart" düğmesi — tam ekran, tek bakışlık: o geceki evin adresi (yerel alfabede büyük punto) + kapı kodu + wifi + ev sahibi telefonu + günün ulaşımı + o ülkedeki büyükelçilik + 112; oklarla günler arası gezinti, Esc kapatır |
| Hava durumu şeridi | Open-Meteo `forecast_days=16`, sıcak/yağmur uyarı rozetleri, 3 saat önbellek |
| Cepte bölümü | Acil numaralar (resmî `mfa.gov.tr` kaynaklı), temel kelimeler |
| **🆘 Acil cümleler** | 12 cümle, Arnavutça + Makedonca + okunuş. Satıra dokununca tam ekran ~38 px puntoyla açılır — konuşmak için değil, telefonu karşıdakine uzatmak için |
| **🩺 Sağlık ve acil kişi** | Kan grubu, alerji, sürekli ilaç, poliçe no (kişi başına) + acil kişi. Kapı kodlarıyla aynı depo: **yalnızca cihazda**. Dolu alanlar Günün Kartı'nın acil bloğunda da çıkar |
| **🏥 Hastaneler** | 5 şehrin ana hastanesi, koordinatı doğrulanmış (Wikidata + OSM). Cepte'de liste, haritada ✚ pini, Günün Kartı'nda o günkü şehrinki |
| **🚌 Otogarlar** | 5 şehrin ana otogarı, koordinatı doğrulanmış (Wikidata + OSM, kaynak her kartta yazılı). Cepte'de liste, haritada turuncu 🚌 pini, Günün Kartı'nda o günün **kalkış otogarı** |
| **🧭 Ayrı düşersek** | Sabit kural (saat başı 10 dk bekleme) + şehir başına buluşma noktası alanı (cihazda) |
| **Cepte sekmeleri** | Yedi kart alt alta değil sekmede: 🏨 Konaklama · 🆘 Acil numaralar · 🏥 Hastaneler · 🩺 Sağlık · 🧭 Ayrı düşersek · 💬 Acil cümleler · 🗣 Kelimeler. Ok tuşları + Home/End, 44 px hedef; **yazdırmada hepsi birden basılır** |
| **🆘 İş başa düşerse** | 6 katlanır karar kartı: otobüs kaçtı · sınır · kutu açılmıyor · telefon bitti · pasaport · nakit |
| **▦ İndirilen alan** | Haritada karo inen bölgeyi çizer: bölge kutusu + yol koridoru + şehir/ev çemberleri |
| Konaklama kartı | Üç Airbnb: şehir/tarih başlığı, ev adı, tip, künye listesi (giriş · çıkış · ev sahibi · telefon · rezervasyon), mesafeler, ilan bağlantısı |
| "Taksiciye göster" | Kartın tek vurgulu bloğu: yerel alfabede büyük punto adres + latin karşılığı + Dıraç'ta sözlü tarif; kopyala düğmesi ve **koordinattan** üretilen Maps bağlantısı |
| Gizli kod alanları | Kapı kodu / kutu şifresi / wifi — kaynak koda yazılmaz, `balkan2026.gizli` altında yalnızca cihazda; "Sil" düğmesi |
| Dikkat kartları | 12 kart, kritik / önemli / bilgi seviyeleri. 6 Ağustos'ta üçü yenilendi: eve giriş pencereleri (**kritik → önemli**), otobüs kültürü (hat hat sefer sıklıkları), gece uçuşu (bagaj çözüldü) |
| Hazırlık listesi | 10 madde, `localStorage`, 10/10'da konfeti + kutlama (yalnızca tamamlanma anında) |
| ♥ İkimizin listesi | 50 kalp düğmesi, şehir başlığında sayaç, altta toplu özet, atış animasyonu |
| ✍ Anı notları | Her gün kartında `textarea`, 500 ms gecikmeli otomatik kayıt + "✓ kaydedildi" |
| Galeri + lightbox | Harici kütüphane yok; Escape / boşluk kapatır, ok tuşlarıyla gezinme |
| **İki kişilik tema** | `derin` = şeker pembesi (aydınlık) · `baris` = koyu lacivert (karanlık). Token ezme yöntemi; ilk boyamadan önce uygulanır (beyaz parlama yok), sistem tercihini izler (`dark` → Barış). Çubuktaki düğme açık olan temanın adını yazar; eski `koyu`/`acik` kaydı okunurken çevrilir |
| Üst gezinme çubuğu | Yapışkan şerit, IntersectionObserver ile aktif bölüm işareti, tema + yazdırma düğmeleri, "yukarı çık" |
| Yazdırma / PDF | Token'lar kâğıt setine iner (hangi tema açık olursa olsun — seçici `:root` olmak zorunda, bkz. tuzaklar), etkileşimli parçalar gizlenir, **katlı gün kartları ve "Ne yenir?" açılır** |
| Kayıt yedekleme | İndir / yükle / panoya kopyala; geri yükleme **ezmez, birleştirir**; kodlarda mevcut değer korunur (`birlestir:false`); yabancı dosya `uygulama` alanından reddedilir |
| PWA + çevrimdışı | `manifest.json` + `sw.js`; app shell ön belleğe alınır, 2 kısayol |
| Mobil denetimi | 13 bulgu ölçülüp düzeltildi (aşağıda) |
| Güvenli alan desteği | `viewport-fit=cover` + `env(safe-area-inset-*)` — çentik / Dynamic Island |
| Erişilebilirlik temelleri | 44 px dokunma hedefleri, tüm satır tıklanabilir accordion, görsel künyelerinde tam atıf |

### 🔧 Yerinde ama veri bekliyor

| Özellik | Ne gelince tamamlanır |
|---|---|
| Ev sahibi telefonları | `cepte.konaklamalar[].telefonlar` doldurulunca `tel:` bağlantısı **kendiliğinden** çıkar (Üsküp'ün tesis yedek hattı girildi) |
| Rezervasyon kodları | Airbnb onay kodu girilince kopyalanabilir kod düğmesine dönüşür |
| Üsküp'te klima | İlanda yazmıyor; ev sahibine sorulup nota yazılacak |
| Sigorta acil hattı | Poliçe alınıp `TUR.cepte.acil` içine girilince |
| Bütçe kartı | Toplam / kişi başı günlük bütçe kararı |
| 15 Ağustos masası | `cepte.rezervasyon` — mekân seçilip aranınca mekân/saat/telefon dolar, Kart'ta `tel:` bağlantısı kendiliğinden çıkar |
| Ohrid → Dıraç bileti | Turun tek "önceden alınacak" bacağı; alınınca `ulasim[].durum` "alındı" olur ve tabloda ✅'ye döner |

---

## 5. Tarayıcıda saklanan veriler

Hepsi `localStorage`, **sunucuya hiçbir şey gitmez**, cihaza özeldir.

| Anahtar | İçerik |
|---|---|
| `balkan2026.hazirlik` | Hazırlık listesi işaretleri |
| `balkan2026.favoriler` | ♥ İkimizin listesi (kimlik: `şehirAdı::maddeMetni`) |
| `balkan2026.anilar` | Gün kartlarındaki anı notları (anahtar: `YYYY-MM-DD`) |
| `balkan2026.hava` | Hava yanıtı + zaman damgası (3 saat) |
| `balkan2026.tema` | `derin` / `baris` tema tercihi (yoksa sistem tercihi). Eski `koyu`/`acik` değerleri okunurken yeni adlara çevrilir |
| `balkan2026.gizli` | Kapı kodu / kilitli kutu şifresi / wifi şifresi (kimlik: `evId::alan`) — **depoda yoktur** |
| `balkan2026.karolar` | Çevrimdışı haritanın en son ne zaman indirildiği (yedeğe dâhil değil — karolar Cache Storage'da) |

**Kırılganlık uyarısı:** bir maddenin **metnini** değiştirmek o maddeye verilmiş kalbi
kaybettirir; `gunler[].tarihISO` değiştirmek eski anı notunu erişilemez yapar;
`kontrolListesi[].id` değiştirmek o maddenin işaretini sıfırlar; `cepte.konaklamalar[].id`
değiştirmek o eve kaydedilmiş kodları erişilemez yapar.

**Gizlilik:** kapı ve wifi şifreleri bilinçli olarak kaynak koda konmaz (depo herkese açık).
Yedek dosyası bu kodları **içerir** — yalnızca kendi cihazlarınızla paylaşın. Yazdırma
çıktısında kodlar basılır (kâğıt yedeği kapıda işe yarasın diye), silme düğmesi basılmaz.

---

## 6. Bilinen tuzaklar (tekrar düşmemek için)

| Tuzak | Doğrusu |
|---|---|
| `grid-template-columns:1fr` | `1fr`'nin alt sınırı `auto`; uzun içerik kartı taşırır → **`minmax(0,1fr)`** |
| `html{overflow-x:hidden}` | Kaydırma kabı oluşturur, `position:sticky` **sessizce** çalışmaz → `clip` |
| Open-Meteo varsayılanı | `forecast_days` verilmezse yanıt 7 günlük gelir → **`forecast_days=16` şart** |
| Wikimedia thumb URL'i | Yalnızca belirli genişlikler geçerli; rastgele sayı `400` döner → Commons'ta ara, `curl -I` ile 200'ü doğrula |
| Tema script'inin yeri | `<head>` içinde, ilk boyamadan önce — yoksa açılışta beyaz parlama |
| Üste yeni öğe ekleme | `.ust-alan` bandının **içine ya da altına** — öncesine koyulan şey iPhone'da adanın altında kalır |
| Görsel künyesi kırpma | Atıf yükümlülüğü; `ellipsis` ile kesme, satır ayır |
| Sabit renk yazma | Karanlık tema ve yazdırma bozulur → token kullan |
| Yeni bölüm ekleme | `NAV_ADLARI`'na satır eklenmezse üst çubukta çıkmaz |
| Leaflet sürüm yükseltme | SRI hash'i yeniden hesaplanmalı, yoksa harita yedeğe düşer |
| `.cep-satir` etiket sütunu | Sağdaki değer uzayınca etiket kelimesi ortadan kırılıyordu ("Giri / ş") → etikete `flex:0 0 auto` |
| Maps bağlantısını adresten üretmek | Adres yazımı yanlış yere düşebiliyor → **koordinattan** üret |
| Tarih damgasına gelişigüzel ofset yazmak | Kalkış İstanbul'dan (**+03:00**), dönüş Tiran'dan (**+02:00**) — ikisi aynı değil. `donusISO` +03:00 yazıldığında geri sayım bir saat erken bitiyordu |
| Gün eşleşmesine sabit saat dilimi varsaymak | `tarihISO` **bulunulan yerin** takvim günü; cihazın yerel tarihiyle karşılaştır. `+03:00` varsayılırsa cihaz UTC+2'deyken 00:00 – 01:00 arası bir gün ileri kayar |
| Gün sayısını milisaniye farkından bulmak | Gün, kalkış saatinde döner (09:50'de) → **takvim gününden** hesapla (`gunFarki`) |
| Kapı / wifi şifresi | Depo public: `TUR` objesine **asla** yazılmaz, `balkan2026.gizli` altında cihazda kalır |
| `index.html` değişince | `sw.js` içindeki `CACHE_VERSION` artırılmalı, yoksa kurulu cihazlar eski sürümü görür |
| `<dl>` ızgarasında `column-gap` | Satır ayırıcı çizgi sütunlar arasında kesiliyor → `gap:0` + `dt`'ye sağ padding |
| Üç sütunu 768 px'te açmak | Sütun 212 px'e düşüp künye satırları kırılıyor, kart 1500 px'e uzuyor → kırılma noktası 1040 px |
| `Math.round(null)` | Sıfır döndürüyor; Open-Meteo pencere kenarında `null` verince ağustosta "0°" basılıyordu → `Number.isFinite` kontrolü |
| Segoe UI'da 🗺 | Bozuk glif olarak basılıyor — düğme etiketlerinde emoji kullanmadan önce bak (bu yüzden nav'daki kart düğmesi emoji değil, "Kart" yazısı) |
| Karo cache'ini sürüme bağlamak | `activate` her güncellemede siler → evde indirilen harita yolda kaybolur. `balkan-karo` ve `balkan-gorsel` **sürümsüz**, `BIZIM_CACHELER` içinde |
| Karo adresini kendin üretmek | `{s}` alt alan adı Leaflet'inkiyle birebir aynı olmalı (`"abc"[|x+y| % 3]`), yoksa indirilen adres istenenle eşleşmez ve indirme boşa gider |
| Karo kutusunu rotanın sınırına oturtmak | Leaflet görüş alanının dışından da karo ister; dar kutu kenarlarda gri bırakır → kutu bilerek geniş |
| OSM'den hızlı toplu çekim | 3 eşzamanlı + 90 ms arayla son ~15 karo reddedildi → 2 eşzamanlı + 200 ms, reddedilenlere ikinci tur |
| Koyu temada `--c-sand` | `--c-yuzey` ile aynı değere düşüyor; kart içi gömme kutular ayırt edilmiyor → koyuda `--c-cream`'e in |
| Koyu temada `--c-deep` | Sayfa zeminiyle neredeyse aynı; **seçili** durum (çip, harita düğmesi) kayboluyor → koyuda işaret rengi `--c-teal` |
| Flex kabındaki yazılı düğme | `flex-shrink` varsayılanı içeriğin altına sıkıştırıp "Ka / rt" diye kırıyor → `flex:0 0 auto` + `white-space:nowrap` |
| Leaflet popup `maxWidth` | Varsayılan 300 px, 320 px'lik telefonda haritadan taşıyor → `popupopen`'da kabın o anki eninden hesapla (tam ekran ve döndürme de doğru olsun) |
| Harita kilidinin etiketi | Ortadaydı; harita artık bugünkü evin üstünde açıldığı için tam da görülmesi gereken pini kapatıyordu → etiket altta |
| Masaüstünde harita kilidi | Kilit yalnızca dokunmatikte gerekli (tek parmak sayfayı değil haritayı sürüklerdi). Farede bedeli var, faydası yok → `if (!L.Browser.mobile) etkinlestir()` |
| Haritada `flyTo` | Aradaki bütün zoom seviyelerinden karo ister; yurt dışında doğrudan fatura → şerit atlamaları `setView(..., {animate:false})` |
| Tarayıcıda `data-tema`'yı elle değiştirip ölçmek | Yüklenmiş sayfada attribute'u JS'le değiştirince hesaplanan stil güvenilmez okundu (yanlış "hata" buldurdu) → temayı `balkan2026.tema` ile **yüklenmeden önce** ayarla, sonra ölç |
| `.gk-satir b` gibi seçiciler | Değerin içinde de `<b>` geçebiliyor; etiket biçimi ona bulaşmasın diye **doğrudan çocuk** (`> b`) yaz |
| Wikimedia thumb genişlikleri | Artık **dosya başına belirli genişlikler** geçerli. 640 px bir zamanlar çalışıyordu, şimdi `400` dönüyor. Eklemeden önce mutlaka doğrula |
| Görsel URL'ini doğrulamadan eklemek | 9 lezzet görselinin kaynak dosyası Commons'ta hiç yoktu (`404`); site aylarca yer tutucu gösterdi ve her kaydırmada 9 boşa istek attı. **Kural 3 bunun için var** |
| `content-visibility:auto` | Ekran dışı içerik **yazdırılmaz** → `@media print` içinde `visible` yap. Çapa hedefi olan öğelere (`.day`) verme, tahmini yükseklik çapayı kaydırır |
| Çapayı katlanır gövdeye koymak | `#gun-3` `.day-body`'deydi; `scroll-margin-top` `.day`'de olduğu için hedef yapışkan çubuğun altına düşüyordu. Çapa **kartın kendisinde**, gövdenin ayrı id'si yalnızca `aria-controls` için |
| `<head>`'deki üçüncü parti CSS | `<link rel=stylesheet>` render'ı bloke eder. Sayfanın 8. bölümünde kullanılan bir kütüphane için bedeli herkes öder → gerektiğinde enjekte et |
| `transition`'a `visibility` katmak | Açılışta 0,18 sn `hidden` kalıyor; tam o anda çağrılan `focus()` sessizce düşüyor (gizli öğe odak almaz) → açılışta `visibility 0s linear 0s`, kapanışta `0s linear .18s` |
| Bu sayfada `window.scrollTo` ile ölçmek | Kök öğede `overflow-x:clip` var; programatik kaydırma tutmuyor, gerçek kaydırma çalışıyor. Gözcü/etiket testlerini **gerçek scroll** ile yap, yoksa "bozuk" sanırsın |
| Yerel sunucu sessizce ölürse | Service worker HTML'i cache'ten verdiği için sayfa açılmaya devam eder ve **eski sürümü** gösterir. "Değişikliğim görünmüyor" derken önce `curl` ile sunucuyu doğrula |
| `@media print` içinde `html{...}` yazmak | `:root` (0,1,0) düz `html`i (0,0,1) yener; kâğıt paleti **aydınlık temada hiç uygulanmıyordu**, tema renkleri olduğu gibi basılıyordu. Koyu temada çalıştığı için yıllarca fark edilmedi → `:root, :root[data-tema="baris"]` |
| Aynı özgüllükte iki kural, sıraya bakmamak | `.nav-btn-metin{width:auto}` dosyada daha ÖNCE, `.nav-btn{width:2.5rem}` daha SONRA → ikincisi kazanıyordu, düğme 44 px'e sıkışıp metni dışarı taşıyordu. Kısa metinde ("Kart") göze batmıyor → çakışan kuralı `.nav-btn.nav-btn-metin` gibi tek sınıf daha ekleyerek yaz |
| Commons thumb adresini elle kurmak | `/thumb/<a>/<ab>/…` yolundaki hash öneki MD5'ten geliyor, tahmin edilemez → adresi **API'nin `thumburl` alanından** al, `?utm_…` parametrelerini at, sonra `curl -I` ile doğrula |
| PNG'yi lezzet görseli seçmek | Commons PNG'lerde 640 px thumb `400` dönebiliyor ve tam boy dosya megabaytlarca olabiliyor (bir örnekte 820 KB) → fotoğraf için JPEG seç |
| Görseli `loading="lazy"` + `content-visibility:auto` birlikte test etmek | Kart ekran dışındayken hiç render edilmiyor, içindeki lazy görsel de istenmiyor. Tarayıcıda "yüklenmedi" görünmesi **hata değil**, doğru davranış → ölçerken önce öğeyi gerçekten görünür alana getir |

---

## 7. Mobil denetimi — özet

**26 Temmuz 2026**, test genişlikleri **320 / 360 / 390 / 414 / 768 px** + yatay (740 × 360)
+ masaüstü (1440 × 900). Ölçümler iframe içinde gerçek layout üzerinden, tüm gün kartları
açık ve görseller yüklü hâlde yapıldı.

- **13 bulgu → 13 düzeltme.** En kritikleri: rota şeridi yatay kaydırması (320 px'te
  içerik 998 px), tablo taşmaları (kart görünümüne çevrildi), galeri ızgarası taşması
  (`minmax(0,1fr)`), 44 px altı dokunma hedefleri, lightbox `70dvh`, `viewport-fit=cover`.
- **Belge düzeyinde yatay kaydırma hiçbir genişlikte yok** (320 – 1440, yatay dâhil).
- Bilinçli istisna: checkbox kutusu 24 × 24 px, ama **dokunma hedefi etiketin tamamı**
  (satır 44 px'ten yüksek).
- Ayrıntılı tablo: `PLAN.md` → "Mobil düzeltmeleri".

**Açık kalan:** bütün ölçümler tarayıcıda yapıldı — **gerçek cihazda göz ve dokunma
kontrolü yapılmadı.**

---

## 8. Oturum geçmişi

| # | Tarih | Ne yapıldı |
|---|---|---|
| 1–3 | 26 Tem 2026 | Rota Priştine–Üsküp–Ohrid–Dıraç–Tiran olarak yenilendi, site ve depo baştan yazıldı |
| 4 | 26 Tem 2026 | Sayaç dönüşe kalan süreyi gösteriyor, fotoğraf ve risk bölümleri eklendi, vize/ülke kısaltmaları kaldırıldı |
| 5 | 26 Tem 2026 | Mobil görünüm baştan denetlendi (13 düzeltme), Leaflet ile rota haritası eklendi |
| 6 | 26 Tem 2026 | PWA çevrimdışı desteği, Bugün ekranı, Cepte bölümü, yerel lezzetler, hava durumu şeridi |
| 6b | 26 Tem 2026 | Büyükelçilik bilgileri resmî kaynaktan dolduruldu, kırpılan künyeler ve Dynamic Island alanı düzeltildi |
| 6c | 26 Tem 2026 | Lezzet görselleri 16:9 banda çevrildi, favori kalpleri, anı notları, konfeti, galeri gezinmesi |
| 7 | 29 Tem 2026 | Üst gezinme çubuğu, karanlık tema, yazdırma çıktısı, kayıt yedekleme; **hava tahmini düzeltildi** (`forecast_days=16` eksikti) |
| 8 | 4 Ağu 2026 | `progress.md` oluşturuldu |
| 10 | 4 Ağu 2026 | **Tasarım sadeleştirildi:** konaklama kartı yeniden kuruldu, rezervasyon anına ait künyeler (puan, olanaklar) siteden çıkarıldı, Bugün ekranındaki tekrarlar kaldırıldı, hava durumundaki "0°" hatası düzeltildi |
| 13 | 4 Ağu 2026 | **Telefon optimizasyonu:** Leaflet ve karolar istendiğinde yükleniyor (açılışta 0 alt kaynak), `content-visibility` ile yerleşim 33→12 ms, **9 kırık lezzet görseli bulundu ve kaldırıldı**, gün çapaları yapışkan çubuğun altından kurtarıldı |
| 12 | 4 Ağu 2026 | **Harita yolda kullanılacak hâle getirildi:** odak şeridi, 📍konumum (eve mesafe), ⛶tam ekran, işe yarar ev popup'ı; karo tüketimi açılışta 15'ten 6'ya indi |
| 11 | 4 Ağu 2026 | **Çevrimdışı harita ve günün kartı:** 236 karo indirilebilir hâle geldi (cache'ler sürümsüzleştirildi, OSM hız sınırına göre ayarlandı), üst çubuğa tam ekran "Kart" eklendi |
| 9 | 4 Ağu 2026 | **Konaklamalar işlendi:** üç Airbnb (adres + koordinat), taksiciye göster kutusu, Ohrid 19:00 kritik uyarısı, 19 Ağustos boşluğu, gizli kod alanları, haritada ev pinleri, Dıraç Arkeoloji Müzesi, `sw.js` v2 |
| 14 | 6 Ağu 2026 | **Plan revizyonu** — dört yapısal karar (aşağıda), `gunler[].ozel` alanı eklendi, yedi gün baştan yazıldı |
| 15 | 6 Ağu 2026 | **İki kişilik tema** (Derin'in şeker pembesi · Barış'ın koyu laciverdi), 19 lezzet görseli, katlanır "Ne yenir?" — sayfa 390 px'te 37.774 → 32.116 px |
| 16 | 7 Ağu 2026 | **Ad "Balkanlar'da Aşk" oldu**, dört bölüm kaldırıldı (Rota · Ulaşım · Pratik · Cepte'deki uçuş kartı), rota şeridi girişe alındı — sayfa 390 px'te 32.116 → 26.526 px |

| 17 | 7 Ağu 2026 | **Çevrimdışı acil donanımı:** yandan çekmece, 12 acil cümle, sağlık kartı, 6 akış kartı, 5 hastane, buluşma planı, kur defteri, yol koridoru karoları (236 → 316) |
| 18 | 8 Ağu 2026 | **Saat farkı riski kapatıldı** (🕐 kritik kart + iki gün uyarısı + iki kod hatası), **Cepte yedi sekmeye bölündü**, **kur defteri kaldırıldı**, `sw.js` v10 |
| 19 | 8 Ağu 2026 | **Haritaya beş otogar:** koordinatlar Wikidata + OSM'den doğrulandı, Cepte'de 🚌 sekmesi, turuncu harita pini, Günün Kartı'nda kalkış otogarı, karolar 316 → 390, `sw.js` v11 |

### 8 Ağustos 2026 — beş otogar

Haritada şehir, ev, havalimanı ve hastane pini vardı, **otogar yoktu** — turun dört bacağı
otobüsle ve otogar aramak valizle, roamingsiz, tekrarlayan bir andı.

**Koordinat doğrulaması.** İki kaynak ayrı ayrı sorgulandı: Wikidata SPARQL
(`P31/P279* → Q494829`, Kosova + Kuzey Makedonya + Arnavutluk) ve Overpass API
(`amenity=bus_station`). Sonuç:

| Şehir | Otogar | Koordinat | Kaynak |
|---|---|---|---|
| Priştine | Stacioni i Autobusëve Prishtinë | 42.649845, 21.146782 | Wikidata **Q90292447** + OSM way/133420082 — iki kaynak, ~50 m fark |
| Üsküp | Автобуска станица Скопје | 41.990749, 21.445646 | Wikidata **Q106638816** + OSM way/1512281050 — ~130 m fark |
| Ohrid | Автобуска станица Охрид | 41.124576, 20.812164 | OSM way/722996637 — Wikidata'da öğe yok |
| Dıraç | Stacioni i Autobusave Durrës | 41.317825, 19.453756 | OSM way/172317078 — Wikidata'da öğe yok |
| Tiran | Terminali i Autobusave të Jugut dhe Veriut | 41.345260, 19.776992 | OSM relation/20983464 — Wikidata'da öğe yok |

> Yazılan değer her yerde **OSM poligon merkezi**. Wikidata öğesi olan ikisinde iki kaynak
> birbirini doğruluyor; kalan üçünde Wikidata'da otogar öğesi yok, o yüzden tek kaynak —
> ama hepsi doğrulandı, hiçbiri _belirlenecek_ kalmadı.

> Tiran'da birden çok terminal var (Doğu terminali, Uluslararası/Kosova terminali). Rotanın
> kullandığı **Güney ve Kuzey Terminali**: Dıraç otobüsü buraya iniyor.

**Ne eklendi.**

| Nereye | Ne |
|---|---|
| `TUR.cepte.otogarlar` | Hastaneler alanıyla aynı yapı: şehir · ad (yerel alfabe) · `adLatin` · not · koordinat · **kaynak** |
| Cepte | 🚌 **Otogarlar** sekmesi — yerel alfabede iri ad, adres kopyala, yol tarifi, altında kaynak satırı |
| Harita | Turuncu yuvarlak 🚌 pin (`--c-otogar`, iki temada da aynı). Popup **ev popup'ının kalıbı**: yerel ad iri, latin altta, kopyalama + **koordinattan üretilmiş** Maps bağlantısı |
| Günün Kartı | O gün `GUN_BACAK`'ta bacak varsa (12 · 13 · 16 · 19 Ağu) "Bugünkü yol" bloğuna **kalkış otogarı** — bacak adının okundan önceki şehirden bulunuyor |
| Çevrimdışı karolar | `noktaZoomlari.otogar = z15-16, r:1` (evle aynı ölçek) → **+74 karo, 316 → 390 (~7,8 MB)**. "İndirilen alan" katmanına 700 m otogar çemberleri |

**Ölçüm tahmin değil:** yeni toplam, `index.html`'deki `karoListesi()` fonksiyonu Node'da
gerçek `TUR` verisiyle çalıştırılarak sayıldı (değişiklikten önce 316 çıkıyordu — mevcut
kayıtla birebir).

### 8 Ağustos 2026 — saat farkı, Cepte sekmeleri, kur defterinin kaldırılması

**Saat farkı.** Türkiye UTC+3, üç durak ülkesi de yaz saatinde UTC+2 — tur boyunca saat
**1 saat geri**. Sitede bu konuda tek satır uyarı yoktu. Eklendi: `dikkatEdilecekler`'in
başına 🕐 **kritik** kart, 12 Ağustos gününe `uyari` satırı (inince saat geri gidiyor),
20 Ağustos gününe not (02:15 TIA kalkışı yerel saat, Türkiye'de 03:15).

**Kod denetimi — istenen dört nokta:**

| Ne | Sonuç |
|---|---|
| `donusISO` | ❌ **Hataydı:** `+03:00` yazıyordu ama 02:15 Tiran'ın yerel saati → `+02:00` oldu. Geri sayım bir saat erken bitiyor, uçak kalkmadan "Tur tamamlandı" yazıyordu |
| `kalkisISO` | ✅ Doğru: `+03:00`, İstanbul kalkışı. Dokunulmadı |
| Geri sayım "Turun N. günü" | ❌ **Hataydı:** milisaniye farkından hesaplanıyordu, gün 09:50'de dönüyordu (13 Ağustos 08:00'de hâlâ "1. gün"). Takvim gününe çevrildi (`gunFarki`), gün 00:00'da dönüyor |
| `tarihISO` eşleşmesi (Bugün ekranı, program, Günün Kartı) | ✅ **Denetlendi, sorun yok.** Eşleşme cihazın **yerel** takvim gününden yapılıyor; `tarihISO` zaten bulunulan yerin takvim günü olduğu için cihaz UTC+2'deyken 00:00 – 01:00 arası da doğru gün çıkıyor. Sabit `+03:00` varsayılsaydı o aralık bir gün ileri kayardı. Gerekçe koda yorum olarak yazıldı |
| Hava durumu "N gün sonra tahmin" | Sabit `+03:00` kullanıyordu, aynı takvim günü hesabına çevrildi. Dosyada başka sabit saat dilimi kalmadı |

**Cepte sekmelere bölündü.** Yedi kart alt alta çok uzun bir sütundu. Artık yatay kaydırılan
sekme çubuğu, aynı anda tek kart açık. Kartlar DOM'da yerinde kalıyor (yalnızca `hidden`),
yani delege edilmiş dinleyiciler ve cihazda saklanan alanlar aynen çalışıyor. Sekme çubuğunu
JS kuruyor — **JS kapalıysa bölüm eski uzun listesine dönüyor**. Yazdırmada çubuk gizli,
yedi kartın hepsi basılıyor.

**Kur defteri kaldırıldı.** Telefondaki para uygulamaları aynı işi güncel kurla yapıyor; elle
girilen kur eskiyip yanıltıyordu. Veri, kart, hesap fonksiyonu ve `.kur-*` CSS'i silindi;
hazırlık listesindeki "Kur girilecek" maddesi de kalktı. Cihazda kalmış `kur::*` kayıtları
zararsız. Para bilgisi **💱 Para ve ödeme** kartında duruyor.

### 7 Ağustos 2026 — çevrimdışı acil donanımı

Site *program* olarak çevrimdışı tamdı, *başımıza iş geldi* anında zayıftı. Eklenenler:

- **Gezinme çekmecesi** — yatay kaydırmalı şerit gitti; çubukta bulunulan bölümün adı yazıyor,
  dokununca yandan liste açılıyor (odak tuzağı, Esc, karartı, gövde kilidi).
- **Acil cümleler** — göster-ve-anlaş; tam ekran, kocaman punto, iki dil + okunuş.
- **Sağlık kartı** — cihazda; Günün Kartı'nın acil bloğuna da düşüyor.
- **Akış kartları** — "iş başa düşerse" altı senaryo.
- **Hastaneler** — koordinatları Wikidata/OSM'den doğrulanmış, haritada pin.
- **Buluşma planı ve kur defteri** — ikisi de cihazda, kur elle girilip çevrimdışı hesaplanıyor.
  _(Kur defteri 8 Ağustos'ta kaldırıldı; buluşma planı duruyor.)_
- **Yol koridoru** — Ohrid–Dıraç dâhil şehirler arası yol artık karo kapsamında.

⚠ Açık iş: acil cümlelerin çevirisi anadili bilen biriyle doğrulanmadı (PLAN → Bekleyenler).

### 7 Ağustos 2026 — sadeleştirme ve yeni ad

- **Ad ve ton:** site "Balkanlar'da Aşk", giriş cümlesi turun aşk tatili olduğunu söylüyor,
  15 Ağustos yıl dönümü metne girdi. Yedek dosyası kimliği (`balkan-kacamagi`) bilerek
  değişmedi — eski yedekler reddedilmesin diye.
- **Dört bölüm kaldırıldı,** hepsi tekrardı; kaldırılırken tekrarlanmayan maddeler
  Dikkat bölümüne iki yeni kart olarak taşındı (🔌 Priz, bahşiş ve adap · 🍽 Sofrada).
- **Rota şeridi girişe alındı** — ayrı sekme yerine hero'da tek satır akan sık bir şerit.
- **Veri korundu:** `TUR.ulasim` ve `cepte.ucuslar` silinmedi; Bugün ekranı ve Günün Kartı
  bunlardan okuyor. Silinen alanlar yalnızca gerçekten okuyucusu kalmayanlar:
  `TUR.konaklama`, `TUR.pratik`, `TUR.yemeIcmeNotlari`.
- **Ölü CSS temizlendi:** `.route*`, `.info*`, `.yeme-notlar`, `.cep-ucus*`, `.table-wrap`.

### 6 Ağustos 2026 — iki kişilik tema ve kısalan sayfa

- **Tema ikiye bölündü.** `derin` = şeker pembesi (aydınlık), `baris` = koyu lacivert
  (karanlık, mevcut hâli korundu). Derin'inki `:root`'ta, Barış'ınki onu ezerek. Çubuktaki
  düğme açık olan temanın adını yazıyor (🤍 Derin / 💙 Barış). Sistem tercihi hâlâ geçerli
  (`dark` → Barış), eski `koyu`/`acik` kaydı okunurken çevriliyor. Kontrast ölçüldü: en düşük
  çift 4,7:1, hepsi AA üstü.
- **Hero ve perde renkleri token'landı** — `--c-deep-3`, `--c-isik-1/2`, `--c-perde`. Bunlar
  sabit lacivert yazılıydı, pembe temada yanlış görünürlerdi.
- **19 lezzet görseli** eklendi (bkz. "Bilinen tuzaklar" → görsel doğrulama). Kalan dördü
  bilerek 🍽 yer tutucuda.
- **"Ne yenir?" katlanır oldu.** Kapalı gövde `display:none` olduğu için içindeki
  `loading="lazy"` görseller bölüm açılana kadar hiç istenmiyor. `.city` kartının
  `contain-intrinsic-size` tahmini 3045 → 1818 px'e güncellendi.
- **İki sessiz hata düzeltildi:** yazdırma paleti seçicisi `html` yerine `:root` oldu (aydınlık
  temada kâğıt renkleri hiç uygulanmıyordu), `.nav-btn-metin` seçicisi `.nav-btn.nav-btn-metin`
  oldu (düğme 44 px'e sıkışıp metin taşıyordu).

### 6 Ağustos 2026 — plan revizyonu

Bu oturumda kod değil **planın kendisi** değişti; site o değişikliği taşıyacak hâle getirildi.
Dört yapısal karar:

| # | Karar | Neden |
|---|---|---|
| 1 | **Üsküp akşama alındı, Ohrid'e sabah otobüsüyle gidiliyor** | Üsküp–Ohrid seyrek sanılıyordu; aslında günde 16-17 sefer var (05:30–20:30, ~3 sa, ~15 €). Sabah otobüsüyle Ohrid'e 13:00'te varılıyor → 19:00 anahtar kutusu kısıtına 6 saat pay. Eski planda pay 1 saatti. Üsküp valizsiz ve akşam ışığında geziliyor |
| 2 | **Sveti Naum 15 → 14 Ağustos'a alındı** | 15 Ağustos **2. yıl dönümü**. Eski hâliyle yıl dönümü turun en lojistik günüydü (tam gün tekne, cumartesi = zirve kalabalık). Cuma teknesi daha tenha, cumartesi boşalıyor |
| 3 | **18 Ağustos'taki Tiran kaçamağı silindi** | Dıraç–Tiran hattı üç kez kullanılıyordu. Tiran'ın tamamı 19 Ağustos'a alındı; o gün zaten 11:00–23:30 arası 12 saat boş. 18 Ağustos tam dinlenme günü oldu |
| 4 | **Tiran bagaj emaneti çözüldü** | Rruga Ded Gjo Luli, Harri Truman Meydanı karşısı: 7/24 self-servis otomatik dolap, rezervasyon yok, saatlik 150 ALL'den, büyük dolap 98×50×60 cm, nakit ve kart. Kapanış saati riski ortadan kalktı |

Kodda karşılığı: `gunler[]` içinde yedi gün baştan yazıldı (17 ve 20 Ağustos'un gövdesi korundu,
20'ye tek not eklendi), `ulasim` tablosu sefer sıklıklarıyla yenilendi, `GUN_BACAK`'tan
18 Ağustos çıkarıldı (o gün ulaşım satırı basılmıyor), üç dikkat kartı yeniden yazıldı,
`cepte.bagajDolabi` ve `cepte.rezervasyon` eklendi, `havaDurumu.gunSehir` içinde 13 Ağustos
Üsküp'ten **Ohrid**'e alındı (gün artık 13:00'ten sonra Ohrid'de geçiyor).

Ayrıntılı oturum günlüğü (sebep–çözüm anlatımıyla): `PLAN.md` → "Yapılanlar".

---

## 9. Sırada ne var

### Gezi organizasyonu — kararlar (site kodu değil)

- [x] ~~**Konaklama isimleri ve rezervasyonları**~~ — 4 Ağustos'ta üç Airbnb işlendi
- [ ] **Ev sahibi telefonları ve Airbnb rezervasyon kodları** — üçü için de
- [ ] **Üsküp'te klima teyidi** — ilanda yazmıyor, bir yorum "klima yok" diyor
- [ ] ⚠️ **Ohrid → Dıraç otobüs bileti önceden alınacak** — turun tek kıt hattı (günde 3-5 sefer,
      07:00–17:00). Hedef ~09:00 kalkışı. Diğer üç bacak sık, yerinde/gişeden alınıyor
- [ ] **Ohrid Yaz Festivali'nin 15 Ağustos programı ve bileti** — `ohridskoleto.com.mk`
- [ ] **15 Ağustos akşam yemeği rezervasyonu** — yıl dönümü masası; Fisherman's House Kaneo
      ya da Kajche. 13 Ağustos'ta, Ohrid'e varır varmaz aranacak
- [ ] **Tiran → havalimanı gece transferi** (gece uçuşu için kritik)
- [ ] Toplam ve kişi başı günlük bütçe
- [ ] Seyahat sağlık sigortası poliçesi
- [ ] Sveti Naum tekne saatleri + giriş ücreti; Ohrid tekne turu rezervasyonu (ağustos yoğun)
- [ ] Dajti teleferiği, Bunk'Art, Dıraç amfitiyatrosu saat ve ücretleri
- [ ] Dıraç Arkeoloji Müzesi giriş ücreti (saatler biliniyor, müze 17 Ağustos'a kondu)
- [x] ~~**Tiran'da bagaj emaneti konumu ve saatleri**~~ — 6 Ağustos'ta çözüldü: Rruga Ded Gjo
      Luli, Harri Truman Meydanı karşısı; 7/24 self-servis dolap, rezervasyon yok, saatlik
      150 ALL'den, nakit ve kart
- [ ] Yerel eSIM ya da roaming tarifesi kararı
- [ ] 🕐 **12 Ağustos'ta inince iki telefonun da saat dilimini doğrula** — UTC+3 → UTC+2;
      otomatik güncellemediyse elle "Orta Avrupa Yaz Saati". Alarmlar ve otobüs saatleri
      buna bağlı (sitede 🕐 kritik kart olarak yazılı)
- [ ] 20 Ağustos 04:50 SAW inişi sonrası eve dönüş planı

### Site — veri girilince kendiliğinden çalışacak

- [x] ~~`TUR.cepte.konaklamalar` doldurulacak → "taksiciye göster" + harita bağlantısı~~ — yapıldı
- [x] ~~Konaklama adresleri belli olunca haritaya otel işaretçisi~~ — üç ev pini eklendi
- [ ] `cepte.konaklamalar[].telefonlar` içine ev sahibi numaraları → `tel:` bağlantısı açılır
- [ ] `TUR.cepte.acil` içine sigorta acil hattı
- [ ] Bilet PDF'lerinin `docs/` altına eklenmesi

### Site — test ve içerik

- [ ] **Gerçek telefonda göz + dokunma kontrolü** (özellikle çentikli iPhone'da yeni tema
      ve üst çubuk) — bütün ölçümler tarayıcıda yapıldı
- [ ] Siteyi "ana ekrana ekle" ile kurup **gerçek cihazda çevrimdışı** test et
- [ ] **Her iki telefonda "Haritayı çevrimdışına al"a bas** (evde, wifi'da) ve ardından uçak
      moduyla haritayı aç — indirmenin doğruluğu tarayıcıda ölçüldü, ağsız açılış cihazda
      doğrulanmadı
- [ ] Günün kartını gerçek telefonda dene: adres puntosu taksicinin okuyacağı kadar büyük mü,
      ekran görüntüsü kilit ekranında okunuyor mu
- [ ] **📍 Konumum'u gerçek telefonda, gerçek GPS ile dene** — tarayıcıda yalnızca sahte konumla
      sınandı. Site HTTPS'te (GitHub Pages) olduğu için izin istenebilmeli; ilk sabitleme süresi
      ve "eve X m" doğruluğu yerinde görülmeli
- [ ] Tam ekran haritayı çentikli iPhone'da dene — Leaflet denetimleri adanın altında kalmamalı
- [x] ~~**Lezzet görselleri tümüyle boş**~~ — 6 Ağustos'ta 23 lezzetin **19'una** doğrulanmış
      Commons görseli eklendi (thumb adresi API'nin `thumburl` alanından alındı, `curl -I` ile
      200 doğrulandı, künye `kaynak` alanına yazıldı). Kalan dört madde (Makiato, Eski Çarşı
      kebabı, modern Arnavut mutfağı, Raki Rrushi) bilerek 🍽 yer tutucusunda — yanıltıcı
      görsel konmadı
- [ ] Bill Clinton Bulvarı, Blloku, Bunk'Art için galeri görseli — uygun bulunursa
- [ ] Hava durumu penceresi açıldıkça mevsim normallerinin gerçek tahmine dönmesini izle
- [ ] Kapı ve wifi şifreleri geldiğinde Cepte bölümündeki gizli alanlara **her iki telefonda**
      girilecek (ya da bir telefonda girilip yedek dosyasıyla taşınacak)

---

## 10. Hızlı komutlar

```bash
# Yerel sunucu (service worker testi için gerekir — dosya:// ile çalışmaz)
python -m http.server 8000        # http://localhost:8000

# Belirli bir günü simüle et
# http://localhost:8000/?tarih=2026-08-15

# Görsel URL'i doğrula (eklemeden önce)
curl -I "https://upload.wikimedia.org/.../960px-....jpg"

# Görev bitirme (kural 1)
git add -A
git commit -m "Türkçe, açıklayıcı mesaj"
git push
```
