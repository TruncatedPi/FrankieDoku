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

:: 3. Process arguments (preview / build / dev)
if /i "%~1"=="build" goto do_build
if /i "%~1"=="preview" goto do_preview

:do_dev
echo [INFO] Launching Vite Development Server...
echo   * Local URL:   http://localhost:3000/
echo   * Mobile URL:  Check the Network IP address displayed below (e.g. for Pixel 9)
echo.
start "" http://localhost:3000/
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
echo [INFO] Launching Production Preview Server...
echo   * Local URL:   http://localhost:4173/
echo   * Mobile URL:  Check the Network IP address displayed below
echo.
start "" http://localhost:4173/
call npm run preview -- --host 0.0.0.0 --port 4173
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Preview server exited with error code %errorlevel%.
    pause
)
exit /b %errorlevel%
