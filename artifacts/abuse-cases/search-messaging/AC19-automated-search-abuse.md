### AC19 - Automated Search Abuse

Actor: malicious user or automated bot operator.

Goal: exhaust server resources and disrupt room availability search for legitimate users.

Conditions: search endpoints lack rate limiting and bot detection mechanisms.

Abuse flow:
1. Attacker deploys automated scripts targeting room availability search endpoints.
2. Scripts send high frequencies of search queries across wide date ranges and guest counts.
3. System database and web application experience severe performance degradation.
4. Legitimate guests receive slow responses or time out errors when searching for rooms.

Impact: service degradation, denial of service for prospective guests, and increased infrastructure cost.

Related STRIDE categories: Denial of Service
