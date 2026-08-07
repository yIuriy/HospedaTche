# Payment Risk Register

Module scope: payment status, gateway responses, refunds, payment references, synchronization, audit records, and card information.

Stage 1 sources:

- STRIDE threats: `artifacts/threat-modeling/payments/`
- Abuse cases: `artifacts/abuse-cases/payment/`

## Risk Register

| ID | Related STRIDE Threat | Related Abuse Case | Risk Event | Vulnerability or Condition | Probability | Impact | Score | Level |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | T01-Payment-Status-Tampering | AC02-Unauthorized-Payment-Validation | An attacker causes an unpaid payment transaction to be incorrectly recognized as successfully paid, resulting in unauthorized confirmation of the associated reservation. | A validação insuficiente da confirmação de pagamento permite que um invasor manipule ou contorne o processo de atualização do status do pagamento. | 3 | 4 | 12 | Critical |
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
| RNN | TODO | TODO | TODO | TODO | TODO | TODO | TODO |

## Treatment Plan

| Risk | Strategy | Proposed Controls | NIST Functions | Responsible Parties | Evidence and Verification |
| --- | --- | --- | --- | --- | --- |
| RNN | TODO | TODO | TODO | TODO | TODO |

## Initial Implementation Order

| Order | Control or Action | Related Risks | Reason |
| --- | --- | --- | --- |
| 1 | TODO | RNN | TODO |

## Expected Residual Risk

| Risk | Initial Level | Expected Residual Level | Condition to Accept Residual |
| --- | --- | --- | --- |
| RNN | TODO | TODO | TODO |

## Final Notes

TODO.
