# Accommodation Risk Register

Module scope: room availability, room status, rates, capacity, cleaning, maintenance, companion data, and stay operations.

Stage 1 sources:

- STRIDE threats: `artifacts/threat-modeling/accommodation/`
- Abuse cases: `artifacts/abuse-cases/accommodation/`

## Probability Criteria

| Value | Classification | Criteria |
| --- | --- | --- |
| 1 | Low | Event depends on uncommon conditions, very specific access, or high technical capability. |
| 2 | Medium-low | Event is possible, but depends on a specific vulnerability, missing workflow rule, or privileged staff access. |
| 3 | Medium-high | Event is plausible during common accommodation operations or predictable staff workflows. |
| 4 | High | Event can happen easily, frequently, or during normal peak operation without strong preventive controls. |

## Impact Criteria

| Value | Classification | Criteria |
| --- | --- | --- |
| 1 | Low | Causes small disruption and can be corrected quickly. |
| 2 | Moderate | Causes limited operational inconsistency, with recovery possible through staff review. |
| 3 | High | Causes relevant harm to booking correctness, revenue, guest service, privacy, or room operations. |
| 4 | Very high | Can affect guest safety, confirmed reservations, critical room availability, or multiple operational teams. |

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
| R01 | T01 - Room Availability Manipulation | AC01 - Room Availability Manipulation | Room availability is changed incorrectly and booking decisions use false availability data. | Availability blocks can be created, removed, or edited without enough approval, audit, or reversal control. | 3 | 4 | 12 | Critical |
| R02 | T02 - False Room Status Update | AC02 - False Room Status Update | Room status is falsified and staff use the wrong operational state during stay operations. | Operational status updates are accepted without strong validation, review, or anomaly detection. | 3 | 4 | 12 | Critical |
| R03 | T03 - Unauthorized Room Deactivation | AC03 - Unauthorized Room Deactivation | Active rooms are deactivated without legitimate operational need. | Room deactivation can be performed by a privileged user without confirmation, reason review, or availability impact check. | 2 | 3 | 6 | Medium |
| R04 | T04 - Unauthorized Room Rate Tampering | AC04 - Unauthorized Room Rate Tampering | Room rates are changed incorrectly and reservations use wrong prices. | Rate changes lack approval, change history review, or comparison against configured pricing policy. | 3 | 3 | 9 | High |
| R05 | T05 - Staff Room Schedule Exposure | AC05 - Staff Room Schedule Exposure | Unauthorized users view staff-only room schedules and reservation timing. | Room schedule access is not restricted or monitored according to staff role and operational need. | 2 | 3 | 6 | Medium |
| R06 | T06 - Occupancy Capacity Tampering | AC06 - Occupancy Capacity Tampering | Room capacity is changed incorrectly and occupancy validation accepts unsafe or invalid stays. | Capacity configuration can be modified without policy checks, approval, or review against room type limits. | 2 | 4 | 8 | High |
| R07 | T07 - Fraudulent Check In Or Check Out Update | AC07 - Fraudulent Check In Or Check Out Update | Check-in or check-out state is changed without the real stay event. | Stay transition controls do not require enough evidence, sequencing rules, or audit review. | 2 | 4 | 8 | High |
| R08 | T08 - Guest Stay Identification Tampering | AC08 - Guest Stay Identification Tampering | Guest identification confirmation is changed incorrectly during check-in. | Identification confirmation data can be edited without review, traceability, or restricted correction workflow. | 2 | 3 | 6 | Medium |
| R09 | T09 - Companion Registration Tampering | AC09 - Companion Registration Tampering | Companion data is changed and stay records no longer reflect real occupancy. | Companion registration can be modified without count validation, change reason, or guest/staff review. | 2 | 2 | 4 | Medium |
| R10 | T10 - Cleaning Queue Tampering | AC10 - Cleaning Queue Tampering | Rooms are removed from the cleaning queue before cleaning is complete. | Cleaning status can be changed without evidence of completion, role separation, or room turnover review. | 3 | 3 | 9 | High |
| R11 | T11 - Maintenance Note Tampering | AC11 - Maintenance Note Tampering | Maintenance issues are hidden or altered and unsafe rooms appear operational. | Maintenance notes and maintenance status can be changed without required reason, review, or restoration history. | 3 | 4 | 12 | Critical |

## Evaluation Justifications

### RNN - Risk Title

Probability justification: TODO.

Impact justification: TODO.

Affected users, data, features, or components: TODO.

Expected consequences: TODO.

Risk level justification: TODO.

## Prioritization

| Priority | Risk | Reason |
| --- | --- | --- |
| 1 | RNN | TODO |

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
