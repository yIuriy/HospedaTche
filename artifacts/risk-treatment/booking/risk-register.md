# Booking Risk Register

Module scope: booking creation, cancellation, confirmation, expiration, state transitions, reservation history, and availability consistency.

Stage 1 sources:

- STRIDE threats: `artifacts/threat-modeling/booking/`
- Abuse cases: `artifacts/abuse-cases/booking/`

## Risk Register

| ID | Related STRIDE Threat | Related Abuse Case | Risk Event | Vulnerability or Condition | Probability | Impact | Score | Level |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | T01-Booking-Creation-Repudiation | AC05-Fraudulent-Booking-Repudiation | A guest fraudulently disputes a legitimate reservation, claiming insufficient evidence, with the intention of obtaining a full refund after the cancellation deadline. | Insufficient audit logs and lack of non-repudiation evidence for booking authorization. | 2 | 3 | 6 | Medium |
| R02 | T02-Booking-Information-Disclosure | AC03-Booking-Information-Disclosure | An attacker gains unauthorized access to booking records by exploiting missing authorization checks or predictable booking identifiers, exposing sensitive Guest information. | Missing or insufficient authorization checks (IDOR) and the use of predictable booking identifiers, allowing unauthorized access to booking records. | 3 | 3 | 9 | High |
| R03 | T03-Unauthorized-Booking-Cancellation | AC01-Unauthorized-Booking-Cancellation | An attacker successfully cancels another Guest's booking by exploiting insufficient authorization controls in the booking cancellation process. | Insufficient authorization checks that fail to verify booking ownership before processing cancellation requests. | 3 | 3 | 9 | High |
| R04 | T04-Forced-Booking-Expiration | AC04-Forced-Booking-Expiration | An attacker forces pending bookings to expire before the payment deadline, preventing legitimate Guests from completing their reservations. | Insufficient protection of the booking expiration mechanism, allowing unauthorized triggering or manipulation of the expiration process. | 2 | 2 | 4 | Medium |
| R05 | T05-Duplicate-Booking-Cancellation | AC06-Duplicate-Booking-Cancellation | An attacker submits repeated cancellation requests for the same booking, causing multiple cancellation and refund operations to be processed. | The system fails to validate the booking status or prevent duplicate cancellation and refund requests after the initial cancellation. | 3 | 4 | 12 | Critical |
| R06 | T06-Booking-Cancellation-Blocking | AC02-Booking-Cancellation-Blocking | An attacker prevents a legitimate Guest from submitting or completing a booking cancellation request before the cancellation deadline by keeping the booking resource unavailable. | Insufficient concurrency control, prolonged resource locking, or lack of rate limiting allows an attacker to keep booking records unavailable during cancellation requests. | 2 | 2 | 4 | Medium |

## Evaluation Justifications

### R01 - Fraudulent Booking Repudiation

Probability justification: The event was classified as having a low-to-medium probability because its occurrence depends on a specific condition: the absence of adequate audit and non-repudiation mechanisms. In a system that records evidence of reservation creation, guest authentication, and payment authorization, the likelihood of success for this type of fraud is reduced.

Impact justification: The impact was classified as high because the materialization of the risk could result in financial losses—stemming from improper refunds, an increase in disputes between guests and the hotel, and operational costs associated with customer service and investigations—as well as undermine trust in the reservation process. Although it typically affects individual cases, the consequences are significant for the business.

Affected users, data, features, or components: Guest accounts, booking records, payment records, audit logs, refund processing, and hotel staff responsible for handling reservation disputes.

Expected consequences: Fraudulent refunds, financial losses, increased customer support workload, reservation disputes, and reduced trust in the integrity and accountability of the booking process.

Risk level justification: The risk is classified as Medium because the event depends on a specific vulnerability, namely the absence of sufficient audit evidence to support non-repudiation, which reduces its likelihood. However, if the event occurs, it can cause significant financial losses, customer disputes, and operational impacts, resulting in a moderate overall risk score (6).

### R02 - Booking Information Disclosure

Probability justification: The probability is classified as Medium-High because the attack is plausible in common web applications where authorization checks are improperly implemented or booking identifiers are predictable. Exploiting such weaknesses does not require advanced technical capabilities and can be performed using standard HTTP requests.

Impact justification: The impact is classified as High because unauthorized disclosure of booking records may expose personal information, reservation details, and stay history. Such exposure may result in privacy violations, identity theft risks, customer distrust, and potential regulatory consequences.

Affected users, data, features, or components: Guest accounts, booking records, personal information, booking management and retrieval functionalities, authorization mechanisms, and booking query endpoints.

Expected consequences: Unauthorized disclosure of Guest personal information, privacy breaches, identity theft risks, loss of customer trust, regulatory non-compliance, and reputational damage to the hotel.

Risk level justification: The risk is classified as High because the attack can occur through common authorization weaknesses, making its likelihood relatively high. If successfully exploited, it may expose sensitive Guest information, resulting in significant privacy, legal, and reputational consequences. The combination of Medium-High probability (3) and High impact (3) results in a risk score of 9, which is classified as High.

### R03 - Unauthorization Booking Cancellation

Probability justification: The probability is classified as Medium-High because the attack is plausible when the booking cancellation process lacks proper authorization checks. If an attacker obtains or guesses another Guest's booking identifier, the vulnerability can be exploited using ordinary application requests without requiring advanced technical skills.

Impact justification: The impact is classified as High because unauthorized booking cancellations may cause financial losses, operational disruptions, customer disputes, and loss of trust in the reservation system. Although the attack typically affects individual bookings, its consequences are significant for both Guests and hotel operations.

Affected users, data, features, or components: Guest accounts, booking records, booking cancellation functionality, reservation management services, and authorization mechanisms.

Expected consequences: Unauthorized cancellation of legitimate bookings, financial losses, customer complaints, operational disruptions, refund disputes, and reputational damage to the hotel.

Risk level justification: The risk is classified as High because the attack can occur through common authorization weaknesses in the booking cancellation process. If successfully exploited, it directly compromises the integrity of reservation records and causes significant operational and financial consequences. The combination of Medium-High probability (3) and High impact (3) results in a risk score of 9, which is classified as High..

### R04 - Forced Booking Expiration

Probability justification: The probability is classified as Medium-Low because the attack depends on a specific vulnerability that allows unauthorized users to manipulate or trigger the booking expiration mechanism. In a properly designed system, this functionality should be restricted to internal processes, reducing the likelihood of exploitation.

Impact justification: The impact is classified as Moderate because the attack causes a temporary disruption to the booking process rather than permanent data loss or unauthorized disclosure. In most cases, affected Guests can create a new booking or resolve the issue through customer support, making recovery feasible despite the inconvenience and potential operational overhead.

Affected users, data, features, or components: Guest accounts, pending booking records, booking status management, payment workflow, booking expiration mechanism, and reservation processing services..

Expected consequences: Premature expiration of legitimate bookings, failed reservation confirmations, financial losses, customer complaints, operational disruption, and reduced confidence in the reliability of the booking system..

Risk level justification: The risk is classified as Medium because exploiting the attack requires a specific weakness in the booking expiration mechanism, reducing its likelihood. Although the impact is generally recoverable through rebooking or customer support, it may still disrupt the reservation process and generate operational costs. The combination of Medium-Low probability (2) and Moderate impact (2) results in a risk score of 4, which is classified as Medium.

### R05 - Duplicate Booking Cancellation

Probability justification: The probability is classified as Medium-High because duplicate request and race condition attacks are plausible against booking systems that lack proper idempotency and concurrency controls. Such attacks can be performed using standard web testing tools without requiring advanced privileges, making exploitation feasible under common attack scenarios.

Impact justification: The impact is classified as Very High because successful exploitation may result in multiple unauthorized refunds, substantial financial losses, inconsistent booking and payment records, and disruption of financial operations. If the attack is repeated or automated against multiple bookings, the cumulative damage can affect the hotel's revenue, accounting processes, and customer trust, making recovery costly and time-consuming.

Affected users, data, features, or components: Booking records, booking status management, refund processing, payment records, cancellation workflow, and financial reporting.

Expected consequences: Duplicate refund requests, financial losses, inconsistent booking records, increased operational workload, accounting discrepancies, and reduced trust in the booking management process.

Risk level justification: The risk is classified as Critical because the vulnerability allows repeated exploitation of the same booking cancellation process, enabling an attacker to generate multiple unauthorized refund requests. Since the attack can be automated and applied to multiple bookings, its cumulative financial and operational impact may become severe, compromising the integrity of booking and payment records and significantly affecting hotel operations. The combination of Medium-High probability (3) and Very High impact (4) results in a risk score of 12, which is classified as Critical.

### R06 - Booking Cancellation Blocking

Probability justification: The impact is classified as High because legitimate Guests may lose the opportunity to cancel eligible bookings within the allowed period, resulting in financial losses, customer disputes, increased support workload, and reduced trust in the booking system. Although the attack generally affects individual bookings, the consequences are significant for both Guests and hotel operations.

Impact justification: The impact is classified as Moderate because the attack temporarily prevents legitimate Guests from cancelling their bookings within the allowed period. Although affected Guests may incur cancellation fees or lose their refund window, the issue can typically be resolved through customer support or manual intervention, limiting the overall business impact.

Affected users, data, features, or components: Guest accounts, booking cancellation functionality, booking records, cancellation workflow, booking status management, and customer support operations.

Expected consequences: Temporary disruption of the booking cancellation process, missed cancellation deadlines, customer inconvenience, additional customer support requests, potential refund disputes, and reduced user satisfaction.

Risk level justification: The risk is classified as Medium because the attack depends on specific weaknesses in the booking cancellation workflow, such as prolonged resource locking or insufficient request controls. Although the resulting disruption is generally temporary and recoverable through administrative intervention, it may still cause financial inconvenience to Guests and increase operational workload. The combination of Medium-Low probability (2) and Moderate impact (2) results in a risk score of 4, which is classified as Medium.

## Prioritization

| Priority | Risk | Reason |
| --- | --- | --- |
| 1 | R05 | This risk was prioritized first because it is classified as Critical and may result in repeated exploitation of the cancellation process, allowing multiple unauthorized refunds. Its cumulative financial impact can escalate rapidly through automated attacks, significantly affecting the hotel's financial operations and the integrity of booking and payment records. |
| 2 | R02 | This risk was prioritized second because unauthorized disclosure of booking information may expose sensitive Guest data, leading to privacy violations, regulatory non-compliance, identity theft risks, and reputational damage. Protecting confidential customer information is essential to maintaining trust and meeting legal obligations. |
| 3 | R03 | This risk was prioritized third because unauthorized booking cancellations directly compromise the integrity of reservation records and may cause financial losses, operational disruption, and customer dissatisfaction. Although typically affecting individual bookings, successful exploitation has a significant impact on business operations. |
| 4 | R01 | This risk was prioritized fourth because fraudulent repudiation may result in unauthorized refunds and customer disputes. However, its exploitation depends on the absence of sufficient audit evidence and non-repudiation controls, making it less likely than the higher-priority risks. |
| 5 | R04 | This risk was prioritized fifth because forced booking expiration temporarily disrupts the reservation process but is generally recoverable through a new booking or customer support. Although it may cause customer inconvenience and limited financial losses, its overall business impact is lower than the risks ranked above. |
| 6 | R06 | This risk was prioritized last because booking cancellation blocking primarily causes temporary service disruption. While affected Guests may miss cancellation deadlines, the issue is typically recoverable through administrative intervention or customer support, resulting in a comparatively lower overall business impact. |

## NIST CSF 2.0 Mapping

| Risk | Govern | Identify | Protect | Detect | Respond | Recover | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | X | X | X | X | X | X | TODO |
| R02 | X | X | X | X | X | X | TODO |
| R03 | X | X | X | X | X | X | TODO |
| R04 | X | X | X | X | X | X | TODO |
| R05 | X | X | X | X | X | X | TODO |
| R06 | X | X | X | X | X | X | TODO |

## Treatment Plan

| Risk | Strategy | Proposed Controls | NIST Functions | Responsible Parties | Evidence and Verification |
| --- | --- | --- | --- | --- | --- |
| R01 | TODO | TODO | TODO | TODO | TODO |
| R02 | TODO | TODO | TODO | TODO | TODO |
| R03 | TODO | TODO | TODO | TODO | TODO |
| R04 | TODO | TODO | TODO | TODO | TODO |
| R05 | TODO | TODO | TODO | TODO | TODO |
| R06 | TODO | TODO | TODO | TODO | TODO |

## Initial Implementation Order

| Order | Control or Action | Related Risks | Reason |
| --- | --- | --- | --- |
| 1 | TODO | RNN | TODO |
| 1 | TODO | RNN | TODO |
| 1 | TODO | RNN | TODO |
| 1 | TODO | RNN | TODO |
| 1 | TODO | RNN | TODO |
| 1 | TODO | RNN | TODO |

## Expected Residual Risk

| Risk | Initial Level | Expected Residual Level | Condition to Accept Residual |
| --- | --- | --- | --- |
| R01 | TODO | TODO | TODO |
| R02 | TODO | TODO | TODO |
| R03 | TODO | TODO | TODO |
| R04 | TODO | TODO | TODO |
| R05 | TODO | TODO | TODO |
| R06 | TODO | TODO | TODO |

## Final Notes

TODO.
