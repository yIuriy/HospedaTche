# Stage 6 - HospedaTche Monitoring and Intrusion Detection

Status: Final

This document describes how HospedaTche can identify suspicious behavior after deployment by connecting known risks and abuse cases to observable events, detection rules, and initial responses.

## Intrusion Detection

Intrusion detection is the process of observing application events, access records, requests, errors, and audit logs to identify attack attempts, abuse, control failures, or behavior that differs from expected system use. In HospedaTche, detection complements preventive controls by revealing when an attacker tests a protected function, repeatedly fails authentication, manipulates a business operation, or continues suspicious activity after a control responds.

Detection does not prove that every alert is a confirmed incident. An alert is a signal that must be validated using related events, actor identity, source, affected resource, time, and correlation data. Useful detection therefore depends on consistent logs that provide enough context without storing passwords, tokens, complete payment data, or unnecessary personal data.

## Prevention and Detection

| Approach | Purpose | HospedaTche Example |
| --- | --- | --- |
| Prevention | Stop or reduce an attack before it succeeds. | Server-side step-up authentication rejects a password, email, or CPF change when the user does not confirm identity again. Session revocation prevents old sessions from remaining active after password change or recovery. |
| Detection | Identify suspicious or harmful behavior during or after an attempt. | Authentication and audit logs generate an alert when an account has repeated failed step-up attempts, abnormal password-recovery activity, or attempts to reuse a revoked session. |

Prevention answers "How can the system block or reduce this attack?" Detection answers "How can the team know that the behavior was attempted, succeeded, or bypassed a control?" Both are necessary because preventive controls can fail, be misconfigured, or face attack patterns that were not anticipated.

## Events to Log

To enable reliable detection without introducing security or privacy risks, HospedaTche records structured JSON audit log entries across five key operational categories. Every log record shares a common base metadata envelope containing: `timestamp` (ISO 8601 UTC), `correlation_id` (UUIDv4), `actor_id` (User ID, or `anonymous`), `source_ip`, `user_agent`, `http_method`, `request_path`, and `outcome` (`SUCCESS` or `FAILURE`).

| Event Category | Event or Action | Required Fields | Sensitive Data Exclusions |
| --- | --- | --- | --- |
| Authentication | `auth.register`, `auth.login`, `auth.login.failed`, `auth.stepup.failed`, `auth.session.revoked`, `auth.password_reset` | `timestamp`, `correlation_id`, `actor_id`, `source_ip`, `request_path` (`/api/v1/auth/*`), `event_type`, `outcome`, `failure_reason` | Plaintext passwords, authentication tokens (JWTs), password reset tokens, MFA secrets. |
| Authorization | `authz.access_denied`, `authz.role_change.attempt`, `authz.permission.check_failed` | `timestamp`, `correlation_id`, `actor_id`, `actor_role`, `target_resource`, `requested_action`, `source_ip`, `outcome` (`HTTP 403 / 401`) | Active session bearer tokens, internal crypto keys, authorization header raw strings. |
| Business Operation | `booking.created`, `booking.cancelled`, `room.price.updated`, `room.availability.changed`, `review.submitted` | `timestamp`, `correlation_id`, `actor_id`, `entity_type` (`booking`/`room`/`review`), `entity_id`, `property_id`, `action`, `outcome` | Full guest PII (tax ID / CPF, full physical address, unmasked phone numbers). |
| Payment | `payment.checkout.initiated`, `payment.callback.received`, `payment.transaction.failed`, `payment.refund.requested` | `timestamp`, `correlation_id`, `actor_id`, `booking_id`, `transaction_id`, `payment_gateway_ref`, `amount`, `currency`, `gateway_status_code` | Credit card numbers (PAN), CVV/CVC codes, card expiration dates, raw gateway authorization secrets. |
| Error and Audit | `system.error.unhandled`, `security.payload_limit.exceeded`, `security.rate_limit.exceeded`, `audit.config.changed` | `timestamp`, `correlation_id`, `actor_id`, `error_code`, `error_type`, `sanitized_stack_trace`, `middleware_origin`, `source_ip` | Environment secrets, DB passwords, full raw request bodies, internal file system absolute paths. |

## Detection Rules

### DR01 - Excessive Account Registration Attempts From One IP

| Field | Content |
| --- | --- |
| Rule Owner | Lara |
| Observed Risk | R03 - Mass Account Creation; AC09 - Mass Account Creation |
| Data Source | API access logs, account-registration audit events, and rate-limit counter events for `POST /api/v1/auth/register`, grouped by trusted source IP and correlation window |
| Alert Condition | Alert when one source IP submits more than 5 registration attempts in 10 minutes, when more than 3 attempts from that IP fail identity validation in 10 minutes, or when 3 or more newly created accounts share the same source IP in 30 minutes |
| Initial Response | Apply temporary registration throttling, return HTTP 429 for excess requests, preserve correlated events, review whether created accounts are fake, and notify the security/operations team before cleanup or longer blocking |
| Responsible Role | Security/Operations Team |

DR01 must not log passwords, JWTs, reset tokens, full CPF values, or raw request bodies. The useful evidence is the event time, source IP or trusted proxy-derived client identifier, normalized result, correlation ID, and created-account identifier only when an account is successfully created.

### DR02 - Unauthorized Role Elevation Attempts

| Field | Content |
| --- | --- |
| Observed Risk | R05 - Unauthorized Role Elevation |
| Data Source | Authorization and security audit logs from user update and role assignment requests |
| Alert Condition | Alert when a low-privileged user generates repeated denied attempts to assign or modify a role to a level equal to or higher than their own within a short period |
| Initial Response | Alert the security/operations team, preserve the related audit events, and temporarily restrict further role-management attempts from the affected account while the activity is investigated |
| Responsible Role | Security/Operations Team |

### DR03 - Suspicious Guest Chat History Enumeration and IDOR Attempts

| Field | Content |
| --- | --- |
| Rule Owner | Rafaela |
| Observed Risk | R03 - Guest Chat History Exposure; AC03 - Guest Chat History Exposure |
| Data Source | Chat service authorization logs, API Gateway access records, and security audit events for `GET /api/v1/chat/messages` and `POST /api/v1/chat/messages` |
| Alert Condition | Alert when a single authenticated user session or source IP generates more than 5 denied requests (HTTP 403 / `authz.access_denied`) targeting chat session IDs that do not match the token's authenticated `userId` within 2 minutes, or attempts to query more than 3 distinct guest chat histories in 5 minutes |
| Initial Response | Immediately terminate and revoke the offender's active session/token, throttle the source IP at the API Gateway with HTTP 429/403, record an immutable security incident log with correlation ID, and alert the security/operations team for immediate IDOR investigation |
| Responsible Role | Security/Operations Team |

DR03 must not log chat message content, passwords, session tokens, or guest personal details. The useful evidence consists of timestamp, correlation ID, authenticated user ID, target chat session ID, source IP, HTTP method, response status code, and authorization outcome.

## Response and Escalation

Alert validation: Security analysts review the correlation ID, source IP, user ID, request timeline, and HTTP error codes (401/403/429) within the central audit log to confirm whether the alert reflects genuine malicious activity (such as automated IDOR enumeration or brute force) or a legitimate user error/network retry, eliminating false positives before initiating disruptive actions.

Containment: Apply automated or analyst-triggered rate-limiting at the API Gateway/WAF, invalidate compromised JWT tokens and HttpOnly cookies via the centralized Redis session store, and temporarily restrict access to targeted endpoints from malicious source IPs.

Escalation: For High and Critical severity alerts (such as repeated role escalation or unauthorized access to other guests' data), immediately notify the on-call Security Engineer and Incident Response Team via dedicated automated channels (e.g., PagerDuty, Slack/Discord security webhook, or urgent incident ticket) with associated event correlation IDs.

Evidence preservation: Export and archive immutable, cryptographically hashed audit log entries (excluding passwords, tokens, and sensitive PII) covering the incident timeline to dedicated, write-once security storage to preserve forensic integrity and support root-cause analysis.

Recovery or follow-up: Restore restricted accounts after identity verification (step-up authentication), apply security patches or WAF rules for identified attack vectors, review audit logs to ensure no persistent unauthorized changes occurred, and document post-mortem lessons learned.

## Final Review

- [x] Intrusion detection is explained in the HospedaTche context.
- [x] Prevention and detection are distinguished with project examples.
- [x] Events and sensitive-data exclusions are complete.
- [x] Exactly three detection rules are complete (DR01, DR02, and DR03).
- [x] Every rule links to an existing risk and abuse case.
- [x] Alert conditions are measurable and testable.
- [x] Initial responses and responsible roles are defined.
