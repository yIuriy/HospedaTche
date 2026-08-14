# Stage 6 - Monitoring and Intrusion Detection Task Division

This document defines the minimum Stage 6 work division. Stage 6 describes how HospedaTche should detect suspicious behavior after deployment.

## Shared Goal

Connect known risks and abuse cases to observable events, simple detection rules, and initial responses.

```text
risk or abuse case -> event and log source -> alert condition -> initial response
```

Installing or implementing an intrusion detection system is not required.

## Minimum Deliverable

- a brief explanation of intrusion detection;
- the difference between prevention and detection;
- events that HospedaTche should log;
- three detection rules;
- an initial response for each alert.

Required output:

Template: `artifacts/templates/detection-rule-template.md`

```text
roteiros/etapa-6-deteccao-de-intrusoes.md
```

## Required Rule Structure

| Field | Required Content |
| --- | --- |
| Observed Risk | Related Stage 2 risk or Stage 1 abuse case |
| Data Source | Log, request, error, access record, or business event |
| Alert Condition | Measurable suspicious behavior |
| Initial Response | Immediate containment, validation, or escalation action |

Rules may use simple thresholds. Exact production tuning is not required, but each condition must be understandable and testable.

## Member Assignment

| Member | Minimum Work | Expected Output |
| --- | --- | --- |
| Iuri | Explain intrusion detection and distinguish preventive controls from detective controls using HospedaTche examples. | Introduction and comparison section |
| Sidnei | Define the authentication, authorization, business, payment, error, and audit events that should be logged. Include sensitive-data exclusions. | Events and log-source section |
| Lara | Define Detection Rule 1 with all required fields. | Rule DR01 |
| Dyonathan | Define Detection Rule 2 with all required fields. | Rule DR02 |
| Rafaela | Define Detection Rule 3 and consolidate common response and escalation guidance. | Rule DR03 and response section |

## Suggested Detection Topics

Choose three topics connected to prioritized risks:

- repeated failed logins or credential-stuffing patterns;
- forbidden-route access attempts;
- suspicious role or account-status changes;
- abnormal booking cancellation or refund volume;
- rejected payment callbacks or payment-state inconsistency;
- search or chat flooding;
- bulk room-rate, availability, or review changes.

## Logging Safety

Logs should identify actor, action, target, time, result, source, and correlation identifier when applicable. They must not store passwords, reset tokens, session tokens, complete payment data, or unnecessary personal data.

## Shared Final Review

Confirm that:

- exactly three rules are complete;
- each rule links to an existing risk or abuse case;
- data sources contain the information needed by the alert condition;
- alert conditions are more precise than generic statements such as "suspicious activity";
- responses identify the first action and responsible role;
- proposed logs avoid sensitive-data exposure.

---

# Stage 6 - Monitoring and Intrusion Detection Task Division (Operational Guide)

## Shared Goal

Connect known risks and abuse cases to observable events, simple detection rules, and initial responses.

```text
risk or abuse case -> event and log source -> alert condition -> initial response
```

Installing or implementing an intrusion detection system is not required.

## Minimum Deliverable

- brief explanation of intrusion detection;
- difference between prevention and detection;
- events that HospedaTche should log;
- three detection rules;
- initial response for each alert.

Template: `artifacts/templates/detection-rule-template.md`

## Task Division by Member

| Member | Minimum Task | Expected Output |
| --- | --- | --- |
| Iuri | Explain detection and distinguish preventive controls from detective controls using system examples. | Introduction and comparison |
| Sidnei | Define authentication, authorization, business, payment, error, and audit events, and excluded sensitive data. | Events and log sources |
| Lara | Define Rule DR01 with all required fields. | DR01 |
| Dyonathan | Define Rule DR02 with all required fields. | DR02 |
| Rafaela | Define Rule DR03 and consolidate response and escalation guidance. | DR03 and response section |

## Mandatory Rule Structure

Record observed risk, data source, measurable alert condition, and initial response.

## Log Safety

Record actor, action, target, timestamp, result, origin, and correlation identifier when applicable. Do not log passwords, tokens, complete payment data, or unnecessary personal data.

## Final Review

- verify exactly three rules;
- verify links to existing risks or abuse cases;
- verify if the data source supports the alert condition;
- use measurable conditions;
- identify first response and responsible role;
- avoid sensitive data exposure in logs.
