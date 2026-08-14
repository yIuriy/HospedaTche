# HospedaTche Secure Code and Security Tests

Status: Final

Stage 4 demonstrates how Stage 3 security requirements become secure implementation practices and tests defined before the solution.

## Practice 1 - Registration Validation, Password Hashing, and Step-Up Authentication

Related Risk: R02 - Account Takeover.

Related Requirement: SR01 - Require step-up authentication before sensitive account changes and revoke active sessions after password change or recovery.

Secure Practice: Validate registration and profile payloads with strict Zod schemas, normalize email and CPF values, reject malformed identity data and weak passwords, use parameterized SQL, hash passwords with bcrypt cost 10, enforce re-authentication before sensitive identity changes, and revoke previous sessions after password changes.

### Tests Defined Before the Solution

| ID | Type | Input or Action | Expected Secure Result |
| --- | --- | --- | --- |
| ST01 | Valid or authorized | POST `/api/v1/auth/register` with valid email, CPF, strong password, and full name. | Registration returns HTTP 201 with normalized, non-sensitive Guest metadata and no password hash. |
| ST02 | Malicious, invalid, or unauthorized | POST `/api/v1/auth/register` with SQL injection text in email or CPF, malformed identity data, or a weak password. | Request returns HTTP 400 before persistence; parameterized SQL is not altered and no account is created. |

### Solution

Implemented in `system/backend/src/routes/identity.js` and verified through `system/backend/test/identity.test.js`.

Implementation outline:

```text
receive registration or profile request
validate strict Zod schema and normalize identity fields

if registration data is invalid:
    reject request before database access

query email and CPF using bound SQL parameters
hash accepted password with bcrypt cost 10
persist user with Guest role
return only non-sensitive metadata

for sensitive profile changes:
    validate authenticated JWT session
    require current password

if re-authentication fails:
    reject request

apply authorized account change

if password changed:
    store new bcrypt hash
    increment auth version to reject old JWT sessions
```

### OWASP Reference

Reference: OWASP ASVS V2 - Authentication; OWASP Input Validation Cheat Sheet; OWASP Password Storage Cheat Sheet.

How the reference supports this practice: These references require server-side input validation, approved password hashing, re-authentication for critical identity changes, and invalidation of prior authentication state after password replacement.

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
| Practice 1 - Registration Validation, Password Hashing, and Step-Up Authentication | R01 - Fake Guest Registration; R02 - Account Takeover | SR01 | ST01, ST02 | OWASP ASVS V2; Input Validation Cheat Sheet; Password Storage Cheat Sheet |
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
