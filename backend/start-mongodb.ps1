# Start MongoDB service (requires admin privileges)
Write-Host "Starting MongoDB service..." -ForegroundColor Cyan

try {
    Start-Service -Name "MongoDB" -ErrorAction Stop
    Write-Host "✅ MongoDB service started successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "MongoDB is now running on: mongodb://localhost:27017" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Make sure backend/.env has: MONGODB_URI=mongodb://localhost:27017/globe-trotter"
    Write-Host "2. Restart your backend server (Ctrl+C, then npm run dev)"
    Write-Host "3. Look for: ✅ MongoDB Connected: localhost"
    Write-Host ""
} catch {
    Write-Host "❌ Error: Could not start MongoDB service" -ForegroundColor Red
    Write-Host ""
    Write-Host "This script needs to run as Administrator." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To run as admin:" -ForegroundColor Cyan
    Write-Host "1. Right-click PowerShell" -ForegroundColor White
    Write-Host "2. Select 'Run as Administrator'" -ForegroundColor White
    Write-Host "3. Navigate to: cd 'd:\Globe Trotter\Odoo-hackathon\backend'" -ForegroundColor White
    Write-Host "4. Run: .\start-mongodb.ps1" -ForegroundColor White
    Write-Host ""
    Write-Host "Alternative - Manual start:" -ForegroundColor Cyan
    Write-Host "Run in admin PowerShell: net start MongoDB" -ForegroundColor White
    Write-Host ""
}

# Check if MongoDB is running
Write-Host "Checking MongoDB status..." -ForegroundColor Cyan
$service = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue

if ($service) {
    if ($service.Status -eq "Running") {
        Write-Host "✅ MongoDB is RUNNING" -ForegroundColor Green
    } else {
        Write-Host "⚠️  MongoDB service exists but is not running" -ForegroundColor Yellow
        Write-Host "Status: $($service.Status)" -ForegroundColor White
    }
} else {
    Write-Host "❌ MongoDB service not found" -ForegroundColor Red
}
