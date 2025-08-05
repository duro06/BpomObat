FROM node:22-slim

# Set direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dulu untuk caching layer build
COPY package.json ./

# Lewati download Chromium saat npm install (biar lebih stabil)
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Update dan install Chromium yang dibutuhkan Puppeteer
RUN apt-get update && \
  apt-get install -y chromium && \
  npm install

# Salin semua file proyek ke dalam container
COPY . .

# Set path ke chromium bawaan OS
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Expose port aplikasi
EXPOSE 3000

# Perintah utama saat container dijalankan
CMD ["node", "index.js"]
