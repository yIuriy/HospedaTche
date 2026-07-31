# Business Rule Template

Save business rules in:

```text
artifacts/business-rules/business-rules.md
```

Rules:

- Heading ID must use `BR` plus two digits.
- Keep rules short and business-focused.
- Do not duplicate functional requirements.
- Do not add STRIDE threats or abuse cases here.

```md
### BR01 - Short Rule Name

Applies To: Booking, Payment, and Cancellation

Rule: The hotel may define a minimum advance time for online reservations.

Rationale: This gives staff enough time to prepare room allocation and reception work.

Related Requirements: RF22, RF55
```

