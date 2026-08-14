### AC16 - Inactive Account Still Has Access

Actor: malicious user.

Goal: keep using the system after the account is deleted or inactivated.

Conditions: the system inactivates or deletes an account but does not revoke sessions, tokens, or effective permissions.

Abuse flow:
1. User account is deleted or inactivated by an authorized user.
2. System fails to revoke active sessions, tokens, or permissions.
3. Malicious user continues accessing protected system features.
4. Malicious user views data or performs actions with an account that should no longer have access.

Impact: unauthorized access, private data exposure, invalid audit records, and loss of trust in account inactivation.

Related STRIDE categories: Elevation of Privilege, Information Disclosure, Tampering

