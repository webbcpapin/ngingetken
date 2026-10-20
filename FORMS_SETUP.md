# Panduan Microsoft Forms — Ngingetken 2.0

**Prinsip wajib:** Form induk **NGINGETKEN** yang sudah digunakan selama ini adalah **core aplikasi dan tetap dipertahankan tanpa diganti**. Lihat [FORM_INDUK_NGINGETKEN.md](FORM_INDUK_NGINGETKEN.md) untuk seluruh 12 butir asli (3 identitas/periode, 8 indikator, 1 pernyataan). Template monitoring generik yang sempat dirancang bukan pengganti form asli.

## A. FORM INDUK — Monitoring dan Informasi Dugaan Pelanggaran

- Pertahankan **Microsoft Forms NGINGETKEN yang sudah aktif** sebagai kanal inti. Jangan membuat form monitoring baru untuk menggantinya.
- Pertanyaan 1–3 adalah Nama Pegawai (akan dirahasiakan), UNIT (akan dirahasiakan), dan Periode.
- Pertanyaan 4–11 (Ya/Tidak) menyangkut **gratifikasi, suap-menyuap, perbuatan curang, pemerasan, pelanggaran kode etik, gaya hidup mewah, benturan kepentingan, dan penggelapan dalam jabatan**.
- Pertanyaan 12 adalah salinan pernyataan penolakan penerimaan terkait posisi/jabatan.
- Jangan mengubah urutan/redaksi inti, kecuali ada persetujuan pemilik formulir. Pengelolaan kerahasiaan dan jawaban positif harus mengikuti prosedur pengaduan yang berlaku.
- Tautan yang diperlukan untuk website adalah **Collect responses / tautan pengisi**, bukan halaman ResponseDetailPage atau tautan edit. Pemilik harus mengonfirmasi pengaturan hak akses Kemenkeu sebelum dipasang.

## B. Form tambahan: Saling Ngingetken

Tujuan: pengingat ringan dan preventif kepada rekan melalui moderasi. BUKAN saluran tuduhan pelanggaran. Batasi responden pada pegawai yang berhak dan akses hasil pada pengelola.

Contoh pertanyaan: topik pengingat; jenis pengingat umum/pribadi; pesan sopan tanpa dugaan pelanggaran atau data sensitif; harapan perbaikan; persetujuan bahwa form ini bukan WBS.

## C. Form tambahan: Apresiasi Rekan

Tujuan: apresiasi faktual dan terverifikasi. Pertanyaan dapat mencakup penerima, kategori perilaku, contoh konkret, periode, dan persetujuan sebelum publikasi.

## D. Form tambahan: Usulan Materi Knowledge Base

Tujuan: mengumpulkan usulan topik dan pertanyaan umum tanpa data kasus atau identitas pihak terkait. Kategori mencakup delapan indikator form induk ditambah etika kerja dan keamanan informasi.

## E. Hubungkan ke website

Setelah pemilik form mengonfirmasi URL **pengisian**, masukkan hanya tautan sah Microsoft Forms pada `assets/js/forms-config.js`:

- `monitoring`: **tautan pengisian form NGINGETKEN asli**.
- `reminder`: form tambahan Saling Ngingetken.
- `appreciation`: form tambahan Apresiasi Rekan.
- `suggestion`: form tambahan Usulan Materi.

Jangan masukkan URL detail respons, URL pengeditan, file Excel hasil, token, identitas, atau data pegawai. Selama URL belum diverifikasi, tombol dengan sengaja akan menunjukkan bahwa form belum aktif.

## F. Pemeriksaan keamanan dan uji coba

- Form induk 12 pertanyaan tetap ada dan bisa diisi pegawai sesuai izin.
- Pemilik/otoritas internal yang berwenang mengendalikan akses data respons dan tindak lanjutnya.
- Jawaban Ya **tidak otomatis menunjukkan pelanggaran**; rujukan/eskalasi harus mengikuti ketentuan yang berlaku.
- Kerahasiaan yang dijanjikan harus ditegakkan, dan tidak ada data respons pada GitHub Pages.
- Pengingat preventif dan apresiasi tidak menggantikan form induk maupun WISE.
- Dokumentasikan uji coba, masukan, dan evaluasi mentor sebagai bukti IDP.
