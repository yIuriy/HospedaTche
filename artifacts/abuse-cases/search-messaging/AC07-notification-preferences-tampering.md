### AC07 - Notification Preferences Tampering

Actor: unauthorized user or attacker.

Goal: disable notification alerts for a targeted guest account.

Conditions: notification preference endpoints lack authorization checks.

Abuse flow:
1. Attacker obtains the account ID or email of a targeted guest.
2. Attacker sends a request to the notification settings API with altered user parameters.
3. System updates the targeted guest's notification preferences without authorization.
4. Target guest stops receiving transactional notifications, booking updates, and check-in reminders.

Impact: missed reservation updates, operational confusion, and potential account compromise without user awareness.

Related STRIDE categories: Tampering
