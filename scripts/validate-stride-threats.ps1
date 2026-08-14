param(
    [string]$Root = "artifacts/threat-modeling"
)

$ErrorActionPreference = "Stop"

$validStride = @(
    "Spoofing",
    "Tampering",
    "Repudiation",
    "Information Disclosure",
    "Denial of Service",
    "Elevation of Privilege"
)

$failures = New-Object System.Collections.Generic.List[string]

if (-not (Test-Path -LiteralPath $Root)) {
    Write-Error "Threat modeling root not found: $Root"
}

$files = Get-ChildItem -LiteralPath $Root -Recurse -File -Filter "*.md" |
    Where-Object {
        $_.Name -ne "README.md" -and
        $_.Name -ne "threat-map.md"
    }

foreach ($file in $files) {
    $relative = Resolve-Path -LiteralPath $file.FullName -Relative
    $module = Split-Path -Leaf (Split-Path -Parent $file.FullName)

    if ($module -notmatch "^[a-z0-9]+(-[a-z0-9]+)*$") {
        $failures.Add("${relative}: module folder must use lowercase kebab-case.")
    }

    if ($file.BaseName -notmatch "^(T[0-9]{2})-([a-z0-9]+(-[a-z0-9]+)*)$") {
        $failures.Add("${relative}: filename must match TNN-short-title.md.")
        continue
    }

    $id = $Matches[1]
    $slug = $Matches[2]
    $expectedTitle = ($slug -split "-") |
        ForEach-Object {
            if ($_.Length -eq 1) {
                $_.ToUpperInvariant()
            } else {
                $_.Substring(0, 1).ToUpperInvariant() + $_.Substring(1)
            }
        }
    $expectedTitle = $expectedTitle -join " "

    $content = Get-Content -Raw -LiteralPath $file.FullName

    if ($content -notmatch "(?m)^###\s+$id\s+-\s+(.+)$") {
        $failures.Add("${relative}: heading must be '### $id - $expectedTitle'.")
    } elseif ($Matches[1].Trim() -ne $expectedTitle) {
        $failures.Add("${relative}: heading title must match filename slug: $expectedTitle.")
    }

    foreach ($label in @("STRIDE Category:", "Component or Asset:", "Identified Threat:", "Possible Impact:", "Related Abuse Cases:")) {
        if ($content -notmatch "(?m)^$([regex]::Escape($label))") {
            $failures.Add("${relative}: missing '$label'.")
        }
    }

    $strideLine = [regex]::Match($content, "(?m)^STRIDE Category:\s*(.+)$")
    if ($strideLine.Success) {
        $category = $strideLine.Groups[1].Value.Trim()
        if ($validStride -notcontains $category) {
            $failures.Add("${relative}: invalid STRIDE category '$category'.")
        }
    }
}

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Error $_ }
    exit 1
}

Write-Host "STRIDE threat format valid."
