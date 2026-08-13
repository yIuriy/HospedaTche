const { after, before, test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const testDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'hospedatche-auth-'));
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-only-secret-with-enough-entropy';
process.env.DATABASE_FILE = path.join(testDirectory, 'auth.sqlite');

const app = require('../src/app');
const database = require('../src/config/database');

let server;
let baseUrl;

before(async () => {
  await database.initDatabase();
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
  fs.rmSync(testDirectory, { recursive: true, force: true });
});

async function request(pathname, options = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    ...options,
    headers: {
      'content-type': 'application/json',
      ...options.headers,
    },
  });
  const text = await response.text();
  let body = text;
  try {
    body = JSON.parse(text);
  } catch {
    // Keep non-JSON responses visible in failing tests.
  }
  return { status: response.status, body };
}

async function registerGuest({ email, cpf, password = 'SecurePass!2026', fullName = 'Test Guest' }) {
  return request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, cpf, password, full_name: fullName }),
  });
}

async function insertUser({ email, cpf, password, fullName, role }) {
  const id = crypto.randomUUID();
  const passwordHash = await bcrypt.hash(password, 10);
  await database.run(
    `INSERT INTO users (id, name, email, cpf, password_hash, role)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, fullName, email, cpf, passwordHash, role]
  );
  return id;
}

test('valid credentials issue a two-hour JWT and create a safe audit record', async () => {
  const password = 'SecurePass!2026';
  const registration = await registerGuest({
    email: 'login@example.com',
    cpf: '529.982.247-25',
    password,
    fullName: 'Login Guest',
  });

  const response = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'LOGIN@example.com', password }),
  });

  assert.equal(registration.status, 201);
  assert.equal(response.status, 200);
  assert.equal(typeof response.body.token, 'string');
  assert.deepEqual(response.body.user, {
    id: registration.body.user.id,
    full_name: 'Login Guest',
    email: 'login@example.com',
    role: 'Guest',
  });
  assert.equal('password_hash' in response.body, false);
  assert.equal('password' in response.body, false);

  const claims = jwt.verify(response.body.token, process.env.JWT_SECRET, {
    algorithms: ['HS256'],
  });
  assert.equal(claims.userId, registration.body.user.id);
  assert.equal(claims.role, 'Guest');
  assert.ok(claims.exp - claims.iat >= 7199 && claims.exp - claims.iat <= 7200);
  assert.equal('password' in claims, false);
  assert.equal('password_hash' in claims, false);

  const audit = await database.get(
    'SELECT user_id, action, resource, ip_address FROM audit_logs ORDER BY timestamp DESC LIMIT 1'
  );
  assert.equal(audit.user_id, registration.body.user.id);
  assert.equal(audit.action, 'LOGIN_SUCCESS');
  assert.equal(audit.resource, 'authentication');
  assert.equal(JSON.stringify(audit).includes(password), false);
  assert.equal(JSON.stringify(audit).includes(response.body.token), false);
});

test('invalid credentials use one response and record failed attempts', async () => {
  await registerGuest({
    email: 'failed-login@example.com',
    cpf: '111.444.777-35',
    password: 'CorrectPass!2026',
  });

  const wrongPassword = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'failed-login@example.com', password: 'WrongPass!2026' }),
  });
  const unknownEmail = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'unknown@example.com', password: 'WrongPass!2026' }),
  });

  assert.equal(wrongPassword.status, 401);
  assert.equal(unknownEmail.status, 401);
  assert.deepEqual(wrongPassword.body, { error: 'Invalid email or password' });
  assert.deepEqual(unknownEmail.body, wrongPassword.body);

  const failures = await database.all(
    `SELECT action, resource
     FROM audit_logs
     WHERE action = 'LOGIN_FAILURE'
     ORDER BY timestamp ASC`
  );
  assert.equal(failures.length, 2);
  assert.deepEqual(
    failures.map(({ action, resource }) => ({ action, resource })),
    [
      { action: 'LOGIN_FAILURE', resource: 'authentication' },
      { action: 'LOGIN_FAILURE', resource: 'authentication' },
    ]
  );
});

test('admin endpoint rejects missing, forged, and Guest tokens', async () => {
  await registerGuest({
    email: 'rbac-guest@example.com',
    cpf: '935.411.347-80',
    password: 'GuestPass!2026',
  });
  const login = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'rbac-guest@example.com', password: 'GuestPass!2026' }),
  });
  const forgedToken = jwt.sign(
    { userId: 'forged-user', role: 'Administrator', authVersion: 0 },
    'attacker-controlled-secret',
    { algorithm: 'HS256', expiresIn: '2h', subject: 'forged-user' }
  );
  const payload = {
    email: 'staff@example.com',
    cpf: '390.533.447-05',
    password: 'StaffPass!2026',
    full_name: 'Staff Member',
    role: 'Receptionist',
  };

  const missing = await request('/api/v1/admin/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const forged = await request('/api/v1/admin/users', {
    method: 'POST',
    headers: { authorization: `Bearer ${forgedToken}` },
    body: JSON.stringify(payload),
  });
  const guest = await request('/api/v1/admin/users', {
    method: 'POST',
    headers: { authorization: `Bearer ${login.body.token}` },
    body: JSON.stringify(payload),
  });

  assert.equal(missing.status, 401);
  assert.equal(forged.status, 401);
  assert.equal(guest.status, 403);
  assert.deepEqual(missing.body, { error: 'Authentication required' });
  assert.deepEqual(forged.body, missing.body);
  assert.deepEqual(guest.body, { error: 'Forbidden' });
});

test('Administrator creates a staff account that can authenticate', async () => {
  await insertUser({
    email: 'administrator@example.com',
    cpf: '168.995.350-09',
    password: 'AdminPass!2026',
    fullName: 'System Administrator',
    role: 'Administrator',
  });
  const adminLogin = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'administrator@example.com', password: 'AdminPass!2026' }),
  });

  const created = await request('/api/v1/admin/users', {
    method: 'POST',
    headers: { authorization: `Bearer ${adminLogin.body.token}` },
    body: JSON.stringify({
      email: 'receptionist@example.com',
      cpf: '390.533.447-05',
      password: 'ReceptionPass!2026',
      full_name: 'Hotel Receptionist',
      role: 'Receptionist',
    }),
  });

  assert.equal(adminLogin.status, 200);
  assert.equal(created.status, 201);
  assert.equal(created.body.user.email, 'receptionist@example.com');
  assert.equal(created.body.user.role, 'Receptionist');
  assert.equal('password' in created.body.user, false);
  assert.equal('password_hash' in created.body.user, false);

  const persisted = await database.get(
    'SELECT password_hash, role FROM users WHERE id = ? LIMIT 1',
    [created.body.user.id]
  );
  assert.match(persisted.password_hash, /^\$2[aby]\$10\$/);
  assert.equal(await bcrypt.compare('ReceptionPass!2026', persisted.password_hash), true);
  assert.equal(persisted.role, 'Receptionist');

  const staffLogin = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'receptionist@example.com', password: 'ReceptionPass!2026' }),
  });
  assert.equal(staffLogin.status, 200);
  assert.equal(staffLogin.body.user.role, 'Receptionist');

  const prohibitedRole = await request('/api/v1/admin/users', {
    method: 'POST',
    headers: { authorization: `Bearer ${adminLogin.body.token}` },
    body: JSON.stringify({
      email: 'second-admin@example.com',
      cpf: '153.509.460-56',
      password: 'SecondAdmin!2026',
      full_name: 'Second Administrator',
      role: 'Administrator',
    }),
  });
  assert.equal(prohibitedRole.status, 400);
});

test('Administrator promotes a Guest and invalidates the previous session', async () => {
  await insertUser({
    email: 'promotion-admin@example.com',
    cpf: '987.654.321-00',
    password: 'AdminPass!2026',
    fullName: 'Promotion Administrator',
    role: 'Administrator',
  });
  const registration = await registerGuest({
    email: 'future-manager@example.com',
    cpf: '123.456.789-09',
    password: 'ManagerPass!2026',
    fullName: 'Future Manager',
  });
  const guestLogin = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'future-manager@example.com', password: 'ManagerPass!2026' }),
  });
  const adminLogin = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'promotion-admin@example.com', password: 'AdminPass!2026' }),
  });

  const promoted = await request('/api/v1/admin/users', {
    method: 'POST',
    headers: { authorization: `Bearer ${adminLogin.body.token}` },
    body: JSON.stringify({ user_id: registration.body.user.id, role: 'Manager' }),
  });
  const oldSession = await request('/api/v1/users/me', {
    headers: { authorization: `Bearer ${guestLogin.body.token}` },
  });
  const managerLogin = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'future-manager@example.com', password: 'ManagerPass!2026' }),
  });

  assert.equal(promoted.status, 200);
  assert.equal(promoted.body.user.id, registration.body.user.id);
  assert.equal(promoted.body.user.role, 'Manager');
  assert.equal(promoted.body.sessions_revoked, true);
  assert.equal(oldSession.status, 401);
  assert.equal(managerLogin.status, 200);
  assert.equal(managerLogin.body.user.role, 'Manager');
});

test('logout invalidates the current account sessions', async () => {
  await registerGuest({
    email: 'logout@example.com',
    cpf: '862.883.667-57',
    password: 'LogoutPass!2026',
  });
  const login = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'logout@example.com', password: 'LogoutPass!2026' }),
  });

  const logout = await request('/api/v1/auth/logout', {
    method: 'POST',
    headers: { authorization: `Bearer ${login.body.token}` },
  });
  const oldSession = await request('/api/v1/users/me', {
    headers: { authorization: `Bearer ${login.body.token}` },
  });

  assert.equal(logout.status, 204);
  assert.equal(oldSession.status, 401);
  const audit = await database.get(
    `SELECT action, resource
     FROM audit_logs
     WHERE action = 'LOGOUT'
     ORDER BY timestamp DESC
     LIMIT 1`
  );
  assert.equal(audit.action, 'LOGOUT');
  assert.match(audit.resource, /^user:/);
});
