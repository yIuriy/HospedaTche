# HospedaTche

## 8.1 System Identification

| Item | Description |
| :--- | :--- |
| System name | HospedaTche |
| Group members | Iuri, Sidnei, Lara, Dyonathan, Rafaela |
| Repository | https://github.com/yIuriy/HospedaTche.git |
| System choice justification | The system was chosen because hotel accommodation platforms combine public access, personal data, reservations, payments, internal operations, and role-based administration. This makes HospedaTche suitable for analyzing assets, trust boundaries, abuse cases, and STRIDE threats in a realistic security context. |

## 8.2 System Description

HospedaTche is a hotel accommodation system for online booking, room management, stay operations, payments, guest communication, reviews, reports, audit, and internal account management. The system does not manage in-room consumption such as drinks, snacks, minibar items, or room service charges.

The system solves the problem of managing the hotel accommodation lifecycle in a single software environment. Guests can create accounts, search available rooms, book stays, pay online, cancel reservations when allowed, use chat, and submit reviews. Internal staff can manage rooms, availability, check-in, check-out, support, reports, and account governance according to their access profile.

The main users are Guests, Receptionists, Managers, Administrators, and external payment services. The main functionalities include account and identity management, authentication, room and rate management, availability search, reservation creation, payment status synchronization, cancellation and refund rules, stay operations, guest messaging, notifications, reviews, reports, audit history, and hotel settings.

The system stores or transmits user accounts, credentials, personal data, guest identification data, reservations, room availability, room prices, payment references, transaction statuses, vouchers, chat messages, reviews, notification preferences, audit logs, reports, and configuration history. The resources that need protection include user identities, credentials, personal and booking data, payment-related records, internal permissions, audit trails, room availability, prices, messages, reviews, APIs, servers, and the application database.

## 8.3 Users, Assets, and Interaction Points

### Users and Access Profiles

| Profile | Main Access |
| :--- | :--- |
| Guest | Account registration, profile management, room search, booking, payment, cancellation, chat, notifications, and reviews. |
| Receptionist | Check-in, check-out, room status updates, guest support, staff chat queue, and reservation assistance. |
| Manager | Room management, rate management, availability blocking, receptionist account management, reservations, reports, and hotel operations. |
| Administrator | Hotel rules, manager accounts, internal account governance, audit reports, global settings, and system configuration history. |
| Payment provider | External payment authorization and payment status updates. |

### Important Assets

| Asset | Why It Matters |
| :--- | :--- |
| User accounts and roles | Unauthorized changes can allow privilege escalation, account takeover, or loss of governance. |
| Credentials and session data | Exposure or misuse can allow attackers to impersonate legitimate users. |
| Personal and identification data | Unauthorized access can harm guest privacy and create legal or reputational impact. |
| Reservation records and vouchers | Tampering can cause fraud, operational errors, or disputes. |
| Room availability, status, and rates | Incorrect changes can block legitimate bookings, alter prices, or disrupt hotel operations. |
| Payment references and transaction statuses | Tampering or exposure can affect financial integrity and reconciliation. |
| Chat messages and notifications | Exposure can leak private guest communication or internal support information. |
| Reviews and moderation data | Manipulation can damage trust in hotel feedback and public information. |
| Audit logs and reports | Missing or altered logs can prevent accountability and incident investigation. |
| Hotel rules and system settings | Unauthorized changes can affect business policy, refunds, permissions, and operation. |
| Application database | It concentrates accounts, reservations, payments, messages, reviews, logs, and settings. |
| APIs and servers | They enforce access control and mediate interactions between users, data, and external services. |

### Interaction Points

| Interaction Point | Main Data or Operation |
| :--- | :--- |
| Public hotel information and room search | Public hotel details, room availability, dates, occupancy, and search filters. |
| Account registration and login | Personal data, credentials, email verification, password recovery, and sessions. |
| Guest profile management | Guest personal data and account details. |
| Room, rate, and availability management | Room descriptions, status, pricing, schedule, and availability blocking. |
| Booking and cancellation flow | Reservation details, guest dates, voucher generation, cancellation requests, and refund rules. |
| Payment provider integration | Payment authorization, payment method references, transaction status, and audit history. |
| Check-in and check-out operations | Stay status, guest identification, companions, room status, and operational records. |
| Chat, notifications, and reviews | Guest messages, staff responses, notification preferences, reminders, reviews, and moderation data. |
| Reports and audit | Reservation history, payment history, internal actions, exports, and administrative audit records. |
| Database and backend APIs | Persistent storage and server-side enforcement of permissions, validation, and business rules. |

## 8.4 Architecture or Flow Overview

HospedaTche can be understood as a web-based hotel system where external users, internal staff, and external services interact with a central application. Guests use the application to search rooms, create reservations, pay, communicate with reception, and review stays. Receptionists and Managers operate hotel workflows such as room status, check-in, check-out, reservations, rates, and support. Administrators manage governance, roles, audit, and global settings.

The backend application is the main trust boundary between users and protected data. It validates identity, authorizes actions according to role, applies hotel rules, records audit data, stores information in the application database, and communicates with the payment provider for payment authorization and status tracking.

| Component | Interacts With | Purpose |
| :--- | :--- | :--- |
| Guest | HospedaTche System | Search rooms, book stays, pay, cancel, chat, and review. |
| Receptionist | HospedaTche System | Support guests, manage check-in/check-out, and update operational room status. |
| Manager | HospedaTche System | Manage rooms, rates, availability, reservations, reports, and receptionist accounts. |
| Administrator | HospedaTche System | Manage governance, manager accounts, settings, and audit. |
| HospedaTche System | Application Database | Store accounts, reservations, payments, messages, reviews, audit logs, reports, and settings. |
| HospedaTche System | Payment Provider | Authorize payments and synchronize transaction status. |

The repository includes a versioned Mermaid context diagram at [`artifacts/diagrams/context-diagram.mmd`](artifacts/diagrams/context-diagram.mmd). It represents the main external actors, the HospedaTche system, the application database, and the payment provider.
