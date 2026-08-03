### AC10 - Payment Gateway Token Tampering

Actor: malicious Guest.

Goal: bypass the payment gateway by injecting fake approval tokens into the webhook or confirmation API.

Conditions: the system does not verify payment gateway webhook signatures or accepts raw client-side payment tokens without server-side validation.

Abuse flow:
1. Attacker initiates a booking and is redirected to the payment gateway.
2. Attacker bypasses the payment step and directly calls the hotel's webhook/callback endpoint, sending a spoofed payment confirmation token or request.
3. The system fails to verify the token signature or query the payment gateway API to check if the transaction is authentic.
4. The system updates the booking status to "Confirmed" based on the spoofed callback.

Impact: unpaid bookings confirmed, financial loss, and compromised transaction database integrity.

Related STRIDE categories: Tampering
