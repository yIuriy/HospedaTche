# ISSUE-00: Backend & Frontend Architecture Bootstrap

**Assigned To**: Lead / Shared Team Task  
**Timeline**: Day 1 (Morning)  
**Module**: Base System Infrastructure

---

## 1. Description & Context
Set up the initial Node.js Express backend and Vite frontend structure in `system/backend` and `system/frontend`. Create the base database connection with SQLite (`better-sqlite3` or `sqlite3`) and establish the fundamental JWT authentication and role-based access control (RBAC) middleware foundation.

---

## 2. Technical Tasks

### Backend Infrastructure (`system/backend`)
- [ ] Initialize `package.json` with dependencies: `express`, `cors`, `helmet`, `dotenv`, `jsonwebtoken`, `bcrypt`, `better-sqlite3` (or `sqlite3`), `zod`.
- [ ] Setup `src/server.js` and `src/app.js` with Security Middlewares: `helmet()`, CORS configuration, `express.json()` with size limits.
- [ ] Implement database initialization script in `src/config/database.js`:
  - `users` table (`id`, `name`, `email`, `cpf`, `password_hash`, `role`, `created_at`)
  - `rooms` table (`id`, `number`, `type`, `price_per_night`, `status`, `capacity`)
  - `bookings` table (`id`, `guest_id`, `room_id`, `check_in`, `check_out`, `total_price`, `status`, `created_at`)
  - `payments` table (`id`, `booking_id`, `amount`, `status`, `transaction_ref`, `created_at`)
  - `reviews` table (`id`, `guest_id`, `booking_id`, `rating`, `comment`, `status`, `created_at`)
  - `audit_logs` table (`id`, `user_id`, `action`, `resource`, `ip_address`, `timestamp`)
- [ ] Implement centralized error handler (`src/middlewares/errorHandler.js`) ensuring stack traces and internal secrets are hidden in production outputs.

---

## 3. Acceptance Criteria
- [ ] `npm start` in `system/backend` boots server cleanly on configured port.
- [ ] SQLite database file is created and tables are migrated automatically.
- [ ] Centralized error handler catches unhandled rejections and returns standardized JSON `{ "error": "Internal server error" }` without leaking traces.
- [ ] Stage 3 secure architecture diagram updated and versioned in `artifacts/diagrams/`.
