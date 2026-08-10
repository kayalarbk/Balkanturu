# Balkanlar'da Aşk — yapay zeka için proje özeti

> Bu dosya, projeyi hiç görmemiş bir yapay zeka asistanına **tek seferde** tanıtmak için
> yazıldı. Sohbetin başında bunu ver; ayrıntı gerekirse `README.md` (nasıl çalışır),
> `PLAN.md` (planın tek doğruluk kaynağı) ve `progress.md` (durum panosu) var.
>
> **Son güncelleme:** 10 Ağustos 2026

---

## 1. Tek cümlede

Barış Kaya ve Derin Beyza Günal'ın **12–20 Ağustos 2026** Balkan yolculuğu için yazılmış,
**tek HTML dosyasından oluşan**, çevrimdışı çalışan, telefona kurulabilen bir tur programı
sitesi. İnternetsiz bir yurt dışı gezisinde cepte taşınmak üzere tasarlandı.

- **Rota:** İstanbul → Priştine → Üsküp → Ohrid → Dıraç → Tiran → İstanbul
- **Süre:** 8 gün / 7 gece · 3 ülke (Kosova, Kuzey Makedonya, Arnavutluk)
- **Depo:** https://github.com/kayalarbk/Balkanturu (`main`)
- **Yayın:** https://kayalarbk.github.io/Balkanturu/ (GitHub Pages, build adımı yok)
- **Dil:** Arayüz, içerik, kod yorumları ve commit mesajları **Türkçe**.

---

## 2. Bağlayıcı kurallar

Bunlar tercih değil, projenin çalışma sözleşmesi. Bir değişiklik önerirken bunlara uy:

1. **Push'lanmadan görev bitmez.** Sıra: değişikliği yap → `PLAN.md` + `progress.md`
   güncelle → açıklayıcı Türkçe commit → `git push`.
2. **`PLAN.md` ile `index.html` içindeki `TUR` objesi asla ayrışmaz.** Biri değişirse
   diğeri **aynı commit'te** güncellenir.
3. **Uydurma bilgi yasak.** Doğrulanmamış telefon, saat, ücret, koordinat veya görsel
   URL'i yazılmaz. Emin olunmayan yere _belirlenecek_ / _kontrol edilecek_ / _alınacak_
   yazılır; bu ifadeler sitede otomatik vurgulanır. **Bu kural en sık ihlal edilen ve en
   pahalıya patlayan kuraldır** — koordinat Wikidata `P625`'ten, görsel URL'i Commons
   API'sinin `thumburl` alanından alınıp `curl -I` ile doğrulanır.
4. **Harici bağımlılık eklenmez.** Tek bilinçli istisna **Leaflet 1.9.4** (SRI hash'li,
   harita bölümü yaklaşınca enjekte edilir). Kütüphane getirmek yerine kod elle yazılır —
   lightbox, takvim dosyası, PNG üretimi, arama, hepsi elle yazılmış.
5. **Mobile-first.** Temel stiller mobil için; masaüstü `min-width` ile genişler.
   Yeni ızgarada `1fr` **değil** `minmax(0,1fr)`.
6. **Renk sabiti yazılmaz, `:root` token'ı kullanılır.** Aksi hâlde karanlık tema ve
   yazdırma çıktısı sessizce bozulur. (İki bilinçli istisna: acil çıktı kâğıdı ve kartın
   PNG'si — ikisi de sitenin dışına çıkan çıktılar.)

---

## 3. Mimari

```
index.html   ~10.000 satır — sitenin TAMAMI (içerik + CSS + JS tek dosyada)
sw.js        service worker (tarayıcı gereği ayrı dosya olmak zorunda)
manifest.json / icon.svg    PWA
docs/img/    yerele indirilmiş şehir kapakları + KAYNAKLAR.md
PLAN.md      planın tek doğruluk kaynağı (uçuş, konaklama, gün gün program)
progress.md  durum panosu (özellikler, tuzaklar, oturum geçmişi, sırada ne var)
README.md    kullanım + geliştirme kılavuzu
```

**İçerik/sunum ayrımı:** Sitenin bütün metinleri dosyanın en başındaki tek bir
`const TUR = {...}` objesindedir. HTML gövdesi boş kabuklardan oluşur, sayfa bu objeden
JS ile render edilir. **Metin değiştirmek için CSS'e veya HTML'e dokunmak gerekmez.**

`TUR`'un ana alanları: `meta` · `ucuslar` · `rota` · `konaklama` · `sehirler` · `gunler` ·
`sabahListesi` · `ulasim` · `harita` · `dikkatEdilecekler` · `neYapmali` · `cepte` ·
`havaDurumu` · `kontrolListesi` · `belirlenecek`

---

## 4. Veri modelinin can alıcı kısmı: `gunler[].program`

Program maddeleri **düz metin değil, obje**:

```js
{ saat?, dilim?, metin, yer?, hatirlatma?, takvimDisi?, tz? }
```

| Alan | Anlamı |
|---|---|
| `saat` | **Ekranda görünen** serbest metin: `"~13:00"`, `"En geç 10:00"`, `"09:00 – 10:00 arası"`. Kod içindeki **ilk HH:MM**'i ayrıştırır — yaklaşıklık bozulmadan makine okuyabilir |
| `dilim` | Saati olmayan maddeler için `"sabah"` / `"ogle"` / `"aksam"` |
| `yer` | **Mevcut** bir koordinat kaydına referans: `"ev:ohrid"`, `"otogar:Üsküp"`, `"hastane:Dıraç"`, `"havalimani:TIA"`, `"sehir:Ohrid"`. Satırda yol tarifi bağlantısı çıkar. **Ham koordinat buraya yazılmaz** |
| `hatirlatma` | Takvim alarmı: `"sert"` → 60+15 dk önce · `"orta"` → 30 dk önce · yok → alarmsız |
| `takvimDisi` | Madde `.ics`'e girmez; değeri **onu zaten kapsayan etkinliğin kimliği** |
| `tz` | Saat Türkiye saatiyle yazılmışsa `"+03:00"`. Verilmezse **+02:00** |

Ayrıca `gunler[].yapilacaklar` var: o gün **elden çıkarılacak işler** (bilet al, ara, sor,
para boz). `program` "nereye/ne zaman", `yapilacaklar` "ne yapılacak" — ikisi ayrı listedir.

---

## 5. Öne çıkan özellikler

**Yolda kullanım**
- **Bugün ekranı** — uçuş bloğu, geri sayımlı "Şu an / Sıradaki", eylem şeridi
  (Ev · Otogar · Hastane · Kart · Acil kâğıt), o günün yapılacakları, her sabah
  sıfırlanan "çıkmadan önce" listesi
- **Günün Kartı** — tam ekran tek bakışlık acil kart; ⬇ Görsel ile **1080×1920 PNG**
  olarak iner (canvas'a elle çizilir, kütüphane yok)
- **Gün kartları** — saatli çizelge; geçmiş maddeler soluk, o anki vurgulu, tik kutuları,
  satırda yol tarifi, o günün yapılacakları, anı notu
- **Cepte** — 9 sekmeli akordeon: konaklama · acil numaralar · hastaneler · otogarlar ·
  sağlık · ayrı düşersek · acil cümleler · günlük cümleler · kelimeler
- **Harita** — Leaflet; odak şeridi, 📍 konum + Yakınımdakiler, ⛶ tam ekran,
  **390 karo çevrimdışı indirme**, 📵 **veri kilidi** (açıkken ağa hiç çıkmaz)
- **Site içi arama** — 🔍 / Ctrl+K. Var olma sebebi teknik: Ctrl+F **kapalı akordeonun
  içini bulamıyor**
- **Çift saat** — cihaz + Türkiye. TR saati UTC'den hesaplanır, cihazın dilimi yanlışken
  bile doğru kalır

**Bildirim** (bu projede özel bir konu)
- iOS'ta site kapalıyken çalan tek güvenilir kanal **telefonun kendi takvim alarmı**.
  Web Push sunucu ister (Kural 4), `setTimeout`+`showNotification` arka planda ölür,
  Notification Triggers ve Periodic Background Sync iOS'ta yok.
- Bu yüzden bildirim işi **`.ics` üzerinden** yürüyor: **29 etkinlik**, alarmlar dosyanın
  içinde, program verisinden üretiliyor. Her sabah 08:00'de "Bugünün programı" özeti var.
- Ek olarak site **açıkken** çalışan isteğe bağlı hatırlatma (10 dk kala). Hiçbir şey
  zamanlanmıyor — 30 sn'de bir dönen döngünün içinden gönderiliyor.

**Çıktılar**
- `?yazdir=acil` — tek A4'e sığan acil kâğıdı (punto otomatik seçilir, iki temada aynı basar)
- `?kontrol=1` — `TUR` objesini gezip **9 grupta** rapor basan veri tutarlılık denetimi
- `?tarih=2026-08-15` — istenen günü simüle eder (geliştirme kolaylığı)

**PWA** — `manifest.json` + `sw.js`; app shell ön belleğe alınır. `balkan-karo` ve
`balkan-gorsel` cache'leri **bilerek sürümsüzdür** (evde indirilen harita yolda kaybolmasın).
⚠ `index.html` değişince `sw.js` içindeki `CACHE_VERSION` **artırılmalı**.

---

## 6. Tarayıcıda saklananlar

Hepsi `localStorage`, **sunucuya hiçbir şey gitmez**, cihaza özeldir.

| Anahtar | İçerik |
|---|---|
| `balkan2026.hazirlik` | Hazırlık listesi işaretleri |
| `balkan2026.favoriler` | ♥ kalpler (kimlik: `şehirAdı::maddeMetni`) |
| `balkan2026.anilar` | Gün kartlarındaki anı notları (anahtar: `YYYY-MM-DD`) |
| `balkan2026.akis` | Program maddesi tikleri (`YYYY-MM-DD::sıraNo`) |
| `balkan2026.yapilacaklar` | Yapılacaklar tikleri (`YYYY-MM-DD::id`) |
| `balkan2026.sabah` | "Çıkmadan önce" listesi — gün dönünce sıfırlanır, yedeğe girmez |
| `balkan2026.gizli` | **Kapı kodu / kutu şifresi / wifi / sağlık kartı / buluşma noktaları** |
| `balkan2026.hava` · `.tema` · `.karolar` · `.karokilit` · `.bildirim` · `.bildirimAcik` | ayarlar ve önbellek |

**🔒 Gizlilik kuralı:** Depo herkese açık. **Kapı kodu, kutu şifresi ve wifi şifresi
kaynak koda ASLA yazılmaz** — `TUR`'da yalnızca *alan tanımı* durur, değerler kullanıcı
girdiğinde cihazda saklanır.

**Kırılganlık:** madde **metnini** değiştirmek kalbini kaybettirir · `tarihISO`
değiştirmek anı notunu erişilemez yapar · `kontrolListesi[].id`, `konaklamalar[].id` ya da
`yapilacaklar[].id` değiştirmek o kaydı sıfırlar · `program` içinde bir maddenin **yerini**
değiştirmek akış tiklerini yanlış maddeye bindirir.

---

## 7. En pahalı tuzaklar

`progress.md` bölüm 6'da tam liste var (~40 madde). En sık ısıranlar:

| Tuzak | Doğrusu |
|---|---|
| `grid-template-columns:1fr` | Alt sınırı `auto`; uzun içerik kartı taşırır → `minmax(0,1fr)` |
| `html{overflow-x:hidden}` | `position:sticky`'yi **sessizce** bozar → `clip` |
| Metne bakan regex ile sınıflandırma | Program dilimlemesi bir kez böyle yanlış çıktı ("yemek" geçen her satır akşama düştü) → veriye yaz, tahmin etme |
| Yaklaşık saati kesinleştirmek | "~09:00" bilet alınmadığı için bir HEDEF, veri değil → takvime saatli yazılmaz |
| Ölçümü ekran dışında yapmak | `content-visibility:auto` **tahmini** yükseklik verir; ölçmeden önce öğeyi görünür yap |
| Bu sayfada `window.scrollTo` | Kökte `overflow-x:clip` var, programatik kaydırma tutmuyor → gerçek scroll ile test et |
| "Denetim 0 hata verdi" deyip geçmek | Sıfır, denetimin çalıştığını **kanıtlamaz** → bilerek bozulmuş bir kopya sun ve her kontrolün ateşlendiğini gör |
| `index.html` değişince | `sw.js` içindeki `CACHE_VERSION` artırılmalı |
| Aynı ada iki kez `const` | Fonksiyon içinde dış kapsamdakiyle aynı adı açmak, yukarıdaki kullanımı TDZ'ye düşürüp kartı sessizce render etmez hâle getirdi |

---

## 8. Nasıl çalıştırılır / test edilir

```bash
python -m http.server 8000
# http://localhost:8000
```

Service worker **yalnızca `https://` ya da `localhost`'ta** çalışır; `file://` ile açılırsa
site çalışır ama çevrimdışı desteği devreye girmez.

Yararlı adresler: `?kontrol=1` (veri denetimi) · `?tarih=2026-08-15` (gün simülasyonu) ·
`?yazdir=acil` (acil kâğıdı).

Söz dizimi kontrolü için hızlı yol — inline script'leri ayıklayıp `new Function`'a ver:

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8');
const re=/<script>([\s\S]*?)<\/script>/g;let m,i=0;
while((m=re.exec(h))){i++;try{new Function(m[1]);console.log('#'+i+' OK')}catch(e){console.log('#'+i,e.message)}}"
```

---

## 9. Açık işler (10 Ağustos 2026)

**Gezi kararları:** Ohrid → Dıraç otobüs bileti (turun tek kıt hattı) · ev sahibi
telefonları ve rezervasyon kodları · seyahat sağlık sigortası · bütçe · 15 Ağustos akşam
yemeği rezervasyonu · Tiran → havalimanı gece transferi.

**Site:** acil ve günlük cümlelerin çevirisi anadili bilen biriyle doğrulanacak ·
program maddelerine koordinat (NEWBORN, Kaneo, Sveti Naum iskelesi, Dajti, Bunk'Art —
doğrulanmadığı için boş) · gerçek telefonda çevrimdışı, GPS, Wake Lock ve takvim alarmı
denemeleri · kapı ve wifi şifrelerinin iki telefona da girilmesi.

---

## 10. Bu projede yardım ederken

- **Türkçe yaz** — arayüz, kod yorumu, commit mesajı, hepsi.
- **Kod yorumları burada gerekçe taşır**, ne yaptığını değil **neden öyle yapıldığını**
  anlatır. Mevcut yorum yoğunluğunu ve üslubunu koru.
- Bir bilgiden emin değilsen **uydurma**; _belirlenecek_ yaz ve `PLAN.md` →
  "Bekleyenler" listesine ekle.
- Yeni bir bölüm eklersen `NAV_ADLARI` eşlemesine satır ekle, yoksa üst çubukta çıkmaz.
- Veriye dokunduktan sonra **`?kontrol=1`'i bir kez çalıştır**.
- Değişiklik bitince `PLAN.md` + `progress.md` güncelle, `CACHE_VERSION` artır, commit et
  ve **push'la**.
