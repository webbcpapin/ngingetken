# Data Dictionary v4

## pegawai
Menyimpan master pegawai aktif.

Kolom utama: `pegawai_id`, `nip`, `nama`, `email`, `unit`, `jabatan`, `status_aktif`.

## periode
Menyimpan periode NGINGETKEN.

Kolom utama: `periode_id`, `nama_periode`, `tanggal_mulai`, `tanggal_deadline`, `form_url`, `status`.

## responses
Menyimpan hasil isian form HTML.

Kolom utama: `response_id`, `periode_id`, `pegawai_id`, `nama`, `email`, `nip`, `answer_json`, `catatan`, `integrity_score`, `risk_level`.

## monitoring
Hasil olahan status pegawai per periode.

Kolom utama: `monitoring_id`, `periode_id`, `pegawai_id`, `status_pengisian`, `waktu_submit`, `integrity_score`, `risk_level`.

## follow_up
Catatan tindak lanjut admin.

Kolom utama: `followup_id`, `periode_id`, `pegawai_id`, `prioritas`, `status`, `catatan`.

## form_questions
Bank pertanyaan agar pertanyaan bisa dikelola dari Google Sheet.

Kolom utama: `question_id`, `pertanyaan`, `opsi`, `bobot`, `status_aktif`, `urutan`.

## log_activity
Mencatat aktivitas penting sistem.
