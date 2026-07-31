### AC17 - Role Change Without Approval

Actor: malicious user.

Goal: change an account role without proper approval and gain stronger permissions.

Conditions: the system allows role changes without enough authorization, approval flow, or audit controls.

Abuse flow:
1. Malicious user accesses or abuses a role management function.
2. Malicious user changes an account role to a higher privilege level.
3. System accepts the role change without proper approval.
4. Malicious user performs actions outside the original role permissions.

Impact: unauthorized privilege gain, restricted function access, internal account abuse, and loss of permission control.

Related STRIDE categories: Elevation of Privilege, Tampering, Repudiation

