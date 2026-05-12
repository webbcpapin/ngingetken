# Aplikasi Ngingetken MVP

MVP ini dibuat berdasarkan PRD Aplikasi Ngingetken: sistem internal untuk monitoring pengisian form integritas pegawai KPPBC TMP C Pangkalpinang.

## Fitur MVP+

- Landing page pegawai berisi periode aktif, deadline, dan link form.
- Dashboard admin berisi total pegawai, sudah mengisi, belum mengisi, dan persentase kepatuhan.
- Tabel monitoring dengan search, filter status, filter unit, badge status, export CSV.
- Template reminder manual yang dapat disalin.
- Manajemen data pegawai.
- Manajemen periode.
- Laporan print-friendly dan export CSV.
- Backend Google Apps Script untuk membaca/menulis Google Sheet.
- Tombol **Sinkronkan Form** untuk menarik data dari tab `Form Responses 1`.
- Fungsi `setupDatabase()` untuk membuat struktur sheet otomatis.

## Struktur Folder

```text
ngingetken-mvp/
├── index.html
├── dashboard.html
├── pegawai.html
├── periode.html
├── laporan.html
├── package.json
├── .env.example
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── config.js
│       └── api.js
├── apps-script/
│   └── Code.gs
└── docs/
    ├── google-sheet-schema.md
    └── simple-connection-guide.md
```

## Cara Menjalankan Frontend Lokal

1. Pastikan Node.js sudah terpasang.
2. Buka folder project.
3. Jalankan:

```bash
npm install
npm run dev
```

4. Buka URL lokal yang muncul di terminal.

Tanpa Node.js, file HTML juga bisa dibuka langsung di browser, tetapi beberapa browser membatasi fitur tertentu.

## Mode Dummy Data

Secara default aplikasi berjalan dengan dummy data jika URL Google Apps Script belum diisi di `assets/js/config.js`.

```javascript
window.NGINGETKEN_CONFIG = {
  API_URL: "https://script.google.com/macros/s/PASTE_DEPLOYMENT_ID/exec",
  ADMIN_TOKEN: "ganti-token-rahasia"
};
```

Selama masih berisi `PASTE_DEPLOYMENT_ID`, frontend otomatis memakai dummy data.

## Setup Google Sheet

1. Buat Google Sheet baru: `Database Ngingetken`.
2. Buat sheet/tab:
   - `pegawai`
   - `periode`
   - `responses`
   - `monitoring`
   - `log_activity`
3. Atau lebih mudah: jalankan fungsi `setupDatabase()` di Apps Script untuk membuat header otomatis.
4. Masukkan data pegawai dan periode aktif.
5. Salin ID Google Sheet dari URL.

## Setup Google Apps Script

1. Buka Google Sheet.
2. Klik `Extensions > Apps Script`.
3. Salin isi file `apps-script/Code.gs`.
4. Ganti:

```javascript
const SPREADSHEET_ID = 'PASTE_GOOGLE_SHEET_ID';
const ADMIN_TOKEN = 'ganti-token-rahasia';
```

5. Klik `Deploy > New deployment`.
6. Pilih type `Web app`.
7. Execute as: `Me`.
8. Who has access: sesuaikan kebutuhan internal.
9. Salin URL Web App.
10. Tempel URL ke `assets/js/config.js`.

## Deploy ke GitHub Pages

1. Buat repository GitHub.
2. Upload seluruh isi folder project.
3. Masuk ke `Settings > Pages`.
4. Pilih branch `main` dan root folder.
5. Simpan dan buka URL GitHub Pages.

## Alur Data Paling Simple

Rekomendasi termudah adalah memakai Google Forms yang responsnya masuk ke sheet yang sama.

```text
Pegawai membuka landing page
↓
Pegawai klik link Google Form
↓
Respons masuk otomatis ke tab Form Responses 1
↓
Admin klik Sinkronkan Form di dashboard
↓
Apps Script menyalin data ke sheet responses
↓
Apps Script mencocokkan responses dengan pegawai
↓
Dashboard menampilkan status sudah/belum mengisi
↓
Admin export laporan atau salin reminder
```

Baca panduan lengkap di `docs/simple-connection-guide.md`.

## Catatan Keamanan

MVP ini menggunakan token sederhana. Ini cukup untuk pembatasan awal, tetapi bukan autentikasi penuh. Untuk produksi yang lebih aman, gunakan Google Workspace OAuth, Microsoft Entra ID, atau backend dengan autentikasi role-based access control.

## Test Case Singkat

| ID | Fitur | Skenario | Expected Result |
|---|---|---|---|
| TC-001 | Landing | Buka index.html | Periode aktif dan tombol form muncul |
| TC-002 | Dashboard | Buka dashboard.html | Card statistik tampil |
| TC-003 | Filter | Filter Belum Mengisi | Tabel hanya menampilkan pegawai belum mengisi |
| TC-004 | Reminder | Klik Salin Reminder | Teks reminder masuk clipboard |
| TC-005 | Export | Klik Export CSV | File CSV terunduh |
| TC-006 | Pegawai | Tambah pegawai | Data pegawai tersimpan |
| TC-007 | Periode | Tambah periode aktif | Periode baru tampil |
| TC-008 | Laporan | Klik Print | Tampilan siap cetak |

## Pengembangan Lanjutan

- Integrasi Microsoft Graph untuk mengambil respons Microsoft Forms otomatis.
- Reminder otomatis email atau Microsoft Teams.
- Login internal berbasis Google Workspace atau Microsoft Entra ID.
- Grafik tren kepatuhan bulanan.
- Catatan tindak lanjut per pegawai/periode.
- AI summary laporan bulanan.

## Update v3: Form HTML Internal

Versi v3 menambahkan halaman `isi.html` sebagai alternatif pengganti Microsoft Forms.

Alur paling simple:

```text
Pegawai buka isi.html
Pegawai isi Nama, NIP, Email, Pernyataan, Catatan
Data dikirim ke Google Apps Script
Data masuk ke tab responses
Dashboard otomatis membaca status pengisian
```

Fungsi Apps Script baru:

```text
submitHtmlForm(response)
```

Endpoint yang dipakai frontend:

```text
?action=submitHtmlForm
```

Catatan keamanan:
- Halaman ini cocok untuk MVP dan data kepatuhan ringan.
- Jangan minta data sangat sensitif di form HTML publik.
- Untuk produksi, tambahkan autentikasi Google Workspace/Microsoft Entra ID atau setidaknya token internal.

Baca juga:

```text
docs/opsi-migrasi-microsoft-forms.md
```


---

# Update v4 - Opsi 1 Lebih Kompleks

Versi ini mengembangkan opsi **form HTML internal** sebagai sumber data utama.

## Halaman Baru

- `isi.html` - form HTML multi-step.
- `viewer.html` - ringkasan pimpinan.
- `tindak-lanjut.html` - board catatan tindak lanjut.
- `riwayat.html` - histori per pegawai.
- `audit.html` - audit log aktivitas.

## Backend Baru

File `apps-script/Code.gs` sudah diperbarui dengan:

- `submitHtmlForm()`
- `syncMonitoring()`
- `getDashboardData()`
- `getExecutiveSummary()`
- `createFollowUp()`
- `updateFollowUp()`
- `getEmployeeHistory()`
- `getAuditLogs()`
- `setupDatabase()` v4

## Cara Paling Cepat Menjalankan

1. Upload folder ini ke GitHub Pages.
2. Buat Google Sheet baru.
3. Buka Extensions > Apps Script.
4. Paste `apps-script/Code.gs`.
5. Isi `SPREADSHEET_ID` dan `ADMIN_TOKEN`.
6. Jalankan `setupDatabase()` sekali.
7. Deploy Apps Script sebagai Web App.
8. Paste URL Web App ke `assets/js/config.js`.
9. Arahkan pegawai ke `isi.html`.
10. Admin membuka `dashboard.html?token=TOKEN_ANDA`.

## Catatan

Aplikasi tetap bisa dibuka tanpa backend karena memiliki dummy data. Ini memudahkan testing UI sebelum Google Sheet disambungkan.

## Update v5 - Form Asli dan Histori

Versi v5 menyesuaikan halaman `isi.html` dengan format awal NGINGETKEN dari Microsoft Forms. Pertanyaan 4 sampai 11 sudah memakai pilihan `Ya`, `Tidak`, dan `Ragu-ragu`. Sistem juga menambahkan fitur `lookupEmployeeHistory`, sehingga saat pegawai mengetik nama, form dapat membaca master data pegawai dan histori pengisian sebelumnya untuk auto-fill NIP, email, unit, serta opsi memakai jawaban sebelumnya.

Endpoint tambahan Apps Script:

```text
?action=lookupEmployeeHistory
```

Payload:

```json
{
  "nama": "Nama Pegawai"
}
```
