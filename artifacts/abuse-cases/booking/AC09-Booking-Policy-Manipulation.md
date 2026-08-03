### AC09 - Booking Policy Manipulation

Actor: malicious user.

Goal: modify booking policies to obtain unauthorized financial benefits.

Conditions: the attacker gains Administrator privileges or exploits insufficient access control over booking policy management.

Abuse flow:
1. Attacker gains access to an Administrator account.
2. Attacker accesses the booking policy management functionality.
3. Attacker modifies booking rules, such as increasing the refund percentage or extending the cancellation deadline.
4. Attacker creates or cancels bookings under the modified policies.
5. The system applies the manipulated policies, granting benefits that would not normally be allowed.

Impact: unauthorized refunds, financial losses, inconsistent booking policies, abuse of administrative privileges, and disruption of booking management.

Related STRIDE categories: Elevation of Privilege
