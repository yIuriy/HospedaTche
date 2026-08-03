# Git Hooks

This repository uses a `commit-msg` hook to keep commit messages clear.
It also uses a `pre-commit` hook to run all repository validation checks.

Rules:

- first line must start with a capital letter;
- first line must be more than 12 characters;
- generic messages such as `fixes`, `changes`, `work`, and `wip` are blocked.

Enable hooks:

```sh
git config core.hooksPath .githooks
```

Manual abuse case validation:

```sh
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-abuse-cases.ps1
```

Manual STRIDE threat validation:

```sh
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-stride-threats.ps1
```

Manual risk treatment validation:

```sh
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-risk-treatment.ps1
```
