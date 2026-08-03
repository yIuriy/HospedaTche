### AC09 - Payment Process Interruption

Actor: malicious competitor or user.

Goal: prevent a specific Guest from completing their payment, causing their booking to expire.

Conditions: the system allows locking of session resources or payment gateways to be triggered by third-party requests.

Abuse flow:
1. Attacker targets a victim's pending booking nearing the payment deadline.
2. Attacker floods the payment session or API for that booking with simulated failed payment attempts or conflicting state changes.
3. The payment gateway locks the payment session due to security alerts, or the system locks the booking state.
4. The legitimate Guest attempts to complete the payment but receives transaction errors or session blocks.
5. The payment deadline expires, and the booking is automatically cancelled.

Impact: operational disruption, customer dissatisfaction, and loss of hotel revenue.

Related STRIDE categories: Denial of Service
