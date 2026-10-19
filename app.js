require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const loanRoutes = require('./routes/loanRoutes');
const logger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.json());
app.use(logger);

// Method: GET
// URL: /
app.get('/', (req, res) => {
  res.send('<h1>Selamat datang di API Koperasi</h1><p>Silakan akses <a href="/loans">/loans</a> untuk melihat data pinjaman.</p>');
});

app.use('/loans', loanRoutes);

// Penanganan error terpusat
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
}
module.exports = app;
