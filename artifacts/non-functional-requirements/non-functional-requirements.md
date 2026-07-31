# Non-Functional Requirements

## Security

### NFR01 - Configurable Login Attempt Limit

Category: Security

Applies To: Login and Authentication

Statement: The system must allow configuring the maximum number of failed login attempts before temporary account or session blocking.

Acceptance Criteria:
1. The limit can be configured by an authorized administrator.
2. The system applies the limit to all account roles.
3. The system records blocked login attempts for audit.

Priority: Must

Related Modules: Accounts and Identity; Authentication and Access Control

### NFR02 - Role Based Route Protection

Category: Security

Applies To: Web Routes and API Endpoints

Statement: The system must protect routes and endpoints according to the user's role.

Acceptance Criteria:
1. Guests cannot access internal staff routes.
2. Receptionists cannot access Manager or Administrator-only routes.
3. Managers cannot access Administrator-only routes.

Priority: Must

Related Modules: Authentication and Access Control

### NFR03 - Session Expiration

Category: Security

Applies To: Authenticated Sessions

Statement: The system must expire inactive authenticated sessions after a configurable time.

Acceptance Criteria:
1. Session inactivity timeout can be configured.
2. Expired sessions require login again.
3. Session expiration applies to all account roles.

Priority: Must

Related Modules: Accounts and Identity; Authentication and Access Control

### NFR04 - Password Storage Protection

Category: Security

Applies To: User Credentials

Statement: The system must store passwords using a secure one-way hashing mechanism.

Acceptance Criteria:
1. Plain text passwords are never stored.
2. Password hashes use salt.
3. Password data is not exposed in reports or logs.

Priority: Must

Related Modules: Accounts and Identity; Authentication and Access Control

### NFR05 - Chat Message Encryption

Category: Security

Applies To: Guest Reception Chat

Statement: The system must protect chat messages with encryption during transmission and storage.

Acceptance Criteria:
1. Chat messages are transmitted through encrypted connections.
2. Stored chat messages are encrypted or protected by equivalent storage controls.
3. Only authorized users can access chat history.

Priority: Must

Related Modules: Communication, Notifications, and Reviews

### NFR06 - Credit Card Data Protection

Category: Security

Applies To: Payment Processing

Statement: The system must protect credit card data and avoid storing sensitive card information.

Acceptance Criteria:
1. The system does not store full card numbers or security codes.
2. Payment records store only safe payment references or masked data.
3. Sensitive payment data is not written to logs.

Priority: Must

Related Modules: Booking, Payment, and Cancellation

### NFR07 - Encrypted Transport

Category: Security

Applies To: Web Application and APIs

Statement: The system must use encrypted transport for all authenticated, booking, payment, and chat traffic.

Acceptance Criteria:
1. Authenticated pages use HTTPS.
2. Payment and booking requests use HTTPS.
3. Chat traffic uses encrypted transport.

Priority: Must

Related Modules: All Modules

### NFR08 - Audit Log Integrity

Category: Security

Applies To: Audit Events

Statement: The system must protect audit logs against unauthorized modification.

Acceptance Criteria:
1. Normal users cannot edit audit log records.
2. Audit records include actor, action, timestamp, and affected record.
3. Audit log access is restricted to authorized roles.

Priority: Must

Related Modules: Reports, Audit, and Export

## Performance

### NFR09 - Page Response Time

Category: Performance

Applies To: Web Pages

Statement: The system should load common pages within an acceptable response time under normal usage.

Acceptance Criteria:
1. Common pages respond within 3 seconds under normal expected load.
2. Room search responds within 5 seconds under normal expected load.
3. Slow responses are logged or monitored.

Priority: Should

Related Modules: All Modules

### NFR10 - Booking Confirmation Time

Category: Performance

Applies To: Booking and Payment Flow

Statement: The system should confirm reservations shortly after payment approval.

Acceptance Criteria:
1. Approved payments update reservation status within 10 seconds after confirmation from the payment provider.
2. The Guest can view updated reservation status after confirmation.
3. Delayed confirmations remain visible as pending.

Priority: Should

Related Modules: Booking, Payment, and Cancellation

### NFR11 - Report Generation Time

Category: Performance

Applies To: Reports

Statement: The system should generate operational and financial reports within acceptable time for normal date ranges.

Acceptance Criteria:
1. Reports for normal date ranges generate within 10 seconds.
2. Large reports can show loading status.
3. Export generation failure shows a clear error.

Priority: Should

Related Modules: Reports, Audit, and Export

## Availability and Reliability

### NFR12 - Basic Availability Target

Category: Availability

Applies To: Web Application

Statement: The system should remain available for normal hotel booking and operation during expected usage periods.

Acceptance Criteria:
1. Guests can search and book rooms during public access periods.
2. Staff can access operational functions during hotel work hours.
3. Planned maintenance should be communicated when possible.

Priority: Should

Related Modules: All Modules

### NFR13 - Reservation Data Consistency

Category: Reliability

Applies To: Reservations and Room Availability

Statement: The system must keep reservation and room availability data consistent.

Acceptance Criteria:
1. A confirmed reservation blocks the selected room for the selected period.
2. Cancelled reservations release room availability when applicable.
3. The system prevents double booking for the same room and date range.

Priority: Must

Related Modules: Rooms, Rates, and Availability; Booking, Payment, and Cancellation

### NFR14 - Payment Failure Handling

Category: Reliability

Applies To: Payment Processing

Statement: The system must handle payment failures without confirming unpaid reservations.

Acceptance Criteria:
1. Failed payments do not create confirmed reservations.
2. Pending payments have an expiration policy.
3. Guests can see payment failure status.

Priority: Must

Related Modules: Booking, Payment, and Cancellation

### NFR15 - Backup Requirement

Category: Reliability

Applies To: System Data

Statement: The system should support regular backups of important system data.

Acceptance Criteria:
1. Backup scope includes accounts, reservations, rooms, rates, payments, and audit logs.
2. Backup frequency is defined by system configuration or operational policy.
3. Restore procedure is documented for the project.

Priority: Should

Related Modules: All Modules

## Usability and Accessibility

### NFR16 - Clear Error Messages

Category: Usability

Applies To: User Interfaces

Statement: The system should show clear error messages for failed user actions.

Acceptance Criteria:
1. Invalid forms show which fields need correction.
2. Payment, login, and booking errors show safe user-facing messages.
3. Error messages do not expose sensitive technical details.

Priority: Should

Related Modules: All Modules

### NFR17 - Responsive Interface

Category: Usability

Applies To: Web Interface

Statement: The system should provide a responsive interface for desktop and mobile browsers.

Acceptance Criteria:
1. Guests can search and book rooms on mobile screens.
2. Staff can use operational screens on desktop screens.
3. Main navigation remains usable across supported screen sizes.

Priority: Should

Related Modules: All Modules

### NFR18 - Basic Accessibility

Category: Accessibility

Applies To: Web Interface

Statement: The system should follow basic accessibility practices for forms, navigation, and important actions.

Acceptance Criteria:
1. Form fields have visible labels.
2. Main actions can be reached by keyboard navigation.
3. Important status messages are readable and clear.

Priority: Should

Related Modules: All Modules

## Maintainability and Compliance

### NFR19 - Configuration Management

Category: Maintainability

Applies To: System Settings

Statement: The system should keep operational rules and limits configurable instead of hardcoded when they affect hotel operation.

Acceptance Criteria:
1. Login attempt limit is configurable.
2. Refund rules are configurable.
3. Session timeout is configurable.

Priority: Should

Related Modules: Hotel Rules and Settings; Authentication and Access Control

### NFR20 - Privacy By Least Data Exposure

Category: Privacy

Applies To: Personal Data

Statement: The system must expose personal data only to users and roles that need it for their functions.

Acceptance Criteria:
1. Guests can access only their own personal data.
2. Receptionists access Guest data needed for reservation and stay support.
3. Reports avoid unnecessary personal data exposure.

Priority: Must

Related Modules: Accounts and Identity; Reports, Audit, and Export; Stay Operations

