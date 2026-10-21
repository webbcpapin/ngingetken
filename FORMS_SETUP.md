# Panduan Forms dan Ruang Aksi — Ngingetken 2.0

**Formulir induk NGINGETKEN asli tetap menjadi core aplikasi**; jangan diganti, disederhanakan, atau diubah tanpa persetujuan pemilik. Struktur 12 butir didokumentasikan dalam [FORM_INDUK_NGINGETKEN.md](FORM_INDUK_NGINGETKEN.md).

## Form induk yang aktif
- URL pengisian: **https://forms.office.com/r/J63YrAE20i**. Sudah dikonfigurasi di `assets/js/forms-config.js` sebagai `monitoring`.
- Form asli berisi tiga butir identitas/periode, delapan indikator indikasi pelanggaran (Ya/Tidak), dan satu pernyataan integritas.
- Tenggat pengisian tanggal 7 April 2026 adalah riwayat pengumuman periode Maret 2026; bukan tenggat yang boleh dipakai untuk periode selanjutnya.
- Pengelola harus memastikan tautan masih dapat menerima respons, pilihan periode tepat, serta pengaturan akses dan kerahasiaan memenuhi kebijakan organisasi.
- Jangan memakai URL halaman edit atau detail respons pegawai di situs publik.
- Jawaban "Ya" adalah informasi awal yang perlu penanganan sesuai kewenangan, bukan kesimpulan bahwa seseorang melanggar.

## Fitur pengingat dan apresiasi TANPA formulir tambahan
- `aksi/#pengingat`: memilih satu dari delapan topik, tiga gaya komunikasi, lalu menyalin teks pengingat.
- `aksi/#apresiasi`: memilih kategori apresiasi, gaya pesan, dan uraian perilaku baik opsional; menghasilkan teks untuk disalin.
- `aksi/#panduan`: pengambilan keputusan ringan untuk menentukan kapan membaca aturan, mengingatkan, konsultasi, atau melapor melalui WISE.
- Tidak ada basis data ataupun pengiriman otomatis ke Teams, WhatsApp, Forms, atau server. Pesan dirangkai dan ditampilkan di browser saja.
- Informasi kasus dugaan pelanggaran, identitas pelapor, bukti, dan data pribadi **jangan** diketik atau ditempel pada fitur ini. Saluran pelaporan resmi tetap WISE atau mekanisme organisasi berwenang.

## Prosedur evaluasi
1. Uji coba peramban desktop dan ponsel; periksa pilihan topik/gaya, salin pesan, dan navigasi.
2. Penelaah/editor memeriksa bahasa pesan agar tidak menuduh, memaksa, atau mengesankan hasil sebagai temuan investigatif.
3. Uji tombol Form Induk, termasuk hak akses dan periode, dengan persetujuan pemilik.
4. Catat umpan balik teragregasi dan perbaikan. Hindari mengumpulkan identitas pribadi atau jawaban form induk di repositori GitHub.
5. Lakukan review rujukan resmi dan prosedur internal sebelum mengumumkan materi edukasi sebagai pedoman.

Catatan: dokumentasi rancangan awal sempat mempertimbangkan tiga Microsoft Forms tambahan, tetapi kebutuhan tersebut telah **digantikan oleh alat bantu lokal di halaman Ruang Aksi**, tanpa perubahan terhadap Form Induk.
