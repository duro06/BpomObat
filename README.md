# Scraper Data BPOM

Proyek ini adalah aplikasi web sederhana untuk melakukan web scraping data obat dari situs resmi BPOM menggunakan **Node.js**, **Express**, dan **Puppeteer**, dikemas menggunakan **Docker**.

---

## 📦 Fitur

- Scraping data obat berdasarkan nama
- Menggunakan Puppeteer untuk kontrol browser otomatis
- Siap dijalankan dalam container Docker

---

## ⚙️ Cara Instalasi

### 1. Clone Repo Ini

```bash
git clone <URL_REPO_KAMU>
cd BpomObat
```

### 2. Bangun Docker Image

```bash
docker-compose build --no-cache
```

### 3. Jalankan Container

```bash
docker-compose up
```

Aplikasi akan tersedia di: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Cara Menggunakan

### Endpoint:

```http
GET /scrape?nama=<nama_obat>
```

### Contoh:

```http
GET http://localhost:3000/scrape?nama=paracetamol
```

### Respons Berhasil:

```json
{
  "hasil": [
    {
      "nama_produk": "Paracetamol 500 mg",
      "nomor_registrasi": "DBL1234567890A1",
      "pendaftar": "PT Contoh Farma",
      "bentuk_sediaan": "Tablet",
      "kemasan": "Dus, 10 Strip @ 10 Tablet",
      "kategori": "Obat Bebas",
      "tanggal_terbit": "2023-01-01"
    },
    ...
  ]
}
```

### Respons Gagal:

```json
{
  "error": "Scraping gagal",
  "detail": "Pesan error detail dari Puppeteer"
}
```

---

## 🧰 Notes Tambahan

- Puppeteer dijalankan dalam mode `--no-sandbox` karena dijalankan dalam container sebagai root.
- Untuk melakukan debug scraping, lihat log di terminal atau tambahkan `console.log()` di dalam `scrape.js`.

---

## 🧼 Stop Container

Tekan `CTRL+C` lalu jalankan:

```bash
docker-compose down
```

---

## 🧑‍💻 Developer

- Nama: Andi Dermawan
- Tech Stack: Node.js, Express, Puppeteer, Docker