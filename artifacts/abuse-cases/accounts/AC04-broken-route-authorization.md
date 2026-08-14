### AC04 - Broken Route Authorization

Actor: authenticated guest or unauthenticated user.

Goal: access restricted internal application routes and management interfaces reserved for staff (Receptionist, Manager, Administrator).

Conditions: front-end routing hides UI navigation links based on roles but back-end endpoint controllers fail to enforce strict server-side role checks for protected routes and REST endpoints.

Abuse flow:
1. Attacker logs into the application as a Guest or accesses the system without authorization.
2. Attacker manually navigates to internal URL routes (e.g., `/admin/audit`, `/manager/rates`, or `/staff/checkin`).
3. Attacker directly invokes internal API endpoints corresponding to those routes.
4. Back-end server processes the request relying solely on client-side routing logic or weak endpoint checks.
5. Attacker successfully views or executes actions on staff-only management interfaces.

Impact: exposure of operational data, unauthorized administrative actions, breach of role isolation boundaries, and privilege escalation.

Related STRIDE categories: Elevation of Privilege, Information Disclosure
