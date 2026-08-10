# Project Instructions

## 1. Objective

Start security analysis before implementation by identifying malicious behaviors, threats, and impacts related to the software system.

Stage 1 must produce Markdown documentation in this repository containing:

- brief system description;
- main users, resources, and protected information;
- STRIDE threat modeling;
- abuse cases;
- optional diagrams that help explain system behavior and threats.

Stage 2 continues that work by transforming Stage 1 threats and abuse cases into risks that can be evaluated, compared, prioritized, and treated using NIST Cybersecurity Framework 2.0 functions.

Stages 3 to 7 were reduced to a minimum viable scope for the final delivery period. They may be completed with practical artifacts when code exists, or with descriptive artifacts such as pseudocode, configurations, diagrams, examples, and detailed implementation descriptions.

## 2. Chosen System

HospedaTche is a hotel accommodation system.

The system should support different user types, information exchange, and security-relevant operations. A complete implementation is not required; focus on understanding the system, analyzing security problems, planning treatment, and documenting how controls would be designed, implemented, verified, monitored, and integrated into DevSecOps.

## 3. Repository Requirements

All project files must be versioned in this repository, including:

- Markdown documents;
- images;
- diagrams;
- diagram source files;
- tables or complementary materials.

Do not rely only on external diagram links. Store source files and exported images in the repository.

## 4. Minimum Document Structure

The Stage 1 content must stay available. Stage 2 content must be added without deleting or replacing previous STRIDE threats, abuse cases, assets, users, or components.

### 4.1 System Identification

Include:

- system name;
- group members;
- repository URL;
- short justification for choosing the system.

### 4.2 System Description

Describe how the software works clearly enough for someone unfamiliar with it to understand:

- what problem the system solves;
- who uses the system;
- main features;
- information stored or transmitted;
- resources that need protection.

This does not need to be a complete requirements specification, but it must support security analysis.

### 4.3 Users, Assets, and Interaction Points

Identify main elements, such as:

- users and access profiles;
- personal or sensitive data;
- credentials;
- payments;
- reviews;
- messages;
- location data;
- documents;
- database;
- servers;
- APIs;
- mobile or web apps;
- external services.

Highlight important assets: resources that could cause damage if accessed, changed, destroyed, or made unavailable without authorization.

### 4.4 Architecture or Flow Overview

Provide a simplified view of how users and components interact. This can be text, table, or diagram.

Suggested diagrams:

- context diagram;
- data flow diagram;
- simplified component diagram;
- use case diagram;
- representation of users, services, and databases.

Diagrams must be readable and versioned in the repository.

### 4.5 STRIDE Threat Modeling

Apply STRIDE to HospedaTche. Identify concrete threats connected to system behavior.

STRIDE categories:

- Spoofing: identity forgery;
- Tampering: unauthorized data modification;
- Repudiation: denying an action that was performed;
- Information Disclosure: unauthorized exposure of information;
- Denial of Service: service unavailability or degradation;
- Elevation of Privilege: unauthorized permission gain.

Recommended table fields:

| ID | STRIDE Category | Component or Asset | Identified Threat | Possible Impact |
| --- | --- | --- | --- | --- |
| T01 | Spoofing | User account | Attacker uses stolen credentials to access another account | Private data access and fraudulent operations |
| T02 | Tampering | Reservation | User changes reservation price or dates outside allowed rules | Financial loss and booking inconsistency |
| T03 | Information Disclosure | Database | Personal information is exposed by authorization failure | Privacy violation |

Analyze every STRIDE category or justify why a category does not apply.

### 4.6 Abuse Cases

Abuse cases must describe how a malicious person, unauthorized user, or legitimate user could harm the system.

Each abuse case must contain:

- identifier;
- title;
- malicious actor or agent;
- abuse goal;
- required conditions;
- action sequence;
- expected impact;
- relation to one or more STRIDE categories.

Suggested format:

```md
### AC01 - Fake Host Registration

Actor: malicious user.

Goal: publish fraudulent accommodations and collect victim data or payments.

Conditions: the system allows host registration without enough identity or property validation.

Abuse flow:
1. Attacker creates a host account.
2. Attacker publishes a fake accommodation.
3. Guest submits personal data or payment attempt.
4. Attacker captures value, data, or trust before detection.

Impact: fraud, privacy exposure, financial loss, and reputation damage.

Related STRIDE categories: Spoofing, Information Disclosure, Elevation of Privilege.
```

### 4.7 Final Considerations

Summarize:

- most concerning threats;
- most important assets;
- abuse types with highest impact;
- main difficulties found during analysis.

Protection measures may be mentioned when relevant, but a complete solution is not required for Stage 1.

### 4.8 Stage 2 - Risk Analysis and Treatment With NIST CSF 2.0

Stage 2 must contain:

- probability criteria;
- impact criteria;
- risk calculation and classification;
- risk register;
- justification for each risk evaluation;
- risk prioritization;
- treatment strategies;
- NIST CSF 2.0 function overview;
- risk-to-NIST mapping;
- treatment plan;
- initial implementation order;
- expected residual risk;
- final considerations.

Use this calculation:

```text
Risk score = probability x impact
```

Use these levels:

| Score | Risk Level |
| --- | --- |
| 1 to 3 | Low |
| 4 to 7 | Medium |
| 8 to 11 | High |
| 12 to 16 | Critical |

Every relevant Stage 1 threat should originate at least one risk. If one threat can cause different consequences, create more than one related risk.

Each risk must include:

- unique ID, such as `R01`;
- related STRIDE threat or category;
- risk event;
- vulnerability or condition;
- probability value from 1 to 4;
- impact value from 1 to 4;
- calculated score;
- level;
- justification.

Treatment strategies are:

- Avoid: eliminate the activity or condition that creates the risk;
- Reduce: add measures to lower probability or impact;
- Share: assign part of the operation or consequence to a third party;
- Accept: consciously keep the risk with approval, conditions, and review.

NIST CSF 2.0 functions to use:

- Govern: policies, responsibilities, priorities, and decision criteria;
- Identify: assets, dependencies, vulnerabilities, and risks;
- Protect: safeguards that reduce probability or impact;
- Detect: suspicious events, failures, and incidents;
- Respond: contain, analyze, communicate, and handle incidents;
- Recover: restore services and data after incidents.

The NIST function is not the control. For example, `Protect` is a function, "protect account access" is an expected outcome, and MFA is a possible control.

Controls must be concrete and observable. Avoid generic controls like "improve security" or "use cryptography" unless the document explains where, why, how, who owns it, and how it will be verified.

### 4.9 Stages 3 to 7 - Reduced Final Scope

Detailed final guidance is available in `ai/final-seven-days-guidance.md`.

Minimum scope:

| Stage | Minimum Required Content |
| --- | --- |
| Stage 3 - Secure Architecture | Three security requirements derived from priority risks; three cataloged vulnerability mappings; one secure architecture diagram; three justified architecture decisions. |
| Stage 4 - Secure Code and Security Tests | Two secure coding practices tied to previous risks and requirements; two security tests per practice written before the implementation example; implementation, pseudocode, or detailed description; expected result; OWASP reference. |
| Stage 5 - Vulnerability Verification | One authorized verification session using a tool such as OWASP ZAP; basic configuration; execution evidence; analysis of up to three alerts or findings; proposed correction for each finding; evidence stored in `evidences/stage-5/`. |
| Stage 6 - Monitoring and Intrusion Detection | Textual script in `roteiros/etapa-6-deteccao-de-intrusoes.md`; explanation of intrusion detection; prevention vs detection; events to log; three detection rules; initial response after alerts. |
| Stage 7 - DevSecOps and Final Video | Textual pipeline or diagram; final video script in `roteiros/etapa-7-devsecops-e-video-final.md`; final video covering the project evolution, main decisions, verification, detection, pipeline, and lessons learned. |

Testing third-party systems without authorization is prohibited. If the group does not have an implemented web system for Stage 5, OWASP Juice Shop may be used as a deliberately vulnerable educational environment.

## 5. Individual Participation and Commits

Evaluation is individual even though the project is group work. Every member must show participation through their own commits.

Useful contribution types:

- writing or reviewing sections;
- identifying threats;
- creating abuse cases;
- creating diagrams;
- organizing repository structure;
- improving documents.

Avoid generic commit messages such as `changes`, `fixes`, or `work`.

Prefer messages such as:

- `Add identity spoofing threats`;
- `Describe sensitive assets`;
- `Add payment tampering abuse case`;
- `Update data flow diagram`.

Commit quantity alone does not determine the grade. Relevance, consistency, and evolution matter.

## 6. Recommended Repository Organization

```text
HospedaTche/
├── AGENTS.md
├── README.md
├── ai/
│   └── project-instructions.md
├── artifacts/
│   ├── docs/
│   ├── diagrams/
│   └── images/
└── system/
    ├── backend/
    └── frontend/
```

## 7. Evaluation Criteria

Stage 1 work will be evaluated by:

- clarity and quality of system description;
- correct identification of users, assets, and components;
- correct and contextual STRIDE application;
- quality and coherence of identified threats;
- quality of abuse cases;
- relation between abuse cases and threats;
- Markdown organization and readability;
- diagram quality, when used;
- repository organization;
- project history;
- individual participation demonstrated by commits.

Stage 2 work will also be evaluated by:

- continuity and coherence with Stage 1;
- clear probability and impact criteria;
- correct risk calculations;
- quality of justifications;
- coherent prioritization;
- correct distinction between threat, vulnerability, attack, and risk;
- adequate treatment strategy choice;
- contextual use of NIST CSF functions;
- correct distinction between function, expected outcome, and control;
- specific proposed controls;
- responsible parties;
- verification evidence;
- coherent implementation order;
- realistic residual risk estimate;
- readable organization;
- project evolution through commits;
- individual participation.

## 8. Delivery

Delivery is done through the group repository URL. The repository may be updated during the course and will be evaluated at the end of the discipline.

All members must verify that commits are associated with their own GitHub accounts.
