# Pengembangan v5 - Form Asli NGINGETKEN + Histori

Versi ini menyesuaikan `isi.html` dengan struktur awal Microsoft Forms yang selama ini digunakan.

## Perubahan utama

1. Field awal mengikuti form asli:
   - Nama Pegawai (dirahasiakan)
   - Unit (dirahasiakan)
   - Periode Tahun 2026

2. Unit dibuat sebagai pilihan tetap:
   - PENINDAKAN DAN PENYIDIKAN
   - UMUM
   - KEPATUHAN INTERNAL DAN PENYULUHAN
   - PKCDT
   - PERBEND

3. Pertanyaan integritas mengikuti nomor 4 sampai 11:
   - Gratifikasi
   - Suap menyuap
   - Praktik curang
   - Pemerasan
   - Pelanggaran kode etik
   - Gaya hidup mewah
   - Benturan kepentingan
   - Penggelapan dalam jabatan

4. Opsi jawaban ditambah menjadi:
   - Ya
   - Tidak
   - Ragu-ragu

5. Pernyataan salin teks tetap dipertahankan sesuai form asli.

6. Fitur histori:
   - ketika nama pegawai diketik, sistem mencari data pegawai;
   - sistem mengisi NIP/email/unit jika ditemukan;
   - sistem dapat menampilkan histori pengisian terakhir;
   - admin dapat mengaktifkan opsi memakai jawaban sebelumnya untuk mempercepat pengisian.

## Catatan keamanan

Untuk produksi, fitur histori sebaiknya dipakai minimal untuk identitas dan unit saja. Jika jawaban sebelumnya juga ingin ditampilkan, sebaiknya tambahkan verifikasi NIP/email agar pegawai tidak bisa melihat histori orang lain hanya dengan mengetik nama.
