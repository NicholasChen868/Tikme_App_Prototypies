# ============================================================
# FIX NOTION CLIENT - Update & Test
# ============================================================

Write-Host "=" -NoNewline; Write-Host "="*58
Write-Host "FIXING NOTION CLIENT"
Write-Host "=" -NoNewline; Write-Host "="*58
Write-Host ""

# Step 1: Check current version
Write-Host "Step 1: Checking current version..." -ForegroundColor Cyan
pip show notion-client

Write-Host ""
Write-Host "Step 2: Upgrading to latest version..." -ForegroundColor Cyan
pip install --upgrade notion-client

Write-Host ""
Write-Host "Step 3: Verify new version..." -ForegroundColor Cyan
pip show notion-client

Write-Host ""
Write-Host "=" -NoNewline; Write-Host "="*58
Write-Host "UPGRADE COMPLETE! Now testing connection..." -ForegroundColor Green
Write-Host "=" -NoNewline; Write-Host "="*58
Write-Host ""

# Step 4: Test connection with fixed script
python scripts/test_notion_fixed.py
