const { after, before, test } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const bcrypt = require('bcryptjs');

const testDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'hospedatche-search-chat-'));
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-only-secret-with-enough-entropy';
process.env.DATABASE_FILE = path.join(testDirectory, 'search-chat.sqlite');

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

async function createUser({ email, cpf, role = 'Guest', name = 'Test User' }) {
  const id = crypto.randomUUID();
  const password = 'SecureTest!2026';
  await database.run(
    `INSERT INTO users (id, name, email, cpf, password_hash, role)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, name, email, cpf, await bcrypt.hash(password, 10), role]
  );
  const login = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  assert.equal(login.status, 200);
  return { id, token: login.body.token };
}

async function createRoom({ number, rate, capacity, status = 'available' }) {
  const id = crypto.randomUUID();
  await database.run(
    `INSERT INTO rooms (id, number, type, price_per_night, status, capacity)
     VALUES (?, ?, 'Standard', ?, ?, ?)`,
    [id, number, rate, status, capacity]
  );
  return id;
}

async function createBooking({ guestId, roomId, checkIn, checkOut, status = 'confirmed' }) {
  const id = crypto.randomUUID();
  await database.run(
    `INSERT INTO bookings (id, guest_id, room_id, check_in, check_out, total_price, status)
     VALUES (?, ?, ?, ?, ?, 100, ?)`,
    [id, guestId, roomId, checkIn, checkOut, status]
  );
  return id;
}

function dateFromToday(days) {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

test('availability search validates filters and excludes unavailable rooms and date overlaps', async () => {
  const guest = await createUser({ email: 'search-owner@example.com', cpf: '52998224725' });
  const openRoom = await createRoom({ number: 'S101', rate: 120, capacity: 3 });
  const occupiedRoom = await createRoom({ number: 'S102', rate: 110, capacity: 3 });
  await createRoom({ number: 'S103', rate: 90, capacity: 1 });
  await createRoom({ number: 'S104', rate: 100, capacity: 4, status: 'cleaning' });
  const checkIn = dateFromToday(10);
  const checkOut = dateFromToday(13);
  await createBooking({ guestId: guest.id, roomId: occupiedRoom, checkIn, checkOut });

  const invalidRange = await request(
    `/api/v1/search/rooms?check_in=${checkOut}&check_out=${checkIn}&guests=2`
  );
  const injection = await request(
    `/api/v1/search/rooms?check_in=${checkIn}&check_out=${checkOut}&guests=2%20OR%201=1`
  );
  const search = await request(
    `/api/v1/search/rooms?check_in=${checkIn}&check_out=${checkOut}&guests=2&min_price=100&max_price=130`
  );

  assert.equal(invalidRange.status, 400);
  assert.equal(injection.status, 400);
  assert.equal(search.status, 200);
  assert.deepEqual(search.body.rooms.map(({ id }) => id), [openRoom]);
  assert.deepEqual(search.body.criteria, {
    check_in: checkIn,
    check_out: checkOut,
    guests: 2,
    min_price: 100,
    max_price: 130,
  });
  assert.equal('internal_notes' in search.body.rooms[0], false);
});

test('reviews require an eligible stay, prevent duplicates, encode XSS, and require moderation', async () => {
  const guest = await createUser({ email: 'reviewer@example.com', cpf: '11144477735' });
  const manager = await createUser({
    email: 'review-manager@example.com',
    cpf: '93541134780',
    role: 'Manager',
    name: 'Review Manager',
  });
  const roomId = await createRoom({ number: 'R201', rate: 180, capacity: 2 });
  const completedBookingId = await createBooking({
    guestId: guest.id,
    roomId,
    checkIn: dateFromToday(-4),
    checkOut: dateFromToday(-2),
    status: 'completed',
  });
  const pendingBookingId = await createBooking({
    guestId: guest.id,
    roomId,
    checkIn: dateFromToday(20),
    checkOut: dateFromToday(22),
    status: 'pending',
  });
  const maliciousComment = 'Amazing <script>alert(1)</script> & <b>clean</b>';

  const ineligible = await request('/api/v1/reviews', {
    method: 'POST',
    headers: { authorization: `Bearer ${guest.token}` },
    body: JSON.stringify({ booking_id: pendingBookingId, rating: 5, comment: 'Too early' }),
  });
  assert.equal(ineligible.status, 403);

  const created = await request('/api/v1/reviews', {
    method: 'POST',
    headers: { authorization: `Bearer ${guest.token}` },
    body: JSON.stringify({ booking_id: completedBookingId, rating: 5, comment: maliciousComment }),
  });
  assert.equal(created.status, 201);
  assert.equal(created.body.review.status, 'pending');
  assert.equal(created.body.review.comment.includes('<'), false);
  assert.equal(created.body.review.comment.includes('&lt;script&gt;'), true);

  const stored = await database.get('SELECT comment FROM reviews WHERE id = ?', [created.body.review.id]);
  assert.equal(stored.comment, created.body.review.comment);
  assert.equal(stored.comment.includes('<script>'), false);

  const duplicate = await request('/api/v1/reviews', {
    method: 'POST',
    headers: { authorization: `Bearer ${guest.token}` },
    body: JSON.stringify({ booking_id: completedBookingId, rating: 1, comment: 'Duplicate' }),
  });
  assert.equal(duplicate.status, 409);

  const pendingPublic = await request('/api/v1/reviews');
  assert.equal(pendingPublic.status, 200);
  assert.deepEqual(pendingPublic.body.reviews, []);

  const guestModeration = await request(`/api/v1/reviews/${created.body.review.id}/moderate`, {
    method: 'PATCH',
    headers: { authorization: `Bearer ${guest.token}` },
    body: JSON.stringify({ status: 'approved' }),
  });
  assert.equal(guestModeration.status, 403);

  const approved = await request(`/api/v1/reviews/${created.body.review.id}/moderate`, {
    method: 'PATCH',
    headers: { authorization: `Bearer ${manager.token}` },
    body: JSON.stringify({ status: 'approved' }),
  });
  assert.equal(approved.status, 200);
  assert.equal(approved.body.review.status, 'approved');

  const publicReviews = await request('/api/v1/reviews');
  assert.equal(publicReviews.status, 200);
  assert.equal(publicReviews.body.reviews.length, 1);
  assert.equal(publicReviews.body.reviews[0].comment, created.body.review.comment);
  assert.equal('guest_id' in publicReviews.body.reviews[0], false);
  assert.equal('booking_id' in publicReviews.body.reviews[0], false);

  const hidden = await request(`/api/v1/reviews/${created.body.review.id}/moderate`, {
    method: 'PATCH',
    headers: { authorization: `Bearer ${manager.token}` },
    body: JSON.stringify({ status: 'hidden', reason: 'Policy violation' }),
  });
  assert.equal(hidden.status, 200);
  assert.equal(hidden.body.review.status, 'hidden');
  assert.deepEqual((await request('/api/v1/reviews')).body.reviews, []);

  const audit = await database.get(
    `SELECT action, user_id
     FROM audit_logs
     WHERE resource = ? AND action = 'review.hidden'
     LIMIT 1`,
    [`reviews:${created.body.review.id}`]
  );
  assert.equal(audit.user_id, manager.id);
});

test('chat encodes XSS and isolates guest history while allowing the staff queue', async () => {
  const firstGuest = await createUser({ email: 'chat-one@example.com', cpf: '39053344705' });
  const secondGuest = await createUser({ email: 'chat-two@example.com', cpf: '16899535009' });
  const receptionist = await createUser({
    email: 'reception@example.com',
    cpf: '12345678909',
    role: 'Receptionist',
    name: 'Hotel Receptionist',
  });
  const manager = await createUser({
    email: 'chat-manager@example.com',
    cpf: '98765432100',
    role: 'Manager',
    name: 'Chat Manager',
  });

  const sent = await request('/api/v1/chat/messages', {
    method: 'POST',
    headers: { authorization: `Bearer ${firstGuest.token}` },
    body: JSON.stringify({ message: '<img src=x onerror=alert(1)> Need help' }),
  });
  assert.equal(sent.status, 201);
  assert.equal(sent.body.message.message.includes('<'), false);
  assert.equal(sent.body.message.message.includes('&lt;img'), true);

  const spoofedTarget = await request('/api/v1/chat/messages', {
    method: 'POST',
    headers: { authorization: `Bearer ${firstGuest.token}` },
    body: JSON.stringify({ guest_id: secondGuest.id, message: 'Injected conversation' }),
  });
  assert.equal(spoofedTarget.status, 403);

  const reply = await request('/api/v1/chat/messages', {
    method: 'POST',
    headers: { authorization: `Bearer ${receptionist.token}` },
    body: JSON.stringify({
      guest_id: firstGuest.id,
      message: 'Reply <script>alert(1)</script>',
    }),
  });
  assert.equal(reply.status, 201);
  assert.equal(reply.body.message.sender_role, 'Receptionist');
  assert.equal(reply.body.message.message.includes('<script>'), false);

  const privateHistory = await request('/api/v1/chat/messages', {
    headers: { authorization: `Bearer ${secondGuest.token}` },
  });
  assert.equal(privateHistory.status, 200);
  assert.deepEqual(privateHistory.body.messages, []);

  const idorAttempt = await request(`/api/v1/chat/messages?guest_id=${firstGuest.id}`, {
    headers: { authorization: `Bearer ${secondGuest.token}` },
  });
  assert.equal(idorAttempt.status, 403);

  const ownerHistory = await request('/api/v1/chat/messages', {
    headers: { authorization: `Bearer ${firstGuest.token}` },
  });
  assert.equal(ownerHistory.status, 200);
  assert.equal(ownerHistory.body.messages.length, 2);

  const receptionistHistory = await request(`/api/v1/chat/messages?guest_id=${firstGuest.id}`, {
    headers: { authorization: `Bearer ${receptionist.token}` },
  });
  assert.equal(receptionistHistory.status, 200);
  assert.equal(receptionistHistory.body.messages.length, 2);

  const managerQueue = await request('/api/v1/chat/messages', {
    headers: { authorization: `Bearer ${manager.token}` },
  });
  assert.equal(managerQueue.status, 200);
  assert.equal(managerQueue.body.messages.length, 2);
  assert.equal(managerQueue.body.messages[0].guest_id, firstGuest.id);

  const oversized = await request('/api/v1/chat/messages', {
    method: 'POST',
    headers: { authorization: `Bearer ${firstGuest.token}` },
    body: JSON.stringify({ message: 'x'.repeat(1001) }),
  });
  assert.equal(oversized.status, 400);

  const stored = await database.get('SELECT message FROM chat_messages WHERE id = ?', [sent.body.message.id]);
  assert.equal(stored.message, sent.body.message.message);
  assert.equal(stored.message.includes('<img'), false);
});

test('notification preferences are owner-scoped and mandatory security alerts stay enabled', async () => {
  const guest = await createUser({ email: 'preferences@example.com', cpf: '86288366757' });
  const otherGuest = await createUser({ email: 'other-preferences@example.com', cpf: '15350946056' });

  const defaults = await request('/api/v1/notifications/preferences', {
    headers: { authorization: `Bearer ${guest.token}` },
  });
  assert.equal(defaults.status, 200);
  assert.deepEqual(defaults.body.preferences, {
    stay_reminders: true,
    promotions: false,
    transactional: true,
    security_alerts: true,
  });

  const updated = await request('/api/v1/notifications/preferences', {
    method: 'PUT',
    headers: { authorization: `Bearer ${guest.token}` },
    body: JSON.stringify({ stay_reminders: false, promotions: true }),
  });
  assert.equal(updated.status, 200);
  assert.equal(updated.body.preferences.stay_reminders, false);
  assert.equal(updated.body.preferences.promotions, true);
  assert.equal(updated.body.preferences.transactional, true);
  assert.equal(updated.body.preferences.security_alerts, true);

  const disableSecurity = await request('/api/v1/notifications/preferences', {
    method: 'PUT',
    headers: { authorization: `Bearer ${guest.token}` },
    body: JSON.stringify({ security_alerts: false }),
  });
  assert.equal(disableSecurity.status, 400);

  const otherDefaults = await request('/api/v1/notifications/preferences', {
    headers: { authorization: `Bearer ${otherGuest.token}` },
  });
  assert.deepEqual(otherDefaults.body.preferences, defaults.body.preferences);

  const audit = await database.get(
    `SELECT user_id, action, resource
     FROM audit_logs
     WHERE action = 'notification.preferences_updated'
     LIMIT 1`
  );
  assert.equal(audit.user_id, guest.id);
  assert.equal(audit.resource, `users:${guest.id}`);
});
