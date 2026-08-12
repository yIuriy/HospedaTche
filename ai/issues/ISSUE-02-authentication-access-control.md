# ISSUE-02: Authentication & Access Control (RBAC)

**Assigned To**: Sidnei  
**Timeline**: Days 1 - 2  
**Module**: Authentication and Access Control  

---

## 1. Description & Context
Implement user login, JWT issue and verification middleware, server-side Role-Based Access Control (RBAC) guards (`Guest`, `Receptionist`, `Manager`, `Administrator`), session invalidation, and privileged internal account governance endpoints.

---

## 2. Technical Implementation Tasks

### Backend (`system/backend/src/routes/auth.js` & `src/middlewares/auth.js`)
- [ ] `POST /api/v1/auth/login`:
  - Validate credentials using `bcrypt.compare()`.
  - Issue signed JWT containing `{ userId, role }` with expiration (e.g., 2h).
  - Log audit record for login attempt (success/failure).
- [ ] Authentication Middleware (`authenticateToken`):
  - Extract JWT from `Authorization: Bearer <token>` header.
  - Verify signature and attach decoded payload to `req.user`.
- [ ] Authorization Middleware (`requireRole(...roles)`):
  - Enforce server-side access control based on `req.user.role`.
- [ ] `POST /api/v1/admin/users`:
  - Administrator-only endpoint to promote/create `Receptionist` or `Manager` staff accounts.

---

## 3. Security Deliverables (Stages 3–7)

- **Stage 3 (Security Requirement SR02)**: Server-side RBAC enforcement for all protected routes (preventing Broken Access Control / IDOR). Map to CWE-285 / OWASP Top 10 A01:2021.
- **Stage 4 (Secure Coding Practice)**: JWT validation and server-side authorization middleware. Write tests:
  1. Valid token + authorized role access test.
  2. Forged token or privilege escalation attempt (Guest calling Admin endpoint).
- **Stage 5 (Vulnerability Verification)**: Access control bypass tests.
- **Stage 6 (Intrusion Detection)**: Detection rule for brute-force login attempts or privilege escalation patterns.

---

## 4. Acceptance Criteria
- [ ] Successful login returns signed JWT token.
- [ ] Protected endpoints reject unauthenticated requests with HTTP 401.
- [ ] Guest token attempting Manager/Admin endpoint is rejected with HTTP 403 Forbidden.
- [ ] Password hashes or token secrets are never exposed in responses or logs.
