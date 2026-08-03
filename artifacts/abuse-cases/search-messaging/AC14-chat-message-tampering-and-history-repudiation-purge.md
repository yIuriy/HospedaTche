### AC14 - Chat Message Tampering And History Repudiation Purge

Actor: malicious guest or staff member involved in a dispute.

Goal: alter past sent chat messages or permanently delete chat conversation history to cover up misconduct and claim innocence.

Conditions: chat API endpoints allow retroactively updating message text or deleting chat logs without keeping immutable audit records.

Abuse flow:
1. Attacker sends offensive, abusive, or fraudulent messages in the reception chat.
2. A dispute arises or hotel management opens an investigation.
3. Attacker issues direct API calls to modify sent message contents or purge the conversation history.
4. System updates or deletes the records without leaving an immutable audit trail.
5. Attacker claims innocence, stating the system lost the records or that the other party fabricated the claims.

Impact: non-repudiation failure, loss of dispute evidence, and compromised chat integrity.

Related STRIDE categories: Repudiation, Tampering
