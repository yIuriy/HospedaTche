### AC12 - Misdirected Chat Billing Request And Staff Message Spoofing

Actor: malicious receptionist or attacker with hijacked chat queue access.

Goal: send fraudulent billing requests or misdirect sensitive stay charges to an unintended guest chat conversation.

Conditions: chat queue interface lacks conversation session binding and verification before sending payment links or billing messages.

Abuse flow:
1. Attacker accesses the staff chat queue interface.
2. Attacker selects an active chat session belonging to Guest A.
3. Attacker sends a payment request link or invoice meant for Guest B or a fake payment link.
4. Guest A receives the misdirected or fraudulent billing request and pays for charges belonging to another guest or attacker.

Impact: guest financial loss, misdirected billing, privacy breach, and operational liability.

Related STRIDE categories: Spoofing, Tampering
