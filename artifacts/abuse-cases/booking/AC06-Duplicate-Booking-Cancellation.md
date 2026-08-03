### AC06 - Duplicate Booking Cancellation

Actor: malicious user.

Goal: receive multiple refunds by repeatedly cancelling the same booking.

Conditions: the system does not correctly update or validate the booking status after the first cancellation.

Abuse flow:
1. Attacker submits a cancellation request for a booking.
2. The booking is cancelled successfully.
3. The attacker repeatedly submits additional cancellation requests for the same booking.
4. The system processes the duplicate requests as valid cancellations.
5. Multiple refund requests are generated for the same booking.

Impact: duplicate refund processing, financial losses, inconsistent booking records, and compromised booking management.

Related STRIDE categories: Tampering
