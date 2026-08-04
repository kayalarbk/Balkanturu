# Yerel görseller — kaynak ve lisans

Bu klasördeki görseller Wikimedia Commons'tan indirildi ve **çevrimdışı çalışması için**
siteyle birlikte servis ediliyor (service worker ön belleğe alıyor). Hotlink edilmiyorlar.

Her görsel Commons API'den bulundu, `curl -I` ile HTTP 200 doğrulandı ve indirildikten sonra
JPEG imzası (`FF D8`) kontrol edildi.

| Dosya | Konu | Fotoğrafçı | Lisans | Commons dosyası |
|---|---|---|---|---|
| `kapak-pristine.jpg` | Priştine şehir manzarası | GentiBehramaj | CC BY 4.0 | `Prishtina cityscape.jpg` |
| `kapak-uskup.jpg` | Üsküp Kalesi'nden Vardar panoraması | kallerna | CC BY-SA 4.0 | `Skopje view from Kale 3.jpg` |
| `kapak-ohrid.jpg` | Ohrid Gölü ve eski şehir | Edal Anton Lefterov | CC BY-SA 3.0 | `OhridLake-and-the-Old-town.jpg` |
| `kapak-dirac.jpg` | Dıraç şehri ve Adriyatik | Besara1 | CC BY-SA 4.0 | `City of Durrës.jpg` |
| `kapak-tiran.jpg` | Tiran Skenderbeg Meydanı | Andrew Milligan sumo | CC BY 2.0 | `Skanderbeg Square, Tirana (49593783026).jpg` |

## Lisans yükümlülükleri

- **CC BY 4.0 / CC BY 2.0** — eser sahibi belirtilerek serbestçe kullanılabilir.
- **CC BY-SA 4.0 / CC BY-SA 3.0** — eser sahibi belirtilmeli; türev çalışmalar aynı lisansla
  paylaşılmalı.

Fotoğrafçı adı ve lisans bilgisi sitede her görselin altında künye olarak görünüyor
(`TUR.sehirler[].kapak.kaynak` alanı). Görselleri kırpmadım, yeniden renklendirmedim —
Commons'ın 960 px thumbnail sürümleri olduğu gibi indirildi.

## Hâlâ hotlink edilenler

Şehir galerisi (**13 görsel**) hâlâ `upload.wikimedia.org` üzerinden yükleniyor. Çevrimdışıyken
bunlar gelmez; yerlerine degrade renkli yer tutucu + ad çıkar. Kapak görselleri yerelden
geldiği için sayfa çevrimdışıyken de görselli görünür.

## Kaldırılan lezzet görselleri (4 Ağustos 2026)

Dokuz lezzet görselinin URL'i **doğrulanmadan yazılmıştı**: 640 px'lik thumb adresleri `400`,
kaynak dosyalar ise `404` veriyordu — dosyalar Commons'ta hiç yok. Site aylarca yer tutucu
gösterip her kaydırmada 9 boşa istek attı. URL'ler ve künyeleri `TUR`'dan kaldırıldı;
lezzetler şimdi bilinçli 🍽 yer tutucusuyla görünüyor.

Yenisi eklenecekse: Commons'ta **ara**, `curl -I` ile 200 doğrula, `kaynak` alanına
fotoğrafçı + lisans yaz. Wikimedia artık dosya başına yalnızca belirli thumbnail
genişliklerine izin veriyor (bu dosyalarda 500 ve 1280 geçti; 320/512/640/800/1024 geçmedi) —
genişliği de ezberden yazma.
