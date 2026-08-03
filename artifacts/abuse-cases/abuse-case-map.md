# Abuse Case Map

This file maps abuse cases to modules, assets, and STRIDE categories.

| ID | Module | File | Title | Main Asset | STRIDE Categories | Status |
| --- | --- | --- | --- | --- | --- | --- |
| AC01 | accounts | [`accounts/AC01-fake-guest-registration.md`](./accounts/AC01-fake-guest-registration.md) | Fake Guest Registration | Guest account registration | Spoofing | draft |
| AC02 | accounts | [`accounts/AC02-account-takeover.md`](./accounts/AC02-account-takeover.md) | Account Takeover | User account login | Spoofing, Information Disclosure | draft |
| AC03 | accounts | [`accounts/AC03-unauthorized-role-elevation.md`](./accounts/AC03-unauthorized-role-elevation.md) | Unauthorized Role Elevation | Role assignment and account management API | Elevation of Privilege, Tampering | draft |
| AC04 | accounts | [`accounts/AC04-broken-route-authorization.md`](./accounts/AC04-broken-route-authorization.md) | Broken Route Authorization | Internal application routes and REST endpoints | Elevation of Privilege, Information Disclosure | draft |
| AC05 | accounts | [`accounts/AC05-legitimate-receptionist-inactivation.md`](./accounts/AC05-legitimate-receptionist-inactivation.md) | Legitimate Receptionist Inactivation | Receptionist management module | Denial of Service, Tampering | draft |
| AC06 | accounts | [`accounts/AC06-receptionist-privilege-escalation.md`](./accounts/AC06-receptionist-privilege-escalation.md) | Receptionist Privilege Escalation | Permission management module | Elevation of Privilege, Denial of Service, Tampering | draft |
| AC07 | accounts | [`accounts/AC07-room-information-tampering-by-receptionist.md`](./accounts/AC07-room-information-tampering-by-receptionist.md) | Room Information Tampering By Receptionist | Room management page | Elevation of Privilege, Denial of Service, Tampering | draft |
| AC08 | accounts | [`accounts/AC08-room-configuration-tampering-by-manager.md`](./accounts/AC08-room-configuration-tampering-by-manager.md) | Room Configuration Tampering By Manager | Room management module | Denial of Service, Tampering | draft |
| AC09 | accounts | [`accounts/AC09-mass-account-creation.md`](./accounts/AC09-mass-account-creation.md) | Mass Account Creation | Account creation module | Denial of Service | draft |
| AC10 | accounts | [`accounts/AC10-receptionist-password-disclosure.md`](./accounts/AC10-receptionist-password-disclosure.md) | Receptionist Password Disclosure | Employee management module | Information Disclosure | draft |
| AC11 | accounts | [`accounts/AC11-password-reset-token-leakage.md`](./accounts/AC11-password-reset-token-leakage.md) | Password Reset Token Leakage | Password recovery module | Information Disclosure, Spoofing, Tampering | draft |
| AC12 | accounts | [`accounts/AC12-session-not-invalidated-after-password-change.md`](./accounts/AC12-session-not-invalidated-after-password-change.md) | Session Not Invalidated After Password Change | Session management module | Tampering, Spoofing, Information Disclosure | draft |
| AC13 | accounts | [`accounts/AC13-missing-audit-log-for-account-changes.md`](./accounts/AC13-missing-audit-log-for-account-changes.md) | Missing Audit Log For Account Changes | Account management audit log | Repudiation, Tampering | draft |
| AC14 | accounts | [`accounts/AC14-mass-login-attempt-abuse.md`](./accounts/AC14-mass-login-attempt-abuse.md) | Mass Login Attempt Abuse | Login module | Denial of Service | draft |
| AC15 | accounts | [`accounts/AC15-unauthorized-guest-profile-access.md`](./accounts/AC15-unauthorized-guest-profile-access.md) | Unauthorized Guest Profile Access | Guest profile module | Information Disclosure, Elevation of Privilege | draft |
| AC16 | accounts | [`accounts/AC16-inactive-account-still-has-access.md`](./accounts/AC16-inactive-account-still-has-access.md) | Inactive Account Still Has Access | Account status and access control | Elevation of Privilege, Information Disclosure, Tampering | draft |
| AC17 | accounts | [`accounts/AC17-role-change-without-approval.md`](./accounts/AC17-role-change-without-approval.md) | Role Change Without Approval | Role management module | Elevation of Privilege, Tampering, Repudiation | draft |
| AC18 | accounts | [`accounts/AC18-guest-cpf-enumeration.md`](./accounts/AC18-guest-cpf-enumeration.md) | Guest CPF Enumeration | Guest registration and account lookup | Information Disclosure | draft |
| AC19 | accounts | [`accounts/AC19-session-fixation-and-hijacking.md`](./accounts/AC19-session-fixation-and-hijacking.md) | Session Fixation And Hijacking | Authentication session manager | Spoofing, Information Disclosure, Elevation of Privilege | draft |
| AC20 | accounts | [`accounts/AC20-secondary-administrator-account-creation.md`](./accounts/AC20-secondary-administrator-account-creation.md) | Secondary Administrator Account Creation | Administrator account management service | Elevation of Privilege, Tampering | draft |
| AC21 | accounts | [`accounts/AC21-internal-staff-hierarchy-bypass.md`](./accounts/AC21-internal-staff-hierarchy-bypass.md) | Internal Staff Hierarchy Bypass | Staff account management and inactivation API | Elevation of Privilege, Denial of Service, Tampering | draft |
| AC01 | search-messaging | [`search-messaging/AC01-automated-search-abuse.md`](./search-messaging/AC01-automated-search-abuse.md) | Automated Search Abuse | Room Search API & Database | Denial of Service | draft |
| AC02 | search-messaging | [`search-messaging/AC02-chat-message-flooding.md`](./search-messaging/AC02-chat-message-flooding.md) | Chat Message Flooding | Guest Reception Chat Service | Denial of Service | draft |
| AC03 | search-messaging | [`search-messaging/AC03-guest-chat-history-exposure.md`](./search-messaging/AC03-guest-chat-history-exposure.md) | Guest Chat History Exposure | Chat Database & Messaging Channel | Information Disclosure | draft |
| AC04 | search-messaging | [`search-messaging/AC04-internal-maintenance-notes-exposure.md`](./search-messaging/AC04-internal-maintenance-notes-exposure.md) | Internal Maintenance Notes Exposure | Public Room Details API | Information Disclosure | draft |
| AC05 | search-messaging | [`search-messaging/AC05-hidden-review-data-exposure.md`](./search-messaging/AC05-hidden-review-data-exposure.md) | Hidden Review Data Exposure | Reviews API | Information Disclosure | draft |
| AC06 | search-messaging | [`search-messaging/AC06-review-spamming-and-manipulation.md`](./search-messaging/AC06-review-spamming-and-manipulation.md) | Review Spamming And Manipulation | Review Submission System | Tampering | draft |
| AC07 | search-messaging | [`search-messaging/AC07-notification-preferences-tampering.md`](./search-messaging/AC07-notification-preferences-tampering.md) | Notification Preferences Tampering | Notification Preference Settings | Tampering | draft |
| AC08 | search-messaging | [`search-messaging/AC08-fake-stay-notification-injection.md`](./search-messaging/AC08-fake-stay-notification-injection.md) | Fake Stay Notification Injection | Guest Notification System | Spoofing | draft |
| AC09 | search-messaging | [`search-messaging/AC09-bulk-review-rating-tampering.md`](./search-messaging/AC09-bulk-review-rating-tampering.md) | Bulk Review Rating Tampering | Review Database & Hotel Reputation Rating System | Tampering, Elevation of Privilege | draft |
| AC10 | search-messaging | [`search-messaging/AC10-permanent-guest-review-purge.md`](./search-messaging/AC10-permanent-guest-review-purge.md) | Permanent Guest Review Purge | Guest Review Records & Moderation System | Repudiation, Tampering | draft |
| AC11 | search-messaging | [`search-messaging/AC11-hidden-room-enumeration-and-brute-force.md`](./search-messaging/AC11-hidden-room-enumeration-and-brute-force.md) | Hidden Room Enumeration And Brute Force | Room Search & Public Details API | Information Disclosure | draft |
| AC12 | search-messaging | [`search-messaging/AC12-misdirected-chat-billing-request-and-staff-message-spoofing.md`](./search-messaging/AC12-misdirected-chat-billing-request-and-staff-message-spoofing.md) | Misdirected Chat Billing Request And Staff Message Spoofing | Guest Reception Chat Service & Staff Queue | Spoofing, Tampering | draft |
| AC13 | search-messaging | [`search-messaging/AC13-guest-privilege-escalation-to-receptionist-chat-queue.md`](./search-messaging/AC13-guest-privilege-escalation-to-receptionist-chat-queue.md) | Guest Privilege Escalation To Receptionist Chat Queue | Staff Chat Queue & Receptionist Portal Interface | Elevation of Privilege, Information Disclosure | draft |
| AC14 | search-messaging | [`search-messaging/AC14-chat-message-tampering-and-history-repudiation-purge.md`](./search-messaging/AC14-chat-message-tampering-and-history-repudiation-purge.md) | Chat Message Tampering And History Repudiation Purge | Chat Database & Messaging Log Records | Repudiation, Tampering | draft |
| AC01 | booking | [`booking/ac01-unauthorized-booking-cancellation.md`](./booking/ac01-unauthorized-booking-cancellation.md) | Unauthorized Booking Cancellation | Booking cancellation | Tampering, Elevation of Privilege, Denial of Service | draft |
| AC02 | booking | [`booking/ac02-fake-booking-creation.md`](./booking/ac02-fake-booking-creation.md) | Fake Booking Creation | Room availability | Tampering, Denial of Service | draft |
| AC03 | booking | [`booking/ac03-concurrent-booking-race-condition.md`](./booking/ac03-concurrent-booking-race-condition.md) | Concurrent Booking Race Condition | Room availability | Tampering | draft |
| AC04 | booking | [`booking/ac04-forced-booking-expiration.md`](./booking/ac04-forced-booking-expiration.md) | Forced Booking Expiration | Booking status | Denial of Service | draft |
| AC05 | booking | [`booking/ac05-booking-expiration-bypass.md`](./booking/ac05-booking-expiration-bypass.md) | Booking Expiration Bypass | Booking status | Denial of Service | draft |
| AC06 | booking | [`booking/ac06-duplicate-booking-cancellation.md`](./booking/ac06-duplicate-booking-cancellation.md) | Duplicate Booking Cancellation | Booking status | Tampering | draft |
| AC07 | booking | [`booking/ac07-fraudulent-booking-repudiation.md`](./booking/ac07-fraudulent-booking-repudiation.md) | Fraudulent Booking Repudiation | Audit logs | Repudiation | draft |
| AC08 | booking | [`booking/ac08-booking-information-disclosure.md`](./booking/ac08-booking-information-disclosure.md) | Booking Information Disclosure | Booking records | Information Disclosure | draft |
| AC09 | booking | [`booking/ac09-booking-policy-manipulation.md`](./booking/ac09-booking-policy-manipulation.md) | Booking Policy Manipulation | Booking policies | Elevation of Privilege | draft |
| AC10 | booking | [`booking/ac10-unauthorized-booking-modification.md`](./booking/ac10-unauthorized-booking-modification.md) | Unauthorized Booking Modification | Booking details | Tampering | draft |
| AC11 | booking | [`booking/ac11-unauthorized-booking-confirmation.md`](./booking/ac11-unauthorized-booking-confirmation.md) | Unauthorized Booking Confirmation | Booking confirmation API | Elevation of Privilege, Tampering | draft |
| AC12 | booking | [`booking/ac12-booking-state-machine-transition-bypass.md`](./booking/ac12-booking-state-machine-transition-bypass.md) | Booking State Machine Transition Bypass | Booking status | Tampering | draft |
| AC13 | booking | [`booking/ac13-booking-cancellation-blocking.md`](./booking/ac13-booking-cancellation-blocking.md) | Booking Cancellation Blocking | Booking cancellation | Denial of Service | draft |
| AC01 | payment | [`payment/ac01-payment-reference-substitution.md`](./payment/ac01-payment-reference-substitution.md) | Payment Reference Substitution | Payment transaction | Tampering | draft |
| AC02 | payment | [`payment/ac02-unauthorized-payment-validation.md`](./payment/ac02-unauthorized-payment-validation.md) | Unauthorized Payment Validation | Payment confirmation process | Tampering | draft |
| AC03 | payment | [`payment/ac03-credit-card-information-disclosure.md`](./payment/ac03-credit-card-information-disclosure.md) | Credit Card Information Disclosure | Guest payment information | Information Disclosure | draft |
| AC04 | payment | [`payment/ac04-fraudulent-refund-claim.md`](./payment/ac04-fraudulent-refund-claim.md) | Fraudulent Refund Claim | Refund processing | Spoofing | draft |
| AC05 | payment | [`payment/ac05-payment-confirmation-blocking.md`](./payment/ac05-payment-confirmation-blocking.md) | Payment Confirmation Blocking | Payment confirmation process | Denial of Service | draft |
| AC06 | payment | [`payment/ac06-payment-synchronization-flood.md`](./payment/ac06-payment-synchronization-flood.md) | Payment Synchronization Flood | Payment synchronization service | Denial of Service | draft |
| AC07 | payment | [`payment/ac07-refund-value-tampering.md`](./payment/ac07-refund-value-tampering.md) | Refund Value Tampering | Refund transaction | Tampering | draft |
| AC08 | payment | [`payment/ac08-payment-audit-record-repudiation.md`](./payment/ac08-payment-audit-record-repudiation.md) | Payment Audit Record Repudiation | Payment audit history | Repudiation | draft |
| AC09 | payment | [`payment/ac09-payment-process-interruption.md`](./payment/ac09-payment-process-interruption.md) | Payment Process Interruption | Payment processing | Denial of Service | draft |
| AC10 | payment | [`payment/ac10-payment-gateway-token-tampering.md`](./payment/ac10-payment-gateway-token-tampering.md) | Payment Gateway Token Tampering | Payment gateway response | Tampering | draft |
| AC01 | accommodation | [`accommodation/AC01-room-availability-manipulation.md`](./accommodation/AC01-room-availability-manipulation.md) | Room Availability Manipulation | Room availability and blocking module | Tampering, Denial of Service | draft |
| AC02 | accommodation | [`accommodation/AC02-false-room-status-update.md`](./accommodation/AC02-false-room-status-update.md) | False Room Status Update | Room operational status module | Tampering, Denial of Service | draft |
| AC03 | accommodation | [`accommodation/AC03-unauthorized-room-deactivation.md`](./accommodation/AC03-unauthorized-room-deactivation.md) | Unauthorized Room Deactivation | Room management module | Tampering, Denial of Service | draft |
| AC04 | accommodation | [`accommodation/AC04-unauthorized-room-rate-tampering.md`](./accommodation/AC04-unauthorized-room-rate-tampering.md) | Unauthorized Room Rate Tampering | Room rate management module | Tampering | draft |
| AC05 | accommodation | [`accommodation/AC05-staff-room-schedule-exposure.md`](./accommodation/AC05-staff-room-schedule-exposure.md) | Staff Room Schedule Exposure | Room schedule view | Information Disclosure | draft |
| AC06 | accommodation | [`accommodation/AC06-occupancy-capacity-tampering.md`](./accommodation/AC06-occupancy-capacity-tampering.md) | Occupancy Capacity Tampering | Room capacity validation | Tampering | draft |
| AC07 | accommodation | [`accommodation/AC07-fraudulent-check-in-or-check-out-update.md`](./accommodation/AC07-fraudulent-check-in-or-check-out-update.md) | Fraudulent Check In Or Check Out Update | Stay operation status workflow | Tampering, Repudiation | draft |
| AC08 | accommodation | [`accommodation/AC08-guest-stay-identification-tampering.md`](./accommodation/AC08-guest-stay-identification-tampering.md) | Guest Stay Identification Tampering | Guest identification at check-in | Tampering, Information Disclosure | draft |
| AC09 | accommodation | [`accommodation/AC09-companion-registration-tampering.md`](./accommodation/AC09-companion-registration-tampering.md) | Companion Registration Tampering | Companion registration module | Tampering | draft |
| AC10 | accommodation | [`accommodation/AC10-cleaning-queue-tampering.md`](./accommodation/AC10-cleaning-queue-tampering.md) | Cleaning Queue Tampering | Cleaning queue | Tampering, Denial of Service | draft |
| AC11 | accommodation | [`accommodation/AC11-maintenance-note-tampering.md`](./accommodation/AC11-maintenance-note-tampering.md) | Maintenance Note Tampering | Maintenance tracking module | Tampering, Denial of Service | draft |

## Status Values

- `planned`: identified but not written.
- `draft`: written but pending review.
- `reviewed`: reviewed by group.
- `final`: ready for delivery.
