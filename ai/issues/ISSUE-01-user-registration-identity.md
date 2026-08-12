# ISSUE-01: User Registration & Identity Management

**Assigned To**: Iuri  
**Timeline**: Days 1 - 2  
**Module**: User Registration and Identity  

---

## 1. Description & Context
Implement secure guest registration, profile querying, and credential update logic. Ensure strict validation of personal identifiers (CPF format, valid email syntax), secure password hashing before persistence, and defense against account enumeration or identity tampering.

---

## 2. Technical Implementation Tasks

### Backend (`system/backend/src/routes/identity.js`)
- [ ] `POST /api/v1/auth/register`:
  - Validate input body via Zod schema (`email`, `cpf`, `password`, `full_name`).
  - Check for existing account by email or CPF using parameterized query.
  - Hash password using `bcrypt.hash(password, 10)`.
  - Insert user with default role `Guest`.
  - Return HTTP 201 with non-sensitive user metadata (exclude `password_hash`).
- [ ] `GET /api/v1/users/me`:
  - Return profile details for authenticated user based on JWT context.
- [ ] `PUT /api/v1/users/me`:
  - Allow guest to update profile info with input sanitization.

---

## 3. Security Deliverables (Stages 3–7)

- **Stage 3 (Security Requirement SR01)**: Define SR01 for Identity (e.g., Re-authentication requirement before changing password/email). Map to CWE-306 / OWASP ASVS V2.
- **Stage 4 (Secure Coding Practice)**: Secure Password Hashing & Registration Validation. Write unit test:
  1. Valid registration test.
  2. Malicious payload test (SQL injection in email/CPF or weak password).
- **Stage 5 (Vulnerability Verification)**: Verification report for account creation endpoints.
- **Stage 6 (Intrusion Detection)**: Detection rule for excessive account registration attempts from single IP.

---

## 4. Acceptance Criteria
- [ ] Guest can register via API with valid payload.
- [ ] Duplicate CPF or email registration returns HTTP 409 Conflict without leaking existing user sensitive data.
- [ ] Passwords stored in SQLite are strictly `bcrypt` hashes.
- [ ] Unit/Integration tests pass for registration flow.
