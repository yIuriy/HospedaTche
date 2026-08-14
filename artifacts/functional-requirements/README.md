# Functional Requirements

Functional requirements for HospedaTche live here.

Main files:

- `functional-requirements.md`: refined and expanded RF catalog.
- `summary.md`: short RF summary grouped by system area.

Validation:

```powershell
.\scripts\validate-functional-requirements.ps1
```

Format rules:

- Each requirement heading must be `### RFNN - Title`.
- IDs must be sequential.
- Each requirement must include:
  - `Module:`
  - `Primary Actors:`
  - `Statement:`
  - `Acceptance Criteria:`
  - `Priority:`
  - `Related Tasks:`

