// index.js
import express from 'express';
import scrapeBPOM from './scrape.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
  const nama = req.query.nama;
  const bentuk = req.query?.bentuk??'';

  if (!nama) {
    return res.status(400).json({ error: 'Parameter "nama" wajib diisi' });
  }

  try {
    const data = await scrapeBPOM(nama, bentuk);
    res.json(data);
  } catch (error) {
    console.error('Scraping error:', error.message);
    res.status(500).json({ error: 'Scraping gagal', detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server aktif di http://localhost:${PORT}`);
});
