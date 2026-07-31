### AC18 - Guest CPF Enumeration

Actor: malicious user.

Goal: discover whether a CPF is registered in the system.

Conditions: the system returns different messages or behavior when a CPF exists or does not exist.

Abuse flow:
1. Attacker prepares a list of CPF values.
2. Attacker submits CPF values through registration, recovery, or account lookup flows.
3. System response reveals which CPF values already exist.
4. Attacker uses confirmed CPF data for phishing, fraud, or targeted account attacks.

Impact: personal data exposure, privacy violation, targeted phishing, and increased risk of account attacks.

Related STRIDE categories: Information Disclosure

