@echo off
echo =======================================================
echo          GROCERY APP STARTUP SCRIPT
echo =======================================================
echo.
echo 1. Killing any stuck background processes...
taskkill /F /IM node.exe >nul 2>&1
echo.
echo 2. Starting Backend Server (Port 5001)...
start "Backend Server" cmd.exe /k "cd /d %~dp0server && npm start"
echo.
echo 3. Starting Frontend React App (Port 3000)...
start "Frontend App" cmd.exe /k "cd /d %~dp0client && npm run dev"
echo.
echo SUCCESS! Two new terminal windows have been opened.
echo IMPORTANT: Leave those two black windows open while using the app!
echo =======================================================
pause
