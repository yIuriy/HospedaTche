# Functional Requirements

## Accounts and Identity

### RF01 - Account Role Support

Module: Accounts and Identity

Primary Actors: Administrator, Manager, Receptionist, Guest

Statement: The system must support Administrator, Manager, Receptionist, and Guest accounts with role-specific permissions.

Acceptance Criteria:
1. The system stores one role for each active account.
2. The system blocks access to features outside the user's role.
3. The system records role changes in audit logs.

Priority: Must

Related Tasks: User Registration and Identity; Authentication and Access Control

### RF02 - Guest Account Self Registration

Module: Accounts and Identity

Primary Actors: Guest

Statement: The system must allow any person to create a Guest account by entering email, password, CPF, and full name.

Acceptance Criteria:
1. The system requires email, password, CPF, and full name.
2. The system rejects duplicate email or CPF values.
3. The system creates the account only after email verification.

Priority: Must

Related Tasks: User Registration and Identity

### RF03 - Email Verification

Module: Accounts and Identity

Primary Actors: Guest

Statement: The system must verify a Guest account through email before allowing account use.

Acceptance Criteria:
1. The system sends a verification link to the registered email.
2. The system blocks login for unverified Guest accounts.
3. The system allows resending the verification email.

Priority: Must

Related Tasks: User Registration and Identity

### RF04 - Login

Module: Accounts and Identity

Primary Actors: Administrator, Manager, Receptionist, Guest

Statement: The system must allow users to access their accounts using email and password.

Acceptance Criteria:
1. The system authenticates active users with valid credentials.
2. The system rejects invalid credentials.
3. The system blocks inactive accounts from logging in.

Priority: Must

Related Tasks: Authentication and Access Control

### RF05 - Password Recovery

Module: Accounts and Identity

Primary Actors: Administrator, Manager, Receptionist, Guest

Statement: The system must allow users to recover passwords through a reset link sent to the registered email.

Acceptance Criteria:
1. The system sends a password reset link when the email is registered.
2. The reset link expires after a configured time.
3. The user can define a new password through the reset flow.

Priority: Must

Related Tasks: Authentication and Access Control

### RF06 - Receptionist Account Creation

Module: Accounts and Identity

Primary Actors: Manager

Statement: The system must allow Managers to create Receptionist accounts.

Acceptance Criteria:
1. Only Managers can create Receptionist accounts.
2. The system requires name, email, CPF, and temporary password or activation invitation.
3. The system logs account creation.

Priority: Must

Related Tasks: User Registration and Identity; Authentication and Access Control

### RF07 - Manager Account Creation

Module: Accounts and Identity

Primary Actors: Administrator

Statement: The system must allow only the Administrator to create Manager accounts.

Acceptance Criteria:
1. Only the Administrator can create Manager accounts.
2. The system requires name, email, CPF, and temporary password or activation invitation.
3. The system logs account creation.

Priority: Must

Related Tasks: User Registration and Identity; Authentication and Access Control

### RF08 - Single Administrator Account

Module: Accounts and Identity

Primary Actors: Administrator

Statement: The system must have only one Administrator account.

Acceptance Criteria:
1. The system prevents creating a second Administrator account.
2. The system preserves the Administrator role during account updates.
3. The system logs attempts to create another Administrator.

Priority: Must

Related Tasks: Authentication and Access Control

### RF09 - Internal Account Inactivation

Module: Accounts and Identity

Primary Actors: Administrator, Manager

Statement: The system must allow internal account inactivation according to role authority.

Acceptance Criteria:
1. The Administrator can inactivate Manager and Receptionist accounts.
2. A Manager can inactivate Receptionist accounts.
3. Inactive internal accounts cannot log in.

Priority: Must

Related Tasks: User Registration and Identity; Authentication and Access Control

### RF10 - Guest Profile Management

Module: Accounts and Identity

Primary Actors: Guest

Statement: The system must allow Guests to view and update their own profile data.

Acceptance Criteria:
1. Guests can view their full name, email, and CPF.
2. Guests can update allowed profile fields.
3. The system does not allow CPF changes without authorized support flow.

Priority: Should

Related Tasks: User Registration and Identity

## Public Hotel Information

### RF11 - Home Page Hotel Information

Module: Public Hotel Information

Primary Actors: Guest, Anonymous Visitor

Statement: The system must show hotel information on the home page.

Acceptance Criteria:
1. The home page shows hotel name, address, contact channels, and general description.
2. The home page shows check-in and check-out policy summary.
3. The home page shows public room search access.

Priority: Must

Related Tasks: Search, Reviews, and Messaging

### RF12 - Public Room Details

Module: Public Hotel Information

Primary Actors: Guest, Anonymous Visitor

Statement: The system must show public details for available room types and rooms.

Acceptance Criteria:
1. The system shows capacity, description, photos, amenities, and base rate.
2. The system hides internal maintenance notes.
3. The system shows whether dates are available after search.

Priority: Should

Related Tasks: Accommodation and Room Management; Search, Reviews, and Messaging

### RF13 - Hotel Policy Display

Module: Public Hotel Information

Primary Actors: Guest, Anonymous Visitor

Statement: The system must display public hotel rules relevant to booking and stay.

Acceptance Criteria:
1. The system shows cancellation, refund, check-in, check-out, and occupancy rules.
2. The system shows the rules before payment confirmation.
3. The system includes rules in the reservation voucher.

Priority: Must

Related Tasks: Booking and Payment Transactions; Reports, Audit, and Administration

## Rooms, Rates, and Availability

### RF14 - Room Management

Module: Rooms, Rates, and Availability

Primary Actors: Manager

Statement: The system must allow Managers to manage hotel rooms.

Acceptance Criteria:
1. Managers can create, edit, view, and deactivate rooms.
2. Rooms include number, floor, capacity, type, description, and status.
3. Deactivated rooms cannot receive new reservations.

Priority: Must

Related Tasks: Accommodation and Room Management

### RF15 - Room Status View

Module: Rooms, Rates, and Availability

Primary Actors: Manager, Receptionist

Statement: The system must allow Managers and Receptionists to view room occupancy status.

Acceptance Criteria:
1. The system shows current room status.
2. The system supports filtering by status, floor, and date.
3. The system differentiates operational status from reservation status.

Priority: Must

Related Tasks: Accommodation and Room Management

### RF16 - Room Status Update

Module: Rooms, Rates, and Availability

Primary Actors: Receptionist, Manager

Statement: The system must allow authorized staff to change room status between Free, Occupied, Waiting Cleaning, Under Maintenance, and Reserved.

Acceptance Criteria:
1. Receptionists can update operational room status.
2. Managers can update operational room status.
3. The system logs status changes with user and timestamp.

Priority: Must

Related Tasks: Accommodation and Room Management

### RF17 - Room Schedule View

Module: Rooms, Rates, and Availability

Primary Actors: Manager, Receptionist

Statement: The system must show the booking schedule of each room, including check-in date and time, check-out date and time, and reservation status.

Acceptance Criteria:
1. Authorized staff can view a room calendar.
2. The calendar shows confirmed, cancelled, checked-in, and checked-out reservations.
3. The system prevents unauthorized users from viewing staff-only scheduling details.

Priority: Must

Related Tasks: Accommodation and Room Management; Booking and Payment Transactions

### RF18 - Room Availability Search

Module: Rooms, Rates, and Availability

Primary Actors: Guest, Anonymous Visitor

Statement: The system must allow users to search available rooms by check-in date, check-out date, and number of guests.

Acceptance Criteria:
1. The system returns only rooms available for the full selected period.
2. The system filters rooms by capacity.
3. The system rejects invalid date ranges.

Priority: Must

Related Tasks: Search, Reviews, and Messaging

### RF19 - Occupancy Capacity Validation

Module: Rooms, Rates, and Availability

Primary Actors: Guest

Statement: The system must require the Guest to inform the number of people staying and validate it against room capacity.

Acceptance Criteria:
1. The booking flow requires number of guests.
2. The system rejects reservations above room capacity.
3. The number of guests appears in reservation details.

Priority: Must

Related Tasks: Booking and Payment Transactions

### RF20 - Rate Management

Module: Rooms, Rates, and Availability

Primary Actors: Manager

Statement: The system must allow Managers to define and change room daily rates, including seasonal or promotional rates.

Acceptance Criteria:
1. Managers can set a base daily rate per room or room type.
2. Managers can create date-based seasonal or promotional rates.
3. The booking flow uses the correct rate for selected dates.

Priority: Must

Related Tasks: Accommodation and Room Management; Booking and Payment Transactions

### RF21 - Availability Blocking

Module: Rooms, Rates, and Availability

Primary Actors: Manager, Receptionist

Statement: The system must allow authorized staff to block room availability for maintenance or operational reasons.

Acceptance Criteria:
1. Staff can create an availability block with dates and reason.
2. Blocked rooms do not appear as available for booking.
3. The system keeps a history of availability blocks.

Priority: Should

Related Tasks: Accommodation and Room Management

## Booking, Payment, and Cancellation

### RF22 - Guest Booking Creation

Module: Booking, Payment, and Cancellation

Primary Actors: Guest

Statement: The system must allow Guests to book a room by selecting check-in date, check-out date, and number of guests.

Acceptance Criteria:
1. The Guest can select an available room from search results.
2. The system calculates total price before payment.
3. The system creates the reservation only after payment confirmation.

Priority: Must

Related Tasks: Booking and Payment Transactions

### RF23 - Multiple Guest Reservations

Module: Booking, Payment, and Cancellation

Primary Actors: Guest

Statement: The system must allow a Guest to have multiple reservations.

Acceptance Criteria:
1. A Guest can create more than one reservation.
2. The system shows all active reservations in the Guest profile.
3. The system prevents date conflicts only when they violate hotel rules.

Priority: Must

Related Tasks: Booking and Payment Transactions

### RF24 - Reservation Payment

Module: Booking, Payment, and Cancellation

Primary Actors: Guest

Statement: The system must require online payment during booking.

Acceptance Criteria:
1. The Guest must pay before reservation confirmation.
2. Unpaid reservation attempts expire after configured time.
3. Confirmed reservations store payment reference.

Priority: Must

Related Tasks: Booking and Payment Transactions

### RF25 - Payment Methods

Module: Booking, Payment, and Cancellation

Primary Actors: Guest

Statement: The system must support Pix, credit card, and debit card payments.

Acceptance Criteria:
1. The Guest can select Pix, credit card, or debit card.
2. The system records payment method and payment status.
3. The system handles approved, rejected, pending, and expired payment states.

Priority: Must

Related Tasks: Booking and Payment Transactions

### RF26 - Payment Status Synchronization

Module: Booking, Payment, and Cancellation

Primary Actors: Guest, Manager, Receptionist

Statement: The system must update reservation status according to payment result.

Acceptance Criteria:
1. Approved payment confirms reservation.
2. Rejected or expired payment cancels the pending reservation.
3. Staff can view payment status without seeing sensitive card data.

Priority: Must

Related Tasks: Booking and Payment Transactions

### RF27 - Reservation Voucher

Module: Booking, Payment, and Cancellation

Primary Actors: Guest

Statement: The system must generate and provide a reservation voucher in PDF after payment confirmation.

Acceptance Criteria:
1. The voucher includes reservation code, Guest data, room data, dates, total price, payment status, and hotel rules.
2. The Guest can download the voucher from the reservation details page.
3. The system sends or notifies voucher availability after confirmation.

Priority: Must

Related Tasks: Booking and Payment Transactions

### RF28 - Reservation History

Module: Booking, Payment, and Cancellation

Primary Actors: Guest

Statement: The system must keep complete history of past and cancelled reservations for Guest consultation.

Acceptance Criteria:
1. Guests can view active, past, and cancelled reservations.
2. Reservation history includes dates, room, status, payment summary, and cancellation data.
3. Guests can access voucher for confirmed historical reservations.

Priority: Must

Related Tasks: Booking and Payment Transactions

### RF29 - Reservation Cancellation Request

Module: Booking, Payment, and Cancellation

Primary Actors: Guest

Statement: The system must allow Guests to request cancellation of eligible reservations.

Acceptance Criteria:
1. The Guest can cancel only reservations allowed by hotel rules.
2. The system shows refund estimate before cancellation confirmation.
3. The system records cancellation timestamp and actor.

Priority: Must

Related Tasks: Booking and Payment Transactions

### RF30 - Refund Rule Configuration

Module: Booking, Payment, and Cancellation

Primary Actors: Administrator

Statement: The system must allow the Administrator to define how many days before a reservation grant a 100 percent refund and how the refund percentage decreases until reaching 0 percent at reservation time.

Acceptance Criteria:
1. The Administrator can configure the full-refund day limit.
2. The system calculates decreasing refund percentage after the full-refund window.
3. The system shows the refund rule to Guests before cancellation.

Priority: Must

Related Tasks: Booking and Payment Transactions; Reports, Audit, and Administration

### RF31 - Staff Reservation Creation

Module: Booking, Payment, and Cancellation

Primary Actors: Receptionist, Manager

Statement: The system must allow authorized staff to create reservations for Guests who contact the hotel directly.

Acceptance Criteria:
1. Staff can select or create a Guest profile during reservation creation.
2. Staff must enter dates, room, number of guests, and payment status flow.
3. The system marks the reservation as staff-created.

Priority: Should

Related Tasks: Booking and Payment Transactions; Accommodation and Room Management

### RF32 - Reservation Change

Module: Booking, Payment, and Cancellation

Primary Actors: Guest, Receptionist, Manager

Statement: The system must allow eligible reservations to be changed according to hotel rules and room availability.

Acceptance Criteria:
1. Users can request date or room change before check-in when allowed.
2. The system recalculates price differences.
3. The system requires payment or refund flow when price changes.

Priority: Should

Related Tasks: Booking and Payment Transactions

### RF33 - Reservation Status Tracking

Module: Booking, Payment, and Cancellation

Primary Actors: Guest, Receptionist, Manager

Statement: The system must track reservation status throughout its lifecycle.

Acceptance Criteria:
1. The system supports at least Pending Payment, Confirmed, Cancelled, Checked In, Checked Out, and No Show.
2. Guests can see status of their own reservations.
3. Staff can filter reservations by status.

Priority: Must

Related Tasks: Booking and Payment Transactions

### RF34 - No In Room Consumption Management

Module: Booking, Payment, and Cancellation

Primary Actors: Manager, Receptionist

Statement: The system must not manage in-room consumption charges such as drinks, minibar, snacks, or room service.

Acceptance Criteria:
1. Reservation charges include lodging-related values only.
2. The system does not include minibar or room consumption items in billing.
3. Reports do not include in-room consumption revenue.

Priority: Must

Related Tasks: Booking and Payment Transactions; Reports, Audit, and Administration

## Stay Operations

### RF35 - Check In

Module: Stay Operations

Primary Actors: Receptionist

Statement: The system must allow Receptionists to perform guest check-in for confirmed reservations.

Acceptance Criteria:
1. Receptionists can check in only confirmed reservations.
2. The system records check-in date, time, and responsible user.
3. The system updates reservation and room status after check-in.

Priority: Must

Related Tasks: Accommodation and Room Management; Booking and Payment Transactions

### RF36 - Check Out

Module: Stay Operations

Primary Actors: Receptionist

Statement: The system must allow Receptionists to perform guest check-out.

Acceptance Criteria:
1. Receptionists can check out checked-in reservations.
2. The system records check-out date, time, and responsible user.
3. The system updates the room to Waiting Cleaning after check-out.

Priority: Must

Related Tasks: Accommodation and Room Management; Booking and Payment Transactions

### RF37 - Guest Identification At Check In

Module: Stay Operations

Primary Actors: Receptionist, Guest

Statement: The system must allow Receptionists to register or confirm Guest identification data at check-in.

Acceptance Criteria:
1. Receptionists can view required Guest reservation data.
2. Receptionists can confirm identity data needed for stay registration.
3. The system records confirmation in reservation history.

Priority: Should

Related Tasks: User Registration and Identity; Booking and Payment Transactions

### RF38 - Companion Registration

Module: Stay Operations

Primary Actors: Receptionist, Guest

Statement: The system must allow registering companion names for a stay when required by hotel policy.

Acceptance Criteria:
1. Staff can register companion names linked to the reservation.
2. Number of companions cannot exceed reservation guest count.
3. Guest can view companion data linked to the reservation.

Priority: Should

Related Tasks: Accommodation and Room Management; Booking and Payment Transactions

### RF39 - Cleaning Queue

Module: Stay Operations

Primary Actors: Receptionist, Manager

Statement: The system must show rooms waiting for cleaning.

Acceptance Criteria:
1. Staff can filter rooms by Waiting Cleaning status.
2. Staff can mark a room as Free after cleaning is complete.
3. The system logs cleaning status changes.

Priority: Should

Related Tasks: Accommodation and Room Management

### RF40 - Maintenance Tracking

Module: Stay Operations

Primary Actors: Receptionist, Manager

Statement: The system must allow staff to mark rooms under maintenance and record a maintenance note.

Acceptance Criteria:
1. Staff can set room status to Under Maintenance.
2. Staff can record maintenance reason or note.
3. Rooms under maintenance cannot be booked.

Priority: Should

Related Tasks: Accommodation and Room Management

## Communication, Notifications, and Reviews

### RF41 - Guest Stay Notifications

Module: Communication, Notifications, and Reviews

Primary Actors: Guest

Statement: The system must send notifications to Guests about their reservations and stays.

Acceptance Criteria:
1. The system notifies reservation confirmation.
2. The system notifies relevant upcoming check-in information.
3. The system notifies cancellation or payment status changes.

Priority: Must

Related Tasks: Search, Reviews, and Messaging; Booking and Payment Transactions

### RF42 - Guest Reception Chat

Module: Communication, Notifications, and Reviews

Primary Actors: Guest, Receptionist

Statement: The system must provide a chat where Guests can communicate with Receptionists.

Acceptance Criteria:
1. Guests can start chat conversations.
2. Receptionists can respond to Guest messages.
3. The system links chat history to the Guest account.

Priority: Should

Related Tasks: Search, Reviews, and Messaging

### RF43 - Staff Chat Queue

Module: Communication, Notifications, and Reviews

Primary Actors: Receptionist, Manager

Statement: The system must show a queue of Guest chat conversations to Receptionists.

Acceptance Criteria:
1. Receptionists can view open conversations.
2. Receptionists can mark conversations as resolved.
3. Managers can view chat metrics or history for supervision.

Priority: Could

Related Tasks: Search, Reviews, and Messaging; Reports, Audit, and Administration

### RF44 - Guest Review

Module: Communication, Notifications, and Reviews

Primary Actors: Guest

Statement: The system must allow Guests to evaluate room, service, and hotel services after a stay.

Acceptance Criteria:
1. Only Guests with completed stays can submit reviews.
2. Reviews include ratings for room, service, and hotel services.
3. The system prevents duplicate reviews for the same stay.

Priority: Should

Related Tasks: Search, Reviews, and Messaging

### RF45 - Review Moderation

Module: Communication, Notifications, and Reviews

Primary Actors: Manager

Statement: The system must allow Managers to moderate Guest reviews when they violate hotel policy.

Acceptance Criteria:
1. Managers can hide reviews with a moderation reason.
2. The system keeps hidden reviews in internal history.
3. Guests can see status of their own review.

Priority: Could

Related Tasks: Search, Reviews, and Messaging; Reports, Audit, and Administration

### RF46 - Notification Preferences

Module: Communication, Notifications, and Reviews

Primary Actors: Guest

Statement: The system should allow Guests to manage notification preferences.

Acceptance Criteria:
1. Guests can enable or disable optional notifications.
2. Mandatory transactional notifications cannot be disabled.
3. The system stores preferences per Guest.

Priority: Could

Related Tasks: Search, Reviews, and Messaging

### RF47 - Reservation Reminder

Module: Communication, Notifications, and Reviews

Primary Actors: Guest

Statement: The system should send a reminder before check-in.

Acceptance Criteria:
1. The system sends reminder before the scheduled check-in date.
2. The reminder includes reservation code and check-in instructions.
3. The reminder is not sent for cancelled reservations.

Priority: Should

Related Tasks: Search, Reviews, and Messaging; Booking and Payment Transactions

## Reports, Audit, and Export

### RF48 - Administrator Audit Reports

Module: Reports, Audit, and Export

Primary Actors: Administrator

Statement: The system must allow the Administrator to access audit reports.

Acceptance Criteria:
1. The Administrator can view account, permission, payment, and reservation audit events.
2. Reports include actor, action, timestamp, and affected record.
3. The system supports filtering audit reports by date and actor.

Priority: Must

Related Tasks: Reports, Audit, and Administration

### RF49 - Administrator Internal Account Management

Module: Reports, Audit, and Export

Primary Actors: Administrator

Statement: The system must allow the Administrator to manage internal Manager and Receptionist accounts.

Acceptance Criteria:
1. The Administrator can list Manager and Receptionist accounts.
2. The Administrator can create, update, and inactivate Manager accounts.
3. The Administrator can inactivate Receptionist accounts.

Priority: Must

Related Tasks: Reports, Audit, and Administration; Authentication and Access Control

### RF50 - Manager Reports

Module: Reports, Audit, and Export

Primary Actors: Manager

Statement: The system must allow Managers to access operational, financial, and occupancy reports.

Acceptance Criteria:
1. Managers can view occupancy reports.
2. Managers can view financial reports based on reservations and payments.
3. Managers can filter reports by date range.

Priority: Must

Related Tasks: Reports, Audit, and Administration

### RF51 - Manager Receptionist Management

Module: Reports, Audit, and Export

Primary Actors: Manager

Statement: The system must allow Managers to manage Receptionist accounts.

Acceptance Criteria:
1. Managers can list Receptionist accounts.
2. Managers can create and update Receptionist accounts.
3. Managers can inactivate Receptionist accounts.

Priority: Must

Related Tasks: Reports, Audit, and Administration; Authentication and Access Control

### RF52 - Report Export

Module: Reports, Audit, and Export

Primary Actors: Administrator, Manager

Statement: The system must allow financial and occupancy reports to be exported to CSV or Excel formats.

Acceptance Criteria:
1. Authorized users can export financial reports.
2. Authorized users can export occupancy reports.
3. Exported files preserve selected filters.

Priority: Must

Related Tasks: Reports, Audit, and Administration

### RF53 - Reservation Audit History

Module: Reports, Audit, and Export

Primary Actors: Administrator, Manager

Statement: The system must keep audit history for reservation creation, change, cancellation, check-in, and check-out.

Acceptance Criteria:
1. Each auditable reservation action stores actor and timestamp.
2. Authorized users can view reservation audit history.
3. Audit history cannot be edited by normal users.

Priority: Must

Related Tasks: Reports, Audit, and Administration; Booking and Payment Transactions

### RF54 - Payment Audit History

Module: Reports, Audit, and Export

Primary Actors: Administrator, Manager

Statement: The system must keep audit history for payment and refund events.

Acceptance Criteria:
1. Payment events store status, timestamp, and external reference.
2. Refund events store calculated percentage and resulting value.
3. Reports hide sensitive payment data.

Priority: Must

Related Tasks: Reports, Audit, and Administration; Booking and Payment Transactions

## Hotel Rules and Settings

### RF55 - Hotel Rule Management

Module: Hotel Rules and Settings

Primary Actors: Administrator

Statement: The system must provide a page where the Administrator can define hotel rules.

Acceptance Criteria:
1. The Administrator can create and edit hotel rules.
2. Rules can cover check-in, check-out, cancellation, refund, occupancy, and stay policies.
3. Rule changes are logged.

Priority: Must

Related Tasks: Reports, Audit, and Administration

### RF56 - Rule Publication

Module: Hotel Rules and Settings

Primary Actors: Administrator, Guest

Statement: The system must publish active hotel rules to Guests in relevant flows.

Acceptance Criteria:
1. Guests can view active rules before booking.
2. Guests can view active rules in reservation details.
3. Inactive rules are not shown to Guests.

Priority: Must

Related Tasks: Booking and Payment Transactions; Search, Reviews, and Messaging

### RF57 - Hotel Profile Management

Module: Hotel Rules and Settings

Primary Actors: Administrator, Manager

Statement: The system must allow authorized users to manage hotel profile information.

Acceptance Criteria:
1. Authorized users can update hotel name, address, contact channels, and description.
2. Public pages use the active hotel profile.
3. The system logs hotel profile changes.

Priority: Should

Related Tasks: Reports, Audit, and Administration

### RF58 - System Configuration History

Module: Hotel Rules and Settings

Primary Actors: Administrator

Statement: The system must keep history of changes to hotel rules, refund settings, and relevant operational settings.

Acceptance Criteria:
1. The system stores previous and new values for configuration changes.
2. The system stores actor and timestamp.
3. The Administrator can view configuration history.

Priority: Should

Related Tasks: Reports, Audit, and Administration

