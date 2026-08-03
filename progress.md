# Balkan Kaçamağı — Proje Durumu (progress.md)

> **Bu dosya nedir?** Sitenin teknik ve içerik durumunun tek bakışta özeti: ne var, nasıl
> çalışıyor, ne kadar tamam, sırada ne var ve çalışırken hangi kurallara uyuluyor.
>
> **İlgili dosyalar:** planın tek doğruluk kaynağı `PLAN.md`, kullanım ve geliştirme
> kılavuzu `README.md`. Bu dosya onların yerine geçmez; ikisinin üstünde bir *durum panosu*.

**Son güncelleme:** 4 Ağustos 2026
**Depo:** https://github.com/kayalarbk/Balkanturu (`main`)
**Yayın:** https://kayalarbk.github.io/Balkanturu/ (GitHub Pages, `main` / root — build adımı yok)
**Son commit:** `35200f4` — Üst gezinme çubuğu, karanlık tema, yazdırma çıktısı ve kayıt yedekleme
**Çalışma ağacı:** temiz · **Toplam commit:** 15 · **Oturum sayısı:** 7

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

Konaklama: Üsküp 1 gece · Ohrid 3 gece · Dıraç 3 gece — **tesis isimleri hâlâ belirlenecek.**

---

## 2. Teknik yapı

### Dosyalar

| Dosya | Satır / boyut | Ne işe yarar |
|---|---|---|
| `index.html` | **3.914 satır** (~186 KB) | Sitenin tamamı: içerik + CSS + JS tek dosyada |
| `sw.js` | 136 satır | Service worker — çevrimdışı çalışma, üç ayrı cache |
| `manifest.json` | — | PWA künyesi: standalone, portrait, tema `#0b2a45`, 2 kısayol (Bugün · Cepte) |
| `icon.svg` | — | Uygulama ikonu (`any` + `maskable`) |
| `docs/img/` | 5 kapak + `KAYNAKLAR.md` | Yerele indirilmiş şehir kapakları ve lisans listesi |
| `PLAN.md` | ~44 KB | Planın tek doğruluk kaynağı + oturum günlüğü |
| `README.md` | ~15 KB | Kurulum, içerik güncelleme, tuzaklar, deploy |
| `progress.md` | bu dosya | Durum panosu |

### Mimari

- **Tek dosya, build yok.** `index.html`'e çift tıklamak yeterli; `python -m http.server 8000`
  ile yerel sunucu da çalışır (service worker testi için gerekir).
- **İçerik ile sunum ayrı.** Bütün metinler dosyanın başındaki tek bir **`const TUR = {...}`**
  objesinde (satır ~85–1113). HTML gövdesi boş kabuklardan oluşur, sayfa bu objeden JS ile
  render edilir. **Metin değiştirmek için CSS'e veya HTML'e dokunmak gerekmez.**
- Yerleşim: `TUR` objesi → `<style>` (satır 1116–2265) → boş `<section>` kabukları
  (2297–2500) → render + davranış JS'i (2536'dan sona).
- **Tasarım token'ları** CSS'te `:root` altında (renk, boşluk `--s-*`, radius, gölge).
  Karanlık tema bu token'ları `html[data-tema="koyu"]` altında ezerek çalışır.

### `TUR` objesinin bölümleri

| Alan | İçerik | Durum |
|---|---|---|
| `meta` | Başlık, yolcular, tarih, süre, giriş cümlesi, `kalkisISO` / `donusISO` | ✅ kesin |
| `ucuslar` | Gidiş/dönüş: havayolu, sefer, PNR, saat, bagaj, gece uçuşu uyarısı | ✅ bilet üzerinden |
| `rota` | Rota şeridi durakları | ✅ |
| `konaklama` | Hangi gece hangi şehir, kaç gece, tesis | ⚠️ tesis isimleri boş |
| `sehirler` | 5 şehir kartı: tema, rehber tanıtımı, öne çıkanlar, `kapak`, `galeri`, `lezzetler`, `konum` | ✅ (5 şehir haritada) |
| `gunler` | **9 günlük program**: tarih, başlık, akış, rehber notları, `risk`, gece | ✅ (9 gün, saatler kısmen açık) |
| `ulasim` | Bacak / süre / yöntem / durum tablosu | ⚠️ saatler "kontrol edilecek" |
| `harita` | Karo kaynağı, atıf, zoom sınırları, havalimanları, yedek metin | ✅ |
| `dikkatEdilecekler` | **10 kart**, `seviye`: kritik / önemli / bilgi | ✅ |
| `cepte` | Uçuş kodları, konaklama, acil numaralar, temel kelimeler | ⚠️ konaklama + sigorta hattı boş |
| `havaDurumu` | Open-Meteo ayarı, gün→şehir eşlemesi, mevsim normalleri, uyarı eşikleri | ✅ çalışıyor |
| `yemeIcmeNotlari` | Şehir kartı altındaki yeme-içme kutusu | ✅ |
| `pratik` | Para, bütçe, elektrik, sağlık, adap, kelimeler | ⚠️ bütçe boş |
| `kontrolListesi` | **10 maddelik** hazırlık listesi | ✅ (işaretler kullanıcıda) |
| `belirlenecek` | Sayfa sonundaki açık işler listesi | 5 madde |

### Harici bağlantılar (ikisi de bozulmaya karşı korumalı)

| Bağımlılık | Ne için | Yedek davranış |
|---|---|---|
| **Wikimedia Commons** görselleri | Kapak ve galeri fotoğrafları | `onerror` → degrade renkli yer tutucu + mekân adı |
| **Leaflet 1.9.4** (unpkg, SRI hash'li) | Rota haritası — *tek bilinçli istisna* | Yüklenmezse harita bölümü gizlenir, rotayı yazan sade kutu çıkar |
| **Open-Meteo API** | 16 günlük hava tahmini | Pencere dışıysa mevsim normali; yanıt 3 saat `localStorage`'da |

> Üçü de kopsa sayfanın geri kalanı çevrimdışı sorunsuz çalışır.
> **Leaflet sürümü değişirse SRI hash'i de değişmeli** — tutmazsa harita sessizce yedeğe düşer.

---

## 3. Sitenin bölümleri (12 bölüm)

Üst çubuktaki bağlantılar DOM'daki **görünür** `section[id]`'lerden üretilir; adlar
`NAV_ADLARI` eşlemesinde (satır ~3688). Yeni bölüm eklenirse oraya bir satır eklenmeli.

| # | id | Nav | Not |
|---|---|---|---|
| 1 | `bugun` | 📌 Bugün | Yalnızca tarih 12–20 Ağustos 2026 aralığındayken görünür (`hidden`) |
| 2 | `ucuslar` | ✈ Uçuş | PNR, saat, bagaj, gece uçuşu uyarısı |
| 3 | `cepte` | 📱 Cepte | Uçuş kodları, konaklama, acil numaralar, temel kelimeler |
| 4 | `hava-bolumu` | 🌤 Hava | Veri gelmezse gizli kalır (`hidden`), gelince nav yeniden kurulur |
| 5 | `rota` | 🧭 Rota | Mobilde dikey akış, 1040 px üstünde yatay şerit |
| 6 | `sehirler` | 🏙 Şehirler | 5 kart + galeri + lezzetler + favori kalpleri |
| 7 | `program` | 🗓 Program | 9 günlük accordion, bugün olan gün vurgulanıp açılır |
| 8 | `harita-bolumu` | 🗺 Harita | Leaflet; `data-durum` ile bekliyor/tamam/yedek |
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
| 9 günlük program | Akış, rehber notları (En iyi saat / Dikkat / İpucu), günlük risk satırı |
| 5 şehir kartı | Tema, rehber tanıtımı, öne çıkanlar, kapak + galeri, yerel lezzetler |
| Yerel lezzetler | Görsel **16:9 tam genişlik bant** (her ekranda ölçülen oran 1.78) |
| Geri sayım (3 durumlu) | Kalkış öncesi "Yola çıkmaya kalan" → tur içinde "Dönüşe kalan + N. gün / 8" → sonra "Tur tamamlandı" |
| Bugün ekranı | `tarihISO` sistem tarihiyle eşleşince kart + o günün vurgusu; `?tarih=2026-08-15` ile test edilebilir |
| Rota haritası | Leaflet, 5 şehir + havalimanları, gün kartlarına bağlı; yedek kutusu var |
| Hava durumu şeridi | Open-Meteo `forecast_days=16`, sıcak/yağmur uyarı rozetleri, 3 saat önbellek |
| Cepte bölümü | Uçuş kodları, acil numaralar (resmî `mfa.gov.tr` kaynaklı), temel kelimeler |
| Dikkat kartları | 10 kart, kritik / önemli / bilgi seviyeleri |
| Hazırlık listesi | 10 madde, `localStorage`, 10/10'da konfeti + kutlama (yalnızca tamamlanma anında) |
| ♥ İkimizin listesi | 50 kalp düğmesi, şehir başlığında sayaç, altta toplu özet, atış animasyonu |
| ✍ Anı notları | Her gün kartında `textarea`, 500 ms gecikmeli otomatik kayıt + "✓ kaydedildi" |
| Galeri + lightbox | Harici kütüphane yok; Escape / boşluk kapatır, ok tuşlarıyla gezinme |
| Karanlık tema | Token ezme yöntemi; ilk boyamadan önce uygulanır (beyaz parlama yok), sistem tercihini izler |
| Üst gezinme çubuğu | Yapışkan şerit, IntersectionObserver ile aktif bölüm işareti, tema + yazdırma düğmeleri, "yukarı çık" |
| Yazdırma / PDF | Token'lar kâğıt setine iner (koyu tema açıkken bile), etkileşimli parçalar gizlenir, **katlı gün kartları açılır** |
| Kayıt yedekleme | İndir / yükle / panoya kopyala; geri yükleme **ezmez, birleştirir**; yabancı dosya `uygulama` alanından reddedilir |
| PWA + çevrimdışı | `manifest.json` + `sw.js`; app shell ön belleğe alınır, 2 kısayol |
| Mobil denetimi | 13 bulgu ölçülüp düzeltildi (aşağıda) |
| Güvenli alan desteği | `viewport-fit=cover` + `env(safe-area-inset-*)` — çentik / Dynamic Island |
| Erişilebilirlik temelleri | 44 px dokunma hedefleri, tüm satır tıklanabilir accordion, görsel künyelerinde tam atıf |

### 🔧 Yerinde ama veri bekliyor

| Özellik | Ne gelince tamamlanır |
|---|---|
| "Taksiciye göster" kutusu + otel harita bağlantısı | `TUR.cepte.konaklamalar` doldurulunca **kendiliğinden** çalışır |
| Haritada otel işaretçisi | Konaklama adresleri belli olunca |
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

**Kırılganlık uyarısı:** bir maddenin **metnini** değiştirmek o maddeye verilmiş kalbi
kaybettirir; `gunler[].tarihISO` değiştirmek eski anı notunu erişilemez yapar;
`kontrolListesi[].id` değiştirmek o maddenin işaretini sıfırlar.

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

Ayrıntılı oturum günlüğü (sebep–çözüm anlatımıyla): `PLAN.md` → "Yapılanlar".

---

## 9. Sırada ne var

### Gezi organizasyonu — kararlar (site kodu değil)

- [ ] **Konaklama isimleri ve rezervasyonları** — Üsküp 1, Ohrid 3, Dıraç 3 gece
- [ ] **Şehirlerarası otobüs biletleri ve kalkış saatleri** — Priştine–Üsküp, Üsküp–Ohrid,
      Ohrid–Dıraç, Dıraç–Tiran son minibüs
- [ ] **Tiran → havalimanı gece transferi** (gece uçuşu için kritik)
- [ ] Toplam ve kişi başı günlük bütçe
- [ ] Seyahat sağlık sigortası poliçesi
- [ ] Sveti Naum tekne saatleri + giriş ücreti; Ohrid tekne turu rezervasyonu (ağustos yoğun)
- [ ] Dajti teleferiği, Bunk'Art, Dıraç amfitiyatrosu saat ve ücretleri
- [ ] Tiran'da bagaj emaneti konumu ve saatleri
- [ ] Yerel eSIM ya da roaming tarifesi kararı
- [ ] 20 Ağustos 04:50 SAW inişi sonrası eve dönüş planı

### Site — veri girilince kendiliğinden çalışacak

- [ ] `TUR.cepte.konaklamalar` doldurulacak → "taksiciye göster" + harita bağlantısı açılır
- [ ] `TUR.cepte.acil` içine sigorta acil hattı
- [ ] Konaklama adresleri belli olunca haritaya otel işaretçisi
- [ ] Bilet PDF'lerinin `docs/` altına eklenmesi

### Site — test ve içerik

- [ ] **Gerçek telefonda göz + dokunma kontrolü** (özellikle çentikli iPhone'da yeni tema
      ve üst çubuk) — bütün ölçümler tarayıcıda yapıldı
- [ ] Siteyi "ana ekrana ekle" ile kurup **gerçek cihazda çevrimdışı** test et
- [ ] Kalan lezzetlere görsel (sac böreği, kebap, Skopsko, deniz mahsulleri) — uygun bulunursa
- [ ] Bill Clinton Bulvarı, Blloku, Bunk'Art için galeri görseli — uygun bulunursa
- [ ] Hava durumu penceresi açıldıkça mevsim normallerinin gerçek tahmine dönmesini izle

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
