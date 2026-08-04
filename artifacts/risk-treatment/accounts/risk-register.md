# Accounts Risk Register

Module scope: user registration, identity, authentication, sessions, profile access, roles, and internal account management.

Stage 1 sources:

- STRIDE threats: `artifacts/threat-modeling/accounts/`
- Abuse cases: `artifacts/abuse-cases/accounts/`

## Risk Register

| ID | Related STRIDE Threat | Related Abuse Case | Risk Event | Vulnerability or Condition | Probability | Impact | Score | Level |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | T01 - Fake Guest Registration | AC01 - Fake Guest Registration | Fake guest accounts create fraudulent bookings, unnecessary chat requests, or fake reviews that affect legitimate guests and hotel operation. | Account creation depends mainly on a valid email address, without stronger identity or abuse verification. | 4 | 3 | 12 | Critical |

## Evaluation Justifications

### R01 - Fake Guest Registration Risk

Probability justification: The probability is high because account creation depends mainly on having a valid email address. If the system does not require stronger identity verification or abuse controls, an attacker can create fake guest accounts with relatively low effort.

Impact justification: The impact is high because fake accounts can use the service in ways that delay support for legitimate guests, create false bookings, and consume hotel operational resources.

Affected users, data, features, or components: Legitimate guests, guest account records, booking flow, chat support, review system, and email notification flow.

Expected consequences: Operational losses caused by fraudulent bookings, unnecessary chat support requests, fake review activity, delayed service for legitimate guests, and reduced trust in the platform.

Risk level justification: The calculated score is critical because accommodation availability is central to HospedaTche. If a fake guest reserves a room only to disrupt the service, a legitimate guest may lose access to that room. The same logic applies to chat support: fake requests can consume staff time that should be used to support real guests.

## Prioritization

| Priority | Risk | Reason |
| --- | --- | --- |
| 1 | R01 | This risk should be treated early because the booking system is the core of system, fake guests accounts can affect directly roow availabity, create unecessary support demand, and reduce trust in booking, chat, and review workflows. |

## NIST CSF 2.0 Mapping

| Risk | Govern | Identify | Protect | Detect | Respond | Recover | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | X | X | X | X | X | X | Fake guest registration requires governance for account validation rules, identification of affected account and booking assets, protection against automated or fraudulent registration, detection of suspicious account creation, response to remove abusive accounts, and recovery of affected bookings, reviews, or support queues. |

## Treatment Plan

| Risk | Strategy | Proposed Controls | NIST Functions | Responsible Parties | Evidence and Verification |
| --- | --- | --- | --- | --- | --- |
| R01 | Reduce | Email verification before account activation, duplicate CPF/email checks, staff review for repeated abuse patterns | Govern, Protec, Detect, Respond | Development team and system administrator | Registration validation tests; rate-limit test results; account creation audit logs; review records for blocked or suspicious accounts. |

## Initial Implementation Order

| Order | Control or Action | Related Risks | Reason |
| --- | --- | --- | --- |
| 1 | TODO: first control/action to implement for this risk. | R01 | TODO: explain why this comes first. |

## Expected Residual Risk

| Risk | Initial Level | Expected Residual Level | Condition to Accept Residual |
| --- | --- | --- | --- |
| R01 | TODO: same as initial calculated level. | TODO: expected level after controls. | TODO: condition needed to accept remaining risk. |

## Final Notes

TODO.
