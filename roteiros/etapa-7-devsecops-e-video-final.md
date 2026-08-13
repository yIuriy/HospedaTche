# Stage 7 - HospedaTche DevSecOps Pipeline and Final Video Script

## DevSecOps Pipeline

| Moment | Security Activity | Evidence Produced | Condition to Continue | Owner |
| --- | --- | --- | --- | --- |
| Planning | Pending: Iuri. | Pending: Iuri. | Pending: Iuri. | Iuri |
| Architecture | Pending: Iuri. | Pending: Iuri. | Pending: Iuri. | Iuri |
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
| 1 | Iuri | Pending: system, threats, risks, requirements, and architecture. | Pending: Iuri. | Pending: Iuri. |
| 2 | Sidnei | Pending: secure implementation and automated tests. | Pending: Sidnei. | Pending: Sidnei. |
| 3 | Lara | Code and dependency analysis gates: explain why tests, dependency audit, review for hardcoded secrets, parameterized SQL, server-side authorization, and sensitive-log checks decide whether a change can continue through the pipeline. Present SC01, SC02, and SC03 as objective stop conditions. | `artifacts/secure-code/secure-code-and-tests.md`, `artifacts/vulnerability-verification/report.md`, `evidences/stage-5/identity-api-verification.md`, `system/backend/package.json`, and `system/backend/package-lock.json`. | 1 minute 15 seconds |
| 4 | Dyonathan | Pending: dynamic verification, deployment, monitoring, and response. | Pending: Dyonathan. | Pending: Dyonathan. |
| 5 | Rafaela | Pending: pipeline integration, project evolution, and lessons learned. | Pending: Rafaela. | Pending: Rafaela. |

Lara segment script: "In the automated analysis step, HospedaTche should not rely only on manual review. The pipeline must run security tests, check dependency advisories, and review code patterns that are connected to our previous risks. A change stops if a security test fails, if a high or critical runtime dependency vulnerability remains unresolved, or if review finds a hardcoded secret, unsafe SQL built from request input, missing server-side authorization, or sensitive data being logged. These gates connect the secure coding work, the vulnerability verification evidence, and the final release decision."

## Participation

| Member | Pipeline Contribution | Video Contribution | Related Commits or Evidence |
| --- | --- | --- | --- |
| Iuri | Pending: Iuri. | Pending: Iuri. | Pending: Iuri. |
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
