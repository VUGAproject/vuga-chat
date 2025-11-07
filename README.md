# 🌍 VUGA — AI-Powered Kinyarwanda Learning Platform

![VUGA Preview](app/\(chat\)/opengraph-image.png)

VUGA is an **AI-powered language learning web application** designed to help users learn **Kinyarwanda** through interactive chat conversations, cultural context, and guided lessons.

Built with **Next.js**, **TypeScript**, and **Vercel’s AI SDK**, VUGA blends modern web technologies with conversational AI to create a natural, intuitive learning experience.

---

## ✨ Features

* 🗣️ **Conversational Learning** – Users practice real Kinyarwanda dialogue through guided chat interactions.
* 🧠 **Smart Lesson Flow** – Lessons are structured by difficulty and topic (Greetings, Family, Food, Directions).
* 🔊 **Text-to-Speech** – Hear Kinyarwanda phrases spoken aloud to improve pronunciation.
* 💾 **Progress Persistence** – Saves your place automatically using `localStorage`, so you can continue where you left off.
* 📚 **Modern Tech Stack** – Built with Next.js 15, Tailwind CSS, and TypeScript for speed and reliability.
* ☁️ **Deployed on Vercel** – Zero-config hosting with serverless functions and optimized build pipelines.

---

## 🏗️ Tech Stack

| Technology                   | Purpose                                      |
| ---------------------------- | -------------------------------------------- |
| **Next.js 15**               | App routing, React components, SSR/SSG       |
| **TypeScript**               | Type-safe development                        |
| **Tailwind CSS**             | Fast, responsive styling                     |
| **Vercel AI SDK**            | Handles chat logic and AI model interactions |
| **PostCSS + Autoprefixer**   | CSS preprocessing                            |
| **localStorage API**         | Persists lesson progress on the client       |
| **Framer Motion / Radix UI** | Animation & accessibility components         |

---

## 📖 Lesson Structure

Each lesson introduces vocabulary, phrases, and cultural context through conversation examples.

**Example Lessons:**

1. **Greetings & Introductions** – Learn how to say hello and introduce yourself.
2. **Family & Relationships** – Talk about family members and describe relationships.
3. **Food & Dining** – Order food, learn common dishes, and discuss eating habits.
4. **Directions & Transportation** – Learn how to ask for directions and navigate everyday situations.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/VUGAproject/vuga-chat.git
cd vuga-chat
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run Locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧩 Project Structure

```
vuga-chat/
├── app/                 # Next.js App Router
│   ├── (auth)/          # Authentication routes
│   ├── (chat)/          # Chat pages & APIs
│   ├── globals.css      # Global styles
│   └── layout.tsx       # Root layout
├── components/          # Reusable React components
│   └── LessonCards.tsx  # Lesson selector component
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and data
├── public/              # Static assets
├── package.json
├── tailwind.config.js
└── vercel.json
```

---

## ☁️ Deployment

VUGA is deployed on [Vercel](https://vercel.com), using these custom build commands:

```json
{
  "installCommand": "pnpm install --no-frozen-lockfile",
  "buildCommand": "next build"
}
```

---

## 🧠 Vision

VUGA’s goal is to make **learning African languages accessible** through conversational technology.
Starting with Kinyarwanda, it aims to expand into other underrepresented languages — combining **AI**, **culture**, and **community**.

---

## 🩵 Credits

Developed by **Marie-Chantal Nyirahategekimana**
Refactored from the [Vercel Next.js AI Chatbot template](https://vercel.com/templates/next.js/nextjs-ai-chatbot)

---

