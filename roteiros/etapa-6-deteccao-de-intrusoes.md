# Stage 6 - HospedaTche Monitoring and Intrusion Detection

Status: Draft

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

Pending: Sidnei.

| Event Category | Event or Action | Required Fields | Sensitive Data Exclusions |
| --- | --- | --- | --- |
| Authentication | Pending: Sidnei. | Pending: Sidnei. | Passwords and tokens |
| Authorization | Pending: Sidnei. | Pending: Sidnei. | Session tokens |
| Business Operation | Pending: Sidnei. | Pending: Sidnei. | Unnecessary personal data |
| Payment | Pending: Sidnei. | Pending: Sidnei. | Complete payment data |
| Error and Audit | Pending: Sidnei. | Pending: Sidnei. | Secrets and sensitive implementation details |

## Detection Rules

### DR01 - Pending Detection Rule

| Field | Content |
| --- | --- |
| Observed Risk | Pending: Lara. |
| Data Source | Pending: Lara. |
| Alert Condition | Pending: Lara. |
| Initial Response | Pending: Lara. |
| Responsible Role | Pending: Lara. |


### DR02 - Unauthorized Role Elevation Attempts

| Field | Content |
| --- | --- |
| Observed Risk | R05 - Unauthorized Role Elevation |
| Data Source | Authorization and security audit logs from user update and role assignment requests |
| Alert Condition | Alert when a low-privileged user generates repeated denied attempts to assign or modify a role to a level equal to or higher than their own within a short period |
| Initial Response | Alert the security/operations team, preserve the related audit events, and temporarily restrict further role-management attempts from the affected account while the activity is investigated |
| Responsible Role | Security/Operations Team |

### DR03 - Pending Detection Rule

| Field | Content |
| --- | --- |
| Observed Risk | Pending: Rafaela. |
| Data Source | Pending: Rafaela. |
| Alert Condition | Pending: Rafaela. |
| Initial Response | Pending: Rafaela. |
| Responsible Role | Pending: Rafaela. |

## Response and Escalation

Alert validation: Pending Rafaela.

Containment: Pending Rafaela.

Escalation: Pending Rafaela.

Evidence preservation: Pending Rafaela.

Recovery or follow-up: Pending Rafaela.

## Final Review

- [x] Intrusion detection is explained in the HospedaTche context.
- [x] Prevention and detection are distinguished with project examples.
- [ ] Events and sensitive-data exclusions are complete.
- [ ] Exactly three detection rules are complete.
- [ ] Every rule links to an existing risk or abuse case.
- [ ] Alert conditions are measurable.
- [ ] Initial responses and responsible roles are defined.
