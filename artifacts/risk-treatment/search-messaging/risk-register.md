# Search Messaging Risk Register

Module scope: room search, public room details, hidden room enumeration, reviews, ratings, notifications, chat, and messaging logs.

Stage 1 sources:

- STRIDE threats: `artifacts/threat-modeling/search-messaging/`
- Abuse cases: `artifacts/abuse-cases/search-messaging/`

## Probability Criteria

| Value | Classification | Criteria |
| --- | --- | --- |
| 1 | Low | Event depends on uncommon conditions, very specific access, or high technical capability. |
| 2 | Medium-low | Event is possible, but depends on a specific API, role, notification, review, or chat weakness. |
| 3 | Medium-high | Event is plausible during common public search, review, notification, or messaging flows. |
| 4 | High | Event can happen easily, frequently, or through predictable automated misuse when controls are absent. |

## Impact Criteria

| Value | Classification | Criteria |
| --- | --- | --- |
| 1 | Low | Causes small disruption and can be corrected quickly. |
| 2 | Moderate | Causes limited exposure, inconsistency, or service disruption, with recovery possible through staff review. |
| 3 | High | Causes relevant harm to availability, privacy, guest communication, hotel reputation, or operational trust. |
| 4 | Very high | Can expose sensitive guest communication, enable phishing or financial harm, break staff trust, or cause serious compliance impact. |

## Risk Classification

| Score | Level |
| --- | --- |
| 1 to 3 | Low |
| 4 to 7 | Medium |
| 8 to 11 | High |
| 12 to 16 | Critical |

Score = Probability x Impact.

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
Probability justification: High likelihood (3) because public room search endpoints are exposed to unauthenticated internet traffic and automated scripts without CAPTCHA or rate limits.
Impact justification: High impact (3) because room search unavailability prevents new prospective guests from discovering available rooms, causing direct revenue loss and customer dissatisfaction.
Affected users, data, features, or components: Prospective guests, public room availability search API, database query engine, and server infrastructure.
Expected consequences: System slowdown, database connection pool exhaustion, temporary search outage, and dropped reservations.
Risk level justification: High level (Score 9 = 3x3) because unauthenticated public search endpoints invite frequent bot traffic (high likelihood), which directly degrades booking availability and revenue conversion (high impact).

### R02 - Chat Message Flooding
Probability justification: High likelihood (3) because any guest or unauthenticated chat session can send rapid HTTP/WebSocket API requests without rate limiting.
Impact justification: High impact (3) because reception staff get overwhelmed by automated spam messages, delaying response to urgent guest inquiries during check-in or stay.
Affected users, data, features, or components: Hotel receptionists, active guests, WebSocket/HTTP chat API, and reception queue interface.
Expected consequences: Reception queue pollution, staff fatigue, missed guest emergencies, and service degradation.
Risk level justification: High level (Score 9 = 3x3) because unrestricted chat connection endpoints permit easy script execution (high likelihood), causing severe operational front-desk paralysis (high impact).

### R03 - Guest Chat History Exposure
Probability justification: Medium-high likelihood (3) because parameter tampering (IDOR) on REST API endpoints is a common attack vector when server-side authorization checks are missing.
Impact justification: Very high impact (4) due to severe guest privacy violation, LGPD non-compliance, exposure of travel dates, room numbers, and confidential guest inquiries.
Affected users, data, features, or components: All hotel guests, chat history database, and chat REST API.
Expected consequences: Massive data privacy breach, legal penalties under LGPD, loss of guest trust, and brand damage.
Risk level justification: Critical level (Score 12 = 3x4) because endpoint parameter tampering is easily scriptable (medium-high likelihood) and leads to massive privacy and legal compliance violation (very high impact).

### R04 - Internal Maintenance Notes Exposure
Probability justification: Medium-high likelihood (3) because API responses frequently return full unmasked database models when DTO field mappers are omitted.
Impact justification: High impact (3) because exposing physical door lock defects and security vulnerability notes to public guests creates physical intrusion risks.
Affected users, data, features, or components: Hotel physical security, room maintenance logs, and public room detail API.
Expected consequences: Exploitation of physical room vulnerabilities, unauthorized intrusion risk, and hotel physical liability.
Risk level justification: High level (Score 9 = 3x3) because missing DTO response projections commonly leak raw model attributes (medium-high likelihood), posing direct physical security risks (high impact).

### R05 - Hidden Review Data Exposure
Probability justification: Medium-low likelihood (2) because it requires deliberate parameter manipulation on review search filter queries.
Impact justification: High impact (3) because publishing moderated, defamatory, or policy-violating reviews damages hotel brand image and violates internal moderation policies.
Affected users, data, features, or components: Hotel management, reviews database, public reviews API, and prospective guests.
Expected consequences: Public exposure of offensive or filtered review content, brand damage, and moderation policy failure.
Risk level justification: Medium level (Score 6 = 2x3) because retrieving hidden reviews requires deliberate filter parameter manipulation (medium-low likelihood), while exposing filtered content causes reputational damage (high impact).

### R06 - Review Spamming And Manipulation
Probability justification: Medium-high likelihood (3) because public review submission forms without stay verification invite fake reviews from competitors or automated bots.
Impact justification: High impact (3) because fake negative ratings directly depress booking conversion and distort true hotel reputation.
Affected users, data, features, or components: Prospective guests, hotel management, review submission API, and rating calculation service.
Expected consequences: Rating distortion, misleading prospective guests, unfair competition, and booking revenue loss.
Risk level justification: High level (Score 9 = 3x3) because unverified review forms attract automated spam (medium-high likelihood), which directly distorts hotel rating accuracy and booking conversion (high impact).

### R07 - Notification Preferences Tampering
Probability justification: Medium-low likelihood (2) because it requires targeted IDOR parameter manipulation on user settings endpoints.
Impact justification: High impact (3) because disabling notification preferences causes guests to miss check-in alerts, door access codes, and security notices.
Affected users, data, features, or components: Hotel guests, notification preference settings DB, and push/email notification service.
Expected consequences: Missed stay alerts, operational confusion, and undetected account settings modification.
Risk level justification: Medium level (Score 6 = 2x3) because IDOR parameter manipulation requires targeted endpoint tampering (medium-low likelihood), while missed stay alerts cause operational confusion without directly compromising credentials (high impact).

### R08 - Fake Stay Notification Injection
Probability justification: Medium-high likelihood (3) because spoofing unauthenticated email or push notification channels is frequently exploited in phishing campaigns.
Impact justification: Very high impact (4) because guests clicking fake payment links suffer financial theft, credential loss, and brand damage.
Affected users, data, features, or components: Hotel guests, notification delivery service, and guest credentials.
Expected consequences: Guest financial loss, credential theft, phishing damage, and severe brand distrust.
Risk level justification: Critical level (Score 12 = 3x4) because unauthenticated notification delivery channels invite phishing attacks (medium-high likelihood), causing direct guest monetary theft and credential loss (very high impact).

### R09 - Bulk Review Rating Tampering
Probability justification: Medium-low likelihood (2) because it requires insider staff access or compromised manager credentials.
Impact justification: Very high impact (4) because wiping or modifying dozens of reviews in bulk destroys overall rating accuracy overnight.
Affected users, data, features, or components: Hotel reputation rating system, reviews DB, and hotel management.
Expected consequences: Instant rating destruction, loss of prospective bookings, and audit log contamination.
Risk level justification: High level (Score 8 = 2x4) because bulk rating tampering requires insider access or compromised manager credentials (medium-low likelihood), but causes instant, severe reputational destruction and rating distortion (very high impact).

### R10 - Permanent Guest Review Purge
Probability justification: Medium-low likelihood (2) because hard-deleting review records requires manager role access or API endpoint misuse.
Impact justification: Very high impact (4) because hard-deleting review records violates the mandatory "hide/retain" policy and prevents auditability.
Affected users, data, features, or components: Guest review records, moderation system, and audit history.
Expected consequences: Irreversible loss of guest feedback history, repudiation of moderation decisions, and policy violation.
Risk level justification: High level (Score 8 = 2x4) because hard-deleting review records requires manager permissions or endpoint misuse (medium-low likelihood), but results in permanent, unrecoverable destruction of guest feedback history and audit policy violation (very high impact).

### R11 - Hidden Room Enumeration And Brute Force
Probability justification: Medium-high likelihood (3) because automated scripts easily iterate sequential room IDs in search APIs.
Impact justification: Moderate impact (2) because it leaks unlisted room inventory and maintenance states without exposing guest PII.
Affected users, data, features, or components: Room search API and room inventory DB.
Expected consequences: Intelligence leak of hidden hotel inventory and extra database load.
Risk level justification: Medium level (Score 6 = 3x2) because automated parameter iteration is easily scripted against search APIs (medium-high likelihood), but only leaks unlisted room availability and maintenance states without exposing guest personal data (moderate impact).

### R12 - Misdirected Chat Billing Request And Staff Message Spoofing
Probability justification: Medium-low likelihood (2) because sending misdirected billing links requires receptionist portal session hijacking or staff error.
Impact justification: Very high impact (4) because sending payment links to the wrong guest causes accidental or fraudulent financial transactions.
Affected users, data, features, or components: Hotel guests, reception chat queue, and billing link integration.
Expected consequences: Misdirected billing, guest financial loss, dispute overhead, and legal liability.
Risk level justification: High level (Score 8 = 2x4) because sending misdirected billing links requires chat queue session hijacking or staff error (medium-low likelihood), but causes direct financial misattribution and potential guest monetary loss (very high impact).

### R13 - Guest Privilege Escalation To Receptionist Chat Queue
Probability justification: Medium-low likelihood (2) because gaining staff access requires exploiting missing server-side RBAC token checks.
Impact justification: Very high impact (4) because gaining receptionist privileges exposes all active guest chats and allows impersonating staff.
Affected users, data, features, or components: Staff chat queue, receptionist portal, and all active guest chat sessions.
Expected consequences: Total breakdown of guest chat privacy, staff impersonation, and unauthorized access to reception tools.
Risk level justification: High level (Score 8 = 2x4) because gaining staff access requires exploiting missing server-side RBAC token checks (medium-low likelihood), but exposes all active guest communications and enables staff impersonation across the hotel (very high impact).

### R14 - Chat Message Tampering And History Repudiation Purge
Probability justification: Medium-low likelihood (2) because modifying or deleting sent messages requires API editing permissions.
Impact justification: High impact (3) because altering or deleting chat history destroys evidence during dispute resolution and breaks non-repudiation.
Affected users, data, features, or components: Chat database, message audit log, and dispute resolution workflow.
Expected consequences: Non-repudiation failure, loss of dispute evidence, and inability to verify past staff/guest agreements.
Risk level justification: Medium level (Score 6 = 2x3) because modifying or deleting sent messages requires API editing permissions (medium-low likelihood), while destroying dispute evidence causes non-repudiation failure during guest disputes (high impact).

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
| R01 | Reduce | Implement API rate limiting (10 req/min per IP on search), Redis query caching, and Cloudflare CAPTCHA for burst traffic. | Protect, Detect, Respond | Backend Team, DevOps | Automated load tests (`k6`), rate-limit header checks, and Redis cache hit/miss metrics. |
| R02 | Reduce | Enforce WebSocket message throttling (max 5 msgs/min per user) and automated queue spam isolation. | Protect, Detect, Respond | Backend Team, Frontend Team | Automated chat flood unit tests, rate-limit rejection logs, and queue stress simulation. |
| R03 | Reduce | Enforce strict server-side authorization check verifying `session.userId == chat.guestId` before returning chat history. | Govern, Protect, Detect, Respond | Security Engineer, Backend Team | Automated RBAC integration tests, IDOR vulnerability scan reports, and denied access logs. |
| R04 | Reduce | Implement explicit DTO response mappers (`PublicRoomDTO`) stripping internal maintenance notes and staff comments. | Govern, Protect, Detect | Backend Team | Unit tests verifying DTO output fields and API response payload inspection. |
| R05 | Reduce | Add server-side filter forcing `status == 'PUBLISHED'` on public review listings unless requester has `ROLE_MANAGER`. | Protect, Detect | Backend Team | Automated authorization tests attempting hidden review retrieval with guest token. |
| R06 | Reduce | Integrate DB verification requiring a completed booking in `CHECKED_OUT` state tied to `guestId` before review submission. | Govern, Protect, Detect, Respond | Backend Team | Integration tests attempting review creation without completed stay and verification logs. |
| R07 | Reduce | Add ownership authorization middleware verifying `token.userId == path.userId` on settings endpoints. | Protect, Detect | Backend Team | Automated REST API authorization test suite for user preference endpoints. |
| R08 | Reduce | Enforce DKIM/SPF/DMARC for emails and HMAC token signatures on push notifications with verified domain links. | Govern, Protect, Detect, Respond, Recover | DevOps, Security Team | Email deliverability & DKIM verification reports, link domain whitelist tests. |
| R09 | Reduce | Implement multi-actor approval workflow for bulk review edits (>5 reviews) and anomaly alerts on mass rating changes. | Govern, Protect, Detect, Respond, Recover | Security Team, Management | Approval workflow unit tests, bulk change audit logs, and anomaly alert trigger tests. |
| R10 | Reduce | Remove SQL `DELETE` permissions on reviews table for application role; enforce soft-delete (`is_hidden = true`) in ORM. | Govern, Protect, Detect, Recover | Database Admin, Backend Team | DB permission schema inspection, ORM soft-delete test, and backup recovery simulation. |
| R11 | Reduce | Replace sequential integer IDs with random UUIDv4 for room parameters and enforce active status checks. | Protect, Detect | Backend Team | Endpoint penetration test attempting room ID iteration and 404 response check. |
| R12 | Reduce | Bind payment links to specific `bookingId` and `guestId`, requiring explicit receptionist pre-send confirmation modal. | Protect, Detect, Respond | Frontend Team, Backend Team | Chat payment link binding unit tests and session verification logs. |
| R13 | Reduce | Apply `@PreAuthorize("hasRole('RECEPTIONIST')")` annotation on all staff chat queue controller endpoints. | Govern, Protect, Detect, Respond | Backend Team | Automated role access matrix tests attempting staff endpoint access with guest token. |
| R14 | Reduce | Enforce append-only message DB schema where edits create a new version entry and deletions are soft-marked with audit log. | Govern, Protect, Detect | Database Admin, Backend Team | DB immutability test, message versioning unit test, and audit log inspection. |

## Initial Implementation Order

| Order | Control or Action | Related Risks | Reason |
| --- | --- | --- | --- |
| 1 | Add server-side chat ownership authorization middleware (`session.userId == chat.guestId`). | R03 | Resolves Critical privacy risk (Score 12) preventing guest chat history exposure. |
| 2 | Enforce DKIM/SPF email signing and HMAC push notification token validation. | R08 | Resolves Critical phishing risk (Score 12) protecting guests from credential theft. |
| 3 | Apply `@PreAuthorize("hasRole('RECEPTIONIST')")` on staff chat queue endpoints. | R13 | Prevents guest privilege escalation to master staff chat queue (Score 8). |
| 4 | Add `CHECKED_OUT` booking verification check to review submission API. | R06 | Prevents fake review spam and rating manipulation (Score 9). |
| 5 | Implement API rate limiting on search endpoints (10 req/min) and Redis query caching. | R01 | Protects public search availability from bot overload (Score 9). |
| 6 | Enforce DTO field projection (`PublicRoomDTO`) excluding internal maintenance notes. | R04 | Prevents physical maintenance defect leakage in public APIs (Score 9). |
| 7 | Enforce WebSocket message throttling (5 msgs/min per user) on chat API. | R02 | Prevents front desk chat queue flooding and staff exhaustion (Score 9). |
| 8 | Remove SQL `DELETE` permissions on reviews table and enforce ORM soft-delete. | R10 | Prevents permanent purge of guest reviews and upholds audit rules (Score 8). |
| 9 | Implement multi-actor approval and anomaly alerts for bulk review rating changes. | R09 | Prevents bulk review tampering and rating distortion (Score 8). |
| 10 | Bind chat payment links to verified `bookingId` and `guestId`. | R12 | Prevents misdirected billing requests in chat (Score 8). |
| 11 | Implement ownership authorization middleware on notification preferences API. | R07 | Protects guest notification settings from unauthorized changes (Score 6). |
| 12 | Enforce `status == 'PUBLISHED'` filter on public review listings. | R05 | Prevents unauthorized viewing of hidden/moderated reviews (Score 6). |
| 13 | Replace sequential room IDs with UUIDv4 and add active status filtering. | R11 | Blocks sequential room ID enumeration and unlisted inventory leaks (Score 6). |
| 14 | Implement append-only chat message DB schema with immutable change logs. | R14 | Preserves chat dispute evidence and ensures non-repudiation (Score 6). |

## Expected Residual Risk

| Risk | Initial Level | Expected Residual Level | Condition to Accept Residual |
| --- | --- | --- | --- |
| R01 | High (9) | Low (3) | Accepted if Redis caching and Cloudflare CAPTCHA handle burst search traffic without dropping legitimate queries. |
| R02 | High (9) | Low (3) | Accepted provided WebSocket throttling limits spam to 5 msgs/min while keeping legitimate chat open. |
| R03 | Critical (12) | Low (2) | Accepted only when 100% of chat history endpoints pass automated RBAC tests for guest-session matching. |
| R04 | High (9) | Low (2) | Accepted if DTO mappers are strictly enforced across all public room detail endpoints. |
| R05 | Medium (6) | Low (2) | Accepted provided public review queries are restricted to published status by default. |
| R06 | High (9) | Low (3) | Accepted when review submission is strictly conditioned on a verified `CHECKED_OUT` booking state. |
| R07 | Medium (6) | Low (2) | Accepted provided user settings endpoints validate token ownership on every update. |
| R08 | Critical (12) | Medium (4) | Accepted with continuous DKIM/SPF domain monitoring and guest anti-phishing advisories. |
| R09 | High (8) | Low (3) | Accepted provided bulk review edits (>5 records) require multi-actor approval and trigger security alerts. |
| R10 | High (8) | Low (2) | Accepted when database permissions block SQL `DELETE` and ORM enforces soft-delete retention. |
| R11 | Medium (6) | Low (2) | Accepted once UUIDv4 parameterization prevents sequential enumeration of hidden rooms. |
| R12 | High (8) | Low (3) | Accepted provided chat payment links are immutably tied to the target guest's booking ID. |
| R13 | High (8) | Low (2) | Accepted only when all staff chat queue routes strictly require `@PreAuthorize("hasRole('RECEPTIONIST')")`. |
| R14 | Medium (6) | Low (2) | Accepted provided chat database schema is append-only with full versioning logs. |

## Final Notes

This risk register connects all 14 Stage 1 STRIDE threats (`T01` to `T14`) and Abuse Cases (`AC01` to `AC14`) for the Search, Reviews, Messaging & Notifications module directly to concrete risk events, NIST CSF 2.0 functions, actionable technical controls, and verification evidence.

All proposed controls focus on technical safeguards (RBAC middleware, DTO projections, rate limiting, soft-delete ORM policies, signed notifications, append-only schemas) and operational verifications without modifying baseline Stage 1 artifacts.
