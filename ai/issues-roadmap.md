# HospedaTche - 3-Day Development & Security Issue Roadmap

## Sprint Overview

- **Timeline**: 3 Days
- **Backend Stack**: Node.js + Express + SQLite (`better-sqlite3` or `sqlite3`)
- **Frontend Stack**: Vite (React/JS) or HTML5/JavaScript
- **Security Baseline**:
  - Passwords: `bcrypt` (minimum 10 rounds)
  - Auth & RBAC: JWT tokens + server-side role middleware (`Guest`, `Receptionist`, `Manager`, `Administrator`)
  - Database: Parameterized SQL queries (zero string concatenation)
  - Validation: Input validation & sanitization (`Zod` or `express-validator`)
  - Audit & Errors: Standardized JSON logger (no password/token leakage)

---

## Member Allocation & Vertical Slices

| Issue ID | Owner | Module | Primary Focus & Deliverables |
| :--- | :--- | :--- | :--- |
| [`ISSUE-00`](file:///home/sidnei/Documents/Repositories/unipampa/ead/HospedaTche/ai/issues/ISSUE-00-architecture-bootstrap.md) | Lead / Group | Architecture & Bootstrap | Project setup, Express + SQLite base, JWT/RBAC middleware, SQLite schema, Stage 3 diagram |
| [`ISSUE-01`](file:///home/sidnei/Documents/Repositories/unipampa/ead/HospedaTche/ai/issues/ISSUE-01-user-registration-identity.md) | Iuri | User Registration & Identity | Guest registration, CPF/Email sanitization, password hashing, profile management, SR01 / Stage 4 practice |
| [`ISSUE-02`](file:///home/sidnei/Documents/Repositories/unipampa/ead/HospedaTche/ai/issues/ISSUE-02-authentication-access-control.md) | Sidnei | Authentication & Access Control | Login API, JWT generation/verification, RBAC route guards, privileged staff endpoints, SR02 / Stage 4 practice |
| [`ISSUE-03`](file:///home/sidnei/Documents/Repositories/unipampa/ead/HospedaTche/ai/issues/ISSUE-03-accommodation-room-operations.md) | Lara | Accommodation & Room Operations | Room management APIs, availability schedules, status updates (cleaning/maintenance), SR03 / Stage 4 practice |
| [`ISSUE-04`](file:///home/sidnei/Documents/Repositories/unipampa/ead/HospedaTche/ai/issues/ISSUE-04-booking-payment.md) | Dyonathan | Booking & Payment | Booking creation, payment mock provider integration, status sync, cancellation & refund rules |
| [`ISSUE-05`](file:///home/sidnei/Documents/Repositories/unipampa/ead/HospedaTche/ai/issues/ISSUE-05-search-reviews-messaging.md) | Rafaela | Search, Reviews & Messaging | Room availability search, guest-staff chat queue, stay review submission & moderation |

---

## Stage Deliverables Mapping (Stages 3 to 7)

Each member's vertical slice issue incorporates required course deliverables:
- **Stage 3 (Secure Architecture)**: SR01 (Iuri), SR02 (Sidnei), SR03 (Lara), Architecture Diagram (Dyonathan), Architecture Decisions AD01-AD03 (Rafaela).
- **Stage 4 (Secure Code & Tests)**: Secure coding practice + 2 tests (1 valid, 1 malicious) per member.
- **Stage 5 (Vulnerability Verification)**: Verification report per member module.
- **Stage 6 (Intrusion Detection)**: Log formats & detection rules per member module.
- **Stage 7 (DevSecOps & Video)**: CI pipeline config & demo script.
