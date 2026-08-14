# Payment Risk Register

Module scope: payment status, gateway responses, refunds, payment references, synchronization, audit records, and card information.

Stage 1 sources:

- STRIDE threats: `artifacts/threat-modeling/payments/`
- Abuse cases: `artifacts/abuse-cases/payment/`

## Probability Criteria

| Value | Classification | Criteria |
| --- | --- | --- |
| 1 | Low | Event depends on uncommon conditions, very specific access, or high technical capability. |
| 2 | Medium-low | Event is possible, but depends on a specific payment, refund, gateway, or synchronization weakness. |
| 3 | Medium-high | Event is plausible during common payment, confirmation, refund, or synchronization flows. |
| 4 | High | Event can happen easily, frequently, or through predictable misuse when payment controls are absent. |

## Impact Criteria

| Value | Classification | Criteria |
| --- | --- | --- |
| 1 | Low | Causes small disruption and can be corrected quickly. |
| 2 | Moderate | Causes limited payment inconsistency or temporary disruption, with recovery possible through reconciliation. |
| 3 | High | Causes relevant harm to guests, payment integrity, refund correctness, service availability, or revenue. |
| 4 | Very high | Can affect critical financial integrity, sensitive payment data, multiple transactions, or serious monetary loss. |

## Risk Classification

| Score | Level |
| --- | --- |
| 1 to 3 | Low |
| 4 to 7 | Medium |
| 8 to 11 | High |
| 12 to 16 | Critical |

Score = Probability x Impact.

## Risk Register

| ID | Related STRIDE Threat | Related Abuse Case | Risk Event | Vulnerability or Condition | Probability | Impact | Score | Level |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | T01-Payment-Status-Tampering | AC02-Unauthorized-Payment-Validation | An attacker causes an unpaid payment transaction to be incorrectly recognized as successfully paid, resulting in unauthorized confirmation of the associated reservation. | Insufficient payment confirmation validation allows an attacker to manipulate or bypass the payment status update process. | 3 | 4 | 12 | Critical |
| R02 | T02-Payment-Confirmation-Blocking | AC05-Payment-Confirmation-Blocking | An attacker prevents a legitimate payment confirmation from being processed, causing a successfully paid booking to remain pending or be incorrectly cancelled. | Insufficient protection and validation of the payment confirmation process allows an attacker to interfere with or block legitimate payment confirmation requests. | 2 | 3 | 6 | Medium |
| R03 | T03-Payment-Synchronization-Flood | AC06-Payment-Synchronization-Flood | An attacker overwhelms the payment synchronization service with excessive requests, delaying or preventing legitimate payment confirmations from being processed. | The payment synchronization service lacks effective rate limiting, request throttling, or capacity controls, allowing excessive synchronization requests to consume available processing resources. | 3 | 3 | 9 | High |
| R04 | T04-Payment-Reference-Substitution | AC01-Payment-Reference-Substitution | An attacker manipulates a payment reference to associate a valid payment with a different booking, causing an underpaid or unpaid booking to be incorrectly confirmed. | The system fails to securely bind payment transactions to their corresponding booking identifiers during payment creation and confirmation, allowing payment references to be manipulated or substituted. | 3 | 4 | 12 | Critical |
| R05 | T05-Unauthorized-Refund-Claim | AC04-Fraudulent-Refund-Claim | An attacker obtains an unauthorized refund by manipulating refund information and causing a refund from another Guest's cancelled booking to be transferred to the attacker's account. | Insufficient validation of the refund recipient's identity allows an attacker to submit refund requests using another Guest's booking information and receive the associated refund. | 2 | 4 | 8 | High |
| R06 | T06-Credit-Card-Information-Disclosure | AC03-Credit-Card-Information-Disclosure | An attacker gains unauthorized access to Guests' credit card information through the payment management functionality, exposing sensitive payment data that may be used for fraudulent transactions. | Insufficient access controls and protection mechanisms allow unauthorized users to access or retrieve Guests' credit card information through the payment management functionality. | 2 | 4 | 8 | High |



## Evaluation Justifications

### R01 - Unauthorized Payment Validation

Probability justification: The probability is classified as Medium-High because payment status manipulation is plausible when the system relies on insufficient validation of payment confirmations. An attacker who can manipulate or bypass the confirmation process may cause an unpaid transaction to be accepted without requiring privileged access, making exploitation feasible in common attack scenarios.

Impact justification: The impact is classified as Very High because successful exploitation can result in reservations being confirmed without legitimate payment, causing direct revenue losses and compromising the integrity of payment and booking records. The risk is further amplified when the attacker subsequently attempts to obtain a fraudulent refund, potentially causing additional financial losses and affecting critical payment operations.

Affected users, data, features, or components: Guest accounts, payment transactions, payment status records, booking confirmation, refund processing, booking records, and financial records.

Expected consequences: Unauthorized confirmation of unpaid bookings, direct revenue losses, fraudulent refund requests, inconsistent payment and booking records, financial reconciliation discrepancies, and compromised trust in the payment process.

Risk level justification: The risk is classified as Critical because successful exploitation directly compromises the integrity of payment transactions and may allow reservations to be confirmed without legitimate payment. The attack can also be followed by fraudulent refund requests, increasing the potential financial impact. The combination of Medium-High probability (3) and Very High impact (4) results in a risk score of 12, which is classified as Critical.


### R02 - Payment Confirmation Blocking

Probability justification: The probability is classified as Medium-Low because the attack depends on a specific vulnerability that allows an attacker to interfere with the payment confirmation process. In a properly protected payment workflow, confirmation messages should be securely transmitted, validated, and processed independently of untrusted user actions, reducing the likelihood of successful exploitation.

Impact justification: The impact is classified as High because a successful attack may cause legitimate Guests to lose a booking despite having already completed the payment. This can result in financial disputes, refund processing, customer dissatisfaction, increased support workload, and loss of trust in the payment and booking process. Although the issue can generally be resolved by verifying the completed payment and restoring or rebooking the reservation, the direct impact on paying customers and hotel operations is significant.

Affected users, data, features, or components: Guest accounts, payment transactions, payment status synchronization, booking confirmation, booking records, and payment confirmation processing.

Expected consequences: Legitimate payments remaining unrecognized, paid bookings being incorrectly cancelled, financial and refund disputes, customer dissatisfaction, increased customer support workload, and reduced trust in the payment and booking process.

Risk level justification: The risk is classified as Medium because exploitation depends on a specific weakness in the payment confirmation process, reducing its likelihood under normal system conditions. However, successful exploitation can directly affect Guests who have already paid for a service, potentially causing financial disputes and significant customer dissatisfaction. The combination of Medium-Low probability (2) and High impact (3) results in a risk score of 6, which is classified as Medium.

### R03 - Payment Synchronization Flood

Probability justification: The probability is classified as Medium-High because flooding attacks are plausible when a synchronization service accepts excessive requests without effective rate limiting or throttling. The attack can be performed using repeated requests and does not require privileged access, making exploitation feasible under common attack scenarios.

Impact justification: The impact is classified as High because successful exploitation may delay or prevent legitimate payment confirmations from being processed, causing booking confirmation failures for paying Guests, service degradation, operational disruption, and potential revenue losses. Although the service can generally be restored after the attack is mitigated, the disruption directly affects the payment and booking processes.

Affected users, data, features, or components: Guests, payment transactions, payment status synchronization service, booking confirmation, payment processing, and booking records.

Expected consequences: Delayed or rejected payment confirmations, failed booking confirmations, degraded payment services, increased server load, operational disruption, customer dissatisfaction, and potential revenue losses.

Risk level justification: The risk is classified as High because the payment synchronization service may be overwhelmed by repeated requests, directly affecting the processing of legitimate payment confirmations. This can prevent paying Guests from completing their bookings and disrupt critical payment and reservation operations. The combination of Medium-High probability (3) and High impact (3) results in a risk score of 9, which is classified as High.

### R04 - Payment Reference Substitution

Probability justification: The probability is classified as Medium-High because payment reference manipulation is plausible when transaction identifiers and booking identifiers are not securely bound and independently validated during payment confirmation. The attack can be performed by a malicious Guest without requiring privileged access, making exploitation feasible when the payment workflow relies on client-provided or insufficiently validated references.

Impact justification: The impact is classified as Very High because successful exploitation may allow an attacker to obtain a higher-value accommodation while paying only for a lower-value booking. This can cause direct revenue losses, unauthorized access to higher-value services, inconsistent financial records, and compromise of the integrity of the payment and booking processes. If exploited repeatedly, the resulting financial losses may become substantial.

Affected users, data, features, or components: Guests, payment transactions, payment references, booking identifiers, booking confirmation, payment records, booking records, and financial reconciliation processes.

Expected consequences: Unauthorized confirmation of higher-value bookings, financial losses, underpaid reservations, inconsistent payment and booking records, accounting discrepancies, unfair access to higher-value accommodations, and reduced trust in the payment system.

Risk level justification: The risk is classified as Critical because successful exploitation directly compromises the integrity of payment-to-booking associations and may allow Guests to obtain higher-value accommodations without making the required payment. The attack can also be repeated against multiple transactions, potentially causing significant cumulative financial losses and widespread inconsistencies in payment and booking records. The combination of Medium-High probability (3) and Very High impact (4) results in a risk score of 12, which is classified as Critical.

### R05 - Unauthorized Refund Claim

Probability justification: The probability is classified as Medium-Low because successful exploitation depends on a specific weakness in the refund process, namely insufficient validation of the identity and authorization of the refund recipient. Without this condition, possessing another Guest's booking information should not be sufficient to redirect the refund, reducing the likelihood of exploitation under normal system conditions.

Impact justification: The impact is classified as Very High because successful exploitation results in an unauthorized transfer of funds belonging to another Guest's cancelled booking. This can cause direct financial losses, customer disputes, compromised payment integrity, and significant operational effort to investigate and correct fraudulent refunds. If exploited repeatedly, the cumulative financial impact may become substantial.

Affected users, data, features, or components: Guests, booking records, refund requests, refund recipient information, payment transactions, refund processing, and financial records.

Expected consequences: Unauthorized refunds, direct financial losses, fraudulent transfer of funds, customer disputes, payment record inconsistencies, increased investigation and support workload, and reduced trust in the refund process.

Risk level justification: The risk is classified as High because successful exploitation directly compromises the integrity of the refund process and may result in unauthorized transfers of funds. Although exploitation depends on a specific weakness in refund recipient validation, the financial impact of a successful attack is very high, particularly if multiple fraudulent refunds are processed. The combination of Medium-Low probability (2) and Very High impact (4) results in a risk score of 8, which is classified as High.

### R06 - Credit Card Information Disclosure

Probability justification: The probability is classified as Medium-Low because successful exploitation depends on a specific weakness in the protection or access control of payment information. An attacker must gain access to a payment management functionality or exploit insufficient authorization controls to obtain the sensitive data, which reduces the likelihood under normal system conditions.

Impact justification: The impact is classified as Very High because exposure of Guests' credit card information can enable fraudulent transactions, financial losses, identity theft risks, regulatory non-compliance, and significant damage to customer trust. The disclosure of sensitive financial information may also affect multiple Guests if payment records are exposed at scale.

Affected users, data, features, or components: Guests, credit card information, payment records, payment management functionality, payment transactions, and financial data.

Expected consequences: Exposure of sensitive financial information, fraudulent transactions, financial losses for Guests, potential regulatory consequences, increased incident response and support workload, and significant loss of customer trust.

Risk level justification: The risk is classified as High because successful exploitation can expose highly sensitive financial information and potentially affect multiple Guests. The resulting consequences may include fraudulent transactions, financial losses, regulatory non-compliance, and significant reputational damage. Although exploitation depends on a specific access control or protection weakness, the severity of a successful disclosure is Very High. The combination of Medium-Low probability (2) and Very High impact (4) results in a risk score of 8, which is classified as High.



## Prioritization

| Priority | Risk | Reason |
| --- | --- | --- |
| 1 | R04 | This risk was prioritized first because it is classified as Critical and directly allows an attacker to associate a valid low-value payment with a higher-value booking. The resulting financial loss can occur for each exploited transaction and may be repeated across multiple bookings, compromising both payment integrity and booking records. |
| 2 | R01 | This risk was prioritized second because it is also classified as Critical and may allow unpaid bookings to be confirmed as successfully paid. The attack can result in direct revenue losses and may be followed by fraudulent refund requests, further increasing the potential financial impact. |
| 3 | R06 | This risk was prioritized third because unauthorized disclosure of credit card information can affect multiple Guests and may lead to fraudulent transactions, financial losses, regulatory consequences, and significant loss of customer trust. |
| 4 | R03 | This risk was prioritized fourth because a successful synchronization flood can disrupt the payment confirmation process for multiple Guests simultaneously. Although the service can generally be restored after the attack is mitigated, the resulting degradation may cause booking failures, operational disruption, and revenue losses. |
| 5 | R05 | This risk was prioritized fifth because unauthorized refund claims can result in direct financial losses and compromise the integrity of refund processing. However, exploitation depends on the specific failure to validate the legitimate refund recipient, reducing its likelihood compared with the higher-priority risks. |
| 6 | R02 | This risk was prioritized last because payment confirmation blocking generally causes a temporary and recoverable disruption. Completed payments can usually be verified through payment records and reconciled through administrative intervention, limiting the overall impact compared with the other payment risks. |

## NIST CSF 2.0 Mapping

| Risk | Govern | Identify | Protect | Detect | Respond | Recover | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | X | X | X | X | X | X | Governance and identification of payment integrity risks; protection of payment status validation; detection of unauthorized payment confirmations; response to fraudulent payment activity; and recovery through payment and booking record correction. |
| R02 | X | X | X | X | X | X | Governance and identification of payment confirmation availability risks; protection of the synchronization process; detection of blocked or failed confirmations; response to disrupted payment processing; and recovery through payment reconciliation and booking correction. |
| R03 | X | X | X | X | X | X | Governance and identification of payment service availability risks; protection through rate limiting and request controls; detection of excessive synchronization requests; response to service flooding; and recovery through restoration of normal synchronization capacity. |
| R04 | X | X | X | X | X | X | Governance and identification of payment-to-booking integrity risks; protection through secure binding and validation of payment references; detection of inconsistent payment associations; response to unauthorized booking confirmations; and recovery through correction of payment and booking records. |
| R05 | X | X | X | X | X | X | Governance and identification of refund integrity risks; protection through recipient authentication and authorization; detection of suspicious refund requests; response to unauthorized refunds; and recovery through refund investigation, reversal when possible, and financial record correction. |
| R06 | X | X | X | X | X | X | Governance and identification of payment information protection risks; protection of sensitive financial data through access controls; detection of unauthorized access; response to information disclosure incidents; and recovery through remediation and affected-record review. |

## Treatment Plan

| Risk | Strategy | Proposed Controls | NIST Functions | Responsible Parties | Evidence and Verification |
| --- | --- | --- | --- | --- | --- |
| R01 | Reduce | Enforce server-side validation of payment confirmations; verify payment status directly against trusted payment records before confirming a booking; prevent client-side manipulation of payment status; require successful payment validation before processing refunds. | Govern, Identify, Protect, Detect, Respond, Recover | Administrator, Manager | Payment transaction logs; tests attempting to confirm unpaid bookings; verification that booking confirmation requires a valid completed payment; reconciliation between payment and booking records. |
| R02 | Reduce | Protect the payment confirmation channel; validate and authenticate confirmation requests; implement reliable payment-status synchronization and reconciliation mechanisms; prevent a missing confirmation from immediately causing an incorrect cancellation. | Govern, Identify, Protect, Detect, Respond, Recover | Administrator, Manager | Payment synchronization logs; tests with interrupted or blocked confirmation requests; verification that completed payments can be reconciled; tests confirming that valid payments are not incorrectly cancelled. |
| R03 | Reduce | Implement rate limiting and request throttling for payment synchronization; reject excessive or repeated synchronization requests; monitor abnormal request volumes; isolate synchronization resources to prevent legitimate confirmations from being starved. | Govern, Identify, Protect, Detect, Respond, Recover | Administrator, Manager | Load and stress tests; rate-limit verification; synchronization request logs; tests generating excessive requests while validating that legitimate payment confirmations continue to be processed. |
| R04 | Reduce | Bind each payment transaction cryptographically or server-side to its specific booking; validate the booking identifier against the payment transaction before confirmation; never trust booking references supplied only by the client; reject mismatched payment and booking references. | Govern, Identify, Protect, Detect, Respond, Recover | Administrator, Manager | Tests using modified payment references; verification that mismatched payment/booking identifiers are rejected; payment and booking reconciliation reports; audit logs of rejected transactions. |
| R05 | Reduce | Require strong authentication and authorization of the refund recipient; validate that the refund recipient is the legitimate Guest associated with the cancelled booking; prevent refund redirection through client-controlled information; record refund recipient and transaction details for audit purposes. | Govern, Identify, Protect, Detect, Respond, Recover | Administrator, Manager | Refund transaction logs; authorization tests using another Guest's booking information; verification that unauthorized refund recipients are rejected; reconciliation of refund records with Guest and booking records. |
| R06 | Reduce | Restrict access to payment information according to user roles; prevent Guests from accessing payment records belonging to other Guests; minimize stored payment information; mask sensitive card information; protect payment data during storage and processing. | Govern, Identify, Protect, Detect, Respond, Recover | Administrator, Manager | Access-control tests; tests attempting to retrieve another Guest's payment information; verification of masked sensitive data; review of payment records and access logs. |

## Initial Implementation Order

| Order | Control or Action | Related Risks | Reason |
| --- | --- | --- | --- |
| 1 | Implement server-side payment validation before booking confirmation. | R01 | R01 is classified as Critical and directly allows unpaid bookings to be confirmed. Server-side validation establishes a trusted payment status and prevents attackers from manipulating or bypassing the payment confirmation process. |
| 2 | Securely bind payment transactions to their corresponding booking identifiers and reject mismatches. | R04 | R04 is classified as Critical and allows attackers to obtain higher-value bookings by associating a valid payment with a different booking. Strong server-side binding directly prevents this form of payment substitution and protects payment integrity. |
| 3 | Implement rate limiting, request throttling, and resource protection for payment synchronization. | R03 | R03 is classified as High and can disrupt payment confirmation for multiple Guests by overwhelming the synchronization service. These controls reduce the ability to flood the service and preserve resources for legitimate payment confirmations. |
| 4 | Implement strong refund recipient authentication and authorization. | R05 | R05 can result in direct unauthorized transfers of funds. Validating the legitimate refund recipient prevents attackers from redirecting refunds using another Guest's booking information. |
| 5 | Protect and reconcile payment confirmation processing against blocked or missing confirmations. | R02 | R02 can cause paying Guests to lose valid bookings when completed payments are not recognized. Reliable synchronization and reconciliation reduce the likelihood and duration of this disruption. |
| 6 | Implement strict access control, data minimization, and masking for payment information. | R06 | R06 involves exposure of sensitive financial information and is important to address, but the proposed controls can be implemented after the primary payment integrity and transaction-processing controls that address the Critical risks. |

## Expected Residual Risk

| Risk | Initial Level | Expected Residual Level | Condition to Accept Residual |
| --- | --- | --- | --- |
| R01 | Critical(12) | Medium (4) | Accept when payment confirmation is validated exclusively through trusted server-side payment records, unpaid bookings cannot be confirmed, and testing verifies that payment status cannot be manipulated through client-side requests. |
| R02 | Medium(6) | Low (3) | Accept when payment confirmations are reliably synchronized and reconciled, completed payments cannot be incorrectly cancelled, and testing confirms that interrupted or delayed confirmations can be recovered without loss of the legitimate booking. |
| R03 | High(9) | Low (3) | Accept when rate limiting, request throttling, and resource controls prevent excessive synchronization requests from affecting legitimate payment confirmations, and load testing verifies acceptable service availability under attack conditions. |
| R04 | Critical(12) | Low (3) | Accept when every payment transaction is securely bound to its corresponding booking, mismatched references are rejected, and security testing confirms that payment references cannot be substituted to confirm another booking. |
| R05 | High(8) | Medium (4) | Accept when the refund recipient is strongly authenticated and authorized, refund requests are validated against the cancelled booking and legitimate Guest, and testing confirms that refunds cannot be redirected to unauthorized accounts. |
| R06 | High(8) | Low (3) | Accept when payment information is restricted according to user authorization, sensitive card information is minimized and masked, and security testing confirms that Guests cannot access payment information belonging to other Guests. |

## Final Notes

The payment risk treatment plan prioritizes the protection of payment integrity, transaction-to-booking association, refund authorization, service availability, and sensitive payment information. R01 and R04 receive the highest initial priority because they are classified as Critical and can directly result in unauthorized booking confirmations and financial losses. The proposed controls focus on server-side payment validation, secure transaction binding, refund authorization, rate limiting, synchronization resilience, and access control for payment information. The expected residual risk is reduced through the implementation and verification of these controls, although R01 and R05 retain a Medium residual level due to the financial nature of payment and refund operations. Continuous monitoring, testing, reconciliation, and periodic risk reassessment should be maintained to ensure that changes to the payment process do not introduce new or increased risks.
