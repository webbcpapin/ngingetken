# NGINGETKEN — Portal Integritas dan Pengembangan Kompetensi

NGINGETKEN merupakan inovasi Bea Cukai Pangkalpinang yang dikembangkan sejak 2018. Portal GitHub Pages kini dirancang sebagai **satu pintu untuk enam layanan**, terdiri dari monitoring integritas, pengembangan kompetensi, latihan bahasa, pelayanan publik, dan pustaka referensi integritas.

**URL portal:** https://webbcpapin.github.io/ngingetken/

## Struktur enam kartu (22 Oktober 2026)

| Nomor | Nama kartu | Tujuan |
| --- | --- | --- |
| 01 | Monitoring Integritas | Microsoft Forms induk: https://forms.office.com/r/J63YrAE20i |
| 02 | Simulasi Kepemimpinan SJT | Latihan best–worst 45 soal di `sjt/` |
| 03 | Tryout Kompetensi Teknis | https://webbcpapin.github.io/simtalenta-djbc/ |
| 04 | Latihan IELTS & TOEFL | https://webbcpapin.github.io/englishday/ |
| 05 | Layanan Bea Cukai Pangkalpinang | FrontDesk di https://webbcpapin.github.io/FrontDesk/ |
| 06 | Pusat Pengetahuan Integritas | Katalog dan artikel edukasi di `pengetahuan/` |

**Menu Admin Internal:** https://kemenkeu.sharepoint.com/sites/BCPangkalpinang-NGINGETKENPROJECT/SitePages/Ngingetken%20Copy.aspx. Portal hanya mengarahkan ke SharePoint; hak akses Microsoft 365 ditentukan oleh Kemenkeu dan **tidak dikendalikan oleh GitHub Pages**. Belum dilakukan perubahan pada halaman SharePoint tersebut.

## Pusat Pengetahuan Integritas
- Katalog `pengetahuan/library.js` memuat tautan sumber pemerintah (PP, PMK, satu Perdirjen DJBC, serta regulasi lintas lembaga) dan 18 materi edukasi dari knowledge base versi sebelumnya.
- Daftar dokumen memiliki label **sumber resmi**, namun hal itu *bukan* pernyataan bahwa status hukum, perubahan, atau pencabutannya telah selesai dinilai. Periksa ulang metadata JDIH sebelum menjadikan regulasi sebagai dasar keputusan.
- Artikel edukasi **draf**, bukan teks hukum resmi; memerlukan review substansi oleh pengelola.
- Kategori **Surat Edaran** disediakan tetapi belum diisi karena belum ada naskah integritas yang dapat dipastikan untuk katalog. Jangan mengarang nomor dan judul SE.
- **Materi paparan internal** tetap diarahkan untuk inventarisasi dan tata kelola di SharePoint. Tidak boleh menyalin file terbatas, hasil pemeriksaan, identitas pegawai, atau informasi pelapor ke repository publik.

## Form induk tetap utuh
Form **NGINGETKEN** asli adalah core dan **tidak diganti**: tiga pertanyaan identitas/periode, delapan indikator indikasi pelanggaran (jawaban Ya/Tidak), serta pernyataan integritas. Lihat [FORM_INDUK_NGINGETKEN.md](FORM_INDUK_NGINGETKEN.md). Respons asli hanya ada pada Microsoft Forms organisasi, tidak disalin ke repo. Pemilik perlu memeriksa periode pengisian aktif dan izin akses.

## Simulasi SJT
Modul `sjt/` menyediakan latihan 45 soal Best–Worst dalam sembilan kompetensi ASN. Kunci dan skor `0–90` merupakan draf pembelajaran yang belum disahkan asesor; **bukan asesmen resmi dan bukan ukuran integritas individu**. Skoring dilakukan di browser, tanpa mengumpulkan nama atau NIP. Lihat dokumentasi instrumen pada folder `sjt/`.

## Arsitektur dan data
- `index.html`, `assets/css/portal.css`, `assets/js/portal.js` = halaman utama enam kartu, responsif dan ramah keyboard.
- `pengetahuan/index.html`, `pengetahuan/knowledge.css`, `pengetahuan/knowledge.js`, `pengetahuan/library.js` = pustaka sumber resmi dan materi edukasi, termasuk label status.
- `sjt/` = modul latihan mandiri, tetap tersedia.
- `aksi/` = fitur pengingat/apresiasi dari versi sebelumnya. Kodenya dipertahankan agar tautan lama tidak putus, namun tidak menjadi salah satu dari enam kartu utama.
- `assets/js/forms-config.js` = rujukan konfigurasi formulir induk.
- `SECURITY.md` = risiko historis dan tindak lanjut pengamanan.

**GitHub Pages bukan intranet.** Seluruh HTML, CSS, JavaScript, dokumen, dan kunci SJT yang berada di repository publik dapat dilihat tanpa login. Tautan Admin Internal tidak membuat portal menjadi privat dan bukan fitur administrasi data pada GitHub.

## Tata kelola pembaruan
1. Inventarisasi regulasi dan materi dari kanal resmi.
2. Verifikasi nomor, judul, tanggal, versi, status keberlakuan, dan relevansi oleh pengelola/penelaah.
3. Pisahkan bahan publik dari paparan/internal data yang memerlukan otorisasi.
4. Uji ulang tautan, pencarian, dan perangkat desktop/mobile sebelum publikasi.
5. Simpan eviden review dan perubahan untuk evaluasi inovasi serta IDP.

**Catatan:** Pengumuman Form Induk untuk periode Maret 2026 pernah mencantumkan batas 7 April 2026. Tanggal tersebut bersifat historis; tidak digunakan sebagai tenggat periode berjalan.
