# ♻️ UpcycleBot

Turn waste into creativity using AI.

---

## 🚀 Overview

UpcycleBot is an AI-powered mobile application that helps users transform everyday waste into creative DIY upcycling ideas.

Instead of throwing away items like bottles, clothes, or jars, users can input them into the app and instantly receive:
- Creative reuse ideas  
- Required materials  
- Step-by-step instructions  

---

## ✨ Features

- 🧠 AI-generated upcycling ideas  
- 📋 Step-by-step instructions  
- 🧰 Materials + difficulty level  
- 💥 Interactive gravity-style UI animation  
- 📱 Mobile-first design (React Native + Expo)  
- ⚡ Fast and lightweight backend  

---

## 🧠 How It Works

1. User enters an item (e.g., "old bottle")
2. Request is sent to backend (Node.js API)
3. AI processes input and generates structured ideas
4. Results are returned and displayed with animation

---

## 🏗️ Architecture

Frontend (React Native / Expo)
↓
Backend (Node.js + Express)
↓
AI Layer (OpenAI / fallback logic)

---

## 🧰 Tech Stack

- **Frontend:** React Native (Expo)
- **Backend:** Node.js + Express
- **AI:** OpenAI API (with fallback system)
- **Animations:** React Native Animated API
- **Development:** Cursor AI

---

## 💡 Problem

Around 30% of usable items are discarded due to lack of awareness and creative ideas for reuse.

---

## ✅ Solution

UpcycleBot provides instant, AI-powered upcycling ideas, making sustainability:
- Practical  
- Accessible  
- Engaging  

---

## 🌍 Impact

- Reduces waste  
- Encourages eco-friendly habits  
- Promotes creativity  
- Makes sustainability interactive  

---

## ⚙️ Setup Instructions

### 🔹 Backend

```bash
cd backend
npm install
npm run dev

### 🔹 Frontend
cd frontend
npm install
npx expo start

🚀 Future Improvements

We plan to expand UpcycleBot with:

📸 Image input (scan items using camera)
🎯 Personalized recommendations based on user history
🧠 Improved AI suggestions with better context
🛍️ Marketplace for sharing/selling upcycled creations
🌐 Web version of the app
🎨 Enhanced UI (glassmorphism, animations)



