# Next.js Login with Google and Regular Login

This project implements a login system using Next.js, featuring both Google authentication and regular email/password login.

## Features

- Google OAuth login
- Regular email/password login
- [Add other key features]

## Getting Started

1. Clone the repository:
git clone https://github.com/journeykurirtohero/nextjs-login-with-google-and-regular-login.git

2. Install dependencies:
npm install

3. Set up environment variables:
Copy `.env.example` to `.env.local` and fill in the required values.

4. Run the development server:
npx next dev -p 3005

5. Open [http://localhost:3005](http://localhost:3005) in your browser.

## Project Structure

my-auth-app/
├── app/
│   ├── admin/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   └── auth/
│   │       ├── forgot-password/
│   │       │   └── route.ts
│   │       ├── login/
│   │       │   └── route.ts
│   │       ├── logout/
│   │       │   └── route.ts
│   │       ├── reset-password/
│   │       │   └── route.ts
│   │       └── signup/
│   │           └── route.ts
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── forgot-password/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── reset-password/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AuthenticatedLayout.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── LoginForm.tsx
│   ├── PublicLayout.tsx
│   ├── Sidebar.tsx
│   └── SignupForm.tsx
├── context/
│   └── AuthContext.tsx
├── lib/
│   ├── auth-server.ts
│   ├── dbConnect.ts
│   └── email.ts
├── models/
│   └── User.ts
├── middleware.ts
├── .env.local
└── next.config.js


Dokumentasi Aplikasi Next.js Authentication
Struktur Folder
app/: Folder utama yang berisi halaman-halaman aplikasi.
admin/: Halaman khusus admin.
api/: API routes untuk autentikasi dan lupa password.
dashboard/: Halaman dashboard setelah login.
forgot-password/: Halaman untuk meminta reset password.
login/: Halaman login.
reset-password/: Halaman untuk mengatur password baru setelah menerima email reset password.
layout.tsx: Layout utama aplikasi.
page.tsx: Halaman beranda.
components/: Folder yang berisi komponen-komponen React yang digunakan di seluruh aplikasi.
context/: Folder yang berisi file konteks autentikasi (AuthContext.tsx).
lib/: Folder yang berisi fungsi-fungsi utilitas.
auth-server.ts: Fungsi untuk mengelola token autentikasi.
dbConnect.ts: Fungsi untuk menghubungkan ke database MongoDB.
email.ts: Fungsi untuk mengirim email reset password.
models/: Folder yang berisi model Mongoose untuk skema User.
middleware.ts: Middleware untuk melindungi rute yang memerlukan autentikasi.
.env.local: File yang berisi variabel lingkungan.
next.config.js: File konfigurasi Next.js.
Autentikasi
Menggunakan JWT (JSON Web Token) untuk autentikasi.
Token JWT disimpan di cookie dengan opsi httpOnly untuk keamanan.
Middleware middleware.ts digunakan untuk melindungi rute yang memerlukan autentikasi.
Konteks autentikasi (AuthContext.tsx) digunakan untuk mengelola state autentikasi di seluruh aplikasi.
Alur Autentikasi
Pengguna dapat login melalui halaman /login dengan memasukkan username dan password.
Setelah login berhasil, token JWT dibuat dan disimpan di cookie, dan pengguna diarahkan ke halaman /dashboard.
Pengguna dapat logout melalui fungsi logout yang menghapus token dari cookie dan mengarahkan pengguna ke halaman /login.
Middleware memeriksa keberadaan token untuk rute yang dilindungi. Jika token tidak ada, pengguna diarahkan ke halaman /login.
Lupa Password (Belum Diimplementasikan)
Pengguna dapat meminta reset password melalui halaman /forgot-password dengan memasukkan alamat email.
API route /api/auth/forgot-password mengirim email dengan link reset password ke alamat email pengguna.
Pengguna dapat mengatur password baru melalui halaman /reset-password setelah mengklik link reset password dari email.
API route /api/auth/reset-password memverifikasi token reset password dan mengupdate password pengguna di database.
Komponen Utama
AuthContext.tsx: Konteks autentikasi yang menyediakan fungsi login, logout, dan state user di seluruh aplikasi.
LoginForm.tsx: Komponen form login yang menangani proses login.
SignupForm.tsx: Komponen form signup yang menangani proses pendaftaran pengguna baru.
AuthenticatedLayout.tsx: Layout yang digunakan untuk halaman yang memerlukan autentikasi.
PublicLayout.tsx: Layout yang digunakan untuk halaman publik seperti login dan signup.
API Routes
/api/auth/login: Menangani proses login dan mengembalikan token JWT.
/api/auth/signup: Menangani proses pendaftaran pengguna baru.
/api/auth/logout: Menangani proses logout dengan menghapus token dari cookie.
/api/auth/forgot-password: Menangani permintaan reset password dan mengirim email reset password. (Belum Diimplementasikan)
/api/auth/reset-password: Menangani pengaturan password baru setelah menerima token reset password. (Belum Diimplementasikan)
Database
Menggunakan MongoDB sebagai database.
Fungsi dbConnect.ts digunakan untuk menghubungkan ke database MongoDB.
Model User didefinisikan menggunakan Mongoose untuk menyimpan data pengguna.
Keamanan
Menggunakan bcrypt untuk mengenkripsi password sebelum disimpan ke database.
Menggunakan JWT untuk autentikasi dan otorisasi.
Mengimplementasikan rate limiting untuk mencegah serangan brute force pada endpoint login dan signup.
Menggunakan middleware untuk melindungi rute yang memerlukan autentikasi.
Logging
Menggunakan Winston untuk pencatatan log.
Log disimpan dalam file combined.log dan error.log.
Pencatatan log meliputi aktivitas penting seperti login berhasil dan kesalahan.
Pengujian
Belum diimplementasikan secara menyeluruh.
Perlu ditambahkan pengujian unit, pengujian integrasi, dan pengujian end-to-end.



## Technologies Used

- Next.js
- React
- mongodb
-googlecloud api

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.