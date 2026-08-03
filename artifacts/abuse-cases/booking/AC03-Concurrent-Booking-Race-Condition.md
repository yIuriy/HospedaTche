### AC03 - Concurrent Booking Race Condition

Actor: malicious user.

Goal: obtain multiple confirmed bookings for the same room by exploiting concurrent booking requests.

Conditions: the system does not synchronize room availability before confirming concurrent booking requests.

Abuse flow:
1. Attacker submits multiple booking requests for the same room simultaneously.
2. The system processes the requests in parallel.
3. Room availability is not updated before all requests are validated.
4. More than one booking is confirmed for the same room.

Impact: duplicate bookings, inconsistent booking records, operational conflicts, and customer dissatisfaction.

Related STRIDE categories: Tampering
