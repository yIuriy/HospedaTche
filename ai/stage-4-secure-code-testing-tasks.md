# Stage 4 - Secure Code and Security Test Task Division

This document defines the minimum Stage 4 work division. Stage 4 demonstrates how Stage 3 requirements and decisions become secure coding practices and verifiable tests.

## Shared Goal

```text
risk and requirement -> tests defined first -> secure practice -> implementation example -> expected result
```

## Shared Rules

- Select only two secure coding practices.
- Link each practice to a Stage 2 risk and Stage 3 requirement.
- Define two tests for each practice before showing the solution.
- Include one valid test and one malicious, invalid, or unauthorized test per practice.
- Use implementation, pseudocode, configuration, or a detailed step-by-step description.
- Cite an applicable OWASP Cheat Sheet, ASVS requirement, or equivalent OWASP reference.
- A complete application implementation is not required.

## Minimum Deliverable

- two secure coding practices;
- four security tests in total;
- implementation or detailed solution for each practice;
- expected secure result for each test;
- OWASP references and traceability to previous stages.

Recommended output:

Template: `artifacts/templates/secure-code-practice-template.md`

```text
artifacts/secure-code/secure-code-and-tests.md
```

## Required Practice Structure

Each practice must contain:

| Field | Required Content |
| --- | --- |
| Related Risk | Risk ID from Stage 2 |
| Related Requirement | Security requirement from Stage 3 |
| Practice | Secure behavior being adopted |
| Test 1 | Valid or authorized use case |
| Test 2 | Malicious, invalid, or unauthorized use case |
| Expected Results | Secure result for both tests |
| Solution | Code, pseudocode, configuration, or detailed description |
| Reference | Relevant OWASP source |

## Member Assignment

| Member | Minimum Work | Expected Output |
| --- | --- | --- |
| Iuri | Define Practice 1, its source risk and requirement, and its solution example. | Practice 1 and implementation or pseudocode |
| Sidnei | Define the valid and malicious/unauthorized tests for Practice 1 before the solution section. | Tests ST01 and ST02 |
| Lara | Define Practice 2, its source risk and requirement, and its solution example. | Practice 2 and implementation or pseudocode |
| Dyonathan | Define the valid and malicious/unauthorized tests for Practice 2 before the solution section. | Tests ST03 and ST04 |
| Rafaela | Add expected results and OWASP references and verify full traceability. | Integrated Stage 4 document |

## Suggested Practice Options

Choose only two options that address the selected risks:

- server-side authorization;
- input validation and output encoding;
- parameterized database access;
- secure password storage;
- session protection;
- secure error handling;
- secrets protection;
- audit logging without sensitive-data exposure.

## Shared Final Review

Confirm that:

- the four tests appear before their solution examples;
- each practice includes one normal and one adversarial scenario;
- expected results are observable and unambiguous;
- solutions actually satisfy the tests;
- OWASP references are relevant and identifiable;
- no unimplemented example is presented as production evidence.

---

# Stage 4 - Secure Code and Security Test Task Division (Operational Guide)

## Shared Goal

Show how Stage 3 requirements and decisions become secure practices and verifiable tests.

```text
risk and requirement -> tests defined first -> secure practice -> solution example -> expected result
```

## Minimum Deliverable

- two secure coding practices;
- two tests per practice, totaling four;
- one valid test and one malicious, invalid, or unauthorized test per practice;
- implementation, pseudocode, configuration, or detailed description;
- expected result and OWASP reference per practice.

Template: `artifacts/templates/secure-code-practice-template.md`

## Task Division by Member

| Member | Minimum Task | Expected Output |
| --- | --- | --- |
| Iuri | Define Practice 1, risk, requirement, and solution example. | Practice 1 and solution |
| Sidnei | Define the valid test and adversarial test for Practice 1 before the solution. | ST01 and ST02 |
| Lara | Define Practice 2, risk, requirement, and solution example. | Practice 2 and solution |
| Dyonathan | Define the valid test and adversarial test for Practice 2 before the solution. | ST03 and ST04 |
| Rafaela | Add expected results, OWASP references, and traceability. | Integrated document |

## Mandatory Structure

Each practice must record risk, requirement, practice, two tests, expected results, solution, and OWASP reference.

## Final Review

- verify that tests appear before the solution;
- verify one normal and one adversarial scenario per practice;
- verify objective results;
- verify if the solution satisfies the tests;
- verify OWASP references;
- do not present pseudocode as production evidence.
