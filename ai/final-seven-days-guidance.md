# Final Seven Days Guidance

Stages 3 to 7 were reduced to the minimum necessary scope so the group can finish the project in the remaining time.

The group must continue using the same system and repository. A complete software implementation is not required.

Two delivery modes are accepted:

- Practical delivery: for groups that already have an implemented system or can produce small code excerpts.
- Descriptive delivery: for earlier-semester students, using pseudocode, examples, configurations, diagrams, and detailed descriptions of how implementation would be done.

Evaluation focuses on coherence with the identified risks, quality of decisions, justifications, evidence, and individual participation.

## Stage 3 - Secure Architecture Design

Goal: transform the risks and controls from previous stages into security requirements and architecture decisions.

Minimum deliverables:

- three security requirements derived from prioritized risks;
- mapping of three cataloged vulnerabilities;
- one simple secure architecture diagram;
- three justified architecture decisions.

Security requirements must be specific and verifiable.

Suggested table:

| ID | Source Risk | Security Requirement | Verification Criterion |
| --- | --- | --- | --- |
| SR01 | R01 | The system must require re-authentication before confirming a sensitive operation. | The operation must be rejected when re-authentication is not completed. |

For each requirement, map one related vulnerability category or reference from recognized sources such as CWE, OWASP Top 10, OWASP ASVS, or OWASP Cheat Sheet Series.

Suggested table:

| Risk | Vulnerability or Category | Reference Used | Relationship to HospedaTche |
| --- | --- | --- | --- |
| R01 | Authentication or session management failure | CWE or OWASP | Could allow an attacker to use another person's account. |

The architecture diagram should show:

- users;
- interface or application;
- authentication service;
- authorization rules;
- database;
- logs or monitoring;
- relevant external services;
- position of the main controls.

The diagram source file and exported image must be versioned in the repository.

Architecture decisions must include:

- problem or risk addressed;
- decision made;
- reason;
- affected component;
- expected result.

Suggested table:

| Decision | Addressed Risk | Justification |
| --- | --- | --- |
| Validate permissions on the server for every administrative operation. | R06 | Hiding options in the interface does not prevent direct access to protected functions. |

## Stage 4 - Secure Code and Security Tests

Goal: demonstrate how architecture decisions become secure implementation practices.

OWASP Cheat Sheet Series is recommended as a practical reference. OWASP ASVS can also be used to select verifiable requirements.

A complete system implementation is not required.

Minimum deliverables:

- two secure coding practices related to previous risks and requirements;
- two security tests for each practice, defined before the implementation example;
- implementation, pseudocode, or detailed description;
- expected result;
- OWASP reference used.

Possible practices:

- input validation;
- parameterized queries;
- authorization control;
- secure password storage;
- session protection;
- secure error handling;
- secrets protection;
- logging without sensitive data exposure.

Each practice must include:

- related risk and requirement;
- one valid use case test;
- one malicious, invalid, or unauthorized test;
- expected secure result;
- implementation, pseudocode, illustrative excerpt, commented configuration, flow, or step-by-step description.

Suggested table:

| Test | Input or Action | Expected Result |
| --- | --- | --- |
| ST01 | Guest tries to access an administrative function. | The request is denied and the event is logged. |
| ST02 | Authorized Administrator accesses the function. | The request is allowed. |

## Stage 5 - Vulnerability Verification

Goal: use a security testing tool to observe vulnerabilities, alerts, and insecure configurations.

Only test:

- the group's own system;
- a system with express authorization; or
- a deliberately vulnerable application executed for educational purposes.

Testing third-party systems without authorization is prohibited.

Recommended fallback environment for groups without an implemented web system: OWASP Juice Shop.

Suggested tool: OWASP ZAP.

Minimum deliverables:

- system or environment tested;
- tool used;
- basic test configuration;
- execution evidence;
- analysis of three alerts or findings;
- proposed correction for each finding.

Suggested table:

| ID | Alert or Finding | Evidence | Possible Impact | OWASP or CWE Relationship | Proposed Correction |
| --- | --- | --- | --- | --- | --- |
| A01 | Alert description. | Screenshot or report excerpt. | Possible consequence. | Related category. | Suggested measure. |

It is not necessary to fully exploit vulnerabilities or gain unauthorized access. The goal is to interpret the tool results.

If the tool reports fewer than three relevant alerts, analyze the alerts found and explain why other results were discarded as informational, duplicated, or possible false positives.

Screenshots and reports must be stored in `evidences/stage-5/`.

## Stage 6 - Monitoring and Intrusion Detection

Goal: understand how a system can identify suspicious behavior after deployment.

It is not necessary to install or implement an intrusion detection system.

Deliverable path:

```text
roteiros/etapa-6-deteccao-de-intrusoes.md
```

Minimum deliverables:

- brief explanation of intrusion detection;
- difference between prevention and detection;
- system events that should be logged;
- three simple detection rules;
- what should happen after an alert.

Each rule must contain:

| Field | Description |
| --- | --- |
| Observed Risk | Related risk or abuse case. |
| Data Source | Log, access record, error, request, or event used. |
| Alert Condition | Behavior considered suspicious. |
| Initial Response | Recommended action after detection. |

Suggested table:

| Observed Risk | Data Source | Alert Condition | Initial Response |
| --- | --- | --- | --- |
| Account misuse | Authentication logs | Many consecutive failed attempts for the same account. | Alert the team and temporarily limit new attempts. |

Three rules are enough.

## Stage 7 - DevSecOps and Final Video

Goal: integrate everything produced during the course and show how security can continuously follow the development lifecycle.

A real pipeline implementation is not required.

Minimum deliverables:

- textual description or diagram of a DevSecOps pipeline;
- final video script;
- final video presenting the project evolution.

Deliverable path:

```text
roteiros/etapa-7-devsecops-e-video-final.md
```

The pipeline should include:

- planning and threat analysis;
- requirements and architecture decisions;
- secure implementation;
- automated tests;
- code and dependency analysis;
- dynamic testing or pentest;
- deployment;
- monitoring and response.

Suggested table:

| Moment | Security Activity | Evidence Produced | Condition to Continue |
| --- | --- | --- | --- |
| Planning | STRIDE and risk analysis | Threat and risk tables | Priority risks identified |
| Code | Secure practices and tests | Code, pseudocode, or tests | Tests approved |
| Verification | ZAP or equivalent tool | Alert report | Critical findings analyzed |
| Operation | Logs and detection rules | Alerts and records | Incidents handled |

Include at least three conditions that would block pipeline continuity, such as:

- failed security test;
- unanalyzed critical vulnerability;
- secret found in the repository;
- dependency with known vulnerability;
- access-control failure.

The final video should preferably have 5 to 8 minutes and present:

- chosen system;
- main threats and abuse cases;
- prioritized risks;
- architecture decisions;
- secure coding practices;
- main verification results;
- detection rules;
- proposed DevSecOps pipeline;
- what the group learned.

The video script must be versioned in the repository. It is not necessary to show all tables; the video should highlight the main decisions and the evolution of the software during the course.

All members must participate. Video participation may be divided by the group, but individual evaluation also considers commits made in different stages.

## Final Simplified Checklist

Before delivery, verify that the repository contains:

- Stage 1: STRIDE threats and abuse cases;
- Stage 2: risk analysis, prioritization, and treatment;
- Stage 3: three requirements, three vulnerabilities, one diagram, and three decisions;
- Stage 4: two secure coding practices with tests;
- Stage 5: one verification session with up to three analyzed findings;
- Stage 6: script with three detection rules;
- Stage 7: pipeline, script, and final video;
- individual commits from all members;
- files, diagrams, and evidence versioned in GitHub.
