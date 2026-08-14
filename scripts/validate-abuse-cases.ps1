param(
    [string]$Root = "artifacts/abuse-cases"
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
    Write-Error "Abuse case root not found: $Root"
}

$files = Get-ChildItem -LiteralPath $Root -Recurse -File -Filter "*.md" |
    Where-Object {
        $_.Name -ne "README.md" -and
        $_.Name -ne "abuse-case-map.md"
    }

foreach ($file in $files) {
    $relative = Resolve-Path -LiteralPath $file.FullName -Relative
    $module = Split-Path -Leaf (Split-Path -Parent $file.FullName)

    if ($module -notmatch "^[a-z0-9]+(-[a-z0-9]+)*$") {
        $failures.Add("${relative}: module folder must use lowercase kebab-case.")
    }

    if ($file.BaseName -notmatch "^(AC[0-9]{2})-([a-z0-9]+(-[a-z0-9]+)*)$") {
        $failures.Add("${relative}: filename must match ACNN-short-title.md.")
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

    foreach ($label in @("Actor:", "Goal:", "Conditions:", "Abuse flow:", "Impact:", "Related STRIDE categories:")) {
        if ($content -notmatch "(?m)^$([regex]::Escape($label))") {
            $failures.Add("${relative}: missing '$label'.")
        }
    }

    if ($content -notmatch "(?m)^1\.\s+\S+") {
        $failures.Add("${relative}: abuse flow must include numbered steps.")
    }

    $strideLine = [regex]::Match($content, "(?m)^Related STRIDE categories:\s*(.+)$")
    if ($strideLine.Success) {
        $categories = $strideLine.Groups[1].Value -split "," |
            ForEach-Object { $_.Trim() } |
            Where-Object { $_ }

        foreach ($category in $categories) {
            if ($validStride -notcontains $category) {
                $failures.Add("${relative}: invalid STRIDE category '$category'.")
            }
        }
    }
}

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Error $_ }
    exit 1
}

Write-Host "Abuse case format valid."
