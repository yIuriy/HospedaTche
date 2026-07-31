### AC06 - Receptionist Privilege Escalation

Actor: malicious Receptionist.

Goal: obtain Manager permissions and inactivate legitimate Receptionist accounts.

Conditions: Receptionist obtains Manager-level permissions through misconfiguration, authorization failure, or improper role assignment.

Abuse flow:
1. Receptionist obtains Manager permissions.
2. Receptionist opens the receptionist management module.
3. Receptionist inactivates legitimate Receptionist accounts.
4. Legitimate Receptionists lose access and hotel operation is disrupted.

Impact: hotel operation disruption, blocked receptionist access, and unauthorized privilege use.

Related STRIDE categories: Elevation of Privilege, Denial of Service, Tampering

