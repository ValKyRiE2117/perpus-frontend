# Website Perpus Online

Perpus Online adalah sistem manajemen perpustakaan berbasis web yang dirancang untuk membantu pengelolaan koleksi buku, peminjaman, dan keanggotaan perpustakaan secara digital. Aplikasi ini dibangun menggunakan Nuxt.js sebagai framework frontend dan terintegrasi dengan API backend untuk manajemen data.

## Fitur

- **Manajemen Buku**:Lihat dan cek data buku dengan informasi lengkap (judul, penulis, kategori, penerbit, tahun terbit, stok, dll.)
- **Pencarian Buku**: Fitur pencarian dan filter untuk menemukan buku dengan cepat
- **Dashboard**: Tampilan ringkasan data penting perpustakaan
- **Tampilan Responsif**: Mendukung berbagai ukuran layar (desktop, tablet, mobile)
- **UI Modern**: Menggunakan komponen dari Nuxt UI untuk tampilan yang menarik

## Stack Teknologi

- **Framework**: [Nuxt.js](https://nuxt.com/) (versi 4.2.2)
- **Bahasa Pemrograman**: TypeScript
- **UI Framework**: [Nuxt UI](https://ui.nuxt.com/)
- **Icon Library**: Lucide Icons dan Simple Icons
- **Package Manager**: pnpm
- **Linter**: ESLint
- **Server API**: Terintegrasi dengan backend API (berjalan di http://127.0.0.1:8000)

## Instalasi

### Prasyarat

- Node.js (versi 16.0 atau lebih baru)
- npm (direkomendasikan)

### Langkah-langkah Instalasi

1. **Clone repository**

   ```bash
   git clone <URL_REPOSITORY>
   cd perpus-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Konfigurasi lingkungan (opsional)**
   Buat file `.env` di root direktori dan tambahkan konfigurasi yang diperlukan:

   ```
   # Contoh konfigurasi
   NUXT_API_BASE_URL=http://127.0.0.1:8000
   ```

4. **Jalankan aplikasi dalam mode development**

   ```bash
   npm run dev
   ```

5. **Untuk build produksi**
   ```bash
   npm run build
   ```

Aplikasi akan berjalan di `http://localhost:3000` (atau port lain sesuai konfigurasi).

## Struktur Folder

```
perpus-frontend/
├── app/                    # Sumber utama aplikasi
│   ├── assets/            # File statis dan aset
│   ├── components/        # Komponen Vue/Nuxt
│   ├── composables/       # Fungsi reusable (composables)
│   ├── pages/             # Halaman aplikasi (berdasarkan rute)
│   ├── app.config.ts      # Konfigurasi aplikasi
│   └── app.vue            # Entry point utama aplikasi
├── server/                # Server API endpoints
│   └── api/               # Endpoint API internal
├── node_modules/          # Dependencies proyek
├── public/                # File statis publik
├── nuxt.config.ts         # Konfigurasi Nuxt
├── package.json           # Konfigurasi proyek dan dependencies
├── tsconfig.json          # Konfigurasi TypeScript
└── README.md              # Dokumentasi ini
```
