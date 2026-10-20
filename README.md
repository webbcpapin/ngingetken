# Ngingetken 2.0 — Portal Informasi dan Budaya Integritas

Pengembangan website Ngingetken KPPBC TMP C Pangkalpinang menjadi knowledge base, pengingat antarrekan, dan apresiasi. Inovasi dimulai sejak 2018.

## Arsitektur
- GitHub Pages hanya memuat materi informasi yang layak diakses publik. Situs tidak mempunyai login dan tidak menyimpan data pegawai.
- Microsoft Forms Kemenkeu untuk pengisian monitoring, pengingat, apresiasi dan usulan materi.
- Microsoft 365 organisasi menyimpan respons dengan hak akses pengelola yang berwenang.
- WISE Kemenkeu sebagai kanal pelaporan resmi dugaan pelanggaran.

## Hubungkan Microsoft Forms
1. Buat empat formulir internal melalui akun Microsoft 365 Kemenkeu yang berwenang.
2. Sesuaikan siapa yang dapat merespons, rekam identitas hanya jika diperlukan, dan batasi akses Excel respons.
3. Ubah empat nilai URL pada assets/js/forms-config.js setelah tautannya diverifikasi.
4. Website otomatis akan membuka formulir jika tautan terpasang. Jika kosong, tombol menunjukkan status belum aktif.

Tautan lama dari nota dinas 2025 sengaja belum diaktifkan karena perlu dipastikan masih digunakan pada periode berjalan.

## Struktur
- index.html = portal utama
- assets/css/site.css = tata letak responsif
- assets/js/site.js = daftar artikel awal dan pencarian
- assets/js/forms-config.js = tautan Forms saja, bukan token atau data
- SECURITY.md = isu migrasi, riwayat, dan tindak lanjut

## Konten
Materi awal hanya merupakan ringkasan edukatif yang memerlukan verifikasi oleh pengelola. Tidak boleh menggunakan isi pengaduan dan data pegawai sebagai materi.

## Bukti IDP
Bandingkan kondisi awal dengan prototipe website, dokumentasikan uji coba pegawai, masukan dan tindak lanjut, serta evaluasi Mentor Tetap.

## PENTING
GitHub Pages tidak memiliki pembatasan akun Kemenkeu. Meskipun memakai robots noindex, konten tetap dapat diakses publik. Rahasia dan informasi internal harus ditempatkan di sistem organisasi dengan autentikasi.
Data historis yang pernah dipublikasikan masih berpotensi tersedia pada histori Git. Lihat SECURITY.md.