# Dropbox Background Service Startup Script
# This script starts the Dropbox service automatically

Write-Host "🚀 Starting Dropbox Background Service..." -ForegroundColor Green
Write-Host "📅 Service will run every 25 hours automatically" -ForegroundColor Cyan
Write-Host "📁 Downloading from Dropbox main/ folder" -ForegroundColor Yellow
Write-Host "💾 Saving to ./public/dropbox-downloads/" -ForegroundColor Magenta
Write-Host ""

# Change to the project directory
Set-Location "D:\pc backup\Movie\crypto-club-69-main"

# Start the service
Write-Host "✅ Starting service..." -ForegroundColor Green
node dropbox-service.js

Write-Host ""
Write-Host "Service stopped. Press any key to exit..." -ForegroundColor Red
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
