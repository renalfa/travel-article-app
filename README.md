# Travel Article App with PWA

Repositori ini berisi implementasi aplikasi web untuk menampilkan referensi destinasi traveling. Proyek ini dirancang untuk memudah kan user dalam menemukan referensi traveling dengan desain UI responsif dan mendukung teknologi PWA (Progressive Web App).

## 🚀 Fitur

### Explore Page
- Desain responsif untuk semua jenis perangkat.
- Menampilkan kategori dan juga beranda destinasi dengan pendekatan infinite scroll.
- Mengambil data dari endpoint API yang disediakan.

### Dashboard Page
- Menampilkan informasi data mengenai Article yang ada.
- Data tetap tersedia meskipun halaman di-refresh.
- Ditampilkan data berupa chart

### Article Page
- Menampilkan List Article dari user yang login.
- Mengelola data article, mulai dari menambahkan, mengedit dan juga menghapus article.

### Category Page
- Menampilkan List Category.
- Mengelola data category, mulai dari menambahkan, mengedit dan juga menghapus category.

### Profile Page
- Menampilkan data profile dari user yang login.
- Menampilkan list article yang pernah di review/comment.

## 🛠️ Teknologi yang Digunakan

- **Framework**: [Vite](https://vite.dev/)
- **State Management**: [Redux](https://redux.js.org/)
- **Styling**: Tailwind CSS
- **API Integration**: Axios atau Fetch API
- **Utilities**: Day.js untuk manipulasi tanggal.

## 📦 Instalasi dan Setup

1. Clone the repository:

```bash
git clone git@github.com:renalfa/travel-article-app.git
```
2. Navigate to the project directory:

```bash
cd travel-article-app
```
3. Install the dependencies:

```bash
yarn install
```
4. Run the development server:

```bash
yarn dev
```
