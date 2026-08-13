const { after, before, test } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const bcrypt = require('bcryptjs');

const testDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'hospedatche-booking-'));
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-only-secret-with-enough-entropy';
process.env.DATABASE_FILE = path.join(testDirectory, 'booking.sqlite');
process.env.REFUND_FULL_DAYS = '7';

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

async function createGuest({ email, cpf }) {
  const id = crypto.randomUUID();
  const password = 'BookingPass!2026';
  await database.run(
    `INSERT INTO users (id, name, email, cpf, password_hash, role)
     VALUES (?, ?, ?, ?, ?, 'Guest')`,
    [id, 'Booking Guest', email, cpf, await bcrypt.hash(password, 10)]
  );
  const login = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  assert.equal(login.status, 200);
  return { id, token: login.body.token };
}

async function createRoom({ number, rate = 150.25, status = 'available' }) {
  const id = crypto.randomUUID();
  await database.run(
    `INSERT INTO rooms (id, number, type, price_per_night, status, capacity)
     VALUES (?, ?, 'Standard', ?, ?, 2)`,
    [id, number, rate, status]
  );
  return id;
}

function futureDate(daysFromNow) {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() + daysFromNow);
  return date.toISOString().slice(0, 10);
}

async function createBooking({ guest, roomId, checkIn, checkOut }) {
  const response = await request('/api/v1/bookings', {
    method: 'POST',
    headers: { authorization: `Bearer ${guest.token}` },
    body: JSON.stringify({ room_id: roomId, check_in: checkIn, check_out: checkOut }),
  });
  assert.equal(response.status, 201);
  return response.body.booking;
}

async function payBooking({ guest, bookingId, method = 'pix', mockStatus = 'paid' }) {
  const response = await request('/api/v1/payments/process', {
    method: 'POST',
    headers: { authorization: `Bearer ${guest.token}` },
    body: JSON.stringify({ booking_id: bookingId, method, mock_status: mockStatus }),
  });
  assert.equal(response.status, 200);
  return response.body;
}

test('booking price is server-calculated and overlapping reservations are blocked atomically', async () => {
  const firstGuest = await createGuest({ email: 'booking-one@example.com', cpf: '52998224725' });
  const secondGuest = await createGuest({ email: 'booking-two@example.com', cpf: '11144477735' });
  const roomId = await createRoom({ number: '101', rate: 150.25 });
  const checkIn = futureDate(20);
  const checkOut = futureDate(23);

  const invalidRange = await request('/api/v1/bookings', {
    method: 'POST',
    headers: { authorization: `Bearer ${firstGuest.token}` },
    body: JSON.stringify({ room_id: roomId, check_in: checkIn, check_out: checkIn }),
  });
  assert.equal(invalidRange.status, 400);

  const tampered = await request('/api/v1/bookings', {
    method: 'POST',
    headers: { authorization: `Bearer ${firstGuest.token}` },
    body: JSON.stringify({ room_id: roomId, check_in: checkIn, check_out: checkOut, total_price: 0.01 }),
  });
  assert.equal(tampered.status, 400);

  const attempts = await Promise.all(
    [firstGuest, secondGuest].map((guest) =>
      request('/api/v1/bookings', {
        method: 'POST',
        headers: { authorization: `Bearer ${guest.token}` },
        body: JSON.stringify({ room_id: roomId, check_in: checkIn, check_out: checkOut }),
      })
    )
  );

  const created = attempts.find((response) => response.status === 201);
  const conflict = attempts.find((response) => response.status === 409);
  assert.ok(created);
  assert.ok(conflict);
  assert.equal(created.body.booking.total_price, 450.75);
  assert.equal(created.body.booking.status, 'pending');
  assert.equal(created.body.booking.room_id, roomId);
  assert.equal('voucher_code' in created.body.booking, false);
  assert.deepEqual(conflict.body, { error: 'Room is not available for the requested dates.' });

  const audit = await database.get(
    `SELECT user_id, action, resource
     FROM audit_logs
     WHERE action = 'booking.created'
     ORDER BY timestamp DESC
     LIMIT 1`
  );
  assert.equal(audit.user_id, created.body.booking.guest_id);
  assert.equal(audit.resource, `bookings:${created.body.booking.id}`);
});

test('mock payment synchronizes booking status, amount, voucher, and audit trail', async () => {
  const owner = await createGuest({ email: 'payment-owner@example.com', cpf: '93541134780' });
  const stranger = await createGuest({ email: 'payment-stranger@example.com', cpf: '39053344705' });
  const paidRoomId = await createRoom({ number: '201', rate: 200 });
  const failedRoomId = await createRoom({ number: '202', rate: 90 });
  const paidBooking = await createBooking({
    guest: owner,
    roomId: paidRoomId,
    checkIn: futureDate(30),
    checkOut: futureDate(32),
  });
  const failedBooking = await createBooking({
    guest: owner,
    roomId: failedRoomId,
    checkIn: futureDate(30),
    checkOut: futureDate(31),
  });

  const unauthorized = await request('/api/v1/payments/process', {
    method: 'POST',
    headers: { authorization: `Bearer ${stranger.token}` },
    body: JSON.stringify({ booking_id: paidBooking.id, method: 'pix', mock_status: 'paid' }),
  });
  assert.equal(unauthorized.status, 404);

  const paid = await request('/api/v1/payments/process', {
    method: 'POST',
    headers: { authorization: `Bearer ${owner.token}` },
    body: JSON.stringify({ booking_id: paidBooking.id, method: 'pix', mock_status: 'paid' }),
  });
  assert.equal(paid.status, 200);
  assert.equal(paid.body.payment.amount, 400);
  assert.equal(paid.body.payment.status, 'paid');
  assert.equal(paid.body.payment.method, 'pix');
  assert.match(paid.body.payment.transaction_ref, /^mock_/);
  assert.equal(paid.body.booking.status, 'confirmed');
  assert.match(paid.body.voucher.code, /^HT-/);
  assert.equal(paid.body.voucher.booking_id, paidBooking.id);
  assert.equal(paid.body.voucher.total_price, 400);
  assert.equal(paid.body.voucher.payment_status, 'paid');

  const failed = await request('/api/v1/payments/process', {
    method: 'POST',
    headers: { authorization: `Bearer ${owner.token}` },
    body: JSON.stringify({
      booking_id: failedBooking.id,
      method: 'credit_card',
      mock_status: 'failed',
    }),
  });
  assert.equal(failed.status, 200);
  assert.equal(failed.body.payment.amount, 90);
  assert.equal(failed.body.payment.status, 'failed');
  assert.equal(failed.body.booking.status, 'cancelled');
  assert.equal('voucher' in failed.body, false);

  const actions = await database.all(
    `SELECT action
     FROM audit_logs
     WHERE resource IN (?, ?)
     ORDER BY timestamp ASC`,
    [`bookings:${paidBooking.id}`, `bookings:${failedBooking.id}`]
  );
  const actionNames = actions.map(({ action }) => action);
  assert.ok(actionNames.includes('payment.paid'));
  assert.ok(actionNames.includes('booking.confirmed'));
  assert.ok(actionNames.includes('payment.failed'));
  assert.ok(actionNames.includes('booking.cancelled'));
});

test('cancellation enforces ownership, calculates refund policy, and releases dates', async () => {
  const owner = await createGuest({ email: 'cancel-owner@example.com', cpf: '16899535009' });
  const stranger = await createGuest({ email: 'cancel-stranger@example.com', cpf: '12345678909' });
  const roomId = await createRoom({ number: '301', rate: 175 });
  const checkIn = futureDate(14);
  const checkOut = futureDate(16);
  const booking = await createBooking({ guest: owner, roomId, checkIn, checkOut });
  await payBooking({ guest: owner, bookingId: booking.id });

  const unauthorized = await request(`/api/v1/bookings/${booking.id}/cancel`, {
    method: 'POST',
    headers: { authorization: `Bearer ${stranger.token}` },
    body: JSON.stringify({}),
  });
  assert.equal(unauthorized.status, 404);

  const cancelled = await request(`/api/v1/bookings/${booking.id}/cancel`, {
    method: 'POST',
    headers: { authorization: `Bearer ${owner.token}` },
    body: JSON.stringify({}),
  });
  assert.equal(cancelled.status, 200);
  assert.equal(cancelled.body.booking.status, 'cancelled');
  assert.equal(cancelled.body.refund.percentage, 100);
  assert.equal(cancelled.body.refund.amount, 350);
  assert.equal(cancelled.body.refund.status, 'refunded');

  const refundPayment = await database.get(
    `SELECT status, amount, refunded_amount, transaction_ref
     FROM payments
     WHERE booking_id = ? AND status = 'refunded'
     LIMIT 1`,
    [booking.id]
  );
  assert.equal(refundPayment.status, 'refunded');
  assert.equal(refundPayment.amount, 350);
  assert.equal(refundPayment.refunded_amount, 350);
  assert.match(refundPayment.transaction_ref, /^mock_refund_/);

  const replacement = await createBooking({ guest: stranger, roomId, checkIn, checkOut });
  assert.equal(replacement.status, 'pending');

  const actions = await database.all(
    `SELECT action
     FROM audit_logs
     WHERE resource = ?
     ORDER BY timestamp ASC`,
    [`bookings:${booking.id}`]
  );
  assert.ok(actions.some(({ action }) => action === 'booking.cancelled'));
  assert.ok(actions.some(({ action }) => action === 'payment.refunded'));
});

test('refund decreases linearly inside the full-refund window', async () => {
  const guest = await createGuest({ email: 'partial-refund@example.com', cpf: '98765432100' });
  const roomId = await createRoom({ number: '302', rate: 70 });
  const booking = await createBooking({
    guest,
    roomId,
    checkIn: futureDate(2),
    checkOut: futureDate(3),
  });
  await payBooking({ guest, bookingId: booking.id, method: 'debit_card' });

  const cancelled = await request(`/api/v1/bookings/${booking.id}/cancel`, {
    method: 'POST',
    headers: { authorization: `Bearer ${guest.token}` },
    body: JSON.stringify({}),
  });

  assert.equal(cancelled.status, 200);
  assert.equal(cancelled.body.refund.days_remaining, 2);
  assert.equal(cancelled.body.refund.percentage, 28.57);
  assert.equal(cancelled.body.refund.amount, 20);
  assert.equal(cancelled.body.refund.status, 'refunded');
});
