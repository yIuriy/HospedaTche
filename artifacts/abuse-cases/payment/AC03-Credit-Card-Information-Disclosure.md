### AC03 - Credit Card Information Disclosure

Actor: malicious user.

Goal: obtain unauthorized access to Guests' payment information.

Conditions: the system fails to properly protect or restrict access to payment information.

Abuse flow:
1. Attacker accesses the payment management functionality.
2. The system exposes payment records belonging to other Guests.
3. Attacker obtains credit card information or payment credentials associated with completed bookings.
4. Attacker uses the exposed payment information for fraudulent transactions or unauthorized purchases.

Impact: exposure of sensitive financial information, fraudulent transactions, financial losses, regulatory non-compliance, and loss of customer trust.

Related STRIDE categories: Information Disclosure
