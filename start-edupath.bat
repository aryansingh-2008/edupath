@echo off
title EduPath - Adaptive Career Learning Agent
echo ============================================================
echo   EduPath: The Adaptive AI Career Learning Agent
echo   Starting development server on http://localhost:3000...
echo ============================================================
cd /d "%~dp0"
start http://localhost:3000
call npm run dev
pause
