param(
    [string]$Template = "artifacts/templates/secure-architecture-template.md",
    [string]$Artifact = "artifacts/secure-architecture/secure-architecture.md",
    [string]$DiagramSource = "artifacts/diagrams/secure-architecture.mmd",
    [string]$DiagramImage = "artifacts/diagrams/secure-architecture.png"
)

$ErrorActionPreference = "Stop"

$requiredHeadings = @(
    "## Selected Risks",
    "## Security Requirements",
    "## Vulnerability Mapping",
    "## Architecture Diagram",
    "## Architecture Decisions",
    "## Traceability Matrix",
    "## Final Review"
)

$requiredPhrases = @(
    "Source Risk",
    "Security Requirement",
    "Verification Criterion",
    "Vulnerability or Category",
    "Affected Component",
    "Expected Result",
    "Architecture Control",
    "SR01",
    "SR02",
    "SR03",
    "AD01",
    "AD02",
    "AD03"
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
    if ($null -ne $content) {
        if ($content -match "(?i)\bTODO\b|<[^>\r\n]+>") {
            $failures.Add("${Artifact}: unresolved template placeholder found.")
        }
        if ($content -notmatch "(?i)CWE-[0-9]+|OWASP") {
            $failures.Add("${Artifact}: missing concrete CWE or OWASP reference.")
        }
    }
    if (-not (Test-Path -LiteralPath $DiagramSource)) {
        $failures.Add("Missing architecture diagram source: $DiagramSource")
    }
    if (-not (Test-Path -LiteralPath $DiagramImage)) {
        $failures.Add("Missing exported architecture diagram: $DiagramImage")
    }
}

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Error $_ }
    exit 1
}

if (Test-Path -LiteralPath $Artifact) {
    Write-Host "Secure architecture format valid."
} else {
    Write-Host "Secure architecture template valid; artifact not created yet."
}
