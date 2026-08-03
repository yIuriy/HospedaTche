param(
    [string]$Root = "artifacts/risk-treatment"
)

$ErrorActionPreference = "Stop"

$expectedModules = @(
    "accounts",
    "accommodation",
    "booking",
    "payment",
    "search-messaging"
)

$requiredHeadings = @(
    "## Risk Register",
    "## Evaluation Justifications",
    "## Prioritization",
    "## NIST CSF 2.0 Mapping",
    "## Treatment Plan",
    "## Initial Implementation Order",
    "## Expected Residual Risk",
    "## Final Notes"
)

$requiredPhrases = @(
    "Related STRIDE Threat",
    "Related Abuse Case",
    "Risk Event",
    "Vulnerability or Condition",
    "Probability",
    "Impact",
    "Score",
    "Level",
    "Govern",
    "Identify",
    "Protect",
    "Detect",
    "Respond",
    "Recover",
    "Strategy",
    "Proposed Controls",
    "Responsible Parties",
    "Evidence and Verification",
    "Expected Residual Level"
)

$failures = New-Object System.Collections.Generic.List[string]

if (-not (Test-Path -LiteralPath $Root)) {
    Write-Error "Risk treatment root not found: $Root"
}

foreach ($module in $expectedModules) {
    $moduleDir = Join-Path $Root $module
    $register = Join-Path $moduleDir "risk-register.md"

    if (-not (Test-Path -LiteralPath $moduleDir)) {
        $failures.Add("${module}: missing module folder.")
        continue
    }

    if (-not (Test-Path -LiteralPath $register)) {
        $failures.Add("${module}: missing risk-register.md.")
        continue
    }

    $relative = Resolve-Path -LiteralPath $register -Relative
    $content = Get-Content -Raw -LiteralPath $register

    foreach ($heading in $requiredHeadings) {
        if ($content -notmatch "(?m)^$([regex]::Escape($heading))\s*$") {
            $failures.Add("${relative}: missing heading '$heading'.")
        }
    }

    foreach ($phrase in $requiredPhrases) {
        if ($content -notmatch [regex]::Escape($phrase)) {
            $failures.Add("${relative}: missing required field or NIST function '$phrase'.")
        }
    }

    if ($content -notmatch "(?m)^#\s+.+Risk Register\s*$") {
        $failures.Add("${relative}: title must identify the module risk register.")
    }
}

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Error $_ }
    exit 1
}

Write-Host "Risk treatment skeleton valid."
