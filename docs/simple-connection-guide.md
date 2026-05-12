# Panduan Koneksi Data Paling Simple

Panduan ini menjelaskan cara paling sederhana agar data pegawai yang mengisi form otomatis muncul di dashboard Aplikasi Ngingetken.

## Rekomendasi Utama: Google Forms + Google Sheet

Cara paling simple adalah menggunakan Google Forms karena responsnya bisa langsung masuk ke Google Sheet yang sama dengan database aplikasi.

Alurnya:

```text
Pegawai isi Google Form
↓
Respons masuk otomatis ke tab Form Responses 1
↓
Admin klik Sinkronkan Form di dashboard
↓
Apps Script menyalin respons valid ke tab responses
↓
Dashboard mencocokkan responses dengan data pegawai
↓
Status berubah menjadi Sudah Mengisi / Belum Mengisi
```

## Kenapa Ini Paling Simple?

1. Tidak perlu Microsoft Graph API.
2. Tidak perlu Power Automate.
3. Tidak perlu backend tambahan.
4. Tidak perlu database berbayar.
5. Cukup Google Form, Google Sheet, Apps Script, dan GitHub Pages.

## Struktur Sheet Minimal

Satu file Google Sheet berisi tab berikut:

```text
pegawai
periode
responses
monitoring
log_activity
Form Responses 1
```

Tab `Form Responses 1` dibuat otomatis ketika Google Form dihubungkan ke Google Sheet.

## Kolom Form yang Disarankan

Agar pencocokan data akurat, Google Form sebaiknya punya kolom:

```text
Nama
NIP
Email
```

Kolom yang paling aman untuk pencocokan adalah `Email` atau `NIP`.

## Langkah Setup Paling Cepat

### 1. Buat Google Sheet

Buat file bernama:

```text
Database Ngingetken
```

### 2. Buat Apps Script

Buka Google Sheet, lalu:

```text
Extensions > Apps Script
```

Tempel isi file:

```text
apps-script/Code.gs
```

Ganti bagian ini:

```javascript
const SPREADSHEET_ID = 'PASTE_GOOGLE_SHEET_ID';
const ADMIN_TOKEN = 'ganti-token-rahasia';
```

### 3. Jalankan setupDatabase

Di Apps Script, pilih fungsi:

```text
setupDatabase
```

Klik Run.

Fungsi ini akan membuat tab:

```text
pegawai
periode
responses
monitoring
log_activity
```

### 4. Hubungkan Google Form ke Sheet yang Sama

Di Google Form:

```text
Responses > Link to Sheets > Select existing spreadsheet
```

Pilih file:

```text
Database Ngingetken
```

Google akan membuat tab:

```text
Form Responses 1
```

### 5. Deploy Apps Script sebagai Web App

Di Apps Script:

```text
Deploy > New Deployment > Web app
```

Gunakan pengaturan:

```text
Execute as: Me
Who has access: Anyone with the link / sesuai kebijakan internal
```

Salin URL Web App.

### 6. Masukkan URL ke Frontend

Buka file:

```text
assets/js/config.js
```

Isi:

```javascript
window.NGINGETKEN_CONFIG = {
  API_URL: "URL_WEB_APP_APPS_SCRIPT",
  ADMIN_TOKEN: "ganti-token-rahasia"
};
```

### 7. Gunakan Dashboard

Buka:

```text
dashboard.html?token=ganti-token-rahasia
```

Klik:

```text
Sinkronkan Form
```

Setelah itu dashboard akan menghitung:

```text
Total Pegawai
Sudah Mengisi
Belum Mengisi
Persentase Kepatuhan
```

## Jika Tetap Menggunakan Microsoft Forms

Cara paling simple tetap bisa, tetapi semi-manual:

```text
Microsoft Forms
↓
Export Excel
↓
Copy/paste data ke tab responses atau Form Responses 1
↓
Klik Sinkronkan Form / refresh dashboard
```

Kalau ingin benar-benar otomatis dari Microsoft Forms, pengembangan berikutnya perlu salah satu dari ini:

1. Power Automate mengirim data ke Google Sheet atau Apps Script.
2. Microsoft Graph API membaca respons Microsoft Forms/Excel.
3. Form dipindahkan ke Google Forms untuk MVP awal.

Untuk MVP cepat, pilihan nomor 3 paling praktis.
