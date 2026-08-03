### AC04 - Forced Booking Expiration

Actor: malicious user.

Goal: prevent legitimate Guests from confirming their bookings by forcing the immediate expiration of pending bookings.

Conditions: the attacker is able to manipulate or trigger the booking expiration process.

Abuse flow:
1. Attacker identifies pending bookings awaiting payment.
2. Attacker triggers the booking expiration process before the payment deadline.
3. The system marks the bookings as expired.
4. Legitimate Guests are unable to complete the payment and lose their bookings.

Impact: unintended booking cancellations, customer dissatisfaction, loss of revenue, and disruption of the booking process.

Related STRIDE categories: Denial of Service
