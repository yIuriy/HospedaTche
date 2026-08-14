# Abuse Case Template

Save new abuse cases as:

```text
artifacts/abuse-cases/<module>/AC01-short-title.md
```

Rules:

- `<module>` must be lowercase kebab-case, for example `booking`, `payments`, `accounts`.
- filename must start with `AC` plus two digits.
- heading ID must match filename ID.
- title in heading should match filename slug in readable form.

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
