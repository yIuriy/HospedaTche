### AC01 - Fake Guest Registration

Actor: malicious user.

Goal: create a Guest account using stolen or false identity data.

Conditions: the system accepts guest registration data without enough email and identity validation.

Abuse flow:
1. Attacker obtains or invents personal data.
2. Attacker creates a Guest account with fake or stolen CPF and email data.
3. Attacker uses the account to search rooms or attempt reservations.
4. Staff or system records actions under an unreliable identity.

Impact: identity misuse, fraudulent reservations, audit confusion, and trust loss.

Related STRIDE categories: Spoofing
