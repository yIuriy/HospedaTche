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

### R01 - Automated Room Search Overload
Probability justification: High likelihood (3) because public search endpoints are exposed to unauthenticated web traffic and bots without CAPTCHA or rate limits.
Impact justification: High impact (3) because search unavailability prevents new bookings, causing direct revenue loss and customer dissatisfaction.
Affected users, data, features, or components: Prospective guests, public room availability search API, database query engine.
Expected consequences: System slowdown, database connection pool exhaustion, temporary search outage, and dropped reservations.
Risk level justification: High level (Score 9 = 3x3) due to business criticality of public search availability.

### R02 - Chat Message Flooding
Probability justification: High likelihood (3) as any guest or anonymous chat session can send rapid API requests without rate limiting.
Impact justification: High impact (3) because reception staff get overwhelmed, delaying response to urgent guest needs during check-in or stay.
Affected users, data, features, or components: Hotel receptionists, active guests, WebSocket/HTTP chat API, reception queue interface.
Expected consequences: Reception queue pollution, staff fatigue, missed guest emergencies, and service degradation.
Risk level justification: High level (Score 9 = 3x3) due to operational disruption at front desk.

### R03 - Guest Chat History Exposure
Probability justification: Medium-high likelihood (3) because parameter tampering (IDOR) on REST API endpoints is a common attack vector when authorization is missing.
Impact justification: Very high impact (4) due to severe guest privacy violation, LGPD non-compliance, exposure of travel dates, room numbers, and personal inquiries.
Affected users, data, features, or components: All hotel guests, chat history database, chat REST API.
Expected consequences: Massive data privacy breach, legal penalties, loss of guest trust, and brand damage.
Risk level justification: Critical level (Score 12 = 3x4) due to severe privacy and legal compliance consequences.

### R04 - Internal Maintenance Notes Exposure
Probability justification: Medium-high likelihood (3) as API responses often return full database models when DTO projections are omitted.
Impact justification: High impact (3) because physical lock defects and security vulnerability notes exposed to guests pose physical security risks.
Affected users, data, features, or components: Hotel physical security, room maintenance logs, public room detail API.
Expected consequences: Exploitation of physical room vulnerabilities, unauthorized intrusion risk, and hotel liability.
Risk level justification: High level (Score 9 = 3x3) due to physical security implications.

### R05 - Hidden Review Data Exposure
Probability justification: Medium-low likelihood (2) requiring parameter manipulation on review search filters.
Impact justification: High impact (3) as publishing moderated defamatory or policy-violating reviews damages hotel image and violates moderation rules.
Affected users, data, features, or components: Hotel management, reviews database, public reviews API.
Expected consequences: Public exposure of offensive or filtered review content and reputational harm.
Risk level justification: Medium level (Score 6 = 2x3) due to moderate exposure scope.

### R06 - Review Spamming And Manipulation
Probability justification: Medium-high likelihood (3) because review forms without stay verification invite fake reviews from competitors or bots.
Impact justification: High impact (3) as fake negative ratings directly depress booking conversion and distort hotel reputation.
Affected users, data, features, or components: Prospective guests, hotel management, review submission API, rating calculation service.
Expected consequences: Rating distortion, misleading prospective guests, unfair competition, and revenue loss.
Risk level justification: High level (Score 9 = 3x3) due to direct impact on hotel revenue and reputation.

### R07 - Notification Preferences Tampering
Probability justification: Medium-low likelihood (2) requiring IDOR parameter manipulation on user settings endpoints.
Impact justification: High impact (3) as disabling notification preferences causes guests to miss check-in alerts, door codes, and security notices.
Affected users, data, features, or components: Hotel guests, notification preference settings DB, push/email notification service.
Expected consequences: Missed stay alerts, operational confusion, and undetected account settings modification.
Risk level justification: Medium level (Score 6 = 2x3).

### R08 - Fake Stay Notification Injection
Probability justification: Medium-high likelihood (3) as spoofing unauthenticated email or push channels is frequently exploited in phishing campaigns.
Impact justification: Very high impact (4) because guests clicking fake payment links suffer financial theft, credential loss, and brand damage.
Affected users, data, features, or components: Hotel guests, notification delivery service, guest credentials.
Expected consequences: Guest financial loss, credential theft, phishing damage, and severe brand distrust.
Risk level justification: Critical level (Score 12 = 3x4) due to financial theft and credential compromise.

### R09 - Bulk Review Rating Tampering
Probability justification: Medium-low likelihood (2) requiring compromised staff credentials or insider access.
Impact justification: Very high impact (4) as wiping or modifying dozens of reviews in bulk destroys overall rating accuracy overnight.
Affected users, data, features, or components: Hotel reputation rating system, reviews DB, hotel management.
Expected consequences: Instant rating destruction, loss of prospective bookings, and audit log contamination.
Risk level justification: High level (Score 8 = 2x4).

### R10 - Permanent Guest Review Purge
Probability justification: Medium-low likelihood (2) requiring manager role access or API endpoint misuse.
Impact justification: Very high impact (4) because hard-deleting review records violates the mandatory "hide/retain" policy and prevents auditability.
Affected users, data, features, or components: Guest review records, moderation system, audit history.
Expected consequences: Irreversible loss of guest feedback history, repudiation of moderation decisions, and policy violation.
Risk level justification: High level (Score 8 = 2x4).

### R11 - Hidden Room Enumeration And Brute Force
Probability justification: Medium-high likelihood (3) because automated scripts easily iterate sequential room IDs in search APIs.
Impact justification: Moderate impact (2) as it leaks unlisted room inventory and maintenance states without exposing guest PII.
Affected users, data, features, or components: Room search API, room inventory DB.
Expected consequences: Intelligence leak of hidden hotel inventory and extra database load.
Risk level justification: Medium level (Score 6 = 3x2).

### R12 - Misdirected Chat Billing Request And Staff Message Spoofing
Probability justification: Medium-low likelihood (2) requiring receptionist portal session hijacking or misrouting.
Impact justification: Very high impact (4) as sending payment links to the wrong guest causes accidental or fraudulent financial transactions.
Affected users, data, features, or components: Hotel guests, reception chat queue, billing link integration.
Expected consequences: Misdirected billing, guest financial loss, dispute overhead, and legal liability.
Risk level justification: High level (Score 8 = 2x4).

### R13 - Guest Privilege Escalation To Receptionist Chat Queue
Probability justification: Medium-low likelihood (2) requiring missing server-side RBAC validation on staff endpoints.
Impact justification: Very high impact (4) as gaining receptionist privileges exposes all active guest chats and allows impersonating staff.
Affected users, data, features, or components: Staff chat queue, receptionist portal, all active guest chat sessions.
Expected consequences: Total breakdown of guest chat privacy, staff impersonation, and unauthorized access to reception tools.
Risk level justification: High level (Score 8 = 2x4).

### R14 - Chat Message Tampering And History Repudiation Purge
Probability justification: Medium-low likelihood (2) requiring API editing/deletion permissions on chat message endpoints.
Impact justification: High impact (3) as altering or deleting chat history destroys evidence during dispute resolution and breaks non-repudiation.
Affected users, data, features, or components: Chat database, message audit log, dispute resolution workflow.
Expected consequences: Non-repudiation failure, loss of dispute evidence, and inability to verify past staff/guest agreements.
Risk level justification: Medium level (Score 6 = 2x3).

## Prioritization

| Priority | Risk | Reason |
| --- | --- | --- |
| 1 | R03 | Critical risk (Score 12). Severe guest privacy breach and LGPD violation via chat IDOR. |
| 2 | R08 | Critical risk (Score 12). Direct guest financial theft and credential phishing via notification spoofing. |
| 3 | R01 | High risk (Score 9). Core public search API availability collapse prevents new revenue. |
| 4 | R02 | High risk (Score 9). Reception chat queue flooding paralyzes front desk operations. |
| 5 | R06 | High risk (Score 9). Review spamming directly distorts hotel reputation and booking conversion. |
| 6 | R04 | High risk (Score 9). Exposure of physical maintenance defects creates physical security liabilities. |
| 7 | R09 | High risk (Score 8). Bulk review tampering corrupts hotel reputation rating overnight. |
| 8 | R10 | High risk (Score 8). Hard deletion of reviews violates mandatory retention and audit rules. |
| 9 | R12 | High risk (Score 8). Misdirected billing links in chat cause financial misattribution. |
| 10 | R13 | High risk (Score 8). Privilege escalation to staff chat queue compromises master communications. |
| 11 | R05 | Medium risk (Score 6). Exposure of moderated reviews damages image. |
| 12 | R07 | Medium risk (Score 6). Notification preference tampering causes missed alerts. |
| 13 | R11 | Medium risk (Score 6). Sequential room ID enumeration leaks hidden inventory. |
| 14 | R14 | Medium risk (Score 6). Chat message tampering destroys dispute evidence. |

## NIST CSF 2.0 Mapping

| Risk | Govern | Identify | Protect | Detect | Respond | Recover | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | Yes | Yes | Yes | Yes | Yes | No | Rate limiting, CAPTCHA, and search query caching protect availability; alerts detect spikes. |
| R02 | Yes | No | Yes | Yes | Yes | No | WebSocket rate limiting and staff queue throttling prevent reception paralysis. |
| R03 | Yes | Yes | Yes | Yes | Yes | No | Strict server-side RBAC and session-matching middleware block unauthorized chat access. |
| R04 | Yes | Yes | Yes | Yes | No | No | DTO field projection policies ensure internal maintenance fields are stripped from public APIs. |
| R05 | No | Yes | Yes | Yes | No | No | Review status filtering enforces manager-only access for hidden review flags. |
| R06 | Yes | Yes | Yes | Yes | Yes | No | Mandatory booking completion check before accepting review submissions. |
| R07 | Yes | No | Yes | Yes | No | No | Ownership validation middleware for notification preference updates. |
| R08 | Yes | Yes | Yes | Yes | Yes | Yes | Cryptographic email/push signing (DKIM/HMAC) and phishing response protocols. |
| R09 | Yes | Yes | Yes | Yes | Yes | Yes | Multi-actor approval for bulk review edits and automated anomaly detection. |
| R10 | Yes | Yes | Yes | Yes | No | Yes | Soft-delete enforcement at DB ORM layer and database backup recovery. |
| R11 | No | Yes | Yes | Yes | No | No | Non-sequential UUID parameters and room visibility status checks. |
| R12 | Yes | Yes | Yes | Yes | Yes | No | Mandatory guest session binding and pre-send confirmation for chat payment links. |
| R13 | Yes | Yes | Yes | Yes | Yes | No | Server-side role check (`ROLE_STAFF`) enforced on all receptionist queue endpoints. |
| R14 | Yes | Yes | Yes | Yes | No | No | Immutable append-only chat history database schema with change audit logs. |

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
