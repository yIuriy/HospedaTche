# HospedaTche
Repository for the Secure Software Engineering course project.

HospedaTche is a hotel accommodation system. This repository stores project instructions, AI working context, security analysis artifacts, and future system code.

## Repository Structure

- `ai/`: English project instructions and AI working context.
- `system/backend/`: future backend source code.
- `system/frontend/`: future frontend source code. UI text may be written in Portuguese.
- `artifacts/`: future deliverables, diagrams, images, and complementary materials.

## Current Stage

Stage 1 focuses on abuse cases and STRIDE threat modeling before implementation.

## Contributor Setup

After cloning the repository, enable local Git validations:

```sh
git config core.hooksPath .githooks
```

Check if validations are enabled:

```sh
git config --get core.hooksPath
```

Expected output:

```sh
.githooks
```

Current validations:

- commit messages must start with a capital letter, have more than 12 characters, and avoid generic messages;
- abuse case files are validated before each commit.
- STRIDE threat files are validated before each commit.

Manual abuse case validation:

```sh
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-abuse-cases.ps1
```

Manual STRIDE threat validation:

```sh
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-stride-threats.ps1
```
