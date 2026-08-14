### AC02 - Unauthorized Payment Validation

Actor: malicious Guest.

Goal: have the system recognize an unpaid booking as successfully paid.

Conditions: the system fails to properly validate payment confirmation before updating the payment status.

Abuse flow:
1. Attacker creates a booking requiring payment.
2. Attacker manipulates the payment confirmation process or exploits a validation flaw.
3. The system incorrectly marks the payment as completed.
4. The booking is confirmed despite no legitimate payment being made.
5. Attacker submits a refund request for the confirmed booking.

Impact: unauthorized booking confirmation, fraudulent refund requests, financial losses, and compromised payment integrity.

Related STRIDE categories: Tampering
