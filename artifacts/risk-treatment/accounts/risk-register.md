# Accounts Risk Register

Module scope: user registration, identity, authentication, sessions, profile access, roles, and internal account management.

Stage 1 sources:

- STRIDE threats: `artifacts/threat-modeling/accounts/`
- Abuse cases: `artifacts/abuse-cases/accounts/`

## Risk Register

| ID | Related STRIDE Threat | Related Abuse Case | Risk Event | Vulnerability or Condition | Probability | Impact | Score | Level |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | T01 - Fake Guest Registration | AC01 - Fake Guest Registration | Fake guest accounts create fraudulent bookings, unnecessary chat requests, or fake reviews that affect legitimate guests and hotel operation. | Account creation depends mainly on a valid email address, without stronger identity or abuse verification. | 4 | 3 | 12 | Critical |
| R02 | T02 - Account Takeover | AC02 - Account Takeover | An attacker takes over a legitimate account and uses it to access personal data, perform unauthorized bookings, misuse chat, or act as the victim inside the platform. | Weak or reused passwords, credential leaks, brute-force attempts, malware on user devices, and missing suspicious-login protection. | 3 | 4 | 12 | Critical |

## Evaluation Justifications

### R01 - Fake Guest Registration Risk

Probability justification: The probability is high because account creation depends mainly on having a valid email address. If the system does not require stronger identity verification or abuse controls, an attacker can create fake guest accounts with relatively low effort.

Impact justification: The impact is high because fake accounts can use the service in ways that delay support for legitimate guests, create false bookings, and consume hotel operational resources.

Affected users, data, features, or components: Legitimate guests, guest account records, booking flow, chat support, review system, and email notification flow.

Expected consequences: Operational losses caused by fraudulent bookings, unnecessary chat support requests, fake review activity, delayed service for legitimate guests, and reduced trust in the platform.

Risk level justification: The calculated score is critical because accommodation availability is central to HospedaTche. If a fake guest reserves a room only to disrupt the service, a legitimate guest may lose access to that room. The same logic applies to chat support: fake requests can consume staff time that should be used to support real guests.

### R02 - Account Takeover Risk

Probability justification: The probability is medium-high because users often create weak or reused passwords. Accounts may also be exposed through credential leaks, brute-force attempts, phishing, or malware on the user's device. These conditions make account takeover plausible in common attack scenarios.

Impact justification: The impact is very high because the account may contain CPF, personal information, payment-related data, booking history, and information about when the guest will be away from home. The attacker may also damage the guest's reputation or cause restrictions on the platform through inappropriate chat behavior.

Affected users, data, features, or components: Account owner, login module, registration/profile module, booking module, payment-related data, personal information, CPF data, chat module, and booking dates that may reveal when the guest is away from home.

Expected consequences: Unauthorized bookings, exposure or misuse of payment-related data, personal data exposure, account lockout, inappropriate chat activity, platform restrictions for the victim, and loss of trust in the system.

Risk level justification: The calculated score is critical because the guest account concentrates sensitive information and system access. It is linked to identity data such as CPF, may expose payment-related information and booking dates, and is required for the guest to use the platform. If the account is compromised, the attacker can harm both the guest and HospedaTche.

## Prioritization

| Priority | Risk | Reason |
| --- | --- | --- |
| 1 | R02 | This risk should be treated first because it directly affects legitimate guests and may expose CPF, personal data, payment-related data, booking history, and chat access. If the compromise is caused or worsened by weak system controls, it may also create legal, operational, and reputational consequences for HospedaTche. |
| 2 | R01 | This risk should also be treated early because the booking system is the core of the platform. Fake guest accounts can directly affect room availability, create unnecessary support demand, and reduce trust in booking, chat, and review workflows. |

## NIST CSF 2.0 Mapping

| Risk | Govern | Identify | Protect | Detect | Respond | Recover | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | X | X | X | X | X | X | Fake guest registration requires governance for account validation rules, identification of affected account and booking assets, protection against automated or fraudulent registration, detection of suspicious account creation, response to remove abusive accounts, and recovery of affected bookings, reviews, or support queues. |
| R02 | X | X | X | X | X | X | Account takeover requires governance for authentication and account recovery rules, identification of sensitive account assets, protection against weak authentication and brute-force attempts, detection of suspicious logins, response through account blocking and session revocation, and recovery of account access for the legitimate user. |

## Treatment Plan

| Risk | Strategy | Proposed Controls | NIST Functions | Responsible Parties | Evidence and Verification |
| --- | --- | --- | --- | --- | --- |
| R01 | Reduce | Email verification before account activation, duplicate CPF/email checks, staff review for repeated abuse patterns | Govern, Protect, Detect, Respond | Development team and system administrator | Registration validation tests; rate-limit test results; account creation audit logs; review records for blocked or suspicious accounts. |
| R02 | Reduce | Login rate limiting; strong password policy; suspicious login detection; temporary account block after suspicious login attempts; session revocation after password reset; notification to the account owner after sensitive login or recovery events. | Govern, Protect, Detect, Respond, Recover | Development team and system administrator | Login validation tests; brute-force rate-limit tests; suspicious-login alert logs; account block tests; session revocation tests; account recovery test records. |

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
