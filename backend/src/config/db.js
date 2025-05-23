// db.js
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const DB_URL = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);

    console.log('Connection Successful');
  } catch (err) {
    console.error('Could not connect to database', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
