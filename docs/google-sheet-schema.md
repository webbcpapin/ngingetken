# Struktur Google Sheet Database Ngingetken

Buat file Google Sheet bernama **Database Ngingetken**, lalu buat 5 sheet berikut.

## 1. pegawai
Header baris pertama:

```csv
pegawai_id,nip,nama,email,unit,jabatan,status_aktif,created_at,updated_at
```

## 2. periode
Header baris pertama:

```csv
periode_id,nama_periode,tanggal_mulai,tanggal_deadline,form_url,status,created_at
```

## 3. responses
Header baris pertama:

```csv
response_id,periode_id,pegawai_id,nip,nama,email,waktu_submit,sumber_form,status_validasi,created_at
```

## 4. monitoring
Header baris pertama:

```csv
monitoring_id,periode_id,pegawai_id,nama,nip,email,unit,jabatan,status_pengisian,waktu_submit,catatan_admin
```

## 5. log_activity
Header baris pertama:

```csv
log_id,user,aktivitas,waktu,detail
```

## Data dummy periode

```csv
PRD202604,April 2026,2026-04-25,2026-05-06,https://forms.office.com/r/J63YrAE20i,Aktif,2026-04-25
```

## Sheet Tambahan untuk Koneksi Form Otomatis

### Sheet: `Form Responses 1`

Sheet ini dibuat otomatis oleh Google Forms. Minimal kolom yang disarankan:

| Field | Keterangan |
|---|---|
| Timestamp | Waktu pengisian otomatis dari Google Forms |
| Nama | Nama pegawai |
| NIP | NIP pegawai |
| Email | Email pegawai |

Apps Script akan membaca sheet ini melalui action:

```text
importResponsesFromFormResponses
```

Kemudian data valid akan disalin ke sheet `responses` dan dicocokkan dengan sheet `pegawai`.
