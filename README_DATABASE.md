# Ngingetken v4 - Database Awal (Data Nyata)

## Update
- Data dummy telah dihapus dan diganti dengan data nyata dari Excel.
- Data pegawai: 42 orang dari KPPBC TMP C Pangkalpinang.
- Histori pengisian: 241 respons dari Microsoft Forms (Jan 2026 - Mei 2026).

## Data yang Dimasukkan

### 1. Master Pegawai (42 orang)
Sumber: `Data Pegawai.xlsx`
- Achmad Helwi, Agung Hermawan, Ahmad Zulfikar, Andik Bintoro, dll.
- Unit: PENINDAKAN DAN PENYIDIKAN, KEPATUHAN INTERNAL DAN PENYULUHAN, UMUM, PERBEND, PKCDT, KEPALA KANTOR.

### 2. Histori Responses (241 pengisian)
Sumber: `NGINGETKEN(1-278).xlsx`
- Periode: Januari s.d. Mei 2026 (12 periode).
- Semua jawaban "Tidak" = skor 100, risiko Rendah.
- Pernyataan integritas tercatat.

### 3. Periode (12 periode)
- Januari 2026 s.d. Desember 2026.
- Periode aktif: **Mei 2026** (bisa diubah di `api.js`).

### 4. Monitoring Real-time
- Dashboard menampilkan kepatuhan aktual per Mei 2026.
- Total: 42 | Sudah: 8 | Belum: 34 | Kepatuhan: 19%.

## Struktur File
```
output/
├── index.html          # Landing page
├── dashboard.html      # Admin dashboard
├── isi.html            # Form pengisian
├── pegawai.html        # Master data pegawai
├── periode.html        # Manajemen periode
├── laporan.html        # Laporan & export
├── riwayat.html        # Riwayat per pegawai
├── tindak-lanjut.html  # Board tindak lanjut
├── viewer.html         # Ringkasan pimpinan
├── audit.html          # Audit log
├── assets/
│   ├── css/style.css   # Styling lengkap
│   └── js/
│       ├── config.js   # Konfigurasi API
│       └── api.js      # API mock + data nyata
└── ngingetken_data.json # Backup data JSON
```

## Cara Menjalankan
1. Buka folder ini di VS Code atau editor lain.
2. Jalankan live server (Go Live) atau `npx serve .`
3. Buka `index.html` untuk landing page.
4. Buka `dashboard.html` untuk admin view.
5. Buka `isi.html` untuk form pengisian.

## Catatan
- Aplikasi ini sekarang berjalan dalam **mode lokal/mock API**.
- Data tersimpan di `api.js` (embedded JSON).
- Untuk deploy ke GitHub Pages, upload seluruh folder `output/`.
- Untuk sambungkan ke Google Apps Script, ganti `API_URL` di `config.js`.

## Perubahan dari v4 Dummy
| Fitur | Sebelum | Sesudah |
|---|---|---|
| Data pegawai | 5 dummy | 42 nyata |
| Responses | 10 dummy | 241 nyata |
| Periode | 1 dummy | 12 nyata |
| Monitoring | Random | Real-time dari data Excel |
| Histori lookup | Dummy | Nyata, bisa auto-fill |
