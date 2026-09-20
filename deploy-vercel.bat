@echo off
echo ===================================================
echo   EduPath - 1-Click Vercel Deployment
echo ===================================================
echo.
echo Deploying EduPath to Vercel...
echo.
npx vercel --prod

echo.
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] EduPath deployed to Vercel successfully!
) else (
    echo [INFO] You can also deploy via GitHub:
    echo 1. Go to https://vercel.com/new
    echo 2. Import "edupath" from your GitHub account
    echo 3. Click "Deploy"
)
pause
