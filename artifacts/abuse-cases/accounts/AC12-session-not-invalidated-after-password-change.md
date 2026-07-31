### AC12 - Session Not Invalidated After Password Change

Actor: malicious user.

Goal: keep access to a legitimate user's account after the password is changed.

Conditions: attacker already has an active session and the system does not invalidate other sessions after password change.

Abuse flow:
1. Attacker obtains access to a legitimate user's account.
2. Legitimate user changes the account password.
3. System keeps the attacker's old session active.
4. Attacker continues accessing the account without knowing the new password.

Impact: continued unauthorized access, private data exposure, account recovery failure, and loss of user trust.

Related STRIDE categories: Tampering, Spoofing, Information Disclosure

