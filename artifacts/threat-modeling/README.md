# STRIDE Threat Modeling

Store STRIDE threats by module.

## Naming

```text
artifacts/threat-modeling/<module>/T01-short-title.md
```

Examples:

- `artifacts/threat-modeling/accounts/T01-account-takeover.md`
- `artifacts/threat-modeling/booking/T02-reservation-tampering.md`
- `artifacts/threat-modeling/payments/T03-payment-disclosure.md`

## Required Format

Each file must contain:

- heading: `### TNN - Title`
- `STRIDE Category:`
- `Component or Asset:`
- `Identified Threat:`
- `Possible Impact:`
- `Related Abuse Cases:`

Use `artifacts/templates/stride-threat-template.md` as source template.
