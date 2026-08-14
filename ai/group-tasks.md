# Group Tasks by Stage - Minimum Scope

This document defines the minimum group work for each project stage. The English section is the canonical repository version. A PT-BR operational translation is included after it for group use.

## Group Members

| Member | Name | Main Module |
| --- | --- | --- |
| 1 | Iuri | User registration and identity |
| 2 | Sidnei | Authentication and access control |
| 3 | Lara | Accommodation and room operations |
| 4 | Dyonathan | Booking and payment |
| 5 | Rafaela | Search, reviews, notifications, and messaging |

## Shared Rules

- Use the same HospedaTche risks and modules throughout all stages.
- Stages 3 to 7 may use code, pseudocode, configurations, diagrams, or detailed descriptions.
- A complete application implementation is not required.
- Every member must make identifiable commits in different stages.
- Version all documents, diagram sources, exported images, reports, and evidence in GitHub.
- Only perform security tests against the group system, an expressly authorized system, or an intentionally vulnerable educational application.

## Detailed Task Guides

- Stage 1: `ai/stage-1-threat-modeling-tasks.md`
- Stage 2: `ai/stage-2-risk-treatment-tasks.md`
- Stage 3: `ai/stage-3-secure-architecture-tasks.md`
- Stage 4: `ai/stage-4-secure-code-testing-tasks.md`
- Stage 5: `ai/stage-5-vulnerability-verification-tasks.md`
- Stage 6: `ai/stage-6-intrusion-detection-tasks.md`
- Stage 7: `ai/stage-7-devsecops-video-tasks.md`

## Stage Templates

- Stage 3: `artifacts/templates/secure-architecture-template.md`
- Stage 4: `artifacts/templates/secure-code-practice-template.md`
- Stage 5: `artifacts/templates/vulnerability-verification-template.md`
- Stage 6: `artifacts/templates/detection-rule-template.md`
- Stage 7: `artifacts/templates/devsecops-video-template.md`

## Stage 1 - Threat Modeling and Abuse Cases

### Minimum Deliverable

- STRIDE threats for every assigned module;
- abuse cases linked to the threats;
- references to related functional and non-functional requirements;
- updated threat and abuse-case maps;
- successful validation of changed artifacts.

| Member | Minimum Contribution | Main Output |
| --- | --- | --- |
| Iuri | Review identity registration, CPF/email misuse, fake accounts, account takeover, and recovery threats and abuse cases. | `artifacts/threat-modeling/accounts/` and `artifacts/abuse-cases/accounts/` |
| Sidnei | Review login, session, role, protected-route, and privilege-escalation threats and abuse cases. Coordinate account IDs with Iuri. | `artifacts/threat-modeling/accounts/` and `artifacts/abuse-cases/accounts/` |
| Lara | Review room availability, status, rates, capacity, cleaning, maintenance, and stay-operation threats and abuse cases. | `artifacts/threat-modeling/accommodation/` and `artifacts/abuse-cases/accommodation/` |
| Dyonathan | Review booking, cancellation, expiration, payment, refund, and transaction-audit threats and abuse cases. | `artifacts/threat-modeling/booking/`, `artifacts/threat-modeling/payments/`, `artifacts/abuse-cases/booking/`, and `artifacts/abuse-cases/payment/` |
| Rafaela | Review search overload, hidden data, chat, notifications, reviews, and message-history threats and abuse cases. | `artifacts/threat-modeling/search-messaging/` and `artifacts/abuse-cases/search-messaging/` |

## Stage 2 - Risk Analysis, Prioritization, and Treatment

### Minimum Deliverable

- common probability and impact criteria;
- risk register with score, level, and justification;
- risk prioritization;
- treatment strategy and NIST CSF 2.0 mapping;
- concrete controls, owners, verification evidence, implementation order, and expected residual risk;
- successful risk-treatment validation.

| Member | Minimum Contribution | Main Output |
| --- | --- | --- |
| Iuri | Maintain identity, fake-account, account-takeover, CPF/email exposure, and password-recovery risks. | `artifacts/risk-treatment/accounts/risk-register.md` |
| Sidnei | Maintain authentication, session, route authorization, staff hierarchy, and privilege-escalation risks. Coordinate risk IDs with Iuri. | `artifacts/risk-treatment/accounts/risk-register.md` |
| Lara | Maintain availability, room status, rate, capacity, cleaning, maintenance, and operational risks. | `artifacts/risk-treatment/accommodation/risk-register.md` |
| Dyonathan | Maintain booking-state, cancellation, payment, confirmation, refund, and auditability risks. | `artifacts/risk-treatment/booking/risk-register.md` and `artifacts/risk-treatment/payment/risk-register.md` |
| Rafaela | Maintain search availability, information exposure, chat abuse, notification, and review-manipulation risks. | `artifacts/risk-treatment/search-messaging/risk-register.md` |

## Stage 3 - Secure Architecture Design

### Minimum Deliverable

- three verifiable security requirements derived from high or critical risks;
- three mappings to recognized CWE or OWASP references;
- one secure architecture diagram, including its source and exported image;
- three justified architecture decisions.

| Member | Minimum Contribution | Expected Output |
| --- | --- | --- |
| Iuri | Write security requirement SR01 and its vulnerability mapping. | One requirement and one CWE/OWASP mapping |
| Sidnei | Write security requirement SR02 and its vulnerability mapping. | One requirement and one CWE/OWASP mapping |
| Lara | Write security requirement SR03 and its vulnerability mapping. | One requirement and one CWE/OWASP mapping |
| Dyonathan | Create the architecture diagram with users, application, authentication, authorization, database, logs, controls, and relevant external services. | Diagram source and exported image |
| Rafaela | Write and justify AD01, AD02, and AD03, linking each decision to a risk, affected component, and expected result. | Three architecture decisions and final consistency review |

## Stage 4 - Secure Code and Security Tests

### Minimum Deliverable

- two secure coding practices related to Stage 3;
- two tests per practice, defined before the implementation example;
- implementation, pseudocode, configuration, or detailed description;
- expected secure result and OWASP reference for each practice.

| Member | Minimum Contribution | Expected Output |
| --- | --- | --- |
| Iuri | Define Practice 1, its related risk and requirement, and its implementation or pseudocode. | Secure Practice 1 |
| Sidnei | Define one valid test and one malicious, invalid, or unauthorized test for Practice 1. | Two tests for Practice 1 |
| Lara | Define Practice 2, its related risk and requirement, and its implementation or pseudocode. | Secure Practice 2 |
| Dyonathan | Define one valid test and one malicious, invalid, or unauthorized test for Practice 2. | Two tests for Practice 2 |
| Rafaela | Add expected results and OWASP references and verify traceability to Stage 3. | Integrated Stage 4 document |

## Stage 5 - Vulnerability Verification

### Minimum Deliverable

- one authorized verification session using OWASP ZAP or an equivalent tool;
- identification of the system, environment, tool, and basic configuration;
- screenshots or report excerpts stored in `evidences/stage-5/`;
- analysis of up to three relevant alerts or findings;
- proposed correction for each finding.

| Member | Minimum Contribution | Expected Output |
| --- | --- | --- |
| Iuri | Document the authorized target, environment, scope, and basic test configuration. | Scope and configuration record |
| Sidnei | Execute or document the verification session and organize screenshots or report excerpts. | Execution evidence in `evidences/stage-5/` |
| Lara | Analyze finding A01, including evidence, impact, CWE/OWASP relationship, and correction. | Finding A01 analysis |
| Dyonathan | Analyze finding A02 using the same fields. | Finding A02 analysis |
| Rafaela | Analyze finding A03 and consolidate the report. If fewer findings exist, explain why other tool results were discarded. | Finding A03 or discard justification and final report |

## Stage 6 - Monitoring and Intrusion Detection

### Minimum Deliverable

- a short explanation of intrusion detection;
- the difference between prevention and detection;
- the system events that should be logged;
- three detection rules;
- an initial response for each alert.

Main output: `roteiros/etapa-6-deteccao-de-intrusoes.md`.

| Member | Minimum Contribution | Expected Output |
| --- | --- | --- |
| Iuri | Explain intrusion detection and the difference between prevention and detection. | Introductory section |
| Sidnei | Define the authentication, authorization, business, payment, error, and audit events that should be logged without exposing sensitive data. | Logging-events section |
| Lara | Define Rule 1 with observed risk, data source, alert condition, and initial response. | Detection Rule 1 |
| Dyonathan | Define Rule 2 with the same fields. | Detection Rule 2 |
| Rafaela | Define Rule 3 and consolidate the response and escalation guidance. | Detection Rule 3 and final review |

## Stage 7 - DevSecOps and Final Video

### Minimum Deliverable

- a textual description or diagram of the DevSecOps pipeline;
- at least three conditions that stop pipeline continuity;
- a versioned final-video script;
- a final video, preferably 5 to 8 minutes, with participation from all members.

Main output: `roteiros/etapa-7-devsecops-e-video-final.md`.

| Member | Minimum Contribution | Expected Output |
| --- | --- | --- |
| Iuri | Describe planning, threat analysis, security requirements, and architecture in the pipeline and video. | Planning and architecture segment |
| Sidnei | Describe secure implementation and automated security tests in the pipeline and video. | Implementation and tests segment |
| Lara | Describe code and dependency analysis and define at least three pipeline stop conditions. | Analysis gates and stop conditions |
| Dyonathan | Describe dynamic testing, deployment, monitoring, and response in the pipeline and video. | Verification and operations segment |
| Rafaela | Consolidate the pipeline and script, introduce the system, and close with project evolution and lessons learned. | Final script and integration |

All members must appear or speak in the final video and confirm that their contribution is represented accurately.

## Validation Commands

Run only validators related to changed artifacts:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-stride-threats.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-abuse-cases.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-business-rules.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-risk-treatment.ps1
```

---

# Stage Task Division - Minimum Scope (Operational Guide)

This section translates the operational division above. The English section remains the canonical repository reference.

## Group Members

| Member | Name | Main Module |
| --- | --- | --- |
| 1 | Iuri | User registration and identity |
| 2 | Sidnei | Authentication and access control |
| 3 | Lara | Accommodation and room operations |
| 4 | Dyonathan | Booking and payment |
| 5 | Rafaela | Search, reviews, notifications, and messaging |

## Shared Rules

- Use the same HospedaTche risks and modules throughout all stages.
- In Stages 3 to 7, code, pseudocode, configurations, diagrams, or detailed descriptions may be used.
- Full application implementation is not required.
- Every member must have identifiable commits in different stages.
- Version documents, diagram sources, exported images, reports, and evidence in GitHub.
- Perform security tests only against the group system, an expressly authorized system, or an intentionally vulnerable educational application.

## Detailed Task Guides

- Stage 1: `ai/stage-1-threat-modeling-tasks.md`
- Stage 2: `ai/stage-2-risk-treatment-tasks.md`
- Stage 3: `ai/stage-3-secure-architecture-tasks.md`
- Stage 4: `ai/stage-4-secure-code-testing-tasks.md`
- Stage 5: `ai/stage-5-vulnerability-verification-tasks.md`
- Stage 6: `ai/stage-6-intrusion-detection-tasks.md`
- Stage 7: `ai/stage-7-devsecops-video-tasks.md`

## Stage Templates

- Stage 3: `artifacts/templates/secure-architecture-template.md`
- Stage 4: `artifacts/templates/secure-code-practice-template.md`
- Stage 5: `artifacts/templates/vulnerability-verification-template.md`
- Stage 6: `artifacts/templates/detection-rule-template.md`
- Stage 7: `artifacts/templates/devsecops-video-template.md`

## Stage 1 - Threat Modeling and Abuse Cases

### Minimum Deliverable

- STRIDE threats for all assigned modules;
- abuse cases linked to threats;
- references to related functional and non-functional requirements;
- updated threat and abuse case maps;
- successful validation of modified artifacts.

| Member | Minimum Contribution | Main Output |
| --- | --- | --- |
| Iuri | Review registration, CPF/email misuse, fake accounts, account takeover, and password recovery threats and abuse cases. | `artifacts/threat-modeling/accounts/` and `artifacts/abuse-cases/accounts/` |
| Sidnei | Review login, session, roles, protected routes, and privilege escalation threats and abuse cases. Coordinate account IDs with Iuri. | `artifacts/threat-modeling/accounts/` and `artifacts/abuse-cases/accounts/` |
| Lara | Review availability, status, rate, capacity, cleaning, maintenance, and accommodation operation threats and abuse cases. | `artifacts/threat-modeling/accommodation/` and `artifacts/abuse-cases/accommodation/` |
| Dyonathan | Review booking, cancellation, expiration, payment, refund, and transaction auditing threats and abuse cases. | `booking` and `payment` folders under `artifacts/threat-modeling/` and `artifacts/abuse-cases/` |
| Rafaela | Review search overload, hidden data, chat, notifications, reviews, and message history threats and abuse cases. | `artifacts/threat-modeling/search-messaging/` and `artifacts/abuse-cases/search-messaging/` |

## Stage 2 - Risk Analysis, Prioritization, and Treatment

### Minimum Deliverable

- common probability and impact criteria;
- risk register with score, level, and justification;
- risk prioritization;
- treatment strategy and NIST CSF 2.0 mapping;
- concrete controls, responsible parties, verification evidence, implementation order, and expected residual risk;
- successful risk treatment validation.

| Member | Minimum Contribution | Main Output |
| --- | --- | --- |
| Iuri | Maintain identity, fake account, account takeover, CPF/email exposure, and password recovery risks. | `artifacts/risk-treatment/accounts/risk-register.md` |
| Sidnei | Maintain authentication, session, route authorization, internal hierarchy, and privilege escalation risks. Coordinate IDs with Iuri. | `artifacts/risk-treatment/accounts/risk-register.md` |
| Lara | Maintain availability, status, rate, capacity, cleaning, maintenance, and room operation risks. | `artifacts/risk-treatment/accommodation/risk-register.md` |
| Dyonathan | Maintain booking state, cancellation, payment, confirmation, refund, and auditing risks. | `artifacts/risk-treatment/booking/risk-register.md` and `artifacts/risk-treatment/payment/risk-register.md` |
| Rafaela | Maintain search availability, information exposure, chat abuse, notification, and review manipulation risks. | `artifacts/risk-treatment/search-messaging/risk-register.md` |

## Stage 3 - Secure Architecture Design

### Minimum Deliverable

- three verifiable security requirements derived from high or critical risks;
- three mappings to recognized CWE or OWASP references;
- one secure architecture diagram with source file and exported image;
- three justified architecture decisions.

| Member | Minimum Contribution | Expected Output |
| --- | --- | --- |
| Iuri | Write security requirement SR01 and map its vulnerability. | One requirement and one CWE/OWASP mapping |
| Sidnei | Write security requirement SR02 and map its vulnerability. | One requirement and one CWE/OWASP mapping |
| Lara | Write security requirement SR03 and map its vulnerability. | One requirement and one CWE/OWASP mapping |
| Dyonathan | Create diagram with users, application, authentication, authorization, database, logs, controls, and relevant external services. | Diagram source and exported image |
| Rafaela | Write and justify AD01, AD02, and AD03, linking each decision to risk, affected component, and expected result. | Three decisions and final consistency review |

## Stage 4 - Secure Code and Security Testing

### Minimum Deliverable

- two secure code practices related to Stage 3;
- two tests per practice defined before the implementation example;
- implementation, pseudocode, configuration, or detailed description;
- expected secure result and OWASP reference for each practice.

| Member | Minimum Contribution | Expected Output |
| --- | --- | --- |
| Iuri | Define Practice 1, related risk and requirement, and implementation or pseudocode. | Secure Practice 1 |
| Sidnei | Define one valid test and one malicious/unauthorized test for Practice 1. | Two tests for Practice 1 |
| Lara | Define Practice 2, related risk and requirement, and implementation or pseudocode. | Secure Practice 2 |
| Dyonathan | Define one valid test and one malicious/unauthorized test for Practice 2. | Two tests for Practice 2 |
| Rafaela | Add expected results and OWASP references, verifying traceability with Stage 3. | Integrated Stage 4 document |

## Stage 5 - Vulnerability Verification

### Minimum Deliverable

- one authorized verification session with OWASP ZAP or equivalent tool;
- identification of target system, environment, tool, and basic configuration;
- screenshots or report excerpts in `evidences/stage-5/`;
- analysis of up to three relevant alerts or findings;
- proposed correction for each finding.

| Member | Minimum Contribution | Expected Output |
| --- | --- | --- |
| Iuri | Document authorized target, environment, scope, and basic test configuration. | Scope and configuration record |
| Sidnei | Execute or document verification session and organize screenshots or report excerpts. | Evidence files in `evidences/stage-5/` |
| Lara | Analyze finding A01 with evidence, impact, CWE/OWASP relationship, and correction. | Finding A01 analysis |
| Dyonathan | Analyze finding A02 using the same fields. | Finding A02 analysis |
| Rafaela | Analyze finding A03 and consolidate report. If fewer findings exist, justify discarded results. | Finding A03 or discard rationale and final report |

## Stage 6 - Monitoring and Intrusion Detection

### Minimum Deliverable

- brief explanation of intrusion detection;
- difference between prevention and detection;
- system events that should be logged;
- three detection rules;
- initial response for each alert.

Main deliverable: `roteiros/etapa-6-deteccao-de-intrusoes.md`.

| Member | Minimum Contribution | Expected Output |
| --- | --- | --- |
| Iuri | Explain intrusion detection and the difference between prevention and detection. | Introductory section |
| Sidnei | Define authentication, authorization, business, payment, error, and audit events to be logged without sensitive data exposure. | Logged events section |
| Lara | Define Rule 1 with observed risk, data source, alert condition, and initial response. | Detection Rule 1 |
| Dyonathan | Define Rule 2 with the same fields. | Detection Rule 2 |
| Rafaela | Define Rule 3 and consolidate response and escalation guidance. | Detection Rule 3 and final review |

## Stage 7 - DevSecOps and Final Video

### Minimum Deliverable

- textual description or diagram of DevSecOps pipeline;
- at least three conditions stopping pipeline continuity;
- versioned final video script;
- final video, preferably 5 to 8 minutes, with participation of all members.

Main deliverable: `roteiros/etapa-7-devsecops-e-video-final.md`.

| Member | Minimum Contribution | Expected Output |
| --- | --- | --- |
| Iuri | Describe planning, threat analysis, security requirements, and architecture in pipeline and video. | Planning and architecture segment |
| Sidnei | Describe secure implementation and automated security tests in pipeline and video. | Implementation and test segment |
| Lara | Describe code and dependency analysis and define at least three pipeline stop conditions. | Analysis gates and stop conditions |
| Dyonathan | Describe dynamic testing, deployment, monitoring, and response in pipeline and video. | Verification and operation segment |
| Rafaela | Consolidate pipeline and script, introduce system, and close with project evolution and lessons learned. | Final script and integration |

All members must appear or speak in the final video and confirm that their contribution is accurately represented.

## Validation Commands

Run only validators related to modified artifacts:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-stride-threats.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-abuse-cases.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-business-rules.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-risk-treatment.ps1
```
