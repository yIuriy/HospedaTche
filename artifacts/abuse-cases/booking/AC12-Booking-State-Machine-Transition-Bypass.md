### AC12 - Booking State Machine Transition Bypass

Actor: malicious Guest.

Goal: re-activate an expired, cancelled, or completed booking without authorization or repayment.

Conditions: the booking status transition logic fails to enforce strict state machine rules, allowing invalid transitions.

Abuse flow:
1. Attacker identifies one of their own previous bookings that is now in a terminal state (e.g., "Cancelled", "Expired", or "Completed").
2. Attacker sends a state transition request directly to the API, attempting to force the status back to "Confirmed" or "Active".
3. The system accepts the state transition without validating that the booking was paid for again, or that the room is still available for the selected dates.
4. The booking is re-activated, allowing the attacker to check in or occupy the room.

Impact: double-booking conflicts, financial losses, bypassed payment flows, and corrupted booking database state.

Related STRIDE categories: Tampering
