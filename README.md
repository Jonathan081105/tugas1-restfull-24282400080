# Tugas 1: RESTful API Murni dengan Express.js

Sebuah proyek implementasi RESTful API sederhana menggunakan Node.js dan Express.js untuk mengelola data "Koperasi - Pinjaman Anggota" menggunakan penyimpanan struktur data *in-memory* (Array).

Proyek ini dibuat untuk memenuhi Tugas 1 Praktikum.

## 🚀 Fitur Endpoint

API ini berjalan di resource `/loans` dan mendukung operasi CRUD penuh.

### 1. GET `/loans`
Menampilkan seluruh data pinjaman.
- **Query Params:** `?status=aktif` atau `?status=lunas` (Opsional, untuk melakukan filter).
- **Response Success (200 OK):**
```json
[
  {
    "id": 1,
    "namaAnggota": "Ibu Sari",
    "jumlahPinjaman": 5000000,
    "tenorBulan": 12,
    "bungaPersen": 1.5,
    "status": "aktif"
  }
]
```

### 2. GET `/loans/:id`
Menampilkan data pinjaman tunggal berdasarkan ID.
- **Response Success (200 OK):**
```json
{
  "id": 1,
  "namaAnggota": "Ibu Sari",
  "jumlahPinjaman": 5000000,
  "tenorBulan": 12,
  "bungaPersen": 1.5,
  "status": "aktif"
}
```
- **Response Not Found (404 Not Found):**
```json
{
  "status": "error",
  "message": "Data tidak ditemukan",
  "data": null
}
```

### 3. POST `/loans`
Menambahkan data pinjaman baru (dengan validasi input wajib terisi).
- **Request Body:**
```json
{
  "namaAnggota": "Pak Joko",
  "jumlahPinjaman": 3000000,
  "tenorBulan": 12,
  "bungaPersen": 1.2,
  "status": "aktif"
}
```
- **Response Success (201 Created):**
```json
{
  "status": "success",
  "message": "Data berhasil ditambahkan",
  "data": {
    "id": 4,
    "namaAnggota": "Pak Joko",
    "jumlahPinjaman": 3000000,
    "tenorBulan": 12,
    "bungaPersen": 1.2,
    "status": "aktif"
  }
}
```

### 4. PUT `/loans/:id`
Memperbarui data pinjaman berdasarkan ID (dengan validasi input wajib terisi).
- **Request Body:**
```json
{
  "namaAnggota": "Ibu Sari Updated",
  "jumlahPinjaman": 6000000,
  "tenorBulan": 12,
  "status": "lunas"
}
```
- **Response Success (200 OK):**
```json
{
  "status": "success",
  "message": "Data berhasil diperbarui",
  "data": {
    "id": 1,
    "namaAnggota": "Ibu Sari Updated",
    "jumlahPinjaman": 6000000,
    "tenorBulan": 12,
    "bungaPersen": 1.5,
    "status": "lunas"
  }
}
```

### 5. DELETE `/loans/:id`
Menghapus data pinjaman berdasarkan ID.
- **Response Success (200 OK):**
```json
{
  "status": "success",
  "message": "Data pinjaman dengan id 1 berhasil dihapus",
  "data": null
}
```

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