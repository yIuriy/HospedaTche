### AC05 - Hidden Review Data Exposure

Actor: unauthorized user or competitor.

Goal: retrieve guest reviews that were hidden or moderated by hotel managers.

Conditions: review listing endpoint returns all reviews regardless of moderation status if query filters are manipulated.

Abuse flow:
1. Attacker queries the public reviews API endpoint.
2. Attacker modifies request parameters to include hidden or moderated status flags.
3. System fails to enforce manager-only authorization for moderated reviews.
4. Attacker accesses and publishes defamatory or policy-violating review content.

Impact: reputational damage and exposure of moderated internal records.

Related STRIDE categories: Information Disclosure
