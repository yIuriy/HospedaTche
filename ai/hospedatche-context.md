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

## AI Working Guidance

- Keep docs in English.
- Keep UI strings in Portuguese only when building frontend screens.
- Keep security analysis concrete to hotel accommodation workflows.
- Prefer tables for STRIDE threats and abuse case traceability.
- Store future diagrams under `artifacts/diagrams/`.
- Use Mermaid `.mmd` files for diagrams when possible.
