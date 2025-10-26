@echo off
echo Starting Dropbox Background Service...
echo Service will run every 25 hours automatically
echo Press Ctrl+C to stop the service
echo.

cd /d "D:\pc backup\Movie\crypto-club-69-main"
node dropbox-service.js

pause
