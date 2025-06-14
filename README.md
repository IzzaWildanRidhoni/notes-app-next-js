# 📝 Notes App

Notes App adalah aplikasi pencatatan pribadi berbasis web yang modern dan responsif. Dibangun menggunakan **Next.js 14 (App Router)**, **Supabase** sebagai backend, serta **Tailwind CSS** untuk tampilan yang bersih dan elegan.

Aplikasi ini cocok untuk kamu yang ingin mencatat ide, rencana, atau catatan harian dengan antarmuka yang simpel dan efisien.

---

## ✨ Fitur Utama

- ✅ **Autentikasi Aman**
  - Login & Register dengan email/password
  - Verifikasi email otomatis
  - Login menggunakan Google (OAuth)
  - Proteksi halaman: redirect jika belum login

- ✅ **Manajemen Catatan**
  - Tambah, ubah, dan hapus catatan
  - Filter berdasarkan judul (fitur pencarian)
  - Kategori catatan (Personal, Business, Home, dll)
  - Tanggal pembuatan otomatis

- ✅ **User Interface Modern**
  - Responsive design (mobile friendly)
  - Gradient background dan card-style layout
  - Modal konfirmasi hapus
  - Indikator loading dengan desain bersih dan modern

- ✅ **Realtime & Cloud Storage**
  - Gunakan Supabase Realtime & Database Postgres
  - Tidak perlu membuat backend manual

---

## 🛠️ Teknologi yang Digunakan

| Teknologi                         | Deskripsi                                                  |
|----------------------------------|-------------------------------------------------------------|
| [Next.js](https://nextjs.org/)   | Framework React modern (App Router, SSR, Routing)          |
| [Supabase](https://supabase.com/)| Auth & Database (Firebase alternatif open source)          |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework untuk styling UI         |
| [TypeScript](https://www.typescriptlang.org/) | Superset dari JavaScript dengan type safety      |
| [Google OAuth](https://supabase.com/docs/guides/auth/social-login/google) | Login via Google dengan Supabase OAuth |

---

## 🧩 Struktur Folder

📁 src
├── app
│ ├── login/ # Halaman login
│ ├── register/ # Halaman register
│ ├── dashboard/ # Halaman utama catatan
│ │ ├── create/ # Halaman buat catatan
│ │ └── edit/[id]/ # Halaman edit catatan
│ └── lib/
│ ├── supabase.ts # Inisialisasi Supabase client
│ └── notes.ts # Fungsi API untuk CRUD catatan


---

## 🚀 Cara Instalasi

1. **Clone repo**
   ```bash
   git clone https://github.com/username/notes-app.git
   cd notes-app

2. **Install dependencies**

```bash
npm install
```

3. **Buat file .env.local dan isi dengan:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Screenshots
Login Page	

Dashboard Page


📄 Lisensi
Proyek ini menggunakan lisensi MIT License.

✅ Roadmap (To Do)
 Tambahkan dark mode toggle

 Reminder atau pengingat waktu untuk catatan

 Upload file/gambar di dalam catatan

 Export catatan ke PDF

 Kolaborasi catatan (multi user)

🙋 Kontribusi
Pull request sangat diterima! Untuk perubahan besar, silakan buka issue terlebih dahulu untuk mendiskusikan apa yang ingin kamu ubah.

💬 Kontak
Jika ada pertanyaan, hubungi saya melalui:
    
Email: yourname@email.com

Instagram: @yourhandle

Dibuat dengan ❤️ menggunakan Next.js + Supabase oleh [Nama Kamu]. Jangan lupa bintangin repo ini di GitHub jika kamu suka 🙌

---

Kalau kamu ingin saya bantu sesuaikan:
- nama akun GitHub
- URL asli repo
- email/handle asli

Tinggal beri tahu, nanti saya bantu revisi sesuai profil kamu.