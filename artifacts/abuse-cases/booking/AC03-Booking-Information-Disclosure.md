### AC03 - Booking Information Disclosure

Actor: malicious user.

Goal: obtain unauthorized access to booking records containing Guest information by exploiting missing authorization checks and predictable identifiers.

Conditions: the system fails to properly restrict access to booking information, enforce authorization checks (IDOR), or uses predictable booking identifiers.

Abuse flow:
1. Attacker accesses the booking management functionality or booking query endpoint.
2. Attacker submits requests using guessed, sequential, or predictable booking identifiers.
3. The system fails to verify if the authenticated Guest owns the requested booking record and responds with the booking details.
4. Attacker collects and extracts sensitive Guest personal information, booking details, and stay information.

Impact: disclosure of sensitive Guest information, privacy violations, identity theft risks, loss of customer trust, and regulatory non-compliance.

Related STRIDE categories: Information Disclosure
