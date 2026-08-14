### AC14 - Mass Login Attempt Abuse

Actor: malicious user.

Goal: overload the login module with many authentication attempts.

Conditions: the system allows many repeated login attempts without enough rate limiting or abuse controls.

Abuse flow:
1. Attacker prepares many login attempts using different emails, passwords, or automated scripts.
2. Attacker sends repeated login requests to the system.
3. Login processing consumes system resources or triggers many account checks.
4. Legitimate users experience slow login, blocked access, or reduced system availability.

Impact: login performance degradation, increased system load, possible account lockouts, and reduced availability.

Related STRIDE categories: Denial of Service

