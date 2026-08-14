# Stage 7 - HospedaTche DevSecOps Pipeline and Final Video Script

## DevSecOps Pipeline

| Moment | Security Activity | Evidence Produced | Condition to Continue | Owner |
| --- | --- | --- | --- | --- |
| Planning | Review system scope, user roles, assets, trust boundaries, STRIDE threats, abuse cases, and the Stage 2 risk register before accepting a security-sensitive change. | `README.md`, `artifacts/threat-modeling/accounts/`, `artifacts/abuse-cases/accounts/`, and `artifacts/risk-treatment/accounts/risk-register.md`. | Continue only when the change is linked to an identified asset, actor, threat or abuse case, and prioritized risk; otherwise update the planning artifacts before moving forward. | Iuri |
| Architecture | Convert prioritized identity and account risks into verifiable security requirements, vulnerability mappings, architecture controls, and architecture decisions. | `artifacts/secure-architecture/secure-architecture.md`, `artifacts/diagrams/secure-architecture.mmd`, and `artifacts/diagrams/secure-architecture.png`. | Continue only when the affected risk has a security requirement, CWE or OWASP relationship, observable verification criterion, and corresponding architecture control. | Iuri |
| Implementation | Pending: Sidnei. | Pending: Sidnei. | Pending: Sidnei. | Sidnei |
| Automated Verification | Run security tests, code review, and dependency analysis before accepting changes. Check `npm test`, `npm audit --omit=dev`, validation scripts, parameterized SQL usage, strict input validation, authentication middleware, and absence of hardcoded secrets in changed files. | `artifacts/secure-code/secure-code-and-tests.md`, `evidences/stage-5/identity-api-verification.md`, `system/backend/package-lock.json`, backend test output, dependency audit output, and review notes for changed code. | Continue only when automated security tests pass, dependency audit has no unresolved high or critical runtime advisories, and code review finds no missing authorization, unsafe SQL concatenation with request values, secret exposure, or sensitive logging. | Lara |
| Dynamic Verification | Pending: Dyonathan. | Pending: Dyonathan. | Pending: Dyonathan. | Dyonathan |
| Deployment | Apply release approval only after security gates are satisfied and unresolved findings are accepted or corrected. | Pipeline stop-condition review and release approval record. | Continue only when SC01, SC02, and SC03 are not active or have documented approval and remediation evidence. | Lara |
| Operation | Pending: Dyonathan. | Pending: Dyonathan. | Pending: Dyonathan. | Dyonathan |

## Pipeline Stop Conditions

| ID | Stop Condition | Required Evidence | Action Before Resuming | Responsible Role |
| --- | --- | --- | --- | --- |
| SC01 | Any security test that protects authentication, authorization, input validation, session revocation, or room-state workflow fails in CI or local release verification. | Failed test output, affected requirement or risk reference, and changed files involved in the failure. | Block merge or release, fix the implementation or test expectation, rerun the focused test, and attach passing evidence. | Development Team |
| SC02 | `npm audit --omit=dev` reports an unresolved high or critical runtime dependency vulnerability, or a dependency is added without a lockfile update and review. | Audit output, dependency name and version, advisory severity, and package-lock diff. | Upgrade, remove, replace, or document an accepted exception with mitigation and responsible approval before continuing. | Development Team and Security/Operations Team |
| SC03 | Code review or repository scan identifies a hardcoded secret, unsafe SQL built from request values, missing server-side authorization on a protected route, or logging of passwords, JWTs, reset tokens, full CPF values, or payment data. | Review comment, scan output, or diff reference showing the unsafe pattern and affected file. | Remove the secret or unsafe pattern, rotate any exposed credential if applicable, add or update tests, and rerun validation before resuming. | Development Team |

## Final Video Script

Target duration: 5 to 8 minutes.

| Order | Speaker | Topic | Repository Evidence | Estimated Duration |
| --- | --- | --- | --- | --- |
| 1 | Iuri | System overview, user roles, main threats, prioritized account risks, SR01, and the secure architecture controls that connect planning to implementation. | `README.md`, `artifacts/threat-modeling/accounts/`, `artifacts/abuse-cases/accounts/`, `artifacts/risk-treatment/accounts/risk-register.md`, and `artifacts/secure-architecture/secure-architecture.md`. | 1 minute 20 seconds |
| 2 | Sidnei | Pending: secure implementation and automated tests. | Pending: Sidnei. | Pending: Sidnei. |
| 3 | Lara | Code and dependency analysis gates: explain why tests, dependency audit, review for hardcoded secrets, parameterized SQL, server-side authorization, and sensitive-log checks decide whether a change can continue through the pipeline. Present SC01, SC02, and SC03 as objective stop conditions. | `artifacts/secure-code/secure-code-and-tests.md`, `artifacts/vulnerability-verification/report.md`, `evidences/stage-5/identity-api-verification.md`, `system/backend/package.json`, and `system/backend/package-lock.json`. | 1 minute 15 seconds |
| 4 | Dyonathan | Pending: dynamic verification, deployment, monitoring, and response. | Pending: Dyonathan. | Pending: Dyonathan. |
| 5 | Rafaela | Pending: pipeline integration, project evolution, and lessons learned. | Pending: Rafaela. | Pending: Rafaela. |

Iuri segment script: "HospedaTche is a hotel accommodation system with Guests, Receptionists, Managers, Administrators, and an external payment provider. Because the system handles accounts, CPF data, bookings, payments, chat, reviews, and internal operations, security starts during planning. We mapped assets, actors, trust boundaries, STRIDE threats, and abuse cases before defining risks. In the accounts area, the most important identity risks include fake registration, account takeover, mass account creation, password recovery misuse, unauthorized profile access, and missing audit evidence. Stage 3 turns that analysis into architecture decisions. For SR01, the system must require step-up authentication before changing password, email, or CPF, and must revoke previous sessions after password change or recovery. In the DevSecOps pipeline, a change only moves forward when it stays connected to a known risk, has an observable security requirement, and appears in the architecture evidence."

Lara segment script: "In the automated analysis step, HospedaTche should not rely only on manual review. The pipeline must run security tests, check dependency advisories, and review code patterns that are connected to our previous risks. A change stops if a security test fails, if a high or critical runtime dependency vulnerability remains unresolved, or if review finds a hardcoded secret, unsafe SQL built from request input, missing server-side authorization, or sensitive data being logged. These gates connect the secure coding work, the vulnerability verification evidence, and the final release decision."

## Participation

| Member | Pipeline Contribution | Video Contribution | Related Commits or Evidence |
| --- | --- | --- | --- |
| Iuri | Planning and architecture continuity: system scope, account threats, abuse cases, risk prioritization, SR01, vulnerability mapping, and architecture controls. | Explains HospedaTche's roles and protected assets, connects Stage 1 and Stage 2 analysis to SR01 and the secure architecture, and describes the continuation criteria for planning and architecture. | `README.md`; `artifacts/threat-modeling/accounts/`; `artifacts/abuse-cases/accounts/`; `artifacts/risk-treatment/accounts/risk-register.md`; `artifacts/secure-architecture/secure-architecture.md`; `artifacts/diagrams/secure-architecture.mmd` |
| Sidnei | Pending: Sidnei. | Pending: Sidnei. | Pending: Sidnei. |
| Lara | Code and dependency analysis gates; objective stop conditions SC01, SC02, and SC03. | Explains automated analysis gates and why failing tests, dependency vulnerabilities, hardcoded secrets, unsafe SQL, missing authorization, or sensitive logs stop the pipeline. | `artifacts/secure-code/secure-code-and-tests.md`; `artifacts/vulnerability-verification/report.md`; `evidences/stage-5/identity-api-verification.md`; `system/backend/package.json`; `system/backend/package-lock.json` |
| Dyonathan | Pending: Dyonathan. | Pending: Dyonathan. | Pending: Dyonathan. |
| Rafaela | Pending: Rafaela. | Pending: Rafaela. | Pending: Rafaela. |

## Delivery Record

Video File or Link: Pending final recording.

Access Instructions: Pending final recording.

Final Review Date: Pending group review.

## Final Review

- [ ] Pipeline covers planning through operation.
- [ ] Every pipeline moment identifies evidence and a continuation condition.
- [x] At least three objective stop conditions are included.
- [ ] Script covers Stages 1 to 7.
- [ ] All five members appear or speak.
- [ ] Estimated duration is 5 to 8 minutes.
- [ ] Video and script expose no credentials, tokens, personal data, or sensitive test details.
