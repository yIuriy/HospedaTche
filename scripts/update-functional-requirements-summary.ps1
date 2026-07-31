param(
    [string]$RequirementsPath = "artifacts/functional-requirements/functional-requirements.md",
    [string]$SummaryPath = "artifacts/functional-requirements/summary.md"
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
$matches = [regex]::Matches($content, "(?ms)^###\s+(RF[0-9]{2})\s+-\s+(.+?)\r?\n(.*?)(?=^###\s+RF[0-9]{2}\s+-\s+|\z)")

if ($matches.Count -eq 0) {
    Write-Error "No functional requirements found in: $RequirementsPath"
}

$requirements = foreach ($match in $matches) {
    $id = $match.Groups[1].Value
    $name = $match.Groups[2].Value.Trim()
    $body = $match.Groups[3].Value
    $moduleMatch = [regex]::Match($body, "(?m)^Module:\s*(.+)$")

    if (-not $moduleMatch.Success) {
        Write-Error "$id missing Module."
    }

    $heading = "$id - $name"
    [pscustomobject]@{
        Id = $id
        Name = $name
        Module = $moduleMatch.Groups[1].Value.Trim()
        Link = "./functional-requirements.md#$(New-MarkdownAnchor $heading)"
    }
}

$moduleOrder = @()
$moduleGroups = [ordered]@{}

foreach ($requirement in $requirements) {
    if (-not $moduleGroups.Contains($requirement.Module)) {
        $moduleGroups[$requirement.Module] = New-Object System.Collections.Generic.List[object]
        $moduleOrder += $requirement.Module
    }

    $moduleGroups[$requirement.Module].Add($requirement)
}

$lines = New-Object System.Collections.Generic.List[string]

$lines.Add("# Functional Requirements Summary")
$lines.Add("")
$lines.Add("## Scope")
$lines.Add("")
$lines.Add("HospedaTche is a hotel accommodation system for online booking, room management, stay operations, payments, guest communication, reviews, reports, audit, and internal account management.")
$lines.Add("")
$lines.Add("The system does not manage in-room consumption, such as drinks, snacks, minibar items, or room service charges.")
$lines.Add("")
$lines.Add("## Actors")
$lines.Add("")
$lines.Add("- Administrator: manages hotel rules, manager accounts, internal account governance, audit, and global settings.")
$lines.Add("- Manager: manages rooms, rates, receptionist accounts, reservations, reports, and hotel operation.")
$lines.Add("- Receptionist: manages check-in, check-out, room status, guest support, and reservation assistance.")
$lines.Add("- Guest: creates account, searches rooms, books stays, pays online, cancels when allowed, uses chat, and reviews stays.")
$lines.Add("")
$lines.Add("## RF Count By Module")
$lines.Add("")
$lines.Add("| Module | RF Range | Count |")
$lines.Add("| :--- | :--- | ---: |")

foreach ($module in $moduleOrder) {
    $items = $moduleGroups[$module]
    $range = "$($items[0].Id)-$($items[$items.Count - 1].Id)"
    $lines.Add("| $module | $range | $($items.Count) |")
}

$lines.Add("| Total | $($requirements[0].Id)-$($requirements[$requirements.Count - 1].Id) | $($requirements.Count) |")
$lines.Add("")
$lines.Add("## RF Links")
$lines.Add("")
$lines.Add("| RF | Name | Module |")
$lines.Add("| :--- | :--- | :--- |")

foreach ($requirement in $requirements) {
    $lines.Add("| [$($requirement.Id)]($($requirement.Link)) | [$($requirement.Name)]($($requirement.Link)) | $($requirement.Module) |")
}

$lines.Add("")
$lines.Add("## Task Groups")
$lines.Add("")
$lines.Add("- User Registration and Identity: RF01-RF10.")
$lines.Add("- Authentication and Access Control: RF01, RF04, RF05, RF06, RF07, RF08, RF09, RF10.")
$lines.Add("- Accommodation and Room Management: RF14-RF21, RF35-RF40.")
$lines.Add("- Booking and Payment Transactions: RF22-RF34.")
$lines.Add("- Search, Reviews, and Messaging: RF18-RF21, RF41-RF47.")
$lines.Add("- Reports, Audit, and Administration: RF48-RF58.")
$lines.Add("")

Set-Content -LiteralPath $SummaryPath -Value $lines -Encoding UTF8

Write-Host "Functional requirements summary updated."
