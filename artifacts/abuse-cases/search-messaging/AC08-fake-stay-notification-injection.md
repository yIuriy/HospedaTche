### AC08 - Fake Stay Notification Injection

Actor: malicious third party or phisher.

Goal: trick guests into revealing credentials or making unauthorized payments via spoofed notifications.

Conditions: notification delivery service lacks cryptographic sender verification or origin checks.

Abuse flow:
1. Attacker crafts fake notification messages imitating hotel check-in reminders or payment requests.
2. Attacker injects these messages into the guest notification channel or sends spoofed emails.
3. Guest receives the convincing reminder containing a malicious link.
4. Guest clicks the link and enters credentials or payment details on a fraudulent site.

Impact: guest financial loss, credential theft, and severe loss of trust in the hotel communication channels.

Related STRIDE categories: Spoofing
