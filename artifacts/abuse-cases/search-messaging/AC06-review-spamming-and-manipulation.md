### AC06 - Review Spamming And Manipulation

Actor: malicious user or competitor.

Goal: post fraudulent or duplicate reviews to artificially manipulate hotel ratings.

Conditions: review submission endpoint does not verify whether the user completed a verified stay.

Abuse flow:
1. Attacker registers multiple guest accounts or reuses a single account.
2. Attacker sends multiple review submission requests without completing an actual stay.
3. System accepts and publishes the unverified reviews.
4. Hotel overall rating is unfairly inflated or deflated.

Impact: rating distortion, misleading prospective guests, and unfair competition.

Related STRIDE categories: Tampering
