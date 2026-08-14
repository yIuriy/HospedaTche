# Business Rules

Business rules for HospedaTche live here.

Main file:

- `business-rules.md`: business rule catalog.

Validation:

```powershell
.\scripts\validate-business-rules.ps1
```

Format rules:

- Each rule heading must be `### BRNN - Title`.
- IDs must be sequential.
- Each rule must include:
  - `Applies To:`
  - `Rule:`
  - `Rationale:`
  - `Related Requirements:`

Empty catalog is valid while no business rules are defined.

