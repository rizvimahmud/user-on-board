const { Pool } = require("pg");

const credentials = {
  user: "postgres",
  password: "postgrespw",
  database: "test",
  port: 49153,
};

const pool = new Pool(credentials);

const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log("Connected to database");
  } catch (error) {
    console.log("failed to connect to database");
  }
};

module.exports = {
  pool,
  connectToDatabase,
};
