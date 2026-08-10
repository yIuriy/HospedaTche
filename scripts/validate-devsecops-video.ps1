param(
    [string]$Template = "artifacts/templates/devsecops-video-template.md",
    [string]$Artifact = "roteiros/etapa-7-devsecops-e-video-final.md"
)

$ErrorActionPreference = "Stop"

$requiredHeadings = @(
    "## DevSecOps Pipeline",
    "## Pipeline Stop Conditions",
    "## Final Video Script",
    "## Participation",
    "## Delivery Record",
    "## Final Review"
)

$requiredPhrases = @(
    "Security Activity",
    "Evidence Produced",
    "Condition to Continue",
    "Stop Condition",
    "Action Before Resuming",
    "Estimated Duration",
    "SC01",
    "SC02",
    "SC03",
    "Iuri",
    "Sidnei",
    "Lara",
    "Dyonathan",
    "Rafaela",
    "5 to 8 minutes"
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
            $failures.Add("${Path}: missing required field, ID, or member '$phrase'.")
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
    Write-Host "DevSecOps pipeline and final video script format valid."
} else {
    Write-Host "DevSecOps and final video template valid; artifact not created yet."
}
