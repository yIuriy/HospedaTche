require('dotenv').config();
const app = require('./app');
const { initDatabase } = require('./config/database');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Run database table migrations
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`[HospedaTche Backend] Server running on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
    });
  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
};

startServer();
