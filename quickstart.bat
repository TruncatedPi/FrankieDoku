@echo off
setlocal enabledelayedexpansion

:: Ensure script runs from the repository root
cd /d "%~dp0"
title SchroDoku Server

echo =======================================================
echo              SchroDoku - Quickstart Server
echo =======================================================
echo.

:: 1. Verify Node.js and npm are installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js was not found in your system PATH.
    echo Please download and install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm was not found in your system PATH.
    echo Please verify your Node.js installation.
    echo.
    pause
    exit /b 1
)

:: 2. Check and install dependencies if node_modules is missing
if not exist "node_modules\" (
    echo [INFO] Missing dependencies detected. Running npm install...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
    echo.
)

:: 3. Detect LAN IP for mobile access (Pixel 9 / phone on local Wi-Fi)
set "LAN_IP="
for /f "tokens=*" %%A in ('node -e "const os=require('os'); const nets=os.networkInterfaces(); for(const name of Object.keys(nets)){ if(/vEthernet|wsl|loopback|virtual/i.test(name)) continue; for(const net of nets[name]){ if((net.family==='IPv4' || net.family===4) && !net.internal && !net.address.startsWith('169.254')) { console.log(net.address); process.exit(0); } } }" 2^>nul') do (
    set "LAN_IP=%%A"
)

:: 4. Process arguments (preview / build / dev)
if /i "%~1"=="build" goto do_build
if /i "%~1"=="preview" goto do_preview

:do_dev
set "PORT=3000"
echo =======================================================
echo   🐱 SchroDoku URLs to Use:
echo =======================================================
echo   * Desktop Browser:  http://localhost:%PORT%/
if defined LAN_IP (
    echo   * Pixel 9 / Phone:  http://!LAN_IP!:%PORT%/
) else (
    echo   * Pixel 9 / Phone:  (Connect phone to local Wi-Fi)
)
echo =======================================================
echo.
echo Opening browser at http://localhost:%PORT%/ ...
start "" "http://localhost:%PORT%/"
echo.
call npm run dev
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Server exited with error code %errorlevel%.
    pause
)
exit /b %errorlevel%

:do_build
echo [INFO] Building production bundle (tsc ^& vite build)...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed.
    pause
    exit /b 1
)
echo.
echo [INFO] Build succeeded! Output in dist\
pause
exit /b 0

:do_preview
set "PORT=4173"
if not exist "dist\" (
    echo [INFO] dist\ folder not found. Building first...
    call npm run build
    if %errorlevel% neq 0 (
        echo [ERROR] Build failed.
        pause
        exit /b 1
    )
    echo.
)
echo =======================================================
echo   🐱 SchroDoku Preview URLs to Use:
echo =======================================================
echo   * Desktop Browser:  http://localhost:%PORT%/
if defined LAN_IP (
    echo   * Pixel 9 / Phone:  http://!LAN_IP!:%PORT%/
) else (
    echo   * Pixel 9 / Phone:  (Connect phone to local Wi-Fi)
)
echo =======================================================
echo.
echo Opening browser at http://localhost:%PORT%/ ...
start "" "http://localhost:%PORT%/"
echo.
call npm run preview -- --host 0.0.0.0 --port %PORT%
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Preview server exited with error code %errorlevel%.
    pause
)
exit /b %errorlevel%
