# HospedaTche Secure Code and Security Tests

Status: Final

Stage 4 demonstrates how Stage 3 security requirements become secure implementation practices and tests defined before the solution.

## Practice 1 - Step-Up Authentication and Session Revocation

Related Risk: R02 - Account Takeover.

Related Requirement: SR01 - Require step-up authentication before sensitive account changes and revoke active sessions after password change or recovery.

Secure Practice: Enforce re-authentication on the server before changing a password, email address, or CPF. Revoke active sessions and refresh tokens after a password change or recovery, and record the security event without sensitive data.

### Tests Defined Before the Solution

| ID | Type | Input or Action | Expected Secure Result |
| --- | --- | --- | --- |
| ST01 | Valid or authorized | POST request to `/api/account/password` with valid session cookie and correct `currentPassword`. | Password updates successfully (HTTP 200 OK), all pre-existing active sessions and refresh tokens are invalidated, and a security audit event is logged. |
| ST02 | Malicious, invalid, or unauthorized | POST request to `/api/account/password` with valid session cookie but invalid or missing `currentPassword`. | Request is rejected (HTTP 401 Unauthorized / 403 Forbidden), password remains unchanged, active sessions are preserved, and a failed step-up authentication audit event is logged. |

### Solution

Expected implementation outline:

```text
receive sensitive account change request
validate authenticated session
require current password or MFA confirmation

if step-up authentication fails:
    reject request
    record denied operation without sensitive data

apply authorized account change

if password was changed or recovered:
    revoke previous sessions and refresh tokens

record security audit event
```

### OWASP Reference

Reference: OWASP Top 10 2021 A07 - Identification and Authentication Failures & OWASP Session Management Cheat Sheet.

How the reference supports this practice: OWASP A07 and the Session Management Cheat Sheet mandate re-authentication (step-up authentication) prior to updating critical credentials and require immediate server-side session termination across all active devices upon password modification or recovery to block hijacked sessions.

## Practice 2 - Authorized Maintenance Closure and Room Availability Enforcement

Related Risk: R11 - Maintenance Note Tampering.

Related Requirement: SR03 - Keep rooms with open maintenance issues unavailable for booking or assignment until maintenance closure is approved, justified, audit logged, and recoverable.

Secure Practice: Enforce server-side authorization and maintenance workflow validation before closing a maintenance issue or changing a room under maintenance back to an assignable state. Rooms with open maintenance issues must remain unavailable for booking and assignment, and every closure must include an authorized approver, mandatory reason, audit record, and previous-state restoration data.

### Tests Defined Before the Solution

| ID | Type | Input or Action | Expected Secure Result |
| --- | --- | --- | --- |
| ST03 | Valid or authorized | An authorized maintenance user submits a maintenance closure with a valid authorization, mandatory reason, audit information, and previous-state restoration data. | The maintenance closure is accepted, the room becomes available only after the authorized closure is completed, and the closure is recorded in the audit log with the required information. |
| ST04 | Malicious, invalid, or unauthorized | An unauthorized user attempts to close an open maintenance issue, or attempts to close it without the required authorization, reason, audit record, or previous-state data. | The maintenance closure is rejected, the room remains unavailable for booking or assignment, no unauthorized room status change occurs, and the rejected attempt is recorded in the audit log. |

### Solution

Expected implementation outline:

```text
receive maintenance closure request
validate authenticated user and maintenance closure permission
load room record and open maintenance issue inside a transaction

if the room has no open maintenance issue:
    reject request
    record rejected closure attempt without sensitive data

if approver, reason, audit metadata, or previous-state restoration data is missing:
    reject request
    keep the room unavailable for booking and assignment
    record rejected closure attempt without sensitive data

record immutable audit entry with actor, timestamp, room ID, maintenance issue ID, closure reason, previous room status, new room status, approval reference, and correlation ID
close the maintenance issue
restore the room only to an allowed operational state
make the room visible to booking or assignment only after the authorized closure is complete
commit the transaction
```

### OWASP Reference

Reference: OWASP Top 10 2021 A01 - Broken Access Control (CWE-284 / CWE-862) & OWASP ASVS v4.0.3 Chapter V4 (Access Control).

How the reference supports this practice: OWASP A01 and ASVS Chapter V4 mandate strict server-side access control validation to ensure operational state transitions (such as room maintenance status) cannot be bypassed by client-side manipulation, requiring mandatory authorized approvers, immutable audit trails, and transactional integrity.

## Traceability

| Practice | Risk | Requirement | Tests | OWASP Reference |
| --- | --- | --- | --- | --- |
| Practice 1 - Step-Up Authentication and Session Revocation | R02 - Account Takeover | SR01 | ST01, ST02 | OWASP Top 10:2021-A07 & OWASP Session Management Cheat Sheet |
| Practice 2 - Authorized Maintenance Closure and Room Availability Enforcement | R11 - Maintenance Note Tampering | SR03 | ST03, ST04 | OWASP Top 10:2021-A01 & OWASP ASVS v4.0.3 Chapter V4 |

## Final Review

- [x] Practice 1 is linked to R02 and SR01.
- [x] Practice 2 is linked to R11 and SR03.
- [x] Two practices are complete with defined security behaviors.
- [x] Tests appear before each finalized solution.
- [x] Each practice has one valid and one adversarial test.
- [x] Expected results are observable and verifiable.
- [x] Solutions satisfy the defined tests.
- [x] Risks, requirements, tests, and OWASP references are fully traceable.
