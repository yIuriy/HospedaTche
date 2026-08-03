### AC06 - Occupancy Capacity Tampering

Actor: malicious Manager.

Goal: change room capacity to bypass occupancy limits.

Conditions: Manager has valid access to room configuration fields.

Abuse flow:
1. Malicious Manager logs in with valid credentials.
2. Manager opens room configuration.
3. Manager increases or decreases room capacity incorrectly.
4. Booking flow validates reservations using the false capacity value.

Impact: unsafe stays, hotel policy violation, guest disputes, and inconsistent reservation data.

Related STRIDE categories: Tampering