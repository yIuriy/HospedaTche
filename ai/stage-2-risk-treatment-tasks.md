# Stage 2 - Risk Analysis and Treatment Task Division

This document defines the Stage 2 work division for HospedaTche. It keeps each member responsible for the same system area used in Stage 1.

Stage 2 does not replace STRIDE threats or abuse cases. Each member must use their existing Stage 1 artifacts as input and create risk analysis and treatment content in the matching `artifacts/risk-treatment/<module>/risk-register.md` file.

## Shared Goal

Transform Stage 1 security analysis into a risk treatment plan using NIST Cybersecurity Framework 2.0.

Each module must connect:

```text
STRIDE threat -> abuse case -> risk -> priority -> treatment strategy -> NIST function -> control -> verification -> residual risk
```

## Shared Rules

- Keep documentation in English.
- Keep each member in the same module they worked on before.
- Do not implement controls in Stage 2.
- Do not delete or rewrite Stage 1 threats or abuse cases.
- Every relevant Stage 1 threat should generate at least one risk.
- One threat may generate more than one risk if it can cause different consequences.
- Proposed controls must be concrete and observable.
- Avoid generic controls like "improve security", "use encryption", or "monitor the system" without explaining where, how, why, owner, and verification.

## Required Output Per Module

Each member must update only their module file:

```text
artifacts/risk-treatment/<module>/risk-register.md
```

Each module file must contain:

- risk register;
- probability and impact values;
- score calculation;
- risk level;
- evaluation justifications;
- prioritization;
- NIST CSF 2.0 mapping;
- treatment plan;
- proposed controls;
- responsible parties;
- evidence and verification;
- initial implementation order;
- expected residual risk.

## Scoring Model

Risk score:

```text
Probability x Impact
```

Risk levels:

| Score | Level |
| --- | --- |
| 1 to 3 | Low |
| 4 to 7 | Medium |
| 8 to 11 | High |
| 12 to 16 | Critical |

Probability values:

| Value | Meaning |
| --- | --- |
| 1 | Low |
| 2 | Medium-low |
| 3 | Medium-high |
| 4 | High |

Impact values:

| Value | Meaning |
| --- | --- |
| 1 | Low |
| 2 | Moderate |
| 3 | High |
| 4 | Very high |

## NIST CSF 2.0 Functions

Use only the functions that are relevant to the risk. Do not mark all functions automatically.

| Function | Meaning in this project |
| --- | --- |
| Govern | Define policies, owners, priorities, approval rules, and risk acceptance criteria. |
| Identify | Understand affected assets, dependencies, vulnerabilities, and risk conditions. |
| Protect | Add safeguards to reduce likelihood or impact. |
| Detect | Identify suspicious activity, failures, abuse, or incident signals. |
| Respond | Contain, analyze, communicate, and handle incidents. |
| Recover | Restore service, data, or operational state after an incident. |

Example:

```text
Protect is a NIST function.
Require MFA for staff accounts is a control.
Authentication test results and login audit logs are verification evidence.
```

## Member Assignment

| Member | Name | Stage 1 Module | Stage 2 File |
| :--- | :--- | :--- | :--- |
| Member 1 | Iuri | User Registration & Identity | `artifacts/risk-treatment/accounts/risk-register.md` |
| Member 2 | Sidnei | Authentication & Access Control | `artifacts/risk-treatment/accounts/risk-register.md` |
| Member 3 | Lara | Accommodation & Listing Management | `artifacts/risk-treatment/accommodation/risk-register.md` |
| Member 4 | Dyonathan | Booking & Payment Transactions | `artifacts/risk-treatment/booking/risk-register.md` and `artifacts/risk-treatment/payment/risk-register.md` |
| Member 5 | Rafaela | Search, Reviews & Messaging | `artifacts/risk-treatment/search-messaging/risk-register.md` |

Member 1 and Member 2 both worked in the accounts area, but with different focus. They should coordinate IDs inside the same accounts risk register.

## Member 1 - Iuri

Assigned folder:

```text
artifacts/risk-treatment/accounts/
```

Main focus:

- guest registration;
- identity validation;
- CPF/email misuse;
- fake guest accounts;
- account takeover;
- guest profile data exposure;
- password recovery risks, if related to identity.

Suggested Stage 1 sources:

- `artifacts/threat-modeling/accounts/T01-fake-guest-registration.md`
- `artifacts/threat-modeling/accounts/T02-account-takeover.md`
- `artifacts/threat-modeling/accounts/T03-unverified-guest-identity-abuse.md`
- `artifacts/threat-modeling/accounts/T11-password-reset-token-leakage.md`
- `artifacts/threat-modeling/accounts/T18-guest-cpf-enumeration.md`
- `artifacts/abuse-cases/accounts/AC01-fake-guest-registration.md`
- `artifacts/abuse-cases/accounts/AC02-account-takeover.md`
- `artifacts/abuse-cases/accounts/AC11-password-reset-token-leakage.md`
- `artifacts/abuse-cases/accounts/AC18-guest-cpf-enumeration.md`

Expected work:

- Create risks about fake identity, stolen accounts, exposed CPF/email data, and recovery-token misuse.
- Justify probability based on how easy it is to create accounts, reuse leaked credentials, enumerate CPF/email, or abuse recovery flows.
- Justify impact based on privacy harm, fraudulent bookings, user lockout, and identity misuse.

Example risk:

| Field | Example |
| --- | --- |
| ID | R01 |
| Related STRIDE Threat | T02 - Account Takeover |
| Related Abuse Case | AC02 - Account Takeover |
| Risk Event | Attacker accesses a guest account and performs actions as the victim. |
| Vulnerability or Condition | Weak login protection, credential reuse, missing suspicious-login detection. |
| Probability | 3 |
| Impact | 4 |
| Score | 12 |
| Level | Critical |
| Treatment Strategy | Reduce |
| NIST Functions | Govern, Protect, Detect, Respond, Recover |
| Controls | MFA for sensitive actions, login rate limits, suspicious-login alerts, session revocation. |
| Evidence | Authentication tests, audit logs, alert simulation, session invalidation test. |
| Residual Risk | Medium, accepted only with monitoring and incident response. |

## Member 2 - Sidnei

Assigned folder:

```text
artifacts/risk-treatment/accounts/
```

Main focus:

- authentication;
- sessions;
- role authorization;
- protected routes;
- staff hierarchy;
- privilege escalation;
- administrative account abuse.

Suggested Stage 1 sources:

- `artifacts/threat-modeling/accounts/T19-unauthorized-role-elevation.md`
- `artifacts/threat-modeling/accounts/T20-broken-route-authorization.md`
- `artifacts/threat-modeling/accounts/T21-session-fixation-and-hijacking.md`
- `artifacts/threat-modeling/accounts/T22-secondary-administrator-account-creation.md`
- `artifacts/threat-modeling/accounts/T23-internal-staff-hierarchy-bypass.md`
- `artifacts/abuse-cases/accounts/AC03-unauthorized-role-elevation.md`
- `artifacts/abuse-cases/accounts/AC04-broken-route-authorization.md`
- `artifacts/abuse-cases/accounts/AC19-session-fixation-and-hijacking.md`
- `artifacts/abuse-cases/accounts/AC20-secondary-administrator-account-creation.md`
- `artifacts/abuse-cases/accounts/AC21-internal-staff-hierarchy-bypass.md`

Expected work:

- Create risks about users accessing forbidden routes, gaining roles, abusing sessions, or bypassing staff hierarchy.
- Coordinate risk IDs with Iuri because both write to `accounts/risk-register.md`.
- Prioritize risks that can lead to administrator compromise or staff lockout.

Example risk:

| Field | Example |
| --- | --- |
| ID | R02 |
| Related STRIDE Threat | T20 - Broken Route Authorization |
| Related Abuse Case | AC04 - Broken Route Authorization |
| Risk Event | Guest directly accesses internal staff endpoints. |
| Vulnerability or Condition | Back-end depends on front-end route hiding instead of server-side authorization checks. |
| Probability | 3 |
| Impact | 4 |
| Score | 12 |
| Level | Critical |
| Treatment Strategy | Reduce |
| NIST Functions | Govern, Protect, Detect, Respond |
| Controls | Server-side RBAC checks, authorization tests per role, deny-by-default route policy, audit log for denied access. |
| Evidence | Automated authorization tests, route access matrix, denied-access logs. |
| Residual Risk | Medium, accepted only if every protected endpoint has tested authorization. |

## Member 3 - Lara

Assigned folder:

```text
artifacts/risk-treatment/accommodation/
```

Main focus:

- room availability;
- room status;
- room rates;
- capacity;
- cleaning queue;
- maintenance notes;
- check-in/check-out operational data;
- companion registration.

Suggested Stage 1 sources:

- `artifacts/threat-modeling/accommodation/`
- `artifacts/abuse-cases/accommodation/`

Expected work:

- Create risks about room manipulation, false availability, wrong status, incorrect rates, maintenance disruption, and occupancy inconsistency.
- Prioritize risks that affect booking correctness, guest safety, room turnover, or revenue.
- Include operational verification, not only technical controls.

Example risk:

| Field | Example |
| --- | --- |
| ID | R01 |
| Related STRIDE Threat | T01 - Room Availability Manipulation |
| Related Abuse Case | AC01 - Room Availability Manipulation |
| Risk Event | Attacker or malicious staff changes room availability and blocks legitimate bookings. |
| Vulnerability or Condition | Weak authorization or missing audit for room availability changes. |
| Probability | 3 |
| Impact | 3 |
| Score | 9 |
| Level | High |
| Treatment Strategy | Reduce |
| NIST Functions | Govern, Protect, Detect, Respond, Recover |
| Controls | Role-based permission for availability updates, audit log, manager approval for bulk changes, restore previous availability state. |
| Evidence | Permission tests, audit records, approval records, recovery simulation. |
| Residual Risk | Medium, accepted if changes are traceable and reversible. |

## Member 4 - Dyonathan

Assigned folders:

```text
artifacts/risk-treatment/booking/
artifacts/risk-treatment/payment/
```

Main focus:

- booking creation;
- booking cancellation;
- booking confirmation;
- expiration;
- booking state transitions;
- payment status;
- payment gateway responses;
- refunds;
- payment audit records.

Suggested Stage 1 sources:

- `artifacts/threat-modeling/booking/`
- `artifacts/threat-modeling/payments/`
- `artifacts/abuse-cases/booking/`
- `artifacts/abuse-cases/payment/`

Expected work:

- Split booking risks into `booking/risk-register.md`.
- Split payment and refund risks into `payment/risk-register.md`.
- Prioritize risks that can confirm unpaid reservations, cause financial loss, duplicate refunds, or corrupt reservation state.
- Use NIST `Recover` when restoration of booking/payment state matters.

Example booking risk:

| Field | Example |
| --- | --- |
| ID | R01 |
| Related STRIDE Threat | T15 - Booking State Machine Transition Bypass |
| Related Abuse Case | AC12 - Booking State Machine Transition Bypass |
| Risk Event | Guest forces an invalid booking transition and reactivates an expired booking. |
| Vulnerability or Condition | State transitions are not enforced centrally by server-side rules. |
| Probability | 2 |
| Impact | 4 |
| Score | 8 |
| Level | High |
| Treatment Strategy | Reduce |
| NIST Functions | Govern, Protect, Detect, Recover |
| Controls | Server-side state machine validation, transition audit log, rejected-transition alerts, rollback procedure. |
| Evidence | State-transition tests, audit entries, alert simulation, rollback test. |
| Residual Risk | Medium, accepted if invalid transitions are blocked and logged. |

Example payment risk:

| Field | Example |
| --- | --- |
| ID | R01 |
| Related STRIDE Threat | T02 - Payment Gateway Token Tampering |
| Related Abuse Case | AC10 - Payment Gateway Token Tampering |
| Risk Event | Attacker tampers with payment gateway response data and marks unpaid booking as paid. |
| Vulnerability or Condition | Payment callback is not validated with trusted provider signature or token verification. |
| Probability | 2 |
| Impact | 4 |
| Score | 8 |
| Level | High |
| Treatment Strategy | Reduce |
| NIST Functions | Protect, Detect, Respond, Recover |
| Controls | Signed webhook validation, payment reference reconciliation, suspicious payment-status alert, manual correction workflow. |
| Evidence | Webhook validation tests, reconciliation report, alert log, correction record. |
| Residual Risk | Medium, accepted only after provider verification and reconciliation exist. |

## Member 5 - Rafaela

Assigned folder:

```text
artifacts/risk-treatment/search-messaging/
```

Main focus:

- room search;
- public room information;
- hidden room enumeration;
- reviews;
- ratings;
- notifications;
- chat;
- message logs.

Suggested Stage 1 sources:

- `artifacts/threat-modeling/search-messaging/`
- `artifacts/abuse-cases/search-messaging/`

Expected work:

- Create risks about search overload, hidden information exposure, chat flooding, staff spoofing, review manipulation, notification abuse, and message history tampering.
- Prioritize risks that affect service availability, privacy, staff trust, or reputation.
- Use `Detect` for abuse signals such as flood patterns, abnormal review volume, and suspicious message routing.

Example risk:

| Field | Example |
| --- | --- |
| ID | R01 |
| Related STRIDE Threat | T02 - Chat Message Flooding |
| Related Abuse Case | AC02 - Chat Message Flooding |
| Risk Event | Attacker floods the guest-reception chat and prevents staff from handling legitimate requests. |
| Vulnerability or Condition | Missing rate limits, abuse detection, and staff queue protection. |
| Probability | 3 |
| Impact | 3 |
| Score | 9 |
| Level | High |
| Treatment Strategy | Reduce |
| NIST Functions | Protect, Detect, Respond |
| Controls | Message rate limiting, queue throttling, abuse alerts, temporary chat restriction policy. |
| Evidence | Rate-limit tests, alert logs, queue-load simulation, restriction review record. |
| Residual Risk | Medium, accepted if legitimate support remains available during abuse attempts. |

## Shared Final Review

After all members finish their module files, the group should review:

- duplicated risk IDs inside the same module;
- inconsistent probability or impact scoring;
- risks with score errors;
- risks marked with every NIST function without justification;
- generic controls without verification evidence;
- accepted risks without approval condition;
- residual risk that claims reduction without implemented controls;
- missing links to Stage 1 threats or abuse cases.

## Validation

Run the Stage 2 validator when risk-treatment files change:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-risk-treatment.ps1
```

The repository pre-commit hook also runs this check with the other validations.

## Commit Message Examples

- `Add identity risk treatment entries`
- `Add access control risk prioritization`
- `Add accommodation risk treatment plan`
- `Add booking and payment risk treatment`
- `Add search messaging NIST risk mapping`

---

# Stage 2 - Risk Analysis and Treatment Task Division (Operational Guide)

This document defines the Stage 2 work division for HospedaTche. Each member remains responsible for the same system area assigned in Stage 1.

Stage 2 does not replace STRIDE threats or abuse cases. Each member must use their Stage 1 artifacts as input and create risk analysis in the corresponding `artifacts/risk-treatment/<module>/risk-register.md` file.

## Shared Goal

Transform Stage 1 security analysis into a risk treatment plan using the NIST Cybersecurity Framework 2.0.

Each module must connect:

```text
STRIDE threat -> abuse case -> risk -> priority -> treatment strategy -> NIST function -> control -> verification -> residual risk
```

## Shared Rules

- Keep repository documentation in English.
- Keep each member in the same module worked on previously.
- Do not implement controls in Stage 2.
- Do not delete or replace Stage 1 threats or abuse cases.
- Every relevant Stage 1 threat should generate at least one risk.
- A threat may generate more than one risk if it causes different consequences.
- Proposed controls must be concrete and verifiable.
- Avoid generic controls like "improve security", "use encryption", or "monitor system" without explaining where, how, why, responsible party, and verification method.

## Expected Deliverable Per Module

Each member must update only their assigned module file:

```text
artifacts/risk-treatment/<module>/risk-register.md
```

Each file must contain:

- risk register;
- probability and impact values;
- score calculation;
- risk level;
- evaluation justifications;
- prioritization;
- NIST CSF 2.0 mapping;
- treatment plan;
- proposed controls;
- responsible parties;
- evidence and verification;
- initial implementation order;
- expected residual risk.

## Scoring Model

Score:

```text
Probability x Impact
```

Levels:

| Score | Level |
| --- | --- |
| 1 to 3 | Low |
| 4 to 7 | Medium |
| 8 to 11 | High |
| 12 to 16 | Critical |

## NIST CSF 2.0 Functions

Use only functions relevant to the risk. Do not mark all functions automatically.

| Function | Meaning in project |
| --- | --- |
| Govern | Policies, owners, priorities, approval rules, and acceptance criteria. |
| Identify | Assets, dependencies, vulnerabilities, and risk conditions. |
| Protect | Safeguards that reduce likelihood or impact. |
| Detect | Identification of suspicious activity, failures, abuse, or incident signals. |
| Respond | Containment, analysis, communication, and incident handling. |
| Recover | Restoration of service, data, or operational state after an incident. |

Example:

```text
Protect is a NIST function.
Require MFA for staff accounts is a control.
Authentication tests and audit logs are verification evidence.
```

## Task Division by Member

| Member | Name | Stage 1 Module | Stage 2 File |
| :--- | :--- | :--- | :--- |
| Member 1 | Iuri | Registration and Identity | `artifacts/risk-treatment/accounts/risk-register.md` |
| Member 2 | Sidnei | Authentication and Access Control | `artifacts/risk-treatment/accounts/risk-register.md` |
| Member 3 | Lara | Accommodation and Rooms | `artifacts/risk-treatment/accommodation/risk-register.md` |
| Member 4 | Dyonathan | Booking and Payment | `artifacts/risk-treatment/booking/risk-register.md` and `artifacts/risk-treatment/payment/risk-register.md` |
| Member 5 | Rafaela | Search, Reviews, and Messaging | `artifacts/risk-treatment/search-messaging/risk-register.md` |

Iuri and Sidnei continue in the accounts area with different focuses. They must coordinate risk IDs within the same `accounts/risk-register.md` file.

## Member 1 - Iuri

Folder:

```text
artifacts/risk-treatment/accounts/
```

Focus:

- guest registration;
- identity validation;
- CPF/email misuse;
- fake guest accounts;
- account takeover;
- profile data exposure;
- password recovery risks linked to identity.

Example risk:

| Field | Example |
| --- | --- |
| ID | R01 |
| STRIDE Threat | T02 - Account Takeover |
| Abuse Case | AC02 - Account Takeover |
| Risk Event | Attacker accesses guest account and acts as victim. |
| Vulnerability or Condition | Weak login protection, credential reuse, missing suspicious login detection. |
| Probability | 3 |
| Impact | 4 |
| Score | 12 |
| Level | Critical |
| Strategy | Reduce |
| NIST Functions | Govern, Protect, Detect, Respond, Recover |
| Controls | MFA on sensitive actions, rate limiting, suspicious login alerts, session revocation. |
| Evidence | Authentication tests, logs, alert simulation, session invalidation test. |
| Residual Risk | Medium, accepted only with monitoring and incident response. |

## Member 2 - Sidnei

Folder:

```text
artifacts/risk-treatment/accounts/
```

Focus:

- authentication;
- sessions;
- role-based authorization;
- protected routes;
- internal hierarchy;
- privilege escalation;
- administrative account abuse.

Example risk:

| Field | Example |
| --- | --- |
| ID | R02 |
| STRIDE Threat | T20 - Broken Route Authorization |
| Abuse Case | AC04 - Broken Route Authorization |
| Risk Event | Guest accesses internal staff-only endpoint. |
| Vulnerability or Condition | Back-end relies solely on front-end route hiding. |
| Probability | 3 |
| Impact | 4 |
| Score | 12 |
| Level | Critical |
| Strategy | Reduce |
| NIST Functions | Govern, Protect, Detect, Respond |
| Controls | Server-side RBAC, per-role tests, deny-by-default route policy, denied access logs. |
| Evidence | Automated authorization tests, access matrix, access-denied logs. |
| Residual Risk | Medium, accepted if every protected endpoint has tested authorization. |

## Member 3 - Lara

Folder:

```text
artifacts/risk-treatment/accommodation/
```

Focus:

- room availability;
- room status;
- rates;
- capacity;
- cleaning queue;
- maintenance;
- check-in/check-out;
- companions.

Example risk:

| Field | Example |
| --- | --- |
| ID | R01 |
| STRIDE Threat | T01 - Room Availability Manipulation |
| Abuse Case | AC01 - Room Availability Manipulation |
| Risk Event | Attacker or malicious staff changes availability and blocks legitimate bookings. |
| Vulnerability or Condition | Weak authorization or missing audit on availability changes. |
| Probability | 3 |
| Impact | 3 |
| Score | 9 |
| Level | High |
| Strategy | Reduce |
| NIST Functions | Govern, Protect, Detect, Respond, Recover |
| Controls | Role-based permission, audit log, manager approval for bulk changes, previous state restoration. |
| Evidence | Permission tests, audit records, approval records, recovery simulation. |
| Residual Risk | Medium, accepted if changes are traceable and reversible. |

## Member 4 - Dyonathan

Folders:

```text
artifacts/risk-treatment/booking/
artifacts/risk-treatment/payment/
```

Focus:

- booking creation;
- cancellation;
- confirmation;
- expiration;
- state transitions;
- payment status;
- gateway responses;
- refunds;
- payment auditing.

Example booking risk:

| Field | Example |
| --- | --- |
| ID | R01 |
| STRIDE Threat | T15 - Booking State Machine Transition Bypass |
| Abuse Case | AC12 - Booking State Machine Transition Bypass |
| Risk Event | Guest forces invalid transition and reactivates expired booking. |
| Vulnerability or Condition | State transitions are not validated on the server. |
| Probability | 2 |
| Impact | 4 |
| Score | 8 |
| Level | High |
| Strategy | Reduce |
| NIST Functions | Govern, Protect, Detect, Recover |
| Controls | State machine validation, transition log, rejected transition alert, rollback procedure. |
| Evidence | Transition tests, logs, alert simulation, rollback test. |
| Residual Risk | Medium, accepted if invalid transitions are blocked and logged. |

Example payment risk:

| Field | Example |
| --- | --- |
| ID | R01 |
| STRIDE Threat | T02 - Payment Gateway Token Tampering |
| Abuse Case | AC10 - Payment Gateway Token Tampering |
| Risk Event | Attacker alters gateway response and marks unpaid booking as paid. |
| Vulnerability or Condition | Payment callback does not validate trusted signature or provider token. |
| Probability | 2 |
| Impact | 4 |
| Score | 8 |
| Level | High |
| Strategy | Reduce |
| NIST Functions | Protect, Detect, Respond, Recover |
| Controls | Signed webhook validation, payment reference reconciliation, suspicious status alert, manual correction workflow. |
| Evidence | Webhook tests, reconciliation report, alert log, correction record. |
| Residual Risk | Medium, accepted only after provider verification and reconciliation exist. |

## Member 5 - Rafaela

Folder:

```text
artifacts/risk-treatment/search-messaging/
```

Focus:

- room search;
- public information;
- hidden room enumeration;
- reviews;
- ratings;
- notifications;
- chat;
- message history.

Example risk:

| Field | Example |
| --- | --- |
| ID | R01 |
| STRIDE Threat | T02 - Chat Message Flooding |
| Abuse Case | AC02 - Chat Message Flooding |
| Risk Event | Attacker overloads chat and prevents legitimate guest support. |
| Vulnerability or Condition | Missing message limits, abuse detection, and reception queue protection. |
| Probability | 3 |
| Impact | 3 |
| Score | 9 |
| Level | High |
| Strategy | Reduce |
| NIST Functions | Protect, Detect, Respond |
| Controls | Message limits, queue control, abuse alert, temporary chat restriction policy. |
| Evidence | Rate-limit tests, alert logs, load simulation, restriction review record. |
| Residual Risk | Medium, accepted if legitimate support remains available during abuse attempts. |

## Shared Final Review

After all members finish their module files, the group should review:

- duplicate risk IDs inside the same module;
- inconsistent probability or impact scores;
- score calculation errors;
- risks marked with all NIST functions without justification;
- generic controls without evidence;
- accepted risks without approval condition;
- residual risk claiming reduction without implementation;
- missing links to Stage 1 threats or abuse cases.

## Validation

Run when risk treatment files change:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-risk-treatment.ps1
```

The repository pre-commit hook also runs this check alongside other validations.
