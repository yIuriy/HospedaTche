# Stage 1 - Threat Modeling and Abuse Case Task Division

This document defines the minimum Stage 1 work division for HospedaTche. Each member owns a system area and must connect requirements, assets, STRIDE threats, and abuse cases.

## Shared Goal

Describe how HospedaTche can be attacked or misused before proposing implementation controls.

```text
requirements -> assets and actors -> trust boundaries -> STRIDE threat -> abuse case -> mitigation direction
```

## Shared Rules

- Keep repository artifacts in English.
- Use the existing STRIDE and abuse-case templates.
- Keep threat and abuse-case IDs unique inside each module.
- Link each threat to at least one relevant abuse case when applicable.
- Link artifacts to the affected RFs, NFRs, assets, actors, and components.
- Describe attacker goal, preconditions, attack flow, impact, and mitigation direction.
- Do not require implementation evidence in Stage 1.
- Update the central threat and abuse-case maps.

## Minimum Deliverable

Each assigned module must contain:

- relevant STRIDE threats;
- related abuse cases;
- affected assets and actors;
- requirements and business-rule references;
- attack preconditions and steps;
- security impact and suggested mitigations;
- entries in the central maps;
- successful validation of changed artifacts.

## Member Assignment

| Member | Name | Scope | Main Paths |
| --- | --- | --- | --- |
| 1 | Iuri | User registration and identity | `artifacts/threat-modeling/accounts/` and `artifacts/abuse-cases/accounts/` |
| 2 | Sidnei | Authentication and access control | `artifacts/threat-modeling/accounts/` and `artifacts/abuse-cases/accounts/` |
| 3 | Lara | Accommodation and room operations | `artifacts/threat-modeling/accommodation/` and `artifacts/abuse-cases/accommodation/` |
| 4 | Dyonathan | Booking and payment | Booking and payment folders under threat modeling and abuse cases |
| 5 | Rafaela | Search, reviews, notifications, and messaging | `artifacts/threat-modeling/search-messaging/` and `artifacts/abuse-cases/search-messaging/` |

## Member 1 - Iuri

Minimum work:

- review fake registration and unverified identity abuse;
- review account takeover and password-recovery abuse;
- review CPF/email enumeration and profile-data exposure;
- confirm links to RF01-RF10 and related NFRs;
- coordinate account artifact IDs with Sidnei.

Expected output: complete identity-focused threats and abuse cases in the shared accounts module.

## Member 2 - Sidnei

Minimum work:

- review login, session fixation, hijacking, and session invalidation;
- review protected-route authorization and role elevation;
- review staff hierarchy and privileged account abuse;
- confirm links to access-control RFs and NFRs;
- coordinate account artifact IDs with Iuri.

Expected output: complete authentication and authorization threats and abuse cases in the shared accounts module.

## Member 3 - Lara

Minimum work:

- review room availability, status, rate, and capacity manipulation;
- review cleaning, maintenance, check-in, and check-out operations;
- review exposure of internal room and staff information;
- confirm links to RF14-RF21, RF35-RF40, and related NFRs.

Expected output: complete accommodation threats and abuse cases.

## Member 4 - Dyonathan

Minimum work:

- review booking creation, cancellation, expiration, and state changes;
- review payment confirmation, reference substitution, refunds, and synchronization;
- review financial-data exposure and transaction repudiation;
- confirm links to RF22-RF34 and related NFRs.

Expected output: complete booking and payment threats and abuse cases in their separate module folders.

## Member 5 - Rafaela

Minimum work:

- review automated search overload and hidden-room enumeration;
- review chat flooding, spoofing, exposure, and history tampering;
- review notification and review manipulation;
- confirm links to RF11-RF13, RF18-RF21, RF41-RF47, and related NFRs.

Expected output: complete search and messaging threats and abuse cases.

## Shared Final Review

Confirm that:

- every artifact follows its template;
- IDs and filenames agree;
- threat categories match the described behavior;
- threat-to-abuse-case links are valid;
- requirements and affected assets are identified;
- central maps include all completed artifacts;
- no mitigation is presented as already implemented without evidence.

## Validation

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-stride-threats.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-abuse-cases.ps1
```

---

# Stage 1 - Threat Modeling and Abuse Case Task Division (Operational Guide)

## Shared Goal

Describe how HospedaTche can be attacked or misused before proposing implementation controls.

```text
requirements -> assets and actors -> trust boundaries -> STRIDE threat -> abuse case -> mitigation direction
```

## Minimum Deliverable

- relevant STRIDE threats in each module;
- related abuse cases;
- affected assets, actors, requirements, and rules;
- attack preconditions and steps;
- impact and mitigation directions;
- updated central maps;
- validators successfully run.

## Task Division by Member

| Member | Minimum Scope | Expected Output |
| --- | --- | --- |
| Iuri | Fake registration, unverified identity, account takeover, password recovery, CPF/email enumeration, and profile exposure. | Identity threats and abuse cases in `accounts/` |
| Sidnei | Login, sessions, protected routes, roles, internal hierarchy, and privilege escalation. | Access threats and abuse cases in `accounts/` |
| Lara | Availability, status, rate, capacity, cleaning, maintenance, check-in, and check-out. | Accommodation threats and abuse cases |
| Dyonathan | Booking creation and cancellation, expiration, payment, refund, synchronization, and auditing. | Booking and payment threats and abuse cases |
| Rafaela | Search overload, hidden rooms, chat, notifications, reviews, and message history. | Search and messaging threats and abuse cases |

Iuri and Sidnei must coordinate IDs because they work in the same accounts module.

## Final Review

- verify template, ID, and filename;
- verify STRIDE category and link to abuse cases;
- verify affected requirements and assets;
- update central maps;
- do not declare controls as implemented without evidence.

## Validation

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-stride-threats.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-abuse-cases.ps1
```
