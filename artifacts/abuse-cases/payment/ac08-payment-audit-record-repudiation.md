### AC08 - Payment Audit Record Repudiation

Actor: malicious Guest.

Goal: claim a full refund or chargeback via credit card provider by denying the completion of a transaction.

Conditions: the system fails to store cryptographically signed receipts, correlation IDs, or detailed transaction audit logs linked to the Guest's identity.

Abuse flow:
1. Attacker completes a legitimate payment for a booking and occupies the room.
2. Attacker initiates a chargeback dispute with their bank, claiming they never authorized the transaction.
3. The bank requests proof of payment and authorization from the hotel.
4. The system lacks sufficient audit records, IP logs, or verified payment gateway transaction IDs to prove the guest authorized it.
5. The hotel is forced to accept the chargeback and refund the amount.

Impact: fraudulent chargebacks, direct financial loss, and penalty fees from payment processors.

Related STRIDE categories: Repudiation
