### AC10 - Receptionist Password Disclosure

Actor: malicious Manager.

Goal: obtain Receptionist credentials and sell or leak them.

Conditions: the system exposes Receptionist passwords or reusable credentials in the employee management module.

Abuse flow:
1. Malicious Manager logs in with valid credentials.
2. Manager opens the employee management module.
3. Manager views Receptionist passwords exposed by the system.
4. Manager leaks, sells, or misuses the credentials.

Impact: sensitive credential exposure, account takeover risk, credential sale, and reduced system security.

Related STRIDE categories: Information Disclosure

