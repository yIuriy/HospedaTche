const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

const dbPath = process.env.DATABASE_FILE || './data/hospedatche.sqlite';
const absoluteDbPath = path.resolve(__dirname, '../../', dbPath);

// Ensure data directory exists
const dataDir = path.dirname(absoluteDbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let db = null;

// Save SQLite database buffer to disk
const saveDatabase = () => {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(absoluteDbPath, buffer);
  }
};

// Async initialization of sql.js engine
const initEngine = async () => {
  if (db) return db;

  const SQL = await initSqlJs();
  if (fs.existsSync(absoluteDbPath)) {
    const fileBuffer = fs.readFileSync(absoluteDbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
    saveDatabase();
  }
  return db;
};

// Helper wrappers providing standard DB methods
const run = async (sql, params = []) => {
  await initEngine();
  db.run(sql, params);
  saveDatabase();
  return { changes: db.getRowsModified() };
};

const get = async (sql, params = []) => {
  await initEngine();
  const stmt = db.prepare(sql);
  stmt.bind(params);
  let row = null;
  if (stmt.step()) {
    row = stmt.getAsObject();
  }
  stmt.free();
  return row;
};

const all = async (sql, params = []) => {
  await initEngine();
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
};

const getSync = (sql, params = []) => {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const row = stmt.step() ? stmt.getAsObject() : null;
  stmt.free();
  return row;
};

const transaction = async (callback) => {
  await initEngine();
  db.run('BEGIN IMMEDIATE TRANSACTION');

  try {
    const result = callback({
      run: (sql, params = []) => {
        db.run(sql, params);
        return { changes: db.getRowsModified() };
      },
      get: getSync,
    });

    if (result && typeof result.then === 'function') {
      throw new TypeError('Database transaction callbacks must be synchronous');
    }

    db.run('COMMIT');
    saveDatabase();
    return result;
  } catch (error) {
    db.run('ROLLBACK');
    saveDatabase();
    throw error;
  }
};

// Table Initialization & Migration Schema
const initDatabase = async () => {
  await initEngine();

  // Users Table
  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      cpf TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'Guest',
      auth_version INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const userColumns = await all('PRAGMA table_info(users)');
  if (!userColumns.some((column) => column.name === 'auth_version')) {
    await run('ALTER TABLE users ADD COLUMN auth_version INTEGER NOT NULL DEFAULT 0');
  }

  // Rooms Table
  await run(`
    CREATE TABLE IF NOT EXISTS rooms (
      id TEXT PRIMARY KEY,
      number TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL,
      price_per_night REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'available',
      capacity INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Bookings Table
  await run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      guest_id TEXT NOT NULL,
      room_id TEXT NOT NULL,
      check_in DATE NOT NULL,
      check_out DATE NOT NULL,
      total_price REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      voucher_code TEXT,
      cancelled_at DATETIME,
      cancellation_refund REAL NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (guest_id) REFERENCES users(id),
      FOREIGN KEY (room_id) REFERENCES rooms(id)
    );
  `);

  const bookingColumns = await all('PRAGMA table_info(bookings)');
  if (!bookingColumns.some((column) => column.name === 'voucher_code')) {
    await run('ALTER TABLE bookings ADD COLUMN voucher_code TEXT');
  }
  if (!bookingColumns.some((column) => column.name === 'cancelled_at')) {
    await run('ALTER TABLE bookings ADD COLUMN cancelled_at DATETIME');
  }
  if (!bookingColumns.some((column) => column.name === 'cancellation_refund')) {
    await run('ALTER TABLE bookings ADD COLUMN cancellation_refund REAL NOT NULL DEFAULT 0');
  }

  // Payments Table
  await run(`
    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      booking_id TEXT NOT NULL,
      amount REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      transaction_ref TEXT,
      method TEXT,
      refunded_amount REAL NOT NULL DEFAULT 0,
      updated_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (booking_id) REFERENCES bookings(id)
    );
  `);

  const paymentColumns = await all('PRAGMA table_info(payments)');
  if (!paymentColumns.some((column) => column.name === 'method')) {
    await run('ALTER TABLE payments ADD COLUMN method TEXT');
  }
  if (!paymentColumns.some((column) => column.name === 'refunded_amount')) {
    await run('ALTER TABLE payments ADD COLUMN refunded_amount REAL NOT NULL DEFAULT 0');
  }
  if (!paymentColumns.some((column) => column.name === 'updated_at')) {
    await run('ALTER TABLE payments ADD COLUMN updated_at DATETIME');
  }

  await run(`
    CREATE INDEX IF NOT EXISTS idx_bookings_room_dates_status
    ON bookings (room_id, check_in, check_out, status);
  `);
  await run(`
    CREATE INDEX IF NOT EXISTS idx_payments_booking_status
    ON payments (booking_id, status);
  `);

  // Reviews Table
  await run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      guest_id TEXT NOT NULL,
      booking_id TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (guest_id) REFERENCES users(id),
      FOREIGN KEY (booking_id) REFERENCES bookings(id)
    );
  `);

  // Audit Logs Table
  await run(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      action TEXT NOT NULL,
      resource TEXT NOT NULL,
      ip_address TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Database tables verified and migrated successfully.');
};

module.exports = {
  getDb: () => db,
  run,
  get,
  all,
  transaction,
  initDatabase,
};
