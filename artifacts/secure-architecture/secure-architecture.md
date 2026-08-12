# HospedaTche Secure Architecture

Status: Draft

Stage 3 converts prioritized risks into verifiable security requirements, vulnerability mappings, architecture controls, and justified decisions.

## Selected Risks

| Selection | Risk ID | Module | Initial Level | Selection Reason |
| --- | --- | --- | --- | --- |
| 1 | R02 - Account Takeover | accounts | Critical | Account takeover can expose personal data and allow unauthorized bookings, chat use, and actions performed as the victim. |
| 2 | R05 - Unauthorized Role Elevation | accounts | Critical | Low-privileged users could manipulate request parameters or payloads to elevate privileges to Manager or Administrator, disrupting system governance. |
| 3 | R11 - Maintenance Note Tampering | accommodation | Critical | Hidden maintenance issues can make unsafe rooms appear operational and can affect guest safety, availability, and room assignment decisions. |
## Security Requirements

| ID | Source Risk | Security Requirement | Verification Criterion | Owner |
| --- | --- | --- | --- | --- |
| SR01 | R02 - Account Takeover | The system must require step-up authentication before changing a password, email address, or CPF, and must revoke all active sessions after a password change or recovery. | A sensitive change without step-up authentication is denied. After a successful password change or recovery, every previously issued session or token is rejected when accessing a protected resource. | Iuri |
| SR02 | R05 - Unauthorized Role Elevation | The system must enforce strict server-side authorization and role hierarchy validation on all user update and role assignment endpoints, ignoring or rejecting any payload attempting to assign roles equal to or higher than the caller's tier. | Any attempt by a low-privileged user (e.g. Guest) to pass role parameters or elevate privileges must return 403 Forbidden and generate an authorization audit log. | Sidnei |
| SR03 | R11 - Maintenance Note Tampering | The system must keep rooms with open maintenance issues unavailable for booking or assignment until maintenance closure is approved, justified, audit logged, and recoverable. | A room with an open maintenance issue is denied for booking and assignment. A maintenance closure without an authorized approver, mandatory reason, audit record, or previous-state restoration data is rejected. | Lara |
## Vulnerability Mapping

| Requirement | Vulnerability or Category | Reference | Relationship to HospedaTche |
| --- | --- | --- | --- |
| SR01 | Identification and authentication failure | OWASP Top 10 2021 A07 - Identification and Authentication Failures | Missing re-authentication and session revocation can let an attacker change identity data or preserve access after the legitimate user attempts account recovery. |
| SR02 | Improper Privilege Management & Broken Access Control | OWASP Top 10 2021 A01 - Broken Access Control (CWE-269) | Failing to validate role update payloads on the server side allows guests or staff to assign themselves elevated roles, bypassing HospedaTche's access control hierarchy. |
| SR03 | Broken access control and insufficient auditability for maintenance closure | OWASP Top 10 2021 A01 - Broken Access Control | Missing authorization and audit controls can let staff hide maintenance issues, make unsafe rooms appear operational, and bypass room blocking. |
## Architecture Diagram

Source: `artifacts/diagrams/secure-architecture.mmd`

Exported image: `artifacts/diagrams/secure-architecture.png`

Status: Pending Dyonathan.

The diagram must show users, client or interface, application or API, authentication, server-side authorization, database, audit logs or monitoring, relevant external services, trust boundaries, and selected controls.

## Architecture Decisions

### AD01 - Short-Lived JWT Tokens & HttpOnly Cookie Session Management

Problem or Risk: R02 - Account Takeover.

Decision: Reduce JWT access token expiration to 5 minutes, store sessions exclusively in secure HttpOnly cookies, and enforce IP address validation on active sessions.

Justification: Short-lived access tokens reduce the exposure window if a token is intercepted, while HttpOnly cookies prevent XSS-based token theft. IP address validation ensures that stolen session cookies cannot be replayed from unauthorized external networks.

Affected Component: Authentication service and session manager.

Expected Result: Intercepted tokens expire within 5 minutes, client-side scripts cannot access session tokens, and requests originating from unauthorized IP addresses are automatically rejected.

### AD02 - Server-Side Role Hierarchy Enforcement & DTO Parameter Filtering

Problem or Risk: R05 - Unauthorized Role Elevation.

Decision: Enforce server-side role hierarchy validation (`RoleHierarchyValidatorEngine`) with `@PreAuthorize` annotations and strict DTO mappers that automatically ignore role parameters in low-privileged payload submissions.

Justification: Client-side UI restrictions or parameter sanitization can be easily bypassed using direct API calls (e.g., Postman/curl). Role assignments and hierarchy validation must be strictly enforced on the server.

Affected Component: Authorization service and account management API.

Expected Result: Unauthorized attempts to elevate privileges or modify role parameters return HTTP `403 Forbidden` and generate security audit log entries.

### AD03 - Automated Room Availability Filtering & Digital Signature Maintenance Closure

Problem or Risk: R11 - Maintenance Note Tampering.

Decision: Apply automatic availability filtering on the public room search API to omit rooms with open maintenance tickets, and require a digitally signed technical report before approving maintenance closures.

Justification: Automated filtering prevents unsafe or uninspected rooms from appearing in public booking search results, while digital signatures ensure non-repudiation and accountability for technical maintenance approvals.

Affected Component: Accommodation service, maintenance workflow, room availability control, and audit log.

Expected Result: Unsafe rooms under maintenance are automatically hidden from public booking searches, and room status updates require verified digital signatures from authorized maintenance technicians.

## Traceability Matrix

| Risk | Requirement | Vulnerability Reference | Architecture Control | Decision |
| --- | --- | --- | --- | --- |
| R02 - Account Takeover | SR01 | OWASP Top 10 2021 A07 | Step-up authentication and centralized session revocation in the authentication service | AD01 |
| R05 - Unauthorized Role Elevation | SR02 | OWASP Top 10 2021 A01 (CWE-269) | Server-side role hierarchy validation engine and strict DTO parameter filtering | AD02 |
| R11 - Maintenance Note Tampering | SR03 | OWASP Top 10 2021 A01 | Maintenance closure approval, room block enforcement, immutable maintenance history, and previous-state restoration in the accommodation service | AD03 |

## Final Review

- [x] Exactly three risks, requirements, mappings, and decisions are complete.
- [x] SR01, SR02, and SR03 have observable pass or fail verification criteria.
- [x] The SR01, SR02, and SR03 OWASP references support the mapped risks.
- [ ] Diagram component names match the document.
- [ ] Diagram source and exported image are versioned.
- [x] Traceability is complete from every risk to its architecture decision.