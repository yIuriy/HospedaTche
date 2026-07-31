# Stage 1 — Balanced Task Distribution by System Module

## Group Members
- **Member 1 (User / Lead)**: Iuri — User Registration & Identity Module
- **Member 2**: Sidnei — Authentication & Access Control Module
- **Member 3**: Lara — Accommodation & Listing Management Module
- **Member 4**: Dyonathan — Booking & Payment Transactions Module
- **Member 5**: Rafaela — Search, Reviews & Messaging Module

---

## Overview & Equal Distribution Strategy

This task distribution organizes **Stage 1: Abuse Cases and Threat Modeling with STRIDE** for **HospedaTche** across **5 group members**. 

Every member has an **equal workload**:
1. One global section requirement from `enunciado.md`.
2. One specific **System Module**.
3. Specific **STRIDE Threat Modeling** categories for their module.
4. **Two concrete Abuse Cases** (CA01 through CA10).
5. Clear separation between **Mandatory Tasks** (required by `enunciado.md`) and **Optional Tasks** (diagrams, mitigation proposals).

---

## 📌 Equal Workload Matrix

| Member | Name | Assigned System Module | Global Section (Required) | STRIDE Categories | Mandatory Abuse Cases | Optional / Complementary Tasks |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Member 1** | **Iuri** | **User Registration & Identity** | Section 4.1 & 4.2 (System Overview) | **Spoofing** | CA01, CA02 | Context Diagram (Mermaid) |
| **Member 2** | **Sidnei** | **Auth & Access Control** | Section 4.3 (User Profiles & Roles) | **Elevation of Privilege** | CA03, CA04 | Use Case Diagram |
| **Member 3** | **Lara** | **Listing & Accommodations** | Section 4.3 (Protected Asset Catalog) | **Tampering** (Listings) | CA05, CA06 | Data Flow Diagram (DFD Level 1) |
| **Member 4** | **Dyonathan** | **Booking & Payments** | Section 4.4 (Textual Architecture Flow) | **Repudiation** & **Tampering** | CA07, CA08 | Payment Sequence Diagram |
| **Member 5** | **Rafaela** | **Search, Reviews & Messaging** | Section 4.7 (Final Considerations) | **Denial of Service** & **Info Disclosure** | CA09, CA10 | Abuse Case Diagram & Mitigations |

---

## Detailed Member Breakdown

### 👤 Member 1 (Iuri): User Registration & Identity Module

#### ✅ Mandatory Tasks (Required by `enunciado.md`)
- [ ] **Task 1.1: System Identification (Section 4.1)**
  - Write system name, group members list, repository link, and system selection rationale.
- [ ] **Task 1.2: System Description (Section 4.2)**
  - Describe problem solved, target users, main capabilities, and stored/transmitted data.
- [ ] **Task 1.3: STRIDE Threats — Spoofing (Section 4.5)**
  - Model identity spoofing threats (fake identity registration, stolen credential usage).
- [ ] **Task 1.4: Abuse Cases (Section 4.6)**
  - **CA01 — Fake User Registration**: Malicious actor creates accounts with unverified or stolen personal data.
  - **CA02 — Account Hijacking via Credential Spoofing**: Attacker impersonates legitimate user via session/credential theft.

#### 💡 Optional / Complementary Tasks (Not explicitly required, section 1 & 4.4)
- [ ] **Task 1.5 (Optional): System Context Diagram**
  - Create a Mermaid Context Diagram showing external entities and HospedaTche boundaries.

---

### 👤 Member 2 (Sidnei): Authentication & Access Control Module

#### ✅ Mandatory Tasks (Required by `enunciado.md`)
- [ ] **Task 2.1: Users & Access Profiles Catalog (Section 4.3)**
  - Detail user categories (Guest, Manager/Host, Administrator) and access permissions.
- [ ] **Task 2.2: STRIDE Threats — Elevation of Privilege (Section 4.5)**
  - Model privilege escalation threats (Guest-to-Manager, Manager-to-Admin access bypass).
- [ ] **Task 2.3: Abuse Cases (Section 4.6)**
  - **CA03 — Unauthorized Admin Elevation**: Attacker exploits endpoint authorization flaw to gain admin privileges.
  - **CA04 — Broken Object Level Access Control**: User accesses or modifies another user's private data.

#### 💡 Optional / Complementary Tasks
- [ ] **Task 2.4 (Optional): Use Case / Access Role Diagram**
  - Draw a visual diagram representing roles and boundary limits.

---

### 👤 Member 3 (Lara): Accommodation & Listing Management Module

#### ✅ Mandatory Tasks (Required by `enunciado.md`)
- [ ] **Task 3.1: Protected Asset Catalog (Section 4.3)**
  - Catalog protected assets (property listings, room pricing, availability calendars, host verification data).
- [ ] **Task 3.2: STRIDE Threats — Tampering (Section 4.5)**
  - Model tampering threats (unauthorized price changes, calendar manipulation, listing distortion).
- [ ] **Task 3.3: Abuse Cases (Section 4.6)**
  - **CA05 — Unauthorized Room Rate Tampering**: User manipulates client payload to alter price per night.
  - **CA06 — Fake Host & Listing Fraud**: Attacker publishes fake property listing to steal advance booking deposits.

#### 💡 Optional / Complementary Tasks
- [ ] **Task 3.4 (Optional): Data Flow Diagram (DFD Level 1)**
  - Create a DFD illustrating data movement between hosts, listings, and database.

---

### 👤 Member 4 (Dyonathan): Booking & Payment Transactions Module

#### ✅ Mandatory Tasks (Required by `enunciado.md`)
- [ ] **Task 4.1: Textual Architecture & Flow Overview (Section 4.4)**
  - Write textual summary of booking lifecycle, payment flows, and data interaction points.
- [ ] **Task 4.2: STRIDE Threats — Repudiation & Financial Tampering (Section 4.5)**
  - Model repudiation threats (denying booking creation, refund requests, or payment authorizations without audit logs).
- [ ] **Task 4.3: Abuse Cases (Section 4.6)**
  - **CA07 — Payment Gateway Token Tampering**: Attacker manipulates payment response tokens to confirm reservations without paying.
  - **CA08 — Fraudulent Booking Cancellation & Repudiation**: User cancels reservation fraudulently and denies performing the action.

#### 💡 Optional / Complementary Tasks
- [ ] **Task 4.4 (Optional): Payment & Booking Sequence Diagram**
  - Create sequence diagram showing interaction with external payment gateway.

---

### 👤 Member 5 (Rafaela): Search, Reviews & Messaging Module

#### ✅ Mandatory Tasks (Required by `enunciado.md`)
- [ ] **Task 5.1: Final Considerations & Synthesis (Section 4.7)**
  - Synthesize top threats, critical assets, highest impact abuse scenarios, and team challenges during analysis.
- [ ] **Task 5.2: STRIDE Threats — Denial of Service & Information Disclosure (Section 4.5)**
  - Model DoS threats (bot search spamming, room inventory holding) and Information Disclosure (guest chat leaks).
- [ ] **Task 5.3: Abuse Cases (Section 4.6)**
  - **CA09 — Automated Bot Inventory Lockout**: Bot network holds room reservations temporarily to block legitimate guests.
  - **CA10 — Private Chat Scraping & Review Manipulation**: Attacker intercepts private messages or posts fake rating reviews.

#### 💡 Optional / Complementary Tasks
- [ ] **Task 5.4 (Optional): Abuse Case Diagram & Initial Mitigation Plan**
  - Create visual abuse case diagram and outline initial security defense suggestions.

---

## 📝 Commit Guidelines for Group Members

Each member must commit their work individually using clear commit messages:

- Member 1 (Iuri): `Add system description, Section 4.1/4.2, spoofing threats, and CA01/CA02`
- Member 2 (Sidnei): `Add user profiles catalog, Section 4.3, elevation of privilege threats, and CA03/CA04`
- Member 3 (Lara): `Add protected asset catalog, tampering threats, and CA05/CA06`
- Member 4 (Dyonathan): `Add booking flow summary, Section 4.4, repudiation threats, and CA07/CA08`
- Member 5 (Rafaela): `Add final considerations, Section 4.7, DoS/Info Disclosure threats, and CA09/CA10`
