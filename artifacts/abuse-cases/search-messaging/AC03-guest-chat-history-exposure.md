### AC03 - Guest Chat History Exposure

Actor: unauthorized user or attacker.

Goal: intercept or retrieve private chat logs between another guest and hotel staff.

Conditions: chat messaging API endpoint does not validate if the requester is the owner of the chat session.

Abuse flow:
1. Attacker initiates a normal chat session and inspects the API request parameters.
2. Attacker alters the target conversation ID or user ID parameter to point to another guest.
3. System returns the full chat history of the target guest without authorization checks.
4. Attacker extracts personal data, stay dates, and sensitive requests.

Impact: privacy breach, personal data leak, and loss of guest trust.

Related STRIDE categories: Information Disclosure
