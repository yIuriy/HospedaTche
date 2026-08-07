### AC02 - Booking Cancellation Blocking

Actor: malicious Guest or competitor.

Goal: prevent legitimate Guests from cancelling their bookings, forcing them to incur cancellation fees or lose their refund window.

Conditions: the system locks reservation records indefinitely during active cancellation queries or fails to implement rate limits on simulated cancellation checks, allowing an attacker to lock the resource.

Abuse flow:
1. Attacker targets a victim's booking that is nearing its free cancellation deadline.
2. Attacker repeatedly initiates booking modification or payment simulation requests for the victim's booking ID, or floods the cancellation endpoint for that booking.
3. The system locks the booking record to prevent concurrent updates, making the cancellation API temporarily unavailable to the legitimate owner.
4. The legitimate Guest attempts to cancel the booking but receives an error or timeout.
5. The cancellation deadline passes.
6. The Guest is charged the booking fee or loses the refund window, resulting in financial loss.

Impact: financial losses for Guests, customer disputes, operational overhead, and loss of customer trust.

Related STRIDE categories: Denial of Service
