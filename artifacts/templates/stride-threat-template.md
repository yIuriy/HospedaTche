# STRIDE Threat Template

Save new threats as:

```text
artifacts/threat-modeling/<module>/T01-short-title.md
```

Rules:

- `<module>` must be lowercase kebab-case, for example `booking`, `payments`, `accounts`.
- filename must start with `T` plus two digits.
- heading ID must match filename ID.
- title in heading should match filename slug in readable form.
- STRIDE category must use one official STRIDE category.

```md
### T01 - Account Takeover

STRIDE Category: Spoofing

Component or Asset: User account

Identified Threat: attacker uses stolen credentials to access another user's account.

Possible Impact: private data exposure and fraudulent reservations.

Related Abuse Cases: AC01
```
