# ISSUE-04: Booking & Payment Lifecycle

**Assigned To**: Dyonathan  
**Timeline**: Days 2 - 3  
**Module**: Booking and Payment  

---

## 1. Description & Context
Implement reservation lifecycle management (check-in/check-out dates validation, double-booking prevention, voucher generation), payment provider webhook/mock integration, and transaction audit trails.

---

## 2. Technical Implementation Tasks

### Backend (`system/backend/src/routes/bookings.js` & `src/routes/payments.js`)
- [ ] `POST /api/v1/bookings`:
  - Verify room availability for requested date range (`check_in` < `check_out`).
  - Calculate total amount server-side based on room rate (never trust client total).
  - Create pending reservation in transaction block.
- [ ] `POST /api/v1/payments/process`:
  - Mock external payment gateway integration.
  - Synchronize payment status (`paid`, `failed`, `refunded`).
  - Update booking status upon successful payment confirmation.
- [ ] `POST /api/v1/bookings/:id/cancel`:
  - Process cancellation and check refund rules based on policy days remaining.
- [ ] Audit log entry created for each booking state transition and payment event.

---

## 3. Security Deliverables (Stages 3–7)

- **Stage 3 (Architecture Diagram)**: Lead the updated Mermaic/PNG architecture diagram in `artifacts/diagrams/` depicting payment provider boundary, DB, app, and auth controls.
- **Stage 4 (Secure Coding Practice)**: Server-side price calculation and atomic transaction handling. Write tests:
  1. Valid reservation and payment flow.
  2. Malicious client-side price tampering payload attempt (sending total_price: 0.01).
- **Stage 5 (Vulnerability Verification)**: Verification of transaction state transitions and price integrity.
- **Stage 6 (Intrusion Detection)**: Detection rule for suspicious refund requests or repeated payment failure webhooks.

---

## 4. Acceptance Criteria
- [ ] Reservations correctly block overlapping dates for the same room.
- [ ] Total payment amount is strictly calculated on backend from database room rates.
- [ ] Payment state changes trigger audit logs.
- [ ] Cancellation policies correctly authorize refunds.
