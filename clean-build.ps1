# clean-build.ps1
# This script forcefully stops node processes and cleans up directories that might be locked by OneDrive.

Write-Host "Stopping all node processes..."
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue

Write-Host "Waiting 3 seconds for file locks to release..."
Start-Sleep -Seconds 3

Write-Host "Removing .svelte-kit directory..."
if (Test-Path ".svelte-kit") {
    Remove-Item -Recurse -Force ".svelte-kit" -ErrorAction SilentlyContinue
}

Write-Host "Removing node_modules directory..."
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
}

Write-Host "Running npm install..."
npm install

Write-Host "Done. You can now run 'npm run dev' or 'npm run build'."
