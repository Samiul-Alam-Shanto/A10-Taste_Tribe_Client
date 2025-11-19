<div align="center">

  <img src="https://cdn-icons-png.flaticon.com/512/706/706164.png" alt="TasteTribe Logo" width="120" />

  # 🍽️ TasteTribe
  ### A Community for Food Explorers & Local Taste Seekers.

  <p align="center">
    <b>Discover</b> hidden gems • <b>Share</b> culinary stories • <b>Celebrate</b> local flavors
  </p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-v19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
    <img src="https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=react-query&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/Firebase-v12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  </p>

  <!-- Quick Links -->
  <p>
    <a href="https://taste-tribe-food.web.app"><strong>🌐 Live Demonstration</strong></a>
    &nbsp;&nbsp;•&nbsp;&nbsp;
    <a href="https://github.com/Samiul-Alam-Shanto/A10-Taste_Tribe_Server.git"><strong>⚙️ Server Repository</strong></a>
    &nbsp;&nbsp;•&nbsp;&nbsp;
    <a href="#-installation-guide"><strong>⬇️ Installation</strong></a>
  </p>

</div>

---

## 🚀 Project Overview

**TasteTribe** is a robust MERN Stack application tailored for the modern foodie. It bridges the gap between casual dining and culinary exploration by allowing users to document their food journeys. 

From street stalls to fine dining, TasteTribe leverages **MongoDB's powerful regex search** and **TanStack Query's caching** to deliver a lightning-fast, seamless experience. This isn't just a review site; it's a social platform where every meal tells a story.

---

## 🌟 Feature Highlights

| 🔭 **Discovery & Search** | 👤 **User Experience** |
| :--- | :--- |
| **Smart Search Engine**<br>Instantly find specific dishes using MongoDB's `$regex` indexing. | **Authentication Suite**<br>Secure Google & Email login powered by Firebase Auth v12. |
| **Dynamic Review System**<br>Post detailed reviews with ratings, images, and location data. | **Responsive Design**<br>Mobile-first UI built with Tailwind 4 & DaisyUI 5. |
| **Global Feed**<br>A public showcase of the latest culinary adventures from the community. | **Theme Personalization**<br>Persistent Light/Dark mode using LocalStorage. |

| 🛡️ **Security & CRUD** | ⚡ **Performance & UI** |
| :--- | :--- |
| **Protected Routes**<br>Private access for "My Reviews" and "Add Review" pages. | **Optimized Data Fetching**<br>Powered by TanStack Query 5 for instant re-validation. |
| **Personal Dashboard**<br>Full control to Edit, Delete, or Update your own submissions. | **Interactive Feedback**<br>SweetAlert2 modals & Hot Toast notifications. |
| **Favorites Collection**<br>Curate your own "Must-Eat" list with a single click. | **Animations**<br>Smooth scroll reveals via AOS & React Awesome Reveal. |

---

## 🧩 Tech Stack Breakdown

This project uses the latest bleeding-edge versions of modern web technologies.

### 🎨 Frontend Client
*   **Framework:** `React 19` + `Vite 7`
*   **Styling:** `Tailwind CSS 4` + `DaisyUI 5` + `Styled Components`
*   **State Management:** `TanStack Query v5` (Server State)
*   **Forms:** `React Hook Form`
*   **Routing:** `React Router 7`
*   **Animations:** `AOS` + `React Awesome Reveal`

### 🔌 Backend & Integration
*   **API Handling:** `Axios` (Interceptor based)
*   **Authentication:** `Firebase v12`
*   **Notifications:** `React Toastify` + `SweetAlert2`
*   **Backend Logic:** `Node.js` + `Express.js` (See Server Repo)
*   **Database:** `MongoDB`

---

## 📂 Page Structure

*   **🏠 Home:** Hero Section, Trending Reviews, "Meet the Team".
*   **🍴 All Reviews:** Filterable grid of all community posts.
*   **✍️ Add Review:** *(Private)* Advanced form to submit new food experiences.
*   **📊 My Reviews:** *(Private)* Dashboard to manage your contributions.
*   **❤️ My Favorites:** *(Private)* Your personal bookmark list.
*   **🔐 Auth Pages:** Login and Registration with social providers.
*   **⚙️ 404:** Custom "Plate Empty" error page.

---

## 💻 Installation Guide

Follow these instructions to set up the **Client-Side** locally.

### 1. Prerequisites
Ensure you have **Node.js (v18+)** installed.

### 2. Clone the Repositories
```bash
# Clone Client
git clone https://github.com/your-username/a10-taste-tribe-client.git
cd a10-taste-tribe-client
```
### 3.Install Dependencies
```bash
npm install
```
### 4.Environment Configuration
```bash
# Firebase Configuration
VITE_apiKey=your_api_key
VITE_authDomain=your_project.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project.appspot.com
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id

# Backend API URL (Local or Production)
VITE_API_URL=http://localhost:5000
```
### 5. Launch Development Server
```bash
npm run dev
```
## 👨‍💻 Author
Samiul Alam Shanto
MERN Stack Developer
Building digital experiences that connect people with their passions.
<div align="left">
<a href="mailto:samiulalam220@gmail.com">
<img src="https://img.shields.io/badge/Gmail-samiulalam220%40gmail.com-red?style=flat-square&logo=gmail" alt="Email" />
</a>
<a href="https://github.com/Samiul-Alam-Shanto">
<img src="https://img.shields.io/badge/GitHub-Samiul--Alam--Shanto-181717?style=flat-square&logo=github" alt="GitHub" />
</a>
</div>
<p align="center">
© 2025 TasteTribe. Built with ❤️ and ☕.
</p>
