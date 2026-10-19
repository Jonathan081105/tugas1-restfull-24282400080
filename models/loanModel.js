let loans = [
  { id: 1, namaAnggota: "Ibu Sari", jumlahPinjaman: 5000000, tenorBulan: 12, bungaPersen: 1.5, status: "aktif" },
  { id: 2, namaAnggota: "Bapak Budi", jumlahPinjaman: 2000000, tenorBulan: 6, bungaPersen: 1.0, status: "lunas" },
  { id: 3, namaAnggota: "Kak Andi", jumlahPinjaman: 10000000, tenorBulan: 24, bungaPersen: 2.0, status: "aktif" }
];
let nextId = 4;

const Loan = {
  findAll: () => loans,
  findByStatus: (status) => loans.filter(l => l.status === status),
  findById: (id) => loans.find(l => l.id === id),
  findIndex: (id) => loans.findIndex(l => l.id === id),
  create: (data) => {
    const newLoan = {
      id: nextId++,
      namaAnggota: data.namaAnggota,
      jumlahPinjaman: data.jumlahPinjaman,
      tenorBulan: data.tenorBulan,
      bungaPersen: data.bungaPersen || 0,
      status: data.status
    };
    loans.push(newLoan);
    return newLoan;
  },
  update: (index, data) => {
    loans[index] = {
      ...loans[index],
      namaAnggota: data.namaAnggota,
      jumlahPinjaman: data.jumlahPinjaman,
      tenorBulan: data.tenorBulan,
      bungaPersen: data.bungaPersen !== undefined ? data.bungaPersen : loans[index].bungaPersen,
      status: data.status
    };
    return loans[index];
  },
  delete: (index) => {
    loans.splice(index, 1);
  }
};

module.exports = Loan;
