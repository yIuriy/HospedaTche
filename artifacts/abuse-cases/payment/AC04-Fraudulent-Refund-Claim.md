### AC04 - Fraudulent Refund Claim

Actor: malicious Guest.

Goal: receive the refund for another Guest's cancelled booking.

Conditions: the system fails to properly validate the identity of the refund recipient.

Abuse flow:
1. Attacker obtains information about another Guest's cancelled booking.
2. Attacker submits a refund request using the victim's booking information.
3. The system fails to verify the legitimate refund recipient.
4. The refund is transferred to the attacker's account.

Impact: unauthorized refunds, financial losses, customer disputes, and compromised payment integrity.

Related STRIDE categories: Spoofing
