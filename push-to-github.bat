@echo off
echo ===================================================
echo   EduPath - Push to GitHub (Aryan Singh)
echo ===================================================
echo.
echo Checking Git status...
git status

echo.
echo If your repository is not yet created on GitHub:
echo 1. Go to https://github.com/new
echo 2. Repository name: edupath
echo 3. Visibility: Public (or Private)
echo 4. Do NOT initialize with README (already created locally)
echo 5. Click "Create repository"
echo.
pause

echo.
echo Setting remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/aryansingh-2008/edupath.git

echo.
echo Pushing to origin master/main...
git branch -M main
git push -u origin main

echo.
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] Code pushed successfully to https://github.com/aryansingh-2008/edupath
) else (
    echo [NOTE] If prompted for credentials:
    echo   Username: aryansingh-2008
    echo   Password: Use your GitHub Personal Access Token (PAT)
    echo   Create one at: https://github.com/settings/tokens (classic, repo scope)
)
pause
