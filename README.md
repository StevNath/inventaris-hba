# Inventaris HBA

Sistem manajemen inventaris untuk HBA dengan teknologi modern dan responsif.

## 📋 Deskripsi Proyek

**Inventaris HBA** adalah aplikasi web full-stack yang dirancang untuk mengelola inventaris dengan mudah dan efisien. Aplikasi ini dilengkapi dengan fitur autentikasi, manajemen data, dan antarmuka pengguna yang intuitif.

## 🛠️ Teknologi yang Digunakan

### Backend
- **Express.js** - Web framework untuk Node.js
- **MySQL2** - Database relasional
- **JWT** - Autentikasi berbasis token
- **Bcrypt** - Enkripsi password
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Manajemen variabel environment

### Frontend
- **React 19** - Library UI
- **Vite** - Build tool modern
- **React Router** - Navigation dan routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling framework
- **ESLint** - Code quality tool

## 📁 Struktur Proyek

```
inventaris-hba/
├── backend/           # Node.js Express server
│   ├── package.json
│   └── ...
├── frontend/          # React + Vite application
│   ├── package.json
│   ├── vite.config.js
│   └── ...
└── README.md         # File dokumentasi ini
```

## 🚀 Cara Instalasi dan Setup

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- MySQL Server

### Backend Setup

1. Masuk ke direktori backend:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Buat file `.env` di folder backend:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=inventaris_hba
JWT_SECRET=your_secret_key
```

4. Jalankan server:
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

### Frontend Setup

1. Masuk ke direktori frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Buat file `.env` (jika diperlukan):
```env
VITE_API_URL=http://localhost:3000
```

4. Jalankan development server:
```bash
npm run dev
```

5. Untuk production build:
```bash
npm run build
```

Aplikasi akan berjalan di `http://localhost:5173`

## 🔑 Fitur Utama

- ✅ Autentikasi pengguna dengan JWT
- ✅ Password terenkripsi dengan Bcrypt
- ✅ CORS support untuk komunikasi lintas domain
- ✅ Database MySQL yang terstruktur
- ✅ Interface responsif dengan Tailwind CSS
- ✅ Navigasi halaman dengan React Router

## 📊 API Endpoints (Contoh)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/auth/login` | Login pengguna |
| POST | `/api/auth/register` | Registrasi pengguna |
| GET | `/api/inventory` | Mendapatkan daftar inventaris |
| POST | `/api/inventory` | Menambah item inventaris |
| PUT | `/api/inventory/:id` | Mengubah item inventaris |
| DELETE | `/api/inventory/:id` | Menghapus item inventaris |

*Sesuaikan dengan endpoint yang sebenarnya*

## 🔒 Keamanan

- Password di-hash menggunakan Bcrypt
- Autentikasi menggunakan JWT token
- CORS dikonfigurasi untuk keamanan
- Environment variables untuk informasi sensitif

## 📝 Scripts

### Backend
```bash
npm test    # Menjalankan test
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Build untuk production
npm run lint     # Jalankan ESLint
npm run preview  # Preview production build
```

## 🤝 Kontribusi

Untuk berkontribusi pada proyek ini:

1. Fork repository ini
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📄 Lisensi

Proyek ini menggunakan lisensi ISC. Lihat file LICENSE untuk detail lebih lanjut.

## ✉️ Kontak & Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini atau hubungi developer.

---

**Dibuat oleh:** [StevNath](https://github.com/StevNath)

**Last Updated:** 2026-06-10
