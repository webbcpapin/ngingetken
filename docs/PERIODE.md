# Pengaturan Periode

Mode otomatis memakai zona waktu Asia/Jakarta (WIB). Periode pelaporan dibuka
tanggal 1 bulan berikutnya dan berlaku sampai akhir tanggal deadline yang
tersimpan di sheet `periode`. Default deadline adalah tanggal 6 bulan berikutnya.

Contoh: September 2026 dibuka 1 Oktober 2026 dan ditutup mulai 7 Oktober 2026.
Oktober 2026 dibuka 1 November 2026. Di antara jadwal tersebut tidak ada periode
yang menerima pengisian, kecuali admin membukanya secara manual.

- Admin memilih Otomatis atau Manual di halaman `periode.html`.
- Tombol Aktifkan atau Tutup otomatis memilih mode Manual. Mode ini bertahan
  sampai admin memilih Otomatis kembali, termasuk setelah pergantian tanggal.
- Mengaktifkan satu periode menutup periode aktif lainnya.
- Periode bulan sebelumnya dibuat otomatis bila belum tersedia, termasuk pada
  pergantian tahun. Periode yang sudah ada tidak digandakan.
- Deadline khusus yang sudah tersimpan tetap dihormati. Bila jadwal saling
  tumpang tindih, periode dengan tanggal pembukaan terbaru dipilih.
- Jadwal diperiksa sebelum API periode, dashboard, dan pengiriman formulir
  diproses. Form lama tidak bisa terkirim sebagai periode baru.
- `syncPeriodSchedule` memeriksa jadwal berkala walaupun tidak ada pengunjung.

## Deployment

1. Perbarui isi `Code.gs` dengan `apps-script/Code.gs` dari repositori ini.
2. Di menu Triggers, tambahkan satu pemicu untuk `syncPeriodSchedule`, deployment
   Head, sumber Time-driven, Hour timer, Every hour. Jangan buat pemicu tambahan
   jika fungsi ini sudah memiliki pemicu berkala.
3. Pilih Deploy > Manage deployments > Edit > New version > Deploy pada
   deployment yang dipakai aplikasi. URL endpoint tetap sama.
4. Periksa `?action=getPeriodManagement` untuk mode, tanggal WIB, dan status.

Tidak perlu menjalankan `resetDatabase` atau mengganti data pegawai/jawaban.
Status periode diperbarui tanpa menghapus sheet. Properti mode dan tanggal
sinkronisasi terakhir disimpan pada Script Properties proyek yang sama.

Pemicu Google tidak dijamin tepat pada detik pergantian hari. Pemeriksaan API
tetap menegakkan batas tanggal pada permintaan pertama setelah pergantian hari.
Referensi: https://developers.google.com/apps-script/guides/triggers/installable

## Verifikasi Lokal

Jalankan `node tests/periods.test.cjs`. Pengujian mencakup batas tanggal WIB,
deadline khusus, mode manual, pergantian tahun, periode ganda, token admin,
form kedaluwarsa, serta sintaks halaman admin.
