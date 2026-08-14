### AC15 - Unauthorized Guest Profile Access

Actor: malicious user.

Goal: access another Guest's profile data without permission.

Conditions: the system has weak profile access control or allows users to reference profile records that do not belong to them.

Abuse flow:
1. Attacker logs in with a valid account.
2. Attacker changes a profile identifier, URL, or request parameter.
3. System returns another Guest's profile data.
4. Attacker views personal data without authorization.

Impact: personal data exposure, privacy violation, unauthorized access to account information, and loss of user trust.

Related STRIDE categories: Information Disclosure, Elevation of Privilege

