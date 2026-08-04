# Search Messaging Risk Register

Module scope: room search, public room details, hidden room enumeration, reviews, ratings, notifications, chat, and messaging logs.

Stage 1 sources:

- STRIDE threats: `artifacts/threat-modeling/search-messaging/`
- Abuse cases: `artifacts/abuse-cases/search-messaging/`

## Risk Register

| ID | Related STRIDE Threat | Related Abuse Case | Risk Event | Vulnerability or Condition | Probability | Impact | Score | Level |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | T01 - Automated Room Search Overload | AC01 - Automated Search Abuse | Attacker floods room search API with automated scripts, degrading or crashing room availability search. | Missing rate limiting, IP throttling, bot detection, and search query caching mechanisms. | 3 | 3 | 9 | High |
| R02 | T02 - Chat Message Flooding | AC02 - Chat Message Flooding | Malicious user floods reception chat queue with automated messages, blocking legitimate guest inquiries. | Absence of message rate limits, connection throttling, and chat queue protection. | 3 | 3 | 9 | High |
| R03 | T03 - Guest Chat History Exposure | AC03 - Guest Chat History Exposure | Attacker tampers with chat API parameters to retrieve private chat history belonging to another guest. | Missing server-side authorization check matching requester user ID to chat session owner. | 3 | 4 | 12 | Critical |
| R04 | T04 - Internal Maintenance Notes Exposure | AC04 - Internal Maintenance Notes Exposure | Visitor reads internal maintenance logs and unmasked operational notes in public room API response. | Room detail API endpoint returns unmasked internal DTO fields without proper field projection filters. | 3 | 3 | 9 | High |
| R05 | T05 - Hidden Review Data Exposure | AC05 - Hidden Review Data Exposure | Unauthorized user queries reviews API to retrieve hidden or moderated guest reviews. | Review listing endpoint lacks manager-only filter validation for hidden status flags. | 2 | 3 | 6 | Medium |
| R06 | T06 - Review Spamming And Manipulation | AC06 - Review Spamming And Manipulation | Malicious user posts fraudulent or duplicate reviews for unverified stays to manipulate hotel rating. | Review submission system lacks completed stay verification check against booking DB. | 3 | 3 | 9 | High |
| R07 | T07 - Notification Preferences Tampering | AC07 - Notification Preferences Tampering | Attacker alters notification preferences of another guest to disable critical security and stay alerts. | Notification settings API endpoint lacks ownership authorization validation. | 2 | 3 | 6 | Medium |
| R08 | T08 - Fake Stay Notification Injection | AC08 - Fake Stay Notification Injection | Attacker injects spoofed stay notifications or check-in emails with phishing links to steal guest credentials. | Notification delivery mechanism lacks cryptographic sender validation and origin checks. | 3 | 4 | 12 | Critical |
| R09 | T09 - Bulk Review Rating Tampering | AC09 - Bulk Review Rating Tampering | Malicious employee or attacker with compromised credentials overwrites guest reviews in bulk to forge false hotel rating. | Review moderation API lacks bulk-edit rate limits and multi-actor approval workflows. | 2 | 4 | 8 | High |
| R10 | T10 - Permanent Guest Review Purge | AC10 - Permanent Guest Review Purge | Rogue manager bypasses "hide review" policy to permanently purge guest review records from database. | Review API allows hard DELETE operations instead of enforcing soft-delete/hide status only. | 2 | 4 | 8 | High |
| R11 | T11 - Hidden Room Enumeration And Brute Force | AC11 - Hidden Room Enumeration And Brute Force | Attacker uses automated scripts to brute-force room IDs and discover unlisted or blocked rooms. | Room query API lacks sequential parameter enumeration protection and visibility filtering. | 3 | 2 | 6 | Medium |
| R12 | T12 - Misdirected Chat Billing Request And Staff Message Spoofing | AC12 - Misdirected Chat Billing Request And Staff Message Spoofing | Attacker or rogue staff sends misdirected or spoofed payment request links in guest chat queue. | Chat queue interface lacks strict session binding and pre-send payment link verification. | 2 | 4 | 8 | High |
| R13 | T13 - Guest Privilege Escalation To Receptionist Chat Queue | AC13 - Guest Privilege Escalation To Receptionist Chat Queue | Guest tampers with role tokens to gain staff access over master receptionist chat queue. | Staff chat queue API endpoints fail to enforce server-side RBAC role verification. | 2 | 4 | 8 | High |
| R14 | T14 - Chat Message Tampering And History Repudiation Purge | AC14 - Chat Message Tampering And History Repudiation Purge | User or staff alters sent messages or purges chat history to destroy evidence of misconduct. | Chat API allows retroactive message text updates or deletion without immutable change logs. | 2 | 3 | 6 | Medium |

## Evaluation Justifications

### RNN - Risk Title

Probability justification: TODO.

Impact justification: TODO.

Affected users, data, features, or components: TODO.

Expected consequences: TODO.

Risk level justification: TODO.

## Prioritization

| Priority | Risk | Reason |
| --- | --- | --- |
| 1 | RNN | TODO |

## NIST CSF 2.0 Mapping

| Risk | Govern | Identify | Protect | Detect | Respond | Recover | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| RNN | TODO | TODO | TODO | TODO | TODO | TODO | TODO |

## Treatment Plan

| Risk | Strategy | Proposed Controls | NIST Functions | Responsible Parties | Evidence and Verification |
| --- | --- | --- | --- | --- | --- |
| RNN | TODO | TODO | TODO | TODO | TODO |

## Initial Implementation Order

| Order | Control or Action | Related Risks | Reason |
| --- | --- | --- | --- |
| 1 | TODO | RNN | TODO |

## Expected Residual Risk

| Risk | Initial Level | Expected Residual Level | Condition to Accept Residual |
| --- | --- | --- | --- |
| RNN | TODO | TODO | TODO |

## Final Notes

TODO.
