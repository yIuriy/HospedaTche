# Risk Treatment

Stage 2 artifacts live here.

This stage transforms Stage 1 STRIDE threats and abuse cases into risk records, priorities, and treatment plans using NIST Cybersecurity Framework 2.0 functions.

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
