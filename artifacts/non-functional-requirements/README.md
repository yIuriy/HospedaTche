# Non-Functional Requirements

Non-functional requirements for HospedaTche live here.

Main files:

- `non-functional-requirements.md`: basic NFR catalog.
- `summary.md`: short NFR summary with links.

Validation:

```powershell
.\scripts\validate-non-functional-requirements.ps1
```

Update summary:

```powershell
.\scripts\update-non-functional-requirements-summary.ps1
```

Format rules:

- Each requirement heading must be `### NFRNN - Title`.
- IDs must be sequential.
- Each requirement must include:
  - `Category:`
  - `Applies To:`
  - `Statement:`
  - `Acceptance Criteria:`
  - `Priority:`
  - `Related Modules:`

