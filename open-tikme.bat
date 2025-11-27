@echo off
REM Script to open TikMe HTML file on Windows

echo Dang mo TikMe trong trinh duyet...

REM Try to open with default browser
start "" "%~dp0tikme-v5-ultimate.html"

if errorlevel 1 (
    echo.
    echo Khong the mo file tu dong.
    echo Vui long mo file thu cong:
    echo %~dp0tikme-v5-ultimate.html
    pause
)
