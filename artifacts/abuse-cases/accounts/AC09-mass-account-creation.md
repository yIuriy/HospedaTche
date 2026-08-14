### AC09 - Mass Account Creation

Actor: malicious user.

Goal: fill the database with many fake accounts.

Conditions: the system allows repeated account creation with different email addresses without enough registration limits or abuse controls.

Abuse flow:
1. Attacker prepares many different email addresses.
2. Attacker creates many Guest accounts.
3. Fake account records accumulate in the database.
4. System performance, storage usage, and account management are affected.

Impact: performance degradation, increased storage cost, polluted account records, and reduced system availability.

Related STRIDE categories: Denial of Service

