# Panduan Fitur Statistik Pengunjung

## Deskripsi
Fitur ini menyediakan tracking dan analitik pengunjung website dengan visualisasi grafik yang informatif.

## Teknologi yang Digunakan

### Backend
- **Hono** - Framework web minimalis dan cepat untuk Node.js
- **Better SQLite3** - Database lokal untuk menyimpan data statistik
- **Node.js** - Runtime environment

### Frontend
- **React** - Library UI
- **Recharts** - Library untuk membuat grafik/chart
- **Axios** - HTTP client untuk API calls
- **date-fns** - Library untuk manipulasi tanggal

## Struktur Database

### Tabel `page_views`
Menyimpan setiap page view yang terjadi
- `id` - Primary key
- `page_path` - URL path yang dikunjungi
- `page_title` - Judul halaman
- `timestamp` - Waktu kunjungan
- `user_agent` - Browser/device information
- `referrer` - Dari mana pengunjung datang

### Tabel `visitor_stats`
Statistik harian pengunjung
- `id` - Primary key
- `date` - Tanggal
- `total_visits` - Total kunjungan
- `unique_pages` - Jumlah halaman unik yang dikunjungi

### Tabel `popular_pages`
Halaman paling populer
- `id` - Primary key
- `page_path` - URL path
- `page_title` - Judul halaman
- `view_count` - Jumlah view
- `last_viewed` - Waktu terakhir dilihat

## API Endpoints

### POST `/api/track`
Track page view baru
```json
{
  "pagePath": "/detail-comic/one-piece",
  "pageTitle": "One Piece - Chapter 1",
  "referrer": "https://google.com"
}
```

### GET `/api/stats/overview`
Mendapatkan overview statistik keseluruhan
```json
{
  "total_views": 1234,
  "unique_pages": 45,
  "today_views": 89,
  "yesterday_views": 67
}
```

### GET `/api/stats/daily`
Mendapatkan data views harian untuk 30 hari terakhir
```json
[
  { "date": "2025-01-01", "views": 123 },
  { "date": "2025-01-02", "views": 145 }
]
```

### GET `/api/stats/hourly`
Mendapatkan data views per jam untuk hari ini
```json
[
  { "hour": "00:00", "views": 12 },
  { "hour": "01:00", "views": 8 }
]
```

### GET `/api/stats/popular?limit=10`
Mendapatkan halaman paling populer
```json
[
  {
    "page_path": "/detail-comic/one-piece",
    "page_title": "One Piece",
    "view_count": 456
  }
]
```

### GET `/api/stats/recent?limit=20`
Mendapatkan aktivitas terbaru
```json
[
  {
    "page_path": "/trending",
    "page_title": "Trending Comics",
    "timestamp": "2025-01-07 14:30:00"
  }
]
```

### GET `/api/health`
Health check endpoint
```json
{
  "status": "ok",
  "timestamp": "2025-01-07T14:30:00.000Z"
}
```

## Cara Menjalankan

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Copy file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

Edit `.env` jika perlu mengubah konfigurasi.

### 3. Menjalankan Development

#### Opsi 1: Jalankan Frontend dan Backend Bersamaan
```bash
npm run dev:all
```

#### Opsi 2: Jalankan Secara Terpisah

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

### 4. Akses Aplikasi
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Halaman Statistik: http://localhost:5173/statistics

## Fitur Dashboard Statistik

### 1. Overview Cards
- **Total Views** - Total semua page views
- **Today Views** - Views hari ini dengan persentase pertumbuhan
- **Unique Pages** - Jumlah halaman unik yang pernah dikunjungi
- **Yesterday Views** - Views kemarin untuk perbandingan

### 2. Daily Views Chart
- Line chart menampilkan trend views 30 hari terakhir
- Membantu melihat pola kunjungan harian

### 3. Hourly Views Chart
- Bar chart menampilkan views per jam untuk hari ini
- Berguna untuk mengetahui jam-jam peak traffic

### 4. Popular Pages
- List 10 halaman paling banyak dikunjungi
- Menampilkan jumlah views setiap halaman

### 5. Recent Activity
- 10 aktivitas kunjungan terbaru
- Real-time monitoring pengunjung

### 6. Auto Refresh
- Tombol refresh untuk update data terbaru
- Data di-cache untuk performa optimal

## Tracking Implementation

Tracking otomatis terintegrasi di setiap halaman menggunakan custom hook `usePageTracking`:

```jsx
import usePageTracking from './hooks/usePageTracking'

function App() {
  usePageTracking() // Otomatis track setiap route change
  return <Routes>...</Routes>
}
```

### Cara Kerja:
1. Hook mendeteksi perubahan route menggunakan `useLocation`
2. Setiap ada navigasi, data dikirim ke API backend
3. Backend menyimpan data ke database SQLite
4. Data bisa dilihat di dashboard `/statistics`

## File Structure
```
manhwa/
├── server/
│   ├── db.js              # Database setup dan queries
│   ├── index.js           # Hono server dan API endpoints
│   └── statistics.db      # SQLite database (auto-generated)
├── src/
│   ├── hooks/
│   │   └── usePageTracking.js   # Hook untuk tracking
│   ├── Pages/
│   │   └── StatisticsPage.jsx   # Dashboard statistik
│   └── App.jsx                  # Integrasi tracking
└── package.json
```

## Tips & Best Practices

1. **Backup Database**: Database ada di `server/statistics.db`, backup secara berkala
2. **Performance**: Database menggunakan index untuk query cepat
3. **Privacy**: Data hanya menyimpan path dan basic info, tidak ada personal data
4. **Error Handling**: Tracking gagal tidak akan mengganggu user experience
5. **Scalability**: Untuk traffic tinggi, pertimbangkan migrasi ke PostgreSQL/MySQL

## Troubleshooting

### Server tidak jalan
- Pastikan port 3001 tidak digunakan aplikasi lain
- Check error message di console
- Pastikan dependencies sudah terinstall dengan benar

### Grafik tidak muncul
- Pastikan backend server sudah running
- Check browser console untuk error
- Verify API URL di `.env` sesuai dengan server

### Database error
- Delete file `server/statistics.db` untuk reset database
- Database akan otomatis dibuat ulang saat server start

## Future Enhancements

Beberapa ide pengembangan lebih lanjut:
- Export data ke CSV/Excel
- Filter by date range
- Geographic data (IP to location)
- Device & browser analytics
- Real-time dashboard dengan WebSocket
- Notification untuk traffic spike
- Custom events tracking
- A/B testing support
