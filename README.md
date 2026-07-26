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
- **Mobil:** yeni bir ızgara eklerken `1fr` yerine **`minmax(0,1fr)`** kullan — `1fr`'nin
  alt sınırı `auto` olduğu için uzun içerik sütunu şişirip kartı taşırıyor. Yeni tablo
  eklersen hücrelere `data-label` ver; 700 px altında başlık olarak basılıyor.
- **"Belirlenecek" işaretleri:** metinde geçen _belirlenecek_, _kontrol edilecek_,
  _alınacak_ ifadeleri otomatik olarak vurgulu gösterilir. Emin olunmayan bir bilgiyi
  uydurmak yerine bu ifadelerden birini yaz.
- **Kontrol listesi:** işaretler tarayıcının `localStorage`'ında `balkan2026.hazirlik`
  anahtarıyla saklanır. Yeni madde eklerken `id` alanının benzersiz olmasına dikkat et;
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

## Deploy

Statik tek dosya olduğu için herhangi bir statik barındırma çalışır.
En kolayı GitHub Pages:

1. Repo → **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` / `root` → Save

Birkaç dakika içinde site `https://kayalarbk.github.io/Balkanturu/` adresinde yayına girer.
Build adımı yoktur; `main`'e her push yayını günceller.

Alternatif: Netlify veya Vercel'e klasörü sürükle-bırak — yapılandırma gerekmez.
