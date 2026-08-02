# STRIDE Threat Map

This file maps threats to modules, assets, STRIDE categories, and abuse cases.

| ID | Module | File | Title | Component or Asset | STRIDE Category | Related Abuse Cases | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T01 | accounts | [`accounts/T01-fake-guest-registration.md`](./accounts/T01-fake-guest-registration.md) | Fake Guest Registration | Guest account registration | Spoofing | AC01 | draft |
| T02 | accounts | [`accounts/T02-account-takeover.md`](./accounts/T02-account-takeover.md) | Account Takeover | User account login | Spoofing | AC02 | draft |
| T03 | accounts | [`accounts/T03-unverified-guest-identity-abuse.md`](./accounts/T03-unverified-guest-identity-abuse.md) | Unverified Guest Identity Abuse | Guest identity verification | Spoofing | AC01 | draft |
| T04 | accounts | [`accounts/T04-unauthorized-password-change.md`](./accounts/T04-unauthorized-password-change.md) | Unauthorized Password Change | Password recovery module | Tampering | AC03 | draft |
| T05 | accounts | [`accounts/T05-legitimate-employee-inactivation.md`](./accounts/T05-legitimate-employee-inactivation.md) | Legitimate Employee Inactivation | Employee management module | Tampering | AC04 | draft |
| T06 | accounts | [`accounts/T06-legitimate-receptionist-inactivation.md`](./accounts/T06-legitimate-receptionist-inactivation.md) | Legitimate Receptionist Inactivation | Receptionist management module | Denial of Service | AC05 | draft |
| T07 | accounts | [`accounts/T07-receptionist-privilege-escalation.md`](./accounts/T07-receptionist-privilege-escalation.md) | Receptionist Privilege Escalation | Permission management module | Elevation of Privilege | AC06, AC07 | draft |
| T08 | accounts | [`accounts/T08-room-configuration-tampering-by-manager.md`](./accounts/T08-room-configuration-tampering-by-manager.md) | Room Configuration Tampering By Manager | Room management module | Tampering | AC08 | draft |
| T09 | accounts | [`accounts/T09-mass-account-creation.md`](./accounts/T09-mass-account-creation.md) | Mass Account Creation | Account creation module | Denial of Service | AC09 | draft |
| T10 | accounts | [`accounts/T10-receptionist-password-disclosure.md`](./accounts/T10-receptionist-password-disclosure.md) | Receptionist Password Disclosure | Employee management module | Information Disclosure | AC10 | draft |
| T11 | accounts | [`accounts/T11-password-reset-token-leakage.md`](./accounts/T11-password-reset-token-leakage.md) | Password Reset Token Leakage | Password recovery module | Information Disclosure | AC11 | draft |
| T12 | accounts | [`accounts/T12-session-not-invalidated-after-password-change.md`](./accounts/T12-session-not-invalidated-after-password-change.md) | Session Not Invalidated After Password Change | Session management module | Tampering | AC12 | draft |
| T13 | accounts | [`accounts/T13-missing-audit-log-for-account-changes.md`](./accounts/T13-missing-audit-log-for-account-changes.md) | Missing Audit Log For Account Changes | Account management audit log | Repudiation | AC13 | draft |
| T14 | accounts | [`accounts/T14-mass-login-attempt-abuse.md`](./accounts/T14-mass-login-attempt-abuse.md) | Mass Login Attempt Abuse | Login module | Denial of Service | AC14 | draft |
| T15 | accounts | [`accounts/T15-unauthorized-guest-profile-access.md`](./accounts/T15-unauthorized-guest-profile-access.md) | Unauthorized Guest Profile Access | Guest profile module | Information Disclosure | AC15 | draft |
| T16 | accounts | [`accounts/T16-inactive-account-still-has-access.md`](./accounts/T16-inactive-account-still-has-access.md) | Inactive Account Still Has Access | Account status and access control | Elevation of Privilege | AC16 | draft |
| T17 | accounts | [`accounts/T17-role-change-without-approval.md`](./accounts/T17-role-change-without-approval.md) | Role Change Without Approval | Role management module | Elevation of Privilege | AC17 | draft |
| T18 | accounts | [`accounts/T18-guest-cpf-enumeration.md`](./accounts/T18-guest-cpf-enumeration.md) | Guest CPF Enumeration | Guest registration and account lookup | Information Disclosure | AC18 | draft |
| T19 | search-messaging | [`search-messaging/T19-automated-room-search-overload.md`](./search-messaging/T19-automated-room-search-overload.md) | Automated Room Search Overload | Room Search API & Database | Denial of Service | AC19 | draft |
| T20 | search-messaging | [`search-messaging/T20-chat-message-flooding.md`](./search-messaging/T20-chat-message-flooding.md) | Chat Message Flooding | Guest Reception Chat Service | Denial of Service | AC20 | draft |
| T21 | search-messaging | [`search-messaging/T21-guest-chat-history-exposure.md`](./search-messaging/T21-guest-chat-history-exposure.md) | Guest Chat History Exposure | Chat Database & Messaging Channel | Information Disclosure | AC21 | draft |
| T22 | search-messaging | [`search-messaging/T22-internal-maintenance-notes-exposure.md`](./search-messaging/T22-internal-maintenance-notes-exposure.md) | Internal Maintenance Notes Exposure | Public Room Details API | Information Disclosure | AC22 | draft |
| T23 | search-messaging | [`search-messaging/T23-hidden-review-data-exposure.md`](./search-messaging/T23-hidden-review-data-exposure.md) | Hidden Review Data Exposure | Reviews API | Information Disclosure | AC23 | draft |
| T24 | search-messaging | [`search-messaging/T24-review-spamming-and-manipulation.md`](./search-messaging/T24-review-spamming-and-manipulation.md) | Review Spamming And Manipulation | Review Submission System | Tampering | AC24 | draft |
| T25 | search-messaging | [`search-messaging/T25-notification-preferences-tampering.md`](./search-messaging/T25-notification-preferences-tampering.md) | Notification Preferences Tampering | Notification Preference Settings | Tampering | AC25 | draft |
| T26 | search-messaging | [`search-messaging/T26-fake-stay-notification-injection.md`](./search-messaging/T26-fake-stay-notification-injection.md) | Fake Stay Notification Injection | Guest Notification System | Spoofing | AC26 | draft |
| T27 | accounts | [`accounts/T27-unauthorized-role-elevation.md`](./accounts/T27-unauthorized-role-elevation.md) | Unauthorized Role Elevation | Role assignment and account management API | Elevation of Privilege | AC03 | draft |
| T28 | accounts | [`accounts/T28-broken-route-authorization.md`](./accounts/T28-broken-route-authorization.md) | Broken Route Authorization | Internal application routes and REST endpoints | Elevation of Privilege | AC04 | draft |
| T29 | accounts | [`accounts/T29-session-fixation-and-hijacking.md`](./accounts/T29-session-fixation-and-hijacking.md) | Session Fixation And Hijacking | Authentication session manager | Spoofing | AC27 | draft |
| T30 | accounts | [`accounts/T30-secondary-administrator-account-creation.md`](./accounts/T30-secondary-administrator-account-creation.md) | Secondary Administrator Account Creation | Administrator account management service | Elevation of Privilege | AC28 | draft |
| T31 | accounts | [`accounts/T31-internal-staff-hierarchy-bypass.md`](./accounts/T31-internal-staff-hierarchy-bypass.md) | Internal Staff Hierarchy Bypass | Staff account management and inactivation API | Elevation of Privilege | AC29 | draft |

## Status Values

- `planned`: identified but not written.
- `draft`: written but pending review.
- `reviewed`: reviewed by group.
- `final`: ready for delivery.
