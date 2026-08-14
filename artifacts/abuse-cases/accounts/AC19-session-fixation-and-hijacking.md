### AC19 - Session Fixation And Hijacking

Actor: malicious network attacker or unauthenticated user.

Goal: hijack a legitimate user's authenticated session in HospedaTche to perform unauthorized actions on behalf of the victim.

Conditions: the system fails to regenerate session identifiers upon successful login or issues predictable session tokens that lack proper entropy, secure attributes (HttpOnly, SameSite, Secure), and expiration policies.

Abuse flow:
1. Attacker obtains a valid unauthenticated session identifier or pre-sets a known session ID on the victim's browser.
2. Victim logs into HospedaTche using their valid credentials.
3. System authenticates the victim but fails to rotate or regenerate the active session ID.
4. Attacker uses the known or hijacked session identifier to impersonate the victim.
5. Attacker accesses protected endpoints and performs unauthorized administrative, staff, or guest operations.

Impact: complete compromise of victim session, account takeover without password disclosure, unauthorized data exposure, and illegal transactions.

Related STRIDE categories: Spoofing, Information Disclosure, Elevation of Privilege
