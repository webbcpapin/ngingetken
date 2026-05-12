# Opsi Migrasi dari Microsoft Forms ke Dashboard Ngingetken

## Rekomendasi paling simple

Gunakan form HTML internal `isi.html` yang sudah ada di aplikasi ini. Data dikirim langsung ke Google Apps Script, masuk ke sheet `responses`, lalu dashboard membaca data tersebut.

Alur:

```text
Pegawai buka isi.html
↓
Pegawai isi Nama, NIP, Email, Pernyataan, Catatan
↓
Data masuk ke Google Apps Script
↓
Data tersimpan di Google Sheet tab responses
↓
syncMonitoring berjalan
↓
Dashboard berubah otomatis
```

Kelebihan:
- Tidak perlu ekspor Excel dari Microsoft Forms.
- Tidak perlu Power Automate.
- Tidak perlu Microsoft Graph API.
- Paling mudah divisualisasikan di dashboard.

Kekurangan:
- Harus memindahkan kebiasaan pegawai dari Forms Office ke halaman HTML baru.
- Untuk data sensitif, perlu login/token/internal network pada versi lanjutan.

## Opsi tetap memakai Microsoft Forms

Alur manual/semi manual:

```text
Microsoft Forms
↓
Open in Excel / Export Excel
↓
Copy ke Google Sheet tab Form Responses 1
↓
Klik Sinkronkan Form di dashboard
```

Kelebihan:
- Pegawai tidak perlu mengubah kebiasaan.
- Form Office tetap menjadi kanal utama.

Kekurangan:
- Masih ada pekerjaan admin untuk ekspor/copy data.
- Tidak real-time kecuali ditambah Power Automate/Microsoft Graph.

## Opsi otomatis Microsoft Forms

Gunakan Power Automate:

```text
Microsoft Forms: When a new response is submitted
↓
Get response details
↓
Add a row into Excel table / kirim HTTP request ke Apps Script
↓
Dashboard membaca data
```

Kelebihan:
- Pegawai tetap memakai Microsoft Forms.
- Data dapat otomatis masuk ke file Excel atau endpoint aplikasi.

Kekurangan:
- Butuh akses Power Automate dan izin tenant.
- Setup lebih teknis.
- Jika ingin kirim langsung ke Apps Script, perlu pengujian CORS/HTTP dan kebijakan keamanan kantor.

## Rekomendasi bertahap

1. Jangka pendek: pakai `isi.html` untuk periode uji coba.
2. Jangka pendek alternatif: tetap pakai Microsoft Forms, tetapi copy respons ke `Form Responses 1`.
3. Jangka menengah: buat Power Automate dari Microsoft Forms ke Excel/Google Sheet/API.
4. Jangka panjang: pakai Microsoft Entra ID/SSO + database yang lebih aman.
