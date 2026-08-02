### AC02 - Chat Message Flooding

Actor: malicious guest or unauthenticated spammer.

Goal: overwhelm the reception chat queue and disrupt staff communication operations.

Conditions: chat API lacks rate limits, message throttling, and connection controls per account.

Abuse flow:
1. Attacker opens a chat session with the reception desk.
2. Attacker runs a script sending thousands of automated messages per minute.
3. Reception chat queue gets flooded with spam messages.
4. Receptionists are unable to identify or respond to legitimate guest inquiries in time.

Impact: operational disruption, staff fatigue, and guest dissatisfaction due to ignored support requests.

Related STRIDE categories: Denial of Service
