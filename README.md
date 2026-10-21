# Ngingetken 2.0 — Portal Informasi dan Budaya Integritas

Pengembangan website Ngingetken KPPBC TMP C Pangkalpinang menjadi knowledge base, pengingat antarrekan, dan apresiasi. Inovasi dimulai sejak 2018.

## Arsitektur
- GitHub Pages hanya memuat materi informasi yang layak diakses publik. Situs tidak mempunyai login dan tidak menyimpan data pegawai.
- Microsoft Forms Kemenkeu hanya untuk pengisian **Form Induk NGINGETKEN** yang sudah ada.
- Halaman `aksi/` untuk menyusun contoh pengingat dan apresiasi, serta panduan pemilihan saluran tanpa formulir tambahan, akun, atau backend.
- Microsoft 365 organisasi menyimpan respons dengan hak akses pengelola yang berwenang.
- WISE Kemenkeu sebagai kanal pelaporan resmi dugaan pelanggaran.

## Form induk yang wajib dipertahankan
Form **NGINGETKEN** yang ada sejak awal tetap menjadi **core**. Isinya 12 butir: identitas/periode, delapan indikator dugaan pelanggaran (Ya/Tidak), dan satu pernyataan penolakan penerimaan terkait jabatan. **Jangan mengganti form ini dengan template monitoring generik**. Dokumentasi lengkap: [FORM_INDUK_NGINGETKEN.md](FORM_INDUK_NGINGETKEN.md).

## Form Induk dan Ruang Aksi tanpa tautan tambahan
1. **Form Induk NGINGETKEN tetap digunakan:** https://forms.office.com/r/J63YrAE20i. Pemilik Form perlu memeriksa izin dan periode yang sedang berlaku. Tenggat 7 April 2026 pada pengumuman periode Maret 2026 hanya informasi historis.
2. **Saling Ngingetken:** `aksi/#pengingat` menyediakan delapan topik komunikasi preventif dengan tiga gaya pesan; hasil dapat disalin, bukan dikirim otomatis.
3. **Apresiasi Rekan:** `aksi/#apresiasi` menyediakan delapan kategori keteladanan/perilaku positif dengan pilihan gaya dan contoh perilaku opsional; hasil dapat disalin, bukan disimpan.
4. **Panduan Bertindak:** `aksi/#panduan` membantu membedakan belajar, mengingatkan, konsultasi, dan melapor melalui kanal resmi.
5. Tidak diperlukan Microsoft Forms tambahan untuk ketiga fitur baru. **Konten atau bukti dugaan pelanggaran bukan untuk halaman publik**; gunakan WISE atau mekanisme pelaporan resmi berwenang.
6. Website GitHub Pages bersifat publik dan **tidak membatasi akses hanya kepada pegawai**. Semua konten sisi klien dapat dilihat publik; jangan gunakan aplikasi untuk memasukkan rahasia, data pribadi, identitas pelapor, atau laporan sensitif. Browser tidak mengirim ataupun menyimpan pesan pengguna secara otomatis.

## Modul SJT Best–Worst (latihan formatif)
- Halaman: [sjt/index.html](sjt/index.html); akses publik GitHub Pages melalui `/ngingetken/sjt/`.
- Bank **45 soal orisinal** dalam sembilan kompetensi (lima soal per kompetensi) di `sjt/bank.js`, disertai dua pilihan tiap soal: tindakan paling efektif dan paling tidak efektif.
- Skoring **draf**: 1 poin untuk kecocokan jawaban paling efektif, 1 poin untuk paling tidak efektif; maksimum 90. Umpan balik per soal dan per kompetensi tersedia setelah semua jawaban terisi.
- Seluruh pengisian, skoring dan unduhan hasil dikerjakan **di browser pengguna**, tanpa akun/NIP, tanpa pengiriman jawaban dan tanpa penyimpanan otomatis.
- **PENTING:** bank berikut kunci draf terbaca oleh publik dari kode JavaScript. Modul hanya untuk belajar mandiri, **BUKAN asesmen resmi, passing grade, penilaian integritas pegawai, maupun dasar promosi.** Untuk asesmen formal dibutuhkan kunci di server organisasi, penyelenggaraan terkendali, validasi asesor, analisis psikometrik, tata kelola data, dan otorisasi.
- Soal dan kunci belum disahkan oleh ahli jabatan/asesor. Basis metodologi: PermenPANRB 38/2017, panduan SJT OPM, serta contoh konteks etika kepabeanan. Tinjau keberlakuan peraturan sebelum pemanfaatan formal.
- **Form Induk NGINGETKEN tetap tidak berubah.**

## Struktur
- index.html = portal utama
- assets/css/site.css = tata letak responsif
- assets/js/site.js = daftar artikel awal dan pencarian
- assets/js/forms-config.js = tautan Form Induk saja, bukan token atau data
- aksi/index.html, aksi/style.css, aksi/app.js = ruang aksi tanpa Form tambahan
- SECURITY.md = isu migrasi, riwayat, dan tindak lanjut

## Konten
Materi awal hanya merupakan ringkasan edukatif yang memerlukan verifikasi oleh pengelola. Tidak boleh menggunakan isi pengaduan dan data pegawai sebagai materi.

## Bukti IDP
Bandingkan kondisi awal dengan prototipe website, dokumentasikan uji coba pegawai, masukan dan tindak lanjut, serta evaluasi Mentor Tetap.

## PENTING
GitHub Pages tidak memiliki pembatasan akun Kemenkeu. Meskipun memakai robots noindex, konten tetap dapat diakses publik. Rahasia dan informasi internal harus ditempatkan di sistem organisasi dengan autentikasi.
Data historis yang pernah dipublikasikan masih berpotensi tersedia pada histori Git. Lihat SECURITY.md.