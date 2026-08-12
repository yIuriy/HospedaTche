# HospedaTche Secure Architecture

Status: Draft

Stage 3 converts prioritized risks into verifiable security requirements, vulnerability mappings, architecture controls, and justified decisions.

## Selected Risks

| Selection | Risk ID | Module | Initial Level | Selection Reason |
| --- | --- | --- | --- | --- |
| 1 | R02 - Account Takeover | accounts | Critical | Account takeover can expose personal data and allow unauthorized bookings, chat use, and actions performed as the victim. |
| 2 | Pending: Sidnei | Pending | Pending | Pending selection for SR02. |
| 3 | R11 - Maintenance Note Tampering | accommodation | Critical | Hidden maintenance issues can make unsafe rooms appear operational and can affect guest safety, availability, and room assignment decisions. |

## Security Requirements

| ID | Source Risk | Security Requirement | Verification Criterion | Owner |
| --- | --- | --- | --- | --- |
| SR01 | R02 - Account Takeover | The system must require step-up authentication before changing a password, email address, or CPF, and must revoke all active sessions after a password change or recovery. | A sensitive change without step-up authentication is denied. After a successful password change or recovery, every previously issued session or token is rejected when accessing a protected resource. | Iuri |
| SR02 | Pending: Sidnei | Pending. | Pending. | Sidnei |
| SR03 | R11 - Maintenance Note Tampering | The system must keep rooms with open maintenance issues unavailable for booking or assignment until maintenance closure is approved, justified, audit logged, and recoverable. | A room with an open maintenance issue is denied for booking and assignment. A maintenance closure without an authorized approver, mandatory reason, audit record, or previous-state restoration data is rejected. | Lara |

## Vulnerability Mapping

| Requirement | Vulnerability or Category | Reference | Relationship to HospedaTche |
| --- | --- | --- | --- |
| SR01 | Identification and authentication failure | OWASP Top 10 2021 A07 - Identification and Authentication Failures | Missing re-authentication and session revocation can let an attacker change identity data or preserve access after the legitimate user attempts account recovery. |
| SR02 | Pending: Sidnei | Pending. | Pending. |
| SR03 | Broken access control and insufficient auditability for maintenance closure | OWASP Top 10 2021 A01 - Broken Access Control | Missing authorization and audit controls can let staff hide maintenance issues, make unsafe rooms appear operational, and bypass room blocking. |

## Architecture Diagram

Source: `artifacts/diagrams/secure-architecture.mmd`

Exported image: `artifacts/diagrams/secure-architecture.png`

Status: Pending Dyonathan.

The diagram must show users, client or interface, application or API, authentication, server-side authorization, database, audit logs or monitoring, relevant external services, trust boundaries, and selected controls.

## Architecture Decisions

### AD01 - Pending Architecture Decision

Problem or Risk: R02 - Account Takeover.

Decision: Pending Rafaela.

Justification: Pending Rafaela.

Affected Component: Authentication service and session manager.

Expected Result: Pending Rafaela.

### AD02 - Pending Architecture Decision

Problem or Risk: Pending.

Decision: Pending Rafaela.

Justification: Pending Rafaela.

Affected Component: Pending.

Expected Result: Pending Rafaela.

### AD03 - Pending Architecture Decision

Problem or Risk: R11 - Maintenance Note Tampering.

Decision: Pending Rafaela.

Justification: Pending Rafaela.

Affected Component: Accommodation service, maintenance workflow, room availability control, and audit log.

Expected Result: Pending Rafaela.

## Traceability Matrix

| Risk | Requirement | Vulnerability Reference | Architecture Control | Decision |
| --- | --- | --- | --- | --- |
| R02 - Account Takeover | SR01 | OWASP Top 10 2021 A07 | Step-up authentication and centralized session revocation in the authentication service | AD01 - pending final decision text |
| Pending: Sidnei | SR02 | Pending. | Pending. | AD02 |
| R11 - Maintenance Note Tampering | SR03 | OWASP Top 10 2021 A01 | Maintenance closure approval, room block enforcement, immutable maintenance history, and previous-state restoration in the accommodation service | AD03 - pending final decision text |

## Final Review

- [ ] Exactly three risks, requirements, mappings, and decisions are complete.
- [x] SR01 and SR03 have observable pass or fail verification criteria.
- [x] The SR01 and SR03 OWASP references support the mapped risks.
- [ ] Diagram component names match the document.
- [ ] Diagram source and exported image are versioned.
- [ ] Traceability is complete from every risk to its architecture decision.
