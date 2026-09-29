# Tugas 1: RESTful API Murni dengan Express.js

Sebuah proyek implementasi RESTful API sederhana menggunakan Node.js dan Express.js untuk mengelola data "Koperasi - Pinjaman Anggota" menggunakan penyimpanan struktur data *in-memory* (Array).

Proyek ini dibuat untuk memenuhi Tugas 1 Praktikum.

## 🚀 Fitur Endpoint

API ini berjalan di resource `/loans` dan mendukung operasi CRUD penuh:

- `GET /loans` - Menampilkan seluruh data pinjaman.
- `GET /loans?status=aktif` - Menampilkan data pinjaman yang difilter berdasarkan status (aktif/lunas).
- `GET /loans/:id` - Menampilkan data pinjaman tunggal berdasarkan ID.
- `POST /loans` - Menambahkan data pinjaman baru (dengan validasi input wajib terisi).
- `PUT /loans/:id` - Memperbarui data pinjaman berdasarkan ID (dengan validasi input wajib terisi).
- `DELETE /loans/:id` - Menghapus data pinjaman berdasarkan ID.

## 🛠️ Teknologi yang Digunakan

- **Node.js**: JavaScript Runtime.
- **Express.js**: Web Framework untuk membangun REST API.
- **Vercel**: Platform untuk deployment serverless.

## 💻 Cara Menjalankan Secara Lokal

1. **Clone repository ini**
   ```bash
   git clone https://github.com/Jonathan081105/tugas1-restfull-24282400080.git
   cd tugas1-restful-2428240080
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan server**
   ```bash
   npm run dev
   ```
   *Atau jalankan dengan node standar:*
   ```bash
   npm start
   ```

4. **Uji Endpoint**
   Buka Postman atau browser dan akses `http://localhost:3000/loans`.

## 🌐 Deployment (Vercel)
Aplikasi ini sudah mendukung *serverless deployment* di platform Vercel karena telah dilengkapi konfigurasi `vercel.json` dan ekspor modul di file `app.js`.

---
*Dibuat oleh: Jonathan Immanuel A. (NIM: 2428240080) - Kelas SI5B*