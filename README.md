# 🍷 eCellar – Frontend

**eCellar** is a wine cellar management and social platform built with React, TypeScript, and Bootstrap. This repository contains the frontend application.

---

## 🚀 Features

- 🔍 Advanced wine search (by name, producer, grape, etc.)
- 🖼️ Dynamic wine cards with bottle previews
- 👤 User login and profile page with editable information
- 🌙 Light/Dark theme switch
- 🛒 Purchase proposals
- 🎨 Responsive layout with Bootstrap 5

---

## 🧱 Tech Stack

- **React** (with Vite)
- **TypeScript**
- **Bootstrap 5** + custom CSS
- **React Router DOM v7**
- **Axios** for API requests
- **JWT** auth integration with backend

---

## ⚙️ Getting Started

### 🔗 Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Backend API running (see [eCellar backend repository](https://github.com/tuo-utente/ecellar-backend))

### 🧪 Installation

```bash
git clone https://github.com/tuo-utente/ecellar-frontend.git
cd ecellar-frontend
npm install
# or
yarn install
```

### ▶️ Run the development server

```bash
npm run dev
# or
yarn dev
```

The app will start at [http://localhost:3000](http://localhost:3000)

Make sure the backend is running at `http://localhost:3001`

---

## 🗂️ Project Structure

```
src/
├── assets/            # Static images (logos, bottle icons)
├── components/        # Reusable UI components
├── pages/             # Main views (Homepage, Profile, Wines...)
├── services/          # API calls using Axios
├── types/             # TypeScript types and interfaces
├── App.tsx            # Main component with routes
├── App.css            # Global styles
└── main.tsx           # Vite entry point
```

---

## 🔐 Authentication

Authentication uses JWT stored in `localStorage`. A custom login modal handles email/password login, with styled buttons for Google and Facebook (UI only).

---

## 🙌 Contributing

Feel free to fork this repo and submit pull requests. All contributions are welcome!

1. Open an issue first to propose a feature or report a bug
2. Fork the repo and create a feature branch
3. Submit a PR with a clear explanation

---

## 🐞 Bug Reports

Found a bug or a problem?  
Please [open an issue](https://github.com/tuo-utente/ecellar-frontend/issues) or contact the maintainer.

---

## 👤 Maintainer

- Andrea Freddi

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 🛡️ Copyright

© 2025 Andrea Freddi. All rights reserved.

The source code, design, and content of this application are protected by copyright law.  
Unauthorized use, reproduction, or distribution is strictly prohibited without written permission.
