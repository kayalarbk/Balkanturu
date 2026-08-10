# Balkanlar'da Aşk 🤍

Barış Kaya & Derin Beyza Günal'ın **12 – 20 Ağustos 2026** Balkan yolculuğu için hazırlanmış
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
>   "harici bağımlılık yok" kuralına tek ve bilinçli istisna. `<head>`'de yüklenmez;
>   harita bölümü ekrana yaklaşınca enjekte edilir, böylece oraya inmeyen ziyaretçi
>   hiçbir şey indirmez. Yüklenemezse harita bölümü gizlenir, yerine rotayı yazan sade
>   bir kutu çıkar.
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
| `progress.md` | **Durum panosu.** Ne var, nasıl çalışıyor, ne kadar tamam, sırada ne var, bilinen tuzaklar |
| `README.md` | Bu dosya |
| `AI-OZET.md` | Projeyi bir yapay zeka asistanına tek seferde tanıtan özet |
| `PROVA.md` | Kalkış öncesi **gerçek cihaz prova listesi** — iki telefonda sırayla, uçak modu dâhil |
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
| `gunler` | 9 günlük program: tarih, başlık, özet, akış (`program[]` — saatli maddeler), rehber notları, `risk`, `uyari`, gece bilgisi |
| `sabahListesi` | Her sabah çıkmadan bakılan 5 madde; işaretleri gün dönünce sıfırlanır |
| `gunler[].yapilacaklar` | O gün **elden çıkarılacak işler** (bilet al, ara, sor). `program` "nereye/ne zaman", bu "ne yapılacak" — ayrı listeler |
| `ulasim` | Ulaşım özeti tablosu: bacak, süre, yöntem, durum |
| `harita` | Harita ayarları: karo kaynağı ve atıf, zoom sınırları, havalimanları, yedek metin, `odak` (şerit metinleri ve zoom seviyeleri), `cevrimdisi` (indirilecek karo tarifi) |
| `dikkatEdilecekler` | "Nelere dikkat etmeli" kartları: ikon, başlık, `seviye`, maddeler |
| `cepte` | Cepte bölümü: uçuş kodları, konaklamalar (adres/koordinat/giriş/gizli alanlar), hastaneler, otogarlar, sağlık, buluşma, acil cümleler, **günlük cümleler**, **rakamlar** (`sayilar`), acil numaralar, temel kelimeler. Kartlar sekmelere bölünür — sekme adı/ikonu kartı eklerken `cepKartEkle(ikon, etiket, kart)` çağrısında verilir |
| `havaDurumu` | Open-Meteo ayarları, gün→şehir eşlemesi, mevsim normalleri, uyarı eşikleri |
| `yemeIcmeNotlari` | Şehir kartlarının altındaki yeme-içme notları kutusu |
| `pratik` | Pratik bilgi kartları: para, bütçe, elektrik, sağlık, adap, kelimeler |
| `kontrolListesi` | Hazırlık listesi maddeleri |
| `belirlenecek` | Sayfa sonundaki açık işler listesi |

### Pratik notlar

- **Program maddeleri saatli veridir.** `gunler[].program` düz metin dizisi değil,
  `{ saat?, dilim?, metin, yer? }` objelerinden oluşur:
  - `saat` — **ekranda görünen** serbest metin (`"~13:00"`, `"En geç 10:00"`,
    `"09:00 – 10:00 arası"`). Sayaç için içindeki **ilk HH:MM** ayrıştırılır, yani
    yaklaşıklık işaretleri olduğu gibi kalabilir.
  - `dilim` — saati olmayan maddeler için `"sabah"` / `"ogle"` / `"aksam"`. Bugün
    ekranı programı bu üç dilime böler. (Eskiden bunu metne bakan bir regex tahmin
    ediyordu ve "yemek" geçen her satırı akşama atıyordu.)
  - `yer` — **mevcut** bir koordinat kaydına referans: `"ev:ohrid"`, `"otogar:Üsküp"`,
    `"hastane:Dıraç"`, `"havalimani:TIA"`, `"sehir:Ohrid"`. Satırda "yol tarifi"
    bağlantısı çıkar. **Buraya ham koordinat yazma** — koordinat tek yerde durur,
    burada yalnızca ona işaret edilir. Karşılığı yoksa satır sessizce bağlantısız
    basılır; `?kontrol=1` bunu 9. grupta yakalar.
  - Bir maddenin **saati yoksa** "Sıradaki adım" sayacına hiç girmez — uydurma saate
    geri saymamak için bilinçli.
  - ⚠ Açılış saati ile etkinlik saatini karıştırma: 17 Ağustos'ta müzenin 09:00 – 16:00
    açık olması `saat` alanına yazılmaz, yoksa sayaç sabah 09:00'ı "müzeye git" sanır.
- **Takvim dosyası artık programdan üretiliyor.** `.ics` eskiden elle seçilmiş 11
  etkinlikti; şimdi 29. Her saatli program maddesi bir `VEVENT` olur. Üç alan yönetir:
  - `hatirlatma: "sert"` → **60 dk + 15 dk** önce iki alarm (otobüs kalkışı gibi
    kaçırılamaz anlar). `"orta"` → **30 dk** önce tek alarm. Alan yoksa **alarm yok**,
    madde takvimde yalnızca görünür. Otuz etkinliğin hepsi çalarsa telefon düşman olur.
  - `takvimDisi: "<etkinlik-kimliği>"` → madde `.ics`'e **girmez**, çünkü onu zaten
    başka bir etkinlik kapsıyor (uçuşlar, eve giriş/çıkış, havalimanına hareket).
    Değer o etkinliğin kimliğidir, yani neyin kapsadığı veride yazılı.
  - `tz: "+03:00"` → maddenin saati Türkiye saatiyle yazılmışsa. Verilmezse **+02:00**
    varsayılır. `.ics` mutlak an (UTC + `Z`) yazdığı için bu şart.
  - ⚠ **Yaklaşıklık bozulmaz:** başlıkta "~15:30" ve "En geç 10:00" olduğu gibi kalır.
    Ohrid → Dıraç otobüsü bu yüzden hâlâ saatsiz "yol günü" etkinliği — bilet alınmadığı
    için "~09:00" bir hedef, veri değil (Kural 3).
  - Ayrıca her sabah **08:00'de "Bugünün programı"** etkinliği: özet + kaçırılamaz kısıt +
    o günün saatli maddeleri, alarmı etkinliğin kendi anında. 20 Ağustos'ta yok (o sabah
    evde uyanılıyor). Ofset **güne** bağlı: 12 Ağustos sabahı +03:00, sonrası +02:00.
- **Site açıkken hatırlatma (isteğe bağlı).** Hazırlık bölümündeki 🔔 düğmesi. Takvimin
  **yerine geçmez, üstüne biner**: telefon cepteyken çalan tek şey telefonun kendi takvim
  alarmıdır. Bu, site önündeyken `hatirlatma` alanı olan bir maddeye 10 dakika kala bir
  kez bildirir. Hiçbir şey **zamanlanmaz** — zaten 30 saniyede bir dönen
  `akisDurumTazele` içinden, o an sayfa yaşıyorsa gönderilir (iOS arka planda service
  worker'ı öldürdüğü için zamanlanmış bildirim güvenilmez; `.ics` bu yüzden var).
  İzin **kullanıcı dokunuşundan** istenir. İşaretler `balkan2026.bildirim`, madde başına
  en fazla bir kez.
- **O gün yapılacaklar:** `gunler[].yapilacaklar` → `{ id, metin }`. Gün kartında tik
  kutulu liste, Bugün ekranında **yalnızca işaretlenmemişler** özetlenir (tamamı bitince
  "✓ Bugünün işleri bitti" yazar). Tik yalnızca gün kartında atılır — aynı şeyin iki yerde
  işaretlenmesi hangisinin doğru olduğunu belirsizleştirirdi. Anahtar `tarihISO::id`;
  **`id` değiştirmek o maddenin işaretini sıfırlar.** 18 ve 20 Ağustos'ta liste bilerek
  yok: biri dinlenme günü, diğerinde evde uyanılıyor.
- **"Nelere dikkat etmeli" akordeon:** 15 kart artık açık değil, Cepte'nin kalıbıyla
  katlanır — başlıklar alt alta, aynı anda tek kart açık. **Seviye rozeti kapalıyken de
  görünür**, listenin asıl tarama değeri o. Ölçüldü: bölüm 360 px'de 1329 px'e,
  masaüstünde 916 px'e indi. Yazdırmada hepsi açılır.
- **Akış tikleri:** her madde işaretlenebilir, kayıt `balkan2026.akis`,
  anahtar `YYYY-MM-DD::sıraNo`. Anahtar **metin değil sıra** olduğu için metni
  düzeltmek tiki kaybettirmez; buna karşılık bir maddenin **yerini değiştirmek**
  tiki yanlış maddeye bindirir.
- **"Şu an / Sıradaki":** Bugün ekranındaki geri sayım kutusu dakikada iki kez
  tazelenir. "Şu anki madde", saati geçmiş maddeler arasında **saati en büyük**
  olandır — yazım sırası kronolojik olmak zorunda değil (13 Ağustos'ta "en geç 10:00
  çıkış" 09:00 otobüsünden önce yazılı). Sıradakiye 30 dakikadan az kalınca kutu
  sarıya döner.
- **Site içi arama:** üst çubuktaki 🔍 (ya da Ctrl/Cmd+K). `TUR` objesinde arar,
  Türkçe aksan ve büyük/küçük farkını yok sayar; sonuca dokununca gün kartını ya da
  Cepte sekmesini açıp oraya kaydırır. Grup adı da aranabilir alandır — "otogar"
  yazan kişi kaydın metni Kiril alfabesinde olsa da onu bulsun diye. Var olma
  sebebi: tarayıcının Ctrl+F'i **kapalı akordeonun içini bulamıyor**.
- **Çift saat:** çubuktaki büyük rakam cihazın saati, altındaki satır Türkiye saati.
  Türkiye saati cihazdan değil **UTC'den** hesaplanır (Türkiye yıl boyu UTC+3), yani
  cihazın dilimi yanlış olsa bile alt satır doğru kalır. İkisi eşitken "TR ile aynı"
  yazar — Balkanlar'da bu bir **uyarıdır**, saat dilimi güncellenmemiş demektir.
- **Veri kilidi (harita 📶/📵):** açıkken harita **ağa hiç çıkmaz**, karoyu yalnızca
  Cache Storage'daki indirilmiş paketten okur; olmayan yer boş kalır. Tercih
  `balkan2026.karokilit` altında saklanır. ⚠ Gezinirken görülen karolar cache'e
  **girmez** (Leaflet `<img>` isteği opak yanıt döndürüyor, service worker'ın
  `yanit.ok` kontrolünden geçmiyor) — kilidin gösterdiği tek kaynak "Haritayı
  çevrimdışına al" ile inen 390 karodur.
- **Fotoğrafları çevrimdışına al:** Hazırlık bölümündeki 🖼 kutusu 32 galeri ve lezzet
  fotoğrafını `balkan-gorsel` önbelleğine indirir. Var olma sebebi: service worker'ın
  "cache önce, arka planda tazele" stratejisi bir görseli ancak **bir kez görüldükten
  sonra** saklıyor — yolda hiç açılmamış bir şehir kartı boş yer tutucularla çıkıyordu.
  ⚠ Cache adı `sw.js`'teki `GORSEL_CACHE` ile ortaktır.
- **⚠ Karo önbelleğindeki eski boşluk kapatıldı (v19):** `sw.js` içindeki `karoCache`
  yalnızca `yanit.ok` olan yanıtları saklıyordu. Leaflet karoları `<img src>` ile isteniyor,
  yani istek **no-cors**; dönen yanıt **opak** ve opak yanıtta status 0'dır, `ok` false gelir.
  Sonuç: haritada gezerken görülen **hiçbir karo önbelleğe yazılmıyordu**. Artık opak yanıt
  da kabul ediliyor — evde bakılan her bölge yolda da açılıyor. Veri kilidi de buna göre
  değişti: cache'te kayıt varsa karoya doğrudan **adres** veriliyor (service worker onu
  cache'ten servis eder, ağa çıkılmaz), çünkü opak yanıttan okunan blob'un boyutu 0'dır.
- **Yakınımdakiler:** 📍 Konumum açıkken rozetin altında en yakın ev / otogar /
  hastane mesafesiyle listelenir, her satır Maps'e gider. Yeni veri eklenmedi,
  aynı GPS sabitlemesinden hesaplanıyor.
- **Ekranı uyanık tutma (Wake Lock):** Günün Kartı ve tam ekran harita açıkken
  ekran sönmez. Desteklemeyen tarayıcıda sessizce hiçbir şey yapmaz.
- **Dar telefonda üst çubuk:** 430 px altında tema düğmesinin adı ve 🖨 düğmesi
  düşer. Ölçüldü: altı öğe 360 px'e sığmıyor ve sıkışan hep bölüm adı oluyordu.
  Yazdırma yolda en az kullanılan düğme; `?yazdir=acil` kendi bağlantısıyla Cepte
  bölümünün girişinde duruyor.
- **Geri sayım üç durumlu:** `meta.kalkisISO` ve `meta.donusISO` alanlarına bağlı.
  Kalkıştan önce "Yola çıkmaya kalan", 12-19 Ağustos arasında "Dönüşe kalan" + "Turun N. günü / 8",
  dönüş uçuşundan sonra "Tur tamamlandı". Uçuş saatleri değişirse bu iki alanı güncelle.
- **Bugünü vurgulama:** her günün `tarihISO` alanı sistem tarihiyle karşılaştırılır.
  Tarih aralık içindeyse o gün kartı vurgulanır ve otomatik açılır.
- **Görseller:** `kapak` ve `galeri` alanlarında `{ gorsel, alt, kaynak }` şeklinde durur.
  Kaynak olarak Wikimedia Commons'ın `upload.wikimedia.org/.../960px-...` thumb URL'leri
  kullanılıyor — Wikimedia **dosya başına** belirli genişliklere izin veriyor ve bu liste
  zamanla daralıyor: 640 px bir zamanlar çalışıyordu, artık `400` döndürüyor. **Yeni görsel eklerken URL'i ezberden yazma:** Commons'ta ara,
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
  mevcutların listesi `PLAN.md` bölüm 8'de. Konaklamalar ayrı ikonla (kum rengi 🏠 kare pin)
  çizilir ve `cepte.konaklamalar[].konum` alanından okunur; şehir pinleri turkuaz damla,
  havalimanları lacivert dairedir — yeni bir işaretçi türü eklerken bu üçünden ayrış.
  Bu gece kalınan ev kırmızı halkalı basılır (`.ev-pin.bugun`).
  **Odak şeridi kendiliğinden kurulur:** yeni bir şehir `haritaSira` alırsa şeride de çipi
  gelir; o şehirde `cepte.konaklamalar` kaydı varsa çip merkeze değil eve gider.
- **Leaflet sürümü değişirse** SRI hash'i de değişmeli: dosyayı indirip SHA-384'ünü
  hesapla, base64'e çevir, `integrity` değerini güncelle. Hash tutmazsa tarayıcı
  script'i çalıştırmaz ve harita sessizce yedek kutuya düşer.
- **Lezzetler:** `sehirler[].lezzetler` dizisine `{ ad, yerel, aciklama, ipucu, gorsel?, kaynak? }`
  ekle. `gorsel` yoksa madde 🍽 ikonuyla gösterilir — uydurma URL yazmaktansa boş bırak.
  **Şu an hepsi görselsiz:** eski dokuz URL'in kaynak dosyaları Commons'ta yoktu (`404`),
  4 Ağustos 2026'da kaldırıldı. Ayrıntı: `docs/img/KAYNAKLAR.md`.
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
- **Konaklamalar:** `cepte.konaklamalar` her ev için tek kayıt. Zorunlu gibi davranan alanlar:
  `id` (gizli kod kimliğinin kökü — **değiştirmek kayıtlı kodları erişilemez yapar**),
  `geceler` (`YYYY-MM-DD` dizisi; Bugün ekranı ve harita popup'ı bunu okur, `TUR.gunler` ile
  birebir tutarlı olmalı), `konum` (`[enlem, boylam]` — Maps bağlantısı **koordinattan**
  üretilir, adresten değil; adres yazımı yanlış yere düşebiliyor).
  `adresYerel` verilirse büyük punto satır o olur ve latin adres altına düşer; yoksa `adres`
  büyük basılır. `tarif` isteğe bağlı sözlü tarif satırıdır (Dıraç'ta kullanıldı).
  `telefonlar` dizisindeki değeri "belirlenecek" olan kayıt `tel:` bağlantısı almaz;
  numara girilince kendiliğinden aranabilir olur. `uyari` doldurulursa kartta sarı kutu çıkar.
  `mesafeler` tek satırda `·` ile birleştirilir, `not` tek satırlık dipnottur.
  **Puan, olanak listesi, ev sahibi kıdemi gibi rezervasyon anına ait bilgiler siteye
  konmaz** — kart kalabalıklaşınca asıl iş (adres, saat, kod) görünmez oluyor. O ayrıntılar
  `PLAN.md` bölüm 2'de tutulur.
- **🔒 Kapı kodu / kutu şifresi / wifi şifresi ASLA kaynak koda yazılmaz** — depo herkese açık.
  Bunlar `cepte.konaklamalar[].gizliAlanlar` ile yalnızca *alan tanımı* olarak durur
  (`{ ad, etiket, bos }`); değerler kullanıcı girdiğinde `localStorage`'a
  (`balkan2026.gizli`, kimlik `evId::alan`) yazılır. Yedek dosyası bu kodları **içerir**;
  birleştirmede mevcut değer korunur (`YEDEK_ALANLAR` dördüncü öğesi `{ birlestir:false }`).
  Yazdırmada kodlar basılır (kâğıt yedeği kapıda işe yarasın diye), silme düğmesi basılmaz.
- **Günün kaçırılamaz kısıtı:** `gunler[].uyari` (+ isteğe bağlı `uyariIkon`) doldurulursa gün
  kartının en üstünde riskten daha sert bir kutu çıkar ve Bugün ekranında da görünür.
  Ohrid'in 19:00 anahtar kutusu ve 19 Ağustos'un konaklamasız gecesi böyle işlendi.
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
  | `balkan2026.akis` | Gün programı maddelerinin tikleri (`YYYY-MM-DD::sıraNo`) |
  | `balkan2026.sabah` | "Çıkmadan önce" listesi — gün dönünce sıfırlanır, yedeğe girmez |
  | `balkan2026.karokilit` | Haritanın veri kilidi açık mı |
  | `balkan2026.bildirimAcik` | "Site açıkken hatırlat" açık mı |
  | `balkan2026.bildirim` | Hangi maddeye bildirim gönderildi (tekrar etmesin diye) |
  | `balkan2026.yapilacaklar` | O gün yapılacaklar tikleri (`YYYY-MM-DD::id`) |
  | `balkan2026.gizli` | Kapı kodu / kilitli kutu şifresi / wifi şifresi (kimlik: `evId::alan`) |

  Bunlar cihaza özeldir; telefonda işaretlenen bir şey bilgisayarda görünmez —
  taşımak için aşağıdaki yedekleme kutusu var.
- **Yedekleme / taşıma:** Hazırlık bölümünün altındaki kutu işaretleri, kalpleri, anı notlarını, akış tiklerini ve kayıtlı kodları tek bir
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
- **Acil çıktı kâğıdı:** `?yazdir=acil` (Cepte bölümünün girişinde bağlantısı var). Bütün
  siteyi değil **tek bir A4** basar: üç adres (yerel alfabede büyük punto) + kapı kodu ve
  wifi, iki uçuş (sefer · PNR · saat), 112 + üç büyükelçilik + sigorta hattı, sağlık kartı,
  buluşma noktaları ve dört acil cümle. Bu modda sayfanın geri kalanı hiç kurulmaz.
  Cihazda kayıtlı olmayan alanlar "belirlenecek" diye değil **elle doldurulacak çizgi**
  olarak basılır. Punto tek sayfaya sığacak şekilde otomatik seçilir (13,5 → 8 pt);
  sığmazsa en az öncelikli blok, acil cümleler, düşer. Kâğıt token kullanmaz, doğrudan
  siyah-beyaz yazar — iki tema da birebir aynı çıktıyı verir.
- **Kartın PNG'si:** Günün Kartı'nın üst çubuğundaki **"⬇ Görsel"** düğmesi kartı
  1080 × 1920 PNG olarak indirir (`balkan-2026-08-15.png`). Canvas'a **elle** çizilir,
  harici kütüphane yoktur; metinler `measureText` ile kutuya sığdırılır, sığmayan tek
  kelime harf harf kırılır. Amacı kartı tarayıcıdan bağımsız kılmak: galeriye iner,
  kilit ekranına konur, çevrimdışı açılır. **Renkleri temaya bağlı değildir** (koyu zemin +
  açık yazı, her iki temada aynı) — gerekçesi `progress.md` bölüm 5'teki istisna tablosunda.
  ⚠ Kart HTML'i değişince bu fonksiyon **kendiliğinden değişmez**, elle güncellenmeli
  (`gunKartiPNG`).
- **Veri tutarlılık denetimi:** `?kontrol=1`. `TUR` objesini gezip dokuz grupta rapor
  basar: gün dizisi (`tarihISO` biçim · aralık · boşluksuz sıra), koordinatlar (hepsi
  Balkan kutusunda mı), kimlik tekrarları, `GUN_BACAK` ↔ `ulasim[].bacak`, hava
  eşlemesi, "belirlenecek / kontrol edilecek / alınacak" geçen bütün alanlar, kapak ve
  galeri görselleri, şehir ↔ harita (sıra, gün çapası, ev/otogar/hastane merkeze uzaklık),
  program maddeleri (`saat` ayrıştırılabiliyor mu · `dilim` geçerli mi · `yer` bir kayda
  çözülüyor mu · `hatirlatma` / `tz` / `takvimDisi` geçerli mi).
  ❌ hata · ⚠️ bakılmalı · ✅ tamam; her satırda alanın tam yolu yazar. Normal render'a
  dokunmaz, hiçbir şeyi değiştirmez — veriye dokunduktan sonra bir kez çalıştır.
- **Kontrol listesi:** işaretler tarayıcının `localStorage`'ında `balkan2026.hazirlik`
  anahtarıyla saklanır. Liste 10/10 olunca konfeti ve kutlama kutusu çıkar — yalnızca
  tamamlanma anında, her açılışta değil. Yeni madde eklerken `id` alanının benzersiz olmasına dikkat et;
  mevcut bir `id`'yi değiştirmek o maddenin kaydını sıfırlar.
- **Rehber notu etiketleri:** `notlar` dizisindeki `tip` alanı "En iyi saat", "Dikkat" veya
  "İpucu" olabilir. "Dikkat" ve "İpucu" ayrı renkle gösterilir.
- **`index.html` değişince `sw.js` içindeki `CACHE_VERSION` artırılır** — yoksa siteyi ana
  ekrana eklemiş cihazlar eski sürümü görmeye devam eder. Eski cache'ler `activate` içinde
  `BIZIM_CACHELER` dışındaki her adı silerek temizlenir.
- **Tasarım:** renk, boşluk, radius ve gölge değerleri CSS'te `:root` altındaki
  token'larda tanımlıdır. Tema değişikliği için oradan başla.

---

## Çalışma kuralı

Her değişiklikte, ne kadar küçük olursa olsun:

1. Değişikliği yap.
2. **`PLAN.md`**'yi güncelle: plan bölümleri `TUR` objesiyle birebir tutarlı kalsın,
   "Yapılanlar" bölümüne tarihli madde ekle, "Bekleyenler" listesini tazele.
3. **`progress.md`**'yi tazele: etkilenen durum satırları ve "Sırada ne var" listesi.
4. Açıklayıcı bir Türkçe commit mesajıyla commit'le.
5. **`git push` yap — push'lanmadan görev bitmez.** Kod değişip push edilmediyse iş
   yarım sayılır; push başarısız olursa sebebi çözülür, görev "bitti" diye kapatılmaz.

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
izleyebilirsin. Dört cache olur:

| Cache | Sürümlü mü | İçerik |
|---|---|---|
| `balkan-v18-shell` | evet | `index.html`, manifest, ikon, şehir kapakları, Leaflet |
| `balkan-v18-hava` | evet | Son başarılı Open-Meteo yanıtı |
| `balkan-gorsel` | **hayır** | Wikimedia galeri ve lezzet görselleri (32 tanesi "Fotoğrafları çevrimdışına al" ile önden inebilir) |
| `balkan-karo` | **hayır** | İndirilen OpenStreetMap harita karoları |

Son ikisi bilerek sürümsüzdür: sürüme bağlansalardı her `index.html` güncellemesinde
`activate` onları silerdi ve kullanıcı evde indirdiği haritayı yolda kaybederdi.

### Telefona ekleme

- **Android / Chrome:** menü → "Ana ekrana ekle"
- **iOS / Safari:** paylaş → "Ana Ekrana Ekle"

### Service worker güncellemesi

`index.html`, CSS ya da JS değiştirdiğinde tarayıcı yeni service worker'ı arka planda kurar
ve sayfada **"✨ Yeni sürüm hazır / Yenile"** çubuğu çıkar. Yenile'ye basmak yeni sürümü
devralır.

Önbelleklenen dosya listesi değiştiyse (`sw.js` içindeki `APP_SHELL`) ya da eski önbelleğin
tamamen atılması gerekiyorsa **`CACHE_VERSION` sabitini artır** (`balkan-v17` → `balkan-v18`).
Eski cache'ler `activate` sırasında otomatik silinir — `balkan-gorsel` ve `balkan-karo` hariç,
onlar `BIZIM_CACHELER` içinde ve sürümden bağımsız durur.

⚠ `balkan-karo` adı `index.html` ile `sw.js` arasında **ortaktır**. Birinde değiştirirsen
diğerinde de değiştir; yoksa indirilen karolar okunamaz hâle gelir.

Takılırsan: DevTools → Application → Service Workers → *Unregister*, sonra sert yenileme.

### Çevrimdışı neler çalışır

| Çalışır | Çalışmaz |
|---|---|
| Tüm program, Cepte, günün kartı, gün kartları, kontrol listesi | İndirilmemiş **ve** hiç görülmemiş galeri / lezzet görselleri |
| 5 şehir kapak görseli (yerelden servis ediliyor) | Yeni hava durumu verisi (son kayıtlı veri gösterilir) |
| **Harita — "Çevrimdışına al" ile indirildiyse tam** | İndirilmemişse, daha önce hiç açılmamış bölgeler |

Gelmeyen görsellerin yerine degrade renkli yer tutucu + mekân adı çıkar; sayfa bozulmaz.

### Haritayı yolda kullanmak

| Ne | Nasıl |
|---|---|
| **Odak şeridi** | Haritanın üstündeki çipler. Bir şehre dokun → o şehrin evinin kapısına gider (z16); evi yoksa merkeze (z14). Atlamalar ani: hem hızlı hem karo tüketmiyor |
| **Açılış** | Tur sürerken harita bugünün evinde açılır, o pin kırmızıdır. Tur dışında tüm rota görünür ve "Bugün" çipi çıkmaz |
| **📍 Konumum** | Nabızlı mavi nokta + doğruluk çemberi, altta **"Bu geceki ev: 420 m · ±12 m"**. GPS internetsiz çalışır — uçak modunda bile. Tekrar basınca kapanır |
| **⛶ Tam ekran** | Harita ekranı kaplar, Esc kapatır |
| **Ev popup'ı** | Adres yerel alfabede büyük punto + latin + kopyala + yol tarifi. Kapı/wifi kodları **popup'a konmaz** — onlar Cepte bölümünde ve günün kartında |

Zoom 18'e kadar açılır ama **z16'nın ötesinde karo indirilmez**: Leaflet z16'yı büyütür.
Bulanık görünür, konumlar doğrudur, veri harcamaz.

### Haritayı çevrimdışına almak

Harita bölümünün altındaki **"Haritayı çevrimdışına al"** düğmesi 236 karo (~4,7 MB) indirir:
rota geneli (z7–8), beş şehir merkezi (z12–14), üç evin sokağı (z15–16) ve iki havalimanı (z13).
**Evdeyken, wifi varken yapılmalı.** İndirme durdurulabilir, sonra "Eksikleri indir" ile
kaldığı yerden sürer; "İndirileni sil" cache'i boşaltır.

Kapsam kod içinde değil, `TUR.harita.cevrimdisi` altında veri olarak durur. Zoom eklemeden
önce toplam karo sayısını gözden geçir: OpenStreetMap'in karo sunucusu gönüllü bağışla dönüyor
ve toplu indirmeye açık değil, 250'nin altında kalınıyor. İstekler bilerek yavaş (2 eşzamanlı,
200 ms ara); reddedilen karolar için tek sıralı ikinci tur var.

Bilinen boşluk: z9–z11 kapsanmıyor, ülke ölçeğinden şehir ölçeğine geçerken kısa süre gri
görünebilir.

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
