# ISSUE-03: Accommodation & Room Operations

**Assigned To**: Lara  
**Timeline**: Days 2 - 3  
**Module**: Accommodation and Room Operations  

---

## 1. Description & Context
Build room management APIs, pricing/rate configurations, availability schedules, and operational room status updates (cleaning, maintenance, out-of-order). Ensure room pricing and operational status changes are strictly restricted to Manager and Receptionist roles.

---

## 2. Technical Implementation Tasks

### Backend (`system/backend/src/routes/rooms.js`)
- [ ] `GET /api/v1/rooms`: Public list of active, available rooms.
- [ ] `POST /api/v1/rooms`: Manager-only room creation (room number, type, nightly rate, capacity).
- [ ] `PUT /api/v1/rooms/:id`: Manager-only rate and capacity management.
- [ ] `PATCH /api/v1/rooms/:id/status`: Receptionist/Manager room operational status updates (`available`, `cleaning`, `maintenance`, `occupied`).
- [ ] Implement parameterized SQLite query filters to prevent SQL injection in filter fields (`type`, `min_price`, `max_price`).

---

## 3. Security Deliverables (Stages 3–7)

- **Stage 3 (Security Requirement SR03)**: Require Manager/Receptionist authorization and input sanitization for operational status and rate changes. Map to CWE-862 / OWASP ASVS V4.
- **Stage 4 (Secure Coding Practice)**: Parameterized SQL query filtering & role authorization for room rates. Write tests:
  1. Valid room status update by Receptionist.
  2. Unauthorized room rate alteration attempt by Guest.
- **Stage 5 (Vulnerability Verification)**: Verification of SQL parameterization and authorization on room endpoints.
- **Stage 6 (Intrusion Detection)**: Detection rule for unexpected or bulk price modification operations.

---

## 4. Acceptance Criteria
- [ ] Guests can view available rooms but cannot create or modify rooms.
- [ ] Managers can update prices and room details.
- [ ] Receptionists can update room operational statuses (`cleaning`, `available`).
- [ ] Room query filters utilize strictly parameterized SQL.
