### AC07 - Refund Value Tampering

Actor: malicious Guest or staff.

Goal: receive a higher refund amount than allowed by the cancellation policy.

Conditions: the system accepts client-side or parameter-manipulated refund values, or lacks authorization validation on the refund value calculation API.

Abuse flow:
1. Attacker requests cancellation of a booking, which is eligible only for a 50% refund.
2. Attacker intercepts the refund request and manipulates the refund value or refund percentage parameter to 100%.
3. The system processes the refund request using the manipulated parameter value without recalculating it on the server-side.
4. The payment gateway issues a full refund to the attacker.

Impact: financial losses for the hotel and inconsistent refund/accounting records.

Related STRIDE categories: Tampering
