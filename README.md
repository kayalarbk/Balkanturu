# Balkan Kaçamağı 🏖

Barış Kaya & Derin Beyza Günal'ın **12 – 20 Ağustos 2026** Balkan turu için hazırlanmış
tek sayfalık tur programı sitesi.

**Rota:** İstanbul → Priştine 🇽🇰 → Üsküp 🇲🇰 → Ohrid 🇲🇰 → Dıraç 🇦🇱 → Tiran 🇦🇱 → İstanbul
**Süre:** 8 gün / 7 gece · 3 ülke · her üçü de vizesiz

---

## Nasıl açılır

`index.html`'e çift tıkla. Hepsi bu.

Site tek dosyadır: CSS ve JS inline, harici bağımlılık yok, CDN yok, build adımı yok,
internet gerekmez. Modern tarayıcıların hepsinde çalışır, mobil öncelikli tasarlanmıştır.

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
| `meta` | Başlık, yolcular, tarih aralığı, süre, geri sayım hedefi (`kalkisISO`), giriş cümlesi, vize notu |
| `ucuslar` | Gidiş ve dönüş: havayolu, sefer, PNR, saat/havalimanı, bagaj, gece uçuşu uyarısı |
| `rota` | Rota şeridindeki duraklar: ad, bayrak, gece notu |
| `konaklama` | Hangi gece hangi şehir, kaç gece, tesis adı |
| `sehirler` | Şehir kartları: tema cümlesi, rehber tanıtım paragrafı, "Öne çıkanlar" listesi |
| `gunler` | 9 günlük program: tarih, başlık, özet, adım adım akış, rehber notları, gece bilgisi |
| `ulasim` | Ulaşım özeti tablosu: bacak, süre, yöntem, durum |
| `pratik` | Pratik bilgi kartları: para, bütçe, elektrik, sağlık, adap, kelimeler |
| `kontrolListesi` | Hazırlık listesi maddeleri |
| `belirlenecek` | Sayfa sonundaki açık işler listesi |

### Pratik notlar

- **Geri sayım:** `meta.kalkisISO` alanına bağlıdır (`2026-08-12T09:50:00+03:00`).
  Uçuş saati değişirse burayı güncelle.
- **Bugünü vurgulama:** her günün `tarihISO` alanı sistem tarihiyle karşılaştırılır.
  Tarih aralık içindeyse o gün kartı vurgulanır ve otomatik açılır.
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
