### AC11 - Unauthorized Booking Confirmation

Actor: malicious Guest.

Goal: confirm a booking without completing the required payment or authorization process.

Conditions: the system exposes internal/staff booking confirmation APIs or fails to validate that the confirmation request originated from a trusted payment gateway or authorized staff.

Abuse flow:
1. Attacker creates a booking, which enters a pending state awaiting payment.
2. Attacker bypasses the payment flow and directly invokes the internal booking confirmation endpoint (e.g., intended for receptionists or payment webhooks).
3. The system processes the request without validating the attacker's administrative privileges or verifying payment receipt.
4. The booking status is updated to "Confirmed" without any actual payment being processed.

Impact: fraudulent bookings, financial losses due to unpaid stays, and operational disruption.

Related STRIDE categories: Elevation of Privilege, Tampering
