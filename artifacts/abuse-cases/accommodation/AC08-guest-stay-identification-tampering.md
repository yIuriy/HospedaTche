### AC08 - Guest Stay Identification Tampering

Actor: malicious Receptionist.

Goal: change guest identification confirmation data during check-in.

Conditions: Receptionist has valid access to guest identification confirmation at check-in.

Abuse flow:
1. Malicious Receptionist logs in with valid credentials.
2. Receptionist opens guest identification data for a reservation.
3. Receptionist confirms or changes identification data incorrectly.
4. Reservation history stores unreliable identification confirmation.

Impact: incorrect stay registration, guest identity inconsistency, privacy risk, and unreliable reservation history.

Related STRIDE categories: Tampering, Information Disclosure