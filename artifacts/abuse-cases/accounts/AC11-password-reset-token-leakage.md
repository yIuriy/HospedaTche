### AC11 - Password Reset Token Leakage

Actor: malicious user.

Goal: use a leaked password reset token to impersonate a legitimate user.

Conditions: a legitimate user requests password recovery and the reset token is exposed through email compromise, logs, unsafe links, or another leakage point.

Abuse flow:
1. Legitimate user requests a password reset.
2. Password reset token is leaked.
3. Attacker obtains the token and uses it to reset the victim account password.
4. Attacker accesses the victim account and the legitimate user loses access.

Impact: private data exposure, account takeover, unauthorized password change, and loss of account access.

Related STRIDE categories: Information Disclosure, Spoofing, Tampering

