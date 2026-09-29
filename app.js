const express = require('express');
const app = express();

app.use(express.json());

let loans = [
  { id: 1, namaAnggota: "Ibu Sari", jumlahPinjaman: 5000000, tenorBulan: 12, bungaPersen: 1.5, status: "aktif" },
  { id: 2, namaAnggota: "Bapak Budi", jumlahPinjaman: 2000000, tenorBulan: 6, bungaPersen: 1.0, status: "lunas" },
  { id: 3, namaAnggota: "Kak Andi", jumlahPinjaman: 10000000, tenorBulan: 24, bungaPersen: 2.0, status: "aktif" }
];
let nextId = 4;

// Method: GET
// URL: /loans (or /loans?status=aktif)
app.get('/loans', (req, res) => {
  const { status } = req.query;
  if (status) {
    const filteredLoans = loans.filter(l => l.status === status);
    return res.status(200).json(filteredLoans);
  }
  return res.status(200).json(loans);
});

// Method: GET
// URL: /loans/:id
app.get('/loans/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const loan = loans.find(l => l.id === id);
  if (!loan) {
    return res.status(404).json({
      status: "error",
      message: "Data tidak ditemukan",
      data: null
    });
  }
  return res.status(200).json(loan);
});

// Method: POST
// URL: /loans
// Example Body: { "namaAnggota": "Pak Joko", "jumlahPinjaman": 3000000, "tenorBulan": 12, "bungaPersen": 1.2, "status": "aktif" }
app.post('/loans', (req, res) => {
  const { namaAnggota, jumlahPinjaman, tenorBulan, bungaPersen, status } = req.body;
  if (!namaAnggota || !jumlahPinjaman || !tenorBulan || !status) {
    return res.status(400).json({
      status: "error",
      message: "Data tidak lengkap. namaAnggota, jumlahPinjaman, tenorBulan, dan status wajib diisi",
      data: null
    });
  }
  if (status !== "aktif" && status !== "lunas") {
    return res.status(400).json({
      status: "error",
      message: "Status hanya boleh 'aktif' atau 'lunas'",
      data: null
    });
  }
  const newLoan = {
    id: nextId++,
    namaAnggota,
    jumlahPinjaman,
    tenorBulan,
    bungaPersen: bungaPersen || 0,
    status
  };
  loans.push(newLoan);
  return res.status(201).json({
    status: "success",
    message: "Data berhasil ditambahkan",
    data: newLoan
  });
});

// Method: PUT
// URL: /loans/:id
// Example Body: { "namaAnggota": "Ibu Sari Updated", "jumlahPinjaman": 6000000, "tenorBulan": 12, "status": "lunas" }
app.put('/loans/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const loanIndex = loans.findIndex(l => l.id === id);
  if (loanIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Data tidak ditemukan",
      data: null
    });
  }

  const { namaAnggota, jumlahPinjaman, tenorBulan, bungaPersen, status } = req.body;
  if (!namaAnggota || !jumlahPinjaman || !tenorBulan || !status) {
    return res.status(400).json({
      status: "error",
      message: "Data tidak lengkap",
      data: null
    });
  }
  if (status !== "aktif" && status !== "lunas") {
    return res.status(400).json({
      status: "error",
      message: "Status hanya boleh 'aktif' atau 'lunas'",
      data: null
    });
  }

  loans[loanIndex] = {
    ...loans[loanIndex],
    namaAnggota,
    jumlahPinjaman,
    tenorBulan,
    bungaPersen: bungaPersen !== undefined ? bungaPersen : loans[loanIndex].bungaPersen,
    status
  };

  return res.status(200).json({
    status: "success",
    message: "Data berhasil diperbarui",
    data: loans[loanIndex]
  });
});

// Method: DELETE
// URL: /loans/:id
app.delete('/loans/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const loanIndex = loans.findIndex(l => l.id === id);
  if (loanIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Data tidak ditemukan",
      data: null
    });
  }
  loans.splice(loanIndex, 1);
  return res.status(200).json({
    status: "success",
    message: `Data pinjaman dengan id ${id} berhasil dihapus`,
    data: null
  });
});

// 404 Middleware
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null
  });
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
}
module.exports = app;
