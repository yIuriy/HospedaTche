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
| T19 | accounts | [`accounts/T19-unauthorized-role-elevation.md`](./accounts/T19-unauthorized-role-elevation.md) | Unauthorized Role Elevation | Role assignment and account management API | Elevation of Privilege | AC03 | draft |
| T20 | accounts | [`accounts/T20-broken-route-authorization.md`](./accounts/T20-broken-route-authorization.md) | Broken Route Authorization | Internal application routes and REST endpoints | Elevation of Privilege | AC04 | draft |
| T21 | accounts | [`accounts/T21-session-fixation-and-hijacking.md`](./accounts/T21-session-fixation-and-hijacking.md) | Session Fixation And Hijacking | Authentication session manager | Spoofing | AC19 | draft |
| T22 | accounts | [`accounts/T22-secondary-administrator-account-creation.md`](./accounts/T22-secondary-administrator-account-creation.md) | Secondary Administrator Account Creation | Administrator account management service | Elevation of Privilege | AC20 | draft |
| T23 | accounts | [`accounts/T23-internal-staff-hierarchy-bypass.md`](./accounts/T23-internal-staff-hierarchy-bypass.md) | Internal Staff Hierarchy Bypass | Staff account management and inactivation API | Elevation of Privilege | AC21 | draft |
| T01 | search-messaging | [`search-messaging/T01-automated-room-search-overload.md`](./search-messaging/T01-automated-room-search-overload.md) | Automated Room Search Overload | Room Search API & Database | Denial of Service | AC01 | draft |
| T02 | search-messaging | [`search-messaging/T02-chat-message-flooding.md`](./search-messaging/T02-chat-message-flooding.md) | Chat Message Flooding | Guest Reception Chat Service | Denial of Service | AC02 | draft |
| T03 | search-messaging | [`search-messaging/T03-guest-chat-history-exposure.md`](./search-messaging/T03-guest-chat-history-exposure.md) | Guest Chat History Exposure | Chat Database & Messaging Channel | Information Disclosure | AC03 | draft |
| T04 | search-messaging | [`search-messaging/T04-internal-maintenance-notes-exposure.md`](./search-messaging/T04-internal-maintenance-notes-exposure.md) | Internal Maintenance Notes Exposure | Public Room Details API | Information Disclosure | AC04 | draft |
| T05 | search-messaging | [`search-messaging/T05-hidden-review-data-exposure.md`](./search-messaging/T05-hidden-review-data-exposure.md) | Hidden Review Data Exposure | Reviews API | Information Disclosure | AC05 | draft |
| T06 | search-messaging | [`search-messaging/T06-review-spamming-and-manipulation.md`](./search-messaging/T06-review-spamming-and-manipulation.md) | Review Spamming And Manipulation | Review Submission System | Tampering | AC06 | draft |
| T07 | search-messaging | [`search-messaging/T07-notification-preferences-tampering.md`](./search-messaging/T07-notification-preferences-tampering.md) | Notification Preferences Tampering | Notification Preference Settings | Tampering | AC07 | draft |
| T08 | search-messaging | [`search-messaging/T08-fake-stay-notification-injection.md`](./search-messaging/T08-fake-stay-notification-injection.md) | Fake Stay Notification Injection | Guest Notification System | Spoofing | AC08 | draft |
| T09 | search-messaging | [`search-messaging/T09-bulk-review-rating-tampering.md`](./search-messaging/T09-bulk-review-rating-tampering.md) | Bulk Review Rating Tampering | Review Database & Hotel Reputation Rating System | Tampering | AC09 | draft |
| T10 | search-messaging | [`search-messaging/T10-permanent-guest-review-purge.md`](./search-messaging/T10-permanent-guest-review-purge.md) | Permanent Guest Review Purge | Guest Review Records & Moderation System | Repudiation | AC10 | draft |
| T11 | search-messaging | [`search-messaging/T11-hidden-room-enumeration-and-brute-force.md`](./search-messaging/T11-hidden-room-enumeration-and-brute-force.md) | Hidden Room Enumeration And Brute Force | Room Search & Public Details API | Information Disclosure | AC11 | draft |
| T12 | search-messaging | [`search-messaging/T12-misdirected-chat-billing-request-and-staff-message-spoofing.md`](./search-messaging/T12-misdirected-chat-billing-request-and-staff-message-spoofing.md) | Misdirected Chat Billing Request And Staff Message Spoofing | Guest Reception Chat Service & Staff Queue | Spoofing | AC12 | draft |
| T13 | search-messaging | [`search-messaging/T13-guest-privilege-escalation-to-receptionist-chat-queue.md`](./search-messaging/T13-guest-privilege-escalation-to-receptionist-chat-queue.md) | Guest Privilege Escalation To Receptionist Chat Queue | Staff Chat Queue & Receptionist Portal Interface | Elevation of Privilege | AC13 | draft |
| T14 | search-messaging | [`search-messaging/T14-chat-message-tampering-and-history-repudiation-purge.md`](./search-messaging/T14-chat-message-tampering-and-history-repudiation-purge.md) | Chat Message Tampering And History Repudiation Purge | Chat Database & Messaging Log Records | Repudiation | AC14 | draft |
| T01 | accommodation | [`accommodation/T01-room-availability-manipulation.md`](./accommodation/T01-.md) | Room Availability Manipulation | Room availability and blocking module | Tampering | AC01 | draft |
| T02 | accommodation | [`accommodation/T02-false-room-status-update.md`](./accommodation/T02-false-room-status-update.md) | False Room Status Update | Room operational status module | Tampering | AC02 | draft |
| T03 | accommodation | [`accommodation/T03-unauthorized-room-deactivation.md`](./accommodation/T03-unauthorized-room-deactivation.md) | Unauthorized Room Deactivation | Room management module | Tampering | AC03 | draft |
| T04 | accommodation | [`accommodation/T04-unauthorized-room-rate-tampering.md`](./accommodation/T04-unauthorized-room-rate-tampering.md) | Unauthorized Room Rate Tampering | Room rate management module | Tampering | AC04 | draft |
| T05 | accommodation | [`accommodation/T05-staff-room-schedule-exposure.md`](./accommodation/T05-staff-room-schedule-exposure.md) | Staff Room Schedule Exposure | Room schedule view | Information Disclosure | AC05 | draft |
| T06 | accommodation | [`accommodation/T06-occupancy-capacity-tampering.md`](./accommodation/T06-occupancy-capacity-tampering.md) | Occupancy Capacity Tampering | Room capacity validation | Tampering | AC06 | draft |
| T07 | accommodation | [`accommodation/T07-fraudulent-check-in-or-check-out-update.md`](./accommodation/T07-fraudulent-check-in-or-check-out-update.md) | Fraudulent Check In Or Check Out Update | Stay operation status workflow | Tampering | AC34 | draft |
| T08 | accommodation | [`accommodation/T08-guest-stay-identification-tampering.md`](./accommodation/T08-guest-stay-identification-tampering.md) | Guest Stay Identification Tampering | Guest identification at check-in | Tampering | AC08 | draft |
| T09 | accommodation | [`accommodation/T09-companion-registration-tampering.md`](./accommodation/T09-companion-registration-tampering.md) | Companion Registration Tampering | Companion registration module | Tampering | AC09 | draft |
| T10 | accommodation | [`accommodation/T10-cleaning-queue-tampering.md`](./accommodation/T10-cleaning-queue-tampering.md) | Cleaning Queue Tampering | Cleaning queue | Tampering | AC10 | draft |
| T11 | accommodation | [`accommodation/T11-maintenance-note-tampering.md`](./accommodation/T11-maintenance-note-tampering.md) | Maintenance Note Tampering | Maintenance tracking module | Tampering | AC11 | draft |

## Status Values

- `planned`: identified but not written.
- `draft`: written but pending review.
- `reviewed`: reviewed by group.
- `final`: ready for delivery.
