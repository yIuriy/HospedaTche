# Functional Requirements Summary

## Scope

HospedaTche is a hotel accommodation system for online booking, room management, stay operations, payments, guest communication, reviews, reports, audit, and internal account management.

The system does not manage in-room consumption, such as drinks, snacks, minibar items, or room service charges.

## Actors

- Administrator: manages hotel rules, manager accounts, internal account governance, audit, and global settings.
- Manager: manages rooms, rates, receptionist accounts, reservations, reports, and hotel operation.
- Receptionist: manages check-in, check-out, room status, guest support, and reservation assistance.
- Guest: creates account, searches rooms, books stays, pays online, cancels when allowed, uses chat, and reviews stays.

## RF Count By Module

| Module | RF Range | Count |
| :--- | :--- | ---: |
| Accounts and Identity | RF01-RF10 | 10 |
| Public Hotel Information | RF11-RF13 | 3 |
| Rooms, Rates, and Availability | RF14-RF21 | 8 |
| Booking, Payment, and Cancellation | RF22-RF34 | 13 |
| Stay Operations | RF35-RF40 | 6 |
| Communication, Notifications, and Reviews | RF41-RF47 | 7 |
| Reports, Audit, and Export | RF48-RF54 | 7 |
| Hotel Rules and Settings | RF55-RF58 | 4 |
| Total | RF01-RF58 | 58 |

## RF Links

| RF | Name | Module |
| :--- | :--- | :--- |
| [RF01](./functional-requirements.md#rf01---account-role-support) | [Account Role Support](./functional-requirements.md#rf01---account-role-support) | Accounts and Identity |
| [RF02](./functional-requirements.md#rf02---guest-account-self-registration) | [Guest Account Self Registration](./functional-requirements.md#rf02---guest-account-self-registration) | Accounts and Identity |
| [RF03](./functional-requirements.md#rf03---email-verification) | [Email Verification](./functional-requirements.md#rf03---email-verification) | Accounts and Identity |
| [RF04](./functional-requirements.md#rf04---login) | [Login](./functional-requirements.md#rf04---login) | Accounts and Identity |
| [RF05](./functional-requirements.md#rf05---password-recovery) | [Password Recovery](./functional-requirements.md#rf05---password-recovery) | Accounts and Identity |
| [RF06](./functional-requirements.md#rf06---receptionist-account-creation) | [Receptionist Account Creation](./functional-requirements.md#rf06---receptionist-account-creation) | Accounts and Identity |
| [RF07](./functional-requirements.md#rf07---manager-account-creation) | [Manager Account Creation](./functional-requirements.md#rf07---manager-account-creation) | Accounts and Identity |
| [RF08](./functional-requirements.md#rf08---single-administrator-account) | [Single Administrator Account](./functional-requirements.md#rf08---single-administrator-account) | Accounts and Identity |
| [RF09](./functional-requirements.md#rf09---internal-account-inactivation) | [Internal Account Inactivation](./functional-requirements.md#rf09---internal-account-inactivation) | Accounts and Identity |
| [RF10](./functional-requirements.md#rf10---guest-profile-management) | [Guest Profile Management](./functional-requirements.md#rf10---guest-profile-management) | Accounts and Identity |
| [RF11](./functional-requirements.md#rf11---home-page-hotel-information) | [Home Page Hotel Information](./functional-requirements.md#rf11---home-page-hotel-information) | Public Hotel Information |
| [RF12](./functional-requirements.md#rf12---public-room-details) | [Public Room Details](./functional-requirements.md#rf12---public-room-details) | Public Hotel Information |
| [RF13](./functional-requirements.md#rf13---hotel-policy-display) | [Hotel Policy Display](./functional-requirements.md#rf13---hotel-policy-display) | Public Hotel Information |
| [RF14](./functional-requirements.md#rf14---room-management) | [Room Management](./functional-requirements.md#rf14---room-management) | Rooms, Rates, and Availability |
| [RF15](./functional-requirements.md#rf15---room-status-view) | [Room Status View](./functional-requirements.md#rf15---room-status-view) | Rooms, Rates, and Availability |
| [RF16](./functional-requirements.md#rf16---room-status-update) | [Room Status Update](./functional-requirements.md#rf16---room-status-update) | Rooms, Rates, and Availability |
| [RF17](./functional-requirements.md#rf17---room-schedule-view) | [Room Schedule View](./functional-requirements.md#rf17---room-schedule-view) | Rooms, Rates, and Availability |
| [RF18](./functional-requirements.md#rf18---room-availability-search) | [Room Availability Search](./functional-requirements.md#rf18---room-availability-search) | Rooms, Rates, and Availability |
| [RF19](./functional-requirements.md#rf19---occupancy-capacity-validation) | [Occupancy Capacity Validation](./functional-requirements.md#rf19---occupancy-capacity-validation) | Rooms, Rates, and Availability |
| [RF20](./functional-requirements.md#rf20---rate-management) | [Rate Management](./functional-requirements.md#rf20---rate-management) | Rooms, Rates, and Availability |
| [RF21](./functional-requirements.md#rf21---availability-blocking) | [Availability Blocking](./functional-requirements.md#rf21---availability-blocking) | Rooms, Rates, and Availability |
| [RF22](./functional-requirements.md#rf22---guest-booking-creation) | [Guest Booking Creation](./functional-requirements.md#rf22---guest-booking-creation) | Booking, Payment, and Cancellation |
| [RF23](./functional-requirements.md#rf23---multiple-guest-reservations) | [Multiple Guest Reservations](./functional-requirements.md#rf23---multiple-guest-reservations) | Booking, Payment, and Cancellation |
| [RF24](./functional-requirements.md#rf24---reservation-payment) | [Reservation Payment](./functional-requirements.md#rf24---reservation-payment) | Booking, Payment, and Cancellation |
| [RF25](./functional-requirements.md#rf25---payment-methods) | [Payment Methods](./functional-requirements.md#rf25---payment-methods) | Booking, Payment, and Cancellation |
| [RF26](./functional-requirements.md#rf26---payment-status-synchronization) | [Payment Status Synchronization](./functional-requirements.md#rf26---payment-status-synchronization) | Booking, Payment, and Cancellation |
| [RF27](./functional-requirements.md#rf27---reservation-voucher) | [Reservation Voucher](./functional-requirements.md#rf27---reservation-voucher) | Booking, Payment, and Cancellation |
| [RF28](./functional-requirements.md#rf28---reservation-history) | [Reservation History](./functional-requirements.md#rf28---reservation-history) | Booking, Payment, and Cancellation |
| [RF29](./functional-requirements.md#rf29---reservation-cancellation-request) | [Reservation Cancellation Request](./functional-requirements.md#rf29---reservation-cancellation-request) | Booking, Payment, and Cancellation |
| [RF30](./functional-requirements.md#rf30---refund-rule-configuration) | [Refund Rule Configuration](./functional-requirements.md#rf30---refund-rule-configuration) | Booking, Payment, and Cancellation |
| [RF31](./functional-requirements.md#rf31---staff-reservation-creation) | [Staff Reservation Creation](./functional-requirements.md#rf31---staff-reservation-creation) | Booking, Payment, and Cancellation |
| [RF32](./functional-requirements.md#rf32---reservation-change) | [Reservation Change](./functional-requirements.md#rf32---reservation-change) | Booking, Payment, and Cancellation |
| [RF33](./functional-requirements.md#rf33---reservation-status-tracking) | [Reservation Status Tracking](./functional-requirements.md#rf33---reservation-status-tracking) | Booking, Payment, and Cancellation |
| [RF34](./functional-requirements.md#rf34---no-in-room-consumption-management) | [No In Room Consumption Management](./functional-requirements.md#rf34---no-in-room-consumption-management) | Booking, Payment, and Cancellation |
| [RF35](./functional-requirements.md#rf35---check-in) | [Check In](./functional-requirements.md#rf35---check-in) | Stay Operations |
| [RF36](./functional-requirements.md#rf36---check-out) | [Check Out](./functional-requirements.md#rf36---check-out) | Stay Operations |
| [RF37](./functional-requirements.md#rf37---guest-identification-at-check-in) | [Guest Identification At Check In](./functional-requirements.md#rf37---guest-identification-at-check-in) | Stay Operations |
| [RF38](./functional-requirements.md#rf38---companion-registration) | [Companion Registration](./functional-requirements.md#rf38---companion-registration) | Stay Operations |
| [RF39](./functional-requirements.md#rf39---cleaning-queue) | [Cleaning Queue](./functional-requirements.md#rf39---cleaning-queue) | Stay Operations |
| [RF40](./functional-requirements.md#rf40---maintenance-tracking) | [Maintenance Tracking](./functional-requirements.md#rf40---maintenance-tracking) | Stay Operations |
| [RF41](./functional-requirements.md#rf41---guest-stay-notifications) | [Guest Stay Notifications](./functional-requirements.md#rf41---guest-stay-notifications) | Communication, Notifications, and Reviews |
| [RF42](./functional-requirements.md#rf42---guest-reception-chat) | [Guest Reception Chat](./functional-requirements.md#rf42---guest-reception-chat) | Communication, Notifications, and Reviews |
| [RF43](./functional-requirements.md#rf43---staff-chat-queue) | [Staff Chat Queue](./functional-requirements.md#rf43---staff-chat-queue) | Communication, Notifications, and Reviews |
| [RF44](./functional-requirements.md#rf44---guest-review) | [Guest Review](./functional-requirements.md#rf44---guest-review) | Communication, Notifications, and Reviews |
| [RF45](./functional-requirements.md#rf45---review-moderation) | [Review Moderation](./functional-requirements.md#rf45---review-moderation) | Communication, Notifications, and Reviews |
| [RF46](./functional-requirements.md#rf46---notification-preferences) | [Notification Preferences](./functional-requirements.md#rf46---notification-preferences) | Communication, Notifications, and Reviews |
| [RF47](./functional-requirements.md#rf47---reservation-reminder) | [Reservation Reminder](./functional-requirements.md#rf47---reservation-reminder) | Communication, Notifications, and Reviews |
| [RF48](./functional-requirements.md#rf48---administrator-audit-reports) | [Administrator Audit Reports](./functional-requirements.md#rf48---administrator-audit-reports) | Reports, Audit, and Export |
| [RF49](./functional-requirements.md#rf49---administrator-internal-account-management) | [Administrator Internal Account Management](./functional-requirements.md#rf49---administrator-internal-account-management) | Reports, Audit, and Export |
| [RF50](./functional-requirements.md#rf50---manager-reports) | [Manager Reports](./functional-requirements.md#rf50---manager-reports) | Reports, Audit, and Export |
| [RF51](./functional-requirements.md#rf51---manager-receptionist-management) | [Manager Receptionist Management](./functional-requirements.md#rf51---manager-receptionist-management) | Reports, Audit, and Export |
| [RF52](./functional-requirements.md#rf52---report-export) | [Report Export](./functional-requirements.md#rf52---report-export) | Reports, Audit, and Export |
| [RF53](./functional-requirements.md#rf53---reservation-audit-history) | [Reservation Audit History](./functional-requirements.md#rf53---reservation-audit-history) | Reports, Audit, and Export |
| [RF54](./functional-requirements.md#rf54---payment-audit-history) | [Payment Audit History](./functional-requirements.md#rf54---payment-audit-history) | Reports, Audit, and Export |
| [RF55](./functional-requirements.md#rf55---hotel-rule-management) | [Hotel Rule Management](./functional-requirements.md#rf55---hotel-rule-management) | Hotel Rules and Settings |
| [RF56](./functional-requirements.md#rf56---rule-publication) | [Rule Publication](./functional-requirements.md#rf56---rule-publication) | Hotel Rules and Settings |
| [RF57](./functional-requirements.md#rf57---hotel-profile-management) | [Hotel Profile Management](./functional-requirements.md#rf57---hotel-profile-management) | Hotel Rules and Settings |
| [RF58](./functional-requirements.md#rf58---system-configuration-history) | [System Configuration History](./functional-requirements.md#rf58---system-configuration-history) | Hotel Rules and Settings |

## Task Groups

- User Registration and Identity: RF01-RF10.
- Authentication and Access Control: RF01, RF04, RF05, RF06, RF07, RF08, RF09, RF10.
- Accommodation and Room Management: RF14-RF21, RF35-RF40.
- Booking and Payment Transactions: RF22-RF34.
- Search, Reviews, and Messaging: RF18-RF21, RF41-RF47.
- Reports, Audit, and Administration: RF48-RF58.

