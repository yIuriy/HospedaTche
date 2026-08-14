# Accounts Risk Register

Module scope: user registration, identity, authentication, sessions, profile access, roles, and internal account management.

Stage 1 sources:

- STRIDE threats: `artifacts/threat-modeling/accounts/`
- Abuse cases: `artifacts/abuse-cases/accounts/`

## Probability Criteria

| Value | Classification | Criteria |
| --- | --- | --- |
| 1 | Low | Event depends on uncommon conditions, very specific access, or high technical capability. |
| 2 | Medium-low | Event is possible, but depends on a specific vulnerability, missing workflow rule, privileged access, or successful account compromise. |
| 3 | Medium-high | Event is plausible during common account, authentication, or authorization flows. |
| 4 | High | Event can happen easily, frequently, or through predictable misuse when preventive controls are absent. |

## Impact Criteria

| Value | Classification | Criteria |
| --- | --- | --- |
| 1 | Low | Causes small disruption and can be corrected quickly. |
| 2 | Moderate | Causes limited account inconsistency or access disruption, with recovery possible through staff review. |
| 3 | High | Causes relevant harm to users, staff operations, privacy, availability, or account integrity. |
| 4 | Very high | Can compromise privileged access, sensitive personal data, critical account recovery, or multiple hotel workflows. |

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
| R01 | T01 - Fake Guest Registration | AC01 - Fake Guest Registration | Fake guest accounts create fraudulent bookings, unnecessary chat requests, or fake reviews that affect legitimate guests and hotel operation. | Account creation depends mainly on a valid email address, without stronger identity or abuse verification. | 4 | 3 | 12 | Critical |
| R02 | T02 - Account Takeover | AC02 - Account Takeover | An attacker takes over a legitimate account and uses it to access personal data, perform unauthorized bookings, misuse chat, or act as the victim inside the platform. | Weak or reused passwords, credential leaks, brute-force attempts, malware on user devices, and missing suspicious-login protection. | 3 | 4 | 12 | Critical |
| R03 | T09 - Mass Account Creation | AC09 - Mass Account Creation | An attacker creates many fake guest accounts to pollute account records, consume storage, overload account management, or degrade system availability. | The registration flow allows repeated account creation with different email addresses and does not enforce enough rate limits, abuse detection, or registration controls. | 4 | 3 | 12 | Critical |
| R04 | T11 - Password Reset Token Leakage | AC11 - Password Reset Token Leakage | An attacker obtains a password reset token and changes the victim's password, gaining control of the account. | Password reset tokens are not properly protected, expire too slowly, are exposed in logs or URLs, or can be reused after password recovery. | 2 | 4 | 8 | High |
| R05 | T19 - Unauthorized Role Elevation | AC03 - Unauthorized Role Elevation | A guest or other low-privileged user gains Manager or Administrator privileges and performs restricted administrative actions. | Role assignment or account update endpoints fail to enforce strict server-side authorization, allowing role parameters or token payloads to be manipulated. | 3 | 4 | 12 | Critical |
| R06 | T15 - Unauthorized Guest Profile Access | AC15 - Unauthorized Guest Profile Access | An authenticated attacker accesses another guest's profile data by changing a profile identifier, URL, or request parameter. | Profile access control is weak, profile identifiers are predictable, or the system does not verify that the requested profile belongs to the authenticated user. | 3 | 4 | 12 | Critical |
| R07 | T20 - Broken Route Authorization | AC04 - Broken Route Authorization | A low-privileged or unauthenticated user accesses restricted internal routes or API endpoints and views staff-only data or performs protected actions. | Route protection relies on front-end hiding or incomplete endpoint checks instead of consistent server-side authorization for every protected route and REST endpoint. | 3 | 4 | 12 | Critical |
| R08 | T16 - Inactive Account Still Has Access | AC16 - Inactive Account Still Has Access | A former or inactive staff account continues accessing the online system after inactivation and uses remaining sessions or permissions to view hotel data or perform staff actions. | Account inactivation does not revoke active sessions, tokens, or effective permissions, allowing access to continue after offboarding. | 2 | 3 | 6 | Medium |
| R09 | T17 - Role Change Without Approval | AC17 - Role Change Without Approval | An account role is changed to a higher privilege level without proper approval, allowing the user to perform actions outside the intended permission boundary. | The role management process allows role updates without enough authorization, approval workflow, audit control, or separation between request and approval. | 3 | 4 | 12 | Critical |
| R10 | T12 - Session Not Invalidated After Password Change | AC12 - Session Not Invalidated After Password Change | An attacker keeps access to a compromised account because existing sessions remain valid after the legitimate user changes or resets the password. | Password change and recovery flows do not revoke active sessions, refresh tokens, remembered devices, or other authentication artifacts already issued before the password change. | 4 | 4 | 16 | Critical |
| R11 | T14 - Mass Login Attempt Abuse | AC14 - Mass Login Attempt Abuse | An attacker performs many automated login attempts against one or many accounts, causing account lockouts, credential guessing attempts, authentication slowdown, or login-service degradation. | The login flow does not enforce enough rate limiting, progressive delays, temporary blocking, IP/device reputation checks, or suspicious-login monitoring for repeated authentication attempts. | 3 | 4 | 12 | Critical |
| R12 | T13 - Missing Audit Log for Account Changes | AC13 - Missing Audit Log for Account Changes | Account, role, password, status, or profile changes cannot be investigated or attributed because the system does not keep enough audit evidence. | Some account-management modules or sensitive actions do not generate audit logs with actor, timestamp, target account, action type, previous value, new value, and source context. | 2 | 3 | 6 | Medium |
| R13 | T21 - Session Fixation And Hijacking | AC19 - Session Fixation And Hijacking | An attacker hijacks a legitimate guest or staff session or pre-sets a known session ID before login to perform unauthorized actions on behalf of the victim. | The authentication session manager fails to rotate session IDs upon successful login or issues tokens lacking entropy, HttpOnly/Secure/SameSite flags, or strict idle timeouts. | 3 | 4 | 12 | Critical |
| R14 | T22 - Secondary Administrator Account Creation | AC20 - Secondary Administrator Account Creation | An attacker or rogue staff member creates a second Administrator account or escalates an existing account to Administrator, breaking system governance and single root authority (RF08). | The Administrator account creation or role assignment endpoint lacks atomic, transactional single-Administrator uniqueness constraints across concurrent requests. | 2 | 4 | 8 | High |
| R15 | T23 - Internal Staff Hierarchy Bypass | AC21 - Internal Staff Hierarchy Bypass | A Manager or Receptionist account modifies, inactivates, or manages accounts belonging to equal or higher privilege levels (e.g. Manager deactivating Administrator). | Staff management endpoints check if the actor has staff privileges, but fail to validate the target account's role tier against the actor's role tier (missing hierarchy validation). | 2 | 4 | 8 | High |
| R16 | T04 - Unauthorized Password Change | AC22 - Unauthorized Password Change | An attacker changes a legitimate user's password after obtaining account access, locking out the victim and preserving control of the account. | Password change flows do not require enough current-session verification, step-up authentication, owner notification, session revocation, or audit evidence. | 3 | 4 | 12 | Critical |
| R17 | T05 - Legitimate Employee Inactivation | AC23 - Legitimate Employee Inactivation | An attacker with Administrator access inactivates legitimate employee accounts and disrupts hotel operations. | Employee inactivation can be performed without second approval, reason review, staff hierarchy safeguards, abnormal-action alerts, or recovery workflow. | 2 | 4 | 8 | High |

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

### R08 - Inactive Account Still Has Access Risk

Probability justification: The probability is medium-low because the risk depends on an offboarding or session-revocation failure. Hotel staff turnover can happen, and if an employee account is inactivated without revoking active sessions or tokens, the former employee may still access the online system from outside the hotel.

Impact justification: The impact is high but depends on the former employee's role. A receptionist account may have more limited access, while a manager account may affect room information, staff data, chat support, and operational settings. A malicious former employee could use remaining access to harm hotel operations.

Affected users, data, features, or components: Staff accounts, inactive account records, sessions, tokens, permissions, receptionist and manager functions, room management, employee information, chat support, booking operations, and audit records.

Expected consequences: Unauthorized access by a former employee, exposure or sale of hotel or guest information, rude or abusive chat responses, unauthorized room or staff data changes, and operational disruption until the access is discovered and revoked.

Risk level justification: The calculated score is medium because the attacker is usually identifiable as a former employee and the event depends on a revocation failure. However, the impact can still be serious if the account has manager-level permissions or remains active for a long time before detection.

### R09 - Role Change Without Approval Risk

Probability justification: The probability is medium-high because role management is essential and any role change modifies what the user can do in the system. A staff member increasing their own role is dangerous but easier to identify; a guest becoming Manager or Administrator is harder to detect quickly and can be more damaging.

Impact justification: The impact is very high, but it depends on the assigned role. A user promoted to Administrator or Manager can cause far more damage than a user promoted to Receptionist because higher roles can modify rooms, staff accounts, prices, operational data, and internal settings.

Affected users, data, features, or components: Role management module, account permissions, staff accounts, room management, employee management, chat support, booking administration, payment-related administration, audit records, and hotel configuration.

Expected consequences: Incorrect room information, unauthorized employee changes, false or abusive chat responses, unauthorized room price reductions, access to restricted functions, and disruption of hotel operation depending on the role assigned.

Risk level justification: The calculated score is critical because role changes define the permission boundary of the whole system. Without approval and traceability, a user may gain powerful access and perform actions that affect many hotel workflows.

### R10 - Session Not Invalidated After Password Change Risk

Probability justification: The probability is high because account compromise can happen through weak passwords, reused credentials, phishing, credential leaks, or malware on the user's device. If the legitimate user changes the password to recover the account but old sessions remain active, the attacker may continue using the account even after recovery.

Impact justification: The impact is very high because the damage depends on the compromised role. If the affected account is a guest, personal data, booking history, chat access, and payment-related information may be exposed. If the affected account is a receptionist, manager, or administrator, the attacker may also affect hotel operations and internal records.

Affected users, data, features, or components: Guest accounts, staff accounts, authentication sessions, refresh tokens, remembered devices, login module, password change flow, password reset flow, profile data, booking data, chat, payment-related data, and role-dependent hotel administration modules.

Expected consequences: Continued unauthorized access after password change, personal data exposure, unauthorized bookings or profile changes, abusive chat activity, operational changes made through compromised staff accounts, loss of access for legitimate users, poor hotel reviews, reputational damage, and financial or operational losses.

Risk level justification: The calculated score is critical because password change is the expected recovery action after account compromise. If old sessions are not invalidated, the recovery action does not fully remove attacker access and may allow the compromise to continue unnoticed.

### R11 - Mass Login Attempt Abuse Risk

Probability justification: The probability is medium-high because email verification can reduce some fake-account activity, but automated login attempts are still easy to perform against existing accounts. Attackers can use scripts, leaked credential lists, repeated password guesses, or multiple IP addresses to abuse the login flow.

Impact justification: The impact is very high because mass login attempts can overload authentication, slow down the system, trigger account lockouts, support credential-guessing attacks, and affect the hotel operation if legitimate guests or staff cannot access the platform.

Affected users, data, features, or components: Guest accounts, staff accounts, login module, registration module, authentication logs, support workflow, booking flow, chat, review system, and any feature that depends on successful user authentication.

Expected consequences: Login slowdown or outage, account lockouts, reduced trust from guests and hotel staff, unnecessary support demand, financial losses caused by interrupted bookings, possible credential compromise, fake bookings, fake reviews, and degraded system availability.

Risk level justification: The calculated score is critical because authentication is required for most account-based workflows. A hotel system must have controls against automated and repeated login attempts to preserve availability, protect accounts, and avoid operational disruption.

### R12 - Missing Audit Log for Account Changes Risk

Probability justification: The probability is medium-low because a module or account-change flow may be forgotten during development and remain without proper audit logging. This does not mean abuse will always happen, but it makes it harder to prove who changed an account if a guest, employee, manager, or administrator performs an improper action.

Impact justification: The impact is high because account changes can affect access, roles, passwords, active status, and sensitive profile data. Without logs, the hotel may be unable to prove responsibility, support disciplinary action, reconstruct the incident, or respond properly to legal, operational, or security questions.

Affected users, data, features, or components: Guest accounts, staff accounts, role management, password change flow, account status management, profile data, administrative account updates, audit records, incident response workflow, and any module where account data can be changed.

Expected consequences: Loss of trust between staff and management, inability to attribute account changes to a specific actor, weak incident investigation, delayed response, difficulty reversing unauthorized changes, and reduced evidence for internal review or legal accountability.

Risk level justification: The calculated score is medium because missing audit logs do not directly cause account compromise by themselves, and responsibility may sometimes be inferred through other evidence. However, the risk remains important because audit logs are necessary to detect, investigate, prove, and recover from account-change incidents.

### R13 - Session Fixation and Hijacking Risk

Probability justification: The probability is medium-high because session fixation and token interception are plausible attack vectors in web applications when session IDs are not rotated upon authentication or when session cookies lack secure attributes (HttpOnly, Secure, SameSite) and idle timeout protections.

Impact justification: The impact is very high because hijacking an active session allows an attacker to completely impersonate the victim user without knowing their password, exposing personal guest data, booking history, chat records, or staff administration interfaces.

Affected users, data, features, or components: Authenticated guests, staff accounts, authentication session manager, session tokens/cookies, protected REST endpoints, and personal profile data.

Expected consequences: Session hijacking, unauthorized guest or staff actions performed under the victim's identity, exposure of sensitive personal and operational data, and bypass of password authentication.

Risk level justification: The calculated score is critical (12 = 3x4) because session hijacking bypasses primary password authentication and grants full operational access to the victim's account session.

### R14 - Secondary Administrator Account Creation Risk

Probability justification: The probability is medium-low because creating a secondary Administrator account requires access to staff provisioning APIs or role update parameters combined with a race condition or missing database uniqueness constraint.

Impact justification: The impact is very high because creating a secondary Administrator violates the core single-root authority governance requirement (RF08), creating unauthorized root-level access that can bypass administrative oversight and alter global configuration.

Affected users, data, features, or components: Administrator account provisioning service, role assignment handler, system governance rules, root authority integrity, and system configuration.

Expected consequences: Compromise of system governance, loss of single root authority, unauthorized administrative configuration, and inability to maintain administrative accountability.

Risk level justification: The calculated score is high (8 = 2x4) because although the attack vector requires specific provisioning access or race conditions, the consequence to governance and root authority is severe.

### R15 - Internal Staff Hierarchy Bypass Risk

Probability justification: The probability is medium-low because it requires an authenticated staff member attempting to execute management actions against target accounts of equal or higher privilege tier.

Impact justification: The impact is very high because a rogue staff member could lock out legitimate managers or administrators, disable oversight, modify administrative settings, or disrupt hotel operations.

Affected users, data, features, or components: Staff account management API, role hierarchy validation engine, Administrator accounts, Manager accounts, Receptionist accounts, and hotel operation governance.

Expected consequences: Operational denial of service, lockout of legitimate administrative and managerial personnel, breach of staff access control hierarchy, and loss of operational control.

Risk level justification: The calculated score is high (8 = 2x4) because hierarchy bypass undermines managerial authority and can cause critical operational lockouts.

### R16 - Unauthorized Password Change Risk

Probability justification: The probability is medium-high because the event can happen after common account compromise scenarios such as phishing, reused credentials, malware, or a stolen session. If the password change flow does not require strong re-authentication or notify the account owner, the attacker can use ordinary account features to lock out the victim.

Impact justification: The impact is very high because password control is central to account recovery. A successful unauthorized password change can block the legitimate user, preserve attacker access, expose personal data, and enable unauthorized bookings, chat actions, or staff actions depending on the account role.

Affected users, data, features, or components: Guest and staff accounts, password change flow, active sessions, password recovery flow, audit logs, profile data, booking data, and role-protected functions.

Expected consequences: Victim lockout, continued account compromise, personal data exposure, unauthorized account activity, recovery disputes, support workload, and loss of confidence in the account recovery process.

Risk level justification: The calculated score is critical because password change is a core security boundary. If an attacker can change the password without enough verification and traceability, the legitimate user may lose control exactly when the account needs protection most.

### R17 - Legitimate Employee Inactivation Risk

Probability justification: The probability is medium-low because the event depends on Administrator compromise or abuse of privileged account-management access. It is less likely than direct guest-account attacks, but still plausible if the Administrator account is taken over or if privileged actions are not strongly governed.

Impact justification: The impact is very high because inactivating legitimate employees can block Receptionists, Managers, or other staff from performing hotel operations, handling guests, managing rooms, or responding to incidents.

Affected users, data, features, or components: Employee accounts, Administrator account, staff management module, Receptionist and Manager workflows, room operations, support/chat operations, and audit logs.

Expected consequences: Staff lockout, interrupted hotel operations, delayed guest support, inability to manage rooms or reservations, emergency recovery work, and governance breakdown.

Risk level justification: The calculated score is high because privileged access is required, but the impact can disrupt internal hotel operations quickly if legitimate staff accounts are disabled.

## Prioritization

| Priority | Risk | Reason |
| --- | --- | --- |
| 1 | R02 | This risk should be treated first because it directly affects legitimate guests and may expose CPF, personal data, payment-related data, booking history, and chat access. If the compromise is caused or worsened by weak system controls, it may also create legal, operational, and reputational consequences for HospedaTche. |
| 2 | R01 | This risk should also be treated early because the booking system is the core of the platform. Fake guest accounts can directly affect room availability, create unnecessary support demand, and reduce trust in booking, chat, and review workflows. |
| 3 | R10 | This risk should be treated early because password change is the expected recovery action after account compromise. If old sessions remain valid, the attacker may keep access even after the legitimate user tries to recover the account. |
| 4 | R13 | Session fixation and hijacking should be treated early alongside primary authentication protections because hijacking an active session bypasses password checks and allows full victim impersonation. |
| 5 | R11 | This risk should be treated early because mass login attempts can degrade authentication, block legitimate access, support credential-guessing attacks, and potentially make the system unavailable for guests and staff. |
| 6 | R03 | This risk should be treated early because mass account creation can degrade system availability, pollute account records, and make account management less reliable for legitimate users. |
| 7 | R04 | This risk can be treated after the broader account takeover and session risks, but it remains important because a leaked reset token can directly lead to account takeover and exposure of sensitive guest data. |
| 8 | R05 | This risk should be treated as critical because unauthorized role elevation can compromise the whole hotel operation, including rooms, staff accounts, prices, internal information, and administrative actions. |
| 9 | R06 | This risk should be treated as critical because unauthorized profile access exposes sensitive guest data and can permanently damage trust in the platform. It is listed after role elevation because it is narrower in scope, but it still requires early treatment. |
| 10 | R07 | This risk should be treated as critical because protected route enforcement is a basic requirement for a secure system. If a protected route is exposed, users may access staff or administrator functions without formally changing their role. |
| 11 | R14 | Secondary administrator creation requires early enforcement of single root authority (RF08) through atomic database constraints to prevent unauthorized root provisioning. |
| 12 | R15 | Staff hierarchy bypass must be controlled to prevent lower or peer staff accounts from locking out legitimate managers or administrators. |
| 13 | R16 | Unauthorized password change is prioritized near other account recovery risks because it can lock out the legitimate user and keep attacker access alive. |
| 14 | R17 | Legitimate employee inactivation is prioritized with staff governance risks because it can interrupt hotel operation after Administrator compromise. |
| 15 | R08 | This risk is important, but it is ranked below the broader privilege and route risks because the former employee is usually identifiable and the abuse depends on malicious intent or failure to report remaining access. It still requires treatment because staff accounts can expose hotel data and affect operations. |
| 16 | R09 | This risk should be treated early because role changes can turn a Guest or lower-privileged staff member into a Manager or Administrator without approval, giving access to restricted actions across the hotel operation. |
| 17 | R12 | This risk can be treated after the direct authentication and authorization risks because missing audit logs do not cause abuse by themselves. However, it remains important because every sensitive account change should be traceable for investigation, accountability, and recovery. |

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
| R08 | X | X | X | X | X | X | Inactive account access requires governance for staff offboarding rules, identification of inactive accounts and remaining sessions, protection through automatic session and token revocation, detection of activity from inactive accounts, response through account blocking and investigation, and recovery of any data or configuration changed after inactivation. |
| R09 | X | X | X | X | X | X | Role change without approval requires governance for role approval rules, identification of privileged roles and role-change workflows, protection through approval gates and deny-by-default role assignment, detection of unexpected role changes, response through role rollback and account suspension, and recovery of any data or configuration changed by unauthorized roles. |
| R10 | X | X | X | X | X | X | Session invalidation after password change requires governance for account recovery rules, identification of active sessions and tokens, protection through automatic revocation after password change, detection of suspicious activity after recovery, response through forced logout and account blocking, and recovery of any data or account state changed during the remaining unauthorized session. |
| R11 | X | X | - | - | - | X | Mass login attempt abuse requires governance for authentication abuse rules, identification of affected login assets and abnormal authentication patterns, protection through rate limiting and temporary blocking, detection of repeated failed attempts, response through IP or account throttling, and recovery of normal authentication availability after the abuse is contained. |
| R12 | X | X | X | X | X | X | Missing audit logs require governance for mandatory logging rules, identification of sensitive account-change actions, protection through tamper-resistant audit records, detection of account changes without expected logs, response through investigation and corrective action, and recovery by reconstructing or reverting unauthorized changes when possible. |
| R13 | X | X | X | X | X | X | Session fixation and hijacking requires governance for session security policies, identification of active tokens and session state, protection through post-login session ID rotation and secure cookie flags, detection of concurrent or hijacked sessions, response through forced session termination, and recovery of account state. |
| R14 | X | X | X | X | X | X | Secondary administrator account creation requires governance for single-admin rules (RF08), identification of root accounts, protection through atomic DB constraints and MFA, detection of admin creation attempts, response through account suspension, and recovery of single root governance. |
| R15 | X | X | X | X | X | X | Staff hierarchy bypass requires governance for role hierarchy policies, identification of staff tiers, protection through server-side tier validation, detection of unauthorized hierarchy requests, response through account block, and recovery of target account status. |
| R16 | X | X | X | X | X | X | Unauthorized password change requires governance for sensitive account-change rules, identification of password-change flows and active sessions, protection through re-authentication and session revocation, detection of suspicious password changes, response through account recovery and blocking, and recovery of legitimate user access. |
| R17 | X | X | X | X | X | X | Legitimate employee inactivation requires governance for staff account lifecycle rules, identification of privileged inactivation actions, protection through approval and hierarchy checks, detection of abnormal inactivation patterns, response through account restoration, and recovery of staff access. |

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
| R08 | Reduce | Automatic session and token revocation when an account is inactivated; permission re-check on every request; offboarding checklist for staff accounts; audit log for inactive account access attempts; alert when an inactive account attempts any action. | Govern, Protect, Detect, Respond, Recover | Development team, system administrator, and hotel manager | Account inactivation tests; session revocation tests; permission re-check tests; offboarding checklist records; inactive-account access alert logs; audit records for blocked attempts. |
| R09 | Reduce | Mandatory approval workflow for role changes; server-side authorization checks before role updates; separation between role request and approval; audit log for every role change; alert for unexpected privileged role assignment; rollback procedure for unauthorized role changes. | Govern, Protect, Detect, Respond, Recover | Development team, system administrator, and hotel manager | Role-change approval records; authorization tests for role updates; role update audit logs; alert simulation for unexpected role changes; rollback test records. |
| R10 | Reduce | Revoke all active sessions after password change or reset; invalidate refresh tokens and remembered devices; force re-authentication on all devices; notify the account owner after password change; log post-recovery access attempts; alert on suspicious activity after password change. | Govern, Protect, Detect, Respond, Recover | Development team and system administrator | Session revocation tests; refresh-token invalidation tests; remembered-device invalidation tests; forced re-authentication tests; password change notification tests; audit logs for access attempts after recovery. |
| R11 | Reduce | Rate limiting by account, IP, and device; progressive login delays; temporary account or IP blocking after repeated failures; suspicious-login monitoring; CAPTCHA or additional verification after abnormal attempts; alerting for authentication spikes; audit logs for failed login patterns. | Govern, Protect, Detect, Respond, Recover | Development team and system administrator | Login rate-limit tests; brute-force simulation results; temporary block tests; authentication spike alert logs; failed-login audit records; CAPTCHA or additional-verification test records. |
| R12 | Reduce | Mandatory audit logging for account, role, password, status, and profile changes; logs with actor, target, timestamp, action type, previous value, new value, and source context; tamper-resistant log storage; review process for sensitive account changes; alert for high-risk account changes without expected approval. | Govern, Identify, Protect, Detect, Respond, Recover | Development team, system administrator, and hotel manager | Audit-log coverage tests; account-change log review; role-change log records; tamper-resistance review; alert simulation for sensitive account changes; incident reconstruction exercise. |
| R13 | Reduce | Session ID regeneration upon login; HttpOnly, Secure, SameSite=Strict cookie attributes; strict idle and absolute session timeouts; user agent and IP subnet binding; token revocation on logout. | Govern, Protect, Detect, Respond, Recover | Development team and system administrator | Session rotation test suite; cookie attribute audit tool; session fixation penetration test results; idle timeout test logs. |
| R14 | Reduce | Database-level unique constraint and atomic transactional check for single Administrator account; server-side deny-by-default role creation policy; mandatory multi-factor authentication and out-of-band approval for admin creation; immediate alert on admin creation attempt. | Govern, Identify, Protect, Detect, Respond, Recover | Development team, system administrator, and hotel manager | Concurrent admin creation integration tests; database schema constraint validation; role assignment audit logs; admin creation alert simulation records. |
| R15 | Reduce | Hierarchical role authorization engine (Admin > Manager > Receptionist > Guest) enforcing actor-tier > target-tier check; server-side validation on all account management APIs; audit logging and alert on hierarchy violation attempts. | Govern, Protect, Detect, Respond, Recover | Development team and system administrator | Role hierarchy authorization unit tests; API access control integration tests; denied hierarchy action audit logs; alert trigger verification records. |
| R16 | Reduce | Require current-password or step-up authentication for password changes; revoke all active sessions after password change; notify account owner; log actor, timestamp, IP, and device; alert on suspicious password-change patterns. | Govern, Identify, Protect, Detect, Respond, Recover | Development team and system administrator | Password-change re-authentication tests; session revocation tests; notification tests; password-change audit log review; suspicious-change alert simulation. |
| R17 | Reduce | Require second approval or reason review for employee inactivation; enforce staff hierarchy checks; alert on bulk or high-privilege staff inactivation; provide emergency restoration workflow. | Govern, Identify, Protect, Detect, Respond, Recover | System administrator, hotel manager, and development team | Employee inactivation approval records; hierarchy authorization tests; abnormal inactivation alert logs; employee account restoration test records. |

## Initial Implementation Order

| Order | Control or Action | Related Risks | Reason |
| --- | --- | --- | --- |
| 1 | Add login rate limiting, suspicious-login detection, and temporary account blocking. | R02, R11 | Account takeover and mass login attempts are high-priority authentication risks because they can compromise legitimate guests, expose sensitive data, and degrade access to the system. |
| 2 | Add short-lived single-use password reset tokens, hashed token storage, token invalidation, and session revocation after password reset. | R04, R02 | Password reset token leakage can become account takeover, so recovery controls should be implemented soon after login protections. |
| 3 | Revoke all active sessions, refresh tokens, and remembered devices after password change or reset, require re-authentication for password changes, and enforce post-login session rotation and secure cookie attributes. | R10, R13, R16, R02, R04 | Session invalidation, re-authentication, and session rotation must happen early because password change and authentication must completely clear and isolate user session state. |
| 4 | Add email ownership verification before account activation and registration rate limiting. | R01, R03 | These controls reduce fake guest registration and mass account creation before accounts can affect booking, chat, reviews, or system availability. |
| 5 | Add account creation audit logs and abnormal registration alerts. | R01, R03 | Detection and audit evidence are needed to identify fake-account patterns and support administrative response. |
| 6 | Add administrative review and cleanup process for suspicious or confirmed fake accounts. | R01, R03 | Cleanup and response reduce remaining operational impact after suspicious accounts are detected. |
| 7 | Add server-side role-change authorization, single Administrator database constraints, and privileged role approval. | R05, R09, R14 | Role elevation, role changes without approval, and secondary administrator creation can compromise the whole system governance (RF08), so role modifications must be atomic and approved explicitly. |
| 8 | Add server-side ownership checks and deny-by-default authorization for profile endpoints. | R06 | Profile data exposure is critical, and ownership checks are the main control needed to prevent one guest from accessing another guest's profile. |
| 9 | Add server-side authorization checks and automated authorization tests for all protected routes. | R07 | Protected route enforcement is broad and affects every restricted module, so route checks must be verified systematically across roles. |
| 10 | Add automatic session/token revocation, staff role hierarchy checks, employee-inactivation approvals, and inactive-account access alerts. | R08, R15, R17 | Offboarding, hierarchy, and employee lifecycle controls prevent former employees, peer staff, or compromised Administrator access from disrupting staff accounts. |
| 11 | Add authentication spike alerts and failed-login audit review for repeated login attempts. | R11 | Monitoring and audit review support response after the first preventive controls are in place, helping the team identify abuse patterns and tune blocking rules. |
| 12 | Add mandatory audit logs for account, role, password, status, and profile changes. | R12 | Audit logging should be added after the main preventive authentication and authorization controls because it supports accountability, investigation, and recovery for all account-change risks. |

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
| R08 | Medium | Low | Residual risk is accepted only if inactive accounts immediately lose sessions, tokens, and permissions, inactive-account access attempts are logged and alerted, and staff offboarding records are maintained. |
| R09 | Critical | Medium | Residual risk is accepted only if privileged role changes require approval, role updates are audited, unexpected assignments generate alerts, unauthorized role changes can be rolled back, and authorization tests prove users cannot change roles without approval. |
| R10 | Critical | Medium | Residual risk is accepted only if password change and reset revoke all active sessions, refresh tokens, and remembered devices, force re-authentication, notify the account owner, and generate audit evidence for post-recovery access attempts. |
| R11 | Critical | Medium | Residual risk is accepted only if login rate limiting, progressive delays, temporary blocking, suspicious-login monitoring, authentication spike alerts, and failed-login audit records are implemented and verified. |
| R12 | Medium | Low | Residual risk is accepted only if sensitive account changes generate complete audit records, logs are protected against tampering, audit coverage is tested, and staff can review logs during incident investigation. |
| R13 | Critical | Medium | Residual risk is accepted only if post-login session rotation, secure cookie flags (HttpOnly/Secure/SameSite), idle timeouts, and token revocation on logout are fully implemented and verified. |
| R14 | High | Low | Residual risk is accepted only if database-level single-admin constraint and server-side atomic checks prevent creating multiple Administrator accounts. |
| R15 | High | Low | Residual risk is accepted only if server-side role hierarchy checks strictly enforce that staff cannot manage equal or higher privilege tiers. |
| R16 | Critical | Medium | Residual risk is accepted only if password changes require step-up verification, revoke sessions, notify the account owner, and generate complete audit evidence. |
| R17 | High | Low | Residual risk is accepted only if employee inactivation requires approval or reason review, enforces hierarchy rules, alerts abnormal actions, and supports verified account restoration. |

## Final Notes

The current account risks focus on fake registration, account takeover, mass account creation, password reset token leakage, unauthorized role elevation, unauthorized guest profile access, broken route authorization, inactive account access, role changes without approval, session invalidation after password change, mass login attempt abuse, missing audit logs, session fixation/hijacking, secondary administrator creation, internal staff hierarchy bypass, unauthorized password change, and legitimate employee inactivation. The most urgent controls are authentication protections, password recovery safeguards, session revocation and session rotation after password changes/logins, and mass-login protections because they prevent direct compromise of legitimate guest accounts, remove attacker access during recovery, and keep login available for guests and staff. Registration controls and account creation monitoring should follow because they reduce fake-account abuse, system pollution, and availability problems. Role-change authorization, single Administrator enforcement (RF08), staff hierarchy validation, approval workflows, employee lifecycle controls, and protected route checks are essential because unauthorized privileged access or exposed internal routes can compromise the entire hotel operation. Profile ownership checks are also important because they prevent privacy violations between legitimate guest accounts.

Residual risk is only an estimate. The group cannot claim that risk was reduced until the controls are implemented, tested, and supported by evidence such as validation tests, audit logs, alert records, and administrative review records.

## Coverage Notes

The account risks above prioritize all relevant abuse cases and STRIDE threats from the account scope:

- Member 1 (User Registration & Identity): R01 (T01/AC01), R02 (T02/AC02), R03 (T09/AC09), R04 (T11/AC11), R06 (T15/AC15), R12 (T13/AC13).
- Member 2 (Authentication & Access Control): R05 (T19/AC03), R07 (T20/AC04), R08 (T16/AC16), R09 (T17/AC17), R10 (T12/AC12), R11 (T14/AC14), R13 (T21/AC19), R14 (T22/AC20), R15 (T23/AC21), R16 (T04/AC22), R17 (T05/AC23).

Other secondary abuse cases from Stage 1 are addressed as follows:
- T03 - Unverified Guest Identity Abuse: covered by R01 and R03 because the current account risk model treats weak identity verification as fake-registration and mass-account-creation risk.
- T06 / AC05 - Legitimate Receptionist Inactivation: covered by R08, R09, and R15 (inactive access, role approval, and staff hierarchy checks).
- T07 / AC06 - Receptionist Privilege Escalation: covered by R05, R09, and R15 (unauthorized role elevation, role approval, and staff hierarchy validation).
- AC07 - Room Information Tampering by Receptionist: covered by accommodation module, supported by R05 and R07 authorization controls.
- T08 / AC08 - Room Configuration Tampering by Manager: covered by accommodation module, supported by R05, R07, and R12 controls.
- T10 / AC10 - Receptionist Password Disclosure: covered by R02, R10, R11, and R13 (account takeover, session invalidation, rate limiting, and session rotation).
- T18 / AC18 - Guest CPF Enumeration: covered under R01, R03, and R06 (registration verification, rate limiting, and profile access controls).

