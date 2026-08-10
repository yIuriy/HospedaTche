# Secure Architecture Template

Use this template for Stage 3 secure architecture design.

Status: Draft

Change `Status` to `Final` only after all sections and diagram files are complete.

Save the completed artifact as:

```text
artifacts/secure-architecture/secure-architecture.md
```

Diagram files:

```text
artifacts/diagrams/secure-architecture.mmd
artifacts/diagrams/secure-architecture.png
```

## Selected Risks

Select exactly three high or critical risks from Stage 2.

| Selection | Risk ID | Module | Initial Level | Selection Reason |
| --- | --- | --- | --- | --- |
| 1 | RNN | TODO | TODO | TODO |
| 2 | RNN | TODO | TODO | TODO |
| 3 | RNN | TODO | TODO | TODO |

## Security Requirements

Requirements must be specific, mandatory, and objectively verifiable.

| ID | Source Risk | Security Requirement | Verification Criterion | Owner |
| --- | --- | --- | --- | --- |
| SR01 | RNN | The system must TODO. | The requirement passes when TODO. | TODO |
| SR02 | RNN | The system must TODO. | The requirement passes when TODO. | TODO |
| SR03 | RNN | The system must TODO. | The requirement passes when TODO. | TODO |

## Vulnerability Mapping

Use recognized CWE or OWASP references.

| Requirement | Vulnerability or Category | Reference | Relationship to HospedaTche |
| --- | --- | --- | --- |
| SR01 | TODO | CWE-NNN or OWASP reference | TODO |
| SR02 | TODO | CWE-NNN or OWASP reference | TODO |
| SR03 | TODO | CWE-NNN or OWASP reference | TODO |

## Architecture Diagram

Source: `artifacts/diagrams/secure-architecture.mmd`

Exported image: `artifacts/diagrams/secure-architecture.png`

The diagram must show users, client or interface, application or API, authentication, server-side authorization, database, audit logs or monitoring, relevant external services, trust boundaries, and selected controls.

## Architecture Decisions

### AD01 - Decision Title

Problem or Risk: TODO.

Decision: TODO.

Justification: TODO.

Affected Component: TODO.

Expected Result: TODO.

### AD02 - Decision Title

Problem or Risk: TODO.

Decision: TODO.

Justification: TODO.

Affected Component: TODO.

Expected Result: TODO.

### AD03 - Decision Title

Problem or Risk: TODO.

Decision: TODO.

Justification: TODO.

Affected Component: TODO.

Expected Result: TODO.

## Traceability Matrix

| Risk | Requirement | Vulnerability Reference | Architecture Control | Decision |
| --- | --- | --- | --- | --- |
| RNN | SR01 | TODO | TODO | AD01 |
| RNN | SR02 | TODO | TODO | AD02 |
| RNN | SR03 | TODO | TODO | AD03 |

## Final Review

- [ ] Exactly three risks, requirements, mappings, and decisions are included.
- [ ] Every verification criterion has an observable pass or fail result.
- [ ] Every CWE or OWASP reference supports the mapped risk.
- [ ] Diagram component names match the document.
- [ ] Diagram source and exported image are versioned.
- [ ] Traceability is complete from risk to architecture decision.
