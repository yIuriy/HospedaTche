### AC04 - Internal Maintenance Notes Exposure

Actor: anonymous visitor or malicious guest.

Goal: discover internal hotel operational notes and room maintenance issues.

Conditions: public room details endpoint includes unmasked internal maintenance fields in API responses.

Abuse flow:
1. Attacker issues a request to view public room details.
2. Attacker inspects the raw JSON response payload returned by the server.
3. Attacker finds internal maintenance fields containing notes on broken locks or structural issues.
4. Attacker leverages this information for physical security exploitation or blackmail.

Impact: exposure of physical and operational hotel vulnerabilities.

Related STRIDE categories: Information Disclosure
