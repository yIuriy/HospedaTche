### AC02 - Fake Booking Creation

Actor: malicious user.

Goal: create fake bookings to occupy room availability without intending to complete legitimate stays.

Conditions: the system allows booking creation with insufficient identity validation or without requiring immediate payment confirmation.

Abuse flow:
1. Attacker creates one or more bookings using false or stolen Guest information.
2. The system accepts the booking requests and temporarily reserves the selected rooms.
3. The attacker abandons the bookings without completing the payment.
4. Legitimate Guests are prevented from booking the occupied rooms until the bookings expire.

Impact: reduced room availability, operational disruption, fraudulent bookings, and financial losses.

Related STRIDE categories: Tampering, Denial of Service
