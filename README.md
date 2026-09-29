# E-Cell DAV Jalandhar - Official Digital Platform

> **"Ideas Into Impact."**  
> The official digital ecosystem platform for the Entrepreneurship Cell of DAV College, Jalandhar (Punjab). Built with React 19, Vite, Tailwind CSS, REST-style PHP APIs, and MySQL.

---

## 🚀 Key Features

* **🎨 Modern Neumorphism + Glassmorphism Dark UI:** Tailored with electric blue & cyan accents, subtle glow effects, responsive typography, and refined micro-interactions.
* **📅 Event Management System:** Real-time event listings, categorized by *Workshop, Competition, Seminar, Talk, Bootcamp*, with details, schedule timeline, speaker profiles, eligibility, and rules.
* **🎫 Verified Registration Engine:**
  * Generates a unique registration ID (e.g. `ECELL-2026-00124`).
  * Instant digital delegate pass with QR layout and printable/PDF export.
  * Duplicate submission prevention and seat capacity limits.
* **👥 Team & Leadership Showcase:** Categorized committee rosters for *Faculty / Mentors, Core Team, Event Team, Creative Team, Technical Team, and Marketing & PR*.
* **🏆 Achievements & Milestones:** Verifiable certificates, national ideathon wins, and campus incubation milestone records.
* **📸 Masonry Photo Gallery:** Responsive lightbox image viewer with category filters and keyboard shortcuts.
* **📚 Founder Resource Vault:** Free downloadable startup templates, PDF validation canvases, and curated tool directory.
* **🔐 Complete Admin CMS Dashboard (`/admin`):**
  * Overview statistics & real-time metric counters
  * Event CRUD & registration mode toggles (*Internal Form, External Link, Closed*)
  * Registration manager with **one-click CSV export** and attendance tracking (*Confirmed / Attended / Cancelled*)
  * Team member management with leadership highlights
  * Gallery image upload manager
  * Achievements & Resources manager
  * Contact inquiry inbox with email replies
  * Live homepage statistics & social link editor

---

## 🛠️ Technology Stack

### Frontend
* **Core:** React 19 + JavaScript (ESNext)
* **Build Tool:** Vite
* **Routing:** React Router v7
* **Styling:** Tailwind CSS + Vanilla Glassmorphic CSS Design System
* **Icons:** Lucide React + Custom SVG Social Icons
* **Animations & Effects:** Smooth CSS transitions + Canvas Confetti celebration

### Backend
* **Runtimes:** PHP 8.0+
* **Architecture:** Modular RESTful PHP APIs with JSON outputs
* **Security:** PDO Prepared Statements, SQL Injection protection, Password Hashing (`password_hash`), lightweight JWT token authentication, and MIME-validated file uploads.
* **Database:** MySQL 5.7+ / 8.0+ with foreign keys, indexes, and comprehensive seed data.

---

## 📁 Project Structure

```text
ecell-dav/
│
├── frontend/
│   ├── public/
│   │   ├── logo.svg
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── TeamCard.jsx
│   │   │   ├── GalleryModal.jsx
│   │   │   ├── RegistrationReceipt.jsx
│   │   │   ├── SocialIcons.jsx
│   │   │   └── ScrollToTop.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── data/
│   │   │   └── defaultData.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── EventDetails.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Team.jsx
│   │   │   ├── OurWork.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Achievements.jsx
│   │   │   ├── Resources.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       └── AdminDashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── backend/
│   ├── config/
│   │   ├── database.php
│   │   ├── cors.php
│   │   └── jwt_helper.php
│   ├── auth/
│   │   ├── login.php
│   │   └── check.php
│   ├── api/
│   │   ├── events.php
│   │   ├── register.php
│   │   ├── registrations.php
│   │   ├── team.php
│   │   ├── gallery.php
│   │   ├── achievements.php
│   │   ├── resources.php
│   │   ├── contact.php
│   │   ├── stats.php
│   │   ├── settings.php
│   │   ├── dashboard.php
│   │   └── upload.php
│   ├── uploads/
│   ├── .env.example
│   ├── .htaccess
│   └── index.php
│
└── database/
    └── schema.sql
```

---

## ⚙️ Quick Start (Local Setup)

### 1. Database Setup
1. Start your MySQL Server (e.g. via XAMPP, WAMP, Docker, or native MySQL).
2. Create and seed the database by running:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
   *Or import `database/schema.sql` directly inside phpMyAdmin.*

### 2. Backend Setup
1. Point your web server (Apache/Nginx/PHP built-in server) to the project or `backend/` directory:
   ```bash
   cd backend
   php -S localhost:8000
   ```
2. Configure database credentials in `backend/.env` (or environment variables):
   ```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=ecell_dav
   DB_USER=root
   DB_PASS=
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   npm install
   ```
2. *(Optional)* Set API URL in `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:8000
   ```
3. Launch the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛡️ Admin Portal Credentials

* **URL:** `/admin/login` or `/admin`
* **Default Username:** `admin` *(or `ecell@davjalandhar.ac.in`)*
* **Default Password:** `admin123`
*(Password can be updated anytime inside the MySQL database or via the admin settings).*

---

## 🌐 Production Deployment

### Option A: Shared Apache / cPanel Hosting
1. Build the production React frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Upload the contents of `frontend/dist/` to `public_html/`.
3. Upload the `backend/` folder to `public_html/backend/`.
4. Import `database/schema.sql` via cPanel phpMyAdmin.
5. Update `backend/config/database.php` with your database credentials.

### Option B: Separate Frontend (Vercel / Netlify) & Backend (VPS / PHP Host)
1. Deploy `frontend/` to Vercel/Netlify with environment variable `VITE_API_URL=https://api.yourdomain.com`.
2. Deploy `backend/` to your PHP 8.0+ server with CORS enabled.

---

## 📜 License & Attribution

Designed & Developed for **E-Cell DAV College, Jalandhar** • Punjab, India.  
All brand names and college affiliations belong to DAV College Jalandhar.
