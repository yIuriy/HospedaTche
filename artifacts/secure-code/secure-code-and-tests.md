# HospedaTche Secure Code and Security Tests

Status: Draft

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

Pending: Iuri. Complete this section only after ST01 and ST02 are finalized.

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

Reference: Pending final review by Rafaela. Candidate: OWASP Top 10 2021 A07 - Identification and Authentication Failures.

How the reference supports this practice: Pending final review by Rafaela.

## Practice 2 - Pending Secure Practice

Related Risk: Pending: Lara.

Related Requirement: Pending: Lara.

Secure Practice: Pending: Lara.

### Tests Defined Before the Solution

| ID | Type | Input or Action | Expected Secure Result |
| --- | --- | --- | --- |
| ST03 | Valid or authorized | Pending: Dyonathan. | Pending: Dyonathan. |
| ST04 | Malicious, invalid, or unauthorized | Pending: Dyonathan. | Pending: Dyonathan. |

### Solution

Pending: Lara. Complete this section only after ST03 and ST04 are finalized.

### OWASP Reference

Reference: Pending final review by Rafaela.

How the reference supports this practice: Pending final review by Rafaela.

## Traceability

| Practice | Risk | Requirement | Tests | OWASP Reference |
| --- | --- | --- | --- | --- |
| Practice 1 | R02 - Account Takeover | SR01 | ST01, ST02 | OWASP Top 10 2021 A07, pending final review |
| Practice 2 | Pending: Lara | Pending: Lara | ST03, ST04 | Pending: Rafaela |

## Final Review

- [x] Practice 1 is linked to R02 and SR01.
- [ ] Two practices are complete.
- [ ] Tests appear before each finalized solution.
- [ ] Each practice has one valid and one adversarial test.
- [ ] Expected results are observable.
- [ ] Solutions satisfy the defined tests.
- [ ] Risks, requirements, tests, and OWASP references are fully traceable.
