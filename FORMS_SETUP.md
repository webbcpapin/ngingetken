# Panduan Membuat Microsoft Forms — Ngingetken 2.0

Formulir dibuat pada akun Microsoft 365 organisasi oleh pengelola yang berwenang. Website GitHub Pages hanya berisi tautan, tidak mengumpulkan respons. Selalu verifikasi ketentuan internal, kewenangan pengelola, dan penyimpanan data sebelum mengaktifkan formulir.

## A. Formulir Monitoring Integritas Bulanan

Judul: NGINGETKEN — Monitoring Integritas Pegawai [Bulan Tahun]
Deskripsi: Pengisian rutin untuk mendukung pencegahan, edukasi, dan kedisiplinan pengisian. Form ini bukan kanal investigasi atau penetapan pelanggaran.
Pengaturan: hanya pengguna organisasi/kelompok yang ditentukan dapat menjawab, rekam akun organisasi, satu respons per pengguna per periode bila sesuai ketentuan.

Pertanyaan awal yang direkomendasikan:
1. Unit kerja, pilihan dropdown jika diperlukan dan disetujui.
2. Konfirmasi telah mempelajari panduan integritas periode ini, Ya/Belum.
3. Konfirmasi pengisian sistem monitoring yang diwajibkan DJBC sesuai ketentuan berjalan, Ya/Belum/Tidak berlaku.
4. Apakah ada situasi terkait gratifikasi, pungutan liar, suap, benturan kepentingan, atau penyalahgunaan kewenangan yang memerlukan konsultasi lebih lanjut? Ya/Tidak/Ragu-ragu.
5. Jika jawaban 4 Ya atau Ragu-ragu, tampilkan penjelasan cara menggunakan kanal resmi. Jangan meminta nama terduga, detail kasus, identitas pelapor lain, atau bukti pelanggaran dalam form monitoring biasa.
6. Apakah ada praktik positif atau usulan perbaikan budaya integritas yang ingin dibagikan? Ya/Tidak. Jika Ya, arahkan ke form apresiasi/usulan materi.

Catatan: proposal Ngingetken lama memuat kategori negatif dan positif, serta nota dinas 2025 memuat tenggat 7 setiap bulan. Periksa apakah ketentuan tersebut masih dipakai sebelum diterapkan otomatis.

## B. Formulir Saling Ngingetken

Judul: NGINGETKEN — Sampaikan Pengingat yang Membangun
Deskripsi: Form preventif untuk membantu rekan memperbaiki kebiasaan kerja. Tidak digunakan untuk tuduhan korupsi, pelanggaran berat, kekerasan, atau informasi pribadi yang sensitif.
Pengaturan: hanya pegawai organisasi; identitas pengirim tercatat secara aman untuk mencegah penyalahgunaan; respons hanya untuk pengelola yang ditetapkan.

Pertanyaan:
1. Topik pengingat: disiplin waktu / komitmen tugas / ketelitian dan keamanan data / etika pelayanan / budaya kerja / lainnya.
2. Bentuk pesan: pesan pengingat umum kepada kelompok atau pengingat pribadi melalui pengelola.
3. Isi pesan singkat yang sopan, maksimal 500 karakter. Tanpa tuduhan, informasi rahasia, atau data pribadi sensitif.
4. Bila perlu diteruskan pribadi, penerima diidentifikasi melalui proses pengelola yang berwenang, tidak diumumkan pada dashboard umum.
5. Harapan perbaikan: pilihan sederhana dan realistis.
6. Persetujuan: saya memahami form ini bukan kanal pelaporan dugaan pelanggaran.

Alur: masuk ke pengelola -> periksa kelayakan pesan -> salurkan sesuai kebijakan -> catat status terkirim tanpa memublikasikan isi atau identitas.

## C. Formulir Apresiasi Rekan

Judul: NGINGETKEN — Apresiasi Perilaku Positif
Pengaturan: pegawai organisasi; identitas pengirim diverifikasi; data hanya diakses pengelola.
Pertanyaan:
1. Nama rekan yang diapresiasi.
2. Kategori: pelayanan prima / proaktif dan cepat tanggap / inovasi dan kreativitas / membantu rekan / kepatuhan dan keteladanan.
3. Perilaku konkret yang diamati, bukan kesimpulan karakter umum.
4. Tanggal/periode kejadian (opsional).
5. Apakah apresiasi boleh diteruskan kepada penerima? Ya/Tidak.
6. Publikasi nama dan deskripsi hanya setelah verifikasi serta persetujuan yang disyaratkan organisasi.

## D. Formulir Usulan Materi Knowledge Base

Judul: NGINGETKEN — Usulan Materi & Pertanyaan
Pengaturan: pengguna organisasi; akses rekap hanya untuk editor atau petugas yang ditunjuk.
Pertanyaan:
1. Topik: gratifikasi / benturan kepentingan / disiplin / pelayanan / etika digital / keamanan data / lainnya.
2. Pertanyaan atau situasi umum tanpa menyebut identitas atau kasus rahasia.
3. Sumber yang ingin ditambahkan, tautan resmi jika tersedia.
4. Usulan perbaikan informasi pada website.

## E. Empat tautan ke website

Setelah membuat dan menguji formulir, buka file assets/js/forms-config.js di GitHub dan isi hanya URL halaman respons Microsoft Forms yang sah.

monitoring: [URL Microsoft Forms bulanan yang aktif]
reminder: [URL Saling Ngingetken]
appreciation: [URL Apresiasi Rekan]
suggestion: [URL Usulan Materi]

Jangan memasukkan URL edit/kolaborasi formulir, URL Excel respons, token, atau tautan admin. Pengaturan izin form harus diuji dari akun pegawai yang berhak dan akun yang tidak berhak.

## F. Uji penerimaan

- Pegawai berhak berhasil mengakses dan mengisi form.
- Akun luar organisasi tidak boleh mengirim respons.
- Pengelola yang tidak berwenang tidak bisa membaca hasil.
- Hasil pengisian tidak terlihat di repository atau source website.
- Pesan berisi tuduhan atau identitas sensitif diarahkan ke kanal WISE/resmi.
- Setiap form memiliki teks tujuan, penanggung jawab, dan ketentuan pengolahan data yang disetujui.

## G. Bukti IDP

Catat tanggal penyusunan, izin pengelola, pengujian formulir, masukan rekan, hasil perbaikan, dan evaluasi Mentor Tetap. Pengembangan aplikasi tidak membuktikan perubahan perilaku tanpa uji dan tindak lanjut.