### AC10 - Unauthorized Booking Modification

Actor: malicious Guest.

Goal: modify another Guest's booking without authorization.

Conditions: the system does not properly validate ownership before allowing booking modifications.

Abuse flow:
1. Attacker obtains the identifier of another Guest's booking.
2. Attacker submits a request to modify booking details, such as dates, room type, or number of Guests.
3. The system fails to verify that the booking belongs to the authenticated Guest.
4. The booking is updated with unauthorized information.

Impact: unauthorized booking modifications, customer disputes, operational disruption, and financial losses.

Related STRIDE categories: Tampering
