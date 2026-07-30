# Project Instructions

## 1. Objective

Start security analysis before implementation by identifying malicious behaviors, threats, and impacts related to the software system.

The project must produce Markdown documentation in this repository containing:

- brief system description;
- main users, resources, and protected information;
- STRIDE threat modeling;
- abuse cases;
- optional diagrams that help explain system behavior and threats.

## 2. Chosen System

HospedaTche is a hotel accommodation system.

The system should support different user types, information exchange, and security-relevant operations. Implementation is not required for Stage 1; focus is understanding the system and analyzing possible security problems.

## 3. Repository Requirements

All project files must be versioned in this repository, including:

- Markdown documents;
- images;
- diagrams;
- diagram source files;
- tables or complementary materials.

Do not rely only on external diagram links. Store source files and exported images in the repository.

## 4. Minimum Document Structure

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

The work will be evaluated by:

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

## 8. Delivery

Delivery is done through the group repository URL. The repository may be updated during the course and will be evaluated at the end of the discipline.

All members must verify that commits are associated with their own GitHub accounts.
