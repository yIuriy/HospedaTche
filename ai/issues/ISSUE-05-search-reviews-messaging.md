# ISSUE-05: Search, Reviews & Guest Messaging

**Assigned To**: Rafaela  
**Timeline**: Days 2 - 3  
**Module**: Search, Reviews, Notifications, and Messaging  

---

## 1. Description & Context
Implement availability search filters, stay reviews and moderation, guest-reception chat queue, and security notification preferences. Ensure user-submitted chat messages and review comments are properly sanitized against XSS attacks before storage and rendering.

---

## 2. Technical Implementation Tasks

### Backend (`system/backend/src/routes/search.js`, `src/routes/reviews.js`, `src/routes/chat.js`)
- [ ] `GET /api/v1/search/rooms`: Search available rooms by date range, capacity, and price with sanitized input query parameters.
- [ ] `POST /api/v1/reviews`: Allow guests with completed bookings to submit reviews (rating 1-5, comment). HTML sanitize review body.
- [ ] `GET /api/v1/reviews`: List approved public reviews.
- [ ] `POST /api/v1/chat/messages`: Send guest-to-reception support messages with sanitization and length limits.
- [ ] `GET /api/v1/chat/messages`: Retrieve chat history for authenticated guest or staff.

---

## 3. Security Deliverables (Stages 3–7)

- **Stage 3 (Architecture Decisions AD01-AD03)**: Document AD01, AD02, AD03 (Server validation, sanitized output, audit logging) mapping risk, component, and expected outcome.
- **Stage 4 (Secure Coding Practice)**: Input sanitization & HTML encoding for reviews and messaging. Write tests:
  1. Valid review creation test.
  2. Stored XSS injection attempt in review comment (`<script>alert(1)</script>`).
- **Stage 5 (Vulnerability Verification)**: Verification report for XSS and chat privacy.
- **Stage 6 (Intrusion Detection)**: Detection rule for spam/XSS payloads or automated chat abuse.

---

## 4. Acceptance Criteria
- [ ] Availability search accurately filters available rooms for date range.
- [ ] Reviews are restricted to guests with confirmed/completed bookings.
- [ ] Review comments and chat messages strip or encode dangerous script tags.
- [ ] AD01, AD02, and AD03 are fully justified and documented in repository artifacts.
