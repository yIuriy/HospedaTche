# Risk Treatment Template

Use this template for Stage 2 risk analysis and treatment records.

## Module

Module: `<module-name>`

Scope: `<short module scope>`

Stage 1 sources:

- STRIDE threats: `artifacts/threat-modeling/<module>/`
- Abuse cases: `artifacts/abuse-cases/<module>/`

## Probability Criteria

| Value | Classification | Criteria |
| --- | --- | --- |
| 1 | Low | Event depends on uncommon conditions, very specific access, or high technical capability. |
| 2 | Medium-low | Event is possible, but depends on a specific vulnerability or condition. |
| 3 | Medium-high | Event is plausible and can happen in common use or attack situations. |
| 4 | High | Event can happen easily, frequently, or during predictable system conditions. |

## Impact Criteria

| Value | Classification | Criteria |
| --- | --- | --- |
| 1 | Low | Causes small disruption and can be corrected quickly. |
| 2 | Moderate | Causes limited interruption or inconsistency, with recovery possible. |
| 3 | High | Causes relevant harm to users, business, administration, or privacy. |
| 4 | Very high | Can affect many users, compromise critical operations, or cause severe harm. |

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
| RNN | TNN - Threat title | ACNN - Abuse case title | TODO | TODO | TODO | TODO | TODO | TODO |

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

Treatment strategies: avoid, reduce, share, accept.

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
