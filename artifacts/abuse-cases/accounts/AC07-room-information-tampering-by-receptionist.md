### AC07 - Room Information Tampering By Receptionist

Actor: malicious Receptionist.

Goal: obtain Manager permissions and alter legitimate room information.

Conditions: Receptionist obtains Manager-level permissions through misconfiguration, authorization failure, or improper role assignment.

Abuse flow:
1. Receptionist obtains Manager permissions.
2. Receptionist opens the room management page.
3. Receptionist changes room information, such as status, capacity, size, or other operational data.
4. Room information becomes incorrect and hotel operation is disrupted.

Impact: hotel operation disruption, room data integrity loss, and unauthorized privilege use.

Related STRIDE categories: Elevation of Privilege, Denial of Service, Tampering

