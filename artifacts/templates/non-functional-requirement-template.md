# Non-Functional Requirement Template

Save non-functional requirements in:

```text
artifacts/non-functional-requirements/non-functional-requirements.md
```

Rules:

- Heading ID must use `NFR` plus two digits.
- Heading title must be clear and measurable when possible.
- Use one requirement per block.
- Keep statements technology-neutral unless needed.
- Use `Must`, `Should`, or `Could` priority.

```md
### NFR01 - Configurable Login Attempt Limit

Category: Security

Applies To: Login and Authentication

Statement: The system must allow configuring the maximum number of failed login attempts before temporary account or session blocking.

Acceptance Criteria:
1. The limit can be configured by an authorized administrator.
2. The system applies the limit to all account roles.
3. The system records blocked login attempts for audit.

Priority: Must

Related Modules: Accounts and Identity; Authentication and Access Control
```

