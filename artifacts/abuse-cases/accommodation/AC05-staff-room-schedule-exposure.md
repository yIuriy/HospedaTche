### AC05 - Staff Room Schedule Exposure

Actor: unauthorized user.

Goal: view staff-only room schedule and reservation timing details.

Conditions: room schedule view does not properly block unauthorized users.

Abuse flow:
1. Unauthorized user accesses the room schedule page or endpoint.
2. User filters schedule data by room, date, status, or floor.
3. User views reservation status, check-in dates, and check-out dates.
4. User uses operational schedule information outside the allowed role.

Impact: guest stay pattern exposure, privacy violation, and misuse of operational scheduling information.

Related STRIDE categories: Information Disclosure