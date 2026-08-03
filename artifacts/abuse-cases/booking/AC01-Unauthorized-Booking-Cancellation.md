### AC01 - Unauthorized Booking Cancellation

Actor: malicious Guest.

Goal: cancel another Guest's booking without authorization.

Conditions: the attacker obtains another Guest's booking identifier or exploits missing authorization checks in the booking cancellation process.

Abuse flow:
1. Attacker obtains the identifier of another Guest's booking.
2. Attacker submits a cancellation request for the victim's booking.
3. The system fails to verify that the authenticated Guest owns the booking.
4. The booking is cancelled without the victim's authorization.

Impact: unauthorized booking cancellation, customer disputes, financial losses, and disruption of hotel operations.

Related STRIDE categories: Tampering, Elevation of Privilege, Denial of Service
