# Abuse Cases

Store abuse cases by module.

## Naming

```text
artifacts/abuse-cases/<module>/AC01-short-title.md
```

Examples:

- `artifacts/abuse-cases/accounts/AC01-account-takeover.md`
- `artifacts/abuse-cases/booking/AC02-reservation-tampering.md`
- `artifacts/abuse-cases/payments/AC03-payment-fraud.md`

## Required Format

Each file must contain:

- heading: `### ACNN - Title`
- `Actor:`
- `Goal:`
- `Conditions:`
- `Abuse flow:`
- numbered abuse flow steps;
- `Impact:`
- `Related STRIDE categories:`

Use `artifacts/templates/abuse-case-template.md` as source template.
