### AC06 - Payment Synchronization Flood

Actor: malicious user.

Goal: overload the payment synchronization service.

Conditions: the system accepts an excessive number of payment synchronization requests.

Abuse flow:
1. Attacker generates a large number of payment synchronization requests.
2. The synchronization service becomes overloaded.
3. Legitimate payment confirmations are delayed or rejected.
4. Guests are unable to complete bookings successfully.

Impact: degraded payment services, booking failures, operational disruption, and financial losses.

Related STRIDE categories: Denial of Service
