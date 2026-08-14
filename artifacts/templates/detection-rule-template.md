# Detection Rule Template

Use this template for the Stage 6 monitoring and intrusion detection script.

Status: Draft

Change `Status` to `Final` only after the explanation, logging events, three detection rules, and response guidance are complete.

Save the completed artifact as:

```text
roteiros/etapa-6-deteccao-de-intrusoes.md
```

## Intrusion Detection

Briefly explain intrusion detection and its purpose in HospedaTche: TODO.

## Prevention and Detection

| Approach | Purpose | HospedaTche Example |
| --- | --- | --- |
| Prevention | Stop or reduce an attack before it succeeds. | TODO |
| Detection | Identify suspicious or harmful behavior during or after an attempt. | TODO |

## Events to Log

| Event Category | Event or Action | Required Fields | Sensitive Data Exclusions |
| --- | --- | --- | --- |
| Authentication | TODO | Actor, time, source, result, correlation ID | Passwords, tokens |
| Authorization | TODO | Actor, action, target, role, result | Session tokens |
| Business Operation | TODO | Actor, action, entity, previous state, new state | Unnecessary personal data |
| Payment | TODO | Actor or service, reference, action, result | Complete payment data |
| Error and Audit | TODO | Component, event, result, correlation ID | Secrets and stack details exposed to users |

## Detection Rules

### DR01 - Rule Title

| Field | Content |
| --- | --- |
| Observed Risk | RNN or ACNN - TODO |
| Data Source | TODO |
| Alert Condition | TODO measurable condition |
| Initial Response | TODO |
| Responsible Role | TODO |

### DR02 - Rule Title

| Field | Content |
| --- | --- |
| Observed Risk | RNN or ACNN - TODO |
| Data Source | TODO |
| Alert Condition | TODO measurable condition |
| Initial Response | TODO |
| Responsible Role | TODO |

### DR03 - Rule Title

| Field | Content |
| --- | --- |
| Observed Risk | RNN or ACNN - TODO |
| Data Source | TODO |
| Alert Condition | TODO measurable condition |
| Initial Response | TODO |
| Responsible Role | TODO |

## Response and Escalation

Alert validation: TODO.

Containment: TODO.

Escalation: TODO.

Evidence preservation: TODO.

Recovery or follow-up: TODO.

## Final Review

- [ ] Exactly three detection rules are included.
- [ ] Every rule links to an existing risk or abuse case.
- [ ] Every data source supports its alert condition.
- [ ] Alert conditions are measurable.
- [ ] Initial responses and responsible roles are defined.
- [ ] Logs exclude passwords, tokens, complete payment data, and unnecessary personal data.
