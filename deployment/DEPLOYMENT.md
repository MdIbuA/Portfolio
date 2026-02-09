# Portfolio Full Stack Deployment Guide

This guide explains how to deploy your **React Frontend** to GitHub Pages and your **FastAPI Backend** to Render.

---

## 🏗️ Architecture

- **Frontend**: GitHub Pages (Static Hosting)
- **Backend**: Render (Dynamic Python App)
- **Database**: Ephemeral SQLite (Resets on restart) -> *Upgradable to Postgres later if needed.*

---

## 🚀 Step 1: Deploy Backend (Render)

1.  **Push your code to GitHub.**
2.  **Sign up for Render** (https://render.com).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  **Settings**:
    -   **Name**: `portfolio-backend`
    -   **Runtime**: Python 3
    -   **Build Command**: `pip install -r backend/requirements.txt`
    -   **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT --app-dir backend`
6.  **Environment Variables**:
    -   Click "Advanced" or "Environment".
    -   Add `OPENROUTER_API_KEY` = `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`
    -   Add `OPENROUTER_MODEL` = `meta-llama/llama-3.2-3b-instruct`
7.  Click **Create Web Service**.
8.  **Wait** for deployment to finish.
9.  **Copy your Backend URL** (e.g., `https://portfolio-backend.onrender.com`).

---

## 🎨 Step 2: Configure Frontend (GitHub Pages)

1.  **Update `.env.production`**:
    Create a file named `.env.production` in the project root:
    ```env
    VITE_API_BASE_URL=https://<YOUR-RENDER-BACKEND-URL>
    ```
    *(Replace `<YOUR-RENDER-BACKEND-URL>` with the real URL from Step 1)*

2.  **Check Repository Name**:
    -   Open `vite.config.ts`.
    -   Ensure `base: '/Portfolio/'` matches your GitHub repository name.
    -   If your repo is named `my-portfolio`, change it to `base: '/my-portfolio/'`.

3.  **Deploy**:
    Run this command locally:
    ```powershell
    npm run deploy
    ```
    This script will:
    -   Build your React app.
    -   Push the `dist` folder to the `gh-pages` branch.

4.  **Visit your site**:
    Go to `https://MdIbuA.github.io/Portfolio` (or your repo URL).

---

## ✅ Verification

-   Open your live GitHub Pages site.
-   Click the **Ibu AI** button.
-   Ask "Who are you?".
-   If it responds, your Full Stack connection is working!

---

## ⚠️ Notes

1.  **Database Reset**: Since we use SQLite on the free tier of Render, the chat history database will reset every time the backend restarts (usually after 15 mins of inactivity). This is fine for a portfolio demo.
2.  **Cold Starts**: The free backend spins down when unused. The first request might take 30-50 seconds. Just be patient!
