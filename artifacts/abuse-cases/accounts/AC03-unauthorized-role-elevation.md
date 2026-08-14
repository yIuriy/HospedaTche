### AC03 - Unauthorized Role Elevation

Actor: malicious guest or receptionist user.

Goal: gain unauthorized administrative or managerial privileges within HospedaTche to manipulate system rules, access restricted guest data, or create internal staff accounts.

Conditions: the system's role-assignment API endpoints or session tokens lack strict server-side authorization validation during account updates or profile modifications.

Abuse flow:
1. Attacker authenticates as a low-privileged user (e.g., Guest or Receptionist).
2. Attacker intercepts an account update or API request payload.
3. Attacker modifies request parameters, JSON body, or session tokens to include elevated role attributes (e.g., role: "Manager" or role: "Administrator").
4. System processes the update without re-verifying if the current user possesses authorization to assign higher roles.
5. Attacker gains elevated privileges and accesses administrative management functions.

Impact: compromise of system governance, unauthorized access to sensitive financial and audit reports, illegal account creation, and loss of system integrity.

Related STRIDE categories: Elevation of Privilege, Tampering
