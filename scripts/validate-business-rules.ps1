param(
    [string]$Path = "artifacts/business-rules/business-rules.md"
)

$ErrorActionPreference = "Stop"

$failures = New-Object System.Collections.Generic.List[string]

if (-not (Test-Path -LiteralPath $Path)) {
    Write-Error "Business rules file not found: $Path"
}

$content = Get-Content -Raw -LiteralPath $Path
$matches = [regex]::Matches($content, "(?ms)^###\s+(BR[0-9]{2})\s+-\s+(.+?)\r?\n(.*?)(?=^###\s+BR[0-9]{2}\s+-\s+|\z)")

if ($matches.Count -eq 0) {
    Write-Host "Business rules format valid. No rules defined."
    exit 0
}

$expectedNumber = 1
$seen = New-Object System.Collections.Generic.HashSet[string]

foreach ($match in $matches) {
    $id = $match.Groups[1].Value
    $title = $match.Groups[2].Value.Trim()
    $body = $match.Groups[3].Value
    $expectedId = "BR{0:D2}" -f $expectedNumber

    if ($id -ne $expectedId) {
        $failures.Add("${Path}: expected $expectedId but found $id.")
    }

    if (-not $seen.Add($id)) {
        $failures.Add("${Path}: duplicate business rule ID $id.")
    }

    if ([string]::IsNullOrWhiteSpace($title)) {
        $failures.Add("${Path}: $id heading title is empty.")
    }

    foreach ($label in @("Applies To:", "Rule:", "Rationale:", "Related Requirements:")) {
        if ($body -notmatch "(?m)^$([regex]::Escape($label))\s*\S+") {
            $failures.Add("${Path}: $id missing '$label'.")
        }
    }

    $expectedNumber++
}

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Error $_ }
    exit 1
}

Write-Host "Business rules format valid."
