### AC05 - Payment Confirmation Blocking

Actor: malicious user.

Goal: prevent legitimate payment confirmations from being processed.

Conditions: the attacker is able to interfere with the payment confirmation process.

Abuse flow:
1. Attacker targets pending payment confirmations.
2. Attacker disrupts or blocks the confirmation requests.
3. The system fails to recognize completed payments.
4. Legitimate bookings remain pending or are cancelled.

Impact: booking cancellations, financial losses, customer dissatisfaction, and denial of payment services.

Related STRIDE categories: Denial of Service
