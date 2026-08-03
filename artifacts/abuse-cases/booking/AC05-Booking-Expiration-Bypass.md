### AC05 - Booking Expiration Bypass

Actor: malicious user.

Goal: keep a pending booking active beyond the allowed payment deadline.

Conditions: the attacker is able to interfere with the booking expiration mechanism.

Abuse flow:
1. Attacker creates a booking that remains pending payment.
2. Attacker prevents the booking expiration process from being executed.
3. The booking remains reserved beyond the configured payment deadline.
4. The room stays unavailable to other Guests without a completed payment.

Impact: reduced room availability, unfair booking retention, operational disruption, and revenue loss.

Related STRIDE categories: Denial of Service
