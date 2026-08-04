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
| R03 | T09 - Mass Account Creation | AC09 - Mass Account Creation | An attacker creates many fake guest accounts to pollute account records, consume storage, overload account management, or degrade system availability. | The registration flow allows repeated account creation with different email addresses and does not enforce enough rate limits, abuse detection, or registration controls. | 4 | 3 | 12 | Critical |
| R04 | T11 - Password Reset Token Leakage | AC11 - Password Reset Token Leakage | An attacker obtains a password reset token and changes the victim's password, gaining control of the account. | Password reset tokens are not properly protected, expire too slowly, are exposed in logs or URLs, or can be reused after password recovery. | 2 | 4 | 8 | High |
| R05 | T19 - Unauthorized Role Elevation | AC03 - Unauthorized Role Elevation | A guest or other low-privileged user gains Manager or Administrator privileges and performs restricted administrative actions. | Role assignment or account update endpoints fail to enforce strict server-side authorization, allowing role parameters or token payloads to be manipulated. | 3 | 4 | 12 | Critical |
| R06 | T15 - Unauthorized Guest Profile Access | AC15 - Unauthorized Guest Profile Access | An authenticated attacker accesses another guest's profile data by changing a profile identifier, URL, or request parameter. | Profile access control is weak, profile identifiers are predictable, or the system does not verify that the requested profile belongs to the authenticated user. | 3 | 4 | 12 | Critical |
| R07 | T20 - Broken Route Authorization | AC04 - Broken Route Authorization | A low-privileged or unauthenticated user accesses restricted internal routes or API endpoints and views staff-only data or performs protected actions. | Route protection relies on front-end hiding or incomplete endpoint checks instead of consistent server-side authorization for every protected route and REST endpoint. | 3 | 4 | 12 | Critical |

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

### R03 - Mass Account Creation Risk

Probability justification: The probability is high because an attacker can prepare many email addresses and repeatedly use the registration flow if the system does not enforce enough rate limits, abuse detection, or account creation controls.

Impact justification: The impact is high because mass fake accounts can pollute account records, increase storage usage, slow account management, affect system performance, and reduce availability for legitimate users.

Affected users, data, features, or components: Legitimate guests, registration module, account database, account management process, storage resources, system performance, and overall availability.

Expected consequences: Fake account records accumulate in the database, storage and maintenance costs increase, account management becomes less reliable, and normal users may experience degraded performance or reduced availability.

Risk level justification: The calculated score is critical because the attack is easy to repeat and directly affects availability and account integrity. In a hotel accommodation system, degraded availability and polluted account data can disrupt guest registration, support, and later booking flows.

### R04 - Password Reset Token Leakage Risk

Probability justification: The probability is medium-low because token leakage depends on a specific weakness, such as reset tokens being stored or transmitted insecurely, exposed in logs or URLs, not expiring quickly, or not being invalidated after use. It is less likely than common password reuse, but still possible.

Impact justification: The impact is very high because possession of a valid reset token may allow an attacker to change the user's password and take over the account using the recovery flow. This can expose personal data, booking information, and payment-related information.

Affected users, data, features, or components: Guest account owner, password recovery flow, reset tokens, login module, active sessions, profile data, booking module, and payment-related data.

Expected consequences: Account takeover, unauthorized password change, victim lockout, exposure or sale of personal information, fraudulent bookings, misuse of payment-related data, and financial or reputational harm to the guest and hotel.

Risk level justification: The calculated score is high because the probability depends on a specific token-handling weakness, but the impact is severe. Losing control of the account can prevent the guest from using hotel services and can expose data connected to bookings, identity, and payments.

### R05 - Unauthorized Role Elevation Risk

Probability justification: The probability is medium-high because a guest or other low-privileged user may try to manipulate role parameters, account update payloads, or token data. If the system does not strictly validate role changes on the server side, privilege escalation becomes plausible during normal authenticated use.

Impact justification: The impact is very high because a guest with Manager or Administrator privileges can alter rooms, prices, staff accounts, hotel information, reports, and other restricted functions. A single elevated account can disrupt hotel operation and damage system governance.

Affected users, data, features, or components: Role assignment API, account management module, room management module, employee management module, chat/support functions, booking and payment-related administration, audit data, and hotel configuration.

Expected consequences: Unauthorized administrative actions, room deletion or tampering, employee inactivation, unauthorized price changes, exposure of hotel or staff information, abusive messages sent as staff, operational disruption, and long-term reputational damage.

Risk level justification: The calculated score is critical because elevated privileges can affect the entire hotel operation. If a guest becomes a Manager or Administrator, the attacker can perform actions far beyond normal guest permissions and may require developer or administrator intervention to restore the system safely.

### R06 - Unauthorized Guest Profile Access Risk

Probability justification: The probability is medium-high because an attacker with a valid account may try to change profile identifiers, URLs, or request parameters. If the system does not enforce strict ownership checks on profile endpoints, unauthorized profile access becomes plausible during normal authenticated use.

Impact justification: The impact is very high because guest profiles may expose CPF, contact data, booking history, account information, and other personal data. Exposure of this information can harm the guest, reduce trust in HospedaTche, and create legal or reputational consequences for the hotel.

Affected users, data, features, or components: Guest profile module, authenticated guests, CPF data, contact data, account information, booking history, profile endpoints, session validation, and authorization rules.

Expected consequences: Personal data exposure, privacy violation, misuse of guest information, loss of trust in account protection, support disputes, and possible legal or regulatory consequences if sensitive guest data is exposed.

Risk level justification: The calculated score is critical because profile data is sensitive and directly linked to guest identity and bookings. Even if the attacker does not gain administrator privileges, unauthorized access to another guest's profile can expose personal information and damage the trust required for a hotel accommodation system.

### R07 - Broken Route Authorization Risk

Probability justification: The probability is medium-high because route protection is conceptually simple, but individual routes or API endpoints can be forgotten, misconfigured, or temporarily exposed during development. The risk is more severe when the route allows protected staff, manager, or administrator actions instead of only viewing restricted information.

Impact justification: The impact is very high because accessing protected routes may expose hotel statistics, employee information, guest data, internal records, or administrative functions. In severe cases, the attacker may perform actions that alter legitimate data, disrupt operations, or affect system availability.

Affected users, data, features, or components: Protected front-end routes, REST endpoints, staff pages, manager pages, administrator pages, hotel operational data, employee data, guest data, booking records, room management, payment-related administration, and audit data.

Expected consequences: Loss of trust in the system, information disclosure, unauthorized administrative actions, legitimate data tampering, service unavailability, and bypass of role boundaries without the attacker needing a formally elevated role.

Risk level justification: The calculated score is critical because an unprotected route can behave like privilege escalation while the attacker keeps a low-privileged role. If the route is easy to discover, multiple attackers may reuse the same weakness to access internal data or perform restricted actions.

## Prioritization

| Priority | Risk | Reason |
| --- | --- | --- |
| 1 | R02 | This risk should be treated first because it directly affects legitimate guests and may expose CPF, personal data, payment-related data, booking history, and chat access. If the compromise is caused or worsened by weak system controls, it may also create legal, operational, and reputational consequences for HospedaTche. |
| 2 | R01 | This risk should also be treated early because the booking system is the core of the platform. Fake guest accounts can directly affect room availability, create unnecessary support demand, and reduce trust in booking, chat, and review workflows. |
| 3 | R03 | This risk should be treated early because mass account creation can degrade system availability, pollute account records, and make account management less reliable for legitimate users. |
| 4 | R04 | This risk can be treated after the broader account takeover and mass abuse risks, but it remains important because a leaked reset token can directly lead to account takeover and exposure of sensitive guest data. |
| 5 | R05 | This risk should be treated as critical because unauthorized role elevation can compromise the whole hotel operation, including rooms, staff accounts, prices, internal information, and administrative actions. |
| 6 | R06 | This risk should be treated as critical because unauthorized profile access exposes sensitive guest data and can permanently damage trust in the platform. It is listed after role elevation because it is narrower in scope, but it still requires early treatment. |
| 7 | R07 | This risk should be treated as critical because protected route enforcement is a basic requirement for a secure system. If a protected route is exposed, users may access staff or administrator functions without formally changing their role. |

## NIST CSF 2.0 Mapping

| Risk | Govern | Identify | Protect | Detect | Respond | Recover | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | X | X | X | X | X | X | Fake guest registration requires governance for account validation rules, identification of affected account and booking assets, protection against automated or fraudulent registration, detection of suspicious account creation, response to remove abusive accounts, and recovery of affected bookings, reviews, or support queues. |
| R02 | X | X | X | X | X | X | Account takeover requires governance for authentication and account recovery rules, identification of sensitive account assets, protection against weak authentication and brute-force attempts, detection of suspicious logins, response through account blocking and session revocation, and recovery of account access for the legitimate user. |
| R03 | X | X | X | X | X | X | Mass account creation requires governance for registration limits, identification of affected account and storage assets, protection against automated or repeated registrations, detection of abnormal account creation patterns, response procedures to block abusive accounts, and recovery through cleanup of fake account records. |
| R04 | X | X | X | X | X | X | Password reset token leakage requires governance for recovery-token rules, identification of token storage and delivery points, protection through short-lived single-use tokens, detection of abnormal reset activity, response through token invalidation and session revocation, and recovery of account access for the legitimate user. |
| R05 | X | X | X | X | X | X | Unauthorized role elevation requires governance for role assignment rules, identification of privileged APIs and roles, protection through server-side authorization and deny-by-default role changes, detection of abnormal privilege changes, response through account suspension and role rollback, and recovery of affected configuration, rooms, staff accounts, or audit records. |
| R06 | X | X | X | X | X | X | Unauthorized guest profile access requires governance for profile access rules, identification of sensitive profile data and endpoints, protection through strict ownership checks and deny-by-default authorization, detection of abnormal profile access attempts, response through access revocation and investigation, and recovery through incident communication and correction of exposed records. |
| R07 | X | X | X | X | X | X | Broken route authorization requires governance for route and endpoint access rules, identification of protected routes and admin-only actions, protection through server-side authorization checks on every route and form, detection of abnormal access to restricted pages, response through blocking and route correction, and recovery of data or configuration changed through exposed routes. |

## Treatment Plan

| Risk | Strategy | Proposed Controls | NIST Functions | Responsible Parties | Evidence and Verification |
| --- | --- | --- | --- | --- | --- |
| R01 | Reduce | Email verification before account activation, duplicate CPF/email checks, staff review for repeated abuse patterns | Govern, Protect, Detect, Respond | Development team and system administrator | Registration validation tests; rate-limit test results; account creation audit logs; review records for blocked or suspicious accounts. |
| R02 | Reduce | Login rate limiting; strong password policy; suspicious login detection; temporary account block after suspicious login attempts; session revocation after password reset; notification to the account owner after sensitive login or recovery events. | Govern, Protect, Detect, Respond, Recover | Development team and system administrator | Login validation tests; brute-force rate-limit tests; suspicious-login alert logs; account block tests; session revocation tests; account recovery test records. |
| R03 | Reduce | Registration rate limiting; email ownership verification before account activation; abuse detection for repeated account creation; account creation audit log; administrative cleanup process for confirmed fake accounts. | Govern, Protect, Detect, Respond, Recover | Development team and system administrator | Registration rate-limit tests; email verification tests; account creation audit logs; abnormal registration alert logs; cleanup records for confirmed fake accounts. |
| R04 | Reduce | Short-lived single-use reset tokens; hashed token storage; no reset tokens in logs; token invalidation after password change; session revocation after password reset; notification to the account owner after password recovery. | Govern, Protect, Detect, Respond, Recover | Development team and system administrator | Password reset token expiration tests; token reuse tests; log review confirming tokens are not exposed; session revocation tests; password recovery notification tests. |
| R05 | Reduce | Server-side authorization checks for role changes; deny-by-default role assignment policy; approval flow for privileged role changes; audit log for all role updates; alert for unexpected Manager or Administrator assignment; rollback procedure for unauthorized role changes. | Govern, Protect, Detect, Respond, Recover | Development team and system administrator | Authorization tests proving guests cannot assign roles; role-change approval records; role update audit logs; alert simulation for unexpected privilege changes; rollback test records. |
| R06 | Reduce | Server-side ownership checks for every profile endpoint; deny-by-default authorization policy; unpredictable profile references or indirect identifiers; audit log for profile access; alert for repeated unauthorized profile access attempts. | Govern, Protect, Detect, Respond, Recover | Development team and system administrator | Authorization tests proving users cannot access other profiles; profile endpoint access logs; denied-access audit records; alert simulation for repeated profile access attempts; incident review records. |
| R07 | Reduce | Server-side authorization checks for every protected route and REST endpoint; deny-by-default route policy; role-based access matrix; automated authorization tests for guest, receptionist, manager, and administrator roles; audit log for denied access to protected routes. | Govern, Protect, Detect, Respond, Recover | Development team and system administrator | Route authorization tests; role access matrix review; denied-access logs; alert simulation for restricted route access; incident records for corrected exposed routes. |

## Initial Implementation Order

| Order | Control or Action | Related Risks | Reason |
| --- | --- | --- | --- |
| 1 | Add login rate limiting, suspicious-login detection, and temporary account blocking. | R02 | Account takeover is the highest-priority risk because it directly compromises legitimate guests and may expose CPF, personal data, booking history, and payment-related data. |
| 2 | Add short-lived single-use password reset tokens, hashed token storage, token invalidation, and session revocation after password reset. | R04, R02 | Password reset token leakage can become account takeover, so recovery controls should be implemented soon after login protections. |
| 3 | Add email ownership verification before account activation and registration rate limiting. | R01, R03 | These controls reduce fake guest registration and mass account creation before accounts can affect booking, chat, reviews, or system availability. |
| 4 | Add account creation audit logs and abnormal registration alerts. | R01, R03 | Detection and audit evidence are needed to identify fake-account patterns and support administrative response. |
| 5 | Add administrative review and cleanup process for suspicious or confirmed fake accounts. | R01, R03 | Cleanup and response reduce remaining operational impact after suspicious accounts are detected. |
| 6 | Add server-side role-change authorization and privileged role approval. | R05 | Role elevation can compromise the whole system, so privileged role changes must be blocked by default and approved explicitly. |
| 7 | Add server-side ownership checks and deny-by-default authorization for profile endpoints. | R06 | Profile data exposure is critical, and ownership checks are the main control needed to prevent one guest from accessing another guest's profile. |
| 8 | Add server-side authorization checks and automated authorization tests for all protected routes. | R07 | Protected route enforcement is broad and affects every restricted module, so route checks must be verified systematically across roles. |

## Expected Residual Risk

| Risk | Initial Level | Expected Residual Level | Condition to Accept Residual |
| --- | --- | --- | --- |
| R01 | Critical | Medium | Residual risk is accepted only if email verification, duplicate CPF/email checks, account creation audit logs, and suspicious-account review records are implemented and verified. |
| R02 | Critical | Medium | Residual risk is accepted only if login rate limiting, suspicious-login detection, temporary account blocking, session revocation, and account owner notifications are implemented and tested. |
| R03 | Critical | Medium | Residual risk is accepted only if registration rate limiting, email ownership verification, fake-account detection, audit logs, and cleanup procedures are implemented and verified. |
| R04 | High | Low | Residual risk is accepted only if reset tokens are short-lived, single-use, stored hashed, absent from logs, invalidated after use, and followed by session revocation and user notification. |
| R05 | Critical | Medium | Residual risk is accepted only if role changes require server-side authorization, privileged assignments require approval, role updates are audited, unexpected privilege changes generate alerts, and rollback procedures are verified. |
| R06 | Critical | Medium | Residual risk is accepted only if profile endpoints enforce server-side ownership checks, deny unauthorized access by default, log profile access attempts, and generate evidence through authorization tests and audit records. |
| R07 | Critical | Medium | Residual risk is accepted only if protected routes and REST endpoints enforce server-side authorization, route access is tested for each role, denied access is logged, and exposed route corrections are documented. |

## Final Notes

The current account risks focus on fake registration, account takeover, mass account creation, password reset token leakage, unauthorized role elevation, unauthorized guest profile access, and broken route authorization. The most urgent controls are authentication protections and password recovery safeguards because they prevent direct compromise of legitimate guest accounts. Registration controls and account creation monitoring should follow because they reduce fake-account abuse, system pollution, and availability problems. Role-change authorization and protected route checks are essential because unauthorized privileged access or exposed internal routes can compromise the entire hotel operation. Profile ownership checks are also important because they prevent privacy violations between legitimate guest accounts.

Residual risk is only an estimate. The group cannot claim that risk was reduced until the controls are implemented, tested, and supported by evidence such as validation tests, audit logs, alert records, and administrative review records.
