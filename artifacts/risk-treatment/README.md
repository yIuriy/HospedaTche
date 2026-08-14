# Risk Treatment

Stage 2 artifacts live here.

This stage transforms Stage 1 STRIDE threats and abuse cases into risk records, priorities, and treatment plans using NIST Cybersecurity Framework 2.0 functions.

NIST CSF 2.0 functions used in this stage:

| Function | Purpose in this project |
| --- | --- |
| Govern | Define policies, responsibilities, priorities, and decision criteria for security risk treatment. |
| Identify | Understand assets, dependencies, vulnerabilities, affected users, and risk sources. |
| Protect | Propose safeguards that reduce risk probability or impact. |
| Detect | Identify suspicious events, failed controls, abuse patterns, and possible incidents. |
| Respond | Contain, analyze, communicate, and correct confirmed or suspected incidents. |
| Recover | Restore affected services, data, records, or trusted states after an incident. |

NIST functions are not controls by themselves. Each module maps risks to relevant functions and then proposes concrete controls, responsible parties, and verification evidence.

Expected content:

- probability and impact criteria;
- risk register;
- scoring and level classification;
- evaluation justifications;
- prioritization;
- NIST CSF 2.0 mapping;
- treatment strategies;
- proposed controls;
- responsible parties;
- verification evidence;
- initial implementation order;
- expected residual risk.

Controls are not implemented in Stage 2. They are proposed, justified, assigned, and linked to verification evidence.

Module skeletons:

- `accounts/risk-register.md`
- `accommodation/risk-register.md`
- `booking/risk-register.md`
- `payment/risk-register.md`
- `search-messaging/risk-register.md`

Reusable template:

- `artifacts/templates/risk-treatment-template.md`

Validation script:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-risk-treatment.ps1
```
