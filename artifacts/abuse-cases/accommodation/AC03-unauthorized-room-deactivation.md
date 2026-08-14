### AC03 - Unauthorized Room Deactivation

Actor: malicious Manager.

Goal: remove active rooms from normal booking availability.

Conditions: Manager has valid access to the room management module.

Abuse flow:
1. Malicious Manager logs in with valid credentials.
2. Manager opens the room management module.
3. Manager deactivates active rooms without a legitimate operational reason.
4. Deactivated rooms no longer receive new reservations.

Impact: lost reservations, reduced room availability, operational disruption, and incorrect room inventory records.

Related STRIDE categories: Tampering, Denial of Service