# Gerçek cihaz prova listesi

> **Ne zaman:** kalkıştan önce, **evde ve wifi'dayken**. Adımlar sırayla yapılmalı —
> sonraki adımlar öncekinin bıraktığı duruma dayanıyor.
> **Kim:** iki telefonda da ayrı ayrı. Kutucuğa **✅** ya da **❌** yaz.
> **Süre:** ~40 dakika (harita indirmesi dâhil).
>
> Adres: **https://kayalarbk.github.io/Balkanturu/**
> ❌ çıkan her satırın altındaki "Not" alanına ne olduğunu yaz — düzeltme kararı sonra.

---

## A. Kurulum (wifi'da)

| # | Adım | Beklenen sonuç | 📱 Barış | 📱 Derin |
|---|---|---|---|---|
| A1 | Siteyi tarayıcıda aç | Sayfa açılır, üstte geri sayım görünür | ☐ | ☐ |
| A2 | Üst çubuğa bak | Sol üstte **çift saat** var: büyük rakam cihazın saati, altında `TR ile aynı` | ☐ | ☐ |
| A3 | Menü → **Ana ekrana ekle** (iOS: paylaş → Ana Ekrana Ekle) | Ana ekranda "Balkanlar'da Aşk" ikonu çıkar | ☐ | ☐ |
| A4 | Uygulamayı **ana ekrandaki ikondan** aç | Tarayıcı adres çubuğu **görünmez** (standalone açılır) | ☐ | ☐ |
| A5 | Üst çubukta 🔍 → "otogar" yaz | En az 9 sonuç; birine dokununca ilgili bölüm açılır | ☐ | ☐ |

**Not:**

---

## B. Harita ve GPS

| # | Adım | Beklenen sonuç | 📱 Barış | 📱 Derin |
|---|---|---|---|---|
| B1 | Harita bölümüne in, yüklenmesini bekle | Harita çıkar, rota çizgisi ve pinler görünür | ☐ | ☐ |
| B2 | Haritanın altında **"Haritayı çevrimdışına al"** → başlat | ~390 karo (~7,8 MB) iner; çubuk dolar, sonunda "tamamlandı" yazar | ☐ | ☐ |
| B3 | **⛶ tam ekran** | Harita ekranı kaplar; Leaflet düğmeleri **çentiğin/adanın altında kalmaz** | ☐ | ☐ |
| B4 | Tam ekranda 1-2 dakika bekle (dokunma) | Ekran **sönmez** (Wake Lock) | ☐ | ☐ |
| B5 | Esc / ✕ ile çık | Sayfa eski yerine döner, kaydırma kilidi açılır | ☐ | ☐ |
| B6 | **📍 Konumum**'a bas, izin ver | Mavi nokta + doğruluk çemberi; altta rozet: `… ev: N m · ±N m` | ☐ | ☐ |
| B7 | Rozetin altına bak | **Yakınımdakiler**: en yakın ev / otogar / hastane, mesafeleriyle | ☐ | ☐ |
| B8 | Yakınımdakiler'den birine dokun | Google Maps o koordinatta açılır | ☐ | ☐ |
| B9 | **📵 veri kilidi** düğmesine bas | Düğme "açık" duruma geçer; indirilmemiş bölgeler boş kalır | ☐ | ☐ |
| B10 | Kilidi tekrar kapat (📶) | Boşluklar dolar | ☐ | ☐ |

**Not:**

---

## C. Çevrimdışı prova — ✈️ UÇAK MODU

> Bu bölüm turun **en kritik** provası. B2 (harita indirmesi) bitmeden başlama.

| # | Adım | Beklenen sonuç | 📱 Barış | 📱 Derin |
|---|---|---|---|---|
| C1 | **Uçak modunu aç** (wifi de kapalı olsun) | — | ☐ | ☐ |
| C2 | Uygulamayı **tamamen kapat**, ana ekrandan yeniden aç | Site açılır; üstte `📴 Çevrimdışısın` şeridi çıkar | ☐ | ☐ |
| C3 | Program, Cepte, gün kartları, Günün Kartı'nı gez | Hepsi çalışır; şehir kapak görselleri görünür | ☐ | ☐ |
| C4 | Harita bölümüne in | Harita **açılır ve karolar görünür** (indirilen bölgede) | ☐ | ☐ |
| C5 | Odak şeridinden Ohrid → Dıraç → Tiran'a dokun | Her biri açılır, karolar yerinde | ☐ | ☐ |
| C6 | **📍 Konumum** | GPS uçak modunda da çalışır: nokta ve mesafe gelir | ☐ | ☐ |
| C7 | Hava durumu bölümüne bak | Son kayıtlı veri ya da mevsim normali gösterilir, boş kalmaz | ☐ | ☐ |
| C8 | **Uçak modunu kapat** | Çevrimdışı şeridi kaybolur | ☐ | ☐ |

**Not:**

---

## D. Günün Kartı ve adres

| # | Adım | Beklenen sonuç | 📱 Barış | 📱 Derin |
|---|---|---|---|---|
| D1 | Üst çubuktan **Kart** | Tam ekran kart açılır; adres **yerel alfabede, büyük puntoyla** | ☐ | ☐ |
| D2 | Kartı kolunu uzatarak tut, okumaya çalış | Adres **bir metreden okunabiliyor** (taksiciye uzatılacak) | ☐ | ☐ |
| D3 | Kart açıkken 1-2 dakika bekle | Ekran **sönmez** | ☐ | ☐ |
| D4 | Oklarla günler arasında gez | Her gün için doğru ev, telefon, büyükelçilik ve 112 çıkar | ☐ | ☐ |
| D5 | **⬇ Görsel** | `balkan-2026-08-XX.png` galeriye iner | ☐ | ☐ |
| D6 | İnen PNG'yi galeriden aç, **güneş altına çık** | Yazılar okunuyor; kilit ekranına konabilir | ☐ | ☐ |
| D7 | Cepte → Konaklama → adres **kopyala** | "✓ kopyalandı" çıkar, panoya yapışır | ☐ | ☐ |

**Not:**

---

## E. Takvim ve bildirim

| # | Adım | Beklenen sonuç | 📱 Barış | 📱 Derin |
|---|---|---|---|---|
| E1 | Hazırlık → **📅 Takvim dosyasını indir** | `balkanlarda-ask.ics` iner, "**29 etkinlik**" yazıyordu | ☐ | ☐ |
| E2 | Dosyayı aç → takvime ekle | 12–20 Ağustos arası etkinlikler takvimde görünür | ☐ | ☐ |
| E3 | Takvimde **13 Ağustos** gününe bak | Sabah 08:00 "📋 Bugün: …" özeti + gün içi maddeler var | ☐ | ☐ |
| E4 | 13 Ağustos'taki **⏰ Üsküp → Ohrid otobüsü**'nü aç | **İki alarm** var: 1 saat ve 15 dakika önce | ☐ | ☐ |
| E5 | Etkinliklerin saatlerini kontrol et | 12 Ağustos 09:50 kalkış **Türkiye saatinde**, geri kalanlar yerel saatte doğru | ☐ | ☐ |
| E6 | Dosyayı **ikinci kez** indirip yeniden ekle | Etkinlikler **çoğalmaz**, güncellenir (UID'ler kararlı) | ☐ | ☐ |
| E7 | Hazırlık → **🔔 Site açıkken hatırlat** → izin ver | Anında bir örnek bildirim gelir; düğme "açık" olur | ☐ | ☐ |

**Not:**

---

## F. Kodlar ve iki telefon arası taşıma

> ⚠ Kapı kodu / kutu şifresi / wifi şifresi **depoda yoktur**, yalnızca cihazda durur.
> Bu yüzden **her iki telefona da** girilmeli (ya da birine girilip yedekle taşınmalı).

| # | Adım | Beklenen sonuç | 📱 Barış | 📱 Derin |
|---|---|---|---|---|
| F1 | Cepte → Konaklama → üç evin **kapı/kutu/wifi** alanlarını doldur | Değerler kaydedilir, sayfa yenilenince durur | ☐ | ☐ |
| F2 | Cepte → 🩺 Sağlık → kan grubu, alerji, ilaç, acil kişi | Kaydedilir; Günün Kartı'nın acil bloğunda görünür | ☐ | ☐ |
| F3 | Cepte → 🧭 Ayrı düşersek → beş şehrin buluşma noktası | Kaydedilir | ☐ | ☐ |
| F4 | Hazırlık → **⬇ Dosyaya indir** | `.json` yedek iner | ☐ | ☐ |
| F5 | Yedeği diğer telefona gönder → **⬆ Dosyadan yükle** | "Birleştirildi" yazar, sayfa yenilenir, kodlar diğer telefonda da görünür | ☐ | ☐ |
| F6 | Birleştirme sonrası kodları kontrol et | Mevcut değerler **ezilmemiş** | ☐ | ☐ |

**Not:**

---

## G. Kâğıt yedeği

| # | Adım | Beklenen sonuç | 📱 / 🖨 |
|---|---|---|---|
| G1 | Tarayıcıda `?yazdir=acil` adresini aç | Tek A4'lük sade sayfa çıkar | ☐ |
| G2 | Yazdır / PDF'e kaydet | **Tek sayfaya** sığar, taşmaz | ☐ |
| G3 | Çıktıyı oku | Üç adres yerel alfabede, PNR'lar, 112, üç büyükelçilik, sağlık kartı okunuyor | ☐ |
| G4 | Kodların basıldığını doğrula | Girilen kapı/wifi kodları kâğıtta var | ☐ |
| G5 | Kâğıdı katla, **her ikinizin çantasına birer kopya** koy | — | ☐ |

**Not:**

---

## H. Kalkış sabahı — son bakış (12 Ağustos)

| # | Adım | Beklenen sonuç | ☐ |
|---|---|---|---|
| H1 | Siteyi aç, **Bugün** ekranına bak | Uçuş bloğu (VF101 · PNR 4FQPAT) en üstte | ☐ |
| H2 | "Şu an / Sıradaki" kutusunu oku | Sıradaki maddeye kalan süre doğru görünüyor | ☐ |
| H3 | "Çıkmadan önce" listesini işaretle | 5 / 5 olur | ☐ |
| H4 | **Priştine'ye indikten sonra** iki telefonun saatine bak | Çift saatte alt satır artık `TR 11:30` gibi **farklı** bir saat gösterir (UTC+3 → UTC+2 geçti) | ☐ |
| H5 | Geçmediyse: saat dilimini elle **Orta Avrupa Yaz Saati** yap | Alarmlar ve otobüs saatleri doğru olur | ☐ |
| H6 | Roaming'e geçince haritada **📵 veri kilidini aç** | Harita yeni karo indirmez, fatura sürprizi olmaz | ☐ |

**Not:**

---

### Provada ❌ çıkanlar

| # | Ne oldu | Hangi telefon |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
