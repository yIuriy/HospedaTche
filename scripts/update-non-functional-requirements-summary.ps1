param(
    [string]$RequirementsPath = "artifacts/non-functional-requirements/non-functional-requirements.md",
    [string]$SummaryPath = "artifacts/non-functional-requirements/summary.md"
)

$ErrorActionPreference = "Stop"

function New-MarkdownAnchor {
    param([string]$Heading)

    $anchor = $Heading.ToLowerInvariant()
    $anchor = $anchor -replace "[^a-z0-9\s-]", ""
    $anchor = $anchor -replace "\s+", "-"
    return $anchor.Trim("-")
}

if (-not (Test-Path -LiteralPath $RequirementsPath)) {
    Write-Error "Requirements file not found: $RequirementsPath"
}

$content = Get-Content -Raw -LiteralPath $RequirementsPath
$matches = [regex]::Matches($content, "(?ms)^###\s+(NFR[0-9]{2})\s+-\s+(.+?)\r?\n(.*?)(?=^###\s+NFR[0-9]{2}\s+-\s+|\z)")

if ($matches.Count -eq 0) {
    Write-Error "No non-functional requirements found in: $RequirementsPath"
}

$requirements = foreach ($match in $matches) {
    $id = $match.Groups[1].Value
    $name = $match.Groups[2].Value.Trim()
    $body = $match.Groups[3].Value
    $categoryMatch = [regex]::Match($body, "(?m)^Category:\s*(.+)$")

    if (-not $categoryMatch.Success) {
        Write-Error "$id missing Category."
    }

    $heading = "$id - $name"
    [pscustomobject]@{
        Id = $id
        Name = $name
        Category = $categoryMatch.Groups[1].Value.Trim()
        Link = "./non-functional-requirements.md#$(New-MarkdownAnchor $heading)"
    }
}

$categoryOrder = @()
$categoryGroups = [ordered]@{}

foreach ($requirement in $requirements) {
    if (-not $categoryGroups.Contains($requirement.Category)) {
        $categoryGroups[$requirement.Category] = New-Object System.Collections.Generic.List[object]
        $categoryOrder += $requirement.Category
    }

    $categoryGroups[$requirement.Category].Add($requirement)
}

$lines = New-Object System.Collections.Generic.List[string]

$lines.Add("# Non-Functional Requirements Summary")
$lines.Add("")
$lines.Add("## Scope")
$lines.Add("")
$lines.Add("HospedaTche non-functional requirements define basic quality attributes for security, performance, availability, reliability, usability, accessibility, maintainability, and privacy.")
$lines.Add("")
$lines.Add("These requirements stay general. Module-specific threats and abuse cases should be added by each member in STRIDE and abuse case artifacts.")
$lines.Add("")
$lines.Add("## NFR Count By Category")
$lines.Add("")
$lines.Add("| Category | NFR Range | Count |")
$lines.Add("| :--- | :--- | ---: |")

foreach ($category in $categoryOrder) {
    $items = $categoryGroups[$category]
    $range = "$($items[0].Id)-$($items[$items.Count - 1].Id)"
    $lines.Add("| $category | $range | $($items.Count) |")
}

$lines.Add("| Total | $($requirements[0].Id)-$($requirements[$requirements.Count - 1].Id) | $($requirements.Count) |")
$lines.Add("")
$lines.Add("## NFR Links")
$lines.Add("")
$lines.Add("| NFR | Name | Category |")
$lines.Add("| :--- | :--- | :--- |")

foreach ($requirement in $requirements) {
    $lines.Add("| [$($requirement.Id)]($($requirement.Link)) | [$($requirement.Name)]($($requirement.Link)) | $($requirement.Category) |")
}

$lines.Add("")

Set-Content -LiteralPath $SummaryPath -Value $lines -Encoding UTF8

Write-Host "Non-functional requirements summary updated."
