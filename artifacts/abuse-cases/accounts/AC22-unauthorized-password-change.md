### AC22 - Unauthorized Password Change

Actor: malicious user.

Goal: change the legitimate user's password and prevent account access.

Conditions: attacker has obtained valid credentials or enough account access to trigger password change or recovery.

Abuse flow:
1. Attacker obtains valid email and password from a leak, phishing, or reuse.
2. Attacker logs in as the victim.
3. Attacker changes the victim account password.
4. Legitimate user loses access to the account.

Impact: private data exposure, account loss, and unauthorized control over the victim account.

Related STRIDE categories: Tampering

