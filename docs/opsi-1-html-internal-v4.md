# Opsi 1: Form HTML Internal + Google Sheet

Versi v4 menjadikan `isi.html` sebagai kanal utama pengisian NGINGETKEN.

## Alur Data

1. Pegawai membuka `isi.html`.
2. Pegawai mengisi identitas dan pernyataan integritas.
3. Frontend mengirim data ke Google Apps Script melalui action `submitHtmlForm`.
4. Apps Script mencocokkan pegawai berdasarkan email, NIP, atau nama.
5. Data masuk ke sheet `responses`.
6. Sistem menjalankan `syncMonitoring`.
7. Dashboard membaca sheet `monitoring` dan menampilkan status.

## Sheet Baru v4

- `follow_up`: catatan tindak lanjut admin.
- `form_questions`: bank pertanyaan form.
- `app_settings`: pengaturan aplikasi.
- `log_activity`: audit aktivitas.

## Peningkatan dari v3

- Form multi-step.
- Validasi duplikasi pengisian per periode.
- Risk level awal: Rendah, Sedang, Tinggi.
- Skor integritas awal berbasis jawaban.
- Dashboard per unit.
- Mode viewer pimpinan.
- Tindak lanjut/kanban sederhana.
- Riwayat per pegawai.
- Audit log.

## Catatan Keamanan

Form HTML sengaja dibuat publik/internal agar pegawai mudah mengisi. Halaman admin tetap sebaiknya memakai token pada URL, misalnya:

`dashboard.html?token=ganti-token-rahasia`

Untuk produksi serius, gunakan autentikasi Google Workspace atau Microsoft Entra ID.
