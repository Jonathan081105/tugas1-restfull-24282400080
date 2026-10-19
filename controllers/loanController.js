const Loan = require('../models/loanModel');

const getLoans = (req, res, next) => {
  try {
    const { status } = req.query;
    if (status) {
      const filteredLoans = Loan.findByStatus(status);
      return res.status(200).json(filteredLoans);
    }
    return res.status(200).json(Loan.findAll());
  } catch (error) {
    next(error);
  }
};

const getLoanById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const loan = Loan.findById(id);
    if (!loan) {
      const error = new Error("Data tidak ditemukan");
      error.status = 404;
      return next(error);
    }
    return res.status(200).json(loan);
  } catch (error) {
    next(error);
  }
};

const createLoan = (req, res, next) => {
  try {
    const { namaAnggota, jumlahPinjaman, tenorBulan, bungaPersen, status } = req.body;
    if (!namaAnggota || !jumlahPinjaman || !tenorBulan || !status) {
      const error = new Error("Data tidak lengkap. namaAnggota, jumlahPinjaman, tenorBulan, dan status wajib diisi");
      error.status = 400;
      return next(error);
    }
    if (status !== "aktif" && status !== "lunas") {
      const error = new Error("Status hanya boleh 'aktif' atau 'lunas'");
      error.status = 400;
      return next(error);
    }
    const newLoan = Loan.create({ namaAnggota, jumlahPinjaman, tenorBulan, bungaPersen, status });
    return res.status(201).json({
      status: "success",
      message: "Data berhasil ditambahkan",
      data: newLoan
    });
  } catch (error) {
    next(error);
  }
};

const updateLoan = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const loanIndex = Loan.findIndex(id);
    if (loanIndex === -1) {
      const error = new Error("Data tidak ditemukan");
      error.status = 404;
      return next(error);
    }

    const { namaAnggota, jumlahPinjaman, tenorBulan, bungaPersen, status } = req.body;
    if (!namaAnggota || !jumlahPinjaman || !tenorBulan || !status) {
      const error = new Error("Data tidak lengkap. namaAnggota, jumlahPinjaman, tenorBulan, dan status wajib diisi");
      error.status = 400;
      return next(error);
    }
    if (status !== "aktif" && status !== "lunas") {
      const error = new Error("Status hanya boleh 'aktif' atau 'lunas'");
      error.status = 400;
      return next(error);
    }

    const updatedLoan = Loan.update(loanIndex, { namaAnggota, jumlahPinjaman, tenorBulan, bungaPersen, status });

    return res.status(200).json({
      status: "success",
      message: "Data berhasil diperbarui",
      data: updatedLoan
    });
  } catch (error) {
    next(error);
  }
};

const deleteLoan = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const loanIndex = Loan.findIndex(id);
    if (loanIndex === -1) {
      const error = new Error("Data tidak ditemukan");
      error.status = 404;
      return next(error);
    }
    Loan.delete(loanIndex);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan
};
