### AC21 - Internal Staff Hierarchy Bypass

Actor: malicious manager or receptionist account holder.

Goal: modify, inactivate, or manage accounts belonging to higher or equal privilege levels (such as Administrators or peer Managers) in violation of role authority rules.

Conditions: staff management endpoints verify that the requesting user possesses administrative rights (e.g. Manager role) but fail to compare actor role hierarchy against target account role.

Abuse flow:
1. Attacker authenticates as a Manager or Receptionist.
2. Attacker sends account modification or inactivation requests targeting a peer Manager or Administrator user ID.
3. System verifies only that the requester has staff management access without checking target user role boundaries.
4. System executes inactivation or privilege modification on the higher-tier target account.
5. Attacker locks out legitimate managers or administrators and disrupts hotel operations.

Impact: operational denial of service, lock-out of legitimate management personnel, and breach of staff access control hierarchy.

Related STRIDE categories: Elevation of Privilege, Denial of Service, Tampering
