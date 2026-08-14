### AC01 - Payment Reference Substitution

Actor: malicious Guest.

Goal: confirm a higher-value booking by paying only for a lower-value booking.

Conditions: the system does not properly bind payment transactions to their corresponding booking identifiers during payment confirmation.

Abuse flow:
1. Attacker creates two pending bookings, one for a low-cost room and another for a higher-cost room.
2. Attacker proceeds to pay only for the lower-cost booking.
3. Attacker manipulates the payment reference or booking identifier associated with the transaction.
4. The system incorrectly associates the payment with the higher-cost booking.
5. The higher-cost booking is confirmed while the lower-cost booking remains unpaid or expires.

Impact: unauthorized booking confirmation, financial losses, inconsistent payment records, and unfair access to higher-value accommodations.

Related STRIDE categories: Tampering
