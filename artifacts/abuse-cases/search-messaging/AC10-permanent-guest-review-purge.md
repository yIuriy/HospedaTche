### AC10 - Permanent Guest Review Purge

Actor: malicious manager or attacker with staff account access.

Goal: permanently delete negative or policy-violating guest reviews from the system instead of using the mandatory hide/moderate status.

Conditions: review moderation API allows hard deletion requests instead of enforcing soft-delete status only.

Abuse flow:
1. Attacker accesses the review moderation interface using staff credentials.
2. Attacker issues a hard delete request targeting selected or all negative guest reviews.
3. System permanently removes the review records from the database instead of setting status to hidden.
4. Guest review records are destroyed permanently, making it impossible to verify original feedback or review history.

Impact: permanent loss of guest feedback history, repudiation of review moderation rules, and unauthorized data destruction.

Related STRIDE categories: Repudiation, Tampering
