param(
    [string]$Path = "artifacts/functional-requirements/functional-requirements.md"
)

$ErrorActionPreference = "Stop"

$failures = New-Object System.Collections.Generic.List[string]
$validPriorities = @("Must", "Should", "Could")

if (-not (Test-Path -LiteralPath $Path)) {
    Write-Error "Functional requirements file not found: $Path"
}

$content = Get-Content -Raw -LiteralPath $Path
$matches = [regex]::Matches($content, "(?ms)^###\s+(RF[0-9]{2})\s+-\s+(.+?)\r?\n(.*?)(?=^###\s+RF[0-9]{2}\s+-\s+|\z)")

if ($matches.Count -eq 0) {
    $failures.Add("${Path}: no RF blocks found.")
}

$expectedNumber = 1
$seen = New-Object System.Collections.Generic.HashSet[string]

foreach ($match in $matches) {
    $id = $match.Groups[1].Value
    $title = $match.Groups[2].Value.Trim()
    $body = $match.Groups[3].Value
    $expectedId = "RF{0:D2}" -f $expectedNumber

    if ($id -ne $expectedId) {
        $failures.Add("${Path}: expected $expectedId but found $id.")
    }

    if (-not $seen.Add($id)) {
        $failures.Add("${Path}: duplicate requirement ID $id.")
    }

    if ([string]::IsNullOrWhiteSpace($title)) {
        $failures.Add("${Path}: $id heading title is empty.")
    }

    foreach ($label in @("Module:", "Primary Actors:", "Statement:", "Acceptance Criteria:", "Priority:", "Related Tasks:")) {
        if ($body -notmatch "(?m)^$([regex]::Escape($label))\s*\S+") {
            $failures.Add("${Path}: $id missing '$label'.")
        }
    }

    if ($body -notmatch "(?m)^1\.\s+\S+") {
        $failures.Add("${Path}: $id acceptance criteria must include numbered item 1.")
    }

    $priorityLine = [regex]::Match($body, "(?m)^Priority:\s*(.+)$")
    if ($priorityLine.Success) {
        $priority = $priorityLine.Groups[1].Value.Trim()
        if ($validPriorities -notcontains $priority) {
            $failures.Add("${Path}: $id invalid priority '$priority'. Use Must, Should, or Could.")
        }
    }

    $expectedNumber++
}

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Error $_ }
    exit 1
}

Write-Host "Functional requirements format valid."
