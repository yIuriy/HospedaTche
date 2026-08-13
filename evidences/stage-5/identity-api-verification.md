# Identity API Verification Evidence

Date: 2026-08-13

Environment: Local HospedaTche backend, Node.js v24.19.0, ephemeral HTTP port, temporary SQLite database.

## Commands

```powershell
cd system/backend
npm.cmd test
npm.cmd audit --omit=dev
```

## Test Result

The identity integration suite completed with 8 passing tests and 0 failures:

- valid Guest registration returns HTTP 201 and excludes `password_hash`;
- duplicate email or CPF returns the same generic HTTP 409 response;
- SQL injection text and weak passwords return HTTP 400;
- authenticated user reads only the profile identified by JWT context;
- full name is normalized and markup is rejected;
- email change requires the correct current password;
- password change invalidates old JWT sessions;
- duplicate identity data is rejected during profile update.

## Dependency Result

`npm audit --omit=dev` completed with `found 0 vulnerabilities` after the unused `sqlite3` dependency and its vulnerable transitive build chain were removed. Runtime persistence continues through the existing `sql.js` dependency.

No production credentials, tokens, payment data, or personal data were used or stored in this evidence.
