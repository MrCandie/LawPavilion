# LawPavillon Dashboard

A simple, responsive admin dashboard built with **React**, **Vite**, **Tailwind CSS**, and **Firebase**. Includes light/dark mode toggle, authentication, sidebar navigation, and basic testing using **Vitest** and **Testing Library**.

---

## 🔧 Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/lawpavillon-dashboard.git
   cd lawpavillon-dashboard
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Run tests:**

   ```bash
   npm run test
   ```

# ⚖️ Decisions & Trade-Offs

- Tailwind for styling: We chose Tailwind CSS for rapid styling and dark mode support out of the box.

- No backend API: Mocked logic and localStorage are used instead of a real backend for simplicity.

- Dark mode toggle: Uses Tailwind's dark: class strategy, storing preference in localStorage.

- Minimal Firebase setup: Authentication is handled with Firebase Auth; Firestore is set up but not heavily used.

- Testing: Vitest was used over Jest for better Vite integration. Some DOM-based tests required adding proper id and htmlFor props to be accessible by getByLabelText().

- 🚀 Features
- 🔒 Firebase Authentication

- 🌗 Light/Dark Mode Toggle

- 📊 Dashboard with metrics and charts

- 📱 Responsive Sidebar (with slide-in on mobile)

- ✅ Unit tests with Vitest
