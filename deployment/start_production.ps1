# Start Production Services for Cloudflare Tunnel

Write-Host "🚀 Starting Portfolio Backend (Port 8000)..." -ForegroundColor Green
Start-Process -FilePath "python" -ArgumentList "-m app.main" -WindowStyle Minimized

Write-Host "🚀 Serving Frontend Build (Port 3000)..." -ForegroundColor Green
Write-Host "Make sure you ran 'npm run build' first!" -ForegroundColor Yellow

# Use npx serve to host the static files
npx serve -s dist -l 3000

# Note: The tunnel itself should be started in a separate window:
# cloudflared tunnel run <NAME>
