@echo off
echo Installing Dropbox Service as Windows Service...
echo.

REM Create a simple service wrapper
echo Creating service wrapper...

REM Create the service script
echo @echo off > dropbox-service-wrapper.bat
echo cd /d "D:\pc backup\Movie\crypto-club-69-main" >> dropbox-service-wrapper.bat
echo node dropbox-service.js >> dropbox-service-wrapper.bat

echo.
echo Service wrapper created!
echo.
echo To start the service manually, run: start-dropbox-service.bat
echo.
echo To run automatically on Windows startup:
echo 1. Copy start-dropbox-service.bat to Windows Startup folder
echo 2. Or add it to Windows Task Scheduler
echo.
echo Service will download files every 25 hours automatically!
echo.

pause
