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

if (Test-Path -LiteralPath $Artifact) {
    $content = Test-Structure $Artifact
    if ($null -ne $content -and $content -match "(?i)\bTODO\b|<[^>\r\n]+>") {
        $failures.Add("${Artifact}: unresolved template placeholder found.")
    }
}

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Error $_ }
    exit 1
}

if (Test-Path -LiteralPath $Artifact) {
    Write-Host "Intrusion detection script format valid."
} else {
    Write-Host "Detection rule template valid; artifact not created yet."
}
