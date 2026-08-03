### AC13 - Guest Privilege Escalation To Receptionist Chat Queue

Actor: malicious guest.

Goal: elevate privileges from guest to receptionist to gain access to the master staff chat queue and control all guest communications.

Conditions: staff chat queue API endpoints fail to enforce server-side role validation for receptionist credentials.

Abuse flow:
1. Malicious guest logs into the system with a standard guest account.
2. Attacker modifies HTTP request headers or role tokens targeting the staff chat queue endpoints.
3. System fails to validate receptionist role and grants access to the master receptionist queue.
4. Attacker reads, intercepts, and answers all incoming guest chat requests as an unauthorized staff member.

Impact: unauthorized access to all guest communications, staff identity spoofing, and total breakdown of guest privacy.

Related STRIDE categories: Elevation of Privilege, Information Disclosure
