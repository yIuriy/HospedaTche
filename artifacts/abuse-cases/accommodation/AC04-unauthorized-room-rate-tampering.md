### AC04 - Unauthorized Room Rate Tampering

Actor: malicious Manager.

Goal: change legitimate room rates to create incorrect prices.

Conditions: Manager has valid access to the room rate management module.

Abuse flow:
1. Malicious Manager logs in with valid credentials.
2. Manager opens the room rate management module.
3. Manager changes base, seasonal, or promotional room rates without a legitimate reason.
4. Booking flow uses the incorrect rate for selected dates.

Impact: financial loss, incorrect reservation prices, guest disputes, and loss of trust in pricing records.

Related STRIDE categories: Tampering