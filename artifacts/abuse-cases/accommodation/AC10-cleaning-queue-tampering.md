### AC10 - Cleaning Queue Tampering

Actor: malicious Receptionist or Manager.

Goal: remove rooms from cleaning workflow incorrectly.

Conditions: staff member has valid access to cleaning status controls.

Abuse flow:
1. Malicious staff member logs in with valid credentials.
2. Staff member opens the cleaning queue.
3. Staff member marks a room as Free before cleaning is complete.
4. Staff assigns or offers the room based on the false clean status.

Impact: unclean room assignment, delayed cleaning, guest dissatisfaction, and disrupted room turnover.

Related STRIDE categories: Tampering, Denial of Service