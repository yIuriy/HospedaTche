# HospedaTche AI Context

## System Summary

HospedaTche is a hotel accommodation system. It may support guests, hotel staff, administrators, and possibly accommodation owners or managers.

## Likely User Profiles

- Guest: searches accommodations, creates reservations, manages profile data, submits reviews.
- Hotel manager: manages rooms, prices, availability, booking status, and guest communication.
- Administrator: manages users, permissions, system configuration, and audit needs.
- Payment provider: external service involved in payment authorization and transaction status.

## Likely Protected Assets

- user accounts and credentials;
- personal data;
- booking and reservation records;
- room availability and prices;
- payment data and transaction references;
- messages and reviews;
- admin actions and audit logs;
- application database and APIs.

## Initial Security Concerns

- account takeover using stolen credentials;
- fake accommodation or fake booking records;
- unauthorized price, date, or availability changes;
- exposure of guest personal data;
- denial of service during booking flow;
- privilege escalation from guest or manager to admin.

## Stage 2 Risk Analysis Context

Stage 2 continues Stage 1. Do not replace STRIDE threats or abuse cases; use them as input for risk analysis, prioritization, and treatment planning.

Expected Stage 2 outputs:

- probability criteria using a 1 to 4 scale;
- impact criteria using a 1 to 4 scale;
- risk register derived from Stage 1 threats and abuse cases;
- score calculation: probability x impact;
- risk levels: low, medium, high, critical;
- justification for probability, impact, and priority;
- treatment strategy for each risk: avoid, reduce, share, or accept;
- mapping to NIST CSF 2.0 functions: Govern, Identify, Protect, Detect, Respond, Recover;
- concrete proposed controls, responsible parties, verification evidence, and expected residual risk;
- initial implementation order for controls.

Stage 2 does not require implementing controls. Proposed controls must be specific and observable, not generic security intentions.

## AI Working Guidance

- Keep docs in English.
- Keep UI strings in Portuguese only when building frontend screens.
- Keep security analysis concrete to hotel accommodation workflows.
- Prefer tables for STRIDE threats and abuse case traceability.
- Store future diagrams under `artifacts/diagrams/`.
- Use Mermaid `.mmd` files for diagrams when possible.
- Store abuse cases under `artifacts/abuse-cases/<module>/ACNN-short-title.md`.
- Track abuse cases in `artifacts/abuse-cases/abuse-case-map.md`.
- Store STRIDE threats under `artifacts/threat-modeling/<module>/TNN-short-title.md`.
- Track STRIDE threats in `artifacts/threat-modeling/threat-map.md`.
- Store Stage 2 risk analysis and treatment artifacts under `artifacts/risk-treatment/`.
- Keep repository validations documented in `README.md`.
- Git validations are stored in `.githooks/` and enabled with `git config core.hooksPath .githooks`.
