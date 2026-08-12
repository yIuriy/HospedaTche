# Stage 7 - DevSecOps and Final Video Task Division

This document defines the minimum Stage 7 work division. Stage 7 integrates the project artifacts into a continuous security workflow and a concise final presentation.

## Shared Goal

Show how security follows HospedaTche from planning through operation and summarize the project's evolution in a final video.

## Minimum Deliverable

- a textual description or diagram of a DevSecOps pipeline;
- security activities and evidence for each pipeline moment;
- at least three conditions that stop pipeline continuity;
- a versioned final-video script;
- a final video, preferably 5 to 8 minutes;
- participation from all five members.

Required output:

Template: `artifacts/templates/devsecops-video-template.md`

```text
roteiros/etapa-7-devsecops-e-video-final.md
```

A real pipeline implementation is not required.

## Pipeline Minimum Content

The pipeline must cover:

| Moment | Minimum Security Activity |
| --- | --- |
| Planning | Requirements, STRIDE, abuse cases, and risk analysis |
| Architecture | Security requirements, vulnerability mappings, and decisions |
| Implementation | Secure coding practices and tests |
| Automated Verification | Security tests and code or dependency analysis |
| Dynamic Verification | OWASP ZAP or equivalent authorized verification |
| Deployment | Approval and security stop conditions |
| Operation | Logs, detection rules, response, and recovery |

Each moment should identify the evidence produced and the condition required to continue.

## Required Stop Conditions

Define at least three objective conditions, such as:

- a security test fails;
- a critical vulnerability has not been analyzed;
- a secret is detected in the repository;
- a dependency contains an unacceptable known vulnerability;
- an access-control test fails.

## Member Assignment

| Member | Minimum Work | Expected Output |
| --- | --- | --- |
| Iuri | Describe planning, threat analysis, risks, security requirements, and architecture for the pipeline and video. | Planning and architecture segment |
| Sidnei | Describe secure implementation and automated security testing for the pipeline and video. | Implementation and test segment |
| Lara | Describe code and dependency analysis and define at least three objective stop conditions. | Analysis gates and stop conditions |
| Dyonathan | Describe dynamic verification, deployment, monitoring, response, and recovery. | Verification and operation segment |
| Rafaela | Consolidate the pipeline and video script, introduce HospedaTche, and close with project evolution and lessons learned. | Integrated document and opening/closing segments |

## Video Minimum Content

The video should present:

- the HospedaTche system and user roles;
- main threats and abuse cases;
- prioritized risks;
- security requirements and architecture decisions;
- two secure coding practices and their tests;
- main vulnerability-verification results;
- three detection rules;
- proposed DevSecOps pipeline;
- lessons learned.

It is not necessary to show every table. Prioritize the main decisions and the connection among stages.

## Participation Record

The script should identify the speaker and estimated duration of each segment. All members must appear or speak and should review whether their contributions are represented accurately.

## Shared Final Review

Confirm that:

- every stage appears in the pipeline and video;
- at least three stop conditions are objective;
- pipeline evidence corresponds to actual repository artifacts;
- the script identifies all speakers;
- estimated duration remains close to 5 to 8 minutes;
- the video does not expose credentials, tokens, personal data, or sensitive test details;
- the final delivery location or link is recorded as required by the course.

---

# Stage 7 - DevSecOps and Final Video Task Division (Operational Guide)

## Shared Goal

Show how security accompanies HospedaTche from planning to operation and summarize the project evolution in the final video.

## Minimum Deliverable

- textual description or diagram of the DevSecOps pipeline;
- security activity and evidence at each moment;
- at least three pipeline stop conditions;
- versioned final video script;
- final video, preferably 5 to 8 minutes;
- participation of all five members.

Template: `artifacts/templates/devsecops-video-template.md`

## Task Division by Member

| Member | Minimum Task | Expected Output |
| --- | --- | --- |
| Iuri | Describe planning, threats, risks, requirements, and architecture in the pipeline and video. | Planning and architecture segment |
| Sidnei | Describe secure implementation and automated tests. | Implementation and test segment |
| Lara | Describe code/dependency analysis and define at least three objective stop conditions. | Analysis gates and stop conditions |
| Dyonathan | Describe dynamic verification, deployment, monitoring, response, and recovery. | Verification and operation segment |
| Rafaela | Consolidate pipeline and script, introduce the system, and close with evolution and lessons learned. | Integrated document, opening and closing |

## Minimum Pipeline Content

Include planning, architecture, implementation, automated tests, code/dependency analysis, dynamic verification, deployment, monitoring, response, and recovery.

Each moment must specify the security activity, evidence produced, and condition to continue.

## Minimum Video Content

- system and user roles;
- main threats and abuse cases;
- prioritized risks;
- security requirements and architecture decisions;
- two secure practices and tests;
- main verification results;
- three detection rules;
- proposed pipeline;
- lessons learned.

## Final Review

- verify all stages in pipeline and video;
- verify at least three objective stop conditions;
- link evidence to real repository artifacts;
- identify speaker turns and durations for all members;
- maintain approximate duration of 5 to 8 minutes;
- remove credentials, tokens, personal data, and sensitive details;
- record the location or link for final submission.
