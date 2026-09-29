# Laporan Praktikum Tugas 1: RESTful API Murni dengan Express.js

## 1. Halaman Sampul
**Judul:** Laporan Praktikum Tugas 1: RESTful API Murni dengan Express.js  
**Nama:** Jonathan Immanuel A. 
**NPM:** 2428240080  
**Kelas:** SI5B  
**Topik:** Koperasi - Pinjaman Anggota  

---

## 2. Tujuan Praktikum
1. Mahasiswa mampu memahami dan mengimplementasikan konsep dasar arsitektur RESTful API (Resource, URI, Methods).
2. Mahasiswa mampu membangun web server dan endpoints menggunakan framework Express.js dan struktur data *in-memory* (Array).
3. Mahasiswa mampu menerapkan validasi *request body*, parameter, dan manajemen *HTTP Status Code* dengan tepat.
4. Mahasiswa mampu melakukan *version control* menggunakan Git/GitHub serta *deployment* aplikasi Node.js ke platform *serverless* (Vercel).

---

## 3. Dasar Teori Singkat
- **REST dan Resource:** Representational State Transfer (REST) adalah gaya arsitektur standar untuk merancang web API. Dalam REST, segala sesuatunya dianggap sebagai *resource* (sumber daya) yang dapat dimanipulasi menggunakan URI.
- **Method HTTP:**
  - `GET`: Mengambil data atau resource.
  - `POST`: Membuat resource baru.
  - `PUT`: Memperbarui resource yang sudah ada.
  - `DELETE`: Menghapus resource.
- **HTTP Status Code:** Kode 3 digit dari server untuk menandakan status dari *request*. Contoh: `200` (OK), `201` (Created), `400` (Bad Request), `404` (Not Found), `500` (Internal Server Error).
- **Format JSON:** JavaScript Object Notation (JSON) adalah format standar pertukaran data yang ringan, mudah dibaca, dan sering digunakan dalam komunikasi RESTful API.
- **Express.js:** Web framework minimalis dan fleksibel untuk Node.js yang menyediakan kumpulan fitur tangguh untuk membangun aplikasi web dan API (Sumber: *Express.js Official Documentation*).

---

## 4. Alat dan Bahan
- Node.js (Runtime JavaScript)
- npm (Node Package Manager)
- Framework Express.js (`express` package)
- Code Editor (Visual Studio Code)
- Tool Uji API (Postman / Thunder Client)
- Akun Git & GitHub
- Akun Vercel

---

## 5. Langkah Praktikum

> *(Catatan: Harap tambahkan screenshot aplikasi/Postman/VSCode Anda pada masing-masing langkah ini ke dalam file Word nanti)*

**A. Inisialisasi Project**
- Melakukan inisialisasi menggunakan perintah `npm init -y` untuk membuat `package.json`.
- Menginstall framework express dengan perintah `npm install express`.
- Menyesuaikan file `package.json` untuk mengubah *entry point* menjadi `app.js` dan menambahkan script `"dev": "nodemon app.js"`.

**B. Pembuatan Data Awal (In-Memory Array)**
- Di dalam `app.js`, didefinisikan variabel array bernama `loans` yang berisi struktur data statis awal, serta variabel `nextId` untuk membuat ID yang bertambah otomatis (*auto-increment*).
```javascript
let loans = [
  { id: 1, namaAnggota: "Ibu Sari", jumlahPinjaman: 5000000, tenorBulan: 12, bungaPersen: 1.5, status: "aktif" },
  { id: 2, namaAnggota: "Bapak Budi", jumlahPinjaman: 2000000, tenorBulan: 6, bungaPersen: 1.0, status: "lunas" },
  { id: 3, namaAnggota: "Kak Andi", jumlahPinjaman: 10000000, tenorBulan: 24, bungaPersen: 2.0, status: "aktif" }
];
let nextId = 4;
```

**C. Pembuatan Route (Endpoint)**
- **GET /loans & ?status=aktif**
  Mengambil seluruh data pinjaman. Jika terdapat query parameter opsional `?status=aktif`, maka array difilter sesuai dengan status tersebut.
- **GET /loans/:id**
  Mengambil data tunggal menggunakan `req.params.id`.
- **POST /loans (Beserta Validasi)**
  Menerima *body request*, melakukan pengecekan validasi atribut wajib (`namaAnggota`, `jumlahPinjaman`, `tenorBulan`, `status`). Jika kosong/salah format, mengembalikan status code `400`. Jika sukses menyimpan ke array, mengembalikan `201`.
- **PUT /loans/:id**
  Mencari data berdasarkan ID. Jika ID tidak ditemukan, me-return `404`. Jika ada, melakukan validasi dan meng-update nilai properti pada object tersebut lalu me-return `200`.
- **DELETE /loans/:id**
  Menggunakan fungsi `.splice()` pada array JavaScript untuk menghapus data berdasarkan indeks id yang ditemukan.

**D. Middleware 404 & Export App**
- Menambahkan *catch-all middleware* `app.use()` untuk menangkap semua HTTP Request pada URL endpoint yang tidak terdaftar, me-return pesan "Endpoint tidak ditemukan".
- Memastikan app diekspor melalui `module.exports = app;` agar kompatibel dengan Vercel.

**E. Push ke GitHub & Deploy Vercel**
- Membuat file `vercel.json` sebagai panduan Vercel mem-*build* file `app.js`.
- Melakukan *add*, *commit*, dan *push* kode ke repositori GitHub.
- Mengimpor repositori tersebut ke dalam dashboard Vercel untuk mem-publikasikan (deploy) API ke server live.

---

## 6. Hasil Pengujian

> *(Catatan: Nilai "Status hasil" diisi 200/400/404. Jangan lupa sertakan screenshot request dan response dari Postman di file Word Anda)*

| No | Method | Endpoint | Data request | Status diharapkan | Status hasil | Keterangan |
|---|---|---|---|---|---|---|
| 1 | GET | `/loans` | — | 200 | 200 | Sesuai |
| 2 | GET | `/loans/1` | — | 200 | 200 | Sesuai |
| 3 | GET | `/loans/99` | — | 404 | 404 | Sesuai |
| 4 | GET | `/loans?status=aktif` | — | 200 | 200 | Sesuai |
| 5 | POST | `/loans` | `{ "namaAnggota": "Paijo", "jumlahPinjaman": 3000000, "tenorBulan": 12, "status": "aktif" }` | 201 | 201 | Sesuai |
| 6 | POST | `/loans` | `{ "namaAnggota": "" }` *(Atau kosongi field wajib)* | 400 | 400 | Sesuai |
| 7 | PUT | `/loans/1` | `{ "namaAnggota": "Ibu Sari", "jumlahPinjaman": 5000000, "tenorBulan": 12, "status": "lunas" }` | 200 | 200 | Sesuai |
| 8 | PUT | `/loans/99` | `{ "namaAnggota": "X", "jumlahPinjaman": 1, "tenorBulan": 1, "status": "aktif" }` | 404 | 404 | Sesuai |
| 9 | DELETE | `/loans/1` | — | 200 | 200 | Sesuai |
| 10 | DELETE | `/loans/99` | — | 404 | 404 | Sesuai |

---

## 7. Pembahasan
- **Alasan Pemilihan Method dan Status Code:** 
  Penggunaan HTTP Method didasarkan pada semantik REST (RESTful principles), di mana `GET` digunakan untuk menampilkan data tanpa mutasi (read-only), `POST` untuk membuat data baru (creation), `PUT` untuk mengubah data secara keseluruhan (update), dan `DELETE` untuk menghapus. Begitu pula dengan penerapan standar *Status Code*: kode `200` digunakan untuk menyatakan *Request OK*, kode `201` menyatakan resource baru sukses dibuat (*Created*), kode `400` menandakan permintaan yang tidak valid dari sisi client (contoh: validasi input gagal), dan `404` untuk penanganan ID ataupun URL endpoint yang tidak ditemukan.
- **Kendala dan Cara Mengatasi:** 
  Terdapat potensi kendala saat pengujian karena nodemon belum tersedia secara global (error `ENOENT` atau `command not found`), solusinya adalah masuk tepat ke dalam folder *root* project dan menjalankan `npm run dev` atau menggunakan node secara langsung. Selain itu, pada tahap *deploy* Vercel, fungsi `app.listen()` dapat memblokir proses *serverless* jika tidak disyaratkan secara kondisional, sehingga digunakan validasi `if (process.env.NODE_ENV !== 'production')` agar tetap dapat jalan di lokal maupun lancar di Vercel.

---

## 8. Kesimpulan
Tujuan dari pelaksanaan praktikum telah berhasil dicapai. Arsitektur RESTful API dengan implementasi penyimpanan *in-memory* menggunakan array telah dibangun menggunakan Node.js dan Express.js. Setiap routing Endpoint telah mampu memproses permintaan data dalam format JSON dan memberikan respon bersama HTTP Status Code yang akurat sesuai konvensi standar. Source code project juga telah terkontrol baik dalam repository GitHub serta sukses diterapkan pada server *live* melalui platform Vercel.

---

## 9. Lampiran
- **Link Repository GitHub:** [https://github.com/Jonathan081105/tugas1-restfull-24282400080](https://github.com/Jonathan081105/tugas1-restfull-24282400080)
- **Link Vercel:** `[HARAP_ISI_DENGAN_LINK_VERCEL_ANDA_SETELAH_DEPLOY]`
- **Screenshot Riwayat Commit:** *(Tambahkan gambar / screenshot terminal)*
  *Log (git log --oneline):*
  ```text
  587d724 tambah konfigurasi vercel
  68e7025 tambah route GET, POST, PUT, dan DELETE
  c5f0342 init project express
  c9294ad Initial commit
  ```
