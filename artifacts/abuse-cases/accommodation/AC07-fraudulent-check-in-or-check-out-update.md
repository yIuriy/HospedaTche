### AC07 - Fraudulent Check In Or Check Out Update

Actor: malicious Receptionist.

Goal: change stay status without the real check-in or check-out event.

Conditions: Receptionist has valid access to stay operation controls.

Abuse flow:
1. Malicious Receptionist logs in with valid credentials.
2. Receptionist opens a confirmed or checked-in reservation.
3. Receptionist performs check-in or check-out without the real guest action.
4. Reservation and room status are updated incorrectly.

Impact: incorrect reservation lifecycle, wrong room status, guest service errors, and audit inconsistency.

Related STRIDE categories: Tampering, Repudiation