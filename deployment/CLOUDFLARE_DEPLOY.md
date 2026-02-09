# Cloudflare Tunnel Deployment Guide

This guide explains how to expose your local Portfolio + AI Backend to the public internet using Cloudflare Tunnel (`cloudflared`).

## 🏗️ Architecture

We use **Cloudflare Tunnel** to securely route traffic from the internet to your local machine without opening ports.

- **Frontend**: Serves the built React app (Static files)
- **Backend**: Runs the FastAPI server
- **Ingress**: A single Cloudflare Tunnel routes traffic to both services based on the subdomain.

---

## 🚀 Quick Start (No Custom Domain)

If you **do not** own a domain name, use this quick method to generate random public URLs.

### 1. Start the Backend Tunnel
Open a new terminal (maintain this window open):
```powershell
# Start Backend on port 8000
python -m app.main
```

Open *another* terminal for the tunnel:
```powershell
# Create a tunnel for the backend
cloudflared tunnel --url http://localhost:8000
```
> **Copy the URL** provided (e.g., `https://funny-name.trycloudflare.com`). This is your **Backend URL**.

### 2. Configure & Build Frontend
Update your frontend to use this new public Backend URL.

1. Create/Edit `.env.production` in the project root:
   ```env
   VITE_API_BASE_URL=https://<YOUR-BACKEND-URL-FROM-STEP-1>
   ```
2. Build the frontend:
   ```powershell
   npm run build
   ```

### 3. Start the Frontend Tunnel
Open a third terminal:
```powershell
# Serve the build and tunnel it
npx serve -s dist -l 3000
```

Open a fourth terminal:
```powershell
# Create a tunnel for the frontend
cloudflared tunnel --url http://localhost:3000
```
> **Copy this URL.** This is your **Public Portfolio URL**. Share it!

---

## 🏆 Production Setup (Custom Domain)

If you own a domain (e.g., `ibrahim.dev`) in Cloudflare, use this robust method with `config.yml`.

### 1. Authenticate & Create Tunnel
```powershell
# Login to Cloudflare
cloudflared tunnel login

# Create a new named tunnel
cloudflared tunnel create portfolio-tunnel
```
*Copy the Tunnel ID (UUID) returned by the create command.*

### 2. Configure Ingress (`deployment/config.yml`)
Edit `deployment/config.yml` with your UUID and domain:

```yaml
tunnel: <YOUR-UUID>
credentials-file: C:\Users\MOHAMED IBRAHIM A\.cloudflared\<YOUR-UUID>.json

ingress:
  # Route /api/* to Backend
  - hostname: api.ibrahim.dev
    service: http://localhost:8000
  
  # Route root to Frontend
  - hostname: ibrahim.dev
    service: http://localhost:3000
  
  # Catch-all
  - service: http_status:404
```

### 3. Route DNS
Map your domains to the tunnel:
```powershell
cloudflared tunnel route dns portfolio-tunnel api.ibrahim.dev
cloudflared tunnel route dns portfolio-tunnel ibrahim.dev
```

### 4. Build for Production
Ensure frontend knows the production API URL:
```powershell
# Set API URL for build
$env:VITE_API_BASE_URL = "https://api.ibrahim.dev"
npm run build
```

### 5. Run Everything
Use the provided script to start services and the tunnel:
```powershell
./deployment/start_production.ps1
```

---

## ✅ Verification Checklist

- [ ] **Backend is Running**: `curl https://api.yourdomain.com/health` returns `{"status": "healthy"}`.
- [ ] **Frontend Loads**: Accessing the main URL loads the portfolio.
- [ ] **CORS is Configured**: The API accepts requests from the Frontend URL.
- [ ] **AI Chat Works**: Sending a message to Ibu returns a response (database connection successful).
- [ ] **No Localhost**: Inspect Network tab in browser; all API calls go to `https://api...`, not `localhost`.
