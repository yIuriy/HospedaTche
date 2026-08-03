### AC07 - Fraudulent Booking Repudiation

Actor: malicious Guest.

Goal: obtain a full refund after the cancellation deadline by denying the creation of a legitimate booking.

Conditions: the system lacks sufficient audit evidence to prove that the Guest authorized the booking and its associated payment.

Abuse flow:
1. Attacker legitimately creates and pays for a booking.
2. The full refund cancellation period expires.
3. Attacker contacts the hotel claiming the booking was created without authorization.
4. Attacker alleges that the system improperly reused the credit card information from a previous booking to create a new booking without consent.
5. Unable to prove the legitimacy of the booking, the hotel accepts the claim and grants a full refund.

Impact: fraudulent refunds, financial losses, customer disputes, and reduced trust in the booking process.

Related STRIDE categories: Repudiation
