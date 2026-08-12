# Stage 3 - Secure Architecture Task Division

This document defines the minimum Stage 3 work division. Stage 3 converts prioritized Stage 2 risks into verifiable security requirements and architecture decisions.

## Shared Goal

```text
high or critical risk -> security requirement -> CWE/OWASP mapping -> architecture control -> justified decision
```

## Shared Rules

- Select only three high or critical risks from Stage 2.
- Keep every requirement specific and verifiable.
- Use recognized CWE or OWASP references.
- Show where the selected controls exist in the architecture.
- Keep the diagram source and exported image in GitHub.
- A complete application implementation is not required.

## Minimum Deliverable

- three security requirements derived from selected risks;
- three CWE or OWASP vulnerability mappings;
- one secure architecture diagram;
- three justified architecture decisions.

Recommended outputs:

Template: `artifacts/templates/secure-architecture-template.md`

```text
artifacts/secure-architecture/secure-architecture.md
artifacts/diagrams/secure-architecture.mmd
artifacts/diagrams/secure-architecture.png
```

## Required Traceability

Each requirement must record:

| Field | Required Content |
| --- | --- |
| ID | SR01, SR02, or SR03 |
| Source Risk | High or critical risk from Stage 2 |
| Requirement | Mandatory security behavior |
| Verification Criterion | Observable pass or fail condition |
| Vulnerability Mapping | Relevant CWE or OWASP reference |

Each architecture decision must record the problem, decision, justification, affected component, and expected result.

## Member Assignment

| Member | Minimum Work | Expected Output |
| --- | --- | --- |
| Iuri | Select one identity-related risk and write SR01 with one CWE/OWASP mapping. | SR01 and mapping 1 |
| Sidnei | Select one authentication or authorization risk and write SR02 with one CWE/OWASP mapping. | SR02 and mapping 2 |
| Lara | Select one accommodation or operational risk and write SR03 with one CWE/OWASP mapping. | SR03 and mapping 3 |
| Dyonathan | Build the secure architecture diagram and place the three controls in it. | Diagram source and exported image |
| Rafaela | Write AD01, AD02, and AD03 and consolidate traceability among risks, requirements, mappings, controls, and components. | Three decisions and integrated document |

## Diagram Minimum Content

The diagram must show:

- users and staff roles;
- application interface or client;
- authentication service;
- server-side authorization rules;
- application or API;
- database;
- audit logs or monitoring;
- relevant external services, such as payment provider;
- main trust boundaries and selected controls.

## Shared Final Review

Confirm that:

- exactly three risks, requirements, mappings, and decisions are included;
- each requirement has an objective verification criterion;
- each vulnerability reference supports the related risk;
- the diagram and decisions use the same component names;
- controls appear in the diagram at the correct boundary or component;
- source and exported diagram files are versioned.

---

# Stage 3 - Secure Architecture Task Division (Operational Guide)

## Shared Goal

Transform three high or critical risks into verifiable requirements, vulnerability references, architectural controls, and justified decisions.

## Minimum Deliverable

- three security requirements;
- three CWE or OWASP mappings;
- one secure architecture diagram, with source and exported image;
- three justified architecture decisions.

Template: `artifacts/templates/secure-architecture-template.md`

## Task Division by Member

| Member | Minimum Task | Expected Output |
| --- | --- | --- |
| Iuri | Select an identity risk and write SR01 with verification criterion and CWE/OWASP reference. | SR01 and mapping 1 |
| Sidnei | Select an authentication or authorization risk and write SR02 with criterion and reference. | SR02 and mapping 2 |
| Lara | Select an accommodation or operational risk and write SR03 with criterion and reference. | SR03 and mapping 3 |
| Dyonathan | Create the diagram and place the three controls in the correct components or boundaries. | Diagram source and exported image |
| Rafaela | Write AD01, AD02, and AD03 and integrate risks, requirements, references, controls, and components. | Three decisions and final document |

## Minimum Diagram Content

- users and internal roles;
- interface or client;
- server-side authentication and authorization;
- application or API;
- database;
- logs or monitoring;
- relevant external services;
- trust boundaries and selected controls.

## Final Review

- verify the three risks, requirements, mappings, and decisions;
- verify objective verification criteria;
- verify consistency between references, controls, and risks;
- verify component names in text and diagram;
- version source and exported image.
