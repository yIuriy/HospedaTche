param(
    [string]$Template = "artifacts/templates/detection-rule-template.md",
    [string]$Artifact = "roteiros/etapa-6-deteccao-de-intrusoes.md"
)

$ErrorActionPreference = "Stop"

$requiredHeadings = @(
    "## Intrusion Detection",
    "## Prevention and Detection",
    "## Events to Log",
    "## Detection Rules",
    "## Response and Escalation",
    "## Final Review"
)

$requiredPhrases = @(
    "Status:",
    "Observed Risk",
    "Data Source",
    "Alert Condition",
    "Initial Response",
    "Responsible Role",
    "Sensitive Data Exclusions",
    "DR01",
    "DR02",
    "DR03"
)

$failures = New-Object System.Collections.Generic.List[string]

function Test-Structure([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path)) {
        $failures.Add("Missing file: $Path")
        return $null
    }

    $content = Get-Content -Raw -LiteralPath $Path
    foreach ($heading in $requiredHeadings) {
        if ($content -notmatch "(?m)^$([regex]::Escape($heading))\s*$") {
            $failures.Add("${Path}: missing heading '$heading'.")
        }
    }
    foreach ($phrase in $requiredPhrases) {
        if ($content -notmatch [regex]::Escape($phrase)) {
            $failures.Add("${Path}: missing required field or ID '$phrase'.")
        }
    }
    return $content
}

$null = Test-Structure $Template

$artifactStatus = $null

if (Test-Path -LiteralPath $Artifact) {
    $content = Test-Structure $Artifact
    if ($null -ne $content) {
        $statusMatch = [regex]::Match($content, "(?m)^Status:\s*(Draft|Final)\s*$")
        if (-not $statusMatch.Success) {
            $failures.Add("${Artifact}: Status must be Draft or Final.")
        } else {
            $artifactStatus = $statusMatch.Groups[1].Value
        }

        if ($artifactStatus -eq "Final" -and $content -match "(?i)\bTODO\b|\bPending\b|<[^>\r\n]+>") {
            $failures.Add("${Artifact}: final artifact contains an unresolved placeholder.")
        }
    }
}

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Error $_ }
    exit 1
}

if ($artifactStatus -eq "Final") {
    Write-Host "Intrusion detection script format valid."
} elseif ($artifactStatus -eq "Draft") {
    Write-Host "Intrusion detection draft structure valid; pending content is allowed."
} else {
    Write-Host "Detection rule template valid; artifact not created yet."
}
