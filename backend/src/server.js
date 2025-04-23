require('dotenv').config({ path: '../.env' }); // go up one level to load .env
const mongoose = require('mongoose');
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  })();