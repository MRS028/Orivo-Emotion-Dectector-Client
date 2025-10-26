# 🎨 Orivo Emotion Detection Frontend

A **React + TypeScript** frontend for the **Emotion Detection API**.  
This app lets users register, analyze text, view their emotion history, and manage saved emotions in an easy-to-use UI.

---

## 🚀 Features

- 🔑 User registration (with name + email)
- ✍️ Input text and detect emotion
- 📊 View emotion history (linked to email)
- 🗑️ Delete individual emotions
- ♻️ Clear all emotions
- ⚡ Responsive UI with **ShadCN UI + Tailwind CSS**
- 🌐 Communicates with backend via **Axios**

---

## 📂 Project Structure

```

frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Main pages (Home, TextAnalyze, etc.)
│   ├── Hooks/          # Custom React hooks
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── public/
│   └── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .env

````

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/MRS028/Orivo-Emotion-Dectector-Client.git
cd emotion-detection-frontend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Run the app

```bash
npm run dev
```

The app will start on 👉 `http://localhost:5173`

---

## 📌 Pages Overview

| Page             | Description                     |
| ---------------- | ------------------------------- |
| **Home**         | Landing page with basic info    |
| **Register**     | Register a user (name + email)  |
| **Text Analyze** | Enter text → detect emotion     |
| **History**      | View, delete, or clear emotions |

---

## 🔗 API Integration

The frontend communicates with the backend API:

* **Register User** → `POST /api/users/register`
* **Get User** → `GET /api/users/email/:email`
* **Save Emotion** → `POST /api/emotions`
* **Get Emotions** → `GET /api/emotions?email=user@example.com`
* **Delete Emotion** → `DELETE /api/emotions/:id`
* **Clear Emotions** → `DELETE /api/emotions?email=user@example.com`

---

## 🛠️ Tech Stack

* [React](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/)
* [Axios](https://axios-http.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [ShadCN UI](https://ui.shadcn.com/)
* [Lucide Icons](https://lucide.dev/)

---

## ✅ Future Improvements

* JWT authentication
* Dark mode support
* Charts/graphs for emotion trends
* Multi-language support

---

## 📜 License

This project is licensed under the **MIT License**.

```

```
