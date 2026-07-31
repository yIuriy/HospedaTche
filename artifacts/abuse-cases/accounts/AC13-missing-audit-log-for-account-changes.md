### AC13 - Missing Audit Log For Account Changes

Actor: malicious user.

Goal: change account data or permissions without leaving traceable evidence.

Conditions: the system does not record account changes in audit logs or stores incomplete audit information.

Abuse flow:
1. Malicious user accesses an account management function.
2. Malicious user changes account data, permissions, password, or active status.
3. System does not record the action with actor, timestamp, and affected account.
4. Malicious user denies the action and investigation cannot confirm what happened.

Impact: lack of accountability, difficult incident investigation, undetected unauthorized changes, and loss of trust in account records.

Related STRIDE categories: Repudiation, Tampering

