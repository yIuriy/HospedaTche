# Stage 1 Final Considerations — HospedaTchê System (All Modules)

**System:** HospedaTchê Hotel Management Platform  
**Scope:** Consolidated Stage 1 Synthesis across all 5 System Modules (`accounts`, `accommodation`, `booking`, `payments`, `search-messaging`).


## 1. Executive Summary

This document presents the consolidated Stage 1 final considerations for the **HospedaTchê** system in accordance with section 8.7 of the project guidelines (`enunciado.md`). It synthesizes the critical assets, highest-impact STRIDE threats, severe abuse cases, and architectural challenges across all five system modules.


## 2. Most Important System Assets by Module

| Module | Primary Protected Assets | Risk Impact if Compromised |
| --- | --- | --- |
| **1. Accounts ([`accounts`](../threat-modeling/accounts/))** | User credentials, password reset tokens, PII (CPF, email, phone, full name), RBAC role tokens, and security audit logs. | Account takeover, identity theft, unauthorized administrative access, and LGPD regulatory penalties. |
| **2. Accommodation ([`accommodation`](../threat-modeling/accommodation/))** | Room inventory database, pricing/rate rules, room availability status, maintenance logs, cleaning queues, and companion records. | Financial loss due to rate tampering, room inventory paralysis, and physical security defects exposed in room logs. |
| **3. Booking ([`booking`](../threat-modeling/booking/))** | Reservation records, stay dates, guest assignment states, booking lifecycle state machine, and cancellation policies. | Double-booking race conditions, unauthorized cancellation of legitimate stays, and operational reservation collapse. |
| **4. Payments ([`payments`](../threat-modeling/payments/))** | Payment gateway tokens, transaction ledgers, refund records, credit card DTO data (PCI-DSS compliance), and payment receipts. | Direct financial theft, fraudulent refunds, payment status forgery, and PCI-DSS compliance failure. |
| **5. Search & Messaging ([`search-messaging`](../threat-modeling/search-messaging/))** | Guest chat history, messaging logs, public room availability search API, guest reviews & rating DB, and push/email notification service. | Severe guest privacy breach via chat IDOR, credential phishing via fake notifications, public search DoS, and review rating distortion. |


## 3. Most Concerning Threats and High-Impact Abuse Cases

### A. Accounts Module ([`accounts`](../threat-modeling/accounts/))
- **[`T02`](../threat-modeling/accounts/T02-account-takeover.md) / [`AC02`](../abuse-cases/accounts/AC02-account-takeover.md) — Account Takeover (Spoofing / Elevation of Privilege):** Attacker steals or brute-forces user credentials to hijack guest or staff accounts.
- **[`T19`](../threat-modeling/accounts/T19-unauthorized-role-elevation.md) / [`AC19`](../abuse-cases/accounts/AC19-unauthorized-role-elevation.md) — Unauthorized Role Elevation (Elevation of Privilege):** User tampers with JWT role claims or request parameters to gain administrative privileges (`ROLE_ADMIN` / `ROLE_MANAGER`).
- **[`T11`](../threat-modeling/accounts/T11-password-reset-token-leakage.md) / [`AC11`](../abuse-cases/accounts/AC11-password-reset-token-leakage.md) — Password Reset Token Leakage (Information Disclosure):** Reset tokens exposed via HTTP referrer or unencrypted endpoints allow unauthorized account password resets.

### B. Accommodation Module ([`accommodation`](../threat-modeling/accommodation/))
- **[`T04`](../threat-modeling/accommodation/T04-unauthorized-room-rate-tampering.md) / [`AC04`](../abuse-cases/accommodation/AC04-unauthorized-room-rate-tampering.md) — Unauthorized Room Rate Tampering (Tampering):** Malicious staff or attacker modifies room nightly rates in the database to book premium rooms at unauthorized minimal prices.
- **[`T01`](../threat-modeling/accommodation/T01-room-availability-manipulation.md) / [`AC01`](../abuse-cases/accommodation/AC01-room-availability-manipulation.md) — Room Availability Manipulation (Tampering / Denial of Service):** Malicious actor forcibly marks active rooms as "under maintenance" to artificially constrain hotel availability.
- **[`T07`](../threat-modeling/accommodation/T07-fraudulent-check-in-or-check-out-update.md) / [`AC07`](../abuse-cases/accommodation/AC07-fraudulent-check-in-or-check-out-update.md) — Fraudulent Check-in / Check-out Status Update (Tampering / Repudiation):** Unapproved state change on guest stay records bypassing physical front-desk verification.

### C. Booking Module ([`booking`](../threat-modeling/booking/))
- **[`T03`](../threat-modeling/booking/T03-Unauthorized-Booking-Cancellation.md) / [`AC03`](../abuse-cases/booking/AC03-Unauthorized-Booking-Cancellation.md) — Unauthorized Booking Cancellation (Tampering / Denial of Service):** Unauthorized cancellation of legitimate guest reservations causing operational stay disruption.
- **[`T02`](../threat-modeling/booking/T02-Booking-Information-Disclosure.md) / [`AC02`](../abuse-cases/booking/AC02-Booking-Information-Disclosure.md) — Booking Information Disclosure (Information Disclosure):** Parameter tampering leaks private reservation details, guest names, and travel dates.
- **[`T06`](../threat-modeling/booking/T06-Booking-Cancellation-Blocking.md) / [`AC06`](../abuse-cases/booking/AC06-Booking-Cancellation-Blocking.md) — Booking Cancellation Blocking (Denial of Service):** Attacker blocks legitimate cancellation flows to lock room inventory and trigger unfair penalties.

### D. Payments Module ([`payments`](../threat-modeling/payments/))
- **[`T01`](../threat-modeling/payments/T01-Payment-Status-Tampering.md) / [`AC01`](../abuse-cases/payment/AC01-Payment-Status-Tampering.md) — Payment Status Tampering (Tampering):** Attacker intercepts webhook payload or API parameters to forge `PAYMENT_SUCCESS` status for unpaid bookings.
- **[`T05`](../threat-modeling/payments/T05-Unauthorized-Refund-Claim.md) / [`AC05`](../abuse-cases/payment/AC05-Unauthorized-Refund-Claim.md) — Unauthorized Refund Claim (Tampering / Financial Theft):** Rogue employee or attacker manipulates refund API requests to claim unapproved refunds.
- **[`T06`](../threat-modeling/payments/T06-Credit-Card-Information-Disclosure.md) / [`AC06`](../abuse-cases/payment/AC06-Credit-Card-Information-Disclosure.md) — Credit Card Information Disclosure (Information Disclosure):** Unmasked payment gateway DTOs or logs expose partial PCI-DSS credit card payloads to unauthorized actors.

### E. Search, Reviews & Messaging Module ([`search-messaging`](../threat-modeling/search-messaging/))
- **[`T03`](../threat-modeling/search-messaging/T03-guest-chat-history-exposure.md) / [`AC03`](../abuse-cases/search-messaging/AC03-guest-chat-history-exposure.md) — Guest Chat History Exposure (Information Disclosure / IDOR):** Attacker tampers with chat API session IDs to read private chat logs between guests and reception staff.
- **[`T08`](../threat-modeling/search-messaging/T08-fake-stay-notification-injection.md) / [`AC08`](../abuse-cases/search-messaging/AC08-fake-stay-notification-injection.md) — Fake Stay Notification Injection (Spoofing / Phishing):** Attackers inject spoofed check-in emails or push messages containing phishing links to steal credentials and payment data.
- **[`T01`](../threat-modeling/search-messaging/T01-automated-room-search-overload.md) / [`AC01`](../abuse-cases/search-messaging/AC01-automated-search-abuse.md) — Automated Room Search Overload (Denial of Service):** Bot search floods overwhelm the public room availability API, crashing search features and stopping booking conversion.
- **[`T13`](../threat-modeling/search-messaging/T13-guest-privilege-escalation-to-receptionist-chat-queue.md) / [`AC13`](../abuse-cases/search-messaging/AC13-guest-privilege-escalation-to-receptionist-chat-queue.md) — Guest Privilege Escalation to Receptionist Chat Queue (Elevation of Privilege):** Guest tampers with WebSocket role headers to hijack the master receptionist chat queue.


## 4. Key Architectural Challenges Encountered

1. **Multi-Tenant Role-Based Access Control (RBAC):**  
   Ensuring consistent, server-side `@PreAuthorize` enforcement across all 5 module API controllers so that guests, receptionists, housekeepers, and managers strictly remain scoped to their permitted domain actions.

2. **Concurrency & State Transition Safety:**  
   Preventing double-booking and payment state inconsistencies during peak traffic through atomic database transactions, optimistic/pessimistic locking, and idempotent API idempotency keys.

3. **External Gateway Security & Webhook Validation:**  
   Protecting payment gateway callbacks and notification channels against spoofing by enforcing HMAC signature verification, IP whitelisting, and DKIM/SPF email authentication.

4. **Public Frictionless Access vs. Bot Protection:**  
   Keeping public endpoints (room search, public details, reviews) fast and accessible to unauthenticated visitors while blocking automated scrapers, brute-force enumeration, and DoS attacks using rate limiting and CAPTCHA.

5. **Data Privacy (LGPD / GDPR) & Non-Repudiation:**  
   Protecting sensitive guest chat logs, payment records, and PII with DTO projections and encryption, while maintaining immutable append-only audit logs to prevent dispute repudiation.
