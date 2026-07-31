# Abuse Case Map

This file maps abuse cases to modules, assets, and STRIDE categories.

| ID | Module | File | Title | Main Asset | STRIDE Categories | Status |
| --- | --- | --- | --- | --- | --- | --- |
| AC01 | accounts | `accounts/AC01-fake-guest-registration.md` | Fake Guest Registration | Guest account registration | Spoofing | draft |
| AC02 | accounts | `accounts/AC02-account-takeover.md` | Account Takeover | User account login | Spoofing, Information Disclosure | draft |
| AC03 | accounts | `accounts/AC03-unauthorized-password-change.md` | Unauthorized Password Change | Password recovery module | Tampering | draft |
| AC04 | accounts | `accounts/AC04-legitimate-employee-inactivation.md` | Legitimate Employee Inactivation | Employee management module | Tampering | draft |
| AC05 | accounts | `accounts/AC05-legitimate-receptionist-inactivation.md` | Legitimate Receptionist Inactivation | Receptionist management module | Denial of Service, Tampering | draft |
| AC06 | accounts | `accounts/AC06-receptionist-privilege-escalation.md` | Receptionist Privilege Escalation | Permission management module | Elevation of Privilege, Denial of Service, Tampering | draft |
| AC07 | accounts | `accounts/AC07-room-information-tampering-by-receptionist.md` | Room Information Tampering By Receptionist | Room management page | Elevation of Privilege, Denial of Service, Tampering | draft |
| AC08 | accounts | `accounts/AC08-room-configuration-tampering-by-manager.md` | Room Configuration Tampering By Manager | Room management module | Denial of Service, Tampering | draft |
| AC09 | accounts | `accounts/AC09-mass-account-creation.md` | Mass Account Creation | Account creation module | Denial of Service | draft |
| AC10 | accounts | `accounts/AC10-receptionist-password-disclosure.md` | Receptionist Password Disclosure | Employee management module | Information Disclosure | draft |
| AC11 | accounts | `accounts/AC11-password-reset-token-leakage.md` | Password Reset Token Leakage | Password recovery module | Information Disclosure, Spoofing, Tampering | draft |
| AC12 | accounts | `accounts/AC12-session-not-invalidated-after-password-change.md` | Session Not Invalidated After Password Change | Session management module | Tampering, Spoofing, Information Disclosure | draft |
| AC13 | accounts | `accounts/AC13-missing-audit-log-for-account-changes.md` | Missing Audit Log For Account Changes | Account management audit log | Repudiation, Tampering | draft |
| AC14 | accounts | `accounts/AC14-mass-login-attempt-abuse.md` | Mass Login Attempt Abuse | Login module | Denial of Service | draft |
| AC15 | accounts | `accounts/AC15-unauthorized-guest-profile-access.md` | Unauthorized Guest Profile Access | Guest profile module | Information Disclosure, Elevation of Privilege | draft |
| AC16 | accounts | `accounts/AC16-inactive-account-still-has-access.md` | Inactive Account Still Has Access | Account status and access control | Elevation of Privilege, Information Disclosure, Tampering | draft |
| AC17 | accounts | `accounts/AC17-role-change-without-approval.md` | Role Change Without Approval | Role management module | Elevation of Privilege, Tampering, Repudiation | draft |
| AC18 | accounts | `accounts/AC18-guest-cpf-enumeration.md` | Guest CPF Enumeration | Guest registration and account lookup | Information Disclosure | draft |

## Status Values

- `planned`: identified but not written.
- `draft`: written but pending review.
- `reviewed`: reviewed by group.
- `final`: ready for delivery.
