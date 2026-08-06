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

### R01 - False Room Availability

Probability justification: Availability updates are part of normal room operations, so misuse is plausible if staff permissions and approval rules are weak.

Impact justification: False availability can create double booking, block legitimate reservations, or make unavailable rooms appear bookable.

Affected users, data, features, or components: Guests, Receptionists, Managers, room availability records, booking search, and maintenance blocks.

Expected consequences: Booking inconsistency, guest dissatisfaction, lost revenue, staff rework, and manual correction of availability records.

Risk level justification: Probability 3 and impact 4 produce score 12, classified as Critical because room availability directly affects booking correctness.

### R02 - False Room Status

Probability justification: Room status is frequently updated by staff during check-in, check-out, cleaning, and maintenance workflows.

Impact justification: Incorrect status can lead to unsafe room assignment, hidden occupancy, delayed cleaning, or check-in failure.

Affected users, data, features, or components: Guests, Receptionists, Managers, room status records, cleaning flow, maintenance flow, and stay operations.

Expected consequences: Operational disruption, guest service failure, room turnover errors, and unreliable room status history.

Risk level justification: Probability 3 and impact 4 produce score 12, classified as Critical because wrong room status can affect safety and core operations.

### R03 - Unauthorized Room Deactivation

Probability justification: Deactivation requires privileged room management access, so it depends on a specific staff action or control failure.

Impact justification: Deactivated rooms stop receiving reservations, but the condition can usually be corrected after review.

Affected users, data, features, or components: Managers, room inventory, public availability, and reservation planning.

Expected consequences: Reduced sellable inventory, lost reservations, inaccurate reports, and operational confusion.

Risk level justification: Probability 2 and impact 3 produce score 6, classified as Medium because the effect is relevant but usually recoverable.

### R04 - Unauthorized Room Rate Tampering

Probability justification: Rate management is a normal Manager activity and can be abused if changes do not require approval or review.

Impact justification: Incorrect rates can cause financial loss, guest disputes, voucher inconsistency, and distrust in pricing records.

Affected users, data, features, or components: Guests, Managers, room rates, booking price calculation, reservation voucher, and financial reporting.

Expected consequences: Undercharging, overcharging, manual refunds or corrections, and revenue reporting errors.

Risk level justification: Probability 3 and impact 3 produce score 9, classified as High because pricing errors directly affect revenue and guest trust.

### R05 - Staff Room Schedule Exposure

Probability justification: The risk depends on an authorization failure or exposed endpoint, but schedule views are common staff features.

Impact justification: Schedule exposure can reveal guest stay patterns and operational information, but it does not directly change room records.

Affected users, data, features, or components: Guests, staff users, room schedules, reservation dates, and staff-only operational views.

Expected consequences: Privacy violation, misuse of stay timing information, and loss of trust in staff-only access controls.

Risk level justification: Probability 2 and impact 3 produce score 6, classified as Medium because privacy harm is relevant but operational integrity is not directly modified.

### R06 - Occupancy Capacity Tampering

Probability justification: Capacity changes require privileged configuration access, but the action is plausible during room management.

Impact justification: False capacity can allow unsafe occupancy, violate hotel rules, and corrupt reservation validation.

Affected users, data, features, or components: Guests, Managers, room capacity records, booking validation, companion registration, and hotel policy enforcement.

Expected consequences: Unsafe stays, over-occupancy, guest disputes, policy violations, and unreliable capacity reports.

Risk level justification: Probability 2 and impact 4 produce score 8, classified as High because capacity directly affects safety and policy compliance.

### R07 - Fraudulent Check In Or Check Out Update

Probability justification: Check-in and check-out are controlled staff actions, so abuse depends on Receptionist access or workflow weakness.

Impact justification: Fraudulent stay transitions affect reservation lifecycle, room status, cleaning triggers, and audit reliability.

Affected users, data, features, or components: Guests, Receptionists, reservation status, room status, cleaning queue, and stay history.

Expected consequences: Incorrect stay records, wrong room availability, check-in disputes, billing confusion, and audit inconsistency.

Risk level justification: Probability 2 and impact 4 produce score 8, classified as High because stay transitions connect room operations with reservation correctness.

### R08 - Guest Stay Identification Tampering

Probability justification: Identification confirmation is limited to check-in staff, but incorrect edits are possible without traceable correction workflow.

Impact justification: Tampered identification data can harm stay registration accuracy and expose or misrepresent guest information.

Affected users, data, features, or components: Guests, Receptionists, guest identification confirmation, reservation history, and audit records.

Expected consequences: Incorrect stay registration, support disputes, privacy risk, and unreliable historical records.

Risk level justification: Probability 2 and impact 3 produce score 6, classified as Medium because the risk affects privacy and records but is more limited than booking or safety risks.

### R09 - Companion Registration Tampering

Probability justification: Companion edits are restricted to staff workflows and depend on missing validation or review.

Impact justification: Incorrect companion data can violate occupancy policy, but its impact is usually limited to one stay record.

Affected users, data, features, or components: Guests, companions, Receptionists, companion records, occupancy count, and stay details.

Expected consequences: Inaccurate stay records, guest disputes, occupancy mismatch, and manual correction needs.

Risk level justification: Probability 2 and impact 2 produce score 4, classified as Medium because the risk is operationally relevant but usually contained.

### R10 - Cleaning Queue Tampering

Probability justification: Cleaning queue updates happen frequently during room turnover and can be abused if completion evidence is not required.

Impact justification: Incorrect cleaning status can lead to assigning an unclean room and harming guest service.

Affected users, data, features, or components: Guests, Receptionists, Managers, cleaning queue, room status, and room turnover process.

Expected consequences: Guest dissatisfaction, delayed cleaning, check-in disruption, and unreliable cleaning status records.

Risk level justification: Probability 3 and impact 3 produce score 9, classified as High because cleaning status affects daily operations and guest experience.

### R11 - Maintenance Note Tampering

Probability justification: Maintenance status and notes are expected operational updates, so misuse is plausible without approval and audit controls.

Impact justification: Hidden maintenance issues can make unsafe rooms appear operational and delay necessary repair.

Affected users, data, features, or components: Guests, Receptionists, Managers, maintenance notes, room status, availability blocks, and repair workflow.

Expected consequences: Unsafe room assignment, delayed repair, operational interruption, guest complaints, and loss of maintenance traceability.

Risk level justification: Probability 3 and impact 4 produce score 12, classified as Critical because maintenance integrity is tied to guest safety and room availability.

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
