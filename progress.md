# Balkan Kaçamağı — Proje Durumu (progress.md)

> **Bu dosya nedir?** Sitenin teknik ve içerik durumunun tek bakışta özeti: ne var, nasıl
> çalışıyor, ne kadar tamam, sırada ne var ve çalışırken hangi kurallara uyuluyor.
>
> **İlgili dosyalar:** planın tek doğruluk kaynağı `PLAN.md`, kullanım ve geliştirme
> kılavuzu `README.md`. Bu dosya onların yerine geçmez; ikisinin üstünde bir *durum panosu*.

**Son güncelleme:** 4 Ağustos 2026
**Depo:** https://github.com/kayalarbk/Balkanturu (`main`)
**Yayın:** https://kayalarbk.github.io/Balkanturu/ (GitHub Pages, `main` / root — build adımı yok)
**Son commit:** `699e9ee` + harita kullanılabilirlik oturumu
**Çalışma ağacı:** temiz · **Toplam commit:** 20 · **Oturum sayısı:** 12

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

Üçünde de **kendi kendine giriş** var (tuş takımı / kilitli kutu). ⚠️ **Ohrid'e en geç 19:00'da
varılmalı** — kutu sonrasında kullanılamıyor. Ev sahibi telefonları ve rezervasyon kodları
hâlâ _belirlenecek_; kapı ve wifi şifreleri bilinçli olarak depoda değil, yalnızca cihazda.

---

## 2. Teknik yapı

### Dosyalar

| Dosya | Satır / boyut | Ne işe yarar |
|---|---|---|
| `index.html` | **5.534 satır** (~258 KB) | Sitenin tamamı: içerik + CSS + JS tek dosyada |
| `sw.js` | 174 satır | Service worker — çevrimdışı çalışma, dört cache (ikisi sürümsüz, aşağıda) |
| `manifest.json` | — | PWA künyesi: standalone, portrait, tema `#0b2a45`, 2 kısayol (Bugün · Cepte) |
| `icon.svg` | — | Uygulama ikonu (`any` + `maskable`) |
| `docs/img/` | 5 kapak + `KAYNAKLAR.md` | Yerele indirilmiş şehir kapakları ve lisans listesi |
| `PLAN.md` | ~57 KB | Planın tek doğruluk kaynağı + oturum günlüğü |
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
  Karanlık tema bu token'ları `html[data-tema="koyu"]` altında ezerek çalışır.
- **Ayrım ilkesi:** site *yolda işe yarayan* alt kümeyi gösterir, `PLAN.md` tam kaydı tutar.
  Rezervasyon kararı verirken önemli olan (puan, olanak listesi, ev sahibi kıdemi) siteye
  konmaz — kart kalabalıklaşır ve asıl iş (adres, saat, kod) görünmez olur.

### `TUR` objesinin bölümleri

| Alan | İçerik | Durum |
|---|---|---|
| `meta` | Başlık, yolcular, tarih, süre, giriş cümlesi, `kalkisISO` / `donusISO` | ✅ kesin |
| `ucuslar` | Gidiş/dönüş: havayolu, sefer, PNR, saat, bagaj, gece uçuşu uyarısı | ✅ bilet üzerinden |
| `rota` | Rota şeridi durakları | ✅ |
| `konaklama` | Hangi gece hangi şehir, kaç gece, tesis | ✅ üç tesis girildi |
| `sehirler` | 5 şehir kartı: tema, rehber tanıtımı, öne çıkanlar, `kapak`, `galeri`, `lezzetler`, `konum` | ✅ (5 şehir haritada) |
| `gunler` | **9 günlük program**: tarih, başlık, akış, notlar, `risk`, `uyari`, gece | ✅ (giriş/çıkış saatleri işlendi; otobüs saatleri açık) |
| `ulasim` | Bacak / süre / yöntem / durum tablosu | ⚠️ saatler "kontrol edilecek" |
| `harita` | Karo kaynağı, atıf, zoom (6–18, karo z16'ya kadar), havalimanları, yedek metin, **`odak`** şeridi metinleri, **`cevrimdisi`** karo tarifi | ✅ |
| `dikkatEdilecekler` | **12 kart**, `seviye`: kritik / önemli / bilgi | ✅ |
| `cepte` | Uçuş kodları, üç konaklama (adres/koordinat/giriş), acil numaralar, kelimeler | ⚠️ ev sahibi telefonları, rezervasyon kodları ve sigorta hattı boş |
| `havaDurumu` | Open-Meteo ayarı, gün→şehir eşlemesi, mevsim normalleri, uyarı eşikleri | ✅ çalışıyor |
| `yemeIcmeNotlari` | Şehir kartı altındaki yeme-içme kutusu | ✅ |
| `pratik` | Para, bütçe, elektrik, sağlık, adap, kelimeler | ⚠️ bütçe boş |
| `kontrolListesi` | **10 maddelik** hazırlık listesi | ✅ (işaretler kullanıcıda) |
| `belirlenecek` | Sayfa sonundaki açık işler listesi | 7 madde |

### Harici bağlantılar (ikisi de bozulmaya karşı korumalı)

| Bağımlılık | Ne için | Yedek davranış |
|---|---|---|
| **Wikimedia Commons** görselleri | Kapak ve galeri fotoğrafları | `onerror` → degrade renkli yer tutucu + mekân adı |
| **Leaflet 1.9.4** (unpkg, SRI hash'li) | Rota haritası — *tek bilinçli istisna* | Yüklenmezse harita bölümü gizlenir, rotayı yazan sade kutu çıkar |
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
| Kapsam | Rota geneli z7–8 · 5 şehir z12–14 · 3 ev z15–16 · 2 havalimanı z13 |
| Zoom sınırı | Harita z18'e kadar yakınlaşır ama **z16'nın ötesinde karo istemez** (`maxNativeZoom`): Leaflet z16'yı büyütür. Bulanık, konum doğru, veri sıfır |
| Toplam | **236 karo, ~4,7 MB** (ölçüldü) |
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

## 3. Sitenin bölümleri (12 bölüm)

Üst çubuktaki bağlantılar DOM'daki **görünür** `section[id]`'lerden üretilir; adlar
`NAV_ADLARI` eşlemesinde. Yeni bölüm eklenirse oraya bir satır eklenmeli.
Çubuğun sağ ucundaki araçlar: **Kart** (günün kartı) · 🌙 tema · 🖨 yazdır.

| # | id | Nav | Not |
|---|---|---|---|
| 1 | `bugun` | 📌 Bugün | Yalnızca tarih 12–20 Ağustos 2026 aralığındayken görünür (`hidden`) |
| 2 | `ucuslar` | ✈ Uçuş | PNR, saat, bagaj, gece uçuşu uyarısı |
| 3 | `cepte` | 📱 Cepte | Uçuş kodları, konaklama, acil numaralar, temel kelimeler |
| 4 | `hava-bolumu` | 🌤 Hava | Veri gelmezse gizli kalır (`hidden`), gelince nav yeniden kurulur |
| 5 | `rota` | 🧭 Rota | Mobilde dikey akış, 1040 px üstünde yatay şerit |
| 6 | `sehirler` | 🏙 Şehirler | 5 kart + galeri + lezzetler + favori kalpleri |
| 7 | `program` | 🗓 Program | 9 günlük accordion, bugün olan gün vurgulanıp açılır |
| 8 | `harita-bolumu` | 🗺 Harita | Leaflet; odak şeridi + 📍konum + ⛶tam ekran; `data-durum` ile bekliyor/tamam/yedek; altında çevrimdışı karo kutusu |
| 9 | `ulasim` | 🚌 Ulaşım | 700 px altında kart görünümüne dönen tablo |
| 10 | `dikkat` | ⚠ Dikkat | 10 kart, seviyeye göre kenar rengi ve etiket |
| 11 | `pratik` | 💡 Pratik | Para, bütçe, elektrik, sağlık, adap, kelimeler |
| 12 | `hazirlik` | ✔ Hazırlık | 10 maddelik liste + yedekleme kutusu + konfeti |

---

## 4. Özellik durumu

### ✅ Tamamlanan

| Özellik | Kısa açıklama |
|---|---|
| Tek dosya içerik mimarisi | `TUR` objesi + JS render; metin/tasarım ayrımı |
| 9 günlük program | Akış, rehber notları (En iyi saat / Dikkat / İpucu), günlük risk satırı, kaçırılamaz kısıt kutusu (`uyari`) |
| 5 şehir kartı | Tema, rehber tanıtımı, öne çıkanlar, kapak + galeri, yerel lezzetler |
| Yerel lezzetler | Görsel **16:9 tam genişlik bant** (her ekranda ölçülen oran 1.78) |
| Geri sayım (3 durumlu) | Kalkış öncesi "Yola çıkmaya kalan" → tur içinde "Dönüşe kalan + N. gün / 8" → sonra "Tur tamamlandı" |
| Bugün ekranı | `tarihISO` eşleşince kart + o günün vurgusu; **o geceki konaklama bloğu** (ya da 19 Ağustos'un "konaklama yok" bloğu); `?tarih=2026-08-15` ile test edilebilir |
| Rota haritası | Leaflet, 5 şehir + 2 havalimanı + **3 konaklama** işaretçisi (ayrı renk/ikon), gün kartlarına bağlı; yedek kutusu var |
| **Harita odak şeridi** | Tüm rota · Bugün · 5 şehir çipi. Şehrin evi varsa doğrudan kapısına gider (z16), yoksa merkeze (z14). Tur sürerken harita **bugünün evinde** açılır, o pin kırmızı |
| **📍 Konumum** | `watchPosition` + nabızlı nokta + doğruluk çemberi; rozet **"Bu geceki ev: 420 m · ±12 m"** yazar ve yürüdükçe güncellenir. GPS internetsiz çalışır. İzin reddi / zaman aşımı / destek yok için ayrı metinler; sekme arkaya atılınca GPS bırakılır |
| **⛶ Tam ekran** | Harita sayfa akışından çıkıp ekranı kaplar; Esc kapatır, güvenli alan Leaflet denetimlerine uygulanır |
| Ev popup'ı | Kartın küçük hâli: adres yerel alfabede büyük punto, latin karşılığı, giriş/çıkış, adres kopyala + yol tarifi. Genişlik kabın enine göre hesaplanır. **Kodlar popup'a konmaz** |
| **Çevrimdışı harita** | 236 karo (~4,7 MB) tek dokunuşla indirilir; durdurulabilir, eksikler tamamlanabilir, silinebilir; reddedilen karolar için ikinci tur |
| **Günün kartı** | Üst çubuktaki "Kart" düğmesi — tam ekran, tek bakışlık: o geceki evin adresi (yerel alfabede büyük punto) + kapı kodu + wifi + ev sahibi telefonu + günün ulaşımı + o ülkedeki büyükelçilik + 112; oklarla günler arası gezinti, Esc kapatır |
| Hava durumu şeridi | Open-Meteo `forecast_days=16`, sıcak/yağmur uyarı rozetleri, 3 saat önbellek |
| Cepte bölümü | Uçuş kodları, acil numaralar (resmî `mfa.gov.tr` kaynaklı), temel kelimeler |
| Konaklama kartı | Üç Airbnb: şehir/tarih başlığı, ev adı, tip, künye listesi (giriş · çıkış · ev sahibi · telefon · rezervasyon), mesafeler, ilan bağlantısı |
| "Taksiciye göster" | Kartın tek vurgulu bloğu: yerel alfabede büyük punto adres + latin karşılığı + Dıraç'ta sözlü tarif; kopyala düğmesi ve **koordinattan** üretilen Maps bağlantısı |
| Gizli kod alanları | Kapı kodu / kutu şifresi / wifi — kaynak koda yazılmaz, `balkan2026.gizli` altında yalnızca cihazda; "Sil" düğmesi |
| Dikkat kartları | 12 kart, kritik / önemli / bilgi seviyeleri (yeni: eve giriş pencereleri · konaklama güvenliği) |
| Hazırlık listesi | 10 madde, `localStorage`, 10/10'da konfeti + kutlama (yalnızca tamamlanma anında) |
| ♥ İkimizin listesi | 50 kalp düğmesi, şehir başlığında sayaç, altta toplu özet, atış animasyonu |
| ✍ Anı notları | Her gün kartında `textarea`, 500 ms gecikmeli otomatik kayıt + "✓ kaydedildi" |
| Galeri + lightbox | Harici kütüphane yok; Escape / boşluk kapatır, ok tuşlarıyla gezinme |
| Karanlık tema | Token ezme yöntemi; ilk boyamadan önce uygulanır (beyaz parlama yok), sistem tercihini izler |
| Üst gezinme çubuğu | Yapışkan şerit, IntersectionObserver ile aktif bölüm işareti, tema + yazdırma düğmeleri, "yukarı çık" |
| Yazdırma / PDF | Token'lar kâğıt setine iner (koyu tema açıkken bile), etkileşimli parçalar gizlenir, **katlı gün kartları açılır** |
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
| Ulaşım tablosundaki saatler | Otogar teyitleri (şu an "kontrol edilecek" olarak vurgulu) |

---

## 5. Tarayıcıda saklanan veriler

Hepsi `localStorage`, **sunucuya hiçbir şey gitmez**, cihaza özeldir.

| Anahtar | İçerik |
|---|---|
| `balkan2026.hazirlik` | Hazırlık listesi işaretleri |
| `balkan2026.favoriler` | ♥ İkimizin listesi (kimlik: `şehirAdı::maddeMetni`) |
| `balkan2026.anilar` | Gün kartlarındaki anı notları (anahtar: `YYYY-MM-DD`) |
| `balkan2026.hava` | Hava yanıtı + zaman damgası (3 saat) |
| `balkan2026.tema` | Koyu / açık tercih (yoksa sistem tercihi) |
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
| 12 | 4 Ağu 2026 | **Harita yolda kullanılacak hâle getirildi:** odak şeridi, 📍konumum (eve mesafe), ⛶tam ekran, işe yarar ev popup'ı; karo tüketimi açılışta 15'ten 6'ya indi |
| 11 | 4 Ağu 2026 | **Çevrimdışı harita ve günün kartı:** 236 karo indirilebilir hâle geldi (cache'ler sürümsüzleştirildi, OSM hız sınırına göre ayarlandı), üst çubuğa tam ekran "Kart" eklendi |
| 9 | 4 Ağu 2026 | **Konaklamalar işlendi:** üç Airbnb (adres + koordinat), taksiciye göster kutusu, Ohrid 19:00 kritik uyarısı, 19 Ağustos boşluğu, gizli kod alanları, haritada ev pinleri, Dıraç Arkeoloji Müzesi, `sw.js` v2 |

Ayrıntılı oturum günlüğü (sebep–çözüm anlatımıyla): `PLAN.md` → "Yapılanlar".

---

## 9. Sırada ne var

### Gezi organizasyonu — kararlar (site kodu değil)

- [x] ~~**Konaklama isimleri ve rezervasyonları**~~ — 4 Ağustos'ta üç Airbnb işlendi
- [ ] **Ev sahibi telefonları ve Airbnb rezervasyon kodları** — üçü için de
- [ ] **Üsküp'te klima teyidi** — ilanda yazmıyor, bir yorum "klima yok" diyor
- [ ] **Şehirlerarası otobüs biletleri ve kalkış saatleri** — Priştine–Üsküp, Üsküp–Ohrid,
      Ohrid–Dıraç, Dıraç–Tiran son minibüs. ⚠️ Üsküp–Ohrid seferi **Ohrid'in 19:00 giriş
      kısıtına** uymak zorunda (anahtar kutusu sonrasında kapalı)
- [ ] **Tiran → havalimanı gece transferi** (gece uçuşu için kritik)
- [ ] Toplam ve kişi başı günlük bütçe
- [ ] Seyahat sağlık sigortası poliçesi
- [ ] Sveti Naum tekne saatleri + giriş ücreti; Ohrid tekne turu rezervasyonu (ağustos yoğun)
- [ ] Dajti teleferiği, Bunk'Art, Dıraç amfitiyatrosu saat ve ücretleri
- [ ] Dıraç Arkeoloji Müzesi giriş ücreti (saatler biliniyor, müze 17 Ağustos'a kondu)
- [ ] **Tiran'da bagaj emaneti konumu ve saatleri** — 19 Ağustos'un belkemiği: Dıraç'tan çıkış
      11:00, uçuş 02:15, arada ~14 saat valizle
- [ ] Yerel eSIM ya da roaming tarifesi kararı
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
- [ ] Kalan lezzetlere görsel (sac böreği, kebap, Skopsko, deniz mahsulleri) — uygun bulunursa
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
