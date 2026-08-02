### AC09 - Bulk Review Rating Tampering

Actor: malicious employee or attacker with compromised manager account.

Goal: alter or overwrite guest reviews in bulk to display a false hotel rating status and destroy hotel reputation.

Conditions: review moderation API lacks rate limits on bulk edits, multi-actor approval controls, and change logs.

Abuse flow:
1. Attacker logs into the staff/manager portal using compromised or insider credentials.
2. Attacker issues a batch update request targeting multiple past guest review records.
3. System accepts the bulk modification without requiring multi-actor approval or verification.
4. System recalculates and displays a false, deflated overall hotel rating to all site visitors.

Impact: severe reputational harm, loss of booking revenue, and audit record contamination.

Related STRIDE categories: Tampering, Elevation of Privilege
