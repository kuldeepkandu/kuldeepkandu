param(
    [string]$SourceCommitMessage = "chore: update source",
    [string]$DeployCommitMessage = "deploy: update static site",
    [switch]$SkipSourcePush
)

$ErrorActionPreference = "Stop"

function Write-Step {
    param([string]$Message)
    Write-Host "`n==> $Message" -ForegroundColor Cyan
}

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $repoRoot

Write-Step "Working directory: $repoRoot"

if (-not $SkipSourcePush) {
    Write-Step "Committing and pushing source changes"
    git add -A

    $sourceChanges = git status --porcelain
    if ($sourceChanges) {
        git commit -m $SourceCommitMessage
    } else {
        Write-Host "No source changes to commit."
    }

    $currentBranch = (git branch --show-current).Trim()
    if (-not $currentBranch) {
        throw "Could not determine current branch."
    }

    git push origin $currentBranch
} else {
    Write-Step "Skipping source push (--SkipSourcePush used)"
}

Write-Step "Building static site"
npm run build

$outDir = Join-Path $repoRoot "out"
if (-not (Test-Path $outDir)) {
    throw "Build output folder not found: $outDir"
}

Write-Step "Preparing out folder for GitHub Pages"
Set-Location $outDir

if (Test-Path ".git") {
    Remove-Item -Recurse -Force ".git"
}

New-Item -ItemType File ".nojekyll" -Force | Out-Null

Write-Step "Publishing out folder to kuldeepkandu/kuldeepkandu.github.io (gh-pages)"
git init | Out-Null
git checkout -b gh-pages | Out-Null
git add -A

$deployChanges = git status --porcelain
if (-not $deployChanges) {
    Write-Host "No deploy changes detected in out/."
} else {
    git commit -m $DeployCommitMessage
}

git remote add publish https://github.com/kuldeepkandu/kuldeepkandu.github.io.git
git push publish gh-pages --force

Set-Location $repoRoot
Write-Host "`nDeployment completed successfully." -ForegroundColor Green
