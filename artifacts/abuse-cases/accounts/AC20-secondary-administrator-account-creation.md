### AC20 - Secondary Administrator Account Creation

Actor: malicious manager or internal staff user.

Goal: create or escalate a second Administrator account in violation of system governance rules.

Conditions: the account provisioning endpoint or role modification handler lacks strict transactional enforcement of the single Administrator constraint defined in RF08.

Abuse flow:
1. Attacker authenticates with a staff or manager account.
2. Attacker submits concurrent or manipulated requests to account creation or update APIs targeting role assignment with role: "Administrator".
3. System processes the request without enforcing atomic single-admin uniqueness constraints across concurrent requests.
4. Second Administrator account is successfully created or assigned.
5. Attacker gains full administrative privileges and bypasses single-administrator oversight.

Impact: compromise of governance model, unauthorized system configuration changes, and inability to maintain a single root authority.

Related STRIDE categories: Elevation of Privilege, Tampering
