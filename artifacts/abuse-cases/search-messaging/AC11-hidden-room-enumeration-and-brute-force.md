### AC11 - Hidden Room Enumeration And Brute Force

Actor: malicious guest or automated attacker.

Goal: discover unlisted, deactivated, or maintenance-blocked rooms through repetitive ID enumeration requests.

Conditions: room query API accepts sequential room ID parameters without enforcing enumeration rate limits or visibility checks.

Abuse flow:
1. Attacker inspects search and room detail API request URLs.
2. Attacker runs a script incrementing room IDs sequentially.
3. System returns data for hidden, deactivated, or blocked rooms instead of enforcing visibility restrictions.
4. Attacker maps out hidden hotel inventory and operational blocks.

Impact: exposure of non-public hotel assets, operational intelligence leak, and excessive query load.

Related STRIDE categories: Information Disclosure
