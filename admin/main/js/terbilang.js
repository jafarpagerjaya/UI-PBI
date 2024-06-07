function terbilang(nilai) {
    // deklarasi variabel nilai sebagai angka matemarika
    // Objek Math bertujuan agar kita bisa melakukan tugas matemarika dengan javascript
    nilai = Math.floor(Math.abs(nilai));

    // deklarasi nama angka dalam bahasa indonesia
    var huruf = [
      '',
      'Satu',
      'Dua',
      'Tiga',
      'Empat',
      'Lima',
      'Enam',
      'Tujuh',
      'Delapan',
      'Sembilan',
      'Sepuluh',
      'Sebelas',
      ];

    // menyimpan nilai default untuk pembagian
    var bagi = 0;
    // deklarasi variabel penyimpanan untuk menyimpan proses rumus terbilang
    var penyimpanan = '';

    // rumus terbilang
    if (nilai < 12) {
      penyimpanan = ' ' + huruf[nilai];
    } else if (nilai < 20) {
      penyimpanan = terbilang(Math.floor(nilai - 10)) + ' Belas';
    } else if (nilai < 100) {
      bagi = Math.floor(nilai / 10);
      penyimpanan = terbilang(bagi) + ' Puluh' + terbilang(nilai % 10);
    } else if (nilai < 200) {
      penyimpanan = ' Seratus' + terbilang(nilai - 100);
    } else if (nilai < 1000) {
      bagi = Math.floor(nilai / 100);
      penyimpanan = terbilang(bagi) + ' Ratus' + terbilang(nilai % 100);
    } else if (nilai < 2000) {
      penyimpanan = ' Seribu' + terbilang(nilai - 1000);
    } else if (nilai < 1000000) {
      bagi = Math.floor(nilai / 1000);
      penyimpanan = terbilang(bagi) + ' Ribu' + terbilang(nilai % 1000);
    } else if (nilai < 1000000000) {
      bagi = Math.floor(nilai / 1000000);
      penyimpanan = terbilang(bagi) + ' Juta' + terbilang(nilai % 1000000);
    } else if (nilai < 1000000000000) {
      bagi = Math.floor(nilai / 1000000000);
      penyimpanan = terbilang(bagi) + ' Miliar' + terbilang(nilai % 1000000000);
    } else if (nilai < 1000000000000000) {
      bagi = Math.floor(nilai / 1000000000000);
      penyimpanan = terbilang(nilai / 1000000000000) + ' Triliun' + terbilang(nilai % 1000000000000);
    }

    // mengambalikan nilai yang ada dalam variabel penyimpanan
    return penyimpanan;
}