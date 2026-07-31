# Functional Requirement Template

Save functional requirements in:

```text
artifacts/functional-requirements/functional-requirements.md
```

Rules:

- Heading ID must use `RF` plus two digits.
- Heading title must be clear and action-oriented.
- Use one requirement per block.
- Keep statements testable.
- Use `Must`, `Should`, or `Could` priority.

```md
### RF01 - Account Role Support

Module: Accounts and Identity

Primary Actors: Administrator, Manager, Receptionist, Guest

Statement: The system must support Administrator, Manager, Receptionist, and Guest accounts with role-specific permissions.

Acceptance Criteria:
1. The system stores one role for each active account.
2. The system blocks access to features outside the user's role.
3. The system records role changes in audit logs.

Priority: Must

Related Tasks: User Registration and Identity; Authentication and Access Control
```

