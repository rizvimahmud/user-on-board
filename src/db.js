const { Pool } = require("pg");

const credentials = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
};

const pool = new Pool(credentials);

const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log("Connected to database");
  } catch (error) {
    console.log("failed to connect to database", error);
  }
};

module.exports = {
  pool,
  connectToDatabase,
};
