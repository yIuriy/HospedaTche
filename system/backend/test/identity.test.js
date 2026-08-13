const { after, before, test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const jwt = require('jsonwebtoken');

const testDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'hospedatche-identity-'));
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-only-secret-with-enough-entropy';
process.env.DATABASE_FILE = path.join(testDirectory, 'identity.sqlite');

const app = require('../src/app');
const { initDatabase } = require('../src/config/database');

let server;
let baseUrl;

before(async () => {
  await initDatabase();
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

function createToken(userId, authVersion = 0) {
  return jwt.sign(
    { sub: userId, role: 'Guest', auth_version: authVersion },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: '15m' }
  );
}

test('guest registers with valid identity data', async () => {
  const response = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: 'iuri@example.com',
      cpf: '529.982.247-25',
      password: 'SecurePass!2026',
      full_name: 'Iuri da Silva',
    }),
  });

  assert.equal(response.status, 201);
  assert.equal(response.body.user.email, 'iuri@example.com');
  assert.equal(response.body.user.cpf, '52998224725');
  assert.equal(response.body.user.full_name, 'Iuri da Silva');
  assert.equal(response.body.user.role, 'Guest');
  assert.ok(response.body.user.id);
  assert.equal('password_hash' in response.body.user, false);
});

test('duplicate email or CPF returns the same conflict response', async () => {
  const original = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: 'duplicate@example.com',
      cpf: '111.444.777-35',
      password: 'SecurePass!2026',
      full_name: 'Original Guest',
    }),
  });

  const duplicateEmail = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: 'duplicate@example.com',
      cpf: '935.411.347-80',
      password: 'AnotherPass!2026',
      full_name: 'Another Guest',
    }),
  });

  const duplicateCpf = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: 'another@example.com',
      cpf: '11144477735',
      password: 'AnotherPass!2026',
      full_name: 'Another Guest',
    }),
  });

  assert.equal(original.status, 201);
  assert.equal(duplicateEmail.status, 409);
  assert.equal(duplicateCpf.status, 409);
  assert.deepEqual(duplicateEmail.body, duplicateCpf.body);
  assert.equal(duplicateEmail.body.error.includes('email'), false);
  assert.equal(duplicateEmail.body.error.includes('CPF'), false);
});

test('registration rejects injection payloads and weak passwords', async () => {
  const injectionAttempt = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: "guest@example.com' OR 1=1 --",
      cpf: '390.533.447-05',
      password: 'SecurePass!2026',
      full_name: 'Malicious Guest',
    }),
  });

  const weakPasswordAttempt = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: 'weak@example.com',
      cpf: '168.995.350-09',
      password: 'password',
      full_name: 'Weak Password Guest',
    }),
  });

  assert.equal(injectionAttempt.status, 400);
  assert.deepEqual(injectionAttempt.body, {
    error: 'Invalid registration data',
    fields: ['email'],
  });
  assert.equal(weakPasswordAttempt.status, 400);
  assert.equal(weakPasswordAttempt.body.error, 'Invalid registration data');
  assert.deepEqual(weakPasswordAttempt.body.fields, ['password', 'password', 'password', 'password']);
});

test('authenticated guest reads only the profile from the JWT context', async () => {
  const registration = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: 'profile@example.com',
      cpf: '390.533.447-05',
      password: 'ProfilePass!2026',
      full_name: 'Profile Guest',
    }),
  });

  const unauthorized = await request('/api/v1/users/me');
  const profile = await request('/api/v1/users/me', {
    headers: { authorization: `Bearer ${createToken(registration.body.user.id)}` },
  });

  assert.equal(registration.status, 201);
  assert.equal(unauthorized.status, 401);
  assert.equal(profile.status, 200);
  assert.deepEqual(profile.body.user, registration.body.user);
});

test('authenticated guest updates and normalizes their own full name', async () => {
  const registration = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: 'update-name@example.com',
      cpf: '168.995.350-09',
      password: 'ProfilePass!2026',
      full_name: 'Original Name',
    }),
  });
  const token = createToken(registration.body.user.id);

  const updated = await request('/api/v1/users/me', {
    method: 'PUT',
    headers: { authorization: `Bearer ${token}` },
    body: JSON.stringify({ full_name: '  Iuri   da   Silva  ' }),
  });

  assert.equal(updated.status, 200);
  assert.equal(updated.body.user.full_name, 'Iuri da Silva');
  assert.equal(updated.body.user.email, 'update-name@example.com');
  assert.equal(updated.body.user.cpf, '16899535009');
});

test('email change requires successful step-up authentication', async () => {
  const registration = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: 'sensitive-change@example.com',
      cpf: '935.411.347-80',
      password: 'CurrentPass!2026',
      full_name: 'Sensitive Change Guest',
    }),
  });
  const token = createToken(registration.body.user.id);
  const authorization = { authorization: `Bearer ${token}` };

  const missingPassword = await request('/api/v1/users/me', {
    method: 'PUT',
    headers: authorization,
    body: JSON.stringify({ email: 'changed@example.com' }),
  });
  const wrongPassword = await request('/api/v1/users/me', {
    method: 'PUT',
    headers: authorization,
    body: JSON.stringify({ email: 'changed@example.com', current_password: 'WrongPass!2026' }),
  });
  const changed = await request('/api/v1/users/me', {
    method: 'PUT',
    headers: authorization,
    body: JSON.stringify({ email: 'changed@example.com', current_password: 'CurrentPass!2026' }),
  });

  assert.equal(missingPassword.status, 403);
  assert.equal(wrongPassword.status, 403);
  assert.deepEqual(missingPassword.body, wrongPassword.body);
  assert.equal(changed.status, 200);
  assert.equal(changed.body.user.email, 'changed@example.com');
});

test('password change revokes old sessions and stores a verifiable bcrypt credential', async () => {
  const registration = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: 'password-change@example.com',
      cpf: '123.456.789-09',
      password: 'CurrentPass!2026',
      full_name: 'Password Change Guest',
    }),
  });
  const oldToken = createToken(registration.body.user.id, 0);

  const passwordChanged = await request('/api/v1/users/me', {
    method: 'PUT',
    headers: { authorization: `Bearer ${oldToken}` },
    body: JSON.stringify({
      password: 'ReplacementPass!2026',
      current_password: 'CurrentPass!2026',
    }),
  });
  const oldSession = await request('/api/v1/users/me', {
    headers: { authorization: `Bearer ${oldToken}` },
  });
  const newToken = createToken(registration.body.user.id, 1);
  const reauthenticatedWithNewPassword = await request('/api/v1/users/me', {
    method: 'PUT',
    headers: { authorization: `Bearer ${newToken}` },
    body: JSON.stringify({
      email: 'password-changed@example.com',
      current_password: 'ReplacementPass!2026',
    }),
  });

  assert.equal(passwordChanged.status, 200);
  assert.equal(passwordChanged.body.sessions_revoked, true);
  assert.equal(oldSession.status, 401);
  assert.equal(reauthenticatedWithNewPassword.status, 200);
  assert.equal(reauthenticatedWithNewPassword.body.user.email, 'password-changed@example.com');
});

test('profile update rejects markup and duplicate identity data', async () => {
  const first = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: 'first-identity@example.com',
      cpf: '987.654.321-00',
      password: 'IdentityPass!2026',
      full_name: 'First Identity',
    }),
  });
  const second = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: 'second-identity@example.com',
      cpf: '862.883.667-57',
      password: 'IdentityPass!2026',
      full_name: 'Second Identity',
    }),
  });
  const authorization = { authorization: `Bearer ${createToken(first.body.user.id)}` };

  const markup = await request('/api/v1/users/me', {
    method: 'PUT',
    headers: authorization,
    body: JSON.stringify({ full_name: '<script>alert(1)</script>' }),
  });
  const duplicateCpf = await request('/api/v1/users/me', {
    method: 'PUT',
    headers: authorization,
    body: JSON.stringify({
      cpf: second.body.user.cpf,
      current_password: 'IdentityPass!2026',
    }),
  });

  assert.equal(markup.status, 400);
  assert.equal(duplicateCpf.status, 409);
  assert.equal(duplicateCpf.body.error.includes('CPF'), false);
});
