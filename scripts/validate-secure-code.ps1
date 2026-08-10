param(
    [string]$Template = "artifacts/templates/secure-code-practice-template.md",
    [string]$Artifact = "artifacts/secure-code/secure-code-and-tests.md"
)

$ErrorActionPreference = "Stop"

$requiredHeadings = @(
    "## Practice 1 - Practice Title",
    "## Practice 2 - Practice Title",
    "## Traceability",
    "## Final Review"
)

$requiredPhrases = @(
    "Related Risk:",
    "Related Requirement:",
    "Secure Practice:",
    "Tests Defined Before the Solution",
    "Expected Secure Result",
    "Solution",
    "OWASP Reference",
    "ST01",
    "ST02",
    "ST03",
    "ST04"
)

$failures = New-Object System.Collections.Generic.List[string]

function Test-Structure([string]$Path, [bool]$AllowGenericPracticeTitles) {
    if (-not (Test-Path -LiteralPath $Path)) {
        $failures.Add("Missing file: $Path")
        return $null
    }

    $content = Get-Content -Raw -LiteralPath $Path
    if ($AllowGenericPracticeTitles) {
        foreach ($heading in $requiredHeadings) {
            if ($content -notmatch "(?m)^$([regex]::Escape($heading))\s*$") {
                $failures.Add("${Path}: missing heading '$heading'.")
            }
        }
    } else {
        foreach ($number in 1..2) {
            if ($content -notmatch "(?m)^## Practice $number\s+-\s+.+$") {
                $failures.Add("${Path}: missing '## Practice $number - <title>' heading.")
            }
        }
        foreach ($heading in @("## Traceability", "## Final Review")) {
            if ($content -notmatch "(?m)^$([regex]::Escape($heading))\s*$") {
                $failures.Add("${Path}: missing heading '$heading'.")
            }
        }
    }

    foreach ($phrase in $requiredPhrases) {
        if ($content -notmatch [regex]::Escape($phrase)) {
            $failures.Add("${Path}: missing required field or ID '$phrase'.")
        }
    }
    return $content
}

$null = Test-Structure $Template $true

if (Test-Path -LiteralPath $Artifact) {
    $content = Test-Structure $Artifact $false
    if ($null -ne $content -and $content -match "(?i)\bTODO\b|<[^>\r\n]+>") {
        $failures.Add("${Artifact}: unresolved template placeholder found.")
    }
}

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Error $_ }
    exit 1
}

if (Test-Path -LiteralPath $Artifact) {
    Write-Host "Secure code and security test format valid."
} else {
    Write-Host "Secure code practice template valid; artifact not created yet."
}
